import { Router } from "express";
import isAuth from "../middlewares/isAuth.js";

const router = Router();

router.post("/", isAuth);

export default router;
