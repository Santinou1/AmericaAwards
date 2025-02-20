const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const transferenciaController = require('../controllers/transferenciaController');
const auth = require('../middleware/auth');
const { isAdmin } = require('../middleware/checkRole');

// Realizar transferencia
router.post('/', [
  auth,
  [
    check('receptor_id', 'El ID del receptor es obligatorio').not().isEmpty(),
    check('puntos', 'Los puntos deben ser un número positivo').isInt({ min: 1 }),
    check('mensaje').optional().trim()
  ]
], transferenciaController.realizarTransferencia);

// Obtener transferencias del usuario autenticado
router.get('/mis-transferencias/:id', auth, transferenciaController.obtenerTransferenciasUsuario);

// Obtener todas las transferencias (solo admin)
router.get('/', [auth, isAdmin], transferenciaController.obtenerTodasTransferencias);

module.exports = router;