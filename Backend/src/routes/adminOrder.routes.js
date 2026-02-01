import { Router } from "express";
import { isAdmin, isAuth } from "../middlewares/auth.js";
import {
  deleteOrder,
  getAllOrdersController,
  updateOrderStatus,
} from "../controllers/adminOrder.controllers.js";

const router = Router();

router.get("/", isAuth, isAdmin, getAllOrdersController);
router.put("/:id", isAuth, isAdmin, updateOrderStatus);
router.delete("/:id", isAuth, isAdmin, deleteOrder);

export default router;
