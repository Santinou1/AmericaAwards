const { validationResult } = require('express-validator');
const Usuario = require('../models/Usuario');
const Transferencia = require('../models/Transferencia');

exports.realizarTransferencia = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  try {
    const { receptor_id, puntos, mensaje } = req.body;
    const emisor_id = req.usuario.id;

    // Verificar que no se transfiera a sí mismo
    if (emisor_id === receptor_id) {
      return res.status(400).json({ msg: 'No puedes transferirte puntos a ti mismo' });
    }

    // Obtener emisor y verificar saldo
    const emisor = await Usuario.findById(emisor_id);
    if (emisor.saldo_puntos_transferibles < puntos) {
      return res.status(400).json({ msg: 'Saldo insuficiente para realizar la transferencia' });
    }

    // Verificar que el receptor existe
    const receptor = await Usuario.findById(receptor_id);
    if (!receptor) {
      return res.status(400).json({ msg: 'Usuario receptor no encontrado' });
    }

    // Crear la transferencia
    const transferencia = new Transferencia({
      emisor_id,
      receptor_id,
      puntos,
      mensaje
    });

    // Actualizar saldos
    emisor.saldo_puntos_transferibles -= puntos;
    receptor.saldo_puntos_canjeables += puntos;

    // Guardar cambios en una transacción
    await Promise.all([
      transferencia.save(),
      emisor.save(),
      receptor.save()
    ]);

    res.json({
      msg: 'Transferencia realizada con éxito',
      transferencia
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al realizar la transferencia' });
  }
};

exports.obtenerTransferenciasUsuario = async (req, res) => {
  try {
    const usuario_id = req.usuario.id;

    const transferencias = await Transferencia.find({
      $or: [
        { emisor_id: usuario_id },
        { receptor_id: usuario_id }
      ]
    })
    .populate('emisor_id', 'nombre email')
    .populate('receptor_id', 'nombre email')
    .sort({ fecha: -1 });

    res.json({ transferencias });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al obtener las transferencias' });
  }
};

exports.obtenerTodasTransferencias = async (req, res) => {
  try {
    const transferencias = await Transferencia.find()
      .populate('emisor_id', 'nombre email')
      .populate('receptor_id', 'nombre email')
      .sort({ fecha: -1 });

    res.json({ transferencias });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al obtener las transferencias' });
  }
};