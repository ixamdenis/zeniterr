import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config";

function Galerias() {
  const [galerias, setGalerias] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/galerias`)
      .then(res => setGalerias(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Galerías disponibles</h1>
      {galerias.length === 0 ? (
        <p>No hay galerías disponibles.</p>
      ) : (
        <ul>
          {galerias.map((g) => (
            <li key={g._id}>
              <h3>{g.titulo}</h3>
              <p>{g.descripcion}</p>
              <p><b>Precio:</b> ${g.precio}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Galerias;