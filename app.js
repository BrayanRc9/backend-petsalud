const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const mascotaRoutes = require("./routes/mascotaRoutes");
const citaRoutes = require("./routes/citaRoutes");
const inventarioRoutes = require("./routes/inventarioRoutes");

const app = express();

// 👇 Habilita CORS para tu frontend (Netlify o localhost)
app.use(cors({
  origin: ["http://localhost:5500", "https://tu-frontend.netlify.app"], // actualiza con tu dominio real
  credentials: true
}));

app.use(express.json());

// Rutas API
app.use("/api/auth", authRoutes);
app.use("/api/mascotas", mascotaRoutes);
app.use("/api/citas", citaRoutes);
app.use("/api/inventario", inventarioRoutes);

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Conectado a MongoDB");
    app.listen(PORT, () => console.log(`🚀 Servidor activo en puerto ${PORT}`));
  })
  .catch(err => console.error("❌ Error de conexión a MongoDB:", err));
