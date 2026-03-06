import { Box, Container, Typography } from '@mui/material';

export default function Register() {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Registro - FitLife
        </Typography>
        <Typography sx={{ mt: 2 }} color="text.secondary">
          Componente en desarrollo...
        </Typography>
      </Box>
    </Container>
  );
}
