import { Router } from "express";
import { isAuth, isAdmin } from "../middlewares/auth.js";
import {
  addNewUserController,
  deleteUserController,
  getAdminController,
  updateUserController,
} from "../controllers/admin.controllers.js";
const router = Router();

router.get("/", isAuth, isAdmin, getAdminController);
router.post("/", isAuth, isAdmin, addNewUserController);
router.put("/:id", isAuth, isAdmin, updateUserController);
router.delete("/:id", isAuth, isAdmin, deleteUserController);

export default router;
