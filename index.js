
// importando com commonjs
const express = require ("express");
const dotenv  = require ("dotenv");

// configurando a biblioteca dotenv
dotenv.config();

//
const port = process.env.PORTA;
const app = express();// isntanciando um apolicação

//aplicação use express como json(javascript object notation)
app.use(express.json());

// array de banco de dados
const bancoDados = [];



// post melhorado com o trycatch
app.post('/Encomenda', (requisicao, resposta) => {
    try {
      const { id, remetente, destinatario, local_atual, Previsao_entrega} = requisicao.body;
       if (!id|| !remetente ||!destinatario ||!local_atual ||!Previsao_entrega){
        return resposta.status(200).json(
         {
          mensagem: "Todos os dados devem ser preenchidos"
        });
          
         }
      const novaEncomenda = { id, remetente, destinatario, local_atual, Previsao_entrega };
      bancoDados.push(novaEncomenda);
      resposta.status(201).json(
        {
           mensagem: "Encomenda em transito" 
        });
  
    } catch (error) {
      resposta.status(500).json(
        {
          msg:" Encomenda em atraso",
          erro:error.message// mostra a mensagem do erro
        });  
        }  
  });


  // requesita e lista os produtos do banco de dados
app.get('/Encomenda', (requisicao, resposta) => {
resposta.json(bancoDados);
});


// codigo do get melhorado com trycatch
app.get('/Encomendas', (requisicao, resposta) => {

    try {
        const id = requisicao.params.id
        const index = bancoDados.findIndex(elemento => elemento.id === id)
        if ( index === -1){
          return resposta.status(404).json (
            {
              mensagem: " Encomenda entregue!"
            })
        }
        bancoDados.splice(index, 1)
        resposta.status(200).json (
          {
            mensagem:" Encomenda com entrega em atraso!"
    
          });   
      } catch (error) {
        resposta.status(500).json(
          {
            msg:"Erro ao deletar produto",
              erro:error.message// mostra a mensagem do erro   
            }) ;   
          }  
    });
  


// atualizar o dados

app.put('/Encomenda/:id', (requisicao, resposta) => {
  try {
    // localhost:3010/produtos/1
    const  id = requisicao.params.id;
    const {novoNome, novoRemetente, novoDestinatario, novoLocal_atual, novaPrevisao_entrega} = requisicao.body;
    if (!id){
      return resposta.status(404).json (
        {
          mensagem: " Informe o parametro"
        });       
      }
    const Encomenda = bancoDados.find(elemento => elemento.id === id)
    if (!Encomenda)
        {
         return resposta.status(404).json(
          {
            mensagem:" Encomenda Entregue"
          });
        }      
         
        Encomenda.nome = novoNome || Encomenda.nome
        Encomenda.remetente = novoRemetente || Encomenda.remetente
        Encomenda.destinatario = novoDestinatario || Encomenda.destinatario
        Encomenda.local_atual = novoLocal_atual || Encomenda.local_atual
        Encomenda.Previsao_entrega = novaPrevisao_entrega || Encomenda.Previsao_entrega

        resposta.status(200).json(
          {
            mensagem: "Encomenda entregue com sucesso"
          });
     
   
   } catch (error) {
    resposta.status(500).json(
     {
       msg:"Erro ao atualizar Encomenda",
         erro:error.message// mostra a mensagem do erro
        });        
   }
}) ;


app.delete('/Encomenda/:id', (requisicao, resposta) => {
    try {
      const id = requisicao.params.id
      const index = bancoDados.findIndex(elemento => elemento.id === id)
      if ( index === -1){
        return resposta.status(404).json (
          {
            mensagem: " Encomenda não encontrado!"
          })
      }
      bancoDados.splice(index, 1)
      resposta.status(200).json (
        {
          mensagem:" Encomenda deletada com sucesso!"
  
        });   
    } catch (error) {
      resposta.status(500).json(
        {
          msg:"Erro ao excluir Encomenda",
            erro:error.message// mostra a mensagem do erro   
          }) ;   
        }  
  });

  app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  })
  

  