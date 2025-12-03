import React from 'react';

export interface CardProps {
  header?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  onClick?: () => void;
  isActive?: boolean;
  isCompleted?: boolean;
  className?: string;
}

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
  const shadowStyles = isClickable ? 'shadow-md hover:shadow-lg' : 'shadow-sm';
  const cursorStyles = isClickable ? 'cursor-pointer' : '';
  const hoverStyles = isClickable && !isActive ? 'hover:border-slate-300' : '';

  const classes = [baseStyles, borderStyles, shadowStyles, cursorStyles, hoverStyles, className].filter(Boolean).join(' ');

  return (
    <div
      className={classes}
      onClick={onClick}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
    >
      {header && <div className="px-6 py-4 border-b border-slate-100">{header}</div>}
      <div className="p-6">{children}</div>
      {footer && <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 rounded-b-xl">{footer}</div>}
    </div>
  );
};

export default Card;
