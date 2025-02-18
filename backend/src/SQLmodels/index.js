const { Sequelize, Op } = require('sequelize');
const sequelize = require('../config/sqlDB');
const Usuario = require('./Usuario');
const Empleado = require('./Empleado');
const Area = require('./Area');
const Transferencia = require('./Transferencia');
const Premio = require('./Premio');
const Canje = require('./Canje');

Usuario.belongsTo(Empleado, {foreignKey: 'empleado'});
Empleado.hasOne(Usuario, {foreignKey: 'empleado', onDelete: 'CASCADE'});
Empleado.belongsTo(Area, {foreignKey: 'area'});
Area.hasMany(Empleado, {foreignKey: 'area', onDelete: 'CASCADE'});
Transferencia.belongsTo(Empleado, {foreignKey: 'emisor_id'});
Transferencia.belongsTo(Empleado, {foreignKey: 'receptor_id'});
Empleado.hasMany(Transferencia, {foreignKey: 'emisor_id', onDelete: 'CASCADE'});
Empleado.hasMany(Transferencia, {foreignKey: 'receptor_id', onDelete: 'CASCADE'});
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


const queryInterface = sequelize.getQueryInterface();
queryInterface.addConstraint('Premios', {
    fields:['stock'],
    type: 'check',
    where: {
        stock: {
            [Op.gte]: 0
        }
    }
});
module.exports = {sequelize, Usuario, Empleado, Area, Transferencia, Premio, Canje};