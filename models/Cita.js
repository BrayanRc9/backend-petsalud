const mongoose = require('mongoose');

const citaSchema = new mongoose.Schema({
  mascotaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Mascota' },
  fecha: String,
  hora: String
});

module.exports = mongoose.model('Cita', citaSchema);
