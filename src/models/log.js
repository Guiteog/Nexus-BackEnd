const {DataTypes} = require('sequelize')
const sequelize = require('../config/database.js')
const User = require('./user');
const transacao = require('./transacao.js')

const logData = sequelize.define('logData',{
    id:{
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull:false
    },

    idTransacao:{
        type: DataTypes.UUID,
        allowNull: false,
    },

    idUser:{
        type: DataTypes.UUID,
        allowNull:false
    },

    action:{
        type: DataTypes.STRING,
        allowNull: false,
    },

    oldValue:{
        type: DataTypes.DECIMAL(10,2),
        allowNull:true
    },
    
    newValue:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    }
},{
    timestamps:true,
    updatedAT:false
})

logData.belongsTo(User, { foreignKey: 'idUser', as: 'usuario' });
logData.belongsTo(transacao, { foreignKey: 'idTransacao', as: 'transacao' });

module.exports=logData;