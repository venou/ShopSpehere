import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import httpstatus from "http-status";
import crypto from "crypto";

export const signUp = async (req, res) => {
  try {
    const { firstname, lastname, email, password, mobile, username } = req.body;
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(httpstatus.FOUND)
        .json({ message: "User already exist" });
    }
    if (password.length < 8) {
      return res
        .status(httpstatus.BAD_REQUEST)
        .json({ message: "Password must be at least 8 characters" });
    }

    const hashedPasswords = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstname,
      lastname,
      email,
      mobile,
      username,
      password: hashedPasswords,
    });
    await newUser.save();
    res.status(httpstatus.CREATED).json({ message: "User Created" });
  } catch (error) {
    res.json({ message: `Something went wrong ${error}` });
  }
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Please Provide" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(httpstatus.NOT_FOUND)
        .json({ message: "User Not Found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(httpstatus.UNAUTHORIZED)
        .json({ message: "Invalid credentials" });
    }

    const token = crypto.randomBytes(20).toString("hex");
    user.token = token;
    await user.save();

    return res.status(httpstatus.OK).json({ token });
  } catch (error) {
    return res
      .status(httpstatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};
