const {pool}= require ("../../../config/database")


class  RemetenteModel {

   static async criar(id, nome, email, telefone){
       const dados = [id, nome, email, telefone]
       const consulta = `insert into remetente(id, nome, email, telefone) values ( $1, $2, $3, $4) returning *`
       const novoRemetente = await pool.query(consulta, dados)
       return novoRemetente.rows    

   }
   static async editar(id, nome, email, telefone){
       const dados = [id, nome, email, telefone]
       const consulta = `update remetente set  nome=$2, email=$3, telefone=$4 where id = $1 returning *`
       const remetenteAtualizado = await pool.query(consulta, dados)
       return remetenteAtualizado.rows    

   }
   static async listarTodos (){
      const consulta =`select * from remetente`
      const remetente = await pool.query(consulta)
      return remetente.rows

   }
   static async listarPorId(id){
    const dados = [id]
    const consulta =`select * from remetente where id = $1`
    const remetente = await pool.query(consulta, dados) 
    return remetente.rows   
   }

   static async excluirPorId(id){   
   const dados = [id]
   const consulta = `delete from remetente where id =$1`
   await pool.query(consulta, dados)
   }

   static async excluirTodos(){
      const consulta = `delete from remetente`
      await pool.query(consulta)

   }
}
 module.exports = RemetenteModel