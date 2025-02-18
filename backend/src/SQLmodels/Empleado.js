const {DataTypes} = require('sequelize');
const sequelize = require('../config/sqlDB');
const Area = require('./Area');

const Empleado = sequelize.define('Empleado',{
    idEmpleado:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    puesto:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    area:{
        type:DataTypes.STRING(50),
        allowNull: false,
        references:{
            model: Area,
            key: 'nombre'
        },
        onDelete: 'CASCADE'
    }
},{
    TableName: 'Empleado',
    timestamps: false,
});

module.exports = Empleado;