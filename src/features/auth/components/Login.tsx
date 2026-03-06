import { useState, useEffect } from "react";
import {
  Alert, Box, Button, IconButton, Paper, TextField, Typography, alpha, CircularProgress, Container
} from "@mui/material";
import {
  Visibility, VisibilityOff, FitnessCenter, Email, Lock
} from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate, Link } from "react-router-dom";

const IMAGES = [
  "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=2069",
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070",
  "https://images.unsplash.com/photo-1517838350711-25591325c3f8?q=80&w=2070"
];

const PRIMARY_NEON = "#CCFF00";
const PAPER_DARK = "rgba(20, 20, 20, 0.95)";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "Mínimo 8 caracteres"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const [currentBg, setCurrentBg] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    IMAGES.forEach((src) => { new Image().src = src; });
    const interval = setInterval(() => setCurrentBg((prev) => (prev + 1) % IMAGES.length), 6000);
    return () => clearInterval(interval);
  }, []);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <Box sx={{ 
      minHeight: "100vh", width: "100vw", display: "flex", alignItems: "center", justifyContent: "center",
      backgroundImage: `url(${IMAGES[currentBg]})`, backgroundSize: "cover", backgroundPosition: "center",
      transition: "background-image 0.8s ease-in-out", p: 2
    }}>
      <Box sx={{ position: "absolute", inset: 0, bgcolor: "rgba(0,0,0,0.85)" }} />

      <Container maxWidth="xs" sx={{ position: "relative", zIndex: 1 }}>
        <Paper elevation={0} sx={{ p: 4, borderRadius: 5, bgcolor: PAPER_DARK, border: `1px solid ${alpha("#FFF", 0.1)}`, color: "white" }}>
          <Box textAlign="center" mb={3}>
            <FitnessCenter sx={{ fontSize: 40, color: PRIMARY_NEON, mb: 1 }} />
            <Typography variant="h4" fontWeight={900}>Bienvenido de <span style={{ color: PRIMARY_NEON }}>nuevo</span></Typography>
          </Box>

          <form onSubmit={handleSubmit((d) => console.log(d))}>
            <TextField 
              fullWidth label="Email" {...register("email")} error={!!errors.email}
              helperText={errors.email?.message} sx={fieldStyle} margin="normal"
              InputProps={{ startAdornment: <Email sx={{ mr: 1, color: "#666" }} /> }}
            />
            <TextField 
              fullWidth label="Contraseña" type={showPassword ? "text" : "password"}
              {...register("password")} error={!!errors.password}
              helperText={errors.password?.message} sx={fieldStyle} margin="normal"
              InputProps={{ 
                startAdornment: <Lock sx={{ mr: 1, color: "#666" }} />,
                endAdornment: <IconButton onClick={() => setShowPassword(!showPassword)}><VisibilityOff sx={{ color: "#666" }}/></IconButton>
              }}
            />
            
            <Button fullWidth type="submit" variant="contained" sx={{ mt: 3, py: 1.5, borderRadius: 2, bgcolor: PRIMARY_NEON, color: "black", fontWeight: 800 }}>
              INICIAR SESIÓN
            </Button>
          </form>

          <Box textAlign="center" mt={3}>
            <Typography variant="caption" sx={{ color: "#888" }}>
              ¿No tienes cuenta? <Link to="/auth/register" style={{ color: PRIMARY_NEON, textDecoration: "none" }}>Regístrate</Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

const fieldStyle = {
  "& .MuiOutlinedInput-root": { color: "white", borderRadius: 2, bgcolor: alpha("#FFF", 0.05), "& fieldset": { borderColor: alpha("#FFF", 0.1) } },
  "& .MuiInputLabel-root": { color: "#888", fontSize: "0.9rem" }
};