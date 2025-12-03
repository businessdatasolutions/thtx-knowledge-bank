/**
 * {{BEAT_TITLE}}
 *
 * Concept Tutorial Beat Application
 */

import React from 'react';
import { ConceptTutorialTemplate } from '../_templates/concept-tutorial';
import { BEAT_CONTENT } from './constants';
import { DEFAULT_NL_LABELS } from '../_templates/concept-tutorial/schema';

const App: React.FC = () => {
  // Merge content with default labels
  const content = {
    ...BEAT_CONTENT,
    ui: {
      ...DEFAULT_NL_LABELS,
      ...((BEAT_CONTENT as any).ui || {}),
    },
  };

  return <ConceptTutorialTemplate content={content as any} />;
};

export default App;
