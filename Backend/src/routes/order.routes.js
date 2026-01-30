import { Router } from "express";
import isAuth from "../middlewares/isAuth.js";
import {
  getMyProductsController,
  orderDetailsController,
} from "../controllers/order.controllers.js";

const router = Router();

router.get("/my-orders", isAuth, getMyProductsController);
router.get("/:id", isAuth, orderDetailsController);

export default router;
