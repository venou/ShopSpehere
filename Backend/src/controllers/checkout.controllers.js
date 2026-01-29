import CheckOut from "../models/Checkout.model.js";
import Product from "../models/product.model.js";
import Cart from "../models/cart.model.js";
import Order from "../models/order.model.js";
import httpsstatus from "http-status";

export const checkoutSessions = async (req, res) => {
  const { checkoutItems, shippingAddress, paymentMethod, totalPrice } =
    req.body;
  if (!checkoutItems || checkoutItems.length === 0) {
    return res
      .status(httpsstatus.BAD_REQUEST)
      .json({ message: "no items in checkout" });
  }
  try {
    // create a new checkout session
    const newCheckout = await CheckOut.create({
      user: req.userId,
      checkoutItems: checkoutItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      paymentStatus: "pending",
      isPaid: false,
    });
    console.log(`checkout created for user: ${req.userId}`);
    res.status(httpsstatus.CREATED).json(newCheckout);
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res
      .status(httpsstatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Server Error" });
  }
};

export const updateCheckout = async (req, res) => {
  const { paymentStatus, paymentDetails } = req.body;

  if (!req.body || !paymentStatus) {
    return res.status(400).json({ message: "Invalid request body" });
  }

  try {
    const checkout = await CheckOut.findById(req.params.id);

    if (!checkout) {
      return res.status(404).json({ message: "Checkout not found" });
    }

    if (checkout.user.toString() !== req.userId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    if (checkout.isPaid) {
      return res.status(400).json({ message: "Checkout already paid" });
    }

    if (paymentStatus.toLowerCase() !== "paid") {
      return res.status(400).json({ message: "Invalid payment status" });
    }

    if (!paymentDetails || !paymentDetails.id) {
      return res.status(400).json({ message: "Payment details missing" });
    }

    checkout.isPaid = true;
    checkout.paymentStatus = "paid";
    checkout.paymentDetails = paymentDetails;
    checkout.paidAt = Date.now();

    await checkout.save();

    res.status(200).json(checkout);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const finalizeCheckout = async (req, res) => {
  try {
    const checkout = await CheckOut.findById(req.params.id);
    if (!checkout) {
      return res
        .status(httpsstatus.NOT_FOUND)
        .json({ message: "checkout not found" });
    }

    if (checkout.isPaid && !checkout.isFinalized) {
      // create final order based on the checkout details
      const finalOrder = await Order.create({
        user: checkout.user,
        orderItems: checkout.checkoutItems,
        shippingAddress: checkout.shippingAddress,
        paymentMethod: checkout.paymentMethod,
        totalPrice: checkout.totalPrice,
        isPaid: true,
        paidAt: checkout.paidAt,
        isDelivered: false,
        paymentStatus: "paid",
        paymentDetails: checkout.paymentDetails,
      });
      //   Mark the checkout as finalize
      checkout.isFinalized = true;
      checkout.finalizedAt = Date.now();
      await checkout.save();
      //   Delete the cart with associated user
      await Cart.findOneAndDelete({ user: checkout.user });
      res.status(httpsstatus.CREATED).json(finalOrder);
    } else if (checkout.isFinalized) {
      res
        .status(httpsstatus.BAD_REQUEST)
        .json({ message: "checkout already finalized" });
    } else {
      res
        .status(httpsstatus.BAD_REQUEST)
        .json({ message: "checkout is not paid" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(httpsstatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Server Error" });
  }
};
