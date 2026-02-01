import { Router } from "express";
import { isAdmin, isAuth } from "../middlewares/auth.js";
import { getAllOrdersController, updateOrderStatus } from "../controllers/adminOrder.controllers.js";

const router = Router();

router.get("/", isAuth, isAdmin, getAllOrdersController);
router.put("/:id", isAuth, isAdmin,updateOrderStatus)

export default router;
