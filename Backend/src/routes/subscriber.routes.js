import { Router } from "express";
import { newsLetterSubscribe } from "../controllers/subscriber.controllers.js";

const router = Router();

router.post("/subscribe", newsLetterSubscribe);

export default router;
