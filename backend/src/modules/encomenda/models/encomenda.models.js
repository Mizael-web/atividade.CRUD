const {pool}= require ("../../../config/database")


class  EncomendaModel {

   static async criar(id, remetente, destinatario, local_atual, previsao_entrega){
       const dados = [id, remetente, destinatario, local_atual, previsao_entrega]
       const consulta = `insert into encomenda(id, remetente, destinatario, local_atual, previsao_entrega) values ( $1, $2, $3, $4, $5) returning *`
       const novaEncomenda = await pool.query(consulta, dados)
       return novaEncomenda.rows    

   }
   static async editar(id, remetente, destinatario, local_atual, previsao_entrega){
       const dados = [id, remetente, destinatario, local_atual, previsao_entrega]
       const consulta = `update encomenda set  remetente=$2, destinatario=$3, local_atual=$4, previsao_entrega=$5 where id = $1 returning *`
       const alunoAtualizado = await pool.query(consulta, dados)
       return alunoAtualizado.rows    

   }
   static async listarTodos (){
      const consulta =`select * from encomenda`
      const aluno = await pool.query(consulta)
      return aluno.rows

   }
   static async listarPorId(id){
    const dados = [id]
    const consulta =`select * from encomenda where id = $1`
    const endomenda = await pool.query(consulta, dados)    
   }

   static async excluirPorId(id){   
   const dados = [id]
   const consulta = `delete from encomenda where id =$1`
   await pool.query(consulta, dados)
   }

   static async excluirTodos(){
      const consulta = `delete from encomenda`
      await pool.query(consulta)

   }
}
 module.exports = EncomendaModel