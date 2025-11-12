// Archivo: backend/routes/usuarioRoutes.mjs

import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

// Exportamos una función que recibe el Modelo Usuario
export default (Usuario) => {

  // Función para generar el token JWT
  const generateAuthToken = (id) => {
    return jwt.sign({ id: id.toString() }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
  };

  // 📝 Ruta de REGISTRO
  router.post("/register", async (req, res) => {
    const { nombre, email, password, edad } = req.body;

    try {
      // 1. Encriptar la contraseña
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // 2. Crear el usuario con Sequelize
      const newUser = await Usuario.create({
        nombre,
        email,
        password: hashedPassword,
        edad,
        // rol, solicitudVendedor y activo usarán los valores por defecto
      });

      // 3. Generar token
      const token = generateAuthToken(newUser.id);

      // 4. Respuesta (Excluimos la contraseña en la respuesta)
      res.status(201).json({
        id: newUser.id,
        nombre: newUser.nombre,
        email: newUser.email,
        rol: newUser.rol,
        token: token,
      });
    } catch (error) {
      console.error("Error en registro:", error);
      // Manejar error de email duplicado (SequelizeUniqueConstraintError)
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ msg: "El email ya está registrado." });
      }
      res.status(500).json({ msg: "Error en el servidor al registrar el usuario." });
    }
  });

  // 🔑 Ruta de LOGIN
  router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
      // 1. Buscar usuario por email
      const user = await Usuario.findOne({ where: { email } });

      if (!user) {
        return res.status(400).json({ msg: "Credenciales inválidas." });
      }

      // 2. Comparar contraseña encriptada
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: "Credenciales inválidas." });
      }

      // 3. Generar token
      const token = generateAuthToken(user.id);

      // 4. Respuesta
      res.json({
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol,
        token: token,
      });
    } catch (error) {
      console.error("Error en login:", error);
      res.status(500).json({ msg: "Error en el servidor." });
    }
  });

  return router;
};