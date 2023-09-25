import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
//Routes
import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import shoppingCartRoutes from "./routes/shopping_cart.routes.js";
import cors from "cors";

//Initializations
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

//Middlewares

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api/cart", shoppingCartRoutes);
app.use("/api", adminRoutes);
app.use("/api", productRoutes);
app.use("/api", userRoutes);

export default app;
