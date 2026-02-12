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
  { label: 'Contact', href: '/contact' },
  { label: 'Lab', href: '/lab' },
];

export default function AppHeader() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const pathname = usePathname();
  const theme = useTheme();
  const { mode, toggleMode } = React.useContext(ThemeContext);
  const { user, isLoading } = useUser();

  return (
    <>
      <AppBar position="sticky" sx={{ bgcolor: theme.palette.navBar }}>
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setDrawerOpen(true)}
            sx={{ mr: 2, display: { md: 'none' } }}
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
              gap: 1,
              flexGrow: 1,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <Box
              component="img"
              src="/logo.svg"
              alt="maaldo logo"
              sx={{ width: { xs: 28, sm: 34 }, height: { xs: 28, sm: 34 } }}
            />
            <Typography
              variant="h6"
              component="span"
              sx={{
                fontFamily: 'var(--font-audiowide)',
                fontWeight: 400,
                fontSize: { xs: '1.25rem', sm: '1.5rem' },
              }}
            >
              maaldo
            </Typography>
          </Box>

          {/* Desktop nav */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5, alignItems: 'center' }}>
            {navItems.map((item) => (
              <Button
                key={item.href}
                component={Link}
                href={item.href}
                color="inherit"
                sx={{
                  fontWeight: pathname === item.href ? 700 : 400,
                  textDecoration: pathname === item.href ? 'underline' : 'none',
                  textUnderlineOffset: 4,
                }}
              >
                {item.label}
              </Button>
            ))}
            {!isLoading &&
              (user ? (
                <Button color="inherit" href="/auth/logout">
                  Logout
                </Button>
              ) : (
                <Button color="inherit" href="/auth/login">
                  Login
                </Button>
              ))}
          </Box>

          <IconButton color="inherit" onClick={toggleMode} aria-label="Toggle theme">
            {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile drawer */}
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 250 }} role="navigation" onClick={() => setDrawerOpen(false)}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 2 }}>
            <Box component="img" src="/logo.svg" alt="maaldo logo" sx={{ width: 28, height: 28 }} />
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
                    <ListItemText primary="Logout" />
                  </ListItemButton>
                ) : (
                  <ListItemButton component="a" href="/auth/login">
                    <ListItemText primary="Login" />
                  </ListItemButton>
                ))}
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}
