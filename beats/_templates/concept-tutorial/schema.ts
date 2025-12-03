/**
 * Concept Tutorial Template Schema
 *
 * Defines the content structure for Concept Tutorial Beats.
 * This template is designed for multi-stage educational content with
 * theory sections and interactive scenarios.
 */

import type { ReactNode } from 'react';
import type { BeatMetadata, Scenario } from '../../_shared/types/common';

/**
 * A section within the intro/theory view.
 */
export interface IntroSection {
  /** Unique identifier */
  id: string;
  /** Short label for tab navigation (e.g., "WAAROM", "HOE", "WAT") */
  tabLabel: string;
  /** Full section title */
  title: string;
  /** Section content - can be JSX for rich content or string for simple text */
  content: ReactNode | string;
}

/**
 * UI labels for the template - all text displayed in the interface.
 * Supports NL language (Dutch).
 */
export interface ConceptTutorialLabels {
  // Navigation
  title: string;
  subtitle: string;
  backToDashboard: string;
  nextStage: string;
  complete: string;
  startExploring: string;

  // Intro view
  introTitle: string;
  introSubtitle: string;

  // Dashboard view
  dashboardTitle: string;
  dashboardSubtitle: string;
  scenarioCompleted: string;
  scenariosCompleted: string;

  // Scenario view
  scenarioProgress: string;
  stage: string;
  of: string;
  selectOption: string;

  // Summary view
  summaryTitle: string;
  summarySubtitle: string;
  yourChoices: string;
  retrospective: string;
  backToScenarios: string;

  // Stage labels
  stageLabels: {
    data: string;
    logic: string;
    action: string;
  };

  // Misc
  loading: string;
}

/**
 * Complete content structure for a Concept Tutorial Beat.
 */
export interface ConceptTutorialContent {
  /** Beat metadata for catalog and identification */
  metadata: BeatMetadata;

  /** Intro/theory section content */
  intro: {
    /** Array of tabbed sections (typically 3: WHY, HOW, WHAT) */
    sections: IntroSection[];
  };

  /** Interactive scenarios */
  scenarios: Scenario[];

  /** UI labels in Dutch */
  ui: ConceptTutorialLabels;
}

/**
 * Default Dutch labels for the Concept Tutorial template.
 */
export const DEFAULT_NL_LABELS: ConceptTutorialLabels = {
  // Navigation
  title: 'Tutorial',
  subtitle: 'Interactieve leerervaring',
  backToDashboard: 'Terug naar overzicht',
  nextStage: 'Volgende stap',
  complete: 'Afronden',
  startExploring: 'Start verkenning',

  // Intro view
  introTitle: 'Welkom',
  introSubtitle: 'Begin met de theorie',

  // Dashboard view
  dashboardTitle: 'Scenario\'s',
  dashboardSubtitle: 'Kies een scenario om te verkennen',
  scenarioCompleted: 'scenario afgerond',
  scenariosCompleted: 'scenario\'s afgerond',

  // Scenario view
  scenarioProgress: 'Voortgang',
  stage: 'Stap',
  of: 'van',
  selectOption: 'Selecteer een optie om verder te gaan',

  // Summary view
  summaryTitle: 'Samenvatting',
  summarySubtitle: 'Jouw leerpad',
  yourChoices: 'Jouw keuzes',
  retrospective: 'Terugblik',
  backToScenarios: 'Terug naar scenario\'s',

  // Stage labels
  stageLabels: {
    data: 'Data',
    logic: 'Logica',
    action: 'Actie',
  },

  // Misc
  loading: 'Laden...',
};

/**
 * Validates that the content structure is complete and valid.
 *
 * @param content - The content object to validate
 * @returns An array of validation error messages (empty if valid)
 */
export function validateContent(content: ConceptTutorialContent): string[] {
  const errors: string[] = [];

  // Validate metadata
  if (!content.metadata?.id) {
    errors.push('Missing metadata.id');
  }
  if (!content.metadata?.title) {
    errors.push('Missing metadata.title');
  }
  if (content.metadata?.templateType !== 'concept-tutorial') {
    errors.push('Invalid templateType: must be "concept-tutorial"');
  }

  // Validate intro sections
  if (!content.intro?.sections || content.intro.sections.length === 0) {
    errors.push('At least one intro section is required');
  }

  // Validate scenarios
  if (!content.scenarios || content.scenarios.length === 0) {
    errors.push('At least one scenario is required');
  } else {
    content.scenarios.forEach((scenario, index) => {
      if (!scenario.id) {
        errors.push(`Scenario ${index}: missing id`);
      }
      if (!scenario.stages || scenario.stages.length === 0) {
        errors.push(`Scenario ${index}: at least one stage is required`);
      } else {
        scenario.stages.forEach((stage, stageIndex) => {
          if (!stage.options || stage.options.length < 2) {
            errors.push(`Scenario ${index}, Stage ${stageIndex}: at least 2 options required`);
          }
          const correctOptions = stage.options.filter(o => o.isCorrect);
          if (correctOptions.length === 0) {
            errors.push(`Scenario ${index}, Stage ${stageIndex}: at least one correct option required`);
          }
        });
      }
    });
  }

  // Validate UI labels
  if (!content.ui) {
    errors.push('UI labels are required');
  }

  return errors;
}

/**
 * Creates a content object with defaults filled in.
 *
 * @param partial - Partial content to merge with defaults
 * @returns Complete content object with defaults
 */
export function createContent(
  partial: Partial<ConceptTutorialContent> & {
    metadata: BeatMetadata;
    intro: { sections: IntroSection[] };
    scenarios: Scenario[];
  }
): ConceptTutorialContent {
  return {
    ...partial,
    ui: {
      ...DEFAULT_NL_LABELS,
      ...partial.ui,
    },
  };
}
