import apiClient from "./axiosClient";

export const testConnection = async () => {
  try {
    const response = await apiClient.get("/api/health"); // endpoint de prueba
    console.log("✅ Conexión exitosa con el backend:", response.data);
  } catch (error) {
    console.error("❌ Error de conexión con el backend:", error);
  }
};
