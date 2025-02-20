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
    const emisor_id = req.body.usuario;

    // Verificar que no se transfiera a sí mismo
    if (emisor_id === receptor_id) {
      return res
        .status(400)
        .json({ msg: "No puedes transferirte puntos a ti mismo" });
    }

    // Obtener emisor y verificar saldo
    const emisor = await Usuario.findByPk(emisor_id, { transaction: t });
    if (!emisor || emisor.saldo_puntos_transferibles < puntos) {
      console.log('SALDO EMISOR: ', emisor.saldo_puntos_transferibles)
      await t.rollback();
      return res.status(400).json({ msg: 'Saldo insuficiente para realizar la transferencia' });
    }

    // Verificar que el receptor existe
    const receptor = await Usuario.findByPk(receptor_id,{ transaction: t });
    if (!receptor) {
      await t.rollback();
      return res.status(400).json({ msg: 'Usuario receptor no encontrado' });
    }

    // Crear la transferencia
    const transferencia = await Transferencia.create({
      emisor_id,
      receptor_id,
      puntos,
      mensaje
    }, { transaction: t });

    // Actualizar saldos
    emisor.saldo_puntos_transferibles -= puntos;
    receptor.saldo_puntos_canjeables += puntos;

    // Guardar cambios en una transacción
    await emisor.update({saldo_puntos_transferibles: emisor.saldo_puntos_transferibles- puntos},{transaction: t});
    await receptor.update({saldo_puntos_canjeables: receptor.saldo_puntos_canjeables + puntos},{transaction: t});
    await t.commit();
    res.json({
      msg: "Transferencia realizada con éxito",
      transferencia,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al realizar la transferencia" });
  }
};

exports.obtenerTransferenciasUsuario = async (req, res) => {
  try {
    const usuario_id = req.params.id;

    const transferencias = await Transferencia.findAll({
      where:{
        [Op.or]: [{emisor_id: usuario_id}, {receptor_id: usuario_id}]
      },
      include:[
        {
          model: Usuario,
          as: 'emisor',
          attributes: ['idUsuario','nombre', 'email'],
          required: false
        },
        {
          model: Usuario,
          as: 'receptor',
          attributes: ['idUsuario','nombre', 'email'],
          required:false
        },
      ],
      order: [['fecha', 'DESC']],
    });
    

    // Filtrar transferencias con usuarios eliminados
    
    const transferenciasFiltradas = transferencias.filter(
      (transferencia) => transferencia.emisor !== null && transferencia.receptor !== null
    );
    res.json({ transferencias: transferenciasFiltradas });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener las transferencias" });
  }
};

exports.obtenerTodasTransferencias = async (req, res) => {
  try {
    const transferencias = await Transferencia.findAll({
      include: [
        {
          model: Usuario,
          as: 'emisor',
          attributes: ['idUsuario','nombre', 'email'],
          required: false
        },
        {
          model: Usuario,
          as: 'receptor',
          attributes: ['idUsuario','nombre', 'email'],
          required: false,
        },
      ],
      order: [['fecha', 'DESC']],
    });
      

    // Filtrar transferencias con usuarios eliminados
    const transferenciasFiltradas = transferencias.filter(
      (transferencia) =>
        transferencia.emisor !== null && transferencia.receptor !== null
    );

    res.json({ transferencias: transferenciasFiltradas });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener las transferencias" });
  }
};
