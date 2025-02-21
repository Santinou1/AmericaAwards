const {DataTypes} = require('sequelize')
const sequelize = require('../config/sqlDB'); 
const Usuario = require('./Usuario');

const Transferencia = sequelize.define('Transferencia', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    puntos: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1
        }
    },
    emisor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'idUsuario'
        },
        onDelete: 'CASCADE'
    },	
    receptor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'idUsuario'
        },
        onDelete: 'CASCADE'
    },
    mensaje: {
        type: DataTypes.STRING(500),
        allowNull: true
    }
}, {
    tableName: 'Transferencias',
    timestamps: false
});

module.exports = Transferencia;