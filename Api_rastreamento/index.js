
const express = require ("express");
const dotenv  = require ("dotenv");
const routesDestinatario = require('./src/modules/destinatario/routes/destinatario.rout');
const routerRemetente = require ('./src/modules/remetente/routes/remetente.rout')
const routerEndereco = require ('./src/modules/endereco/routes/endereco.router')

// configurando a biblioteca dotenv
dotenv.config();

//
const port = process.env.PORTA;
const app = express();// instanciando um apolicação

//aplicação use express como json(javascript object notation)
app.use(express.json());


// concatenação das rotas com o api
app.use(routesDestinatario)
app.use(routerRemetente)
app.use(routerEndereco)


  
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
})