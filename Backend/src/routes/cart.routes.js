import { Router } from "express";
import {
  cart,
  deleteCart,
  updateQuantity,
} from "../controllers/cart.controllers.js";

const router = Router();

router.post("/", cart);
router.put("/", updateQuantity);
router.delete("/", deleteCart);

export default router;
