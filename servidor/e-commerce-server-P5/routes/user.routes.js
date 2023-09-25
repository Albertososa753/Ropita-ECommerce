import { Router } from "express";
import {
  register,
  login,
  logout,
  editUser,
  getUserData,
} from "../controllers/user.controllers.js";
import { validateToken } from "../middlewares/index.js";

//middlewares

const router = Router();

// /api/register
router.post("/register", register);

// /api/login
router.post("/login", login);

// /api/logout
// limpieza y deslogeo de la cookie
router.post("/logout", validateToken, logout);

// /api/userEdit
router.post("/editUser", validateToken, editUser);

// /api/me
// devuelve los datos del user loggeado
router.get("/me", validateToken, getUserData);

// 404 404 404 404 404 404 404 //
router.use("/", function (req, res) {
  // si hay error, va para aca
  res
    .status(404)
    .header("X-Error-Message", "Página no encontrada")
    .send("Pagina no encontrada");
});

export default router;
