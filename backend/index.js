
const express = require ("express");
const dotenv  = require ("dotenv");
const encomendaRoutes = require('./src/modules/encomenda/routes/encomenda.rout');

// configurando a biblioteca dotenv
dotenv.config();

//
const port = process.env.PORTA;
const app = express();// instanciando um apolicação

//aplicação use express como json(javascript object notation)
app.use(express.json());



//encomenda/id
//encomenda


// concatenação das rotas com o api
app.use(encomendaRoutes)


  
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
})