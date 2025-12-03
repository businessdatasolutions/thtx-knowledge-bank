import React from 'react';
import { ChevronLeft, ChevronRight, Globe } from 'lucide-react';
import type { Language } from '../types/common';

export interface NavigationProps {
  /** Title to display in the navigation bar */
  title?: string;
  /** Subtitle or secondary text */
  subtitle?: string;
  /** Whether to show the back button */
  showBack?: boolean;
  /** Whether to show the forward/next button */
  showForward?: boolean;
  /** Back button click handler */
  onBack?: () => void;
  /** Forward button click handler */
  onForward?: () => void;
  /** Back button label */
  backLabel?: string;
  /** Forward button label */
  forwardLabel?: string;
  /** Current language */
  language?: Language;
  /** Language change handler (for future bilingual support) */
  onLanguageChange?: (lang: Language) => void;
  /** Additional content to render on the right side */
  rightContent?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Top navigation bar component with optional back/forward buttons.
 * Supports title, subtitle, and language selector placeholder.
 */
export const Navigation: React.FC<NavigationProps> = ({
  title,
  subtitle,
  showBack = false,
  showForward = false,
  onBack,
  onForward,
  backLabel = 'Terug',
  forwardLabel = 'Volgende',
  language = 'NL',
  onLanguageChange,
  rightContent,
  className = '',
}) => {
  return (
    <nav
      className={`flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200 ${className}`}
    >
      {/* Left section - Back button */}
      <div className="flex items-center min-w-[120px]">
        {showBack && onBack && (
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1 text-slate-600 hover:text-slate-900 transition-colors duration-200"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm font-medium">{backLabel}</span>
          </button>
        )}
      </div>

      {/* Center section - Title */}
      <div className="flex flex-col items-center flex-1">
        {title && (
          <h1 className="text-lg font-semibold text-slate-900">{title}</h1>
        )}
        {subtitle && (
          <p className="text-sm text-slate-500">{subtitle}</p>
        )}
      </div>

      {/* Right section - Forward button, language, custom content */}
      <div className="flex items-center gap-4 min-w-[120px] justify-end">
        {rightContent}

        {onLanguageChange && (
          <button
            onClick={() => onLanguageChange(language === 'NL' ? 'NL' : 'NL')}
            className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 rounded-md transition-colors duration-200"
            title="Taal selecteren"
          >
            <Globe className="w-3 h-3" />
            <span>{language}</span>
          </button>
        )}

        {showForward && onForward && (
          <button
            onClick={onForward}
            className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors duration-200"
          >
            <span className="text-sm font-medium">{forwardLabel}</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
