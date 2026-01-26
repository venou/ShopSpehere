import { Router } from "express";
import {
  cart,
  deleteCart,
  getProductCart,
  mergeGuestIntoUser,
  updateQuantity,
} from "../controllers/cart.controllers.js";
import isAuth from "../middlewares/isAuth.js";
const router = Router();

router.post("/", cart);
router.put("/", updateQuantity);
router.delete("/", deleteCart);
router.get("/", getProductCart);
router.post("/merge", isAuth, mergeGuestIntoUser);


export default router;
