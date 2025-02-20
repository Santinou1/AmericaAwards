const mongoose = require('mongoose');

const premioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  imagen_url: {
    type: String,
    default: 'https://via.placeholder.com/300x200'
  },
  costo_puntos: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true,
    min: 0
  }
}, {
  timestamps: {
    createdAt: 'fecha_creacion',
    updatedAt: 'fecha_actualizacion'
  }
});

module.exports = mongoose.model('Premio', premioSchema);