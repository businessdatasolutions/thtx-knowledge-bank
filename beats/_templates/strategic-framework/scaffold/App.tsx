/**
 * {{BEAT_TITLE}}
 *
 * Strategic Framework Beat Application
 */

import React from 'react';
import { StrategicFrameworkTemplate } from '../_templates/strategic-framework';
import { BEAT_CONTENT } from './constants';
import { DEFAULT_NL_LABELS } from '../_templates/strategic-framework/schema';

const App: React.FC = () => {
  // Merge content with default labels
  const content = {
    ...BEAT_CONTENT,
    ui: {
      ...DEFAULT_NL_LABELS,
      ...((BEAT_CONTENT as any).ui || {}),
    },
  };

  return <StrategicFrameworkTemplate content={content as any} />;
};

export default App;
