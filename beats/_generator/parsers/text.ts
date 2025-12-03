/**
 * Plain Text Parser
 *
 * Extracts structured content from plain text files,
 * including PDFs that have been converted to text.
 */

export interface TextParagraph {
  /** Paragraph content */
  content: string;
  /** Estimated importance (0-1) based on position and keywords */
  importance: number;
  /** Whether this looks like a heading */
  isHeading: boolean;
}

export interface ParsedText {
  /** Document title (inferred or from filename) */
  title: string;
  /** Full raw content */
  raw: string;
  /** Parsed paragraphs */
  paragraphs: TextParagraph[];
  /** Extracted key sentences */
  keySentences: string[];
  /** Word count */
  wordCount: number;
  /** Detected language hint */
  languageHint: 'nl' | 'en' | 'unknown';
}

// Keywords that indicate important content
const IMPORTANCE_KEYWORDS = [
  'important', 'key', 'critical', 'essential', 'must', 'should',
  'conclusion', 'summary', 'recommendation', 'result',
  'belangrijk', 'essentieel', 'conclusie', 'samenvatting', 'aanbeveling',
];

// Dutch word indicators
const DUTCH_INDICATORS = [
  'de', 'het', 'een', 'van', 'en', 'is', 'dat', 'op', 'voor', 'zijn',
  'worden', 'niet', 'met', 'aan', 'om', 'ook', 'als', 'maar', 'bij', 'nog',
];

// English word indicators
const ENGLISH_INDICATORS = [
  'the', 'a', 'an', 'of', 'and', 'is', 'that', 'on', 'for', 'are',
  'be', 'not', 'with', 'to', 'at', 'also', 'as', 'but', 'by', 'still',
];

/**
 * Detect language based on common words.
 */
function detectLanguage(text: string): 'nl' | 'en' | 'unknown' {
  const words = text.toLowerCase().split(/\s+/);
  const wordSet = new Set(words);

  let dutchScore = 0;
  let englishScore = 0;

  DUTCH_INDICATORS.forEach(word => {
    if (wordSet.has(word)) dutchScore++;
  });

  ENGLISH_INDICATORS.forEach(word => {
    if (wordSet.has(word)) englishScore++;
  });

  if (dutchScore > englishScore + 3) return 'nl';
  if (englishScore > dutchScore + 3) return 'en';
  return 'unknown';
}

/**
 * Check if a line looks like a heading.
 */
function isLikelyHeading(line: string, nextLine?: string): boolean {
  const trimmed = line.trim();

  // Short, ends without period, starts with capital
  if (trimmed.length < 80 && !trimmed.endsWith('.') && /^[A-Z]/.test(trimmed)) {
    return true;
  }

  // All caps
  if (trimmed === trimmed.toUpperCase() && trimmed.length > 3 && trimmed.length < 60) {
    return true;
  }

  // Numbered section
  if (/^\d+\.?\s+[A-Z]/.test(trimmed) && trimmed.length < 80) {
    return true;
  }

  // Followed by blank line and next starts with capital
  if (nextLine === '' && trimmed.length < 80) {
    return true;
  }

  return false;
}

/**
 * Calculate importance score for a paragraph.
 */
function calculateImportance(content: string, index: number, total: number): number {
  let score = 0.5; // Base score

  // Position bonus (first and last paragraphs often important)
  if (index < 3) score += 0.2;
  if (index >= total - 3) score += 0.1;

  // Keyword bonus
  const lowerContent = content.toLowerCase();
  IMPORTANCE_KEYWORDS.forEach(keyword => {
    if (lowerContent.includes(keyword)) {
      score += 0.1;
    }
  });

  // Length bonus (not too short, not too long)
  const wordCount = content.split(/\s+/).length;
  if (wordCount > 20 && wordCount < 150) {
    score += 0.1;
  }

  return Math.min(1, score);
}

/**
 * Extract key sentences from text.
 */
function extractKeySentences(text: string): string[] {
  const sentences = text
    .split(/[.!?]+/)
    .map(s => s.trim())
    .filter(s => s.length > 30 && s.length < 300);

  // Score sentences
  const scored = sentences.map(sentence => {
    let score = 0;
    const lower = sentence.toLowerCase();

    IMPORTANCE_KEYWORDS.forEach(keyword => {
      if (lower.includes(keyword)) score += 2;
    });

    // Bonus for containing numbers (statistics, data)
    if (/\d+/.test(sentence)) score += 1;

    return { sentence, score };
  });

  // Return top 10 by score
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 10)
    .map(s => s.sentence);
}

/**
 * Parse plain text content into structured format.
 */
export function parseText(content: string, filename?: string): ParsedText {
  const lines = content.split('\n');
  const paragraphs: TextParagraph[] = [];

  let title = filename?.replace(/\.(txt|pdf|doc|docx)$/i, '') || 'Document';
  let currentParagraph: string[] = [];

  // First non-empty line under 100 chars becomes title
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed && trimmed.length < 100 && !trimmed.includes('.')) {
      title = trimmed;
      break;
    }
  }

  // Build paragraphs
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    const nextLine = lines[i + 1]?.trim();

    if (trimmed === '') {
      // End of paragraph
      if (currentParagraph.length > 0) {
        const content = currentParagraph.join(' ').trim();
        if (content) {
          paragraphs.push({
            content,
            importance: 0, // Will calculate later
            isHeading: false,
          });
        }
        currentParagraph = [];
      }
    } else if (isLikelyHeading(trimmed, nextLine)) {
      // Save current paragraph first
      if (currentParagraph.length > 0) {
        const content = currentParagraph.join(' ').trim();
        if (content) {
          paragraphs.push({
            content,
            importance: 0,
            isHeading: false,
          });
        }
        currentParagraph = [];
      }

      // Add heading as its own paragraph
      paragraphs.push({
        content: trimmed,
        importance: 0.7,
        isHeading: true,
      });
    } else {
      currentParagraph.push(trimmed);
    }
  }

  // Don't forget last paragraph
  if (currentParagraph.length > 0) {
    const content = currentParagraph.join(' ').trim();
    if (content) {
      paragraphs.push({
        content,
        importance: 0,
        isHeading: false,
      });
    }
  }

  // Calculate importance scores
  const nonHeadingParagraphs = paragraphs.filter(p => !p.isHeading);
  nonHeadingParagraphs.forEach((p, i) => {
    p.importance = calculateImportance(p.content, i, nonHeadingParagraphs.length);
  });

  // Extract key sentences
  const keySentences = extractKeySentences(content);

  // Calculate word count
  const wordCount = content
    .split(/\s+/)
    .filter(word => word.length > 0).length;

  // Detect language
  const languageHint = detectLanguage(content);

  return {
    title,
    raw: content,
    paragraphs,
    keySentences,
    wordCount,
    languageHint,
  };
}

/**
 * Get most important paragraphs.
 */
export function getTopParagraphs(parsed: ParsedText, count: number = 5): string[] {
  return parsed.paragraphs
    .filter(p => !p.isHeading)
    .sort((a, b) => b.importance - a.importance)
    .slice(0, count)
    .map(p => p.content);
}

/**
 * Get all headings.
 */
export function getHeadings(parsed: ParsedText): string[] {
  return parsed.paragraphs
    .filter(p => p.isHeading)
    .map(p => p.content);
}

export default parseText;
