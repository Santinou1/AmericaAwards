const {DataTypes} = require('sequelize');
const sequelize = require('../config/sqlDB');

const Premio = require('./Premio');
const Usuario = require('./Usuario');

const Canje = sequelize.define('Canje',{
    canje_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
    fecha:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    estado:{
        type: DataTypes.ENUM('pendiente','aprobado','rechazado'),
        defaultValue: 'pendiente'
    }
},{tableName: 'Canjes', timestamps: false
});

module.exports = Canje;