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
// Content Types (for generated output)
// ============================================================================

/**
 * Concept Tutorial content structure.
 */
export interface ConceptTutorialContent {
  metadata: BeatMetadata;
  intro: {
    headline: string;
    subheadline: string;
    conceptText: string;
    keyPoints: string[];
  };
  labels: {
    startButton: string;
    continueButton: string;
    finishButton: string;
    restartButton: string;
    scenariosTitle: string;
    progressLabel: string;
    summaryTitle: string;
    stageLabels: string[];
  };
  scenarios: Scenario[];
  summary: {
    title: string;
    insights: string[];
    callToAction: string;
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
      position: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
      title: string;
      description: string;
      characteristics: string[];
      strategies: string[];
      examples: string[];
    }>;
  };
  context: {
    introduction: string;
    whenToUse: string[];
    limitations: string[];
  };
  labels: {
    exploreButton: string;
    backButton: string;
    characteristicsLabel: string;
    strategiesLabel: string;
    examplesLabel: string;
  };
}
