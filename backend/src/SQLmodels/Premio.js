const {DataTypes} = require('sequelize')
const sequelize = require('../config/sqlDB'); 

const Premio = sequelize.define('Premio',{
    premio_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
        allowNull: false
    },
    stock:{
        type: DataTypes.INTEGER,
        allowNull: false,
        
    }
},{tableName: 'Premios', timestamps: false});

module.exports = Premio;