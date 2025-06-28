import { gfs } from "../config/gridfs.js";
import mongoose from "mongoose";
import Historia from "../models/Historia.js";

export const subirHistoria = async (req, res) => {
  try {
    const { mascotaId } = req.body;
    const file = req.file;

    const historia = new Historia({
      nombre: file.filename,
      mascota: mascotaId
    });
    await historia.save();

    res.status(201).json({ msg: "Historia clínica registrada", filename: file.filename });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error al subir la historia" });
  }
};

export const listarHistorias = async (req, res) => {
  try {
    const historias = await Historia.find().populate("mascota", "nombre");
    res.json(historias);
  } catch (err) {
    res.status(500).json({ msg: "Error al listar historias" });
  }
};

export const verHistoria = async (req, res) => {
  try {
    const file = await gfs.files.findOne({ filename: req.params.filename });
    if (!file) return res.status(404).json({ msg: "Archivo no encontrado" });

    const readstream = gfs.createReadStream(file.filename);
    res.set("Content-Type", file.contentType);
    readstream.pipe(res);
  } catch (err) {
    res.status(500).json({ msg: "Error al visualizar historia" });
  }
};
