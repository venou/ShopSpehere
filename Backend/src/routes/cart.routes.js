import { Router } from "express";
import { cart, updateQuantity } from "../controllers/cart.controllers.js";

const router = Router();

router.post("/", cart);
router.put("/", updateQuantity);

export default router;
