import React from 'react';

export interface ProgressBarProps {
  /** Progress value from 0 to 100 */
  value?: number;
  /** Current step (for step-based progress) */
  currentStep?: number;
  /** Total steps (for step-based progress) */
  totalSteps?: number;
  /** Optional labels for each step */
  stepLabels?: string[];
  /** Show percentage label */
  showLabel?: boolean;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Additional CSS classes */
  className?: string;
}

const sizeStyles = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3',
};

/**
 * Progress bar component supporting both percentage and step-based progress.
 * Includes smooth transition animations.
 */
export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  currentStep,
  totalSteps,
  stepLabels,
  showLabel = false,
  size = 'md',
  className = '',
}) => {
  // Calculate percentage based on props
  let percentage: number;
  let displayText: string;

  if (typeof currentStep === 'number' && typeof totalSteps === 'number' && totalSteps > 0) {
    // Step-based progress
    percentage = ((currentStep + 1) / totalSteps) * 100;
    displayText = `${currentStep + 1} / ${totalSteps}`;
  } else if (typeof value === 'number') {
    // Percentage-based progress
    percentage = Math.min(100, Math.max(0, value));
    displayText = `${Math.round(percentage)}%`;
  } else {
    percentage = 0;
    displayText = '0%';
  }

  const renderStepIndicator = () => {
    if (typeof currentStep !== 'number' || typeof totalSteps !== 'number') {
      return null;
    }

    return (
      <div className="flex justify-between mt-2">
        {Array.from({ length: totalSteps }, (_, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const label = stepLabels?.[index];

          return (
            <div
              key={index}
              className="flex flex-col items-center"
            >
              <div
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  isCompleted
                    ? 'bg-green-500'
                    : isCurrent
                    ? 'bg-blue-500 ring-2 ring-blue-200'
                    : 'bg-slate-200'
                }`}
              />
              {label && (
                <span
                  className={`text-xs mt-1 ${
                    isCurrent ? 'text-blue-600 font-medium' : 'text-slate-500'
                  }`}
                >
                  {label}
                </span>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm text-slate-600">Voortgang</span>
          <span className="text-sm font-medium text-slate-700">{displayText}</span>
        </div>
      )}
      <div className={`w-full bg-slate-200 rounded-full overflow-hidden ${sizeStyles[size]}`}>
        <div
          className="h-full bg-blue-500 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
      {renderStepIndicator()}
    </div>
  );
};

export default ProgressBar;
