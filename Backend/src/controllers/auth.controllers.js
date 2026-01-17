import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import httpstatus from "http-status";
import gentoken from "../utils/token.js";

export const signUp = async (req, res) => {
  try {
    const { name, email, password, mobile } = req.body;
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
    if (mobile.length < 10) {
      return res
        .status(httpstatus.BAD_REQUEST)
        .json({ message: "Number must be atleast 10 digits" });
    }
    const hashedPasswords = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      mobile,
      password: hashedPasswords,
    });

    const token = await gentoken(newUser._id);
    res.cookie("token", token, {
      secure: false,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res.status(httpstatus.OK).json(newUser);
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

    const token = await gentoken(user._id);
    res.cookie("token", token, {
      secure: false,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res.status(httpstatus.OK).json(user);
  } catch (error) {
    return res.status(500).json(`Sign In error ${error}`);
  }
};

export const signOut = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(httpstatus.OK).json({ message: "Logout Sucessfully" });
  } catch (error) {
    return res.status(500).json(`logout error ${error}`);
  }
};
