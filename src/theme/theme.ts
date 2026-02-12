'use client';

import { createTheme } from '@mui/material/styles';

// Palette tokens derived from REFERENCE/prototype.html
const lightPalette = {
  mode: 'light' as const,
  primary: {
    main: '#4D5C92',
    light: '#DCE1FF',
    dark: '#354479',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#595D72',
    light: '#DEE1F9',
    dark: '#424659',
    contrastText: '#FFFFFF',
  },
  error: {
    main: '#BA1A1A',
    light: '#FFDAD6',
    dark: '#93000A',
    contrastText: '#FFFFFF',
  },
  background: {
    default: '#FAF8FF',
    paper: '#F4F3FA',
  },
  text: {
    primary: '#1A1B21',
    secondary: '#45464F',
  },
  divider: '#C6C5D0',
};

const darkPalette = {
  mode: 'dark' as const,
  primary: {
    main: '#B6C4FF',
    light: '#3A4578',
    dark: '#DCE1FF',
    contrastText: '#1E2D61',
  },
  secondary: {
    main: '#C2C5DD',
    light: '#414659',
    dark: '#DEE1F9',
    contrastText: '#2B3042',
  },
  error: {
    main: '#FFB4AB',
    light: '#93000A',
    dark: '#FFDAD6',
    contrastText: '#690005',
  },
  background: {
    default: '#121318',
    paper: '#1D1E24',
  },
  text: {
    primary: '#E3E1E9',
    secondary: '#C6C5D0',
  },
  divider: '#46464F',
};

// Custom palette extensions not covered by MUI defaults
declare module '@mui/material/styles' {
  interface Palette {
    tertiary: Palette['primary'];
    outline: { main: string; variant: string };
    surface: {
      main: string;
      dim: string;
      bright: string;
      containerLowest: string;
      containerLow: string;
      container: string;
      containerHigh: string;
      containerHighest: string;
    };
    navBar: string;
  }
  interface PaletteOptions {
    tertiary?: PaletteOptions['primary'];
    outline?: { main: string; variant: string };
    surface?: {
      main: string;
      dim: string;
      bright: string;
      containerLowest: string;
      containerLow: string;
      container: string;
      containerHigh: string;
      containerHighest: string;
    };
    navBar?: string;
  }
}

function buildTheme(mode: 'light' | 'dark') {
  const palette = mode === 'dark' ? darkPalette : lightPalette;

  return createTheme({
    palette: {
      ...palette,
      tertiary:
        mode === 'dark'
          ? { main: '#E4BAD9', light: '#5B3D57', dark: '#FFD7F5', contrastText: '#432740' }
          : { main: '#75546F', light: '#FFD7F5', dark: '#5B3D57', contrastText: '#FFFFFF' },
      outline:
        mode === 'dark'
          ? { main: '#90909A', variant: '#46464F' }
          : { main: '#767680', variant: '#C6C5D0' },
      surface:
        mode === 'dark'
          ? {
              main: '#121318',
              dim: '#121318',
              bright: '#38393F',
              containerLowest: '#0D0E13',
              containerLow: '#1A1B21',
              container: '#1E1F25',
              containerHigh: '#292A2F',
              containerHighest: '#33343A',
            }
          : {
              main: '#FAF8FF',
              dim: '#DAD9E0',
              bright: '#FAF8FF',
              containerLowest: '#FFFFFF',
              containerLow: '#F4F3FA',
              container: '#EFEDF4',
              containerHigh: '#E9E7EF',
              containerHighest: '#E3E1E9',
            },
      navBar: mode === 'dark' ? '#0D47A1' : '#2962FF',
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
  });
}

export const lightTheme = buildTheme('light');
export const darkTheme = buildTheme('dark');
