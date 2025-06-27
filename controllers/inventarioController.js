const Insumo = require('../models/Insumo');

exports.agregarInsumo = async (req, res) => {
  try {
    const { nombre, cantidad } = req.body;
    const insumo = new Insumo({ nombre, cantidad });
    await insumo.save();

    res.json({ msg: "Insumo agregado", insumo });
  } catch (error) {
    res.status(500).json({ msg: "Error al agregar insumo" });
  }
};

exports.obtenerInsumos = async (req, res) => {
  try {
    const insumos = await Insumo.find();
    res.json(insumos);
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener insumos" });
  }
};

exports.actualizarInsumo = async (req, res) => {
  try {
    const { cantidad } = req.body;
    const insumo = await Insumo.findByIdAndUpdate(req.params.id, { cantidad }, { new: true });

    res.json({ msg: "Insumo actualizado", insumo });
  } catch (error) {
    res.status(500).json({ msg: "Error al actualizar insumo" });
  }
};

exports.eliminarInsumo = async (req, res) => {
  try {
    await Insumo.findByIdAndDelete(req.params.id);
    res.json({ msg: "Insumo eliminado" });
  } catch (error) {
    res.status(500).json({ msg: "Error al eliminar insumo" });
  }
};
