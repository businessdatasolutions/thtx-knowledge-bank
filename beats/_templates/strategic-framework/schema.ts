/**
 * Strategic Framework Template Schema
 *
 * Defines the content structure for Strategic Framework Beats.
 * This template is designed for interactive 2x2 matrices and
 * strategic positioning exercises.
 */

import type { BeatMetadata } from '../../_shared/types/common';

/**
 * Position within the 2x2 matrix.
 */
export type QuadrantPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

/**
 * A quadrant in the 2x2 matrix.
 */
export interface Quadrant {
  /** Unique identifier */
  id: string;
  /** Position in the matrix */
  position: QuadrantPosition;
  /** Quadrant title */
  title: string;
  /** Detailed description */
  description: string;
  /** Example items/organizations in this quadrant */
  examples: string[];
  /** Background color (Tailwind class or hex) */
  color: string;
  /** Optional icon name from lucide-react */
  icon?: string;
  /** Strategic recommendations for this position */
  recommendations?: string[];
}

/**
 * Axis configuration for the matrix.
 */
export interface Axis {
  /** Axis label */
  label: string;
  /** Label for low end of axis */
  lowLabel: string;
  /** Label for high end of axis */
  highLabel: string;
}

/**
 * The framework/matrix configuration.
 */
export interface Framework {
  /** Framework title */
  title: string;
  /** Framework description */
  description: string;
  /** X-axis (horizontal) configuration */
  xAxis: Axis;
  /** Y-axis (vertical) configuration */
  yAxis: Axis;
  /** The four quadrants */
  quadrants: Quadrant[];
}

/**
 * A Golden Circle section (WHY, HOW, or WHAT).
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
 * Context/introduction content using Golden Circle structure (Sinek).
 * WHY → HOW → WHAT
 */
export interface FrameworkContext {
  /** WHY - Why this framework matters, the problem it solves */
  why: GoldenCircleSection;
  /** HOW - How the framework works, the approach */
  how: GoldenCircleSection;
  /** WHAT - What you will learn, concrete outcomes */
  what: GoldenCircleSection;
  /** Key takeaways - 3-5 main insights */
  keyTakeaways: string[];
}

/**
 * UI labels for the template - Dutch.
 */
export interface StrategicFrameworkLabels {
  // Navigation
  title: string;
  subtitle: string;
  backToIntro: string;
  backToFramework: string;
  explore: string;

  // Intro view - Golden Circle sections
  whyTitle: string;
  howTitle: string;
  whatTitle: string;
  keyTakeawaysTitle: string;
  startExploring: string;

  // Framework view
  selectQuadrant: string;
  clickToExplore: string;

  // Detail view
  examplesTitle: string;
  recommendationsTitle: string;
  positionLabel: string;

  // Misc
  loading: string;
}

/**
 * Complete content structure for a Strategic Framework Beat.
 */
export interface StrategicFrameworkContent {
  /** Beat metadata for catalog and identification */
  metadata: BeatMetadata;

  /** The framework configuration */
  framework: Framework;

  /** Context and introduction */
  context: FrameworkContext;

  /** UI labels in Dutch */
  ui: StrategicFrameworkLabels;
}

/**
 * Default Dutch labels for the Strategic Framework template.
 */
export const DEFAULT_NL_LABELS: StrategicFrameworkLabels = {
  // Navigation
  title: 'Strategisch Framework',
  subtitle: 'Interactieve verkenning',
  backToIntro: 'Terug naar introductie',
  backToFramework: 'Terug naar framework',
  explore: 'Verkennen',

  // Intro view - Golden Circle sections
  whyTitle: 'Waarom dit framework',
  howTitle: 'Hoe het werkt',
  whatTitle: 'Wat je leert',
  keyTakeawaysTitle: 'Belangrijkste inzichten',
  startExploring: 'Start verkenning',

  // Framework view
  selectQuadrant: 'Selecteer een kwadrant',
  clickToExplore: 'Klik op een kwadrant om meer te leren',

  // Detail view
  examplesTitle: 'Voorbeelden',
  recommendationsTitle: 'Aanbevelingen',
  positionLabel: 'Positie',

  // Misc
  loading: 'Laden...',
};

/**
 * Default quadrant colors (Tailwind classes).
 */
