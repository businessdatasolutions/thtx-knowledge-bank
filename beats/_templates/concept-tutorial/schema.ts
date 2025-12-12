/**
 * Concept Tutorial Template Schema
 *
 * Defines the content structure for Concept Tutorial Beats.
 * This template is designed for multi-stage educational content with
 * theory sections and interactive scenarios.
 */

import type { BeatMetadata, Scenario } from '../../_shared/types/common';

/**
 * A Golden Circle section (WHY, HOW, or WHAT).
 * Used for structured intro content with scannable format.
 */
export interface GoldenCircleSection {
  /** Section headline - max 15 words, engaging */
  headline: string;
  /** Section paragraph - max 100 words, context-setting */
  paragraph: string;
  /** Key points - 3-5 bullet points, each max 20 words */
  keyPoints: string[];
  /** Optional steps (mainly for HOW section) */
  steps?: string[];
}

/**
 * Intro content using Golden Circle structure (Sinek).
 * WHY → HOW → WHAT
 */
export interface IntroContent {
  /** WHY - Why this concept matters, the problem it solves */
  why: GoldenCircleSection;
  /** HOW - The approach, how the concept works */
  how: GoldenCircleSection;
  /** WHAT - What you will learn/practice, concrete outcomes */
  what: GoldenCircleSection;
  /** Key takeaways - 3-5 main insights */
  keyTakeaways: string[];
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

  // Intro view - Golden Circle sections
  introTitle: string;
  introSubtitle: string;
  whyTitle: string;
  howTitle: string;
  whatTitle: string;
  keyTakeawaysTitle: string;

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

  /** Intro content using Golden Circle structure */
  intro: IntroContent;

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

  // Intro view - Golden Circle sections
  introTitle: 'Welkom',
  introSubtitle: 'Begin met de theorie',
  whyTitle: 'Waarom dit belangrijk is',
  howTitle: 'De aanpak',
  whatTitle: 'Wat je gaat oefenen',
  keyTakeawaysTitle: 'Belangrijkste inzichten',

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

  // Validate intro - Golden Circle structure
  if (!content.intro) {
    errors.push('Missing intro');
  } else {
    // Validate WHY section
    if (!content.intro.why) {
      errors.push('Missing intro.why');
    } else {
      if (!content.intro.why.headline) errors.push('Missing intro.why.headline');
      if (!content.intro.why.paragraph) errors.push('Missing intro.why.paragraph');
      if (!content.intro.why.keyPoints || content.intro.why.keyPoints.length < 3) {
        errors.push('intro.why.keyPoints must have at least 3 items');
      }
    }
    // Validate HOW section
    if (!content.intro.how) {
      errors.push('Missing intro.how');
    } else {
      if (!content.intro.how.headline) errors.push('Missing intro.how.headline');
      if (!content.intro.how.paragraph) errors.push('Missing intro.how.paragraph');
      if (!content.intro.how.keyPoints || content.intro.how.keyPoints.length < 3) {
        errors.push('intro.how.keyPoints must have at least 3 items');
      }
    }
    // Validate WHAT section
    if (!content.intro.what) {
      errors.push('Missing intro.what');
    } else {
      if (!content.intro.what.headline) errors.push('Missing intro.what.headline');
      if (!content.intro.what.paragraph) errors.push('Missing intro.what.paragraph');
      if (!content.intro.what.keyPoints || content.intro.what.keyPoints.length < 3) {
        errors.push('intro.what.keyPoints must have at least 3 items');
      }
    }
    // Validate key takeaways
    if (!content.intro.keyTakeaways || content.intro.keyTakeaways.length < 3) {
      errors.push('intro.keyTakeaways must have at least 3 items');
    }
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
    intro: IntroContent;
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
