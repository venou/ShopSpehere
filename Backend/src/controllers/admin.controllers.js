import User from "../models/user.model.js";
import httpstatus from "http-status";

export const getAdminController = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.error(error);
    res
      .status(httpstatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Server Error" });
  }
};

export const addNewUserController = async (req, res) => {
  const { name, email, password, mobile, role } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(httpstatus.BAD_REQUEST)
        .json({ message: "User already exist" });
    }
    user = new User({
      name,
      email,
      password,
      mobile,
      role: role || "customer",
    });
    await user.save();
    res
      .status(httpstatus.CREATED)
      .json({ message: "User Created Sucessfully" });
  } catch (error) {
    console.error(error);
    res
      .status(httpstatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Server Error" });
  }
};

export const updateUserController = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.role = req.body.role || user.role;
    }

    const updateUser = await user.save();
    res.json({ message: "User updated sucessfully", user: updateUser });
  } catch (error) {
    console.error(error);
    res
      .status(httpstatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Server Error" });
  }
};

export const deleteUserController = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      await user.deleteOne();
      res.json({ message: "User Deleted Sucessfully" });
    } else {
      res.status(httpstatus.NOT_FOUND).json({ message: "User Not Found" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(httpstatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Server Error" });
  }
};
