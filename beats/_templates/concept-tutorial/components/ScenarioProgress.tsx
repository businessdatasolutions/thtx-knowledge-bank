/**
 * Scenario Progress Component
 *
 * Visual progress indicator for the three stages: Data → Logic → Action
 */

import React from 'react';
import { Database, BrainCircuit, Activity, Check } from 'lucide-react';

export interface ScenarioProgressProps {
  /** Current step index (0-based) */
  currentStep: number;
  /** Total number of steps */
  totalSteps: number;
  /** Labels for each step */
  labels: string[];
}

const StepIcon: React.FC<{
  index: number;
  isActive: boolean;
  isCompleted: boolean;
}> = ({ index, isActive, isCompleted }) => {
  const icons = [Database, BrainCircuit, Activity];
  const Icon = icons[index] || Activity;

  if (isCompleted) {
    return <Check className="w-5 h-5" />;
  }

  return <Icon className="w-5 h-5" />;
};

/**
 * Shows Data → Logic → Action progress with visual indicators.
 */
export const ScenarioProgress: React.FC<ScenarioProgressProps> = ({
  currentStep,
  totalSteps,
  labels,
}) => {
  const steps = Array.from({ length: totalSteps }, (_, i) => i);

  // Color schemes for each stage
  const getStepColors = (index: number, isActive: boolean, isCompleted: boolean) => {
    const baseColors = [
      { bg: 'bg-blue-100', text: 'text-blue-600', activeBg: 'bg-blue-500', line: 'bg-blue-500' },
      { bg: 'bg-purple-100', text: 'text-purple-600', activeBg: 'bg-purple-500', line: 'bg-purple-500' },
      { bg: 'bg-green-100', text: 'text-green-600', activeBg: 'bg-green-500', line: 'bg-green-500' },
    ];

    const colors = baseColors[index] || baseColors[2];

    if (isCompleted) {
      return {
        circle: `${colors.activeBg} text-white`,
        label: colors.text,
        line: colors.line,
      };
    }

    if (isActive) {
      return {
        circle: `${colors.activeBg} text-white ring-4 ring-${colors.bg}`,
        label: `${colors.text} font-semibold`,
        line: 'bg-slate-200',
      };
    }

    return {
      circle: `${colors.bg} ${colors.text}`,
      label: 'text-slate-400',
      line: 'bg-slate-200',
    };
  };

  return (
    <div className="flex items-center justify-between">
      {steps.map((step, index) => {
        const isActive = step === currentStep;
        const isCompleted = step < currentStep;
        const isLast = index === steps.length - 1;
        const colors = getStepColors(index, isActive, isCompleted);

        return (
          <React.Fragment key={step}>
            {/* Step indicator */}
            <div className="flex flex-col items-center">
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  transition-all duration-300
                  ${colors.circle}
                `}
              >
                <StepIcon index={index} isActive={isActive} isCompleted={isCompleted} />
              </div>
              <span className={`mt-2 text-sm transition-colors duration-300 ${colors.label}`}>
                {labels[index] || `Step ${index + 1}`}
              </span>
            </div>

            {/* Connector line */}
            {!isLast && (
              <div className="flex-1 mx-4">
                <div className={`h-1 rounded-full transition-all duration-500 ${colors.line}`} />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default ScenarioProgress;
