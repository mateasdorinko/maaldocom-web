import type { Metadata } from 'next';
import { Audiowide, Roboto } from 'next/font/google';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Auth0Provider } from '@auth0/nextjs-auth0';
import ThemeRegistry from '@/theme/ThemeRegistry';
import AppHeader from '@/components/AppHeader';
import AppFooter from '@/components/AppFooter';
import './globals.css';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const audiowide = Audiowide({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-audiowide',
});

export const metadata: Metadata = {
  title: {
    default: 'maaldo.com',
    template: '%s | maaldo.com',
  },
  description: 'Personal portfolio, media albums, writings, and more.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} ${audiowide.variable}`}>
        <Auth0Provider>
          <AppRouterCacheProvider>
            <ThemeRegistry>
              <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <AppHeader />
                <Container component="main" maxWidth="lg" sx={{ flex: 1, py: 3 }}>
                  {children}
                </Container>
                <AppFooter />
              </Box>
            </ThemeRegistry>
          </AppRouterCacheProvider>
        </Auth0Provider>
      </body>
    </html>
  );
}
