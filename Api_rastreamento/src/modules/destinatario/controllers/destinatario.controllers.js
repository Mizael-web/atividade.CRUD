const DestinatarioModel = require("../controllers/destinatario.controllers")


// get =listar, post = criar, put=atualizar, delete = excluir
class DestinatarioController {

  static async criar(requesicao, resposta) {
      try {
          const {id, nome, email, telefone, endereco} = requesicao.body
          if (!id || !nome || !email || !telefone || !endereco)
              return resposta.status(200).json({ mensagem: " todos os campos devem ser preenchidos" })

          const novoDestinatario= await DestinatarioModel.criar(id, nome, email, telefone, endereco)
          resposta.status(201).json({ mensagem: "Destinatario criado com sucesso", destinatario: novoDestinatario })

      } catch (error) {
          resposta.status(500).json({ mensagem: "Erro ao criar o Destinatario!", erro: error.message})
      }
  }


  static async editar(requisicao, resposta) {
      //http://localhost:3000/encomenda/
      try {
          const id = requisicao.params.id;
          const {nome, email, telefone, endereco} = requisicao.body;
          if (!id || !nome || !email || !telefone || !endereço) {
              return resposta.status(400).json(
                  { mensagem: "todos os campos devem ser preenchidos!" });
          }
          const destinatario = await DestinatarioModel.editar(id, nome, email, telefone, endereco );
          if (destinatario.length === 0) {
              return resposta.status(400).json(
                  { mensagem: "Destinatario não encontrado!" });
          }
          resposta.status(200).json(
              {
                  mensagem: "Destinatario atualizado com sucesso", destinatario: destinatario
              });
      } catch (error) {
          resposta.status(500).json(
              {
                  mensagem: "Erro ao editar o destinatario!", erro: error.message
              });
      }
  }


  static async listarTodos(requisicao, resposta) {

      try {
          const destinatario = await DestinatarioModel.listarTodos()
          if (destinatario.length === 0) {
              return resposta.status(400).json({ mensagem: "Não existe destinatario a serem exibidos!"})
          }
          resposta.status(200).json(destinatario)
      } catch (error) {
          resposta.status(500).json({ mensagem: "Erro ao listar os destinatarios!", erro: error.message})
      }
  }

  static async listarPorId(requesicao, resposta) {
      try {
          const id = requesicao.params.id
          const destinatario = await DestinatarioModel.listarPorId(id)
          if (destinatario.length === 0) {
              return resposta.status(201).json({ menssagem: "Destinatario não encontrada!"})
          }
          resposta.status(200).json(destinatario)

      } catch (error) {
          resposta.status(500).json({ mensagem: "Erro ao listar o destinatario!", erro: error.message})

      }
  }


  static async excluirTodos(requisicao, resposta) {
      try {
          await DestinatarioModel.excluirTodos();
          resposta.status(200).json({ mensagem: "Todos os destinatarios foram excluídos com sucesso!" });
      } catch (error) {
          resposta.status(500).json({ mensagem: "Erro ao excluir todos os destinatarios!", erro: error.message});
      }
  }

  static async excluirPorId(requisicao, resposta) {
      try {
          const id = requisicao.params.id;
          const destinatario = await DestinatarioModel.listarPorId(id);
          if (destinatario.length === 0) {
              return resposta.status(400).json({ mensagem: "Destinatario não encontrado!" });
          }
          await DestinatarioModel.excluirPorId(id)
          resposta.status(200).json({ mensagem: "Destinatario excluído com sucesso!" });
      } catch (error) {
          resposta.status(500).json({ mensagem: "Erro ao excluir o destinatario!", erro: error.message });
      }
  }
}

module.exports = DestinatarioController