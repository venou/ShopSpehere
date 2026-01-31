import { Router } from "express";
import { isAuth } from "../middlewares/auth.js";
import {
  checkoutSessions,
  finalizeCheckout,
  updateCheckout,
} from "../controllers/checkout.controllers.js";

const router = Router();

router.post("/", isAuth, checkoutSessions);
router.put("/:id/pay", isAuth, updateCheckout);
router.post("/:id/finalize", isAuth, finalizeCheckout);
export default router;
