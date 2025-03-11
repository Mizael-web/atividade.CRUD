const express = require("express");
const { pool } = require("./src/config/conexao");
const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT || 3001;
const app = express();

// Middleware para permitir JSON e formulários
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rota GET: Listar todas as encomendas
app.get("/db_encomenda", async (req, res) => {
  try {
    const consulta = `SELECT * FROM db_encomenda`;
    const { rows } = await pool.query(consulta);

    if (rows.length === 0) {
      return res.status(200).json({ mensagem: "Banco de dados vazio" });
    }
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao buscar encomendas", erro: error.message });
  }
});

// Rota POST: Criar uma nova encomenda
app.post("/db_encomenda", async (req, res) => {
  try {
    const { remetente, destinatario, local_atual, previsao_entrega } = req.body;

    if (!remetente || !destinatario || !local_atual || !previsao_entrega) {
      return res.status(400).json({ mensagem: "Todos os campos são obrigatórios!" });
    }

    const consulta = `INSERT INTO db_encomenda (remetente, destinatario, local_atual, previsao_entrega) 
                      VALUES ($1, $2, $3, $4) RETURNING *`;

    const { rows } = await pool.query(consulta, [remetente, destinatario, local_atual, previsao_entrega]);

    res.status(201).json({ mensagem: "Encomenda criada com sucesso", encomenda: rows[0] });
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao cadastrar encomenda", erro: error.message });
  }
});

// Rota DELETE: Excluir uma encomenda por ID
app.delete("/db_encomenda/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const consulta = `DELETE FROM db_encomenda WHERE id = $1 RETURNING *`;
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
app.get("/db_encomenda/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const consulta = `SELECT * FROM db_encomenda WHERE id = $1`;
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
app.delete("/db_encomenda", async (req, res) => {
  try {
    // Verificar se há encomendas antes de deletar
    const consultaVerifica = `SELECT * FROM db_encomenda`;
    const { rows } = await pool.query(consultaVerifica);
    if (rows.length === 0) {
      return res.status(404).json({ mensagem: "Nenhuma encomenda para excluir" });
    }

    await pool.query(`DELETE FROM db_encomenda`);
    res.status(200).json({ mensagem: "Todas as encomendas foram excluídas!" });
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao deletar encomendas", erro: error.message });
  }
});

// Iniciando o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
