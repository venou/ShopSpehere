import { Router } from "express";
import { cart } from "../controllers/cart.controllers.js";

const router = Router();

router.post("/", cart);

export default router;
