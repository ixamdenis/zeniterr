import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"]
  },
  email: {
    type: String,
    required: [true, "El email es obligatorio"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"]
  },
  rol: {
    type: String,
    enum: ["admin", "vendedor", "comprador"],
    default: "comprador"
  },
  edad: {
    type: Number,
    required: [true, "La edad es obligatoria"],
    min: [18, "Debe ser mayor de edad para registrarse"]
  },
  solicitudVendedor: {
    type: Boolean,
    default: false
  },
  vendedorAprobado: {
    type: Boolean,
    default: false
  },
  activo: {
    type: Boolean,
    default: true
  },
  fechaRegistro: {
    type: Date,
    default: Date.now
  }
});

const Usuario = mongoose.model("Usuario", usuarioSchema);
export default Usuario;
