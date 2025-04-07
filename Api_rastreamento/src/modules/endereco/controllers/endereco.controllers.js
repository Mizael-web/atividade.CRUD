const EnderecoModel = require('../models/endereco.models')

class EnderecoController{
    static async criarEndereco(requisicao, resposta){
        try {
            const {id, cep, rua, numero, bairro, cidade, estado } = requisicao.body
            if(!id || !cep || !rua || !numero || !bairro || !cidade || !estado){
                return resposta.status(400).json({mensagem: 'Todos os campos devem ser preenchidos!'})
            }
            const endereco = await EnderecoModel.criarEndereco(id, cep, rua, numero, bairro, cidade, estado )
            resposta.status(201).json({mensagem: 'Endereco criado com sucesso!',endereco: endereco})
        } catch (error) {
            resposta.status(500).json({mensagem: 'Erro interno do servidor. Por favor tente mais tarde!', erro: error.message})
        }
    }
    static async editarEndereco(requisicao, resposta){
        try {
            // http://localhost:3000/endereco/a1234
            const id = requisicao.params
            const {cep, rua, numero, bairro, cidade, estado} = requisicao.body
            if(!cep || !numero){
                return resposta.status(400).json({mensagem: 'Todos os campos devem ser fornecidos!'})
            }
            const endereco = await EnderecoModel.editarEndereco(id, cep, rua, numero, bairro, cidade, estado )
            if(endereco.length === 0){
                return resposta.status(404).json({mensagem: 'Endereço não encontrado!'})
            }
            resposta.status(200).json({mensagem: 'Endereço atualizado com sucesso', endereco: endereco})
        } catch (error) {
            resposta.status(500).json({mensagem: 'Erro interno do servidor. Por favor tente mais tarde!', erro: error.message})
        }
    }
    static async listarEnderecoCEP(requisicao, resposta){
        try {
            // http://localhost:3000/endereco/cep/59000000
            const cep = requisicao.params.cep
            const endereco = await EnderecoModel.listarEnderecoCEP(cep)//59000000
            if(endereco.length === 0){
                return resposta.status(404).json({mensagem: 'Cep não existe ou invalido!'})
            }
            resposta.status(200).json(endereco)
        } catch (error) {
            resposta.status(500).json({mensagem: 'Erro interno do servidor. Por favor tente mais tarde!', erro: error.message})
        }
    }
    static async listarEnderecoCidade(requisicao, resposta){
        try {
            // http://localhost:3000/endereco/cidade/natal
            const cidade = requisicao.params.cidade
            const endereco = await EnderecoModel.listarEnderecoCidade(cidade)
            if(endereco.length === 0){
                return resposta.status(404).json({mensagem: 'Cidade não existe ou invalida!'})
            }
            resposta.status(200).json(endereco)
        } catch (error) {
            resposta.status(500).json({mensagem: 'Erro interno do servidor. Por favor tente mais tarde!', erro: error.message})
        }
    }
    static async listarEnderecos(requisicao, resposta){
        try {
            const enderecos = await EnderecoModel.listarEnderecos()
            if(enderecos.length === 0){
                return resposta.status(404).json({mensagem: 'Não há registros a serem exibidos!'})
            }
            resposta.status(200).json(enderecos)
        } catch (error) {
            resposta.status(500).json({mensagem: 'Erro interno do servidor. Por favor tente mais tarde!', erro: error.message})
        }
    }
           static async listarEnderecoDestinatario(id){
                const dados = [id]
                const consulta = `
                select destinatario.id, destinatario.nome, endereco.* from destinatario
                join endereco on destinatario.id = endereco.id
                where destinatario.id = $1
                `
                const resultado = await pool.query(consulta, dados)
                return resultado.rows
            } 
        
    }
  
    

module.exports = EnderecoController