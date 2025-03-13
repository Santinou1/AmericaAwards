const {DataTypes} = require('sequelize');
const sequelize = require('../config/sqlDB');


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
    usuarioPassword: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false},
    rol: {
        type: DataTypes.ENUM('empleado', 'admin'),
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
    
},{
    freezeTableName: true,
    timestamps: false,
}); 

module.exports = Usuario;