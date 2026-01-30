import Order from "../models/order.model.js";
import httpstatus from "http-status";

export const getMyProductsController = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.userId }).sort({
      createdAt: -1,
    }); // sort by most recent orders
    res.json(orders);
  } catch (error) {
    console.error(error);
    res
      .status(httpstatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Server Error" });
  }
};

export const orderDetailsController = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email",
    );

    if (!order) {
      return res
        .status(httpstatus.NOT_FOUND)
        .json({ message: "Order not found" });
    }

    // return the full order details
    res.json(order);
  } catch (error) {
    console.error(error);
    res
      .status(httpstatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Server Error" });
  }
};
