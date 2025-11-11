import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";

// 🧩 Importamos rutas después de dotenv
import usuarioRoutes from "./routes/usuarioRoutes.mjs";
import galeriaRoutes from "./routes/galeriaRoutes.mjs";
import adminRoutes from "./routes/adminRoutes.mjs";

const app = express();

// ⚙️ Middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// 🔗 Rutas
app.use("/usuarios", usuarioRoutes);
app.use("/galerias", galeriaRoutes);
app.use("/admin", adminRoutes);

// 🏠 Ruta base
app.get("/", (req, res) => res.send("API Galería activa"));

// 💾 Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => console.error("Error al conectar a MongoDB:", err));

// 🚀 Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
