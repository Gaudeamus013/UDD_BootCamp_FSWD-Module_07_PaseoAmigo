//import User from "../models/User.js";
import User from "../models/userModel.js";

export const me = async (req, res, next) => {
  try {
    const user = req.user ? await User.findById(req.user.id).select("-password") : null;
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }
    return res.status(200).json({ user });
  } catch (error) {
    console.error("❌ Error en userController.me:", error);
    next(error);
  }
};
