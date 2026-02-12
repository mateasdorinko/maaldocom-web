import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';

interface ErrorStateProps {
  message?: string;
}

export default function ErrorState({
  message = 'Something went wrong. Please try again later.',
}: ErrorStateProps) {
  return (
    <Box sx={{ py: 4 }}>
      <Alert severity="error">
        <Typography variant="body2">{message}</Typography>
      </Alert>
    </Box>
  );
}
