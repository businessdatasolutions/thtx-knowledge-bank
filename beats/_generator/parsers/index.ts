/**
 * Source Material Parsers
 *
 * Auto-detects file format and returns structured content.
 */

import { parseMarkdown, type ParsedMarkdown } from './markdown';
import { parseTranscript, type ParsedTranscript } from './transcript';
import { parseText, type ParsedText } from './text';
import * as fs from 'fs';
import * as path from 'path';

export type ParsedContent = ParsedMarkdown | ParsedTranscript | ParsedText;

export interface ParseResult {
  /** Detected format */
  format: 'markdown' | 'transcript' | 'text';
  /** Parsed content */
  content: ParsedContent;
  /** Original filename */
  filename: string;
  /** File path */
  filepath: string;
  /** Word count (computed from content) */
  wordCount: number;
  /** Key points extracted (computed from content) */
  keyPoints: string[];
}

/**
 * Extract common fields from parsed content.
 */
function extractCommonFields(content: ParsedContent, format: string): { wordCount: number; keyPoints: string[] } {
  switch (format) {
    case 'markdown':
      return {
        wordCount: (content as ParsedMarkdown).wordCount,
        keyPoints: (content as ParsedMarkdown).keyPoints,
      };
    case 'transcript':
      return {
        wordCount: (content as ParsedTranscript).wordCount,
        keyPoints: (content as ParsedTranscript).quotes,
      };
    case 'text':
      return {
        wordCount: (content as ParsedText).wordCount,
        keyPoints: (content as ParsedText).keySentences,
      };
    default:
      return { wordCount: 0, keyPoints: [] };
  }
}

/**
 * Detect file format based on extension and content.
 */
function detectFormat(filepath: string, content: string): 'markdown' | 'transcript' | 'text' {
  const ext = path.extname(filepath).toLowerCase();

  // By extension
  if (ext === '.md' || ext === '.markdown') {
    return 'markdown';
  }

  if (ext === '.transcript') {
    return 'transcript';
  }

  // By content analysis
  const lines = content.split('\n').slice(0, 50); // Check first 50 lines

  // Check for markdown indicators
  const hasMarkdownHeadings = lines.some(line => /^#{1,6}\s/.test(line));
  const hasMarkdownLinks = content.includes('](');
  const hasMarkdownLists = lines.some(line => /^[\s]*[-*+]\s/.test(line));

  if (hasMarkdownHeadings || (hasMarkdownLinks && hasMarkdownLists)) {
    return 'markdown';
  }

  // Check for transcript indicators
  const hasSpeakerPattern = lines.some(line =>
    /^[A-Z][a-z]+(?:\s+[A-Z][a-z]+)?:/.test(line) ||
    /^\[[^\]]+\]:/.test(line) ||
    /^Speaker\s*\d+:/i.test(line)
  );
  const hasTimestamps = lines.some(line => /\d{1,2}:\d{2}/.test(line));

  if (hasSpeakerPattern || (hasTimestamps && lines.length > 20)) {
    return 'transcript';
  }

  // Default to plain text
  return 'text';
}

/**
 * Parse source material from a file path.
 *
 * @param filepath - Path to the source file
 * @returns Parsed content with format detection
 */
export async function parseSourceMaterial(filepath: string): Promise<ParseResult> {
  // Read file content
  const content = await fs.promises.readFile(filepath, 'utf-8');
  const filename = path.basename(filepath);

  // Detect format
  const format = detectFormat(filepath, content);

  // Parse based on format
  let parsedContent: ParsedContent;

  switch (format) {
    case 'markdown':
      parsedContent = parseMarkdown(content, filename);
      break;
    case 'transcript':
      parsedContent = parseTranscript(content, filename);
      break;
    case 'text':
    default:
      parsedContent = parseText(content, filename);
      break;
  }

  const common = extractCommonFields(parsedContent, format);

  return {
    format,
    content: parsedContent,
    filename,
    filepath,
    wordCount: common.wordCount,
    keyPoints: common.keyPoints,
  };
}

/**
 * Parse source material from raw content string.
 *
 * @param content - Raw content string
 * @param filename - Optional filename for format detection
 * @returns Parsed content
 */
export function parseContent(content: string, filename?: string): ParseResult {
  const filepath = filename || 'content.txt';
  const format = detectFormat(filepath, content);

  let parsedContent: ParsedContent;

  switch (format) {
    case 'markdown':
      parsedContent = parseMarkdown(content, filename);
      break;
    case 'transcript':
      parsedContent = parseTranscript(content, filename);
      break;
    case 'text':
    default:
      parsedContent = parseText(content, filename);
      break;
  }

  const common = extractCommonFields(parsedContent, format);

  return {
    format,
    content: parsedContent,
    filename: filename || 'content.txt',
    filepath,
    wordCount: common.wordCount,
    keyPoints: common.keyPoints,
  };
}

// Re-export individual parsers and types
export { parseMarkdown, type ParsedMarkdown, flattenSections, extractMainTopics } from './markdown';
export { parseTranscript, type ParsedTranscript, getSpeakerContent, getFullContent } from './transcript';
export { parseText, type ParsedText, getTopParagraphs, getHeadings } from './text';
