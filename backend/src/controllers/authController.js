const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const Usuario = require('../SQLmodels/Usuario');

exports.autenticarUsuario = async (req, res) => {
  // Revisar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  const { email, password } = req.body;

  try {
    // Revisar que el usuario esté registrado
    let usuario = await Usuario.findOne({ 
      where: { email },
      attributes: ['idUsuario', 'email', 'password', 'nombre', 'rol'] 
    });

    if (!usuario) {
      return res.status(400).json({ msg: 'El usuario no existe' });
    }

    // Revisar el password
    const passCorrecto = await bcrypt.compare(password, usuario.password);
    if (!passCorrecto) {
      return res.status(400).json({ msg: 'Password incorrecto' });
    }

    // Si todo es correcto, crear y firmar el JWT
    const payload = {
      usuario: {
        id: usuario.idUsuario,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol
      }
    };

    // Firmar el JWT
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: '8h'
      },
      (error, token) => {
        if (error) throw error;
        res.json({ token });
      }
    );
  } catch (error) {
    console.error('Error en autenticación:', error);
    res.status(500).json({ msg: 'Hubo un error en el servidor' });
  }
};

// Obtiene el usuario autenticado
exports.usuarioAutenticado = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.usuario.id, {
      attributes: ['idUsuario', 'email', 'nombre', 'rol', 'saldo_puntos_canjeables', 'saldo_puntos_transferibles']
    });

    if (!usuario) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    res.json({ 
      usuario: {
        id: usuario.idUsuario,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
        saldo_puntos_canjeables: usuario.saldo_puntos_canjeables,
        saldo_puntos_transferibles: usuario.saldo_puntos_transferibles
      } 
    });
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    res.status(500).json({ msg: 'Error al obtener información del usuario' });
  }
};