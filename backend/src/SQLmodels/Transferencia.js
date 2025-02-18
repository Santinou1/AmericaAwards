const {DataTypes} = require('sequelize')
const sequelize = require('../config/sqlDB'); 

const Empleado = require('./Empleado');;

const Transferencia = sequelize.define('Transferencia',{
    transferencia_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha:{
        type: DataTypes.DATE,
        allowNull: false
    },
    puntos:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    emisor_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: Empleado,
            key: 'idEmpleado'
        },
        onDelete: 'CASCADE'
    },	
    receptor_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: Empleado,
            key: 'idEmpleado'
        },
        onDelete: 'CASCADE'
    },
    mensaje:{
        type: DataTypes.STRING(500),
        allowNull: false
    },

},{
    TableName: 'Transferencia',
    timestamps: false,
})

module.exports = Transferencia;