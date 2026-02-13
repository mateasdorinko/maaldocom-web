'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useTheme } from '@mui/material/styles';
import { useUser } from '@auth0/nextjs-auth0';
import { ThemeContext } from '@/theme/ThemeRegistry';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Media Albums', href: '/media-albums' },
  { label: 'Writings', href: '/writings' },
  { label: 'Lab', href: '/lab' },
  { label: 'Contact', href: '/contact' },
];

export default function AppHeader() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const pathname = usePathname();
  const theme = useTheme();
  const { mode, toggleMode } = React.useContext(ThemeContext);
  const { user, isLoading } = useUser();

  return (
    <>
      {/* Logo + domain name row above the nav bar */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: { xs: 1, sm: 1.25 },
          px: { xs: 1.25, sm: 1 },
          py: { xs: '7px', sm: '7px' },
        }}
      >
        {/* Hamburger menu on mobile */}
        <IconButton
          onClick={() => setDrawerOpen(true)}
          sx={{ display: { md: 'none' }, color: theme.palette.text.primary, p: 0.5 }}
          aria-label="Open navigation menu"
        >
          <MenuIcon />
        </IconButton>

        <Box
          component={Link}
          href="/"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: { xs: 1, sm: 1.25 },
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          <Box
            component="img"
            src="/images/logo.svg"
            alt="maaldo logo"
            sx={{ display: 'block', width: { xs: 32, sm: 40 }, height: { xs: 32, sm: 40 } }}
          />
          <Typography
            component="span"
            sx={{
              fontFamily: 'var(--font-audiowide)',
              fontWeight: 400,
              fontSize: { xs: '28px', sm: '34px', md: '40px' },
            }}
          >
            maaldo
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <IconButton
          onClick={toggleMode}
          sx={{ color: theme.palette.text.primary }}
          aria-label="Toggle theme"
        >
          {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </Box>

      {/* Navigation bar - desktop only */}
      <AppBar
        position="sticky"
        elevation={2}
        sx={{ bgcolor: theme.palette.navBar, display: { xs: 'none', md: 'flex' } }}
      >
        <Toolbar variant="dense" sx={{ gap: 0.5 }}>
          {navItems.map((item) => (
            <Button
              key={item.href}
              component={Link}
              href={item.href}
              color="inherit"
              sx={{
                fontWeight: pathname === item.href ? 600 : 400,
                bgcolor: pathname === item.href ? 'rgba(255,255,255,0.15)' : 'transparent',
                borderRadius: 2,
                '&:hover': {
                  bgcolor:
                    pathname === item.href ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.08)',
                },
              }}
            >
              {item.label}
            </Button>
          ))}
          <Box sx={{ flexGrow: 1 }} />
          {!isLoading &&
            (user ? (
              <Button
                color="inherit"
                href="/auth/logout"
                sx={{ fontSize: '0.75rem', textTransform: 'none' }}
              >
                Sign out {user.name}
              </Button>
            ) : (
              <Button
                color="inherit"
                href="/auth/login"
                sx={{ fontSize: '0.75rem', textTransform: 'none' }}
              >
                Sign in
              </Button>
            ))}
        </Toolbar>
      </AppBar>

      {/* Mobile drawer */}
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 250 }} role="navigation" onClick={() => setDrawerOpen(false)}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 2 }}>
            <Box
              component="img"
              src="/images/logo.svg"
              alt="maaldo logo"
              sx={{ width: 28, height: 28 }}
            />
            <Typography
              variant="h6"
              component="span"
              sx={{ fontFamily: 'var(--font-audiowide)', fontWeight: 400, fontSize: '1.25rem' }}
            >
              maaldo
            </Typography>
          </Box>
          <List>
            {navItems.map((item) => (
              <ListItem key={item.href} disablePadding>
                <ListItemButton component={Link} href={item.href} selected={pathname === item.href}>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
            <ListItem disablePadding>
              {!isLoading &&
                (user ? (
                  <ListItemButton component="a" href="/auth/logout">
                    <ListItemText
                      primary="Sign out"
                      slotProps={{ primary: { fontSize: '0.85rem' } }}
                    />
                  </ListItemButton>
                ) : (
                  <ListItemButton component="a" href="/auth/login">
                    <ListItemText
                      primary="Sign in"
                      slotProps={{ primary: { fontSize: '0.85rem' } }}
                    />
                  </ListItemButton>
                ))}
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}
