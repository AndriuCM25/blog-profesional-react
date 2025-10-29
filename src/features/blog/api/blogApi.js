import axios from "axios";

// API simulada con JSONPlaceholder
export const blogApi = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const getPosts = () => blogApi.get("/posts");
export const getPostById = (id) => blogApi.get(`/posts/${id}`);
export const getUsers = () => blogApi.get("/users");

// Función para simular errores (opcional)
export const simulateError = () => {
  if (Math.random() < 0.2) {
    throw new Error("Falla simulada del servicio");
  }
};