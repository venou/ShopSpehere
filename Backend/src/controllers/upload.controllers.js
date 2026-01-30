import httpStatus from "http-status";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ message: "No file uploaded" });
    }

    const result = await uploadToCloudinary(req.file.buffer, "uploads");

    return res.status(httpStatus.OK).json({
      imageUrl: result.secure_url,
    });
  } catch (error) {
    console.error("UPLOAD ERROR ->", error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Server Error",
      error: error.message,
    });
  }
};
