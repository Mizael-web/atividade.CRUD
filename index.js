//carregando o framework express
const express = require ("express");

// inicializando o servidor
const app = express (); 


// carregando a biblioteca dotenv
const dotenv = require ("dotenv");

//configurando a biblioteca env/variavel de ambiente
dotenv.config ();

// Meddleware para permitir o uso do json
app.use(express.json());


// habilitando a porta env
const port = process.env.PORTA;

// simulando o banco de dados
const bancoDados = [];

// criar um cadastro de encomendas
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
app.get ("/Encomenda", (requesicao, resposta) => {
    return resposta.status(200).json (
    bancoDados    
   );
   });

      // listar encomendas pela id
      app.get('/Encomenda/:id', (requisicao, resposta) => {
        try {
          const id = requisicao.params.id;
          const Encomenda = bancoDados.find(elemento => elemento.id == id);
          if (!Encomenda) {
            return resposta.status(404).json({ mensagem: "Encomenda não encontrado." });
          }
          
          return resposta.status(200).json(Encomenda);
        } catch (error) {
          return resposta.status(500).json({ mensagem: "Erro ao buscar Encomenda.", erro: error.message });
        }
      });
    
    // Rota PUT - Atualiza um produto pelo ID
    app.put('/Encomenda/:id', (requisicao, resposta) => {
        try {
            const id = requisicao.params.id; // Mantendo o ID como string
            const { remetente, destinatario, local_atual, previsao_entrega } = requisicao.body;
    
            // Busca pelo ID sem conversão para número
            const encomendaIndex = bancoDados.findIndex(encomenda => encomenda.id === id);
    
            if (encomendaIndex === -1) {
                return resposta.status(404).json({ mensagem: "Encomenda não encontrada" });
            }
    
            // Atualiza os dados da encomenda encontrada
            bancoDados[encomendaIndex] = { id, remetente, destinatario, local_atual, previsao_entrega };
    
            // Verifica o status da encomenda e define a mensagem apropriada
            let mensagem = "Encomenda em trânsito";
    
            if (local_atual === "destino") {
                mensagem = "Encomenda entregue";
            } else if (new Date(previsao_entrega) < new Date()) {
                mensagem = "Encomenda em atraso";
            }
    
            return resposta.status(200).json({ mensagem });
    
        } catch (erro) {
            console.error("Erro ao atualizar Encomenda:", erro);
            resposta.status(500).json({ mensagem: "Erro no cadastro das encomendas" });
        }
    });
    

 
       // Rota DELETE - Remove um produto pelo ID
app.delete('/Encomenda/:id', (requisicao, resposta) => {
    const { id } = requisicao.params;
    const EncomendaIndex = bancoDados.findIndex(Encomenda => Encomenda.id == id);
  
    if (EncomendaIndex === -1) {
      return resposta.status(404).json({ mensagem: "Encomenda não encontrado" });
    }
  
    bancoDados.splice(EncomendaIndex, 1);
    resposta.json({ mensagem: "Encomenda removido com sucesso" });
  });
  
  
  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });
  



















