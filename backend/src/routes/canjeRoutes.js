const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const canjeController = require('../controllers/canjeController');
const auth = require('../middleware/auth');
const { isAdmin } = require('../middleware/checkRole');

// Realizar canje
router.post('/', [
  auth,
  [
    check('premio_id', 'El ID del premio es obligatorio').not().isEmpty(),
    check('cantidad', 'La cantidad debe ser un número positivo').isInt({ min: 1 })
  ]
], canjeController.realizarCanje);

// Obtener canjes del usuario autenticado
router.get('/mis-canjes', auth, canjeController.obtenerCanjesUsuario);

// Obtener todos los canjes (solo admin)
router.get('/', [auth, isAdmin], canjeController.obtenerTodosCanjes);

module.exports = router;