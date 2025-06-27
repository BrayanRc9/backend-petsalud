import Usuario from "../models/Usuario.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const registrarUsuario = async (req, res) => {
  try {
    const { nombre, correo, contraseña, rol } = req.body;

    const existe = await Usuario.findOne({ correo });
    if (existe) return res.status(400).json({ msg: "Correo ya registrado" });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(contraseña, salt);

    const nuevoUsuario = new Usuario({ nombre, correo, contraseña: hash, rol });
    await nuevoUsuario.save();

    res.status(201).json({ msg: "Usuario registrado correctamente" });
  } catch (error) {
    res.status(500).json({ msg: "Error en el registro" });
  }
};

export const loginUsuario = async (req, res) => {
  try {
    const { correo, contraseña } = req.body;
    const usuario = await Usuario.findOne({ correo });

    if (!usuario) return res.status(400).json({ msg: "Credenciales incorrectas" });

    const valid = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!valid) return res.status(400).json({ msg: "Contraseña inválida" });

    const token = jwt.sign({ id: usuario._id, rol: usuario.rol }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ token, usuario: { nombre: usuario.nombre, rol: usuario.rol } });
  } catch (error) {
    res.status(500).json({ msg: "Error en el inicio de sesión" });
  }
};