export const DEFAULT_QUADRANT_COLORS: Record<QuadrantPosition, string> = {
  'top-left': 'bg-purple-100',
  'top-right': 'bg-blue-100',
  'bottom-left': 'bg-amber-100',
  'bottom-right': 'bg-green-100',
};

/**
 * Validates that the content structure is complete and valid.
 *
 * @param content - The content object to validate
 * @returns An array of validation error messages (empty if valid)
 */
export function validateContent(content: StrategicFrameworkContent): string[] {
  const errors: string[] = [];

  // Validate metadata
  if (!content.metadata?.id) {
    errors.push('Missing metadata.id');
  }
  if (!content.metadata?.title) {
    errors.push('Missing metadata.title');
  }
  if (content.metadata?.templateType !== 'strategic-framework') {
    errors.push('Invalid templateType: must be "strategic-framework"');
  }

  // Validate framework
  if (!content.framework) {
    errors.push('Missing framework configuration');
  } else {
    if (!content.framework.title) {
      errors.push('Missing framework.title');
    }
    if (!content.framework.xAxis?.label) {
      errors.push('Missing framework.xAxis.label');
    }
    if (!content.framework.yAxis?.label) {
      errors.push('Missing framework.yAxis.label');
    }

    // Validate quadrants
    if (!content.framework.quadrants || content.framework.quadrants.length !== 4) {
      errors.push('Exactly 4 quadrants are required');
    } else {
      const positions = new Set(content.framework.quadrants.map(q => q.position));
      const requiredPositions: QuadrantPosition[] = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
      requiredPositions.forEach(pos => {
        if (!positions.has(pos)) {
          errors.push(`Missing quadrant for position: ${pos}`);
        }
      });

      content.framework.quadrants.forEach((quadrant, index) => {
        if (!quadrant.id) {
          errors.push(`Quadrant ${index}: missing id`);
        }
        if (!quadrant.title) {
          errors.push(`Quadrant ${index}: missing title`);
        }
        if (!quadrant.description) {
          errors.push(`Quadrant ${index}: missing description`);
        }
      });
    }
  }

  // Validate context - Golden Circle structure
  if (!content.context) {
    errors.push('Missing context');
  } else {
    // Validate WHY section
    if (!content.context.why) {
      errors.push('Missing context.why');
    } else {
      if (!content.context.why.headline) errors.push('Missing context.why.headline');
      if (!content.context.why.paragraph) errors.push('Missing context.why.paragraph');
      if (!content.context.why.keyPoints || content.context.why.keyPoints.length < 3) {
        errors.push('context.why.keyPoints must have at least 3 items');
      }
    }
    // Validate HOW section
    if (!content.context.how) {
      errors.push('Missing context.how');
    } else {
      if (!content.context.how.headline) errors.push('Missing context.how.headline');
      if (!content.context.how.paragraph) errors.push('Missing context.how.paragraph');
      if (!content.context.how.keyPoints || content.context.how.keyPoints.length < 3) {
        errors.push('context.how.keyPoints must have at least 3 items');
      }
    }
    // Validate WHAT section
    if (!content.context.what) {
      errors.push('Missing context.what');
    } else {
      if (!content.context.what.headline) errors.push('Missing context.what.headline');
      if (!content.context.what.paragraph) errors.push('Missing context.what.paragraph');
      if (!content.context.what.keyPoints || content.context.what.keyPoints.length < 3) {
        errors.push('context.what.keyPoints must have at least 3 items');
      }
    }
    // Validate key takeaways
    if (!content.context.keyTakeaways || content.context.keyTakeaways.length < 3) {
      errors.push('context.keyTakeaways must have at least 3 items');
    }
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
  partial: Partial<StrategicFrameworkContent> & {
    metadata: BeatMetadata;
    framework: Framework;
    context: FrameworkContext;
  }
): StrategicFrameworkContent {
  // Apply default colors to quadrants if not specified
  const quadrantsWithColors = partial.framework.quadrants.map(quadrant => ({
    ...quadrant,
    color: quadrant.color || DEFAULT_QUADRANT_COLORS[quadrant.position],
  }));

  return {
    ...partial,
    framework: {
      ...partial.framework,
      quadrants: quadrantsWithColors,
    },
    ui: {
      ...DEFAULT_NL_LABELS,
      ...partial.ui,
    },
  };
}
