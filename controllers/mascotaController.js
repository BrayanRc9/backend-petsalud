const Mascota = require('../models/Mascota');

exports.crearMascota = async (req, res) => {
  try {
    const { nombre, especie, edad } = req.body;
    const usuarioId = req.usuario.id;

    const mascota = new Mascota({ nombre, especie, edad, usuarioId });
    await mascota.save();

    res.json({ msg: "Mascota registrada", mascota });
  } catch (error) {
    res.status(500).json({ msg: "Error al registrar mascota" });
  }
};

exports.obtenerMisMascotas = async (req, res) => {
  try {
    const usuarioId = req.usuario.id;
    const mascotas = await Mascota.find({ usuarioId });

    res.json(mascotas);
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener mascotas" });
  }
};

exports.eliminarMascota = async (req, res) => {
  try {
    await Mascota.findByIdAndDelete(req.params.id);
    res.json({ msg: "Mascota eliminada" });
  } catch (error) {
    res.status(500).json({ msg: "Error al eliminar mascota" });
  }
};
