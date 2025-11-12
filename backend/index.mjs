import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { Sequelize } from "sequelize";

// 🧩 Importamos rutas, modelos y la función de inicialización
import { defineModels } from "./models/index.mjs";
import { initializeData } from "./helpers/initializer.mjs";
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

// 🔗 Inicialización de Sequelize y Modelos
const DB_URI = process.env.POSTGRES_URI;

if (!DB_URI) {
  console.error("ERROR CRÍTICO: La variable POSTGRES_URI no está definida en .env");
  process.exit(1);
}

const sequelize = new Sequelize(DB_URI, {
  dialect: "postgres",
  logging: false,
});

const { Usuario, Galeria } = defineModels(sequelize);

// 🤝 Establecer relaciones de los modelos
// Un Usuario (creador) tiene muchas Galerias
Usuario.hasMany(Galeria, { foreignKey: 'creadorId', as: 'obras' });
// Una Galeria pertenece a un Usuario (creador)
Galeria.belongsTo(Usuario, { foreignKey: 'creadorId', as: 'creador' });


// 🔗 Rutas (Pasamos los modelos a las rutas)
app.use("/usuarios", usuarioRoutes(Usuario));
app.use("/galerias", galeriaRoutes(Galeria, Usuario));
app.use("/admin", adminRoutes(Usuario));

// 🏠 Ruta base
app.get("/", (req, res) => res.send("API Galería activa (PostgreSQL)"));

// 💾 Conexión a PostgreSQL y sincronización de modelos
async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("PostgreSQL conectado y autenticado.");

    // Sincroniza (crea o actualiza tablas)
    await sequelize.sync({ alter: true });
    console.log("Modelos de base de datos sincronizados.");

    // 🆕 Inicializa datos de prueba (solo si no existe un admin)
    await initializeData(Usuario, Galeria);

    // 🚀 Iniciar servidor
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
  } catch (err) {
    console.error("Error al conectar o sincronizar con PostgreSQL:", err.message);
    process.exit(1);
  }
}

connectDB();