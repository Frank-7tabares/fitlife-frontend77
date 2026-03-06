import { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
  Alert,
  Link as MuiLink,
  Divider,
  useTheme,
  alpha,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  FitnessCenter,
  TrendingUp,
  LocalFireDepartment,
  Restaurant,
} from '@mui/icons-material';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { authService } from '../../../services/auth.service';
import { useAuthStore } from '../../../store/auth.store';

const loginSchema = z.object({
  email: z.string().email('Email inválido').min(1, 'Email es requerido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await authService.login(data);
      setAuth(response.user, response.access_token, response.refresh_token);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al iniciar sesión. Verifica tus credenciales.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        position: 'fixed',
        top: 0,
        left: 0,
        overflow: 'hidden',
        background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
      }}
    >
      {/* Círculos animados */}
      <Box
        sx={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          background: alpha(theme.palette.primary.light, 0.15),
          borderRadius: '50%',
          top: '-200px',
          left: '-150px',
          animation: 'float 20s ease-in-out infinite',
          '@keyframes float': {
            '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
            '50%': { transform: 'translate(50px, 50px) scale(1.1)' },
          },
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          background: alpha(theme.palette.secondary.light, 0.15),
          borderRadius: '50%',
          bottom: '-150px',
          right: '-100px',
          animation: 'float 15s ease-in-out infinite reverse',
        }}
      />

      <Grid container sx={{ height: '100%', position: 'relative', zIndex: 1, m: 0 }}>
        {/* Lado izquierdo */}
        <Grid
          size={{ xs: 12, md: 7 }}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            p: { xs: 4, md: 6, lg: 8 },
            color: 'white',
            height: '100%',
          }}
        >
          {/* Logo y título */}
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
              <Box
                sx={{
                  width: 70,
                  height: 70,
                  borderRadius: '50%',
                  background: alpha('#fff', 0.2),
                  backdropFilter: 'blur(10px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <FitnessCenter sx={{ fontSize: 40, color: 'white' }} />
              </Box>
              <Typography variant="h3" fontWeight={800} letterSpacing={-1}>
                FitLife
              </Typography>
            </Box>

            <Typography variant="h3" fontWeight={700} sx={{ mb: 2, lineHeight: 1.2 }}>
              Transforma tu vida,
              <br />
              Un entrenamiento a la vez 💪
            </Typography>

            <Typography variant="h6" sx={{ mb: 4, opacity: 0.95, fontWeight: 400, maxWidth: '90%' }}>
              Accede a tu plan personalizado de entrenamiento y nutrición
            </Typography>
          </Box>

          {/* Contenido central */}
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {/* Stats Cards */}
            <Box sx={{ mb: 4 }}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <Box
                    sx={{
                      background: alpha('#fff', 0.15),
                      backdropFilter: 'blur(10px)',
                      borderRadius: 3,
                      p: 3,
                      border: `1px solid ${alpha('#fff', 0.2)}`,
                      textAlign: 'center',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                      },
                    }}
                  >
                    <TrendingUp sx={{ fontSize: 40, mb: 1.5 }} />
                    <Typography variant="h4" fontWeight={700}>
                      10K+
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.9 }}>
                      Usuarios Activos
                    </Typography>
                  </Box>
                </Grid>

                <Grid size={{ xs: 12, sm: 4 }}>
                  <Box
                    sx={{
                      background: alpha('#fff', 0.15),
                      backdropFilter: 'blur(10px)',
                      borderRadius: 3,
                      p: 3,
                      border: `1px solid ${alpha('#fff', 0.2)}`,
                      textAlign: 'center',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                      },
                    }}
                  >
                    <LocalFireDepartment sx={{ fontSize: 40, mb: 1.5 }} />
                    <Typography variant="h4" fontWeight={700}>
                      500K+
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.9 }}>
                      Entrenamientos
                    </Typography>
                  </Box>
                </Grid>

                <Grid size={{ xs: 12, sm: 4 }}>
                  <Box
                    sx={{
                      background: alpha('#fff', 0.15),
                      backdropFilter: 'blur(10px)',
                      borderRadius: 3,
                      p: 3,
                      border: `1px solid ${alpha('#fff', 0.2)}`,
                      textAlign: 'center',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                      },
                    }}
                  >
                    <Restaurant sx={{ fontSize: 40, mb: 1.5 }} />
                    <Typography variant="h4" fontWeight={700}>
                      50K+
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.9 }}>
                      Planes Nutricionales
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>

            {/* Imagen de motivación */}
            <Box
              sx={{
                borderRadius: 4,
                overflow: 'hidden',
                background: alpha('#fff', 0.1),
                backdropFilter: 'blur(10px)',
                border: `2px solid ${alpha('#fff', 0.2)}`,
                height: '350px',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&auto=format&fit=crop"
                alt="Fitness Motivation"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: 0.9,
                }}
              />
            </Box>
          </Box>

          {/* Features footer */}
          <Box sx={{ mt: 4 }}>
            <Grid container spacing={2}>
              {['✓ Planes personalizados', '✓ Seguimiento en tiempo real', '✓ Nutrición balanceada'].map((feature, index) => (
                <Grid size={{ xs: 12, sm: 4 }} key={index}>
                  <Box
                    sx={{
                      background: alpha('#fff', 0.1),
                      backdropFilter: 'blur(5px)',
                      borderRadius: 2,
                      p: 2,
                      border: `1px solid ${alpha('#fff', 0.15)}`,
                      textAlign: 'center',
                    }}
                  >
                    <Typography variant="body1" fontWeight={600}>
                      {feature}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>

        {/* Lado derecho - Formulario */}
        <Grid
          size={{ xs: 12, md: 5 }}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: { xs: 3, md: 4 },
            height: '100%',
          }}
        >
          <Paper
            elevation={24}
            sx={{
              width: '100%',
              maxWidth: 480,
              p: { xs: 3, sm: 4 },
              borderRadius: 4,
              background: alpha('#fff', 0.98),
              backdropFilter: 'blur(20px)',
              border: `1px solid ${alpha('#fff', 0.3)}`,
              boxShadow: `0 20px 60px ${alpha('#000', 0.3)}`,
            }}
          >
            <Typography variant="h4" fontWeight={700} gutterBottom sx={{ color: theme.palette.primary.main }}>
              ¡Bienvenido de nuevo! 👋
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Ingresa tus credenciales para continuar
            </Typography>

            {error && (
              <Alert 
                severity="error" 
                sx={{ 
                  mb: 3,
                  borderRadius: 2,
                  animation: 'shake 0.5s',
                  '@keyframes shake': {
                    '0%, 100%': { transform: 'translateX(0)' },
                    '25%': { transform: 'translateX(-10px)' },
                    '75%': { transform: 'translateX(10px)' },
                  },
                }}
              >
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email color="primary" />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2.5 }}
              />

              <TextField
                fullWidth
                label="Contraseña"
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                error={!!errors.password}
                helperText={errors.password?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock color="primary" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2 }}
              />

              <Box sx={{ textAlign: 'right', mb: 3 }}>
                <MuiLink
                  component={Link}
                  to="/auth/reset-password"
                  variant="body2"
                  sx={{ 
                    textDecoration: 'none',
                    fontWeight: 600,
                    color: theme.palette.primary.main,
                  }}
                >
                  ¿Olvidaste tu contraseña?
                </MuiLink>
              </Box>

              <Button
                fullWidth
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
                sx={{
                  py: 1.8,
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                  boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.4)}`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
                    transform: 'translateY(-2px)',
                    boxShadow: `0 12px 32px ${alpha(theme.palette.primary.main, 0.5)}`,
                  },
                }}
              >
                {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </Button>
            </form>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" color="text.secondary">
                O
              </Typography>
            </Divider>

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                ¿No tienes una cuenta?{' '}
                <MuiLink
                  component={Link}
                  to="/auth/register"
                  fontWeight={700}
                  sx={{ 
                    textDecoration: 'none',
                    color: theme.palette.primary.main,
                  }}
                >
                  Regístrate gratis
                </MuiLink>
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}