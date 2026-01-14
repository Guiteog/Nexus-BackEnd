const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const{ z } = require('zod');

const schemaUser = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6)
});

class AuthController{
    async register(req, res){
        try{
            const {name, email, password} = schemaUser.parse(req.body);

            //Verificar se o Usuário está no db
            const findUser = await User.findOne({where:{name}});
            if(findUser){return res.status(400).json({error:"Usúario já existe"})}

            //Deixando a senha em hashed
            const hashedPassword = await bcrypt.hash(password, 10)

            //Adicionar o Usuário
            const newUser = await User.create({
                name : name,
                email: email,
                password: hashedPassword
            })

            return res.status(201).json({id: newUser.id, name: newUser.name})
        }catch(error){
            console.error(error)
            return res.status(400).json({error:"Erro no registro"})
            
        }
    }

    async login(req, res){
        try{
            //pegar os dados
            const {email, password} = req.body

            //procurar se o email existe
             const user = await User.findOne({where:{email}});
             if(!user || (! await bcrypt.compare(password, user.password))){return res.status(400).json({error:"Credenciais inválidas"})}

             //Gerar Token do Usuário
             const token = jwt.sign(
                //Payload: arquivos que vou guardar
                {       
                    id: user.id,
                    name: user.name,
                    email: user.email
                },

                //Key do meu token
                process.env.KEY_JWT,

                { expiresIn: '1d' }
             );

             //Retornar
             return res.json({
                user: { id: user.id, name: user.name, email: user.email },
                token
            });

        }catch(error){
            console.error("erro foi: ", error)
            return res.status(400).json({error:"Erro no Login"})
        }
    }
}


module.exports = new AuthController()