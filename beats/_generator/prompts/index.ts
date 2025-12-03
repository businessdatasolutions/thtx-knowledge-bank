/**
 * AI Prompts Index
 *
 * Export all prompt generators for Beat generation.
 */

import type { TemplateType } from '../types';
import type { ParseResult } from '../parsers';
import * as conceptTutorialPrompts from './concept-tutorial';
import * as strategicFrameworkPrompts from './strategic-framework';

export { conceptTutorialPrompts, strategicFrameworkPrompts };

/**
 * Get prompts for a specific template type.
 */
export function getPrompts(templateType: TemplateType) {
  switch (templateType) {
    case 'concept-tutorial':
      return conceptTutorialPrompts;
    case 'strategic-framework':
      return strategicFrameworkPrompts;
    default:
      throw new Error(`Unknown template type: ${templateType}`);
  }
}

/**
 * Generate system and user prompts for a given template and source.
 */
export function generatePrompts(
  templateType: TemplateType,
  source: ParseResult,
  options?: Record<string, unknown>
): { system: string; user: string } {
  const prompts = getPrompts(templateType);

  return {
    system: prompts.SYSTEM_PROMPT,
    user: prompts.createUserPrompt(source, options as any),
  };
}
