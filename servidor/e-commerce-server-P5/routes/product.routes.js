import { Router } from "express";
import {
  addProduct,
  deleteIdProduct,
  editProduct,
  getIdProduct,
  getProducts,
} from "../controllers/product.controllers.js";
import { validateToken } from "../middlewares/index.js";

const router = Router();
// /api/products
// devuelve la lista de productos
router.get("/products", getProducts);

// /api/products/:productId
// devuelve 1 producto segun id
router.get("/products/:productId", getIdProduct);

// /api/products/:productId
// delete producto segun id
router.delete("/products/:productId", validateToken, deleteIdProduct);

// /api/products/addProduct
// post producto agrega el producto a la db
router.post("/products/addProduct", validateToken, addProduct);

// /api/products/:productId
// post producto edita segun el id del producto
router.put("/products/editProduct/:productId", validateToken, editProduct);

export default router;
