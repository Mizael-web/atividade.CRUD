// importando com commonjs
const express = require ("express");
const dotenv  = require ("dotenv");
const alunoRoutes = require('./src/modules/aluno/routes/aluno')

// configurando a biblioteca dotenv
dotenv.config();

//
const port = process.env.PORTA;
const app = express();// instanciando um apolicação

//aplicação use express como json(javascript object notation)
app.use(express.json());


// /aluno/matricula
// /alunos


// concatenação das rotas com o api
app.use(alunoRoutes)


  
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
})



