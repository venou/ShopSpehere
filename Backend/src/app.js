import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/users.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1/user", userRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to ShopSphere API");
});

export default app;
