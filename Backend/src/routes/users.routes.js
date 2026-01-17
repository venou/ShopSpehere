import { Router } from "express";
import { signIn, signUp, signOut } from "../controllers/auth.controllers.js";

const router = Router();

router.route("/signin").post(signIn);
router.route("/signup").post(signUp);
router.route("/signout").post(signOut);

export default router;
