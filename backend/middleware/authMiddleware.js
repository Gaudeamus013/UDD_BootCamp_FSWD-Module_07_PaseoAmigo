import { verifyAccessToken } from "../utils/jwt.js";
import User from "../models/userModel.js";

export const protect = async (req, res, next) => {
  try {
    const auth = req.headers.authorization || "";
    const token = auth.startsWith("Bearer ") ? auth.split(" ")[1] : null;
    if (!token) return res.status(401).json({ message: "No autorizado" });

    const decoded = verifyAccessToken(token);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ message: "Usuario no encontrado" });

    req.user = user;
    next();
  } catch (e) {
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
};
