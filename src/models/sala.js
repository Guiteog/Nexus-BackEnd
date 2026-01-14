const {DataTypes} = require('sequelize')
const sequelize = require('../config/database.js')

const roon = sequelize.define('roon',{
    id:{
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },

    host:{
        type: DataTypes.STRING,
        allowNull: false
    },

    name:{
        type: DataTypes.STRING,
        allowNull:false
    },

    status:{ //public or private
        type: DataTypes.STRING,
        allowNull: false
    },

    password:{
        type:DataTypes.STRING,
        allowNull:true
    },

})

module.exports = roon