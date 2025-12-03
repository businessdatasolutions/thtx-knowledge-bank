import React from 'react';

export interface CardProps {
  /** Optional header content */
  header?: React.ReactNode;
  /** Main content of the card */
  children: React.ReactNode;
  /** Optional footer content */
  footer?: React.ReactNode;
  /** Click handler - makes card interactive when provided */
  onClick?: () => void;
  /** Whether the card is in an active/selected state */
  isActive?: boolean;
  /** Whether the card shows a completed state */
  isCompleted?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Card component with optional header, footer, and interactive states.
 * Uses THTX brand styling with subtle shadows and hover effects.
 */
export const Card: React.FC<CardProps> = ({
  header,
  children,
  footer,
  onClick,
  isActive = false,
  isCompleted = false,
  className = '',
}) => {
  const isClickable = !!onClick;

  const baseStyles = 'bg-white rounded-xl border transition-all duration-300';

  const borderStyles = isActive
    ? 'border-blue-500 ring-2 ring-blue-200'
    : isCompleted
    ? 'border-green-500'
    : 'border-slate-200';

  const shadowStyles = isClickable
    ? 'shadow-md hover:shadow-lg'
    : 'shadow-sm';

  const cursorStyles = isClickable ? 'cursor-pointer' : '';

  const hoverStyles = isClickable && !isActive
    ? 'hover:border-slate-300'
    : '';

  const classes = [
    baseStyles,
    borderStyles,
    shadowStyles,
    cursorStyles,
    hoverStyles,
    className,
  ].filter(Boolean).join(' ');

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      className={classes}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
    >
      {header && (
        <div className="px-6 py-4 border-b border-slate-100">
          {header}
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
      {footer && (
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 rounded-b-xl">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
