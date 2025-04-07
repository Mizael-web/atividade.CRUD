const express = require('express');

const EnderecoController = require('../controllers/endereco.controllers');

const router = express.Router();

// Buscar todos enderecos http://localhost:3000/endereco
router.get('/endereco', EnderecoController.listarEnderecos)

// Buscar endereco pelo CEP http://localhost:3000/endereco/cep/590000000
router.get('/endereco/cep/:cep',EnderecoController.listarEnderecoCEP)

// Buscar endereco pelo CIDADE http://localhost:3000/endereco/cidade/natal
router.get('/endereco/cidade/:cidade', EnderecoController.listarEnderecoCidade)

// Buscar endereco por id destinatario http://localhost:3000/endereco/destinatario/a1234
router.get('/endereco/destinatario/:id', EnderecoController.listarEnderecoDestinatario)

// Criar endereco destinatario http://localhost:3000/endereco
router.post('/endereco', EnderecoController.criarEndereco)

// Editar endereco destinatario por id http://localhost:3000/endereco/a1234
router.put('/endereco/:id', EnderecoController.editarEnderecoDestinatario)

module.exports = router