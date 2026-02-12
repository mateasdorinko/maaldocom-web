'use client';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MuiLink from '@mui/material/Link';
import SvgIcon from '@mui/material/SvgIcon';
import Link from 'next/link';

function LinkedInIcon() {
  return (
    <SvgIcon>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </SvgIcon>
  );
}

function GitHubIcon() {
  return (
    <SvgIcon>
      <path d="M12 1.27a11 11 0 00-3.48 21.46c.55.09.73-.28.73-.55v-1.84c-3.03.64-3.67-1.46-3.67-1.46-.55-1.29-1.28-1.65-1.28-1.65-.92-.65.1-.65.1-.65 1.1 0 1.73 1.1 1.73 1.1.92 1.65 2.57 1.2 3.21.92a2.16 2.16 0 01.64-1.47c-2.47-.27-5.04-1.19-5.04-5.5 0-1.1.46-2.1 1.1-2.76a3.76 3.76 0 01.1-2.76s.84-.27 2.75 1.02a9.58 9.58 0 015.02 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.4.1 2.76.7.65 1.1 1.56 1.1 2.76 0 4.32-2.58 5.23-5.04 5.5.45.37.82.92.82 2.02v3.03c0 .27.18.64.73.55A11 11 0 0012 1.27" />
    </SvgIcon>
  );
}

function FacebookIcon() {
  return (
    <SvgIcon>
      <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04z" />
    </SvgIcon>
  );
}

function XIcon() {
  return (
    <SvgIcon>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </SvgIcon>
  );
}

const socialLinks = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/mattdoering/',
    icon: <LinkedInIcon />,
    hoverColor: '#0A66C2',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/mateasdorinko',
    icon: <GitHubIcon />,
    hoverColor: undefined,
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/MateasDorinko',
    icon: <FacebookIcon />,
    hoverColor: '#1877F2',
  },
  {
    label: 'X (Twitter)',
    href: 'https://x.com/mateasdorinko',
    icon: <XIcon />,
    hoverColor: undefined,
  },
];

export default function AppFooter() {
  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        py: 3,
        borderTop: 1,
        borderColor: 'divider',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
        {socialLinks.map((link) => (
          <IconButton
            key={link.label}
            component="a"
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            sx={{
              color: 'text.secondary',
              '&:hover': { color: link.hoverColor ?? 'text.primary' },
            }}
          >
            {link.icon}
          </IconButton>
        ))}
      </Box>
      <Typography variant="body2" color="text.secondary">
        &copy; {new Date().getFullYear()} maaldo.com &middot;{' '}
        <MuiLink component={Link} href="/terms" color="inherit" underline="hover">
          Terms
        </MuiLink>{' '}
        &middot;{' '}
        <MuiLink component={Link} href="/privacy" color="inherit" underline="hover">
          Privacy
        </MuiLink>
      </Typography>
    </Box>
  );
}
