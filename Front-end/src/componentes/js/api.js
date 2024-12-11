import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/material",
});

export const getMateriais = (termo = '') => api.get("/", { params: { termo } });
export const getMaterialById = (id) => api.get(`/${id}`);
export const addMaterial = (material) => api.post("/", material);
export const updateMaterial = (id, material) => api.put(`/${id}`, material);
export const deleteMaterial = (id) => api.delete(`/${id}`);

export default api;
