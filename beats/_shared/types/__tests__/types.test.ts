/**
 * Type validation tests - these are compile-time checks.
 * If this file compiles without errors, the types are correctly defined.
 */

import type {
  ViewState,
  Language,
  BeatMetadata,
  NavigationProps,
  Option,
  Stage,
  Scenario,
  ContentSection,
} from '../common';

// Test ViewState type
const validViewStates: ViewState[] = ['INTRO', 'DASHBOARD', 'SCENARIO', 'SUMMARY'];

// Test Language type
const validLanguage: Language = 'NL';

// Test BeatMetadata interface
const sampleMetadata: BeatMetadata = {
  id: 'test-beat',
  title: 'Test Beat',
  description: 'A test beat for validation',
  author: 'Test Author',
  publishDate: '2024-01-01',
  templateType: 'concept-tutorial',
  tags: ['test', 'validation'],
};

// Test NavigationProps interface
const sampleNavProps: NavigationProps = {
  currentView: 'INTRO',
  onNavigate: (view: ViewState) => console.log(view),
  canGoBack: false,
  canGoForward: true,
  title: 'Test Navigation',
};

// Test Option interface
const sampleOption: Option = {
  id: 'option-1',
  text: 'First option',
  feedback: 'Good choice!',
  isCorrect: true,
};

// Test Stage interface
const sampleStage: Stage = {
  id: 'stage-1',
  question: 'What is the answer?',
  options: [sampleOption],
  instruction: 'Choose wisely',
};

// Test Scenario interface
const sampleScenario: Scenario = {
  id: 'scenario-1',
  title: 'Test Scenario',
  description: 'A test scenario',
  icon: 'BookOpen',
  context: 'Background context here',
  stages: [sampleStage],
  summary: 'Summary of the scenario',
};

// Test ContentSection interface
const sampleSection: ContentSection = {
  id: 'section-1',
  tabLabel: 'WHY',
  title: 'Why This Matters',
  content: 'Content goes here',
};

// Export to prevent "unused variable" warnings
export {
  validViewStates,
  validLanguage,
  sampleMetadata,
  sampleNavProps,
  sampleOption,
  sampleStage,
  sampleScenario,
  sampleSection,
};
