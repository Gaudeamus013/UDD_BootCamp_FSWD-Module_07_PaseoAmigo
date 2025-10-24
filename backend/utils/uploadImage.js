import { Readable } from "stream";
import cloudinary from "../config/cloudinary.js";
export const uploadBufferToCloudinary = (buffer, options = {}) => {
  return new Promise((resolve, reject) => {
    const upload = cloudinary.uploader.upload_stream(
      { folder: "paseoamigo", resource_type: "image", ...options },
      (error, result) => { if (error) return reject(error); resolve(result); }
    );
    const stream = Readable.from(buffer);
    stream.pipe(upload);
  });
};