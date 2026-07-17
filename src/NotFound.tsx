import { Box, Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          textAlign: 'center',
        }}
      >
        <Typography variant="h1" sx={{ fontWeight: 'bold' }} color="primary">
          404
        </Typography>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Oops! Page Not Found
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </Typography>
        <Button 
          variant="contained" 
          component={Link} 
          to="/"
          size="large"
        >
          Back to Home
        </Button>
      </Box>
    </Container>
  );
}
