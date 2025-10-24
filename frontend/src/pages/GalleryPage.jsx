import { useState } from "react";
import UploadImage from "../components/UploadImage";

const GalleryPage = () => {
  const [images, setImages] = useState([]);

  const handleImageUpload = (url) => {
    setImages((prev) => [url, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Galería Paseo Amigo 🐶</h1>
      <UploadImage onUpload={handleImageUpload} />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
        {images.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`Foto ${index}`}
            className="w-full h-48 object-cover rounded-lg shadow"
          />
        ))}
      </div>
    </div>
  );
};

export default GalleryPage;
