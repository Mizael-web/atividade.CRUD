// Importa o framework Express para criação do servidor
const express = require("express");

// Importa a biblioteca dotenv para lidar com variáveis de ambiente
const dotenv = require("dotenv");

// Configura dotenv para carregar variáveis do arquivo .env
dotenv.config();

// Inicializa o servidor Express
const app = express();

// Middleware para permitir o uso de JSON nas requisições
app.use(express.json());

// Define a porta do servidor, usando a variável de ambiente ou o padrão 3000
const port = process.env.PORTA || 3000;

// Simula um banco de dados com um array vazio
let bancoDados = [];

/**
 * Rota POST - Criar uma nova encomenda
 */
app.post("/encomenda", (req, res) => {
    try {
        // Extrai os dados do corpo da requisição
        const { id, remetente, destinatario, local_atual, previsao_entrega } = req.body;
        
        // Adiciona a nova encomenda ao "banco de dados"
        bancoDados.push({ id, remetente, destinatario, local_atual, previsao_entrega });

        // Retorna mensagem de sucesso
        res.status(201).json({ msg: "Encomenda criada com sucesso" });
    } catch (erro) {
        // Em caso de erro, retorna mensagem de erro
        res.status(500).json({ msg: "Erro ao cadastrar encomenda" });
    }
});

/**
 * Rota GET - Listar todas as encomendas
 */
app.get("/encomenda", (req, res) => {
    // Se não houver encomendas, retorna mensagem informando que não foram encontradas
    if (bancoDados.length === 0) {
        return res.status(404).json({ msg: "Encomenda não encontrada" });
    }
    
    // Retorna todas as encomendas do banco de dados
    res.status(200).json(bancoDados);
});

/**
 * Rota GET - Buscar encomenda por ID
 */
app.get("/encomenda/:id", (req, res) => {
    // Busca a encomenda pelo ID informado na URL
    const encomenda = bancoDados.find(e => e.id === req.params.id);
    
    // Se não encontrar a encomenda, retorna erro 404
    if (!encomenda) return res.status(404).json({ msg: "Encomenda não encontrada." });

    // Retorna os dados da encomenda encontrada
    res.status(200).json(encomenda);
});

/**
 * Rota PUT - Atualizar encomenda pelo ID
 */
app.put("/encomenda/:id", (req, res) => {
    // Procura o índice da encomenda no array
    const index = bancoDados.findIndex(e => e.id === req.params.id);

    // Se a encomenda não for encontrada, retorna erro 404
    if (index === -1) return res.status(404).json({ msg: "Encomenda não encontrada." });

    // Extrai os dados do corpo da requisição
    const { remetente, destinatario, local_atual, previsao_entrega } = req.body;

    // Atualiza apenas os campos enviados, mantendo os existentes caso não sejam informados
    bancoDados[index] = {
        ...bancoDados[index], // Mantém os dados anteriores
        remetente: remetente || bancoDados[index].remetente,
        destinatario: destinatario || bancoDados[index].destinatario,
        local_atual: local_atual || bancoDados[index].local_atual,
        previsao_entrega: previsao_entrega || bancoDados[index].previsao_entrega
    };

    // Retorna mensagem de sucesso (sem exibir os dados)
    res.status(200).json({ msg: "Encomenda atualizada com sucesso" });
});

/**
 * Rota DELETE - Remover encomenda pelo ID
 */
app.delete("/encomenda/:id", (req, res) => {
    // Procura o índice da encomenda no array
    const index = bancoDados.findIndex(e => e.id === req.params.id);

    // Se a encomenda não for encontrada, retorna erro 404
    if (index === -1) return res.status(404).json({ msg: "Encomenda não encontrada." });

    // Remove a encomenda do banco de dados
    bancoDados.splice(index, 1);

    // Retorna mensagem de sucesso (sem exibir os dados)
    res.status(200).json({ msg: "Encomenda deletada com sucesso" });
});

/**
 * Inicializa o servidor na porta definida
 */
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
