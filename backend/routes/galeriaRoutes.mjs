import express from "express";
import Galeria from "../models/Galeria.mjs";
import { verificarToken, permitirRoles } from "../middleware/auth.mjs";
import Usuario from "../models/Usuario.mjs";


const router = express.Router();

// Obtener todas las galerías
router.get("/", async (req, res) => {
  try {
    const galerias = await Galeria.find();
    res.json(galerias);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear una nueva galería (solo vendedor aprobado o admin)
router.post("/", verificarToken, permitirRoles("vendedor", "admin"), async (req, res) => {
  const { titulo, descripcion, imagenes, precio, precioPromocional, promocionActiva } = req.body;

  try {
    const usuario = await Usuario.findById(req.usuario.id);

    // Verificar aprobación si es vendedor
    if (usuario.rol === "vendedor" && !usuario.vendedorAprobado) {
      return res.status(403).json({ error: "Tu cuenta de vendedor aún no ha sido aprobada por un administrador." });
    }

    const nuevaGaleria = new Galeria({
      titulo,
      descripcion,
      imagenes,
      precio,
      precioPromocional,
      promocionActiva,
      creador: req.usuario.id,
    });

    const guardada = await nuevaGaleria.save();
    res.status(201).json(guardada);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


export default router;