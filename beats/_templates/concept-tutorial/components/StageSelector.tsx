/**
 * Stage Selector Component
 *
 * Renders multiple-choice options for a scenario stage.
 * Options are shuffled on mount to prevent memorization.
 */

import React, { useMemo } from 'react';
import { Circle, CheckCircle2 } from 'lucide-react';
import { shuffle } from '../../../_shared/utils';
import type { Option, Stage } from '../../../_shared/types/common';

export interface StageSelectorProps {
  /** The current stage with question and options */
  stage: Stage;
  /** Currently selected option (if any) */
  selectedOption: Option | null;
  /** Callback when an option is selected */
  onSelect: (option: Option) => void;
  /** Label for the current stage (e.g., "Data", "Logic", "Action") */
  stageLabel: string;
  /** Whether selection is disabled */
  disabled?: boolean;
}

/**
 * Interactive option selector for scenario stages.
 * Shuffles options on stage change to encourage learning over memorization.
 */
export const StageSelector: React.FC<StageSelectorProps> = ({
  stage,
  selectedOption,
  onSelect,
  stageLabel,
  disabled = false,
}) => {
  // Shuffle options when stage changes (memoized to prevent re-shuffle on re-render)
  const shuffledOptions = useMemo(() => {
    return shuffle(stage.options);
  }, [stage.id]);

  return (
    <div className="space-y-6">
      {/* Stage header */}
      <div>
        <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-100 rounded-full mb-3">
          {stageLabel}
        </span>
        <h2 className="text-xl font-bold text-slate-800">{stage.question}</h2>
        {stage.instruction && (
          <p className="text-slate-600 mt-2">{stage.instruction}</p>
        )}
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 gap-4">
        {shuffledOptions.map((option) => {
          const isSelected = selectedOption?.id === option.id;

          return (
            <button
              key={option.id}
              onClick={() => !disabled && onSelect(option)}
              disabled={disabled}
              className={`
                relative p-5 rounded-xl border-2 text-left transition-all duration-200
                hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                ${isSelected
                  ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500'
                  : 'border-slate-200 bg-white hover:border-blue-300'
                }
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className={`font-medium ${isSelected ? 'text-blue-900' : 'text-slate-800'}`}>
                    {option.text}
                  </p>
                </div>
                <div className={`flex-shrink-0 ${isSelected ? 'text-blue-500' : 'text-slate-300'}`}>
                  {isSelected ? (
                    <CheckCircle2 className="w-6 h-6" />
                  ) : (
                    <Circle className="w-6 h-6" />
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default StageSelector;
