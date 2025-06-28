import { Router } from "express";
import { uploadPDF } from "../config/gridfs.js";

import {
  subirHistoria,
  obtenerHistorias,
  verHistoriaPDF
} from "../controllers/historiaController.js";

const router = Router();

router.post("/", uploadPDF.single("historia"), subirHistoria);
router.get("/", obtenerHistorias);
router.get("/ver/:nombre", verHistoriaPDF);

export default router;
