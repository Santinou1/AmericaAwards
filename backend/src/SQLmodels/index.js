const { Sequelize, Op } = require('sequelize');
const sequelize = require('../config/sqlDB');
const Usuario = require('./Usuario');
const Empleado = require('./Empleado');
const Area = require('./Area');
const Transferencia = require('./Transferencia');
const Premio = require('./Premio');
const Canje = require('./Canje');

// Asociaciones de Usuario y Empleado
Usuario.belongsTo(Empleado, {foreignKey: 'empleado'});

// Asociaciones de Empleado y Area
Empleado.belongsTo(Area, {foreignKey: 'area'});
Area.hasMany(Empleado, {foreignKey: 'area', onDelete: 'CASCADE'});

// Asociaciones de Transferencia
Transferencia.belongsTo(Usuario, {foreignKey: 'emisor_id', as: 'emisor'});
Transferencia.belongsTo(Usuario, {foreignKey: 'receptor_id', as: 'receptor'});

// Asociaciones de Canje
Canje.belongsTo(Usuario, {foreignKey: 'usuario_id'});
Canje.belongsTo(Premio, {foreignKey: 'premio_id'});
Usuario.hasMany(Canje, {foreignKey: 'usuario_id', onDelete: 'CASCADE'});
Premio.hasMany(Canje, {foreignKey: 'premio_id', onDelete: 'CASCADE'});

sequelize.authenticate()
    .then(() => console.log('Conexión a la base de datos establecida'))
    .catch(error => console.error('Error al conectar con la base de datos:', error));

sequelize.sync({alter: true})
    .then(()=> console.log('Tablas sincronizadas'))
    .catch(error => console.log('Error al sincronizar las tablas', error));

module.exports = {sequelize, Usuario, Empleado, Area, Transferencia, Premio, Canje};