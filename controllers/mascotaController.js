import Mascota from "../models/Mascota.js";
import jwt from "jsonwebtoken";

// Obtener ID desde el token
const obtenerIdUsuario = (req) => {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded.id;
};

export const crearMascota = async (req, res) => {
  try {
    const usuarioId = obtenerIdUsuario(req);
    const { nombre, especie, edad } = req.body;
    const nueva = new Mascota({ nombre, especie, edad, usuario: usuarioId });
    await nueva.save();
    res.status(201).json({ msg: "Mascota registrada" });
  } catch (err) {
    res.status(500).json({ msg: "Error al crear mascota" });
  }
};

export const obtenerMisMascotas = async (req, res) => {
  try {
    const usuarioId = obtenerIdUsuario(req);
    const mascotas = await Mascota.find({ usuario: usuarioId });
    res.json(mascotas);
  } catch (err) {
    res.status(500).json({ msg: "Error al obtener mascotas" });
  }
};

export const obtenerTodasMascotas = async (req, res) => {
  try {
    const mascotas = await Mascota.find().populate("usuario", "nombre correo");
    res.json(mascotas);
  } catch (err) {
    res.status(500).json({ msg: "Error al obtener todas las mascotas" });
  }
};

export const eliminarMascota = async (req, res) => {
  try {
    await Mascota.findByIdAndDelete(req.params.id);
    res.json({ msg: "Mascota eliminada" });
  } catch (err) {
    res.status(500).json({ msg: "Error al eliminar mascota" });
  }
};
