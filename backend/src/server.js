const express = require('express');
const cors = require('cors');
require('dotenv').config();
const conectarDB = require('./config/db');
const { sequelize } = require('./SQLmodels/index');
const app = express();
const path = require('path');

// Middleware
app.use(cors());
app.use(express.json());

// Conectar a MongoDB



// Rutas
app.use('/api/usuarios', require('./routes/usuarioRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/transferencias', require('./routes/transferenciaRoutes'));
app.use('/api/premios', require('./routes/premioRoutes'));
app.use('/api/canjes', require('./routes/canjeRoutes')); // Nueva ruta de canjes

// Ruta de prueba
app.get('/api', (req, res) => {
  res.json({ msg: 'API funcionando' });
});

app.use(express.static(path.join(__dirname, '../../frontend/dist')));
 
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/dist', 'index.html'));
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});