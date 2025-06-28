import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Importar rutas
import authRoutes from "./routes/authRoutes.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import mascotaRoutes from "./routes/mascotaRoutes.js";
import historiaRoutes from "./routes/historiaRoutes.js";
import citaRoutes from "./routes/citaRoutes.js";
import inventarioRoutes from "./routes/inventarioRoutes.js";

dotenv.config();
const app = express();

// Middlewares
app.use(cors({
  origin: process.env.CORS_ORIGIN || "*",
  credentials: true
}));
app.use(express.json());

// Conexión MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch(err => console.error("❌ Error en conexión MongoDB:", err));

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/mascotas", mascotaRoutes);
app.use("/api/historias", historiaRoutes);
app.use("/api/citas", citaRoutes);
app.use("/api/inventario", inventarioRoutes);

// Puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en puerto ${PORT}`);
});