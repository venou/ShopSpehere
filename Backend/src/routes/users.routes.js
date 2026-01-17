import { Router } from "express";
import { signIn, signUp, signOut } from "../controllers/auth.controllers.js";

const router = Router();

router.route("/signIn").post(signIn);
router.route("/signUp").post(signUp);
router.route("/signOut").post(signOut);

export default router;
