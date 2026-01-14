//=====Stacks=====
require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
require('dotenv').config(); 
//=====Routes=====
const authRoutes = require('./routes/login');
const fluxoRoutes = require('./routes/fluxoRoute')


//=====Express config=====
const app = express();
app.use(cors());
app.use(express.json())

//=====Conexão=====
async function startApp(){
    try{
        await sequelize.authenticate();
        console.log("Conexão com o MySql");

        await sequelize.sync({alter:true})
        const PORT = process.env.PORT || 3000
        app.listen(PORT, () =>{
            console.log(`Servidor Roodando na Porta: ${PORT}`)
            sequelize.authenticate()
            .then(() => console.log('✅ Conexão com o Supabase estabelecida com sucesso!'))
            .catch(err => console.error('❌ Erro ao conectar com o banco:', err));
        })
    }
    catch (error) {
        console.error('❌ Erro ao iniciar o servidor:', error);
    }
}

//=====Routes Serve=====//
app.use('/auth', authRoutes);
app.use('/fluxo', fluxoRoutes);

startApp()