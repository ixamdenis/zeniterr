import express from "express";
import Usuario from "../models/Usuario.mjs";
import { verificarToken, permitirRoles } from "../middleware/auth.mjs";

console.log("✅ Rutas de administrador cargadas correctamente");

const router = express.Router();

/* ===========================
   🔹 Ver todos los usuarios (solo admin)
=========================== */
router.get("/usuarios", verificarToken, permitirRoles("admin"), async (req, res) => {
  try {
    const usuarios = await Usuario.find().select("-password");
    res.json(usuarios);
  } catch (err) {
    console.error("❌ Error en /usuarios:", err);
    res.status(500).json({ error: "Error al obtener usuarios.", detalle: err.message });
  }
});

/* ===========================
   🔹 Aprobar vendedor (con fallback de edad)
=========================== */
router.patch("/aprobar-vendedor/:id", verificarToken, permitirRoles("admin"), async (req, res) => {
  try {
    console.log("🟡 Intentando aprobar vendedor con ID:", req.params.id);

    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    // Si el usuario no tiene edad, se asigna temporalmente 18
    if (!usuario.edad) {
      console.log("⚠️ Usuario sin edad — asignando edad mínima por defecto (18).");
      usuario.edad = 18;
    }

    usuario.vendedorAprobado = true;
    usuario.solicitudVendedor = false;
    usuario.rol = "vendedor";
    await usuario.save();

    console.log("✅ Vendedor aprobado correctamente:", usuario.email);
    res.json({ mensaje: "Vendedor aprobado correctamente.", edad: usuario.edad });
  } catch (err) {
    console.error("❌ Error en /aprobar-vendedor:", err);
    res.status(500).json({
      error: "Error al aprobar vendedor.",
      detalle: err.message,
      stack: err.stack
    });
  }
});

/* ===========================
   🔹 Rechazar solicitud de vendedor
=========================== */
router.patch("/rechazar-vendedor/:id", verificarToken, permitirRoles("admin"), async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    usuario.vendedorAprobado = false;
    usuario.solicitudVendedor = false;
    usuario.rol = "comprador";
    await usuario.save();

    res.json({ mensaje: "Solicitud de vendedor rechazada." });
  } catch (err) {
    console.error("❌ Error en /rechazar-vendedor:", err);
    res.status(500).json({ error: "Error al rechazar solicitud de vendedor.", detalle: err.message });
  }
});

/* ===========================
   🔹 Cambiar rol de usuario
=========================== */
router.patch("/cambiar-rol/:id", verificarToken, permitirRoles("admin"), async (req, res) => {
  try {
    const { nuevoRol } = req.body;
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    if (!usuario.edad) {
      console.log("⚠️ Usuario sin edad — asignando edad mínima (18) antes de cambio de rol.");
      usuario.edad = 18;
    }

    usuario.rol = nuevoRol;
    await usuario.save();

    res.json({ mensaje: `Rol cambiado a ${nuevoRol}.` });
  } catch (err) {
    console.error("❌ Error en /cambiar-rol:", err);
    res.status(500).json({ error: "Error al cambiar el rol.", detalle: err.message });
  }
});

/* ===========================
   🔹 Activar o desactivar usuario
=========================== */
router.patch("/toggle-activo/:id", verificarToken, permitirRoles("admin"), async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    usuario.activo = !usuario.activo;
    await usuario.save();

    res.json({ mensaje: `Usuario ${usuario.activo ? "activado" : "desactivado"} correctamente.` });
  } catch (err) {
    console.error("❌ Error en /toggle-activo:", err);
    res.status(500).json({ error: "Error al modificar estado del usuario.", detalle: err.message });
  }
});

export default router;
