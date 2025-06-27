const mongoose = require('mongoose');

const insumoSchema = new mongoose.Schema({
  nombre: String,
  cantidad: Number
});

module.exports = mongoose.model('Insumo', insumoSchema);
