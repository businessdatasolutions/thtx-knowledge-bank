import React from 'react';
import { Database, BrainCircuit, Activity } from 'lucide-react';
import { Language } from '../types';

interface Props {
  activeStage: 'DATA' | 'LOGIC' | 'ACTION' | null;
  lang: Language;
}

const InteractiveDiagram: React.FC<Props> = ({ activeStage, lang }) => {
  const t = {
    EN: {
      nouns: "The Nouns",
      nounsDesc: "Semantic objects, real-time feeds, integrated sources.",
      reasoning: "The Reasoning",
      reasoningDesc: "Forecasts, simulations, optimization models.",
      verbs: "The Verbs",
      verbsDesc: "Write-back, operational execution, closing the loop."
    },
    NL: {
      nouns: "De Nouns",
      nounsDesc: "Semantische objecten, real-time feeds, geïntegreerde bronnen.",
      reasoning: "De Redenering",
      reasoningDesc: "Forecasts, simulaties, optimalisatie-modellen.",
      verbs: "De Werkwoorden",
      verbsDesc: "Write-back, operationele executie, closing the loop."
    }
  };

  const text = t[lang];

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 py-8 px-4 bg-slate-100 rounded-xl my-6 border border-slate-200 shadow-inner">
      {/* DATA NODE */}
      <div className={`relative flex flex-col items-center p-6 rounded-lg transition-all duration-500 ${activeStage === 'DATA' ? 'bg-blue-100 scale-110 shadow-lg border-2 border-blue-400' : 'bg-white border border-slate-200 opacity-60'}`}>
        <div className="p-3 bg-blue-500 rounded-full mb-3 text-white">
          <Database size={24} />
        </div>
        <h3 className="font-bold text-slate-800">DATA</h3>
        <span className="text-xs text-slate-500 uppercase tracking-wider">{text.nouns}</span>
        <p className="text-xs text-center text-slate-600 mt-2 max-w-[120px]">
          {text.nounsDesc}
        </p>
      </div>

      {/* CONNECTOR 1 */}
      <div className="h-1 w-8 md:w-16 bg-slate-300 rounded relative overflow-hidden">
        <div className={`absolute top-0 left-0 h-full w-full bg-blue-500 origin-left transition-transform duration-1000 ${activeStage === 'LOGIC' || activeStage === 'ACTION' ? 'scale-x-100' : 'scale-x-0'}`} />
      </div>

      {/* LOGIC NODE */}
      <div className={`relative flex flex-col items-center p-6 rounded-lg transition-all duration-500 ${activeStage === 'LOGIC' ? 'bg-purple-100 scale-110 shadow-lg border-2 border-purple-400' : 'bg-white border border-slate-200 opacity-60'}`}>
        <div className="p-3 bg-purple-500 rounded-full mb-3 text-white">
          <BrainCircuit size={24} />
        </div>
        <h3 className="font-bold text-slate-800">LOGIC</h3>
        <span className="text-xs text-slate-500 uppercase tracking-wider">{text.reasoning}</span>
         <p className="text-xs text-center text-slate-600 mt-2 max-w-[120px]">
          {text.reasoningDesc}
        </p>
      </div>

      {/* CONNECTOR 2 */}
      <div className="h-1 w-8 md:w-16 bg-slate-300 rounded relative overflow-hidden">
        <div className={`absolute top-0 left-0 h-full w-full bg-purple-500 origin-left transition-transform duration-1000 ${activeStage === 'ACTION' ? 'scale-x-100' : 'scale-x-0'}`} />
      </div>

      {/* ACTION NODE */}
      <div className={`relative flex flex-col items-center p-6 rounded-lg transition-all duration-500 ${activeStage === 'ACTION' ? 'bg-emerald-100 scale-110 shadow-lg border-2 border-emerald-400' : 'bg-white border border-slate-200 opacity-60'}`}>
        <div className="p-3 bg-emerald-500 rounded-full mb-3 text-white">
          <Activity size={24} />
        </div>
        <h3 className="font-bold text-slate-800">ACTION</h3>
        <span className="text-xs text-slate-500 uppercase tracking-wider">{text.verbs}</span>
        <p className="text-xs text-center text-slate-600 mt-2 max-w-[120px]">
          {text.verbsDesc}
        </p>
      </div>
    </div>
  );
};

export default InteractiveDiagram;