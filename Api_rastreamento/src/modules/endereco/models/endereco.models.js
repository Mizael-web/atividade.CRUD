const axios = require ("axios")
const { pool } = require("../../../config/database")

class EnderecoModel{
    static async criarEndereco(id, cep, rua){ // 0000000
        const resposta = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        // Desestruturação do objeto 
        const {numero, bairro, cidade, estado } = resposta.data    

        // Montando o array para a query
        const dados = [
            id,
            cep,
            rua, // posicao 2
            numero,         
            bairro, 
            cidade, 
            estado,             
        ]

        const consulta = `insert into endereco(id, cep, rua, numero, bairro, cidade, estado )
        values($1,$2,$3,$4,$5,$6,$7) returning *
        `
        const resultado = await pool.query(consulta, dados)
        return resultado.rows
    }
    static async editarEndereco(id, cep, rua){
        const resposta = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        const { numero, bairro, cidade, estado} = resposta.data
        const dados = [
            id,
            cep,
            rua, // posicao 2
            numero,         
            bairro, 
            cidade, 
            estado,             
        ]
       
        
        const consulta = `insert into endereco(id, cep, rua, numero, bairro, cidade, estado )
        values($1,$2,$3,$4,$5,$6,$7) returning *
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
        const consulta = `select * from endereco where (loclizado) lower like lower($1)`
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