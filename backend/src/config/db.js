const mongoose = require('mongoose');

require('dotenv').config();

const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Conectado a MongoDB');
  } catch (error) {
    console.error('Error conectando a MongoDB:', error);
    process.exit(1); // Salir de la aplicación si no se puede conectar a la DB
  }
};

module.exports = conectarDB;