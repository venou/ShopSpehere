import { Router } from "express";
import { isAdmin, isAuth } from "../middlewares/auth.js";
import { getAllProductsController } from "../controllers/adminProduct.controllers.js";

const router = Router();

router.get("/", isAuth, isAdmin, getAllProductsController);

export default router;
