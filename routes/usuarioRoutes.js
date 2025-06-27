import { Router } from "express";
import { obtenerUsuarios, crearUsuario, eliminarUsuario } from "../controllers/usuario.controller.js";

const router = Router();

// GET todos los usuarios
router.get("/", obtenerUsuarios);

// POST crear un nuevo usuario (admin)
router.post("/", crearUsuario);

// DELETE eliminar un usuario por ID
router.delete("/:id", eliminarUsuario);

export default router;