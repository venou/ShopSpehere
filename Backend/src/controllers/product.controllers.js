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

export const deleteProduct = async (req, res) => {
  try {
    // Find the product by ID
    const product = await Products.findById(req.params.id);
    if (product) {
      // Remove the product from DB
      await product.deleteOne();
      res.json({ message: "Product Removed" });
    } else {
      res.status(httpstatus.NOT_FOUND).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(httpstatus.INTERNAL_SERVER_ERROR).send("Server Error");
  }
};
