import React from 'react';
import { CaseStudy, Option, Language } from '../types';
import { CheckCircle, Database, BrainCircuit, Activity, ArrowRight } from 'lucide-react';
import { UI_TEXT } from '../constants';

interface Props {
  caseStudy: CaseStudy;
  choices: {
    data: Option | null;
    logic: Option | null;
    action: Option | null;
  };
  lang: Language;
  onBack: () => void;
}

const CaseSummary: React.FC<Props> = ({ caseStudy, choices, lang, onBack }) => {
  const ui = UI_TEXT[lang];

  return (
    <div className="flex-1 overflow-y-auto p-8 bg-slate-50 flex flex-col items-center">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="bg-green-100 text-green-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={40} />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">{ui.summaryTitle}</h1>
          <p className="text-slate-500">{ui.summarySub}</p>
        </div>

        {/* Visual "Golden Thread" */}
        <div className="flex flex-col md:flex-row items-stretch gap-4 mb-10">
          
          {/* Choice 1: Data */}
          <div className="flex-1 bg-blue-50 border border-blue-200 rounded-xl p-5 flex flex-col items-center text-center relative">
             <div className="bg-blue-500 text-white p-2 rounded-full mb-3">
               <Database size={20} />
             </div>
             <h4 className="font-bold text-blue-900 mb-1">DATA</h4>
             <p className="text-sm text-blue-800 italic">{choices.data?.label}</p>
             <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-slate-300">
                <ArrowRight size={24} className="stroke-[3px]" />
             </div>
          </div>

          {/* Choice 2: Logic */}
          <div className="flex-1 bg-purple-50 border border-purple-200 rounded-xl p-5 flex flex-col items-center text-center relative">
             <div className="bg-purple-500 text-white p-2 rounded-full mb-3">
               <BrainCircuit size={20} />
             </div>
             <h4 className="font-bold text-purple-900 mb-1">LOGIC</h4>
             <p className="text-sm text-purple-800 italic">{choices.logic?.label}</p>
             <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-slate-300">
                <ArrowRight size={24} className="stroke-[3px]" />
             </div>
          </div>

           {/* Choice 3: Action */}
           <div className="flex-1 bg-emerald-50 border border-emerald-200 rounded-xl p-5 flex flex-col items-center text-center">
             <div className="bg-emerald-500 text-white p-2 rounded-full mb-3">
               <Activity size={20} />
             </div>
             <h4 className="font-bold text-emerald-900 mb-1">ACTION</h4>
             <p className="text-sm text-emerald-800 italic">{choices.action?.label}</p>
          </div>

        </div>

        {/* Retrospective Text */}
        <div className="bg-slate-50 p-6 rounded-xl border-l-4 border-indigo-500 mb-8">
           <h3 className="font-bold text-indigo-900 mb-2 text-lg">Analysis</h3>
           <p className="text-slate-700 leading-relaxed text-lg">
             {caseStudy.summary}
           </p>
        </div>

        {/* Footer */}
        <div className="text-center">
           <button 
             onClick={onBack}
             className="bg-slate-900 text-white px-8 py-3 rounded-lg font-bold hover:bg-slate-700 transition-colors shadow-lg"
           >
             {ui.backToDash}
           </button>
        </div>

      </div>
    </div>
  );
};

export default CaseSummary;