// ============================================================
// ☁️ Servicio Cloudinary – Paseo Amigo
// ============================================================
// Encargado de subir imágenes a Cloudinary y retornar la URL
// pública resultante. Usa la API Upload anónima (sin backend).
// ============================================================

import axios from "axios";

const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${
  import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
}/image/upload`;

const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export const uploadImageToCloudinary = async (file) => {
  if (!file) throw new Error("No se seleccionó ningún archivo");

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  try {
    const response = await axios.post(CLOUDINARY_URL, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.secure_url;
  } catch (error) {
    console.error("❌ Error al subir imagen a Cloudinary:", error);
    throw new Error("Error al subir imagen");
  }
};
