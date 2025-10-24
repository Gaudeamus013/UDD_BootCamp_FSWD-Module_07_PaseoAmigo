import { User } from "../models/userModel.js";
export const me = async (req, res, next) => {
  try { const user = await User.findById(req.user.id).select("-password"); res.json(user); }
  catch (err) { next(err); }
};