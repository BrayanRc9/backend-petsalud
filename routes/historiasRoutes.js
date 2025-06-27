import { Router } from "express";
import { subirHistoria, listarHistorias, verHistoria } from "../controllers/historiasController.js";
import { upload } from "../config/gridfs.js";
import { verificarToken } from "../middlewares/auth.js";
import { uploadPDF } from "../config/gridfs.js";


const router = Router();

// Subir historia clínica en PDF
router.post("/historias", verificarToken, upload.single("historia"), subirHistoria);

// Listar historias clínicas guardadas
router.get("/historias", verificarToken, listarHistorias);

// Visualizar historia clínica PDF
router.get("/historias/ver/:filename", verificarToken, verHistoria);

export default router;
