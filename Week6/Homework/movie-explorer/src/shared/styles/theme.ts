export const theme = {
  colors: {
    background: '#f4f4f5',
    surface: '#ffffff',
    text: '#111827',
    mutedText: '#6b7280',
    subtleText: '#9ca3af',
    border: '#e5e7eb',
    strongBorder: '#d1d5db',
    primary: '#111827',
    primaryHover: '#374151',
    danger: '#ef4444',
  },
  radii: {
    small: '8px',
    medium: '12px',
    large: '18px',
  },
  shadows: {
    card: '0 10px 26px rgba(17, 24, 39, 0.07)',
    hover: '0 18px 38px rgba(17, 24, 39, 0.14)',
  },
} as const

export type AppTheme = typeof theme
