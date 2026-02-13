'use client';

import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';
import { lightTheme, darkTheme } from './theme';

type ThemeMode = 'light' | 'dark';

interface ThemeContextValue {
  mode: ThemeMode;
  toggleMode: () => void;
}

export const ThemeContext = React.createContext<ThemeContextValue>({
  mode: 'dark',
  toggleMode: () => {},
});

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  const prefersLight = useMediaQuery('(prefers-color-scheme: light)');
  const [mode, setMode] = React.useState<ThemeMode>(prefersLight ? 'light' : 'dark');

  const toggleMode = React.useCallback(() => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  const theme = mode === 'dark' ? darkTheme : lightTheme;

  const contextValue = React.useMemo(() => ({ mode, toggleMode }), [mode, toggleMode]);

  return (
    <ThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
