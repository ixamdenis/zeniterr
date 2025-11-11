import mongoose from "mongoose";

const galeriaSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descripcion: { type: String },
  imagenes: [{ type: String }],
  videos: [{ type: String }],
  precio: { type: Number, required: true },
  precioPromocional: { type: Number },
  promocionActiva: { type: Boolean, default: false },
  creador: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
  fechaCreacion: { type: Date, default: Date.now },
  publicada: { type: Boolean, default: false } // se publicará luego de revisión
});

export default mongoose.model("Galeria", galeriaSchema);
