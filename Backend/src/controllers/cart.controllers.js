import Product from "../models/product.model";
import Cart from "../models/cart.model";
import httpstatus from "http-status";

// Helper function to get a cart by user Id or guest Id
const getCart = async (userId, guestId) => {
  if (userId) {
    return await Cart.findOne({ user: userId });
  } else if (guestId) {
    return await Cart.findOne({ guestId });
  }
  return null;
};

export const cart = async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product)
      return res
        .status(httpstatus.NOT_FOUND)
        .json({ message: "Product not FOund" });

    let cart = await getCart(userId, guestId);
  } catch (error) {}
};
