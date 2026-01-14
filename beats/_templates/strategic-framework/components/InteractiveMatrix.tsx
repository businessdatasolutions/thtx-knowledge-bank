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

  const renderQuadrant = (quadrant: Quadrant | undefined) => {
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
      <div className="flex-1 flex">
        {/* Y-axis (vertical, left side) */}
        <div className="flex flex-col items-center py-4" style={{ width: '80px' }}>
          {/* Y-axis high label (top) */}
          <div className="flex-1 flex items-start pt-8">
            <span
              className="text-sm font-medium text-slate-600 bg-white px-3 py-1 rounded-full shadow-sm whitespace-nowrap"
              style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
            >
              {yAxis.highLabel}
            </span>
          </div>

          {/* Y-axis label (middle, rotated) - positioned more to the left */}
          <div className="flex items-center w-full">
            <span
              className="text-sm font-semibold text-slate-700 whitespace-nowrap"
              style={{ transform: 'rotate(-90deg)', transformOrigin: 'center', marginLeft: '-50px' }}
            >
              {yAxis.label}
            </span>
          </div>

          {/* Y-axis low label (bottom) */}
          <div className="flex-1 flex items-end pb-8">
            <span
              className="text-sm font-medium text-slate-600 bg-white px-3 py-1 rounded-full shadow-sm whitespace-nowrap"
              style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
            >
              {yAxis.lowLabel}
            </span>
          </div>
        </div>

        {/* Matrix grid */}
        <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-4">
          {renderQuadrant(topLeft)}
          {renderQuadrant(topRight)}
          {renderQuadrant(bottomLeft)}
          {renderQuadrant(bottomRight)}
        </div>

        {/* Spacer for symmetry */}
        <div style={{ width: '80px' }} />
      </div>

      {/* X-axis labels - closer to matrix */}
      <div className="flex justify-between mt-6" style={{ paddingLeft: '80px', paddingRight: '80px' }}>
        <span className="text-sm font-medium text-slate-600 bg-white px-3 py-1 rounded-full shadow-sm">
          {xAxis.lowLabel}
        </span>
        <span className="text-sm font-medium text-slate-600 bg-white px-3 py-1 rounded-full shadow-sm">
          {xAxis.highLabel}
        </span>
      </div>

      {/* X-axis title - further from matrix */}
      <div className="flex justify-center mt-4">
        <span className="text-sm font-semibold text-slate-700">
          {xAxis.label}
        </span>
      </div>
    </div>
  );
};

export default InteractiveMatrix;
