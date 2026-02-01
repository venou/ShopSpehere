import Order from "../models/order.model.js";
import httpstatus from "http-status";

export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "name email");
    res.json(orders);
  } catch (error) {
    console.error(error);
    res
      .status(httpstatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Server Error" });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.status = req.body.status || order.status;
      order.isDelivered =
        req.body.status === "Delivered" ? true : order.isDelivered;
      order.deliveredAt =
        req.body.status === "Delivered" ? Date.now() : order.deliveredAt;

      const updatedOrder = order.save();
      res.json(updatedOrder);
    } else {
      res.status(httpstatus.NOT_FOUND).json({ message: "Order Not Found" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(httpstatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Server Error" });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      await order.deleteOne();
      res.json({ message: "Order Removed" });
    } else {
      res.status(httpstatus.NOT_FOUND).json({ message: "Order Not Found" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(httpstatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Server Error" });
  }
};
