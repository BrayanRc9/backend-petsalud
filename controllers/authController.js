const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registrar = async (req, res) => {
  const { nombre, email, password, rol } = req.body;
  const existe = await Usuario.findOne({ email });
  if (existe) return res.status(400).json({ msg: "Email ya registrado" });

  const hash = await bcrypt.hash(password, 10);
  const usuario = new Usuario({ nombre, email, password: hash, rol });
  await usuario.save();
  res.json({ msg: "Usuario registrado" });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const usuario = await Usuario.findOne({ email });
  if (!usuario) return res.status(400).json({ msg: "Usuario no encontrado" });

  const valido = await bcrypt.compare(password, usuario.password);
  if (!valido) return res.status(400).json({ msg: "Contraseña incorrecta" });

  const token = jwt.sign({ id: usuario._id, rol: usuario.rol }, process.env.JWT_SECRET);
  res.json({ token });
};
