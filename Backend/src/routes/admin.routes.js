import { Router } from "express";
import { isAuth, isAdmin } from "../middlewares/auth.js";
import {
  addNewUserController,
  getAdminController,
} from "../controllers/admin.controllers.js";
const router = Router();

router.get("/", isAuth, isAdmin, getAdminController);
router.post("/", isAuth, isAdmin, addNewUserController);

export default router;
    