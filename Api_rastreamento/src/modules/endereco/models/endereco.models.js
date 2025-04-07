const axios = require ("axios");
const { pool } = require("../../../config/database");

class EnderecoModel{
    static async criarEndereco(cep, numero){ // 0000000
        const resposta = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        // Desestruturação do objeto 
        const {logradouro, bairro, localidade, uf } = resposta.data    

        // Montando o array para a query
        const dados = [
            cep,
            logradouro, 
            numero,         
            bairro, 
            localidade, 
            uf            
        ]

        const consulta = `insert into endereco(cep, logradouro, numero, bairro, localidade, uf )
        values($1,$2,$3,$4,$5,$6) returning *
        `
        const resultado = await pool.query(consulta, dados)
        return resultado.rows
    }
    static async editarEndereco(cep, numero){
        const resposta = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        const {logradouro, bairro, localidade, uf} = resposta.data
        const dados = [
            cep,
            logradouro,
            numero,         
            bairro, 
            localidade, 
            uf,             
        ]
       
        
        const consulta = `insert into endereco(cep, logradouro, numero, bairro, localidade, uf )
        values($1,$2,$3,$4,$5,$6) returning *
        `

        const resultado = await pool.query(consulta, dados)
        return resultado.rows

    }
    static async listarEnderecoCEP(cep){ //59000000
        const dados = [cep]
        const consulta = `select * from endereco where cep = $1`
        const resultado = await pool.query(consulta, dados)
        return resultado.rows
    }
    static async listarEnderecoCidade(cidade){
        const dados = [`%${cidade}%`]
        const consulta = `select * from endereco where (localidade) lower like lower($1)`
        const resultado = await pool.query(consulta, dados)
        return resultado.rows
    }
    static async listarEnderecos(){
        const consulta = `select * from endereco`
        const resultado = await pool.query(consulta)
        return resultado.rows
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

module.exports = EnderecoModel