/**
 * Concept Tutorial Template
 *
 * A multi-stage educational template with:
 * - INTRO: Tabbed theory sections
 * - DASHBOARD: Scenario selection grid
 * - SCENARIO: Interactive stage progression
 * - SUMMARY: Results and retrospective
 */

import React, { useState, useMemo } from 'react';
import { BookOpen, CheckCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { Button, Card, TabGroup, ProgressBar } from '../../_shared/components';
import { shuffle } from '../../_shared/utils';
import type { Option, ViewState } from '../../_shared/types/common';
import type { ConceptTutorialContent } from './schema';
import StageSelector from './components/StageSelector';
import ScenarioProgress from './components/ScenarioProgress';

export interface ConceptTutorialTemplateProps {
  /** Complete content for the tutorial */
  content: ConceptTutorialContent;
}

type StageKey = 'data' | 'logic' | 'action';

interface ScenarioChoices {
  data: Option | null;
  logic: Option | null;
  action: Option | null;
}

/**
 * Main template component for Concept Tutorial Beats.
 */
export const ConceptTutorialTemplate: React.FC<ConceptTutorialTemplateProps> = ({
  content,
}) => {
  const { metadata, intro, scenarios, ui } = content;

  // View state
  const [currentView, setCurrentView] = useState<ViewState>('INTRO');
  const [activeScenarioId, setActiveScenarioId] = useState<string | null>(null);
  const [completedScenarios, setCompletedScenarios] = useState<string[]>([]);

  // Intro state
  const [activeTabId, setActiveTabId] = useState(intro.sections[0]?.id || '');

  // Scenario state
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [choices, setChoices] = useState<ScenarioChoices>({
    data: null,
    logic: null,
    action: null,
  });

  // Derived state
  const activeScenario = scenarios.find(s => s.id === activeScenarioId);
  const currentStage = activeScenario?.stages[currentStageIndex];
  const stageKeys: StageKey[] = ['data', 'logic', 'action'];
  const currentStageKey = stageKeys[currentStageIndex] || 'data';

  // Tab configuration for intro
  const tabs = intro.sections.map(section => ({
    id: section.id,
    label: section.tabLabel,
  }));

  // Handlers
  const handleStartExploring = () => {
    setCurrentView('DASHBOARD');
  };

  const handleSelectScenario = (scenarioId: string) => {
    setActiveScenarioId(scenarioId);
    setCurrentStageIndex(0);
    setSelectedOption(null);
    setChoices({ data: null, logic: null, action: null });
    setCurrentView('SCENARIO');
  };

  const handleOptionSelect = (option: Option) => {
    setSelectedOption(option);
  };

  const handleNextStage = () => {
    if (!selectedOption || !activeScenario) return;

    // Save choice
    const newChoices = { ...choices, [currentStageKey]: selectedOption };
    setChoices(newChoices);

    if (currentStageIndex < activeScenario.stages.length - 1) {
      // Move to next stage
      setCurrentStageIndex(prev => prev + 1);
      setSelectedOption(null);
    } else {
      // Complete scenario
      setCompletedScenarios(prev => [...new Set([...prev, activeScenario.id])]);
      setCurrentView('SUMMARY');
    }
  };

  const handleBackToDashboard = () => {
    setActiveScenarioId(null);
    setCurrentView('DASHBOARD');
  };

  const handleBackToIntro = () => {
    setCurrentView('INTRO');
  };

  // Render helpers
  const renderIntroView = () => {
    const activeSection = intro.sections.find(s => s.id === activeTabId);

    return (
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="px-8 py-6 border-b border-slate-200 bg-white">
          <h1 className="text-2xl font-bold text-slate-900">{metadata.title}</h1>
          <p className="text-slate-600 mt-1">{ui.introSubtitle}</p>
        </div>

        {/* Tab navigation */}
        <div className="px-8 pt-4 bg-white">
          <TabGroup
            tabs={tabs}
            activeTab={activeTabId}
            onChange={setActiveTabId}
            variant="underline"
          />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          {activeSection && (
            <div className="max-w-3xl">
              <h2 className="text-xl font-semibold text-slate-800 mb-4">
                {activeSection.title}
              </h2>
              <div className="prose prose-slate">
                {typeof activeSection.content === 'string' ? (
                  <p>{activeSection.content}</p>
                ) : (
                  activeSection.content
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-8 py-4 border-t border-slate-200 bg-white">
          <Button
            variant="primary"
            size="lg"
            rightIcon={<ArrowRight className="w-5 h-5" />}
            onClick={handleStartExploring}
          >
            {ui.startExploring}
          </Button>
        </div>
      </div>
    );
  };

  const renderDashboardView = () => {
    const completedCount = completedScenarios.length;
    const totalCount = scenarios.length;

    return (
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="px-8 py-6 border-b border-slate-200 bg-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">{ui.dashboardTitle}</h1>
              <p className="text-slate-600 mt-1">{ui.dashboardSubtitle}</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-blue-600">{completedCount}</span>
              <span className="text-slate-400 mx-1">/</span>
              <span className="text-slate-600">{totalCount}</span>
              <p className="text-sm text-slate-500">
                {completedCount === 1 ? ui.scenarioCompleted : ui.scenariosCompleted}
              </p>
            </div>
          </div>
        </div>

        {/* Scenario grid */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scenarios.map(scenario => {
              const isCompleted = completedScenarios.includes(scenario.id);

              return (
                <Card
                  key={scenario.id}
                  onClick={() => handleSelectScenario(scenario.id)}
                  isCompleted={isCompleted}
                  className="relative"
                >
                  {isCompleted && (
                    <div className="absolute top-4 right-4">
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    </div>
                  )}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900">{scenario.title}</h3>
                      <p className="text-sm text-slate-600 mt-1">{scenario.description}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-4 border-t border-slate-200 bg-white">
          <Button variant="ghost" onClick={handleBackToIntro}>
            {ui.backToDashboard}
          </Button>
        </div>
      </div>
    );
  };

  const renderScenarioView = () => {
    if (!activeScenario || !currentStage) return null;

    const totalStages = activeScenario.stages.length;

    return (
      <div className="flex flex-col h-full">
        {/* Header with progress */}
        <div className="px-8 py-6 border-b border-slate-200 bg-white">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-slate-900">{activeScenario.title}</h1>
            <Button variant="ghost" size="sm" onClick={handleBackToDashboard}>
              {ui.backToDashboard}
            </Button>
          </div>
          <ScenarioProgress
            currentStep={currentStageIndex}
            totalSteps={totalStages}
            labels={[ui.stageLabels.data, ui.stageLabels.logic, ui.stageLabels.action]}
          />
        </div>

        {/* Context */}
        <div className="px-8 py-4 bg-slate-50 border-b border-slate-200">
          <p className="text-slate-700">{activeScenario.context}</p>
        </div>

        {/* Stage content */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          <StageSelector
            stage={currentStage}
            selectedOption={selectedOption}
            onSelect={handleOptionSelect}
            stageLabel={ui.stageLabels[currentStageKey]}
          />
        </div>

        {/* Feedback panel (when option selected) */}
        {selectedOption && (
          <div className={`px-8 py-4 border-t ${selectedOption.isCorrect ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'}`}>
            <div className="flex items-start gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${selectedOption.isCorrect ? 'bg-green-100' : 'bg-amber-100'}`}>
                {selectedOption.isCorrect ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <RotateCcw className="w-5 h-5 text-amber-600" />
                )}
              </div>
              <div className="flex-1">
                <p className={`font-medium ${selectedOption.isCorrect ? 'text-green-800' : 'text-amber-800'}`}>
                  {selectedOption.isCorrect ? 'Goede keuze!' : 'Interessante keuze'}
                </p>
                <p className={`text-sm mt-1 ${selectedOption.isCorrect ? 'text-green-700' : 'text-amber-700'}`}>
                  {selectedOption.feedback}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="px-8 py-4 border-t border-slate-200 bg-white">
          <div className="flex justify-between items-center">
            <p className="text-sm text-slate-500">
              {ui.stage} {currentStageIndex + 1} {ui.of} {totalStages}
            </p>
            <Button
              variant="primary"
              onClick={handleNextStage}
              disabled={!selectedOption}
              rightIcon={<ArrowRight className="w-5 h-5" />}
            >
              {currentStageIndex < totalStages - 1 ? ui.nextStage : ui.complete}
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const renderSummaryView = () => {
    if (!activeScenario) return null;

    return (
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="px-8 py-6 border-b border-slate-200 bg-white">
          <h1 className="text-2xl font-bold text-slate-900">{ui.summaryTitle}</h1>
          <p className="text-slate-600 mt-1">{activeScenario.title}</p>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          {/* Choices summary */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">{ui.yourChoices}</h2>
            <div className="flex items-center gap-4">
              {stageKeys.map((key, index) => {
                const choice = choices[key];
                if (!choice) return null;

                return (
                  <React.Fragment key={key}>
                    <div className={`flex-1 p-4 rounded-lg ${
                      key === 'data' ? 'bg-blue-50 border border-blue-200' :
                      key === 'logic' ? 'bg-purple-50 border border-purple-200' :
                      'bg-green-50 border border-green-200'
                    }`}>
                      <p className={`text-xs font-medium uppercase tracking-wider mb-1 ${
                        key === 'data' ? 'text-blue-600' :
                        key === 'logic' ? 'text-purple-600' :
                        'text-green-600'
                      }`}>
                        {ui.stageLabels[key]}
                      </p>
                      <p className="text-sm text-slate-800 font-medium">{choice.text}</p>
                    </div>
                    {index < stageKeys.length - 1 && (
                      <ArrowRight className="w-5 h-5 text-slate-400 flex-shrink-0" />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Retrospective */}
          <div>
            <h2 className="text-lg font-semibold text-slate-800 mb-4">{ui.retrospective}</h2>
            <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
              <p className="text-slate-700 leading-relaxed">{activeScenario.summary}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-4 border-t border-slate-200 bg-white">
          <Button variant="primary" onClick={handleBackToDashboard}>
            {ui.backToScenarios}
          </Button>
        </div>
      </div>
    );
  };

  // Main render
  return (
    <div className="h-screen bg-slate-50 overflow-hidden">
      {currentView === 'INTRO' && renderIntroView()}
      {currentView === 'DASHBOARD' && renderDashboardView()}
      {currentView === 'SCENARIO' && renderScenarioView()}
      {currentView === 'SUMMARY' && renderSummaryView()}
    </div>
  );
};

export default ConceptTutorialTemplate;
