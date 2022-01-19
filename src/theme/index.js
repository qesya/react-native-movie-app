const theme = {
  color: {
    white: '#ffffff',
    oldwhite: '#e7e6d0',
    black: '#000000',
    blue: '#2267ff',
    darkblue: '#1a56db',
    red: '#DB4437',
    oldred: '#9c0d00',
    yellow: '#F4B400',
    green: '#0F9D58',
    grey1: '#f3f4f6',
    grey2: '#e5e7eb',
    grey3: '#d1d5db',
    grey4: '#9ca3af',
    grey5: '#6b7280',
    grey6: '#4b5563',
    grey7: '#374151',
    grey8: '#1f2937',
    grey9: '#111827',
    grey10: '#1a1a1a',
  },
  typography: {
    xSmall: '8px',
    small: '16px',
    medium: '32px',
    large: '64px',
    xLarge: '128px',
    remToPx: (rem) => Array.isArray(rem) ? rem.map(r => `${r * 16}px`).join(' ') : `${rem * 16}px`,
    px: (pixel) => Array.isArray(pixel) ? pixel.map(px => `${px}px`).join(' ') : `${pixel}px`,

  },
  font: ['sans-serif', 'Roboto'],
};

export default theme;
