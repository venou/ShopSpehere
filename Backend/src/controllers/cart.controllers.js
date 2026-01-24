import Product from "../models/product.model.js";
import Cart from "../models/cart.model.js";
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

    // If the cart exist, update it

    if (cart) {
      const productIndex = cart.products.findIndex(
        (p) =>
          p.productId.toString() === productId &&
          p.size === size &&
          p.color === color,
      );

      if (productIndex > -1) {
        // if the product already exist, update the quantity
        cart.products[productIndex].quantity += quantity;
      } else {
        // add new product
        cart.products.push({
          productId,
          name: product.name,
          image: product.images,
          price: product.price,
          size,
          color,
          quantity,
        });
      }
      //   Recalculate the total price
      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
      );
      await cart.save();
      return res.status(httpstatus.OK).json(cart);
    } else {
      // create a new cart for guest or user
      const newCart = await Cart.create({
        user: userId ? userId : undefined,
        guestId: guestId ? guestId : "guest" + new Date().getTime(),
        products: [
          {
            productId,
            name: product.name,
            image: product.images[0].url,
            price: product.price,
            size,
            color,
            quantity,
          },
        ],
        totalPrice: product.price * quantity,
      });
      return res.status(httpstatus.CREATED).json(newCart);
    }
  } catch (error) {
    console.error(error);
    res
      .status(httpstatus.INTERNAL_SERVER_ERROR)
      .json({ message: "server error" });
  }
};

export const updateQuantity = async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;
  try {
    let cart = await getCart(userId, guestId);
    if (!cart) {
      return res
        .status(httpstatus.NOT_FOUND)
        .json({ message: "cart not found" });
    }

    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.size === size &&
        p.color === color,
    );
    if (productIndex > -1) {
      // update quantity
      if (quantity > 0) {
        cart.products[productIndex].quantity = quantity;
      } else {
        cart.products.splice(productIndex, 1); // Remove product if quantity is 0
      }
      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity, 0
      );
      await cart.save();
      return res.status(httpstatus.OK).json(cart);
    } else {
      return res
        .status(httpstatus.NOT_FOUND)
        .json({ message: "Product not found in cart" });
    }
  } catch (error) {
    console.error(error );
  }
};
