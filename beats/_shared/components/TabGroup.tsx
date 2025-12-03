import React from 'react';

export interface Tab {
  /** Unique identifier for the tab */
  id: string;
  /** Display label */
  label: string;
  /** Optional icon */
  icon?: React.ReactNode;
}

export interface TabGroupProps {
  /** Array of tabs */
  tabs: Tab[];
  /** Currently active tab ID */
  activeTab: string;
  /** Tab change handler */
  onChange: (tabId: string) => void;
  /** Visual variant */
  variant?: 'underline' | 'pills' | 'boxed';
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Whether tabs should be full width */
  fullWidth?: boolean;
  /** Additional CSS classes */
  className?: string;
}

const sizeStyles = {
  sm: 'text-sm px-3 py-1.5',
  md: 'text-base px-4 py-2',
  lg: 'text-lg px-5 py-2.5',
};

/**
 * TabGroup component for horizontal tab navigation.
 * Supports multiple visual variants with smooth animations.
 */
export const TabGroup: React.FC<TabGroupProps> = ({
  tabs,
  activeTab,
  onChange,
  variant = 'underline',
  size = 'md',
  fullWidth = false,
  className = '',
}) => {
  const getContainerStyles = () => {
    switch (variant) {
      case 'pills':
        return 'bg-slate-100 p-1 rounded-lg';
      case 'boxed':
        return 'border border-slate-200 rounded-lg p-1';
      case 'underline':
      default:
        return 'border-b border-slate-200';
    }
  };

  const getTabStyles = (isActive: boolean) => {
    const baseStyles = `inline-flex items-center gap-2 font-medium transition-all duration-300 focus:outline-none ${sizeStyles[size]}`;

    switch (variant) {
      case 'pills':
        return `${baseStyles} rounded-md ${
          isActive
            ? 'bg-white text-slate-900 shadow-sm'
            : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
        }`;
      case 'boxed':
        return `${baseStyles} rounded-md ${
          isActive
            ? 'bg-blue-500 text-white'
            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
        }`;
      case 'underline':
      default:
        return `${baseStyles} relative ${
          isActive
            ? 'text-blue-600'
            : 'text-slate-600 hover:text-slate-900'
        }`;
    }
  };

  const renderUnderline = (isActive: boolean) => {
    if (variant !== 'underline') return null;

    return (
      <span
        className={`absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 transition-transform duration-300 ${
          isActive ? 'scale-x-100' : 'scale-x-0'
        }`}
      />
    );
  };

  return (
    <div
      className={`flex ${fullWidth ? 'w-full' : ''} ${getContainerStyles()} ${className}`}
      role="tablist"
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;

        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            aria-controls={`tabpanel-${tab.id}`}
            onClick={() => onChange(tab.id)}
            className={`${getTabStyles(isActive)} ${fullWidth ? 'flex-1 justify-center' : ''}`}
          >
            {tab.icon}
            <span>{tab.label}</span>
            {renderUnderline(isActive)}
          </button>
        );
      })}
    </div>
  );
};

export default TabGroup;
