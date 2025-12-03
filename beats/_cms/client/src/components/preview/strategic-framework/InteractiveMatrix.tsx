import React from 'react';
import type { Framework, Quadrant, QuadrantPosition } from './types';

export interface InteractiveMatrixProps {
  framework: Framework;
  onSelectQuadrant: (quadrant: Quadrant) => void;
  selectedQuadrantId: string | null;
}

function getQuadrantByPosition(quadrants: Quadrant[], position: QuadrantPosition): Quadrant | undefined {
  return quadrants.find(q => q.position === position);
}

export const InteractiveMatrix: React.FC<InteractiveMatrixProps> = ({
  framework,
  onSelectQuadrant,
  selectedQuadrantId,
}) => {
  const { xAxis, yAxis, quadrants } = framework;

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
        <h3 className="text-lg font-bold text-slate-800 mb-2">{quadrant.title}</h3>
        <p className="text-sm text-slate-600 line-clamp-3">{quadrant.description}</p>
        <span className="absolute bottom-3 right-3 text-xs text-slate-400 font-medium">
          Klik om te verkennen →
        </span>
      </button>
    );
  };

  return (
    <div className="h-full flex flex-col min-h-0">
      {/* Main matrix area with Y-axis */}
      <div className="flex-1 flex min-h-0">
        {/* Y-axis: label + high/low indicators */}
        <div className="flex flex-col items-center justify-between w-16 flex-shrink-0 py-4">
          <span className="text-xs font-medium text-slate-600 bg-white px-2 py-1 rounded-full shadow-sm">
            {yAxis?.highLabel || 'Hoog'}
          </span>
          <span
            className="text-sm font-semibold text-slate-700 whitespace-nowrap"
            style={{ transform: 'rotate(-90deg)' }}
          >
            {yAxis?.label || 'Y-as'}
          </span>
          <span className="text-xs font-medium text-slate-600 bg-white px-2 py-1 rounded-full shadow-sm">
            {yAxis?.lowLabel || 'Laag'}
          </span>
        </div>

        {/* Matrix grid */}
        <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-3 min-h-0">
          {renderQuadrant(topLeft)}
          {renderQuadrant(topRight)}
          {renderQuadrant(bottomLeft)}
          {renderQuadrant(bottomRight)}
        </div>

        {/* Spacer for symmetry */}
        <div className="w-8 flex-shrink-0" />
      </div>

      {/* X-axis labels */}
      <div className="flex items-center mt-3 ml-16 mr-8 flex-shrink-0 pb-2">
        <span className="text-xs font-medium text-slate-600 bg-white px-2 py-1 rounded-full shadow-sm">
          {xAxis?.lowLabel || 'Laag'}
        </span>
        <span className="flex-1 text-center text-sm font-semibold text-slate-700">
          {xAxis?.label || 'X-as'}
        </span>
        <span className="text-xs font-medium text-slate-600 bg-white px-2 py-1 rounded-full shadow-sm">
          {xAxis?.highLabel || 'Hoog'}
        </span>
      </div>
    </div>
  );
};

export default InteractiveMatrix;
