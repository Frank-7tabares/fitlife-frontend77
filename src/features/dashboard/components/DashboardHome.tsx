import { Box, Container, Typography } from '@mui/material';

export default function DashboardHome() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard - FitLife
        </Typography>
        <Typography color="text.secondary">
          Bienvenido a tu panel de control
        </Typography>
      </Box>
    </Container>
  );
}
