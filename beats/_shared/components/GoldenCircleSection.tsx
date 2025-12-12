import React from 'react';
import { AlertCircle, Target, Lightbulb, CheckCircle, type LucideIcon } from 'lucide-react';

/**
 * Golden Circle section type - corresponds to Sinek's WHY/HOW/WHAT.
 */
export type GoldenCircleSectionType = 'why' | 'how' | 'what';

/**
 * Props for the GoldenCircleSection component.
 */
export interface GoldenCircleSectionProps {
  /** Section type determines color scheme and icon */
  type: GoldenCircleSectionType;
  /** Section title/label */
  title: string;
  /** Section headline - max 15 words */
  headline: string;
  /** Section paragraph - max 100 words */
  paragraph: string;
  /** Key points as bullet list */
  keyPoints: string[];
  /** Optional steps (mainly for HOW section) */
  steps?: string[];
  /** Additional CSS classes */
  className?: string;
}

/**
 * Configuration for each section type following THTX design system.
 */
const sectionConfig: Record<GoldenCircleSectionType, {
  Icon: LucideIcon;
  bgColor: string;
  borderColor: string;
  iconBgColor: string;
  iconColor: string;
  badgeBgColor: string;
  badgeTextColor: string;
}> = {
  why: {
    Icon: AlertCircle,
    bgColor: 'bg-[#fff5f7]',
    borderColor: 'border-[#ff6984]',
    iconBgColor: 'bg-[#ff6984]',
    iconColor: 'text-white',
    badgeBgColor: 'bg-[#ff6984]',
    badgeTextColor: 'text-white',
  },
  how: {
    Icon: Target,
    bgColor: 'bg-[#f0fbff]',
    borderColor: 'border-[#00d1ff]',
    iconBgColor: 'bg-[#00d1ff]',
    iconColor: 'text-white',
    badgeBgColor: 'bg-[#00d1ff]',
    badgeTextColor: 'text-white',
  },
  what: {
    Icon: Lightbulb,
    bgColor: 'bg-[#fafbf0]',
    borderColor: 'border-[#d4db3e]',
    iconBgColor: 'bg-[#d4db3e]',
    iconColor: 'text-slate-800',
    badgeBgColor: 'bg-[#d4db3e]',
    badgeTextColor: 'text-slate-800',
  },
};

/**
 * GoldenCircleSection - A color-coded section for WHY/HOW/WHAT content.
 *
 * Follows THTX design system:
 * - WHY: Pink (#ff6984) - Problem/urgency
 * - HOW: Cyan (#00d1ff) - Solution/approach
 * - WHAT: Yellow (#d4db3e) - Outcome/impact
 */
export const GoldenCircleSection: React.FC<GoldenCircleSectionProps> = ({
  type,
  title,
  headline,
  paragraph,
  keyPoints,
  steps,
  className = '',
}) => {
  const config = sectionConfig[type];
  const { Icon } = config;

  return (
    <div
      className={`
        rounded-xl border-2 p-6
        ${config.bgColor}
        ${config.borderColor}
        ${className}
      `}
    >
      {/* Header with badge and icon */}
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 rounded-lg ${config.iconBgColor}`}>
          <Icon className={`w-5 h-5 ${config.iconColor}`} />
        </div>
        <span
          className={`
            px-3 py-1 rounded-full text-sm font-semibold uppercase tracking-wide
            ${config.badgeBgColor} ${config.badgeTextColor}
          `}
        >
          {title}
        </span>
      </div>

      {/* Headline */}
      <h3 className="text-xl font-bold text-slate-900 mb-3">
        {headline}
      </h3>

      {/* Paragraph */}
      <p className="text-slate-700 mb-4 leading-relaxed">
        {paragraph}
      </p>

      {/* Optional steps (for HOW section) */}
      {steps && steps.length > 0 && (
        <div className="mb-4">
          <ol className="list-decimal list-inside space-y-2">
            {steps.map((step, index) => (
              <li key={index} className="text-slate-700">
                {step}
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Key points */}
      <ul className="space-y-2">
        {keyPoints.map((point, index) => (
          <li key={index} className="flex items-start gap-2">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <span className="text-slate-700">{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GoldenCircleSection;
