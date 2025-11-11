import { useState } from "react";
import axios from "axios";
import { API_URL } from "../config";

function FormGaleria({ onGaleriaCreada }) {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagenes, setImagenes] = useState("");
  const [precio, setPrecio] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const nuevaGaleria = {
        titulo,
        descripcion,
        imagenes: imagenes.split(",").map((url) => url.trim()),
        precio: parseFloat(precio),
      };

      const res = await axios.post(`${API_URL}/galerias`, nuevaGaleria);
      alert("Galería creada con éxito 🎉");
      onGaleriaCreada(res.data);

      // Limpiar el formulario
      setTitulo("");
      setDescripcion("");
      setImagenes("");
      setPrecio("");
    } catch (err) {
      console.error(err);
      alert("Hubo un error al crear la galería");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: "1rem", marginBottom: "2rem" }}>
      <h2>Crear nueva galería</h2>
      <div>
        <label>Título:</label><br />
        <input value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
      </div>
      <div>
        <label>Descripción:</label><br />
        <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
      </div>
      <div>
        <label>URLs de imágenes (separadas por coma):</label><br />
        <input value={imagenes} onChange={(e) => setImagenes(e.target.value)} />
      </div>
      <div>
        <label>Precio:</label><br />
        <input type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} required />
      </div>
      <button type="submit">Guardar galería</button>
    </form>
  );
}

export default FormGaleria;