'use client';

import { createTheme, ThemeOptions } from '@mui/material/styles';

// iOS Liquid Glass Color Palette
const colors = {
  primary: {
    main: 'rgba(0, 122, 255, 0.85)', // iOS Blue with transparency
    light: 'rgba(0, 122, 255, 0.6)',
    dark: 'rgba(0, 122, 255, 1)',
  },
  secondary: {
    main: 'rgba(255, 59, 48, 0.85)', // iOS Red with transparency
    light: 'rgba(255, 59, 48, 0.6)',
    dark: 'rgba(255, 59, 48, 1)',
  },
  background: {
    default: 'rgba(242, 242, 247, 0.9)', // iOS light background with transparency
    paper: 'rgba(255, 255, 255, 0.7)', // Glass effect
    glass: 'rgba(255, 255, 255, 0.25)', // Frosted glass
    glassSecondary: 'rgba(255, 255, 255, 0.15)',
  },
  surface: {
    primary: 'rgba(255, 255, 255, 0.8)',
    secondary: 'rgba(248, 248, 248, 0.9)',
    tertiary: 'rgba(242, 242, 247, 0.8)',
  },
  accent: {
    green: 'rgba(52, 199, 89, 0.85)',
    orange: 'rgba(255, 149, 0, 0.85)',
    purple: 'rgba(175, 82, 222, 0.85)',
    pink: 'rgba(255, 45, 85, 0.85)',
  },
};

// Glass morphism shadows and blurs
const glassMorphism = {
  backdrop: 'blur(20px) saturate(180%)',
  backdropSecondary: 'blur(40px) saturate(200%)',
  shadow: {
    glass: '0 8px 32px rgba(31, 38, 135, 0.37)',
    soft: '0 4px 16px rgba(0, 0, 0, 0.1)',
    medium: '0 8px 24px rgba(0, 0, 0, 0.15)',
    strong: '0 12px 40px rgba(0, 0, 0, 0.2)',
  },
  border: 'rgba(255, 255, 255, 0.18)',
};

