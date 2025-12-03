/**
 * Common Type Definitions for THTX Beats
 *
 * These types are shared across all Beat templates and components.
 */

import type { ReactNode } from 'react';

// ============================================================================
// Language & Localization
// ============================================================================

/**
 * Supported languages. Currently NL only, extensible for future bilingual support.
 */
export type Language = 'NL';

// ============================================================================
// Navigation & View State
// ============================================================================

/**
 * Standard view states for Beat navigation.
 * Templates may use a subset of these states.
 */
export type ViewState = 'INTRO' | 'DASHBOARD' | 'SCENARIO' | 'SUMMARY';

/**
 * Props for navigation components.
 */
export interface NavigationProps {
  /** Current active view */
  currentView: ViewState;
  /** Callback to navigate to a different view */
  onNavigate: (view: ViewState) => void;
  /** Whether back navigation is available */
  canGoBack: boolean;
  /** Whether forward navigation is available */
  canGoForward: boolean;
  /** Optional title to display */
  title?: string;
}

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
// Content Sections
// ============================================================================

/**
 * A section of content, typically used in intro/theory views.
 */
export interface ContentSection {
  /** Unique identifier */
  id: string;
  /** Short label for tabs */
  tabLabel: string;
  /** Full section title */
  title: string;
  /** Section content (can be JSX or markdown string) */
  content: ReactNode | string;
}

// ============================================================================
// Component Props
// ============================================================================

/**
 * Common props for interactive selector components.
 */
export interface SelectorProps {
  /** Available options to choose from */
  options: Option[];
  /** Currently selected option (if any) */
  selectedOption: Option | null;
  /** Callback when an option is selected */
  onSelect: (option: Option) => void;
  /** Whether selection is disabled */
  disabled?: boolean;
}

/**
 * Common props for progress indicator components.
 */
export interface ProgressProps {
  /** Current step (0-indexed) */
  currentStep: number;
  /** Total number of steps */
  totalSteps: number;
  /** Optional labels for each step */
  stepLabels?: string[];
}

/**
 * Common props for card components.
 */
export interface CardProps {
  /** Card title */
  title?: string;
  /** Card description/body content */
  children: ReactNode;
  /** Optional click handler (makes card interactive) */
  onClick?: () => void;
  /** Whether the card is in a selected/active state */
  isActive?: boolean;
  /** Additional CSS classes */
  className?: string;
}

// ============================================================================
// User Interaction Tracking
// ============================================================================

/**
 * Record of choices made in a scenario.
 */
export interface ScenarioChoices {
  /** Scenario ID */
  scenarioId: string;
  /** Map of stage ID to selected option */
  choices: Record<string, Option>;
  /** Whether the scenario was completed */
  completed: boolean;
  /** Timestamp of completion (if completed) */
  completedAt?: string;
}

/**
 * Overall user progress in a Beat.
 */
export interface BeatProgress {
  /** Beat ID */
  beatId: string;
  /** Current view state */
  currentView: ViewState;
  /** Completed scenario IDs */
  completedScenarios: string[];
  /** Detailed choices per scenario */
  scenarioChoices: ScenarioChoices[];
}
