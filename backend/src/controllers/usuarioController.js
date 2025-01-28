const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');


// Nuevo método para crear el primer administrador
exports.crearPrimerAdmin = async (req, res) => {
  try {
    // Verificar si ya existe algún usuario
    const existenUsuarios = await Usuario.countDocuments();
    if (existenUsuarios > 0) {
      return res.status(400).json({ msg: 'Ya existe al menos un usuario. Use la ruta normal de registro.' });
    }

    // Verificar errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { nombre, email, password } = req.body;

    // Crear nuevo usuario administrador
    const usuario = new Usuario({
      nombre,
      email,
      password,
      rol: 'administrador',
      saldo_puntos_canjeables: 0,
      saldo_puntos_transferibles: 0
    });

    // Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    usuario.password = await bcrypt.hash(password, salt);

    // Guardar usuario
    await usuario.save();

    // Crear y firmar el JWT
    const payload = {
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol
      }
    };

    // Firmar el JWT
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '8h'
    });

    // Enviar respuesta
    res.status(201).json({
      msg: 'Administrador creado exitosamente',
      token,
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error en el servidor' });
  }
};


exports.crearUsuario = async (req, res) => {
  try {
    // Verificar errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { nombre, email, password, rol, saldo_puntos_canjeables, saldo_puntos_transferibles } = req.body;

    // Verificar si el usuario ya existe
    let usuario = await Usuario.findOne({ email });
    if (usuario) {
      return res.status(400).json({ msg: 'El usuario ya existe' });
    }

    // Crear nuevo usuario
    usuario = new Usuario({
      nombre,
      email,
      password,
      rol: rol || 'empleado',
      saldo_puntos_canjeables: saldo_puntos_canjeables || 0,
      saldo_puntos_transferibles: saldo_puntos_transferibles || 0
    });

    // Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    usuario.password = await bcrypt.hash(password, salt);

    // Guardar usuario
    await usuario.save();

    // Enviar respuesta
    res.status(201).json({
      msg: 'Usuario creado exitosamente',
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
        saldo_puntos_canjeables: usuario.saldo_puntos_canjeables,
        saldo_puntos_transferibles: usuario.saldo_puntos_transferibles,
        fecha_creacion: usuario.fecha_creacion,
        fecha_actualizacion: usuario.fecha_actualizacion
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error en el servidor' });
  }
};

exports.obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find()
      .select('-password') // Excluir el campo password
      .sort({ fecha_creacion: -1 }); // Ordenar por fecha de creación descendente

    res.json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error en el servidor' });
  }
};

exports.obtenerUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id).select('-password');
    
    if (!usuario) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    res.json(usuario);
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }
    res.status(500).json({ msg: 'Error en el servidor' });
  }
};

exports.actualizarUsuario = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { nombre, email, rol, saldo_puntos_canjeables, saldo_puntos_transferibles, password } = req.body;
    
    // Verificar si el usuario existe
    let usuario = await Usuario.findById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    // Verificar si el nuevo email ya está en uso por otro usuario
    if (email && email !== usuario.email) {
      const existeEmail = await Usuario.findOne({ email });
      if (existeEmail) {
        return res.status(400).json({ msg: 'El email ya está en uso' });
      }
    }

    // Actualizar campos
    if (nombre) usuario.nombre = nombre;
    if (email) usuario.email = email;
    if (rol) usuario.rol = rol;
    if (typeof saldo_puntos_canjeables !== 'undefined') {
      usuario.saldo_puntos_canjeables = saldo_puntos_canjeables;
    }
    if (typeof saldo_puntos_transferibles !== 'undefined') {
      usuario.saldo_puntos_transferibles = saldo_puntos_transferibles;
    }

    // Si se proporciona nueva contraseña, encriptarla
    if (password) {
      const salt = await bcrypt.genSalt(10);
      usuario.password = await bcrypt.hash(password, salt);
    }

    await usuario.save();

    // Enviar respuesta sin incluir password
    const usuarioActualizado = usuario.toObject();
    delete usuarioActualizado.password;

    res.json({
      msg: 'Usuario actualizado exitosamente',
      usuario: usuarioActualizado
    });
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }
    res.status(500).json({ msg: 'Error en el servidor' });
  }
};

exports.eliminarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    
    if (!usuario) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    await Usuario.findByIdAndDelete(req.params.id);

    res.json({ msg: 'Usuario eliminado exitosamente' });
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }
    res.status(500).json({ msg: 'Error en el servidor' });
  }
};