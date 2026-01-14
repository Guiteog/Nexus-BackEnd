const {DataTypes} = require('sequelize')
const sequelize = require('../config/database.js')

const group = sequelize.define('group',{
    id:{
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },

    idRoom:{
        type: DataTypes.UUID,
        allowNull:false
    },

    idUser:{
        type: DataTypes.UUID,
        allowNull:false
    },

    ruler:{
        type: DataTypes.STRING,
        allowNull:false
    }

});

module.exports=group