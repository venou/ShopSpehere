import isAuth from "../middlewares/isAuth.js";
import { createProducts } from "../controllers/product.controllers.js";
import { Router } from "express";

const router = Router();

router.post("/", isAuth, createProducts);

export default router;
