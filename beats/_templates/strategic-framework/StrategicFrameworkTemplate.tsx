/**
 * Strategic Framework Template
 *
 * An interactive 2x2 matrix template with:
 * - INTRO: Framework introduction and usage instructions
 * - FRAMEWORK: Interactive 2x2 matrix visualization
 * - DETAIL: Deep dive into selected quadrant
 */

import React, { useState } from 'react';
import { ArrowRight, ChevronLeft } from 'lucide-react';
import { Button, Card, GoldenCircleSection, KeyTakeawaysCard } from '../../_shared/components';
import type { StrategicFrameworkContent, Quadrant } from './schema';
import InteractiveMatrix from './components/InteractiveMatrix';
import QuadrantDetail from './components/QuadrantDetail';

export interface StrategicFrameworkTemplateProps {
  /** Complete content for the framework */
  content: StrategicFrameworkContent;
}

type FrameworkView = 'INTRO' | 'FRAMEWORK' | 'DETAIL';

/**
 * Main template component for Strategic Framework Beats.
 */
export const StrategicFrameworkTemplate: React.FC<StrategicFrameworkTemplateProps> = ({
  content,
}) => {
  const { metadata, framework, context, ui } = content;

  // View state
  const [currentView, setCurrentView] = useState<FrameworkView>('INTRO');
  const [selectedQuadrant, setSelectedQuadrant] = useState<Quadrant | null>(null);

  // Handlers
  const handleStartExploring = () => {
    setCurrentView('FRAMEWORK');
  };

  const handleSelectQuadrant = (quadrant: Quadrant) => {
    setSelectedQuadrant(quadrant);
    setCurrentView('DETAIL');
  };

  const handleBackToFramework = () => {
    setSelectedQuadrant(null);
    setCurrentView('FRAMEWORK');
  };

  const handleBackToIntro = () => {
    setCurrentView('INTRO');
  };

  // Render helpers
  const renderIntroView = () => {
    return (
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="px-8 py-6 border-b border-slate-200 bg-white">
          <h1 className="text-2xl font-bold text-slate-900">{metadata.title}</h1>
          <p className="text-slate-600 mt-1">{ui.subtitle}</p>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          <div className="max-w-3xl space-y-6">
            {/* WHY Section */}
            <GoldenCircleSection
              type="why"
              title={ui.whyTitle}
              headline={context.why.headline}
              paragraph={context.why.paragraph}
              keyPoints={context.why.keyPoints}
              steps={context.why.steps}
            />

            {/* HOW Section */}
            <GoldenCircleSection
              type="how"
              title={ui.howTitle}
              headline={context.how.headline}
              paragraph={context.how.paragraph}
              keyPoints={context.how.keyPoints}
              steps={context.how.steps}
            />

            {/* WHAT Section */}
            <GoldenCircleSection
              type="what"
              title={ui.whatTitle}
              headline={context.what.headline}
              paragraph={context.what.paragraph}
              keyPoints={context.what.keyPoints}
              steps={context.what.steps}
            />

            {/* Key Takeaways */}
            {context.keyTakeaways && context.keyTakeaways.length > 0 && (
              <KeyTakeawaysCard
                title={ui.keyTakeawaysTitle}
                takeaways={context.keyTakeaways}
              />
            )}

            {/* Framework preview */}
            <section className="pt-4">
              <Card className="bg-slate-50">
                <div className="text-center">
                  <h3 className="font-semibold text-slate-800 mb-2">{framework.title}</h3>
                  <p className="text-sm text-slate-600 mb-4">{framework.description}</p>
                  <div className="grid grid-cols-2 gap-2 max-w-xs mx-auto">
                    {framework.quadrants.map(quadrant => (
                      <div
                        key={quadrant.id}
                        className={`p-2 rounded text-xs font-medium text-center ${quadrant.color} text-slate-700`}
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

  const renderFrameworkView = () => {
    return (
      <div className="flex flex-col h-full">
        {/* Header */}
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

        {/* Matrix */}
        <div className="flex-1 overflow-hidden p-8">
          <InteractiveMatrix
            framework={framework}
            onSelectQuadrant={handleSelectQuadrant}
            selectedQuadrantId={selectedQuadrant?.id || null}
          />
        </div>
      </div>
    );
  };

  const renderDetailView = () => {
    if (!selectedQuadrant) return null;

    return (
      <div className="flex flex-col h-full">
        {/* Header */}
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

        {/* Detail content */}
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

  // Main render
  return (
    <div className="h-screen bg-slate-50 overflow-hidden">
      {currentView === 'INTRO' && renderIntroView()}
      {currentView === 'FRAMEWORK' && renderFrameworkView()}
      {currentView === 'DETAIL' && renderDetailView()}
    </div>
  );
};

/**
 * Get human-readable position label.
 */
function getPositionLabel(position: string): string {
  const labels: Record<string, string> = {
    'top-left': 'Linksboven',
    'top-right': 'Rechtsboven',
    'bottom-left': 'Linksonder',
    'bottom-right': 'Rechtsonder',
  };
  return labels[position] || position;
}

export default StrategicFrameworkTemplate;
