import type { Metadata } from 'next';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

export const metadata: Metadata = {
  title: 'Privacy Policy',
};

export default function PrivacyPage() {
  return (
    <>
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        color="primary"
        sx={{ fontSize: { xs: '2rem', md: '3rem' } }}
      >
        Privacy Policy
      </Typography>

      <Typography variant="body2" color="text.secondary" component="p" sx={{ mb: 2 }}>
        <strong>Last updated:</strong> February 9, 2026
      </Typography>

      <Typography variant="body1" component="p" sx={{ mb: 2 }}>
        This Privacy Policy explains how information is collected and used when you visit{' '}
        <strong>maaldo.com</strong>.
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Typography
        variant="h6"
        component="h2"
        gutterBottom
        sx={{ fontWeight: 500, color: 'tertiary.main' }}
      >
        Information Collected
      </Typography>

      <Typography
        variant="subtitle1"
        component="h3"
        gutterBottom
        sx={{ fontWeight: 600, color: 'secondary.main' }}
      >
        Information You Provide
      </Typography>

      <Typography variant="body1" component="p" sx={{ mb: 2 }}>
        When you sign in using a third-party OAuth provider (such as Google, GitHub, or Facebook),
        the Website may receive limited profile information, including:
      </Typography>

      <List dense disablePadding sx={{ mb: 2 }}>
        <ListItem sx={{ py: 0 }}>
          <ListItemText primary="Name" />
        </ListItem>
        <ListItem sx={{ py: 0 }}>
          <ListItemText primary="Email address" />
        </ListItem>
        <ListItem sx={{ py: 0 }}>
          <ListItemText primary="Profile image" />
        </ListItem>
        <ListItem sx={{ py: 0 }}>
          <ListItemText primary="Provider-specific user identifier" />
        </ListItem>
      </List>

      <Typography variant="body1" component="p" sx={{ mb: 2 }}>
        Only the minimum information required for authentication and basic functionality is
        collected.
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Typography
        variant="subtitle1"
        component="h3"
        gutterBottom
        sx={{ fontWeight: 600, color: 'secondary.main' }}
      >
        Automatically Collected Information
      </Typography>

      <Typography variant="body1" component="p" sx={{ mb: 2 }}>
        The Website may automatically collect limited technical data such as:
      </Typography>

      <List dense disablePadding sx={{ mb: 2 }}>
        <ListItem sx={{ py: 0 }}>
          <ListItemText primary="IP address" />
        </ListItem>
        <ListItem sx={{ py: 0 }}>
          <ListItemText primary="Browser type" />
        </ListItem>
        <ListItem sx={{ py: 0 }}>
          <ListItemText primary="Pages visited" />
        </ListItem>
        <ListItem sx={{ py: 0 }}>
          <ListItemText primary="Date and time of access" />
        </ListItem>
      </List>

      <Typography variant="body1" component="p" sx={{ mb: 2 }}>
        This data is used solely for security, analytics, and performance monitoring.
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Typography
        variant="h6"
        component="h2"
        gutterBottom
        sx={{ fontWeight: 500, color: 'tertiary.main' }}
      >
        How Information Is Used
      </Typography>

      <Typography variant="body1" component="p" sx={{ mb: 2 }}>
        Information is used to:
      </Typography>

      <List dense disablePadding sx={{ mb: 2 }}>
        <ListItem sx={{ py: 0 }}>
          <ListItemText primary="Authenticate users" />
        </ListItem>
        <ListItem sx={{ py: 0 }}>
          <ListItemText primary="Enable basic personalized features" />
        </ListItem>
        <ListItem sx={{ py: 0 }}>
          <ListItemText primary="Improve site functionality and security" />
        </ListItem>
      </List>

      <Typography variant="body1" component="p" sx={{ mb: 2 }}>
        Personal information is <strong>not sold or shared</strong> for marketing purposes.
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Typography
        variant="h6"
        component="h2"
        gutterBottom
        sx={{ fontWeight: 500, color: 'tertiary.main' }}
      >
        OAuth and Third-Party Services
      </Typography>

      <Typography variant="body1" component="p" sx={{ mb: 2 }}>
        Authentication is handled by trusted third-party providers. The Website does not access data
        beyond what is explicitly authorized by you.
      </Typography>

      <Typography variant="body1" component="p" sx={{ mb: 2 }}>
        Use of third-party services is governed by their respective privacy policies.
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Typography
        variant="h6"
        component="h2"
        gutterBottom
        sx={{ fontWeight: 500, color: 'tertiary.main' }}
      >
        Cookies
      </Typography>

      <Typography variant="body1" component="p" sx={{ mb: 2 }}>
        Cookies may be used for session management and essential functionality. You can disable
        cookies in your browser, though some features may not function correctly.
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Typography
        variant="h6"
        component="h2"
        gutterBottom
        sx={{ fontWeight: 500, color: 'tertiary.main' }}
      >
        Data Retention
      </Typography>

      <Typography variant="body1" component="p" sx={{ mb: 2 }}>
        Personal data is retained only as long as necessary to provide site functionality or comply
        with legal obligations. You may request deletion of your data at any time.
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Typography
        variant="h6"
        component="h2"
        gutterBottom
        sx={{ fontWeight: 500, color: 'tertiary.main' }}
      >
        Data Security
      </Typography>

      <Typography variant="body1" component="p" sx={{ mb: 2 }}>
        Reasonable safeguards are used to protect data. However, no system is completely secure, and
        absolute security cannot be guaranteed.
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Typography
        variant="h6"
        component="h2"
        gutterBottom
        sx={{ fontWeight: 500, color: 'tertiary.main' }}
      >
        Your Rights (GDPR & CCPA)
      </Typography>

      <Typography variant="body1" component="p" sx={{ mb: 2 }}>
        Depending on your location, you may have the right to:
      </Typography>

      <List dense disablePadding sx={{ mb: 2 }}>
        <ListItem sx={{ py: 0 }}>
          <ListItemText primary="Access your personal data" />
        </ListItem>
        <ListItem sx={{ py: 0 }}>
          <ListItemText primary="Request correction or deletion" />
        </ListItem>
        <ListItem sx={{ py: 0 }}>
          <ListItemText primary="Object to or restrict processing" />
        </ListItem>
        <ListItem sx={{ py: 0 }}>
          <ListItemText primary="Request data portability" />
        </ListItem>
      </List>

      <Typography variant="body1" component="p" sx={{ mb: 2 }}>
        California residents may also request disclosure of data collected and request deletion
        under the CCPA.
      </Typography>

      <Typography variant="body1" component="p" sx={{ mb: 2 }}>
        Requests can be submitted using the contact information below.
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Typography
        variant="h6"
        component="h2"
        gutterBottom
        sx={{ fontWeight: 500, color: 'tertiary.main' }}
      >
        Changes to This Policy
      </Typography>

      <Typography variant="body1" component="p" sx={{ mb: 2 }}>
        This Privacy Policy may be updated periodically. Updates will be posted on this page with a
        revised date.
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Typography
        variant="h6"
        component="h2"
        gutterBottom
        sx={{ fontWeight: 500, color: 'tertiary.main' }}
      >
        Contact
      </Typography>

      <Box sx={{ mb: 2 }}>
        <Typography variant="body1">
          For privacy-related questions or data requests:{' '}
          <Link href="/contact" underline="hover">
            Contact me
          </Link>
        </Typography>
      </Box>
    </>
  );
}
