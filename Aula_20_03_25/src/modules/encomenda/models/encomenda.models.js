const pool = require("../../../config/database");

class EncomendaModel {
    
    static async criar(id, remetente, destinatario, local_atual, previsao_entrega) {
        const dados = [id, remetente, destinatario, local_atual, previsao_entrega];
        const consulta = `INSERT INTO encomenda (id, remetente, destinatario, local_atual, previsao_entrega) 
            VALUES ($1, $2, $3, $4, $5)  RETURNING *`;
        const novaEncomenda = await pool.query(consulta, dados);
        return novaEncomenda.rows;
    }

    static async editar(id, remetente, destinatario, local_atual, previsao_entrega) {
        const dados = [id, remetente, destinatario, local_atual, previsao_entrega];
        const consulta = `
            UPDATE encomenda SET remetente = $2, destinatario = $3, local_atual = $4, previsao_entrega = $5 
            WHERE id = $1 RETURNING *`;
        const encomendaAtualizada = await pool.query(consulta, dados);
        return encomendaAtualizada.rows;
    }

    static async listarTodos() {
        const consulta = `SELECT * FROM encomenda`;
        const encomenda = await pool.query(consulta);
        return encomenda.rows;
    }

    static async listarPorId(id) {
        const dados = [id];
        const consulta = `SELECT * FROM encomenda WHERE id = $1`;
        const encomenda = await pool.query(consulta, dados);
        return encomenda.rows;
    }

    static async excluirPorId(id) {
        const dados = [id];
        const consulta = `DELETE FROM encomenda WHERE id = $1 RETURNING *`;
        await pool.query(consulta, dados);
<<<<<<< HEAD
=======
        return encomendaExcluida.rows;
>>>>>>> 820fe92d3eae7c8848937d2d999cbbcfe08053f4
    }

    static async excluirTodos() {
        const consulta = `DELETE FROM encomenda`;
        await pool.query(consulta);
    }
}

<<<<<<< HEAD
module.exports = EncomendaModel;
=======
module.exports = EncomendaModel;
>>>>>>> 820fe92d3eae7c8848937d2d999cbbcfe08053f4
