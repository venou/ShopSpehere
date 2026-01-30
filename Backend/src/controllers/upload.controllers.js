import httpStatus from "http-status";
import { uploadToCloudinary } from "../utils/cloudinary.js";

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ message: "No file uploaded" });
    }

    const result = await uploadToCloudinary(req.file.buffer, "orders");

    res.status(httpStatus.OK).json({
      imageUrl: result.secure_url,
    });
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Server Error" });
  }
};
