import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario.mjs";

// ✅ Verifica el token
export const verificarToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      console.log("❌ No se envió Authorization header");
      return res.status(401).json({ error: "Token no proporcionado." });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("🔑 Token decodificado:", decoded);

    const usuario = await Usuario.findById(decoded.id);
    if (!usuario) {
      console.log("❌ Usuario no encontrado para el token");
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    req.usuario = usuario;
    console.log("✅ Usuario autenticado:", usuario.email, "| Rol:", usuario.rol);
    next();
  } catch (err) {
    console.error("⚠️ Error en verificarToken:", err.message);
    res.status(403).json({ error: "Token inválido o expirado." });
  }
};

// ✅ Verifica si el usuario tiene el rol requerido
export const permitirRoles = (...rolesPermitidos) => {
  return (req, res, next) => {
    console.log("🔒 Verificando rol:", req.usuario?.rol, "| Roles permitidos:", rolesPermitidos);
    if (!rolesPermitidos.includes(req.usuario.rol)) {
      return res.status(403).json({ error: "No tienes permiso para realizar esta acción." });
    }
    next();
  };
};
