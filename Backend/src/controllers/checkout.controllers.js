import CheckOut from "../models/Checkout.model.js";
import Product from "../models/product.model.js";
import Cart from "../models/cart.model.js";
import Order from "../models/order.model.js";
import httpsstatus from "http-status";

const checkoutSessions = async (req, res) => {
  const { checkoutItems, shippingAddress, paymentMethod, totalPrice } =
    req.body;
  if (!checkoutItems || checkoutItems.length === 0) {
    return res
      .Status(httpsstatus.BAD_REQUEST)
      .json({ message: "no items in checkout" });
  }
  try {
    // create a new checkout session
    const newCheckout = await CheckOut.create({
      user: req.user._id,
      checkoutItems: checkoutItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      paymentStatus: "pending",
      isPaid: false,
    });
    console.log(`checkout created for user: ${req.user._id}`);
    res.status(httpsstatus.CREATED).json(newCheckout);
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res
      .status(httpsstatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Server Error" });
  }
};
