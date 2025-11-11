import { useState } from "react";
import API from "./api";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    edad: "",
    rol: "comprador",
  });
  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/usuarios/register", formData);
      setMensaje(res.data.mensaje);
    } catch (err) {
      setMensaje(err.response?.data?.error || "Error al registrar usuario");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "2rem auto", textAlign: "center" }}>
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre completo"
          value={formData.nombre}
          onChange={handleChange}
          required
        /><br />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        /><br />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          required
        /><br />
        <input
          type="number"
          name="edad"
          placeholder="Edad"
          value={formData.edad}
          onChange={handleChange}
          required
        /><br />
        <select name="rol" value={formData.rol} onChange={handleChange}>
          <option value="comprador">Comprador</option>
          <option value="vendedor">Vendedor</option>
        </select><br />
        <button type="submit">Registrarme</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}
