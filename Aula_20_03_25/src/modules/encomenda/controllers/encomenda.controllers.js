const EncomendaModel = require("../models/encomenda.models")

// get =listar, post = criar, put=atualizar, delete = excluir   
class EncomendaController{

    static async criar(requisicao, resposta) {
        try {
            const {id, remetente, destinatario, local_atual, previsao_entrega } = requisicao.body
            if (!id || !remetente || !destinatario || !local_atual || !previsao_entrega)
                return resposta.status(400).json({ mensagem: " todos os campos devem ser preenchidos" })

            const novaEncomenda= await EncomendaModel.criar(id, remetente, destinatario, local_atual, previsao_entrega)
            resposta.status(201).json({ mensagem: "Encomenda criada com sucesso", encomenda: novaEncomenda })

        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao criar a encomenda!", erro: error.message})
        }
    }


    static async editar(requisicao, resposta) {
        //http://localhost:3000/encomenda/
        try {
            const id = requisicao.params.id;
            const {remetente, destinatario, local_atual, previsao_entrega } = requisicao.body
            if (!id || !remetente || !destinatario || !local_atual || !previsao_entrega) {
                return resposta.status(400).json(
                    { mensagem: "todos os campos devem ser preenchidos!" });
            }
            const encomenda = await EncomendaModel.editar(id, remetente, destinatario, local_atual, previsao_entrega)
            if (encomenda.length === 0) {
                return resposta.status(400).json(
                    { mensagem: "Encomenda não encontrada !" });
            }
            resposta.status(200).json(
                {
                    mensagem: "Encomenda atualizada com sucesso", encomenda: encomenda
                });
        } catch (error) {
            resposta.status(500).json(
                {
                    mensagem: "Erro ao editar a Encomenda!", erro: error.messag})
        }
    }


    static async listarTodos(requisicao, resposta) {
        try {
            
            const encomenda = await EncomendaModel.listarTodos()
            if (encomenda.length === 0) {
                return resposta.status(400).json({ mensagem: "Não existe encomenda a serem exibidos!"})
            }
            resposta.status(200).json(encomenda)
        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao listar as encomenda!", erro: error.message})
        }
    }

    static async listarPorId(requisicao, resposta) {
        try {
            const id = requisicao.params.id
            const encomenda = await EncomendaModel.listarPorId(id)
            if (encomenda.length === 0) {
                return resposta.status(400).json({ menssagem: "Encomenda não encontrado!"})
            
        }
            resposta.status(200).json(encomenda)

        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao listar o encomenda!", erro: error.message})

        }
    
    }   


    static async excluirTodos(requisicao, resposta) {
        try {
            await EncomendaModel.excluir();
            resposta.status(200).json({ mensagem: "Todos as encomendas foram excluídos com sucesso!" })
        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao excluir todas as encomendas!", erro: error.message})
        }
    }

    static async excluirPorId(requisicao, resposta) {
        try {
            const id = requisicao.params.id;
            const encomenda = await EncomendaModel.listarPorId(id)
            if (encomenda.length === 0) {
                return resposta.status(400).json({ mensagem: "Encomenda não encontrado!" })
            }
            await AlunoModel.excluirPorId(id)
            resposta.status(200).json({ mensagem: "Ecomenda excluída com sucesso!" })
        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao excluir a encomenda!", erro: error.message })
        }
    }
}

module.exports = EncomendaController