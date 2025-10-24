// ============================================================
// 📸 Componente: UploadImage
// ============================================================
// Permite seleccionar y subir imágenes a Cloudinary. Muestra
// vista previa, botón de carga y confirmación visual.
// ============================================================

import { useState } from "react";
import { uploadImageToCloudinary } from "../services/cloudinaryService";

const UploadImage = ({ onUpload }) => {
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    const file = document.getElementById("fileInput").files[0];
    if (!file) {
      setError("Selecciona un archivo antes de subir.");
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const url = await uploadImageToCloudinary(file);
      setUploading(false);
      if (onUpload) onUpload(url);
      alert("✅ Imagen subida correctamente");
    } catch (err) {
      setUploading(false);
      setError(err.message);
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md flex flex-col items-center space-y-4">
      <h2 className="text-xl font-bold text-gray-700">Subir Imagen 🐾</h2>
      <input
        id="fileInput"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="block text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />

      {preview && (
        <img
          src={preview}
          alt="Vista previa"
          className="w-48 h-48 object-cover rounded-lg shadow-sm"
        />
      )}

      <button
        onClick={handleUpload}
        disabled={uploading}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md disabled:opacity-50"
      >
        {uploading ? "Subiendo..." : "Subir Imagen"}
      </button>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default UploadImage;
