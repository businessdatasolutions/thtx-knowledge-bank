/**
 * Interactive Matrix Component
 *
 * Renders a 2x2 matrix with clickable quadrants and axis labels.
 */

import React from 'react';
import type { Framework, Quadrant, QuadrantPosition } from '../schema';

export interface InteractiveMatrixProps {
  /** Framework configuration with quadrants and axes */
  framework: Framework;
  /** Callback when a quadrant is clicked */
  onSelectQuadrant: (quadrant: Quadrant) => void;
  /** Currently selected quadrant ID (for highlighting) */
  selectedQuadrantId: string | null;
}

/**
 * Get quadrant by position.
 */
function getQuadrantByPosition(quadrants: Quadrant[], position: QuadrantPosition): Quadrant | undefined {
  return quadrants.find(q => q.position === position);
}

/**
 * Interactive 2x2 matrix with hover effects and click handling.
 */
export const InteractiveMatrix: React.FC<InteractiveMatrixProps> = ({
  framework,
  onSelectQuadrant,
  selectedQuadrantId,
}) => {
  const { xAxis, yAxis, quadrants } = framework;

  // Get quadrants by position
  const topLeft = getQuadrantByPosition(quadrants, 'top-left');
  const topRight = getQuadrantByPosition(quadrants, 'top-right');
  const bottomLeft = getQuadrantByPosition(quadrants, 'bottom-left');
  const bottomRight = getQuadrantByPosition(quadrants, 'bottom-right');

  const renderQuadrant = (quadrant: Quadrant | undefined, position: string) => {
    if (!quadrant) return null;

    const isSelected = quadrant.id === selectedQuadrantId;

    return (
      <button
        onClick={() => onSelectQuadrant(quadrant)}
        className={`
          relative p-6 rounded-xl transition-all duration-300
          flex flex-col items-center justify-center text-center
          hover:scale-[1.02] hover:shadow-lg
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          ${quadrant.color}
          ${isSelected ? 'ring-2 ring-blue-500 shadow-lg' : 'shadow-md'}
        `}
      >
        <h3 className="text-lg font-bold text-slate-800 mb-2">
          {quadrant.title}
        </h3>
        <p className="text-sm text-slate-600 line-clamp-3">
          {quadrant.description}
        </p>
        <span className="absolute bottom-3 right-3 text-xs text-slate-400 font-medium">
          Klik om te verkennen →
        </span>
      </button>
    );
  };

  return (
    <div className="h-full flex flex-col">
      {/* Y-axis high label */}
      <div className="flex justify-center mb-2">
        <span className="text-sm font-medium text-slate-600 bg-white px-3 py-1 rounded-full shadow-sm">
          {yAxis.highLabel}
        </span>
      </div>

      <div className="flex-1 flex">
        {/* Y-axis label (rotated) */}
        <div className="flex items-center justify-center w-12">
          <span
            className="text-sm font-semibold text-slate-700 whitespace-nowrap"
            style={{ transform: 'rotate(-90deg)' }}
          >
            {yAxis.label}
          </span>
        </div>

        {/* Matrix grid */}
        <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-4">
          {renderQuadrant(topLeft, 'top-left')}
          {renderQuadrant(topRight, 'top-right')}
          {renderQuadrant(bottomLeft, 'bottom-left')}
          {renderQuadrant(bottomRight, 'bottom-right')}
        </div>

        {/* Spacer for symmetry */}
        <div className="w-12" />
      </div>

      {/* Y-axis low label */}
      <div className="flex justify-center mt-2">
        <span className="text-sm font-medium text-slate-600 bg-white px-3 py-1 rounded-full shadow-sm">
          {yAxis.lowLabel}
        </span>
      </div>

      {/* X-axis labels */}
      <div className="flex justify-between mt-4 px-12">
        <span className="text-sm font-medium text-slate-600 bg-white px-3 py-1 rounded-full shadow-sm">
          {xAxis.lowLabel}
        </span>
        <span className="text-sm font-semibold text-slate-700">
          {xAxis.label}
        </span>
        <span className="text-sm font-medium text-slate-600 bg-white px-3 py-1 rounded-full shadow-sm">
          {xAxis.highLabel}
        </span>
      </div>
    </div>
  );
};

export default InteractiveMatrix;
