import Products from "../models/product.model.js";
import httpstatus from "http-status";

export const createProducts = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
    } = req.body;

    const product = new Products({
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
      user: req.body.user, // Reference to the admin user who created it
    });

    const createProduct = await product.save();
    res.status(httpstatus.OK).json(createProduct);
  } catch (error) {
    res.status(500).send({ message: "Server Error" });
  }
};
