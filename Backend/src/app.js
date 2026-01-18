import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/users.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
  }),
);
app.use(cookieParser());
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/profile", profileRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to ShopSphere API");
});

export default app;
