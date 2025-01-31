const { validationResult } = require('express-validator');
const Canje = require('../models/Canje');
const Premio = require('../models/Premio');
const Usuario = require('../models/Usuario');

exports.realizarCanje = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  try {
    const { premio_id, cantidad } = req.body;
    const usuario_id = req.usuario.id;

    // Verificar que el premio existe
    const premio = await Premio.findById(premio_id);
    if (!premio) {
      return res.status(404).json({ msg: 'Premio no encontrado' });
    }

    // Verificar stock disponible
    if (premio.stock < cantidad) {
      return res.status(400).json({ msg: 'Stock insuficiente' });
    }

    // Calcular costo total
    const costoTotal = premio.costo_puntos * cantidad;

    // Verificar saldo del usuario
    const usuario = await Usuario.findById(usuario_id);
    if (usuario.saldo_puntos_canjeables < costoTotal) {
      return res.status(400).json({ msg: 'Saldo insuficiente para realizar el canje' });
    }

    // Crear el canje
    const canje = new Canje({
      usuario_id,
      premio_id,
      cantidad
    });

    // Actualizar stock y saldo
    premio.stock -= cantidad;
    usuario.saldo_puntos_canjeables -= costoTotal;

    // Guardar todos los cambios
    await Promise.all([
      canje.save(),
      premio.save(),
      usuario.save()
    ]);

    // Poblar la respuesta con los datos del premio
    await canje.populate('premio_id');

    res.status(201).json({
      msg: 'Canje realizado con éxito',
      canje
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al realizar el canje' });
  }
};

exports.obtenerCanjesUsuario = async (req, res) => {
  try {
    const canjes = await Canje.find({ usuario_id: req.usuario.id })
      .populate('premio_id')
      .sort({ fecha: -1 });

    res.json({ canjes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al obtener los canjes' });
  }
};

exports.obtenerTodosCanjes = async (req, res) => {
  try {
    const canjes = await Canje.find()
      .populate('usuario_id', 'nombre email')
      .populate('premio_id')
      .sort({ fecha: -1 });

    res.json({ canjes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al obtener los canjes' });
  }
};