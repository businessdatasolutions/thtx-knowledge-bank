/**
 * Transcript Parser
 *
 * Extracts structured content from transcripts (meeting notes, video transcripts).
 */

export interface Speaker {
  /** Speaker identifier or name */
  name: string;
  /** Number of times this speaker spoke */
  turnCount: number;
}

export interface TranscriptSegment {
  /** Speaker name (if identified) */
  speaker?: string;
  /** Timestamp (if present) */
  timestamp?: string;
  /** Content of the segment */
  content: string;
}

export interface ParsedTranscript {
  /** Document title (from filename or first line) */
  title: string;
  /** Full raw content */
  raw: string;
  /** Identified speakers */
  speakers: Speaker[];
  /** Parsed segments */
  segments: TranscriptSegment[];
  /** Extracted quotes (notable statements) */
  quotes: string[];
  /** Extracted topics/themes */
  topics: string[];
  /** Word count */
  wordCount: number;
}

// Common speaker patterns
const SPEAKER_PATTERNS = [
  /^([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?):\s*(.+)$/,  // "John Smith: text"
  /^\[([^\]]+)\]\s*(.+)$/,                         // "[Speaker]: text"
  /^([A-Z]{2,}):\s*(.+)$/,                         // "JD: text" (initials)
  /^Speaker\s*(\d+):\s*(.+)$/i,                    // "Speaker 1: text"
];

// Timestamp patterns
const TIMESTAMP_PATTERNS = [
  /^\[?(\d{1,2}:\d{2}(?::\d{2})?)\]?\s*(.+)$/,    // [00:00] or 0:00
  /^\((\d{1,2}:\d{2}(?::\d{2})?)\)\s*(.+)$/,      // (00:00)
];

/**
 * Parse transcript content into structured segments.
 */
export function parseTranscript(content: string, filename?: string): ParsedTranscript {
  const lines = content.split('\n').filter(line => line.trim().length > 0);
  const segments: TranscriptSegment[] = [];
  const speakerCounts: Map<string, number> = new Map();
  const quotes: string[] = [];
  const topicSet: Set<string> = new Set();

  let title = filename?.replace(/\.(txt|md|transcript)$/i, '') || 'Transcript';

  // Use first non-empty line as title if it looks like one
  if (lines.length > 0 && !lines[0].includes(':') && lines[0].length < 100) {
    title = lines[0].trim();
  }

  let currentSpeaker: string | undefined;
  let currentTimestamp: string | undefined;
  let currentContent: string[] = [];

  const saveSegment = () => {
    if (currentContent.length > 0) {
      const text = currentContent.join(' ').trim();
      if (text) {
        segments.push({
          speaker: currentSpeaker,
          timestamp: currentTimestamp,
          content: text,
        });

        // Track speaker counts
        if (currentSpeaker) {
          speakerCounts.set(currentSpeaker, (speakerCounts.get(currentSpeaker) || 0) + 1);
        }

        // Extract notable quotes (longer statements with substance)
        if (text.length > 100 && text.length < 500) {
          quotes.push(text);
        }
      }
      currentContent = [];
    }
  };

  for (const line of lines) {
    let matched = false;

    // Check for timestamp
    for (const pattern of TIMESTAMP_PATTERNS) {
      const match = line.match(pattern);
      if (match) {
        saveSegment();
        currentTimestamp = match[1];
        if (match[2]) {
          currentContent.push(match[2]);
        }
        matched = true;
        break;
      }
    }

    if (matched) continue;

    // Check for speaker
    for (const pattern of SPEAKER_PATTERNS) {
      const match = line.match(pattern);
      if (match) {
        saveSegment();
        currentSpeaker = match[1];
        if (match[2]) {
          currentContent.push(match[2]);
        }
        matched = true;
        break;
      }
    }

    if (matched) continue;

    // Regular content line
    currentContent.push(line);

    // Extract potential topics (capitalized phrases, technical terms)
    const topicMatches = line.match(/\b([A-Z][a-z]+(?:\s+[A-Z][a-z]+)+)\b/g);
    if (topicMatches) {
      topicMatches.forEach(topic => {
        if (topic.length > 5 && topic.length < 50) {
          topicSet.add(topic);
        }
      });
    }
  }

  // Save final segment
  saveSegment();

  // Build speakers array
  const speakers: Speaker[] = Array.from(speakerCounts.entries())
    .map(([name, turnCount]) => ({ name, turnCount }))
    .sort((a, b) => b.turnCount - a.turnCount);

  // Calculate word count
  const wordCount = content
    .split(/\s+/)
    .filter(word => word.length > 0).length;

  // Limit quotes to top 10 most substantial
  const selectedQuotes = quotes
    .sort((a, b) => b.length - a.length)
    .slice(0, 10);

  return {
    title,
    raw: content,
    speakers,
    segments,
    quotes: selectedQuotes,
    topics: Array.from(topicSet).slice(0, 20),
    wordCount,
  };
}

/**
 * Get all content from a specific speaker.
 */
export function getSpeakerContent(parsed: ParsedTranscript, speakerName: string): string[] {
  return parsed.segments
    .filter(s => s.speaker?.toLowerCase() === speakerName.toLowerCase())
    .map(s => s.content);
}

/**
 * Get content summary by combining all segments.
 */
export function getFullContent(parsed: ParsedTranscript): string {
  return parsed.segments.map(s => s.content).join('\n\n');
}

export default parseTranscript;
