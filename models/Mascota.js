const mongoose = require('mongoose');

const mascotaSchema = new mongoose.Schema({
  nombre: String,
  especie: String,
  edad: Number,
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }
});

module.exports = mongoose.model('Mascota', mascotaSchema);
