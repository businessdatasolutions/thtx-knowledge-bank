/**
 * THTX Beats Templates
 *
 * Central export for all Beat templates.
 */

import type { TemplateType } from '../_shared/types/common';

// Concept Tutorial Template
export {
  ConceptTutorialTemplate,
  DEFAULT_NL_LABELS as CONCEPT_TUTORIAL_LABELS,
  validateContent as validateConceptTutorialContent,
  createContent as createConceptTutorialContent,
} from './concept-tutorial';

export type {
  ConceptTutorialTemplateProps,
  ConceptTutorialContent,
  ConceptTutorialLabels,
  IntroSection,
} from './concept-tutorial';

// Strategic Framework Template
export {
  StrategicFrameworkTemplate,
  DEFAULT_NL_LABELS as STRATEGIC_FRAMEWORK_LABELS,
  DEFAULT_QUADRANT_COLORS,
  validateContent as validateStrategicFrameworkContent,
  createContent as createStrategicFrameworkContent,
} from './strategic-framework';

export type {
  StrategicFrameworkTemplateProps,
  StrategicFrameworkContent,
  StrategicFrameworkLabels,
  Framework,
  FrameworkContext,
  Quadrant,
  QuadrantPosition,
  Axis,
} from './strategic-framework';

/**
 * Template registry for dynamic template selection.
 */
export const TEMPLATES = {
  'concept-tutorial': ConceptTutorialTemplate,
  'strategic-framework': StrategicFrameworkTemplate,
} as const;

/**
 * Get a template component by type.
 *
 * @param type - The template type
 * @returns The template component
 */
export function getTemplate(type: TemplateType) {
  return TEMPLATES[type];
}

/**
 * Check if a template type is valid.
 *
 * @param type - The type to check
 * @returns True if valid template type
 */
export function isValidTemplateType(type: string): type is TemplateType {
  return type in TEMPLATES;
}
