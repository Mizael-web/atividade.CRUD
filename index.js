const express = require("express");
const dotenv = require("dotenv");

// Inicializando o servidor e carregando variáveis de ambiente
dotenv.config();
const app = express();
app.use(express.json());

const port = process.env.PORTA || 3000;
let bancoDados = [];

// Rota POST - Criar encomenda
app.post("/encomenda", (req, res) => {
    try {
        const { id, remetente, destinatario, local_atual, previsao_entrega } = req.body;
        bancoDados.push({ id, remetente, destinatario, local_atual, previsao_entrega });
        res.status(201).json({ msg: "Encomenda criada com sucesso" });
    } catch (erro) {
        res.status(500).json({ msg: "Erro ao cadastrar encomenda" });
    }
});

// Rota GET - Listar todas as encomendas
app.get("/encomenda", (req, res) => {
    if (bancoDados.length === 0) {
        return res.status(404).json({ msg: "Encomenda não encontrada" });
    }
    res.status(200).json(bancoDados);
});

// Rota GET - Buscar encomenda por ID
app.get("/encomenda/:id", (req, res) => {
    const encomenda = bancoDados.find(e => e.id === req.params.id);
    if (!encomenda) return res.status(404).json({ msg: "Encomenda não encontrada." });
    res.status(200).json(encomenda);
});

// Rota PUT - Atualizar encomenda por ID
app.put("/encomenda/:id", (req, res) => {
    const index = bancoDados.findIndex(e => e.id === req.params.id);
    if (index === -1) return res.status(404).json({ msg: "Encomenda não encontrada." });

    const { remetente, destinatario, local_atual, previsao_entrega } = req.body;

    bancoDados[index] = {
        ...bancoDados[index],
        remetente: remetente || bancoDados[index].remetente,
        destinatario: destinatario || bancoDados[index].destinatario,
        local_atual: local_atual || bancoDados[index].local_atual,
        previsao_entrega: previsao_entrega || bancoDados[index].previsao_entrega
    };

    res.status(200).json({ msg: "Encomenda atualizada com sucesso" });
});

// Rota DELETE - Remover encomenda por ID
app.delete("/encomenda/:id", (req, res) => {
    const index = bancoDados.findIndex(e => e.id === req.params.id);
    if (index === -1) return res.status(404).json({ msg: "Encomenda não encontrada." });

    bancoDados.splice(index, 1);
    res.status(200).json({ msg: "Encomenda deletada com sucesso" });
});

// Iniciando o servidor
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
