import isAuth from "../middlewares/isAuth.js";
import {
  createProducts,
  deleteProduct,
  getProductById,
  getProducts,
} from "../controllers/product.controllers.js";
import { Router } from "express";

const router = Router();

router.post("/", isAuth, createProducts);
router.delete("/:id", isAuth, deleteProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
export default router;
