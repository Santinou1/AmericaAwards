const { validationResult } = require('express-validator');
const Usuario = require('../SQLmodels/Usuario');
const Transferencia = require('../SQLmodels/Transferencia');
const {sequelize} = require('../SQLmodels');
const { Op } = require('sequelize');

exports.realizarTransferencia = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  const t = await sequelize.transaction();
  try {
    const { receptor_id, puntos, mensaje } = req.body;
    const emisor_id = req.usuario.id;

    // Verificar que no se transfiera a sí mismo
    if (emisor_id === receptor_id) {
      await t.rollback();
      return res.status(400).json({ msg: "No puedes transferirte puntos a ti mismo" });
    }

    // Obtener emisor y verificar saldo
    const emisor = await Usuario.findByPk(emisor_id, { transaction: t });
    if (!emisor || emisor.saldo_puntos_transferibles < puntos) {
      await t.rollback();
      return res.status(400).json({ msg: 'Saldo insuficiente para realizar la transferencia' });
    }

    // Verificar que el receptor existe
    const receptor = await Usuario.findByPk(receptor_id, { transaction: t });
    if (!receptor) {
      await t.rollback();
      return res.status(400).json({ msg: 'Usuario receptor no encontrado' });
    }

    // Crear la transferencia
    const transferencia = await Transferencia.create({
      emisor_id,
      receptor_id,
      puntos,
      mensaje,
      fecha: new Date()
    }, { transaction: t });

    // Actualizar saldos
    await emisor.decrement('saldo_puntos_transferibles', { by: puntos, transaction: t });
    await receptor.increment('saldo_puntos_canjeables', { by: puntos, transaction: t });

    // Confirmar la transacción
    await t.commit();

    // Obtener la transferencia con los datos de usuario
    const transferenciaConUsuarios = await Transferencia.findByPk(transferencia.id, {
      include: [
        {
          model: Usuario,
          as: 'emisor',
          attributes: ['nombre', 'email']
        },
        {
          model: Usuario,
          as: 'receptor',
          attributes: ['nombre', 'email']
        }
      ]
    });

    res.json({ msg: 'Transferencia realizada con éxito', transferencia: transferenciaConUsuarios });
  } catch (error) {
    await t.rollback();
    console.error('Error al realizar transferencia:', error);
    res.status(500).json({ msg: 'Error al realizar la transferencia' });
  }
};

exports.obtenerTransferenciasUsuario = async (req, res) => {
  try {
    const userId = req.usuario.id;

    const transferencias = await Transferencia.findAll({
      where: {
        [Op.or]: [
          { emisor_id: userId },
          { receptor_id: userId }
        ]
      },
      include: [
        {
          model: Usuario,
          as: 'emisor',
          attributes: ['nombre', 'email']
        },
        {
          model: Usuario,
          as: 'receptor',
          attributes: ['nombre', 'email']
        }
      ],
      order: [['fecha', 'DESC']]
    });

    res.json(transferencias);
  } catch (error) {
    console.error('Error al obtener transferencias:', error);
    res.status(500).json({ msg: 'Error al obtener las transferencias' });
  }
};

exports.obtenerTodasTransferencias = async (req, res) => {
  try {
    const transferencias = await Transferencia.findAll({
      include: [
        {
          model: Usuario,
          as: 'emisor',
          attributes: ['nombre', 'email']
        },
        {
          model: Usuario,
          as: 'receptor',
          attributes: ['nombre', 'email']
        }
      ],
      order: [['fecha', 'DESC']]
    });

    res.json(transferencias);
  } catch (error) {
    console.error('Error al obtener todas las transferencias:', error);
    res.status(500).json({ msg: 'Error al obtener las transferencias' });
  }
};
