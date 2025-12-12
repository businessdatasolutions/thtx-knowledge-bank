/**
 * Generator Types
 *
 * Type definitions used by the Beat generator.
 * These are copied from shared types to avoid React dependencies.
 */

// ============================================================================
// Beat Metadata
// ============================================================================

/**
 * Template types available for Beat generation.
 */
export type TemplateType = 'concept-tutorial' | 'strategic-framework';

/**
 * Metadata for a Beat, used in catalog and indexing.
 */
export interface BeatMetadata {
  /** Unique identifier (kebab-case) */
  id: string;
  /** Display title */
  title: string;
  /** Short description for catalog listing */
  description: string;
  /** Author name */
  author: string;
  /** ISO date string of publication */
  publishDate: string;
  /** Template type used for this Beat */
  templateType: TemplateType;
  /** Optional tags for categorization */
  tags?: string[];
  /** Optional URL path override (defaults to id) */
  slug?: string;
}

// ============================================================================
// Interactive Elements
// ============================================================================

/**
 * A single selectable option in a quiz or assessment.
 */
export interface Option {
  /** Unique identifier within the stage */
  id: string;
  /** Display text for the option */
  text: string;
  /** Feedback shown after selection */
  feedback: string;
  /** Whether this is the correct/preferred answer */
  isCorrect: boolean;
}

/**
 * A stage within a scenario, containing a question and options.
 */
export interface Stage {
  /** Unique identifier within the scenario */
  id: string;
  /** The question or prompt for this stage */
  question: string;
  /** Available options for selection */
  options: Option[];
  /** Optional instruction text */
  instruction?: string;
}

/**
 * A complete scenario with multiple stages.
 */
export interface Scenario {
  /** Unique identifier */
  id: string;
  /** Display title */
  title: string;
  /** Brief description for dashboard cards */
  description: string;
  /** Icon name (from lucide-react) */
  icon: string;
  /** Background context/narrative for the scenario */
  context: string;
  /** Array of stages to progress through */
  stages: Stage[];
  /** Summary text shown after completion */
  summary: string;
}

// ============================================================================
// Golden Circle Structure (Sinek)
// ============================================================================

/**
 * A Golden Circle section (WHY, HOW, or WHAT).
 * Used for structured intro/context content with scannable format.
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

// ============================================================================
// Content Types (for generated output)
// ============================================================================

/**
 * Concept Tutorial content structure.
 */
export interface ConceptTutorialContent {
  metadata: BeatMetadata;
  intro: {
    /** WHY - Why this concept matters */
    why: GoldenCircleSection;
    /** HOW - The approach */
    how: GoldenCircleSection;
    /** WHAT - What you will learn/practice */
    what: GoldenCircleSection;
    /** Key takeaways - 3-5 main insights */
    keyTakeaways: string[];
  };
  scenarios: Scenario[];
  ui: {
    title: string;
    subtitle: string;
    backToDashboard: string;
    nextStage: string;
    complete: string;
    startExploring: string;
    introTitle: string;
    introSubtitle: string;
    whyTitle: string;
    howTitle: string;
    whatTitle: string;
    keyTakeawaysTitle: string;
    dashboardTitle: string;
    dashboardSubtitle: string;
    scenarioCompleted: string;
    scenariosCompleted: string;
    scenarioProgress: string;
    stage: string;
    of: string;
    selectOption: string;
    summaryTitle: string;
    summarySubtitle: string;
    yourChoices: string;
    retrospective: string;
    backToScenarios: string;
    stageLabels: {
      data: string;
      logic: string;
      action: string;
    };
    loading: string;
  };
}

/**
 * Strategic Framework content structure.
 */
export interface StrategicFrameworkContent {
  metadata: BeatMetadata;
  framework: {
    title: string;
    description: string;
    xAxis: {
      label: string;
      lowLabel: string;
      highLabel: string;
    };
    yAxis: {
      label: string;
      lowLabel: string;
      highLabel: string;
    };
    quadrants: Array<{
      id: string;
      position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
      title: string;
      description: string;
      examples: string[];
      color: string;
      icon?: string;
      recommendations?: string[];
    }>;
  };
  context: {
    /** WHY - Why this framework matters */
    why: GoldenCircleSection;
    /** HOW - How the framework works */
    how: GoldenCircleSection;
    /** WHAT - What you will learn */
    what: GoldenCircleSection;
    /** Key takeaways - 3-5 main insights */
    keyTakeaways: string[];
  };
  ui: {
    title: string;
    subtitle: string;
    backToIntro: string;
    backToFramework: string;
    explore: string;
    whyTitle: string;
    howTitle: string;
    whatTitle: string;
    keyTakeawaysTitle: string;
    startExploring: string;
    selectQuadrant: string;
    clickToExplore: string;
    examplesTitle: string;
    recommendationsTitle: string;
    positionLabel: string;
    loading: string;
  };
}
