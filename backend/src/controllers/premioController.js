const { validationResult } = require('express-validator');
const Premio = require('../models/Premio');

// Crear nuevo premio
exports.crearPremio = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  try {
    const premio = new Premio(req.body);
    await premio.save();

    res.status(201).json({
      msg: 'Premio creado exitosamente',
      premio
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al crear el premio' });
  }
};

// Obtener todos los premios
exports.obtenerPremios = async (req, res) => {
  try {
    const premios = await Premio.find().sort({ costo_puntos: 'asc' });
    res.json({ premios });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al obtener los premios' });
  }
};

// Obtener premio por ID
exports.obtenerPremio = async (req, res) => {
  try {
    const premio = await Premio.findById(req.params.id);
    if (!premio) {
      return res.status(404).json({ msg: 'Premio no encontrado' });
    }
    res.json({ premio });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al obtener el premio' });
  }
};

// Actualizar premio
exports.actualizarPremio = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  try {
    let premio = await Premio.findById(req.params.id);
    if (!premio) {
      return res.status(404).json({ msg: 'Premio no encontrado' });
    }

    premio = await Premio.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.json({
      msg: 'Premio actualizado exitosamente',
      premio
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al actualizar el premio' });
  }
};

// Eliminar premio
exports.eliminarPremio = async (req, res) => {
  try {
    const premio = await Premio.findById(req.params.id);
    if (!premio) {
      return res.status(404).json({ msg: 'Premio no encontrado' });
    }

    await Premio.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Premio eliminado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al eliminar el premio' });
  }
};