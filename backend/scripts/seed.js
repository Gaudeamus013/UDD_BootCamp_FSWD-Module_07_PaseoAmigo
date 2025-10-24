import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { connectDB } from "../config/db.js";
import { User } from "../models/userModel.js";
import { Product } from "../models/productModel.js";

dotenv.config();
await connectDB();

const users = [
  { name: "Reynaldo Añasco", email: "admin@paseoamigo.cl", password: "Admin1234*", role: "admin" },
  { name: "Javiera Chiffelle", email: "javiera@paseoamigo.cl", password: "Cliente2025*", role: "user" }
];

const products = [
  { name: "Paseo corto (30 min)", description: "Paseo individual ideal para perros pequeños o de baja energía.", duration: 30, price: 7000, imageUrl: "https://res.cloudinary.com/demo/image/upload/v1700000000/dog_short_walk.jpg" },
  { name: "Paseo largo (60 min)", description: "Paseo completo con juego y socialización. Perfecto para perros activos.", duration: 60, price: 12000, imageUrl: "https://res.cloudinary.com/demo/image/upload/v1700000000/dog_long_walk.jpg" },
  { name: "Paseo doble (2 perros)", description: "Servicio para dos perros del mismo hogar, atención simultánea y rutas amplias.", duration: 60, price: 16000, imageUrl: "https://res.cloudinary.com/demo/image/upload/v1700000000/dog_double_walk.jpg" }
];

for (const u of users) {
  const exists = await User.findOne({ email: u.email });
  if (!exists) {
    const hashed = await bcrypt.hash(u.password, 10);
    await User.create({ ...u, password: hashed });
    console.log(`👤 Usuario creado: ${u.email}`);
  }
}

for (const p of products) {
  const exists = await Product.findOne({ name: p.name });
  if (!exists) {
    await Product.create(p);
    console.log(`🦴 Producto creado: ${p.name}`);
  }
}

console.log("✅ Seed completado sin duplicados.");
process.exit(0);
