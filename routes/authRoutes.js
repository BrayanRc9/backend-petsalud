import { Router } from "express";
import { registrarUsuario, loginUsuario } from "../controllers/authController.js";

const router = Router();

// Registro de usuario
router.post("/registro", registrarUsuario);

// Login de usuario
router.post("/login", loginUsuario);

export default router;