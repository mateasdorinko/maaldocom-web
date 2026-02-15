'use client';

import { createTheme } from '@mui/material/styles';

// Palette tokens generated from Material Design palette tool
const lightPalette = {
  mode: 'light' as const,
  primary: {
    main: '#2962ff',
    light: '#6280ff',
    dark: '#0022d9',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#5b29ff',
    light: '#9871ff',
    dark: '#301cf0',
    contrastText: '#FFFFFF',
  },
  error: {
    main: '#ff2962',
    light: '#ff6892',
    dark: '#d71e5c',
    contrastText: '#FFFFFF',
  },
  warning: {
    main: '#ffc629',
    light: '#ffd14f',
    dark: '#feaf07',
    contrastText: '#000000',
  },
  info: {
    main: '#00c2ff',
    light: '#29cdff',
    dark: '#0083cc',
    contrastText: '#000000',
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
    main: '#96a4fe',
    light: '#c2c8fe',
    dark: '#003bf0',
    contrastText: '#0001c0',
  },
  secondary: {
    main: '#b89cff',
    light: '#d5c4fe',
    dark: '#4b25f8',
    contrastText: '#0000e6',
  },
  error: {
    main: '#ff94b2',
    light: '#ffbed0',
    dark: '#c31859',
    contrastText: '#9f0b53',
  },
  warning: {
    main: '#ffd14f',
    light: '#ffdd81',
    dark: '#fd8b09',
    contrastText: '#000000',
  },
  info: {
    main: '#76dbfe',
    light: '#afeafe',
    dark: '#0094e0',
    contrastText: '#0062ab',
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
          ? { main: '#e091ff', light: '#ecbefe', dark: '#8900f2', contrastText: '#2400e3' }
          : { main: '#c629ff', light: '#d25eff', dark: '#a600f8', contrastText: '#FFFFFF' },
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
      navBar: mode === 'dark' ? '#0D47A1' : '#2962ff',
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
    ...(mode === 'dark' && {
      components: {
        MuiButton: {
          styleOverrides: {
            containedPrimary: {
              '&:hover': {
                color: '#c2c8fe',
              },
            },
          },
        },
      },
    }),
  });
}

export const lightTheme = buildTheme('light');
export const darkTheme = buildTheme('dark');
