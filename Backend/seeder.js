import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

import Product from "./src/models/product.model.js";
import products from "./data/products.js";
import User from "./src/models/user.model.js";
import Cart from "./src/models/cart.model.js";

dotenv.config();

// connect to mongoDB
await mongoose.connect(process.env.MONGO_URL);

// Function to seed data
const seedData = async () => {
  try {
    // Clear existing data
    await Product.deleteMany();
    await User.deleteMany();
    await Cart.deleteMany();

    //  HASH PASSWORD HERE
    const hashedPassword = await bcrypt.hash("123456", 10);

    // Create a default admin user
    const createUser = await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: hashedPassword, 
      role: "admin",
      mobile: "987654321",
    });

    const userId = createUser._id;

    const sampleProducts = products.map((product) => ({
      ...product,
      user: userId,
    }));

    // Insert products
    await Product.insertMany(sampleProducts);

    console.log("✅ Data seeded successfully");
    process.exit();
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seedData();
