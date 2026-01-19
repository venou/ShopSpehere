import Products from "../models/product.model.js";
import httpstatus from "http-status";

export const getProducts = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
    } = req.body;
  } catch (error) {}
};
