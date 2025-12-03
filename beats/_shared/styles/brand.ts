/**
 * THTX Brand Tokens
 *
 * Centralized design tokens for consistent branding across all Beats.
 * Based on Tailwind CSS color palette for easy class mapping.
 */

// Color Palette
export const colors = {
  // Primary - Slate (used for backgrounds, navigation, text)
  primary: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    950: '#020617',
  },

  // Accent - Blue (primary interactive elements)
  accent: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },

  // Success - Green (completed states, correct answers)
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },

  // Warning - Amber (attention, in-progress)
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },

  // Error - Red (errors, incorrect answers)
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },

  // Stage Colors (for Data-Logic-Action framework)
  stages: {
    data: '#3b82f6',      // Blue
    logic: '#a855f7',     // Purple
    action: '#22c55e',    // Green
  },

  // Neutral - White/Black
  neutral: {
    white: '#ffffff',
    black: '#000000',
  },
} as const;

// Typography
export const typography = {
  fontFamily: {
    sans: "'Inter', system-ui, -apple-system, sans-serif",
    mono: "'Fira Code', 'Consolas', monospace",
  },

  fontSize: {
    xs: '0.75rem',      // 12px
    sm: '0.875rem',     // 14px
    base: '1rem',       // 16px
    lg: '1.125rem',     // 18px
    xl: '1.25rem',      // 20px
    '2xl': '1.5rem',    // 24px
    '3xl': '1.875rem',  // 30px
    '4xl': '2.25rem',   // 36px
    '5xl': '3rem',      // 48px
  },

  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
} as const;

// Spacing Scale (4px base unit)
export const spacing = {
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
} as const;

// Border Radius
export const borderRadius = {
  none: '0',
  sm: '0.125rem',   // 2px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  full: '9999px',
} as const;

// Shadows
export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
} as const;

// Transitions
export const transitions = {
  fast: '150ms ease-in-out',
  normal: '300ms ease-in-out',
  slow: '500ms ease-in-out',
} as const;

// Breakpoints (for reference, use Tailwind classes in components)
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// Tailwind Class Mappings (for convenience)
export const tw = {
  // Background colors
  bgPrimary: 'bg-slate-50',
  bgSidebar: 'bg-slate-900',
  bgCard: 'bg-white',
  bgAccent: 'bg-blue-500',
  bgSuccess: 'bg-green-500',
  bgWarning: 'bg-amber-500',
  bgError: 'bg-red-500',

  // Text colors
  textPrimary: 'text-slate-900',
  textSecondary: 'text-slate-600',
  textMuted: 'text-slate-400',
  textLight: 'text-slate-300',
  textWhite: 'text-white',
  textAccent: 'text-blue-500',
  textSuccess: 'text-green-500',
  textError: 'text-red-500',

  // Border colors
  borderLight: 'border-slate-200',
  borderMedium: 'border-slate-300',
  borderDark: 'border-slate-800',

  // Common patterns
  cardBase: 'bg-white rounded-xl shadow-md border border-slate-200',
  buttonBase: 'px-4 py-2 rounded-lg font-medium transition-all duration-300',
  inputBase: 'px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
} as const;
