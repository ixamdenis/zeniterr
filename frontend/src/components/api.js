import axios from "axios";

// Cambiá la URL si tu backend corre en otro puerto o dominio
const API = axios.create({
  baseURL: "http://localhost:5000"
});

// Interceptor para enviar el token automáticamente si existe
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
