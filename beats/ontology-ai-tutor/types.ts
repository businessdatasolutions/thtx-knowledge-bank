import React from 'react';

export type Language = 'EN' | 'NL';

export type FrameworkCategory = 'DATA' | 'LOGIC' | 'ACTION';

export interface Option {
  id: string;
  label: string;
  description: string;
  category: FrameworkCategory;
  isCorrect: boolean;
  feedback: string; // Hardcoded educational feedback
}

export interface CaseStudyStage {
  id: string;
  title: string;
  instruction: string;
  options: Option[];
}

export interface CaseStudy {
  id: string;
  title: string;
  description: string;
  icon: string;
  context: string; // Background story
  summary: string; // Retrospective explanation
  stages: {
    data: CaseStudyStage;
    logic: CaseStudyStage;
    action: CaseStudyStage;
  };
}

export interface AppState {
  currentView: 'INTRO' | 'DASHBOARD' | 'CASE_STUDY' | 'SUMMARY';
  activeCaseId: string | null;
  completedCases: string[];
}

export interface TheorySection {
  id: string;
  label: string; // Short label for tabs (e.g. "WHY")
  title: string; // Full title
  content: React.ReactNode;
}

export interface AICritique {
  feedback: string;
  score: number;
  suggestions: string[];
}