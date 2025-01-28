const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const Usuario = require('../models/Usuario');

exports.autenticarUsuario = async (req, res) => {
  // Revisar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  const { email, password } = req.body;

  try {
    // Revisar que el usuario esté registrado
    let usuario = await Usuario.findOne({ email });
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
        id: usuario.id,
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
        expiresIn: '8h' // Token expira en 8 horas
      },
      (error, token) => {
        if (error) throw error;
        res.json({ token });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Hubo un error' });
  }
};

// Obtiene el usuario autenticado
exports.usuarioAutenticado = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuario.id).select('-password');
    res.json({ usuario });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Hubo un error' });
  }
};