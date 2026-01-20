import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./src/models/product.model.js";
import products from "./data/products.js";
import User from "./src/models/user.model.js";

dotenv.config();

// connect to mongoDB
mongoose.connect(process.env.MONGO_URL);

// Function to seed data

const seedData = async () => {
  try {
    // Clear existing data
    await Product.deleteMany();
    await User.deleteMany();

    // Create a default admin user
    const createUser = await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: "123456",
      role: "admin",
      mobile: "987654321",
    });

    const UserID = createUser._id;
    const sampleProducts = products.map((Product) => {
      return { ...Product, user: UserID };
    });

    // Insert the products in database
    await Product.insertMany(sampleProducts);
    console.log("Product data seeded sucessfully");
    process.exit();
  } catch (error) {
    console.log("Error seeding the data:", error);
    process.exit(1);
  }
};

seedData();
