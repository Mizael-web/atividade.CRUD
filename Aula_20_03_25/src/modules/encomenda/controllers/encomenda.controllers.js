const EncomendaModel = require("../models/encomenda.models")

<<<<<<< HEAD
// get =listar, post = criar, put=atualizar, delete = excluir
class EncomendaController {
=======
// get =listar, post = criar, put=atualizar, delete = excluir   
class EncomendaController{
>>>>>>> 820fe92d3eae7c8848937d2d999cbbcfe08053f4

    static async criar(requisicao, resposta) {
        try {
            const {id, remetente, destinatario, local_atual, previsao_entrega } = requisicao.body
            if (!id || !remetente || !destinatario || !local_atual || !previsao_entrega)
                return resposta.status(400).json({ mensagem: " todos os campos devem ser preenchidos" })

<<<<<<< HEAD
            const {id, remetente, destinatario, local_atual, previsao_entrega } = requesicao.body
            if (!id || !remetente || !destinatario || !local_atual || !previsao_entrega)
                return resposta.status(200).json({ mensagem: " todos os campos devem ser preenchidos" })

=======
>>>>>>> 820fe92d3eae7c8848937d2d999cbbcfe08053f4
            const novaEncomenda= await EncomendaModel.criar(id, remetente, destinatario, local_atual, previsao_entrega)
            resposta.status(201).json({ mensagem: "Encomenda criada com sucesso", encomenda: novaEncomenda })

        } catch (error) {
<<<<<<< HEAD
            resposta.status(500).json({ mensagem: "Erro ao criar a Encomenda!", erro: error.message})
=======
            resposta.status(500).json({ mensagem: "Erro ao criar a encomenda!", erro: error.message})
>>>>>>> 820fe92d3eae7c8848937d2d999cbbcfe08053f4
        }
    }


    static async editar(requisicao, resposta) {
        //http://localhost:3000/encomenda/
        try {
            const id = requisicao.params.id;
<<<<<<< HEAD
            const {remetente, destinatario, local_atual, previsao_entrega } = requisicao.body;
=======
            const {remetente, destinatario, local_atual, previsao_entrega } = requisicao.body
>>>>>>> 820fe92d3eae7c8848937d2d999cbbcfe08053f4
            if (!id || !remetente || !destinatario || !local_atual || !previsao_entrega) {
                return resposta.status(400).json(
                    { mensagem: "todos os campos devem ser preenchidos!" });
            }
<<<<<<< HEAD
            const encomenda = await EncomendaModel.editar(id, remetente, destinatario, local_atual, previsao_entrega );
            if (encomenda.length === 0) {
                return resposta.status(400).json(
                    { mensagem: "Encomenda não encontrada!" });
=======
            const encomenda = await EncomendaModel.editar(id, remetente, destinatario, local_atual, previsao_entrega)
            if (encomenda.length === 0) {
                return resposta.status(400).json(
                    { mensagem: "Encomenda não encontrada !" });
>>>>>>> 820fe92d3eae7c8848937d2d999cbbcfe08053f4
            }
            resposta.status(200).json(
                {
                    mensagem: "Encomenda atualizada com sucesso", encomenda: encomenda
                });
        } catch (error) {
            resposta.status(500).json(
                {
<<<<<<< HEAD
                    mensagem: "Erro ao editar a Encomenda!", erro: error.message
                });
=======
                    mensagem: "Erro ao editar a Encomenda!", erro: error.messag})
>>>>>>> 820fe92d3eae7c8848937d2d999cbbcfe08053f4
        }
    }


    static async listarTodos(requisicao, resposta) {
        try {
<<<<<<< HEAD
=======
            
>>>>>>> 820fe92d3eae7c8848937d2d999cbbcfe08053f4
            const encomenda = await EncomendaModel.listarTodos()
            if (encomenda.length === 0) {
                return resposta.status(400).json({ mensagem: "Não existe encomenda a serem exibidos!"})
            }
            resposta.status(200).json(encomenda)
        } catch (error) {
<<<<<<< HEAD
            resposta.status(500).json({ mensagem: "Erro ao listar as encomendas!", erro: error.message})
        }
    }

    static async listarPorId(requesicao, resposta) {
        try {
            const id = requesicao.params.id
            const aluno = await EncomendaModel.listarPorMatricula(id)
            if (endomenda.length === 0) {
                return resposta.status(201).json({ menssagem: "Encomenda não encontrada!"})
            }
            resposta.status(200).json(aluno)

        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao listar a encomenda!", erro: error.message})
=======
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
>>>>>>> 820fe92d3eae7c8848937d2d999cbbcfe08053f4

        }
    
    }   


    static async excluirTodos(requisicao, resposta) {
        try {
<<<<<<< HEAD
            await EncomendaModel.excluirTodos();
            resposta.status(200).json({ mensagem: "Todas as encomendas foram excluídos com sucesso!" });
        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao excluir todas as encomendas!", erro: error.message});
=======
            await EncomendaModel.excluir();
            resposta.status(200).json({ mensagem: "Todos as encomendas foram excluídos com sucesso!" })
        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao excluir todas as encomendas!", erro: error.message})
>>>>>>> 820fe92d3eae7c8848937d2d999cbbcfe08053f4
        }
    }

    static async excluirPorId(requisicao, resposta) {
        try {
            const id = requisicao.params.id;
<<<<<<< HEAD
            const encomenda = await EncomendaModel.listarPorId(id);
            if (encomenda.length === 0) {
                return resposta.status(400).json({ mensagem: "Encomenda não encontrada!" });
            }
            await EncomendaModel.excluirPorId(id)
            resposta.status(200).json({ mensagem: "Encomenda excluída com sucesso!" });
        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao excluir o encomenda!", erro: error.message });
=======
            const encomenda = await EncomendaModel.listarPorId(id)
            if (encomenda.length === 0) {
                return resposta.status(400).json({ mensagem: "Encomenda não encontrado!" })
            }
            await AlunoModel.excluirPorId(id)
            resposta.status(200).json({ mensagem: "Ecomenda excluída com sucesso!" })
        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao excluir a encomenda!", erro: error.message })
>>>>>>> 820fe92d3eae7c8848937d2d999cbbcfe08053f4
        }
    }
}

module.exports = EncomendaController