import { Router } from "express";
import {
  addOneProductToCart,
  resOneProductToCart,
} from "../controllers/shopping_cart.controllers.js";
import { validateToken } from "../middlewares/index.js";

const router = Router();

// /api/addProduct/:productId
// post para agregar 1 producto al carrito
router.post("/addProduct/:productId", validateToken, addOneProductToCart);

// /api/resProduct/:productId
// post para restar 1 producto al carrito
router.post("/resProduct/:productId", validateToken, resOneProductToCart);

export default router;
