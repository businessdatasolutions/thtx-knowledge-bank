import React from 'react';
import { ClipboardList, CheckCircle2 } from 'lucide-react';

/**
 * Props for the KeyTakeawaysCard component.
 */
export interface KeyTakeawaysCardProps {
  /** Card title */
  title: string;
  /** Array of key takeaway strings */
  takeaways: string[];
  /** Additional CSS classes */
  className?: string;
}

/**
 * KeyTakeawaysCard - Displays numbered key insights/takeaways.
 *
 * Uses a neutral color scheme with green checkmarks for each item.
 * Designed to summarize the main points of a Briefing section.
 */
export const KeyTakeawaysCard: React.FC<KeyTakeawaysCardProps> = ({
  title,
  takeaways,
  className = '',
}) => {
  if (!takeaways || takeaways.length === 0) {
    return null;
  }

  return (
    <div
      className={`
        rounded-xl border-2 border-slate-200 bg-slate-50 p-6
        ${className}
      `}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-slate-700">
          <ClipboardList className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-xl font-bold text-slate-900">
          {title}
        </h3>
      </div>

      {/* Numbered list of takeaways */}
      <ol className="space-y-3">
        {takeaways.map((takeaway, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-700 font-semibold text-sm flex-shrink-0">
              {index + 1}
            </span>
            <div className="flex items-start gap-2 flex-1">
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="text-slate-700 leading-relaxed">{takeaway}</span>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default KeyTakeawaysCard;
