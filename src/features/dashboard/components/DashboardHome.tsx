import { Box, Typography, Paper, Grid, alpha, Card, CardContent } from "@mui/material";
import { FitnessCenter, People, TrendingUp, Timer } from "@mui/icons-material";

const PRIMARY_NEON = "#CCFF00";
const PAPER_DARK = "#141414";

export default function Dashboard() {
  const stats = [
    { title: "Atletas Activos", value: "128", icon: <People />, color: "#4CAF50" },
    { title: "Clases Hoy", value: "8", icon: <Timer />, color: "#2196F3" },
    { title: "Progreso Promedio", value: "75%", icon: <TrendingUp />, color: PRIMARY_NEON },
  ];

  return (
    <Box sx={{ p: 4, bgcolor: "#0A0A0A", minHeight: "100vh", color: "white" }}>
      <Typography variant="h4" fontWeight={900} mb={4}>
        Dashboard <span style={{ color: PRIMARY_NEON }}>FitWeb</span>
      </Typography>

      {/* Tarjetas de Resumen */}
      <Grid container spacing={3} mb={4}>
        {stats.map((stat, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Paper sx={{ p: 3, bgcolor: PAPER_DARK, border: `1px solid ${alpha(stat.color, 0.3)}`, display: "flex", alignItems: "center", gap: 2 }}>
              <Box sx={{ color: stat.color, fontSize: 40 }}>{stat.icon}</Box>
              <Box>
                <Typography variant="caption" sx={{ color: "#888" }}>{stat.title}</Typography>
                <Typography variant="h4" fontWeight={700}>{stat.value}</Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Área de Trabajo */}
      <Paper sx={{ p: 4, bgcolor: PAPER_DARK, border: `1px solid ${alpha("#FFF", 0.1)}` }}>
        <Typography variant="h6" mb={2}>Últimos Registros</Typography>
        <Typography sx={{ color: "#666" }}>Aquí puedes renderizar tu tabla de datos o el calendario de entrenamientos.</Typography>
      </Paper>
    </Box>
  );
}