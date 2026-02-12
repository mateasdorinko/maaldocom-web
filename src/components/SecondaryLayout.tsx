import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

interface SecondaryLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

/**
 * Reusable two-column layout: main content + right-side navigation.
 * On mobile (xs), the sidebar collapses below the main content.
 */
export default function SecondaryLayout({ children, sidebar }: SecondaryLayoutProps) {
  return (
    <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
      <Box sx={{ flex: 1, minWidth: 0 }}>{children}</Box>
      <Paper
        elevation={0}
        sx={{
          width: { xs: '100%', md: 220 },
          flexShrink: 0,
          p: 2,
          borderRadius: 2,
          alignSelf: 'flex-start',
        }}
      >
        {sidebar}
      </Paper>
    </Box>
  );
}
