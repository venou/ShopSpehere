import { Router } from "express";
import isAuth from "../middlewares/isAuth.js";
import {
  checkoutSessions,
  updateCheckout,
} from "../controllers/checkout.controllers.js";

const router = Router();

router.post("/", isAuth, checkoutSessions);
router.put("/:id/pay", isAuth, updateCheckout);

export default router;
