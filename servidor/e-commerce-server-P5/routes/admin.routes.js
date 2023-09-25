import { Router } from "express";
import {
  allUsers,
  deleteUser,
  promoteUser,
} from "../controllers/admin.controllers.js";
import { validateToken } from "../middlewares/index.js";

const router = Router();
//
router.get("/users", validateToken, allUsers);

//
router.delete("/users", validateToken, deleteUser);

//
router.post("/userPromote", validateToken, promoteUser);

export default router;
