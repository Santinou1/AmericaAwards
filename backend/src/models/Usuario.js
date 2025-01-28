const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  rol: {
    type: String,
    enum: ['empleado', 'administrador'],
    default: 'empleado'
  },
  saldo_puntos_canjeables: {
    type: Number,
    default: 0
  },
  saldo_puntos_transferibles: {
    type: Number,
    default: 0
  }
}, {
  timestamps: {
    createdAt: 'fecha_creacion',
    updatedAt: 'fecha_actualizacion'
  }
});

module.exports = mongoose.model('Usuario', usuarioSchema);