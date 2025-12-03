/**
 * THTX Beats Shared Library
 *
 * Central export for all shared resources.
 */

// Components
export {
  Button,
  Card,
  ProgressBar,
  Navigation,
  TabGroup,
} from './components';

export type {
  ButtonProps,
  ButtonVariant,
  ButtonSize,
  ProgressBarProps,
  TabGroupProps,
  Tab,
} from './components';

// Re-export with renamed types to avoid conflicts
export type { CardProps as SharedCardProps } from './components';
export type { NavigationProps as SharedNavigationProps } from './components';

// Types from common
export type {
  ViewState,
  Language,
  TemplateType,
  BeatMetadata,
  Option,
  Stage,
  Scenario,
  ContentSection,
  SelectorProps,
  ProgressProps,
  CardProps,
  NavigationProps,
  ScenarioChoices,
  BeatProgress,
} from './types/common';

// Utilities
export { shuffle, classNames, cn } from './utils';

// Styles/Brand tokens are exported separately to avoid bundling overhead
// Import directly: import { colors, typography } from '@thtx/shared/styles/brand'
