const express = require("express");
const dotenv = require("dotenv");
const { pool } = require("./src/config/conexao");
const app = express ();
dotenv.config();

const port = process.env.PORT || 3001;


// Middleware para permitir JSON e formulários
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// Rota GET: Listar todas as encomendas
app.get("/encomenda", async (req, res) => {
  try {
    const consulta = `select * from encomenda`;
    const encomenda = await pool.query(consulta);

    if (encomenda.rows.length === 0) {
      return res.status(200).json({ mensagem: "Banco de dados vazio" });
    }
    res.status(200).json(encomenda.rows);
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao buscar encomendas", erro: error.message });
  }
});

// Rota POST: Criar uma nova encomenda
app.post("/encomenda", async (req, res) => {
  try {
    const { remetente, destinatario, local_atual, previsao_entrega } = req.body;

    if (!remetente || !destinatario || !local_atual || !previsao_entrega) {
      return res.status(400).json({ mensagem: "Todos os campos são obrigatórios!" });
    }

    const consulta = `INSERT INTO encomenda (remetente, destinatario, local_atual, previsao_entrega) 
                      VALUES ($1, $2, $3, $4) RETURNING *`;

    const { rows } = await pool.query(consulta, [remetente, destinatario, local_atual, previsao_entrega]);

    res.status(201).json({ mensagem: "Encomenda criada com sucesso", encomenda: rows[0] });
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao cadastrar encomenda", erro: error.message });
  }
});

// * Rota PUT - Atualizar encomenda pelo ID

app.put("/encomenda/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { remetente, destinatario, local_atual, previsao_entrega } = req.body;

    // Verifica se a encomenda existe antes de atualizar
    const buscaEncomenda = await pool.query("SELECT * FROM encomenda WHERE id = $1", [id]);

    if (buscaEncomenda.rows.length === 0) {
      return res.status(404).json({ msg: "Encomenda não encontrada." });
    }

    const encomendaAtual = buscaEncomenda.rows[0];

    // Atualiza apenas os campos informados mantendo os existentes
    const consulta = `
      UPDATE encomenda 
      SET remetente = $1, 
          destinatario = $2, 
          local_atual = $3, 
          previsao_entrega = $4
      WHERE id = $5 RETURNING *`;

    const { rows } = await pool.query(consulta, [
      remetente || encomendaAtual.remetente,
      destinatario || encomendaAtual.destinatario,
      local_atual || encomendaAtual.local_atual,
      previsao_entrega || encomendaAtual.previsao_entrega,
      id
    ]);

    res.status(200).json({ msg: "Encomenda atualizada com sucesso", encomenda: rows[0] });
  } catch (error) {
    res.status(500).json({ msg: "Erro ao atualizar encomenda", erro: error.message });
  }
});


// Rota DELETE: Excluir uma encomenda por ID
app.delete("/encomenda/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const consulta = `DELETE FROM encomenda WHERE id = $1 RETURNING *`;
    const { rows } = await pool.query(consulta, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ mensagem: "Encomenda não encontrada" });
    }

    res.status(200).json({ mensagem: "Encomenda deletada com sucesso" });
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao excluir encomenda", erro: error.message });
  }
});

// Rota GET: Buscar encomenda por ID
app.get("/encomenda/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const consulta = `SELECT * FROM encomenda WHERE id = $1`;
    const { rows } = await pool.query(consulta, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ mensagem: "Encomenda não encontrada" });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao buscar encomenda", erro: error.message });
  }
});

// Rota DELETE: Excluir todas as encomendas
app.delete("/encomenda", async (req, res) => {
  try {
    // Verificar se há encomendas antes de deletar
    const consultaVerifica = `SELECT * FROM encomenda`;
    const { rows } = await pool.query(consultaVerifica);
    if (rows.length === 0) {
      return res.status(404).json({ mensagem: "Nenhuma encomenda para excluir" });
    }

    await pool.query(`DELETE FROM encomenda`);
    res.status(200).json({ mensagem: "Todas as encomendas foram excluídas!" });
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao deletar encomendas", erro: error.message });
  }
});

// Iniciando o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
