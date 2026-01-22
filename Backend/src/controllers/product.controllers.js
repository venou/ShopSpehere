import Product from "../models/product.model.js";
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

export const getProducts = async (req, res) => {
  try {
    const {
      collection,
      size,
      color,
      gender,
      minPrice,
      maxPrice,
      sortBy,
      search,
      category,
      material,
      brand,
      limit,
    } = req.query;
    let query = {};
    // Filter Logic
    if (collection && collection.toLocaleLowerCase() !== "all") {
      query.collections = collection;
    }
    if (category && category.toLocaleLowerCase() !== "all") {
      query.category = category;
    }
    if (material) {
      query.material = { $in: material.split(", ") };
    }
    if (brand) {
      query.brand = { $in: brand.split(", ") };
    }
    if (material) {
      query.material = { $in: material.split(", ") };
    }
    if (size) {
      query.sizes = { $in: size.split(", ") };
    }
    if (color) {
      query.color = { $in: [color] };
    }
    if (gender) {
      query.gender = gender;
    }
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // Sort Logic
    let sort = {};
    if (sortBy) {
      switch (sortBy) {
        case "priceAsc":
          sort = { price: 1 };
          break;
        case "priceDesc":
          sort = { price: -1 };
          break;
        case "popularity":
          sort = { rating: -1 };
          break;
        default:
          break;
      }
    }

    // Fetch Products and apply sorting and limit
    let products = await Products.find(query)
      .sort(sort)
      .limit(Number(limit) || 0);
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(httpstatus.INTERNAL_SERVER_ERROR).send("Server Error");
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(httpstatus.NOT_FOUND).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(httpstatus.INTERNAL_SERVER_ERROR);
  }
};

export const similarProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Products.findById(id);
    if (!product) {
      return res
        .status(httpstatus.NOT_FOUND)
        .json({ message: "Product not Found" });
    }
    const similarProducts = await Products.find({
      _id: { $ne: id },
      gender: product.gender,
      category: product.category,
    });
  } catch (error) {
    console.log(error);
  }
};
