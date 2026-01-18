import { Router } from "express";
import { signIn, signUp, signOut } from "../controllers/auth.controllers.js";
import isAuth from "../middlewares/isAuth.js";
import { getCurrentProfile } from "../controllers/profile.controllers.js";

const router = Router();

router.route("/signin").post(signIn);
router.route("/signup").post(signUp);
router.route("/signout").post(signOut);
router.get("/profile", isAuth, getCurrentProfile);

export default router;
