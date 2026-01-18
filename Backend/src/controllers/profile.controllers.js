import User from "../models/user.model.js";
import httpstatus from "http-status";

export const getCurrentProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "profile not found" });
    }
    return res.status(httpstatus.OK).json(user);
  } catch (error) {
    return res
      .status(httpstatus[500])
      .json({ message: "Internal server error" });
  }
};
