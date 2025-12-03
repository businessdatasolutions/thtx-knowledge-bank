/**
 * Markdown Parser
 *
 * Extracts structured content from markdown files.
 */

export interface MarkdownSection {
  /** Section heading level (1-6) */
  level: number;
  /** Section title */
  title: string;
  /** Section content (text after heading) */
  content: string;
  /** Child sections */
  children: MarkdownSection[];
}

export interface ParsedMarkdown {
  /** Document title (first h1 or filename) */
  title: string;
  /** Full raw content */
  raw: string;
  /** Hierarchical sections */
  sections: MarkdownSection[];
  /** Extracted key points (bullet lists) */
  keyPoints: string[];
  /** Extracted links */
  links: { text: string; url: string }[];
  /** Word count */
  wordCount: number;
}

/**
 * Parse markdown content into structured sections.
 */
export function parseMarkdown(content: string, filename?: string): ParsedMarkdown {
  const lines = content.split('\n');
  const sections: MarkdownSection[] = [];
  const keyPoints: string[] = [];
  const links: { text: string; url: string }[] = [];

  let title = filename?.replace(/\.md$/, '') || 'Untitled';
  let currentSection: MarkdownSection | null = null;
  const sectionStack: MarkdownSection[] = [];
  let currentContent: string[] = [];

  // Helper to save current content to current section
  const saveCurrentContent = () => {
    if (currentSection && currentContent.length > 0) {
      currentSection.content = currentContent.join('\n').trim();
      currentContent = [];
    }
  };

  // Helper to find parent section for given level
  const findParent = (level: number): MarkdownSection | null => {
    for (let i = sectionStack.length - 1; i >= 0; i--) {
      if (sectionStack[i].level < level) {
        return sectionStack[i];
      }
    }
    return null;
  };

  for (const line of lines) {
    // Check for headings
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      saveCurrentContent();

      const level = headingMatch[1].length;
      const headingTitle = headingMatch[2].trim();

      // First h1 becomes document title
      if (level === 1 && title === (filename?.replace(/\.md$/, '') || 'Untitled')) {
        title = headingTitle;
      }

      const newSection: MarkdownSection = {
        level,
        title: headingTitle,
        content: '',
        children: [],
      };

      // Find where to add this section
      const parent = findParent(level);
      if (parent) {
        parent.children.push(newSection);
      } else {
        sections.push(newSection);
      }

      // Update stack
      while (sectionStack.length > 0 && sectionStack[sectionStack.length - 1].level >= level) {
        sectionStack.pop();
      }
      sectionStack.push(newSection);
      currentSection = newSection;
      continue;
    }

    // Check for bullet points
    const bulletMatch = line.match(/^[\s]*[-*+]\s+(.+)$/);
    if (bulletMatch) {
      keyPoints.push(bulletMatch[1].trim());
    }

    // Check for links
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    let linkMatch;
    while ((linkMatch = linkRegex.exec(line)) !== null) {
      links.push({
        text: linkMatch[1],
        url: linkMatch[2],
      });
    }

    // Add to current content
    currentContent.push(line);
  }

  // Save any remaining content
  saveCurrentContent();

  // Calculate word count
  const wordCount = content
    .replace(/[#*_`\[\]()]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 0).length;

  return {
    title,
    raw: content,
    sections,
    keyPoints,
    links,
    wordCount,
  };
}

/**
 * Extract flat list of all sections with their full content.
 */
export function flattenSections(sections: MarkdownSection[]): Array<{ title: string; content: string; level: number }> {
  const result: Array<{ title: string; content: string; level: number }> = [];

  function traverse(section: MarkdownSection) {
    result.push({
      title: section.title,
      content: section.content,
      level: section.level,
    });
    section.children.forEach(traverse);
  }

  sections.forEach(traverse);
  return result;
}

/**
 * Extract main topics from sections (h2 level).
 */
export function extractMainTopics(parsed: ParsedMarkdown): string[] {
  return flattenSections(parsed.sections)
    .filter(s => s.level === 2)
    .map(s => s.title);
}

export default parseMarkdown;
