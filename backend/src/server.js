const express = require('express');
const cors = require('cors');
require('dotenv').config();
const conectarDB = require('./config/db');
const { sequelize } = require('./SQLmodels/index');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conectar a MongoDB
conectarDB();


// Rutas
app.use('/api/usuarios', require('./routes/usuarioRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/transferencias', require('./routes/transferenciaRoutes'));
app.use('/api/premios', require('./routes/premioRoutes'));
app.use('/api/canjes', require('./routes/canjeRoutes')); // Nueva ruta de canjes

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ msg: 'API funcionando' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});