const Cita = require('../models/Cita');

exports.crearCita = async (req, res) => {
  try {
    const { mascotaId, fecha, hora } = req.body;
    const cita = new Cita({ mascotaId, fecha, hora });
    await cita.save();

    res.json({ msg: "Cita agendada", cita });
  } catch (error) {
    res.status(500).json({ msg: "Error al crear la cita" });
  }
};

exports.obtenerCitas = async (req, res) => {
  try {
    const citas = await Cita.find().populate('mascotaId');
    res.json(citas);
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener citas" });
  }
};

exports.eliminarCita = async (req, res) => {
  try {
    await Cita.findByIdAndDelete(req.params.id);
    res.json({ msg: "Cita eliminada" });
  } catch (error) {
    res.status(500).json({ msg: "Error al eliminar la cita" });
  }
};
