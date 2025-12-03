import React, { useState } from 'react';
import { ArrowRight, ChevronLeft, Lightbulb, Target, List } from 'lucide-react';
import { Button } from '../Button';
import { Card } from '../Card';
import type { StrategicFrameworkContent, Quadrant } from './types';
import InteractiveMatrix from './InteractiveMatrix';
import QuadrantDetail from './QuadrantDetail';

export interface StrategicFrameworkPreviewProps {
  content: StrategicFrameworkContent;
}

type FrameworkView = 'INTRO' | 'FRAMEWORK' | 'DETAIL';

function getPositionLabel(position: string): string {
  const labels: Record<string, string> = {
    'top-left': 'Linksboven',
    'top-right': 'Rechtsboven',
    'bottom-left': 'Linksonder',
    'bottom-right': 'Rechtsonder',
  };
  return labels[position] || position;
}

// Default UI labels (Dutch)
const DEFAULT_UI = {
  title: 'Strategisch Framework',
  subtitle: 'Interactieve verkenning',
  backToIntro: 'Terug naar introductie',
  backToFramework: 'Terug naar framework',
  explore: 'Verkennen',
  introTitle: 'Over dit framework',
  howToUseTitle: 'Hoe te gebruiken',
  keyTakeawaysTitle: 'Belangrijkste inzichten',
  startExploring: 'Start verkenning',
  selectQuadrant: 'Selecteer een kwadrant',
  clickToExplore: 'Klik op een kwadrant om meer te leren',
  examplesTitle: 'Voorbeelden',
  recommendationsTitle: 'Aanbevelingen',
  positionLabel: 'Positie',
  loading: 'Laden...',
};

export const StrategicFrameworkPreview: React.FC<StrategicFrameworkPreviewProps> = ({
  content,
}) => {
  const { metadata, framework, context } = content || {};
  // Merge with defaults to handle missing ui property
  const ui = { ...DEFAULT_UI, ...content?.ui };

  const [currentView, setCurrentView] = useState<FrameworkView>('INTRO');
  const [selectedQuadrant, setSelectedQuadrant] = useState<Quadrant | null>(null);

  // Early return if essential data is missing
  if (!framework || !metadata) {
    return (
      <div className="h-full flex items-center justify-center bg-slate-100">
        <div className="text-center text-slate-500 p-8">
          <p className="text-lg font-medium mb-2">Preview niet beschikbaar</p>
          <p className="text-sm">De gegenereerde content mist vereiste velden (framework of metadata).</p>
        </div>
      </div>
    );
  }

  const handleStartExploring = () => setCurrentView('FRAMEWORK');
  const handleSelectQuadrant = (quadrant: Quadrant) => {
    setSelectedQuadrant(quadrant);
    setCurrentView('DETAIL');
  };
  const handleBackToFramework = () => {
    setSelectedQuadrant(null);
    setCurrentView('FRAMEWORK');
  };
  const handleBackToIntro = () => setCurrentView('INTRO');

  const renderIntroView = () => (
    <div className="flex flex-col h-full">
      <div className="px-8 py-6 border-b border-slate-200 bg-white">
        <h1 className="text-2xl font-bold text-slate-900">{metadata.title}</h1>
        <p className="text-slate-600 mt-1">{ui.subtitle}</p>
      </div>

      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="max-w-3xl space-y-8">
          {context?.introduction && (
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold text-slate-800">{ui.introTitle}</h2>
              </div>
              <p className="text-slate-700 leading-relaxed">{context.introduction}</p>
            </section>
          )}

          {context?.howToUse && (
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                  <Target className="w-5 h-5 text-purple-600" />
                </div>
                <h2 className="text-xl font-semibold text-slate-800">{ui.howToUseTitle}</h2>
              </div>
              <p className="text-slate-700 leading-relaxed">{context.howToUse}</p>
            </section>
          )}

          {context?.keyTakeaways && context.keyTakeaways.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <List className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-xl font-semibold text-slate-800">{ui.keyTakeawaysTitle}</h2>
              </div>
              <ul className="space-y-2">
                {context.keyTakeaways.map((takeaway, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-medium flex-shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-slate-700">{takeaway}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="pt-4">
            <Card className="bg-slate-50">
              <div className="text-center">
                <h3 className="font-semibold text-slate-800 mb-2">{framework.title}</h3>
                <p className="text-sm text-slate-600 mb-4">{framework.description}</p>
                <div className="grid grid-cols-2 gap-2 max-w-xs mx-auto">
                  {framework.quadrants?.map(quadrant => (
                    <div
                      key={quadrant.id}
                      className={`p-2 rounded text-xs font-medium text-center ${quadrant.color || 'bg-slate-100'} text-slate-700`}
                    >
                      {quadrant.title}
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </section>
        </div>
      </div>

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

  const renderFrameworkView = () => (
    <div className="flex flex-col h-full">
      <div className="px-8 py-6 border-b border-slate-200 bg-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{framework.title}</h1>
            <p className="text-slate-600 mt-1">{ui.clickToExplore}</p>
          </div>
          <Button variant="ghost" onClick={handleBackToIntro}>
            <ChevronLeft className="w-4 h-4 mr-1" />
            {ui.backToIntro}
          </Button>
        </div>
      </div>

      <div className="flex-1 p-6 pb-4 min-h-0">
        <InteractiveMatrix
          framework={framework}
          onSelectQuadrant={handleSelectQuadrant}
          selectedQuadrantId={selectedQuadrant?.id || null}
        />
      </div>
    </div>
  );

  const renderDetailView = () => {
    if (!selectedQuadrant) return null;

    return (
      <div className="flex flex-col h-full">
        <div className="px-8 py-6 border-b border-slate-200 bg-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">{selectedQuadrant.title}</h1>
              <p className="text-slate-600 mt-1">
                {ui.positionLabel}: {getPositionLabel(selectedQuadrant.position)}
              </p>
            </div>
            <Button variant="ghost" onClick={handleBackToFramework}>
              <ChevronLeft className="w-4 h-4 mr-1" />
              {ui.backToFramework}
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <QuadrantDetail
            quadrant={selectedQuadrant}
            framework={framework}
            labels={{
              examples: ui.examplesTitle,
              recommendations: ui.recommendationsTitle,
            }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="h-full bg-slate-50 overflow-hidden">
      {currentView === 'INTRO' && renderIntroView()}
      {currentView === 'FRAMEWORK' && renderFrameworkView()}
      {currentView === 'DETAIL' && renderDetailView()}
    </div>
  );
};

export default StrategicFrameworkPreview;
