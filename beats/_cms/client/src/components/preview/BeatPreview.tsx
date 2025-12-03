import React from 'react';
import { StrategicFrameworkPreview } from './strategic-framework';
import type { StrategicFrameworkContent } from './strategic-framework';

export interface BeatPreviewProps {
  content: any;
  templateType: 'strategic-framework' | 'concept-tutorial';
}

export const BeatPreview: React.FC<BeatPreviewProps> = ({ content, templateType }) => {
  if (templateType === 'strategic-framework') {
    return <StrategicFrameworkPreview content={content as StrategicFrameworkContent} />;
  }

  if (templateType === 'concept-tutorial') {
    // TODO: Implement ConceptTutorialPreview
    return (
      <div className="h-full flex items-center justify-center bg-slate-100">
        <div className="text-center text-slate-500">
          <p className="text-lg font-medium">Concept Tutorial Preview</p>
          <p className="text-sm">Preview voor dit template type is nog niet beschikbaar.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex items-center justify-center bg-slate-100">
      <div className="text-center text-slate-500">
        <p className="text-lg font-medium">Onbekend template type</p>
        <p className="text-sm">{templateType}</p>
      </div>
    </div>
  );
};

export default BeatPreview;
