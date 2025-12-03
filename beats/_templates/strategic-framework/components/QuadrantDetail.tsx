/**
 * Quadrant Detail Component
 *
 * Displays detailed information about a selected quadrant.
 */

import React from 'react';
import { Lightbulb, CheckCircle } from 'lucide-react';
import type { Framework, Quadrant } from '../schema';

export interface QuadrantDetailProps {
  /** The selected quadrant */
  quadrant: Quadrant;
  /** Framework for context */
  framework: Framework;
  /** UI labels */
  labels: {
    examples: string;
    recommendations: string;
  };
}

/**
 * Get position coordinates for mini-map display.
 */
function getPositionCoords(position: string): { row: number; col: number } {
  const coords: Record<string, { row: number; col: number }> = {
    'top-left': { row: 0, col: 0 },
    'top-right': { row: 0, col: 1 },
    'bottom-left': { row: 1, col: 0 },
    'bottom-right': { row: 1, col: 1 },
  };
  return coords[position] || { row: 0, col: 0 };
}

/**
 * Detailed view of a quadrant with examples and recommendations.
 */
export const QuadrantDetail: React.FC<QuadrantDetailProps> = ({
  quadrant,
  framework,
  labels,
}) => {
  const position = getPositionCoords(quadrant.position);

  return (
    <div className="p-8">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Position indicator with mini-map */}
        <div className="flex items-start gap-6">
          {/* Mini matrix */}
          <div className="flex-shrink-0">
            <div className="grid grid-cols-2 gap-1 w-20 h-20">
              {framework.quadrants.map(q => {
                const isSelected = q.id === quadrant.id;
                const pos = getPositionCoords(q.position);
                return (
                  <div
                    key={q.id}
                    className={`
                      rounded transition-all
                      ${q.color}
                      ${isSelected ? 'ring-2 ring-blue-500 scale-110' : 'opacity-50'}
                    `}
                    style={{
                      gridRow: pos.row + 1,
                      gridColumn: pos.col + 1,
                    }}
                  />
                );
              })}
            </div>
            <p className="text-xs text-slate-500 text-center mt-2">
              {framework.xAxis.label} / {framework.yAxis.label}
            </p>
          </div>

          {/* Description */}
          <div className="flex-1">
            <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-3 ${quadrant.color}`}>
              {quadrant.title}
            </div>
            <p className="text-slate-700 leading-relaxed">
              {quadrant.description}
            </p>
          </div>
        </div>

        {/* Examples */}
        {quadrant.examples && quadrant.examples.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-lg font-semibold text-slate-800">{labels.examples}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {quadrant.examples.map((example, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg ${quadrant.color} border border-slate-200`}
                >
                  <p className="text-slate-700">{example}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Recommendations */}
        {quadrant.recommendations && quadrant.recommendations.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <h2 className="text-lg font-semibold text-slate-800">{labels.recommendations}</h2>
            </div>
            <ul className="space-y-3">
              {quadrant.recommendations.map((recommendation, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200"
                >
                  <span className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-medium flex-shrink-0">
                    {index + 1}
                  </span>
                  <p className="text-slate-700">{recommendation}</p>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
};

export default QuadrantDetail;
