
const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

// Simulação de banco de dados
const bancoDados = [];

/**
 * Criar uma encomenda (POST)
 */
app.post("/Encomenda", (req, res) => {
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
    const { id } = req.params;
    const idString = String(id);

    const encomenda = bancoDados.find(encomenda => encomenda.id === idString);

    if (!encomenda) {
        return res.status(404).json({ mensagem: "Encomenda não encontrada." });
    }

    return res.status(200).json(encomenda);
});

/**
 * Atualizar encomenda pelo ID (PUT)
 */
app.put("/Encomenda/:id", (req, res) => {
    const { id } = req.params;
    const idString = String(id);
    const { remetente, destinatario, local_atual, Previsao_entrega, status } = req.body;

    const index = bancoDados.findIndex(encomenda => encomenda.id === idString);

    if (index === -1) {
        return res.status(404).json({ mensagem: "Encomenda não encontrada." });
    }

    if (!remetente && !destinatario && !local_atual && !Previsao_entrega && !status) {
        return res.status(400).json({ mensagem: "Pelo menos um campo deve ser atualizado." });
    }

    if (remetente) bancoDados[index].remetente = remetente;
    if (destinatario) bancoDados[index].destinatario = destinatario;
    if (local_atual) bancoDados[index].local_atual = local_atual;
    if (Previsao_entrega) bancoDados[index].Previsao_entrega = Previsao_entrega;

    const statusValidos = ["Em trânsito", "Entregue", "Atrasado"];
    if (status) {
        if (!statusValidos.includes(status)) {
            return res.status(400).json({ mensagem: "Status inválido. Use: 'Em trânsito', 'Entregue' ou 'Atrasado'." });
        }
        bancoDados[index].status = status;
    }

    return res.status(200).json({ mensagem: "Encomenda atualizada com sucesso.", encomenda: bancoDados[index] });
});

/**
 * Excluir encomenda pelo ID (DELETE)
 */
app.delete("/Encomenda/:id", (req, res) => {
    const { id } = req.params;
    const idString = String(id);

    const index = bancoDados.findIndex(encomenda => encomenda.id === idString);

    if (index === -1) {
        return res.status(404).json({ mensagem: "Encomenda não encontrada." });
    }

    bancoDados.splice(index, 1);
    return res.status(200).json({ mensagem: "Encomenda excluída com sucesso." });
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
