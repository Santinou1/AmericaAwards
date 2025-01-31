const express = require('express');
const router = express.Router();
const premioController = require('../controllers/premioController');
const { validarPremio } = require('../middleware/validacion');
const auth = require('../middleware/auth');
const { isAdmin } = require('../middleware/checkRole');

// Todas las rutas requieren autenticación

// Obtener todos los premios - accesible para todos los usuarios autenticados
router.get('/', auth, premioController.obtenerPremios);

// Obtener premio específico - accesible para todos los usuarios autenticados
router.get('/:id', auth, premioController.obtenerPremio);

// Las siguientes rutas son solo para administradores
router.post('/', [auth, isAdmin, validarPremio], premioController.crearPremio);
router.put('/:id', [auth, isAdmin, validarPremio], premioController.actualizarPremio);
router.delete('/:id', [auth, isAdmin], premioController.eliminarPremio);

module.exports = router;