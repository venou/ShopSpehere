import express from "express";
import { upload } from "../middlewares/multer.js";
import { uploadImage } from "../controllers/upload.controllers.js";

const router = express.Router();

router.post("/", upload.single("image"), uploadImage);

export default router;
