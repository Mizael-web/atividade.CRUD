const EnderecoModel = require('../models/endereco.models')

class EnderecoController{
    static async criarEndereco(requisicao, resposta){
        try {
            const {cep, numero } = requisicao.body
            if(!cep || !numero ){
                return resposta.status(400).json({mensagem: 'Todos os campos devem ser preenchidos!'})
            }
            const endereco = await EnderecoModel.criarEndereco( cep, numero)
            resposta.status(201).json({mensagem: 'Endereco criado com sucesso!',endereco: endereco})
        } catch (error) {
            resposta.status(500).json({mensagem: 'Erro interno do servidor. Por favor tente mais tarde!', erro: error.message})
        }
    }
    static async editarEnderecoDestinatario(requisicao, resposta){
        try {
            // http://localhost:3000/endereco/a1234
            const id = requisicao.params
            const {cep, logradouro, numero,  bairro, localidade, uf } = requisicao.body
            if(!cep || !logradouro|| !numero || ! bairro || ! localidade || !uf){
                return resposta.status(400).json({mensagem: 'Todos os campos devem ser fornecidos!'})
            }
            const endereco = await EnderecoModel.editarEndereco(cep, logradouro, numero,  bairro, localidade, uf  )
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
           static async listarEnderecoDestinatario(requisicao, resposta){
            try {
                const id = requisicao.params.id
                const endereco = await EnderecoModel.listarEndereco(id)
                if(endereco.length === 0){
                    return resposta.status(404).json({mensagem: 'Não há registros a serem exibidos!'})
                }
                resposta.status(200).json(endereco)
            } catch (error) {
                resposta.status(500).json({mensagem: 'Erro interno do servidor. Por favor tente mais tarde!', erro: error.message})
            }
            } 
        
    } 
    

module.exports = EnderecoController