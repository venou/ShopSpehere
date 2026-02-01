import express from "express";
import cors from "cors";
import userRoutes from "./routes/users.routes.js";
import productRoutes from "./routes/products.routes.js";
import cookieParser from "cookie-parser";
import cartRoutes from "./routes/cart.routes.js";
import checkoutRoutes from "./routes/checkout.routes.js";
import orderRoutes from "./routes/order.routes.js";
import uploadRoutes from "./routes/upload.routes.js";
import subscriberRoutes from "./routes/subscriber.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import adminProductRoutes from "./routes/adminProduct.routes.js";
import adminOrdertRoutes from "./routes/adminOrder.routes.js";

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
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/checkout", checkoutRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/upload", uploadRoutes);
app.use("/api/v1", subscriberRoutes);

// Admin
app.use("/api/v1/admin/users", adminRoutes);
app.use("/api/v1/admin/products", adminProductRoutes);
app.use("/api/v1/admin/orders", adminOrdertRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to ShopSphere API");
});

export default app;
