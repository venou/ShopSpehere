import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import httpstatus from "http-status";
import gentoken from "../utils/token.js";

export const signUp = async (req, res) => {
  try {
    const { name, email, password, mobile } = req.body;

    if (!password || password.length < 8) {
      return res.status(400).json({ message: "Password too short" });
    }

    if (!mobile || String(mobile).length < 10) {
      return res.status(400).json({ message: "Invalid mobile number" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      mobile,
      password: hashedPassword,
    });

    const token = gentoken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Signup failed" });
  }
};


export const signIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = gentoken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Signin failed" });
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
