const {DataTypes} = require('sequelize')
const sequelize = require('../config/database.js')
const user = require('./user.js');
const sala = require('./sala.js')

const transacao = sequelize.define('Transação',{
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        autoIncrement: true
    },

    description:{
        type: DataTypes.STRING,
        allowNull:false
    },
    
    amount:{
        type: DataTypes.DECIMAL(10,2),
        allowNull:false
    },

    category:{
        type: DataTypes.STRING,
        allowNull:false
    }
})

user.hasMany(transacao, { foreignKey: 'userId' });
transacao.belongsTo(user, { foreignKey: 'userId' });

user.hasMany(transacao, { foreignKey: 'roonId' });
transacao.belongsTo(sala, { foreignKey: 'roonId' });

module.exports= transacao