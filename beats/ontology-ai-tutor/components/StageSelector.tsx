import React, { useMemo } from 'react';
import { Option, CaseStudyStage } from '../types';
import { CheckCircle2, Circle } from 'lucide-react';

interface Props {
  stage: CaseStudyStage;
  selectedOptionId: string | null;
  onSelect: (option: Option) => void;
  isProcessing: boolean;
}

const StageSelector: React.FC<Props> = ({ stage, selectedOptionId, onSelect, isProcessing }) => {
  // Randomize options only when the stage changes to prevent re-shuffling on re-renders
  const randomizedOptions = useMemo(() => {
    const options = [...stage.options];
    // Fisher-Yates shuffle
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }
    return options;
  }, [stage.id]);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">{stage.title}</h2>
        <p className="text-lg text-slate-600">{stage.instruction}</p>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {randomizedOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => !isProcessing && onSelect(option)}
            disabled={isProcessing}
            className={`
              relative p-6 rounded-xl border-2 text-left transition-all duration-200
              hover:shadow-md focus:outline-none group
              ${selectedOptionId === option.id 
                ? 'border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600' 
                : 'border-slate-200 bg-white hover:border-indigo-300'
              }
              ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            <div className="flex items-start justify-between">
              <div className="pr-8">
                <h4 className={`font-semibold text-lg mb-1 ${selectedOptionId === option.id ? 'text-indigo-900' : 'text-slate-800'}`}>
                  {option.label}
                </h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {option.description}
                </p>
              </div>
              <div className={`
                flex-shrink-0 mt-1
                ${selectedOptionId === option.id ? 'text-indigo-600' : 'text-slate-300 group-hover:text-indigo-300'}
              `}>
                {selectedOptionId === option.id ? <CheckCircle2 size={24} /> : <Circle size={24} />}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default StageSelector;