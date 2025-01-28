const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { validarCreacionUsuario, validarActualizacionUsuario } = require('../middleware/validacion');
const auth = require('../middleware/auth');
const { isAdmin, isSameUserOrAdmin } = require('../middleware/checkRole');

// Ruta pública para crear el primer usuario administrador (solo funciona si no hay usuarios)
router.post('/primer-admin', validarCreacionUsuario, usuarioController.crearPrimerAdmin);

// Rutas protegidas
router.post('/', [auth, isAdmin, validarCreacionUsuario], usuarioController.crearUsuario);
router.get('/', [auth, isAdmin], usuarioController.obtenerUsuarios); // Agregado isAdmin
router.get('/:id', [auth, isSameUserOrAdmin], usuarioController.obtenerUsuario);
router.put('/:id', [auth, isSameUserOrAdmin, validarActualizacionUsuario], usuarioController.actualizarUsuario);
router.delete('/:id', [auth, isAdmin], usuarioController.eliminarUsuario);

module.exports = router;