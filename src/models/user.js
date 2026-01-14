const {DataTypes} = require('sequelize')
const sequelize = require('../config/database.js')


const User = sequelize.define('User',{
    id:{
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },

    name:{ 
       type: DataTypes.STRING,
       allowNull:false
    },

    email: {
        type:DataTypes.STRING,
        allowNull: false
    },

    password: {
        type:DataTypes.STRING,
        allowNull: false
    }
});


module.exports = User;