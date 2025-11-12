// Archivo: backend/routes/galeriaRoutes.mjs

import express from "express";
import { auth } from "../middleware/auth.mjs"; // Importamos el middleware de autenticación

const router = express.Router();

// Exportamos una función que recibe los Modelos
export default (Galeria, Usuario) => {

  // Middleware para autenticar la ruta
  const authMiddleware = auth(Usuario);

  // 🖼️ Ruta GET /galerias - Obtener todas las galerías (o las publicadas)
  router.get("/", async (req, res) => {
    try {
      // Dejamos que cualquier persona vea solo las galerías publicadas
      const galerias = await Galeria.findAll({
        where: { publicada: true },
        // Incluimos la información del creador, seleccionando solo el nombre y email
        include: {
          model: Usuario,
          as: 'creador',
          attributes: ['nombre', 'email', 'rol']
        },
        order: [['fechaCreacion', 'DESC']]
      });

      res.status(200).json(galerias);
    } catch (error) {
      console.error("Error al obtener galerías:", error);
      res.status(500).json({ msg: "Error al obtener las galerías." });
    }
  });

  // 🖼️ Ruta GET /galerias/:id - Obtener una galería por ID
  router.get("/:id", async (req, res) => {
    try {
      const galeria = await Galeria.findByPk(req.params.id, {
        include: {
          model: Usuario,
          as: 'creador',
          attributes: ['nombre', 'email', 'rol']
        }
      });

      if (!galeria) {
        return res.status(404).json({ msg: "Galería no encontrada." });
      }
      // Si la galería no está publicada y el usuario no es el creador/admin, denegar acceso
      if (!galeria.publicada && (!req.user || (req.user.id !== galeria.creadorId && req.user.rol !== 'admin'))) {
        // Si el usuario no está autenticado, no debería pasar por este chequeo, pero por seguridad:
        return res.status(404).json({ msg: "Galería no encontrada o no publicada." });
      }

      res.status(200).json(galeria);
    } catch (error) {
      console.error("Error al obtener galería por ID:", error);
      res.status(500).json({ msg: "Error al obtener la galería." });
    }
  });


  // 🖼️ Ruta POST /galerias - Crear una nueva galería (Requiere autenticación)
  router.post("/", authMiddleware, async (req, res) => {
    // ⚠️ RECUERDA: La lógica de subida de imágenes debe ir aquí (ej. Cloudinary)
    // Por ahora, asumimos que `imagenes` y `videos` son arrays de URLs

    const { titulo, descripcion, precio, imagenes, videos } = req.body;

    // Verificación de rol: solo vendedores o administradores pueden crear
    if (req.user.rol === 'comprador') {
      return res.status(403).json({ msg: "Acceso denegado. Solo vendedores o administradores pueden subir obras." });
    }

    try {
      // 1. Crear nueva galería. Sequelize automáticamente maneja el ID y la relación
      const newGaleria = await Galeria.create({
        titulo,
        descripcion,
        imagenes: imagenes || [],
        videos: videos || [],
        precio,
        creadorId: req.user.id, // ID del usuario autenticado
        publicada: req.user.rol === 'admin' ? true : false, // Publicada inmediatamente si es admin, sino requiere revisión
      });

      res.status(201).json({
        msg: "Galería creada con éxito. Pendiente de publicación.",
        galeria: newGaleria
      });
    } catch (error) {
      console.error("Error al crear galería:", error);
      res.status(500).json({ msg: "Error al crear la galería." });
    }
  });


  // 🖼️ Ruta PATCH /galerias/:id - Actualizar una galería (Requiere autenticación y ser creador/admin)
  router.patch("/:id", authMiddleware, async (req, res) => {
    const { titulo, descripcion, precio, imagenes, videos, promocionActiva, precioPromocional } = req.body;
    const updateData = { titulo, descripcion, precio, imagenes, videos, promocionActiva, precioPromocional };
    const galeriaId = req.params.id;

    try {
      // 1. Buscar la galería
      const galeria = await Galeria.findByPk(galeriaId);

      if (!galeria) {
        return res.status(404).json({ msg: "Galería no encontrada." });
      }

      // 2. Verificar permisos
      // Solo el creador O un administrador pueden modificar
      if (galeria.creadorId !== req.user.id && req.user.rol !== 'admin') {
        return res.status(403).json({ msg: "No tienes permiso para editar esta galería." });
      }

      // 3. Actualizar la galería con Sequelize
      // Sequilize usa el método update con un objeto de datos y un objeto 'where'
      await Galeria.update(updateData, { where: { id: galeriaId } });

      // 4. Obtener la versión actualizada
      const updatedGaleria = await Galeria.findByPk(galeriaId);


      res.status(200).json({
        msg: "Galería actualizada.",
        galeria: updatedGaleria
      });
    } catch (error) {
      console.error("Error al actualizar galería:", error);
      res.status(500).json({ msg: "Error al actualizar la galería." });
    }
  });


  // 🖼️ Ruta DELETE /galerias/:id - Eliminar una galería (Requiere autenticación y ser creador/admin)
  router.delete("/:id", authMiddleware, async (req, res) => {
    const galeriaId = req.params.id;

    try {
      // 1. Buscar la galería
      const galeria = await Galeria.findByPk(galeriaId);

      if (!galeria) {
        return res.status(404).json({ msg: "Galería no encontrada." });
      }

      // 2. Verificar permisos
      // Solo el creador O un administrador pueden eliminar
      if (galeria.creadorId !== req.user.id && req.user.rol !== 'admin') {
        return res.status(403).json({ msg: "No tienes permiso para eliminar esta galería." });
      }

      // 3. Eliminar la galería con Sequelize
      await Galeria.destroy({ where: { id: galeriaId } });

      res.status(200).json({ msg: "Galería eliminada con éxito." });
    } catch (error) {
      console.error("Error al eliminar galería:", error);
      res.status(500).json({ msg: "Error al eliminar la galería." });
    }
  });

  return router;
};