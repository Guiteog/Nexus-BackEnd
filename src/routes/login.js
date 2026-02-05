const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/autenticacaoController.js');

//Login de Usúario
router.post('/login', AuthController.login);

//Cadastro de Usúario
router.post('/register', AuthController.register);

module.exports = router