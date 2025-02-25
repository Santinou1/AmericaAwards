const {DataTypes} = require('sequelize');
const sequelize = require('../config/sqlDB');

const Premio = require('./Premio');
const Usuario = require('./Usuario');

const Canje = sequelize.define('Canje',{
    canje_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'canje_id'
    },
    usuario_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: Usuario,
            key: 'idUsuario'
        },
        onDelete: 'CASCADE'
    },
    premio_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: Premio,
            key: 'premio_id'
        },
        onDelete: 'CASCADE'
    },
    cantidad:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        validate: {
            min: 1
        }
    },
    fecha:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    estado:{
        type: DataTypes.ENUM('pendiente','aprobado','rechazado'),
        defaultValue: 'pendiente'
    }
},{freezeTableName:true, timestamps: false
});

module.exports = Canje;