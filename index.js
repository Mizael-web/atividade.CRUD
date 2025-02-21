//carregando o framework express
const express = require ("express");

// inicializando o servidor
const app = express (); 


// carregando a biblioteca dotenv
const dotenv = require ("dotenv");

//configurando a biblioteca env/variavel de ambiente
dotenv.config ();

// Meddleware para permitir que o express uso do json
app.use(express.json());


// habilitando a porta env
const port = process.env.PORTA;

// simulando o banco de dados
const bancoDados = [];

// criar Rota de cadastro de encomendas
app.post ("/Encomenda", (requesicao, resposta) => {

    try {

        const {id, remetente, destinatario, local_atual, previsao_entrega } = requesicao.body;// extrair os dados da requesição
        const novaEncomenda = { id, remetente, destinatario, local_atual, previsao_entrega};
        
            bancoDados.push (novaEncomenda);
             resposta.status(201).json (
             {
               msg:" Encomenda criada com sucesso"
             }
             );  
        
    } catch (erro){
         resposta.status(500).json(
            {
              msg: " Erro ao cadastrar encomenda"

            });
    }

});

// listar/buscar encomendas no banco de dados 
app.get("/encomenda", (requisicao, resposta) => {
  // Verifica se bancoDados é um array e tem encomendas
  if (!Array.isArray(bancoDados) || bancoDados.length === 0) {
    return resposta.status(404).json({ mensagem: "Encomenda não encontrada." });
  }

  // Retorna as encomendas
  return resposta.status(200).json(bancoDados);
});


      // listar encomendas pela id
      app.get('/encomenda/:id', (requisicao, resposta) => {
        try {
          const id = requisicao.params.id;
          const encomenda = bancoDados.find(elemento => elemento.id == id);
          if (!encomenda) {
            return resposta.status(404).json({ mensagem: "Encomenda não encontrada." });
          }
          
          return resposta.status(200).json(encomenda);
        } catch (error) {
          return resposta.status(500).json({ mensagem: "Erro ao buscar Encomenda.", erro: error.message });
        }
      });
    
    // Rota PUT - Atualiza um produto pelo ID 
    app.put('/encomenda/:id', (requisicao, resposta) => {
        try {
            const id = requisicao.params.id; // Mantendo o ID como string
            const { novoRemetente, novoDestinatario, novoLocal_atual, novaPrevisao_entrega } = requisicao.body;
    
            // Busca pelo ID sem conversão para número
            const encomendaIndex = bancoDados.find(encomenda => encomenda.id === id);
    
            if (encomendaIndex === -1) {
                return resposta.status(404).json({ mensagem: "Encomenda não encontrada" });
            }
    
            // Atualiza os dados da encomenda encontrada
            // bancoDados[encomendaIndex] = { id, remetente, destinatario, local_atual, previsao_entrega };
            encomendaIndex.remetente = novoRemetente
            encomendaIndex.destinatario = novoDestinatario
            encomendaIndex.local_atual = novoLocal_atual
            encomendaIndex.previsao_entrega = novaPrevisao_entrega
    
            // Verifica o status da encomenda e define a mensagem apropriada
            
            return resposta.status(200).json({ mensagem: " Encomenda atualizada com sucesso!" });
    
        } catch (erro) {
            console.error("Erro ao atualizar Encomenda:", erro);
            resposta.status(500).json({ mensagem: "Erro no cadastro das encomendas" });
        }
    });
    

 
       // Rota DELETE - Remove um produto pelo ID
app.delete('/encomenda/:id', (requisicao, resposta) => {
    const { id } = requisicao.params;
    const encomendaIndex = bancoDados.findIndex(encomenda => encomenda.id == id);
  
    if (encomendaIndex === -1) {
      return resposta.status(404).json({ mensagem: "Encomenda não encontrada" });
    }
  
    bancoDados.splice(encomendaIndex, 1);
    resposta.json({ mensagem: "Encomenda removido com sucesso" });
  });
  
  
  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });