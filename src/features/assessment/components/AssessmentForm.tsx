import { Box, Container, Typography } from '@mui/material';

export default function AssessmentForm() {
  return (
    <Container maxWidth="md">
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Evaluación Física
        </Typography>
        <Typography color="text.secondary">
          Completa tu evaluación física
        </Typography>
      </Box>
    </Container>
  );
}
