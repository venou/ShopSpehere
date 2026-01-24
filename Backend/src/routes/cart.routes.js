import { Router } from "express";
import {
  cart,
  deleteCart,
  getProductCart,
  updateQuantity,
} from "../controllers/cart.controllers.js";

const router = Router();

router.post("/", cart);
router.put("/", updateQuantity);
router.delete("/", deleteCart);
router.get("/", getProductCart);

export default router;
