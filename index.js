const express = require("express");
const dotenv = require("dotenv");

// Configura dotenv
dotenv.config();

const app = express();
app.use(express.json());

// Porta do servidor
const port = process.env.PORT || 3000;

// Banco de dados simulado
const bancoDados = [];

/**
 * Criar uma encomenda (POST)
 */
app.post("/Encomenda", (req, res) => {
    try {
        const { id, remetente, destinatario, local_atual, Previsao_entrega } = req.body;

        if (!id || !remetente || !destinatario || !local_atual || !Previsao_entrega) {
            return res.status(400).json({ mensagem: "Todos os dados devem ser preenchidos." });
        }

        const idString = String(id);

        if (bancoDados.some(encomenda => encomenda.id === idString)) {
            return res.status(400).json({ mensagem: "Já existe uma encomenda com esse ID." });
        }

        const novaEncomenda = { id: idString, remetente, destinatario, local_atual, Previsao_entrega };
        bancoDados.push(novaEncomenda);

        return res.status(201).json({ mensagem: "Encomenda criada com sucesso.", encomenda: novaEncomenda });

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro ao cadastrar encomenda.", erro: error.message });
    }
});

/**
 * Retornar todas as encomendas (GET)
 */
app.get("/Encomenda", (req, res) => {
    return res.status(200).json(bancoDados);
});

/**
 * Buscar encomenda pelo ID (GET)
 */
app.get("/Encomenda/:id", (req, res) => {
    try {
        const { id } = req.params;
        const encomenda = bancoDados.find(encomenda => encomenda.id === String(id));

        if (!encomenda) {
            return res.status(404).json({ mensagem: "Encomenda não encontrada." });
        }

        return res.status(200).json({ mensagem: "Encomenda encontrada.", encomenda });

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro ao buscar encomenda.", erro: error.message });
    }
});

/**
 * Atualizar encomenda pelo ID (PUT)
 */
app.put("/Encomenda/:id", (req, res) => {
    try {
        const { id } = req.params;
        const { remetente, destinatario, local_atual, Previsao_entrega, status } = req.body;

        const encomenda = bancoDados.find(encomenda => encomenda.id === String(id));

        if (!encomenda) {
            return res.status(404).json({ mensagem: "Encomenda não encontrada." });
        }

        if (!remetente && !destinatario && !local_atual && !Previsao_entrega && !status) {
            return res.status(400).json({ mensagem: "Pelo menos um campo deve ser atualizado." });
        }

        if (remetente) encomenda.remetente = remetente;
        if (destinatario) encomenda.destinatario = destinatario;
        if (local_atual) encomenda.local_atual = local_atual;
        if (Previsao_entrega) encomenda.Previsao_entrega = Previsao_entrega;

        const statusValidos = ["Em trânsito", "Entregue", "Atrasado"];
        if (status) {
            if (!statusValidos.includes(status)) {
                return res.status(400).json({ mensagem: "Status inválido. Use: 'Em trânsito', 'Entregue' ou 'Atrasado'." });
            }
            encomenda.status = status;
        }

        return res.status(200).json({ mensagem: "Encomenda atualizada com sucesso.", encomenda });

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro ao atualizar encomenda.", erro: error.message });
    }
});

/**
 * Excluir encomenda pelo ID (DELETE)
 */
app.delete("/Encomenda/:id", (req, res) => {
    try {
        const { id } = req.params;
        const index = bancoDados.findIndex(encomenda => encomenda.id === String(id));

        if (index === -1) {
            return res.status(404).json({ mensagem: "Encomenda não encontrada." });
        }

        bancoDados.splice(index, 1);
        return res.status(200).json({ mensagem: "Encomenda excluída com sucesso." });

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro ao excluir encomenda.", erro: error.message });
    }
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
