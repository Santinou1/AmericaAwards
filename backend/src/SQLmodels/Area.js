const {DataTypes} = require('sequelize');
const sequelize = require('../config/sqlDB');

const Area = sequelize.define('Area',{
    nombre:{
        type: DataTypes.STRING(50),
        primaryKey: true,
        allowNull: false,
    },
},{
    TableName: 'Areas',
    timestamps: false,
})


module.exports = Area;