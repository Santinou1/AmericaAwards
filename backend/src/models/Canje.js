const mongoose = require('mongoose');

const canjeSchema = new mongoose.Schema({
  usuario_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  premio_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Premio',
    required: true
  },
  cantidad: {
    type: Number,
    required: true,
    min: 1
  },
  fecha: {
    type: Date,
    default: Date.now
  },
  estado: {
    type: String,
    enum: ['pendiente', 'aprobado', 'rechazado'],
    default: 'pendiente'
  }
});

module.exports = mongoose.model('Canje', canjeSchema);