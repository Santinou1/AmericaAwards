const sequelize = require('../config/sqlDB');
const Usuario = require('./Usuario');
const Empleado = require('./Empleado');
const Area = require('./Area');


Usuario.belongsTo(Empleado, {foreignKey: 'empleado'});
Empleado.hasOne(Usuario, {foreignKey: 'empleado', onDelete: 'CASCADE'});
Empleado.belongsTo(Area, {foreignKey: 'area'});
Area.hasMany(Empleado, {foreignKey: 'area', onDelete: 'CASCADE'});

sequelize.authenticate()
    .then(() => console.log('Conexión a la base de datos establecida'))
    .catch(error => console.error('Error al conectar con la base de datos:', error));
sequelize.sync({alter: true})
    .then(()=> console.log('Tablas sincronizadas'))
    .catch(error => console.log('Error al sincronizar las tablas', error));

module.exports = {sequelize, Usuario, Empleado, Area};