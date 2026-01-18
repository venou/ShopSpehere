import { Router } from "express";
import { getCurrentProfile } from "../controllers/profile.controllers.js";
import isAuth from "../middlewares/isAuth.js";

const router = Router();

router.get("/profile", isAuth, getCurrentProfile);

export default router;
