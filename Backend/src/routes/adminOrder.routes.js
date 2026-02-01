import { Router } from "express";
import { isAdmin, isAuth } from "../middlewares/auth.js";
import { getAllOrdersController } from "../controllers/adminOrder.controllers.js";

const router = Router();

router.get("/", isAuth, isAdmin, getAllOrdersController);

export default router;
