export type QuadrantPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export interface Quadrant {
  id: string;
  position: QuadrantPosition;
  title: string;
  description: string;
  examples: string[];
  color: string;
  icon?: string;
  recommendations?: string[];
}

export interface Axis {
  label: string;
  lowLabel: string;
  highLabel: string;
}

export interface Framework {
  title: string;
  description: string;
  xAxis: Axis;
  yAxis: Axis;
  quadrants: Quadrant[];
}

export interface FrameworkContext {
  introduction: string;
  howToUse: string;
  keyTakeaways?: string[];
}

export interface StrategicFrameworkLabels {
  title: string;
  subtitle: string;
  backToIntro: string;
  backToFramework: string;
  explore: string;
  introTitle: string;
  howToUseTitle: string;
  keyTakeawaysTitle: string;
  startExploring: string;
  selectQuadrant: string;
  clickToExplore: string;
  examplesTitle: string;
  recommendationsTitle: string;
  positionLabel: string;
  loading: string;
}

export interface StrategicFrameworkContent {
  metadata: {
    id: string;
    title: string;
    description: string;
    author: string;
    version: string;
    templateType: string;
    publishDate: string;
    tags?: string[];
  };
  framework: Framework;
  context: FrameworkContext;
  ui: StrategicFrameworkLabels;
}
