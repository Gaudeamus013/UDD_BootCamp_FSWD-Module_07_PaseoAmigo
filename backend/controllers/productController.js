import { Product } from "../models/productModel.js";
export const listProducts = async (req, res, next) => {
  try {
    const items = await Product.find({}).sort({ createdAt: -1 });
    res.json(items);
  } catch (err) { next(err); }
};
export const createProduct = async (req, res, next) => {
  try {
    const { name, description, duration, price, imageUrl } = req.body;
    if (!name || !description || !duration || !price) return res.status(400).json({ message: "Faltan campos" });
    const exists = await Product.findOne({ name });
    if (exists) return res.status(409).json({ message: "El producto ya existe" });
    const created = await Product.create({ name, description, duration, price, imageUrl });
    res.status(201).json(created);
  } catch (err) { next(err); }
};