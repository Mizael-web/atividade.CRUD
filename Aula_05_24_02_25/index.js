// Importando com (commonjs)
const express = require("express");
const { pool } = require('./src/config/database');
const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORTA;
const app = express();

// Aplicação use express como json(javascript object notation)
app.use(express.json());

app.get("/encomenda" (requisicao, resposta) => {
  // tratamento de exceções
  try {
    const consulta = `select * from produto`
    const encomenda = await pool.query(consulta)
    if (endomenda.rows.length === 0) {
      return resposta.status(200).json({mensagem: "Banco de dados vazio"});
    }
    resposta.status(200).json(encomenda.rows);
  } catch (error) {
    resposta.status(500).json({
      mensagem: "Erro ao buscar Endomenda",
      erro: error.message
    });
  }
});

app.post("/encomenda", asynce (requisicao, resposta) => {
  try {
    const {  id, remetente, destinatario, local_atual, previsao_entrega ;
    if (!id || !remetente || !destinatario || !local_atual || !previsao_entrega )
      return resposta.status(200).json({
        mensagem: "Todos os dados devem ser preenchidos!",
      });
    }
    const novoProduto = [id, remetente, destinatario, local_atual, previsao_entrega];
    const consulta = `insert into produto(nome, preco, quantidade) 
                        values ($1, $2, $3) returning *`
    await pool.query(consulta, novoProduto)
    resposta.status(201).json({ mensagem: "Encomenda criada com sucesso" });
  } catch (error) {
    resposta.status(500).json({
      mensagem: "Erro ao cadastrar Encomenda",
      erro: error.message,
    });
  }
});

app.put("/encomenda/:id", async (requisicao, resposta) => {
  try {
    // localhost:3000/produtos/1
    const id = requisicao.params.id;
    const { novoRemetente, novoDestinatario , novoLocal_atual, novaPrevisao_entrega } = requisicao.body;
    if (!id) {
      return resposta.status(404).json({ mensagem: "Informe um paramentro!" });
    }
    const parametro = [id]
    const consulta1 = `select * from produto where id = $1`
    const resultado1 = await pool.query(consulta1, parametro)
    if (resultado1.rows.length === 0) {
      return resposta.status(404).json({ mensagem: " Encomenda não encotrada!" });
    }
    const dados = [id, novoRemetente, novoDestinatario , novoLocal_atual, novaPrevisao_entrega]
    const consulta2 = `update produto set nome = $2, preco = $3, 
                    quantidade = $4 where id = $1 returning *`
    await pool.query(consulta2, dados)
    resposta.status(200).json({ mensagem: "Encomenda atualizado com sucesso!" });
  } catch (error) {
    resposta.status(500).json({
      mensagem: "Erro ao editar Endomenda",
      erro: error.message
    });
  }
});

app.delete("/encomenda/:id", async (requisicao, resposta) => {
  try {
    const id = requisicao.params.id;
    const parametro = [id]
    const consulta1 = `select * from produto where id = $1`
    const resultado1 = await pool.query(consulta1, parametro)
    if (resultado1.rows.length === 0) {
      return resposta.status(404).json({ mensagem: "Encomenda não encontrada" });
    }
    
    
    resposta.status(200).json({ mensagem: "Encomenda deletada com sucesso" });
  } catch (error) {
    resposta.status(500).json({
      mensagem: "Erro ao excluir Encomenda",
      erro: error.message
    });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});