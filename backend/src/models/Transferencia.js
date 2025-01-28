const mongoose = require('mongoose');

const transferenciaSchema = new mongoose.Schema({
  emisor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  receptor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  puntos: {
    type: Number,
    required: true
  },
  mensaje: {
    type: String
  },
  fecha: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Transferencia', transferenciaSchema);