const express = require('express')
const router = express.Router();
const transacaoController = require('../controllers/despesasController');

//Cadastro de transacao entrada/saída
router.post('/create', transacaoController.store);

//Update de transacao
router.put('/update', transacaoController.update);

//Excluir
router.delete('/delete', transacaoController.delete);

module.exports = router