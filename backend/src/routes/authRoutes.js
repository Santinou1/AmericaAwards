const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

// Autenticar usuario
// /api/auth
router.post('/', [
  check('email', 'Agrega un email válido').isEmail(),
  check('password', 'El password es obligatorio').not().isEmpty()
], authController.autenticarUsuario);

// Obtiene el usuario autenticado
router.get('/',
  auth,
  authController.usuarioAutenticado
);

module.exports = router;