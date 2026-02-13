import type { Metadata } from 'next';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

export const metadata: Metadata = {
  title: 'Terms of Service',
};

export default function TermsPage() {
  return (
    <>
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        color="primary"
        sx={{ fontSize: { xs: '2rem', md: '3rem' } }}
      >
        Terms of Service
      </Typography>

      <Typography variant="body2" color="text.secondary" component="p" sx={{ mb: 2 }}>
        <strong>Last updated:</strong> February 9, 2026
      </Typography>

      <Typography variant="body1" component="p" sx={{ mb: 2 }}>
        Welcome to <strong>maaldo.com</strong> (the &quot;Website&quot;), operated by{' '}
        <strong>Matt Doering</strong> (&quot;I&quot;, &quot;me&quot;, or &quot;my&quot;). By
        accessing or using this Website, you agree to these Terms of Service. If you do not agree,
        please do not use the Website.
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h5" component="h2" gutterBottom color="primary">
        Purpose of the Website
      </Typography>

      <Typography variant="body1" component="p" sx={{ mb: 2 }}>
        maaldo.com is a personal website used to showcase professional work, personal projects, and
        written content such as blog posts. Content is provided for informational and educational
        purposes only.
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h5" component="h2" gutterBottom color="primary">
        Authentication and Accounts
      </Typography>

      <Typography variant="body1" component="p" sx={{ mb: 2 }}>
        Some features of the Website may allow you to sign in using third-party authentication
        providers such as Google, GitHub, or Facebook.
      </Typography>

      <Typography variant="body1" component="p" sx={{ mb: 2 }}>
        By signing in, you authorize the Website to receive basic profile information as permitted
        by the provider and your account settings. The Website does not store passwords or
        authentication credentials.
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h5" component="h2" gutterBottom color="primary">
        Acceptable Use
      </Typography>

      <Typography variant="body1" component="p" sx={{ mb: 2 }}>
        You agree not to:
      </Typography>

      <List dense disablePadding sx={{ mb: 2 }}>
        <ListItem sx={{ py: 0 }}>
          <ListItemText primary="Use the Website for unlawful purposes" />
        </ListItem>
        <ListItem sx={{ py: 0 }}>
          <ListItemText primary="Attempt unauthorized access or abuse of site functionality" />
        </ListItem>
        <ListItem sx={{ py: 0 }}>
          <ListItemText primary="Interfere with Website operation or security" />
        </ListItem>
      </List>

      <Typography variant="body1" component="p" sx={{ mb: 2 }}>
        Access may be restricted or terminated if these terms are violated.
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h5" component="h2" gutterBottom color="primary">
        Intellectual Property
      </Typography>

      <Typography variant="body1" component="p" sx={{ mb: 2 }}>
        All original content on maaldo.com — including text, code samples, and design elements — is
        owned by me unless otherwise noted.
      </Typography>

      <Typography variant="body1" component="p" sx={{ mb: 2 }}>
        You may view and share content for personal, non-commercial use. Commercial use or
        redistribution requires permission.
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h5" component="h2" gutterBottom color="primary">
        External Links
      </Typography>

      <Typography variant="body1" component="p" sx={{ mb: 2 }}>
        The Website may link to third-party sites or services. I am not responsible for their
        content or practices.
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h5" component="h2" gutterBottom color="primary">
        Disclaimer
      </Typography>

      <Typography variant="body1" component="p" sx={{ mb: 2 }}>
        The Website is provided &quot;as is&quot; without warranties of any kind. I do not guarantee
        accuracy, availability, or suitability of the content.
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h5" component="h2" gutterBottom color="primary">
        Limitation of Liability
      </Typography>

      <Typography variant="body1" component="p" sx={{ mb: 2 }}>
        To the fullest extent permitted by law, I am not liable for damages arising from use of the
        Website.
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h5" component="h2" gutterBottom color="primary">
        Changes to These Terms
      </Typography>

      <Typography variant="body1" component="p" sx={{ mb: 2 }}>
        These Terms may be updated at any time. Continued use of the Website constitutes acceptance
        of the updated terms.
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h5" component="h2" gutterBottom color="primary">
        Contact
      </Typography>

      <Box sx={{ mb: 2 }}>
        <Typography variant="body1">
          For questions regarding these Terms:{' '}
          <Link href="/contact" underline="hover">
            Contact me
          </Link>
        </Typography>
      </Box>
    </>
  );
}
