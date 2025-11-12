// Archivo: backend/middleware/auth.mjs

import jwt from "jsonwebtoken";

// Exportamos una función que recibe el Modelo Usuario
export const auth = (Usuario) => async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔎 Buscamos al usuario por su ID (Primary Key)
    // Usamos decoded.id porque PostgreSQL usa IDs numéricos (INTEGER)
    const user = await Usuario.findByPk(decoded.id);

    if (!user) {
      throw new Error("Usuario no encontrado.");
    }

    req.token = token;
    // Adjuntamos el objeto Sequelize del usuario a la request
    req.user = user;

    // Verificamos si es administrador (para rutas admin)
    req.isAdmin = user.rol === "admin";

    next();
  } catch (error) {
    res.status(401).send({ error: "Por favor, autentíquese." });
  }
};

// Middleware para restringir acceso solo a administradores
export const adminOnly = (req, res, next) => {
  if (req.isAdmin) {
    next();
  } else {
    res.status(403).send({ error: "Acceso denegado. Solo administradores." });
  }
};