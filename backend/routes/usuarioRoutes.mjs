import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario.mjs";

console.log("✅ Rutas de usuario cargadas correctamente");

const router = express.Router();

/* ===========================
   🔹 Registro de usuario
=========================== */
router.post("/register", async (req, res) => {
  try {
    const { nombre, email, password, rol, edad } = req.body;

    // Validar datos obligatorios
    if (!nombre || !email || !password || !edad) {
      return res.status(400).json({ error: "Todos los campos son obligatorios (nombre, email, password, edad)." });
    }

    // Verificar edad mínima
    if (edad < 18) {
      return res.status(400).json({ error: "Debe ser mayor de edad para registrarse." });
    }

    // Verificar si el email ya existe
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ error: "El email ya está registrado." });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear nuevo usuario
    const nuevoUsuario = new Usuario({
      nombre,
      email,
      password: hashedPassword,
      edad,
      rol: rol || "comprador",
      solicitudVendedor: rol === "vendedor" ? true : false
    });

    await nuevoUsuario.save();

    res.status(201).json({ mensaje: "Usuario creado con éxito.", usuario: { nombre, email, edad, rol: nuevoUsuario.rol } });
  } catch (err) {
    console.error("❌ Error en /register:", err);
    res.status(500).json({ error: "Error al registrar usuario.", detalle: err.message });
  }
});

/* ===========================
   🔹 Inicio de sesión
=========================== */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ error: "Usuario no encontrado." });
    }

    const passwordValida = await bcrypt.compare(password, usuario.password);
    if (!passwordValida) {
      return res.status(400).json({ error: "Contraseña incorrecta." });
    }

    // Generar token JWT
    const token = jwt.sign(
      { id: usuario._id, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({
      mensaje: "Inicio de sesión exitoso.",
      token,
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        rol: usuario.rol,
        edad: usuario.edad
      }
    });
  } catch (err) {
    console.error("❌ Error en /login:", err);
    res.status(500).json({ error: "Error al iniciar sesión.", detalle: err.message });
  }
});

/* ===========================
   🔹 Verificar sesión (opcional)
=========================== */
router.get("/perfil", async (req, res) => {
  res.json({ mensaje: "Ruta de perfil funcional. (Pendiente de protección con token)" });
});

export default router;
