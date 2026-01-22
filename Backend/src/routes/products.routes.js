import isAuth from "../middlewares/isAuth.js";
import {
  createProducts,
  deleteProduct,
  getProductById,
  getProducts,
  newArrivals,
  similarProduct,
  topRatedProduct,
} from "../controllers/product.controllers.js";
import { Router } from "express";

const router = Router();

// Static > Semi-dynamic > Dynamic

router.post("/", isAuth, createProducts);
router.delete("/:id", isAuth, deleteProduct);

router.get("/best-seller", topRatedProduct);
router.get("/new-arrivals", newArrivals);
router.get("/similar/:id", similarProduct);

router.get("/", getProducts);
router.get("/:id", getProductById);

export default router;
