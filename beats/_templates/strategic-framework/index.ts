/**
 * Strategic Framework Template
 *
 * Export all template components and types.
 */

export { StrategicFrameworkTemplate } from './StrategicFrameworkTemplate';
export type { StrategicFrameworkTemplateProps } from './StrategicFrameworkTemplate';

export {
  DEFAULT_NL_LABELS,
  DEFAULT_QUADRANT_COLORS,
  validateContent,
  createContent,
} from './schema';

export type {
  StrategicFrameworkContent,
  StrategicFrameworkLabels,
  Framework,
  FrameworkContext,
  Quadrant,
  QuadrantPosition,
  Axis,
} from './schema';

export { InteractiveMatrix, QuadrantDetail } from './components';
