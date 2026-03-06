import { useState, useEffect } from "react";
import {
  Alert, Box, Button, IconButton, Paper, TextField, Typography, alpha, CircularProgress, Container
} from "@mui/material";
import Grid from "@mui/material/Grid";
import {
  Visibility, VisibilityOff, FitnessCenter, SportsGymnastics, AdminPanelSettings, 
  PersonOutline, Badge, EmojiEvents
} from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate, Link } from "react-router-dom";

// Lista de imágenes con alta disponibilidad para evitar fondos grises
const IMAGES = [
  "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=2069",
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070",
  "https://images.unsplash.com/photo-1517838350711-25591325c3f8?q=80&w=2070"
];

const PRIMARY_NEON = "#CCFF00";
const BG_DARK = "#0A0A0A";
const PAPER_DARK = "rgba(20, 20, 20, 0.95)";

const registerSchema = z.object({
  name: z.string().min(2, "Mínimo 2 caracteres").max(100),
  email: z.string().email("Email inválido"),
  phone: z.string().regex(/^\+?\d{7,15}$/, "Formato inválido").optional(),
  password: z.string().min(8, "Mínimo 8 caracteres").regex(/[A-Z]/, "Una mayúscula").regex(/[0-9]/, "Un número"),
  confirmPassword: z.string(),
  role: z.enum(["client", "instructor", "admin"]),
  specialty: z.string().optional(),
  goal: z.string().optional(),
  adminCode: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function Register() {
  const navigate = useNavigate();
  const [currentBg, setCurrentBg] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  // Precarga de imágenes para eliminar el parpadeo gris
  useEffect(() => {
    IMAGES.forEach((src) => { new Image().src = src; });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setCurrentBg((prev) => (prev + 1) % IMAGES.length), 6000);
    return () => clearInterval(interval);
  }, []);

  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: "client" },
  });

  const selectedRole = watch("role");

  const getRoleStyle = (role: string) => ({
    p: 1.5, textAlign: "center", cursor: "pointer", borderRadius: 2, border: "2px solid",
    borderColor: selectedRole === role ? PRIMARY_NEON : alpha("#FFF", 0.05),
    bgcolor: selectedRole === role ? alpha(PRIMARY_NEON, 0.1) : alpha("#FFF", 0.02),
    color: selectedRole === role ? PRIMARY_NEON : "#888",
    transition: "0.3s",
    "&:hover": { borderColor: alpha(PRIMARY_NEON, 0.5) },
  });

  return (
    <Box sx={{ 
      minHeight: "100vh", width: "100vw", display: "flex", alignItems: "center", justifyContent: "center",
      backgroundImage: `url(${IMAGES[currentBg]})`, backgroundSize: "cover", backgroundPosition: "center",
      transition: "background-image 0.8s ease-in-out", py: 2
    }}>
      <Box sx={{ position: "absolute", inset: 0, bgcolor: "rgba(0,0,0,0.85)" }} />

      <Container maxWidth="xs" sx={{ position: "relative", zIndex: 1 }}>
        <Paper elevation={0} sx={{ p: 3, borderRadius: 5, bgcolor: PAPER_DARK, border: `1px solid ${alpha("#FFF", 0.1)}`, color: "white" }}>
          <Box textAlign="center" mb={2}>
            <FitnessCenter sx={{ fontSize: 35, color: PRIMARY_NEON }} />
            <Typography variant="h5" fontWeight={900}>Fit<span style={{ color: PRIMARY_NEON }}>Web</span></Typography>
          </Box>

          {serverError && <Alert severity="error" sx={{ mb: 2 }}>{serverError}</Alert>}

          <form onSubmit={handleSubmit((d) => console.log(d))}>
            <Grid container spacing={1} mb={2}>
              {[
                { id: "client", label: "Atleta", icon: <PersonOutline /> },
                { id: "instructor", label: "Coach", icon: <SportsGymnastics /> },
                { id: "admin", label: "Staff", icon: <AdminPanelSettings /> },
              ].map((r) => (
                <Grid item xs={4} key={r.id}>
                  <Box sx={getRoleStyle(r.id)} onClick={() => setValue("role", r.id as any)}>
                    <Box sx={{ fontSize: "small" }}>{r.icon}</Box>
                    <Typography fontSize="0.7rem" fontWeight={700}>{r.label}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>

            <Grid container spacing={1}>
              <Grid item xs={6}><TextField size="small" fullWidth label="Nombre" {...register("name")} sx={fieldStyle} /></Grid>
              <Grid item xs={6}><TextField size="small" fullWidth label="Email" {...register("email")} sx={fieldStyle} /></Grid>
              {selectedRole === "instructor" && <Grid item xs={12}><TextField size="small" fullWidth label="Especialidad" {...register("specialty")} sx={fieldStyle} /></Grid>}
              {selectedRole === "client" && <Grid item xs={12}><TextField size="small" fullWidth label="Objetivo" {...register("goal")} sx={fieldStyle} /></Grid>}
              {selectedRole === "admin" && <Grid item xs={12}><TextField size="small" fullWidth label="Cód. Admin" type="password" {...register("adminCode")} sx={fieldStyle} /></Grid>}
              <Grid item xs={6}><TextField size="small" fullWidth label="Password" type={showPassword ? "text" : "password"} {...register("password")} sx={fieldStyle} /></Grid>
              <Grid item xs={6}><TextField size="small" fullWidth label="Confirmar" type="password" {...register("confirmPassword")} sx={fieldStyle} /></Grid>
            </Grid>

            <Button fullWidth type="submit" variant="contained" disabled={loading} sx={{ mt: 2, py: 1.5, borderRadius: 2, bgcolor: PRIMARY_NEON, color: "black", fontWeight: 800 }}>
              {loading ? <CircularProgress size={20} /> : "REGISTRARSE"}
            </Button>
          </form>

          <Box textAlign="center" mt={2}>
            <Typography variant="caption" sx={{ color: "#888" }}>
              ¿Ya tienes cuenta? <Link to="/auth/login" style={{ color: PRIMARY_NEON, textDecoration: "none" }}>Entra</Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

const fieldStyle = {
  "& .MuiOutlinedInput-root": { color: "white", borderRadius: 2, bgcolor: alpha("#FFF", 0.05), "& fieldset": { borderColor: alpha("#FFF", 0.1) } },
  "& .MuiInputLabel-root": { color: "#888", fontSize: "0.8rem" }
};