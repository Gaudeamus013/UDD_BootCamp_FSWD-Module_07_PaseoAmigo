import { Router } from "express";
import { listProducts, createProduct } from "../controllers/productController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = Router();
router.get("/", listProducts);
router.post("/", protect, createProduct);
export default router;