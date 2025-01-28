const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { validarCreacionUsuario, validarActualizacionUsuario } = require('../middleware/validacion');

// Crear usuario
router.post('/', validarCreacionUsuario, usuarioController.crearUsuario);

// Obtener todos los usuarios
router.get('/', usuarioController.obtenerUsuarios);

// Obtener un usuario específico
router.get('/:id', usuarioController.obtenerUsuario);

// Actualizar usuario
router.put('/:id', validarActualizacionUsuario, usuarioController.actualizarUsuario);

// Eliminar usuario
router.delete('/:id', usuarioController.eliminarUsuario);

module.exports = router;