import { Router } from "express";
import { signIn, signUp } from "../controllers/auth.controllers.js";

const router = Router();

router.route("/signIn").post(signIn);
router.route("/signUp").post(signUp);

export default router;
