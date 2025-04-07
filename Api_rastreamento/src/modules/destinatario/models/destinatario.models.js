const pool = require("../../../config/database");


class  DestinatarioModel {

static async  listarTodos() {
  const res = await pool.query(
    `SELECT d.*, e.* 
     FROM destinatarios d 
     JOIN enderecos e ON d.endereco_id = e.id`
  );
  return res.rows;
}

static async listarPorId(id) {
  const res = await pool.query(
    `SELECT d.*, e.* 
     FROM destinatarios d 
     JOIN enderecos e ON d.endereco_id = e.id
     WHERE d.id = $1`,
    [id]
  );
  return res.rows[0];
}

static async criar(id,  nome, email, telefone, endereco ) {
  const dados = [id, nome, email, telefone, endereco]
  const consulta = `INSERT INTO destinatarios (id, nome, email, telefone, endereco) 
     VALUES ($1, $2, $3, $4, $5) RETURNING *`
  const novoDestinatario = await pool.query(consulta, dados)
         return novoDestinatario.rows   
}

   static async editar(id, nome, email, telefone, endereco){
       const dados = [id, nome, email, telefone, endereco]
       const consulta = `update remetente set  nome=$2, email=$3, telefone=$4 where id = $1 returning *`
       const destinatarioAtualizado = await pool.query(consulta, dados)
       return destinatarioAtualizado.rows
       
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


module.exports = DestinatarioModel