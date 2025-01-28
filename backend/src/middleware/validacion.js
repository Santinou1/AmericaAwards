const { check } = require('express-validator');

exports.validarCreacionUsuario = [
  check('nombre')
    .not()
    .isEmpty()
    .withMessage('El nombre es obligatorio')
    .trim()
    .escape(),
  
  check('email')
    .isEmail()
    .withMessage('Ingrese un email válido')
    .normalizeEmail(),
  
  check('password')
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener al menos 6 caracteres')
    .matches(/\d/)
    .withMessage('La contraseña debe contener al menos un número'),
  
  check('rol')
    .optional()
    .isIn(['empleado', 'administrador'])
    .withMessage('Rol no válido'),
  
  check('saldo_puntos_canjeables')
    .optional()
    .isInt({ min: 0 })
    .withMessage('El saldo de puntos canjeables debe ser un número positivo'),
  
  check('saldo_puntos_transferibles')
    .optional()
    .isInt({ min: 0 })
    .withMessage('El saldo de puntos transferibles debe ser un número positivo')
];

exports.validarActualizacionUsuario = [
  check('nombre')
    .optional()
    .not()
    .isEmpty()
    .withMessage('El nombre no puede estar vacío')
    .trim()
    .escape(),
  
  check('email')
    .optional()
    .isEmail()
    .withMessage('Ingrese un email válido')
    .normalizeEmail(),
  
  check('password')
    .optional()
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener al menos 6 caracteres')
    .matches(/\d/)
    .withMessage('La contraseña debe contener al menos un número'),
  
  check('rol')
    .optional()
    .isIn(['empleado', 'administrador'])
    .withMessage('Rol no válido'),
  
  check('saldo_puntos_canjeables')
    .optional()
    .isInt({ min: 0 })
    .withMessage('El saldo de puntos canjeables debe ser un número positivo'),
  
  check('saldo_puntos_transferibles')
    .optional()
    .isInt({ min: 0 })
    .withMessage('El saldo de puntos transferibles debe ser un número positivo')
];