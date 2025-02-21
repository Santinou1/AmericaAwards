const { validationResult } = require('express-validator');
const { sequelize } = require('../SQLmodels');
const Canje = require('../SQLmodels/Canje');
const Premio = require('../SQLmodels/Premio');
const Usuario = require('../SQLmodels/Usuario');

exports.realizarCanje = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  const t = await sequelize.transaction();

  try {
    const { premio_id, cantidad } = req.body;
    const usuario_id = req.usuario.id;

    // Verificar que el premio existe y tiene stock suficiente
    const premio = await Premio.findByPk(premio_id, { transaction: t });
    if (!premio) {
      await t.rollback();
      return res.status(404).json({ msg: 'Premio no encontrado' });
    }

    // Verificar stock disponible
    if (premio.stock < cantidad) {
      await t.rollback();
      return res.status(400).json({ msg: 'Stock insuficiente' });
    }

    // Calcular costo total
    const costoTotal = premio.costo_puntos * cantidad;

    // Verificar saldo del usuario
    const usuario = await Usuario.findByPk(usuario_id, { transaction: t });
    if (!usuario || usuario.saldo_puntos_canjeables < costoTotal) {
      await t.rollback();
      return res.status(400).json({ msg: 'Saldo insuficiente para realizar el canje' });
    }

    // Crear el canje
    const canje = await Canje.create({
      usuario_id,
      premio_id,
      cantidad,
      fecha: new Date(),
      estado: 'pendiente'
    }, { transaction: t });

    // Actualizar stock y saldo de forma atómica
    await premio.decrement('stock', { by: cantidad, transaction: t });
    await usuario.decrement('saldo_puntos_canjeables', { by: costoTotal, transaction: t });

    // Confirmar la transacción
    await t.commit();

    // Obtener el canje con sus relaciones
    const canjeConRelaciones = await Canje.findByPk(canje.id, {
      include: [
        {
          model: Premio,
          attributes: ['nombre', 'descripcion', 'costo_puntos']
        },
        {
          model: Usuario,
          attributes: ['nombre', 'email']
        }
      ]
    });

    res.status(201).json({
      msg: 'Canje realizado con éxito',
      canje: canjeConRelaciones
    });
  } catch (error) {
    await t.rollback();
    console.error('Error al realizar el canje:', error);
    res.status(500).json({ msg: 'Error al realizar el canje' });
  }
};

exports.obtenerCanjesUsuario = async (req, res) => {
  try {
    console.log('Obteniendo canjes para usuario:', req.usuario.id);
    const canjes = await Canje.findAll({
      where: { usuario_id: req.usuario.id },
      include: [
        {
          model: Premio,
          attributes: ['nombre', 'descripcion', 'costo_puntos', 'imagen_url']
        }
      ],
      order: [['fecha', 'DESC']]
    });

    console.log('Canjes encontrados:', canjes.length);
    res.json(canjes);
  } catch (error) {
    console.error('Error al obtener los canjes:', error);
    res.status(500).json({ msg: 'Error al obtener los canjes' });
  }
};

exports.obtenerTodosCanjes = async (req, res) => {
  try {
    const canjes = await Canje.findAll({
      include: [
        {
          model: Usuario,
          attributes: ['nombre', 'email']
        },
        {
          model: Premio,
          attributes: ['nombre', 'descripcion', 'costo_puntos', 'imagen_url']
        }
      ],
      order: [['fecha', 'DESC']]
    });

    res.json(canjes);
  } catch (error) {
    console.error('Error al obtener todos los canjes:', error);
    res.status(500).json({ msg: 'Error al obtener los canjes' });
  }
};

exports.actualizarEstadoCanje = async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  const t = await sequelize.transaction();

  try {
    const canje = await Canje.findByPk(id, { transaction: t });
    if (!canje) {
      await t.rollback();
      return res.status(404).json({ msg: 'Canje no encontrado' });
    }

    // Si se rechaza un canje, devolver los puntos y el stock
    if (estado === 'rechazado' && canje.estado === 'pendiente') {
      const premio = await Premio.findByPk(canje.premio_id, { transaction: t });
      const usuario = await Usuario.findByPk(canje.usuario_id, { transaction: t });
      
      if (premio && usuario) {
        const puntosDevolver = premio.costo_puntos * canje.cantidad;
        await premio.increment('stock', { by: canje.cantidad, transaction: t });
        await usuario.increment('saldo_puntos_canjeables', { by: puntosDevolver, transaction: t });
      }
    }

    await canje.update({ estado }, { transaction: t });
    await t.commit();

    const canjeActualizado = await Canje.findByPk(id, {
      include: [
        {
          model: Usuario,
          attributes: ['nombre', 'email']
        },
        {
          model: Premio,
          attributes: ['nombre', 'descripcion', 'costo_puntos']
        }
      ]
    });

    res.json({
      msg: 'Estado del canje actualizado con éxito',
      canje: canjeActualizado
    });
  } catch (error) {
    await t.rollback();
    console.error('Error al actualizar el estado del canje:', error);
    res.status(500).json({ msg: 'Error al actualizar el estado del canje' });
  }
};