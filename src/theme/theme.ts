'use client';

import { createTheme } from '@mui/material/styles';

interface ColorSet {
  main: string;
  light: string;
  dark: string;
  contrastText: string;
}

function colorSet(main: string, light: string, dark: string, contrastText: string): ColorSet {
  return { main, light, dark, contrastText };
}

// Palette tokens generated from Material Design palette tool
const lightPalette = {
  mode: 'light' as const,
  primary: colorSet('#2962ff', '#6280ff', '#0022d9', '#FFFFFF'),
  secondary: colorSet('#5b29ff', '#9871ff', '#301cf0', '#FFFFFF'),
  error: colorSet('#ff2962', '#ff6892', '#d71e5c', '#FFFFFF'),
  warning: colorSet('#ffc629', '#ffd14f', '#feaf07', '#000000'),
  info: colorSet('#00c2ff', '#29cdff', '#0083cc', '#000000'),
  background: { default: '#FAF8FF', paper: '#F4F3FA' },
  text: { primary: '#1A1B21', secondary: '#45464F' },
  divider: '#C6C5D0',
};

const darkPalette = {
  mode: 'dark' as const,
  primary: colorSet('#96a4fe', '#c2c8fe', '#003bf0', '#0001c0'),
  secondary: colorSet('#b89cff', '#d5c4fe', '#4b25f8', '#0000e6'),
  error: colorSet('#ff94b2', '#ffbed0', '#c31859', '#9f0b53'),
  warning: colorSet('#ffd14f', '#ffdd81', '#fd8b09', '#000000'),
  info: colorSet('#76dbfe', '#afeafe', '#0094e0', '#0062ab'),
  background: { default: '#121318', paper: '#1D1E24' },
  text: { primary: '#E3E1E9', secondary: '#C6C5D0' },
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
            root: {
              variants: [
                {
                  props: { variant: 'contained', color: 'primary' },
                  style: {
                    '&:hover': {
                      color: '#c2c8fe',
                    },
                  },
                },
              ],
            },
          },
        },
      },
    }),
  });
}

export const lightTheme = buildTheme('light');
export const darkTheme = buildTheme('dark');
