import isAuth from "../middlewares/isAuth.js";
import {
  createProducts,
  deleteProduct,
} from "../controllers/product.controllers.js";
import { Router } from "express";

const router = Router();

router.post("/", isAuth, createProducts);
router.delete("/:id", isAuth, deleteProduct);

export default router;
