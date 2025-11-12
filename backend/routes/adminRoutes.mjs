// Archivo: backend/routes/adminRoutes.mjs

import express from "express";
import { auth, adminOnly } from "../middleware/auth.mjs";

const router = express.Router();

// Exportamos una función que recibe el Modelo Usuario
export default (Usuario) => {

  // Middleware para autenticación
  const authMiddleware = auth(Usuario);

  // 🤴 Ruta GET /admin/profile - Obtener perfil (solo requiere auth)
  router.get("/profile", authMiddleware, (req, res) => {
    // La información del usuario ya está en req.user
    res.json({
      id: req.user.id,
      nombre: req.user.nombre,
      email: req.user.email,
      rol: req.user.rol,
      isAdmin: req.isAdmin
    });
  });

  // 👨‍👩‍👧‍👦 Ruta GET /admin/users - Obtener todos los usuarios (Requiere ser admin)
  router.get("/users", authMiddleware, adminOnly, async (req, res) => {
    try {
      // Buscar todos los usuarios, excluyendo la contraseña
      const users = await Usuario.findAll({
        attributes: { exclude: ['password'] },
        order: [['fechaRegistro', 'DESC']]
      });
      res.status(200).json(users);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      res.status(500).json({ msg: "Error al obtener la lista de usuarios." });
    }
  });

  // 📝 Ruta PATCH /admin/user/:id/role - Actualizar rol de usuario (Requiere ser admin)
  router.patch("/user/:id/role", authMiddleware, adminOnly, async (req, res) => {
    const userId = req.params.id;
    const { rol } = req.body;

    // Validación básica de rol
    if (!['admin', 'vendedor', 'comprador'].includes(rol)) {
      return res.status(400).json({ msg: "Rol no válido." });
    }

    try {
      // Actualizar el rol del usuario
      const [updatedRows] = await Usuario.update({ rol }, {
        where: { id: userId }
      });

      if (updatedRows === 0) {
        return res.status(404).json({ msg: "Usuario no encontrado." });
      }

      const updatedUser = await Usuario.findByPk(userId, { attributes: { exclude: ['password'] } });

      res.status(200).json({
        msg: `Rol del usuario ${userId} actualizado a ${rol}.`,
        user: updatedUser
      });
    } catch (error) {
      console.error("Error al actualizar rol de usuario:", error);
      res.status(500).json({ msg: "Error al actualizar el rol del usuario." });
    }
  });


  return router;
};