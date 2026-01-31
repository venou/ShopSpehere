import { Router } from "express";
import { isAuth, isAdmin } from "../middlewares/auth.js";
import { getAdminController } from "../controllers/admin.controllers.js";
const router = Router();

router.get("/", isAuth, isAdmin, getAdminController);

export default router;
