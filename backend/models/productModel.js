import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String }
},{ timestamps: true });
export const Product = mongoose.model("Product", productSchema);
