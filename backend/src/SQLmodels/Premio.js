const {DataTypes} = require('sequelize')
const sequelize = require('../config/sqlDB'); 

const Premio = sequelize.define('Premio',{
    premio_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'premio_id'
    },
    nombre:{
        type: DataTypes.STRING(200),
        allowNull: false
    },
    descripcion:{
        type: DataTypes.STRING(500),
        allowNull: false
    },
    imagen_url:{
        type: DataTypes.STRING(500),
        allowNull: false,
        defaultValue: 'https://via.placeholder.com/300x200',
    },
    costo_puntos: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0
        }
    },
    stock:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
            min: 0
        }
    }
},{freezeTableName: true, timestamps: false});

module.exports = Premio;