import Product from "../models/product.model.js";
import httpstatus from "http-status";


// get all products (Admin Only)
export const getAllProductsController = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error(error);
    res
      .status(httpstatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Server Error" });
  }
};
