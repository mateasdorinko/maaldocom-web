import ReactMarkdown from 'react-markdown';
import Box from '@mui/material/Box';
import MuiLink from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import type { Components } from 'react-markdown';
import { resolveBlobUrl } from '@/server';

interface WritingBodyProps {
  body: string | null | undefined;
}

const components: Components = {
  h1: ({ children }) => (
    <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 2 }}>
      {children}
    </Typography>
  ),
  h2: ({ children }) => (
    <Typography
      variant="h6"
      component="h3"
      gutterBottom
      sx={{ mt: 2, fontWeight: 500, color: 'tertiary.main' }}
    >
      {children}
    </Typography>
  ),
  h3: ({ children }) => (
    <Typography
      variant="subtitle1"
      component="h4"
      gutterBottom
      sx={{ mt: 1.5, fontWeight: 600, color: 'text.primary' }}
    >
      {children}
    </Typography>
  ),
  h4: ({ children }) => (
    <Typography variant="subtitle1" component="h5" gutterBottom sx={{ mt: 1, fontWeight: 600 }}>
      {children}
    </Typography>
  ),
  p: ({ children }) => (
    <Typography variant="body1" sx={{ mb: 1.5 }}>
      {children}
    </Typography>
  ),
  a: ({ href, children }) => (
    <MuiLink href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </MuiLink>
  ),
  img: ({ src, alt }) => {
    const decoded = typeof src === 'string' ? decodeURIComponent(src) : undefined;
    const [rawSrc, widthStr] = decoded ? decoded.split('|') : [undefined, undefined];
    const resolvedSrc = rawSrc != null ? (resolveBlobUrl(rawSrc) ?? rawSrc) : undefined;
    const width = widthStr ? parseInt(widthStr, 10) : undefined;
    return (
      <Box
        component="img"
        src={resolvedSrc}
        alt={alt ?? ''}
        sx={{
          maxWidth: '100%',
          height: 'auto',
          borderRadius: 1,
          my: 1,
          ...(width ? { width } : {}),
        }}
      />
    );
  },
  ul: ({ children }) => (
    <Box component="ul" sx={{ pl: 3, mb: 1.5, typography: 'body1' }}>
      {children}
    </Box>
  ),
  ol: ({ children }) => (
    <Box component="ol" sx={{ pl: 3, mb: 1.5, typography: 'body1' }}>
      {children}
    </Box>
  ),
  li: ({ children }) => (
    <Typography component="li" variant="body1" sx={{ mb: 0.5 }}>
      {children}
    </Typography>
  ),
  blockquote: ({ children }) => (
    <Paper
      variant="outlined"
      sx={{
        pl: 2,
        pr: 2,
        py: 1,
        mb: 1.5,
        borderLeft: 4,
        borderColor: 'primary.main',
        borderRadius: 0,
        bgcolor: 'action.hover',
      }}
    >
      {children}
    </Paper>
  ),
  code: ({ children }) => (
    <Typography
      component="code"
      sx={{
        fontFamily: 'monospace',
        fontSize: '0.875em',
        bgcolor: 'action.hover',
        px: 0.5,
        borderRadius: 0.5,
      }}
    >
      {children}
    </Typography>
  ),
};

export default function WritingBody({ body }: WritingBodyProps) {
  if (!body) return null;

  const normalizedBody = body
    .split('\n')
    .map((line) => line.trimStart())
    .join('\n');

  return (
    <Box sx={{ mt: 2 }}>
      <ReactMarkdown components={components}>{normalizedBody}</ReactMarkdown>
    </Box>
  );
}
