const RemetenteModel = require("../models/remetente.models")

// get =listar, post = criar, put=atualizar, delete = excluir
class RemetenteController {

    static async criar(requesicao, resposta) {
        try {
            const {id, nome, email, telefone} = requesicao.body
            if (!id || !nome || !email || !telefone)
                return resposta.status(200).json({ mensagem: " todos os campos devem ser preenchidos" })

            const novoRemetente= await RemetenteModel.criar(id, nome, email, telefone)
            resposta.status(201).json({ mensagem: "Remetente criado com sucesso", remetente: novoRemetente })

        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao criar o Remetente!", erro: error.message})
        }
    }


    static async editar(requisicao, resposta) {
        //http://localhost:3000/encomenda/
        try {
            const id = requisicao.params.id;
            const {nome, email, telefone} = requisicao.body;
            if (!id || !nome || !email || !telefone) {
                return resposta.status(400).json(
                    { mensagem: "todos os campos devem ser preenchidos!" });
            }
            const remetente = await RemetenteModel.editar(id, nome, email, telefone );
            if (remetente.length === 0) {
                return resposta.status(400).json(
                    { mensagem: "Remetente não encontrado!" });
            }
            resposta.status(200).json(
                {
                    mensagem: "Remetente atualizado com sucesso", encomenda: encomenda
                });
        } catch (error) {
            resposta.status(500).json(
                {
                    mensagem: "Erro ao editar o remetente!", erro: error.message
                });
        }
    }


    static async listarTodos(requisicao, resposta) {

        try {
            const remetente = await RemetenteModel.listarTodos()
            if (remetente.length === 0) {
                return resposta.status(400).json({ mensagem: "Não existe remetente a serem exibidos!"})
            }
            resposta.status(200).json(encomenda)
        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao listar os remetentes!", erro: error.message})
        }
    }

    static async listarPorId(requesicao, resposta) {
        try {
            const id = requesicao.params.id
            const remetente = await RemetenteModel.listarPorId(id)
            if (remetente.length === 0) {
                return resposta.status(201).json({ menssagem: "Remetente não encontrada!"})
            }
            resposta.status(200).json(remetente)

        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao listar o remetente!", erro: error.message})

        }
    }


    static async excluirTodos(requisicao, resposta) {
        try {
            await RemetenteModel.excluirTodos();
            resposta.status(200).json({ mensagem: "Todos os remetentes foram excluídos com sucesso!" });
        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao excluir todos os remetentes!", erro: error.message});
        }
    }

    static async excluirPorId(requisicao, resposta) {
        try {
            const id = requisicao.params.id;
            const remetente = await RemetenteModel.listarPorId(id);
            if (remetente.length === 0) {
                return resposta.status(400).json({ mensagem: "Remetente não encontrado!" });
            }
            await RemetenteModel.excluirPorId(id)
            resposta.status(200).json({ mensagem: "Remetente excluído com sucesso!" });
        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao excluir o remetente!", erro: error.message });
        }
    }
}

module.exports = RemetenteController