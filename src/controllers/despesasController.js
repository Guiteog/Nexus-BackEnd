const transacao = require('../models/transacao');
const log = require('../models/log');
const verificarDespesa = require('../validators/expense');

//=====Db=====
const transacao = require('../models/transacao')

//o Usuário pode criar, mudar, deletar e listar
class transacaoController{
    async store(req, res){
        try{
            const {description, amount, category} = verificarDespesa.valDespesa.parse(req.body);

            //Criando a transacao
            const newDespesa = await transacao.create({
                description: description,
                amount: amount,
                category: category,
                userId: req.userId
            })

            //Criando um historico
            await log.create({
                action:'CREATE',
                idDespesa:  newDespesa.id,
                idUser: userId,
                oldValue:null,
                newValue:amount
            })

            return res.status(201).json({description: newDespesa.description, amount: newDespesa.amount, category: newDespesa.category})
        }catch(error){
            return res.status(400).json({error:"Erro na validação de dados"})
        }
    }

    async update(req, res){
        try{
            //Dados que chegou
            const dataExpense = verificarDespesa.editorDespesa.parse(req.body)

            //Pesquisar e salvar
            const { id } = req.params; //Chave da despesa
            const userId = req.userId;
            const findExpense = await transacao.findByPk(id)

            if(!findExpense){return res.status(404).json({error:"Despesa não encontrada"})}

            const oldValue = findExpense.amount

            //Criação da transacao e log
            await transacao.update(findExpense)

            await log.create({
                action:'UPDATE',
                idDespesa:  id,
                idUser: userId,
                oldValue:oldValue,
                newValue:amount
            })

            return res.status(200).json({dataExpense})
        }catch(error){
            return res.status(400).json({ error: "Dados inválidos" });
        }
    }

    async delete(req, res){
        try{
            //Verificar os dados
            const {id} = req.params; //Chave da despesa

            const findUUID = await transacao.findByPk(id) 
            if(!findUUID){return res.status(404).json({error:"Despesa não encontrada"})}
            const userId = req.userId

            await transacao.destroy(findUUID.id)

            await log.create({
                action:'DELETE',
                idDespesa:  id,
                idUser: userId,
                oldValue:null,
                newValue:null
            })
            return res.status(201).json({status:'apagado'})
        }catch(error){return res.status(500).json({ error: "Erro ao deletar os dados" });}
    }
    
    //Deixar para fazer depois
    async listerAll(req, res){
        try{

        }catch(error){
            
        }
    }
}

module.exports = new transacaoController()