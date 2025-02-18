const {DataTypes} = require('sequelize');
const sequelize = require('../config/sqlDB');
const Empleado = require('./Empleado');

const Usuario = sequelize.define('Usuario',{
    idUsuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    rol: {
        type: DataTypes.ENUM('empleado', 'administrador'),
        defaultValue: 'empleado'
    },
    saldo_puntos_canjeables: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    saldo_puntos_transferibles: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    empleado:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: Empleado,
            key: 'idEmpleado'
        },onDelete: 'CASCADE'
    }
},{
    TableName: 'usuario',
    timestamps: false,
}); 

module.exports = Usuario;