const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: colors.primary,
    secondary: colors.secondary,
    background: colors.background,
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.6)',
    },
  },
  typography: {
    fontFamily: [
      '"Prompt"',
      '-apple-system',
      'BlinkMacSystemFont',
      '"SF Pro Display"',
      '"SF Pro Text"',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '1.75rem',
      fontWeight: 700,
      letterSpacing: '-0.02em',
      '@media (min-width:600px)': {
        fontSize: '2.5rem',
      },
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
      '@media (min-width:600px)': {
        fontSize: '2rem',
      },
    },
    h3: {
      fontSize: '1.375rem',
      fontWeight: 600,
      '@media (min-width:600px)': {
        fontSize: '1.75rem',
      },
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 600,
      '@media (min-width:600px)': {
        fontSize: '1.5rem',
      },
    },
    h5: {
      fontSize: '1.125rem',
      fontWeight: 600,
      '@media (min-width:600px)': {
        fontSize: '1.25rem',
      },
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      '@media (min-width:600px)': {
        fontSize: '1.125rem',
      },
    },
    body1: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
      '@media (min-width:600px)': {
        fontSize: '1rem',
      },
    },
    body2: {
      fontSize: '0.75rem',
      lineHeight: 1.5,
      '@media (min-width:600px)': {
        fontSize: '0.875rem',
      },
    },
  },
  shape: {
    borderRadius: 16, // iOS-style rounded corners
  },
  shadows: [
    'none',
    glassMorphism.shadow.soft,
    glassMorphism.shadow.soft,
    glassMorphism.shadow.medium,
    glassMorphism.shadow.medium,
    glassMorphism.shadow.medium,
    glassMorphism.shadow.strong,
    glassMorphism.shadow.strong,
    glassMorphism.shadow.strong,
    glassMorphism.shadow.glass,
    glassMorphism.shadow.glass,
    glassMorphism.shadow.glass,
    glassMorphism.shadow.glass,
    glassMorphism.shadow.glass,
    glassMorphism.shadow.glass,
    glassMorphism.shadow.glass,
    glassMorphism.shadow.glass,
    glassMorphism.shadow.glass,
    glassMorphism.shadow.glass,
    glassMorphism.shadow.glass,
    glassMorphism.shadow.glass,
    glassMorphism.shadow.glass,
    glassMorphism.shadow.glass,
    glassMorphism.shadow.glass,
    glassMorphism.shadow.glass,
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: `
            linear-gradient(135deg, 
              rgba(74, 144, 226, 0.1) 0%, 
              rgba(102, 126, 234, 0.1) 100%
            )
          `,
          minHeight: '100vh',
          WebkitBackdropFilter: glassMorphism.backdrop,
          backdropFilter: glassMorphism.backdrop,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: colors.background.paper,
          backdropFilter: glassMorphism.backdrop,
          WebkitBackdropFilter: glassMorphism.backdrop,
          border: `1px solid ${glassMorphism.border}`,
          borderRadius: 16,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: colors.background.glass,
          backdropFilter: glassMorphism.backdropSecondary,
          WebkitBackdropFilter: glassMorphism.backdropSecondary,
          border: `1px solid ${glassMorphism.border}`,
          borderRadius: 20,
          boxShadow: glassMorphism.shadow.glass,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: glassMorphism.shadow.strong,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontWeight: 600,
          backdropFilter: glassMorphism.backdrop,
          WebkitBackdropFilter: glassMorphism.backdrop,
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        },
        contained: {
          backgroundColor: colors.primary.main,
          color: 'white',
          border: `1px solid ${glassMorphism.border}`,
          '&:hover': {
            backgroundColor: colors.primary.dark,
            transform: 'translateY(-2px)',
            boxShadow: glassMorphism.shadow.medium,
          },
        },
        outlined: {
          backgroundColor: colors.background.glassSecondary,
          backdropFilter: glassMorphism.backdrop,
          WebkitBackdropFilter: glassMorphism.backdrop,
          border: `1px solid ${glassMorphism.border}`,
          '&:hover': {
            backgroundColor: colors.background.glass,
            transform: 'translateY(-1px)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: colors.background.glass,
          backdropFilter: glassMorphism.backdrop,
          WebkitBackdropFilter: glassMorphism.backdrop,
          border: 'none',
          borderBottom: `1px solid ${glassMorphism.border}`,
          boxShadow: 'none',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: colors.background.glassSecondary,
            backdropFilter: glassMorphism.backdrop,
            WebkitBackdropFilter: glassMorphism.backdrop,
            borderRadius: { xs: 8, sm: 12 },
            fontSize: { xs: '14px', sm: '16px' },
            minHeight: { xs: '40px', sm: '48px' },
            '& fieldset': {
              border: `1px solid ${glassMorphism.border}`,
            },
            '&:hover fieldset': {
              border: `1px solid ${colors.primary.light}`,
            },
            '&.Mui-focused fieldset': {
              border: `2px solid ${colors.primary.main}`,
            },
            '&.MuiInputBase-sizeSmall': {
              minHeight: { xs: '36px', sm: '40px' },
              fontSize: { xs: '13px', sm: '14px' },
            },
          },
          '& .MuiInputBase-input': {
            padding: { xs: '8px 12px', sm: '12px 16px' },
            fontSize: { xs: '14px', sm: '16px' },
            '&.MuiInputBase-inputSizeSmall': {
              padding: { xs: '6px 10px', sm: '8px 12px' },
              fontSize: { xs: '13px', sm: '14px' },
            },
          },
        },
      },
    },
  },
};

const theme = createTheme(themeOptions);

// Extend theme with custom properties
declare module '@mui/material/styles' {
  interface Palette {
    glass: {
      primary: string;
      secondary: string;
      tertiary: string;
    };
    accent: {
      green: string;
      orange: string;
      purple: string;
      pink: string;
    };
  }

  interface PaletteOptions {
    glass?: {
      primary?: string;
      secondary?: string;
      tertiary?: string;
    };
    accent?: {
      green?: string;
      orange?: string;
      purple?: string;
      pink?: string;
    };
  }
}

// Add custom properties to theme
export const liquidGlassTheme = createTheme({
  ...themeOptions,
  palette: {
    ...themeOptions.palette,
    glass: {
      primary: colors.surface.primary,
      secondary: colors.surface.secondary,
      tertiary: colors.surface.tertiary,
    },
    accent: colors.accent,
  },
});

export default liquidGlassTheme; 