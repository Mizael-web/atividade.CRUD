// import { useEffect, useState } from 'react'
// // import reactLogo from './assets/react.svg'
// // import viteLogo from '/vite.svg'


// import {listarTodos } from '../../service/alunoService';

// function listarAlunos() {
     
//   const [alunos, setAlunos] = useState([]);

//   // async function listarAlunos (){
//   //   try {
//   //     const response = await axios.get ("http://localhost:3000/aluno");
//   //     if(response){
//   //       setAlunos(response.data)
//   //     }

//   //   } catch (error){         
//   //     console.log(error);
//   //     setErroMsg(error);
//   //   }

//   //   } 
//   //   useEffect(()=>{
//   //     listarAlunos();
//   //   }, []);

//    async function  listarAlunos() {
//     try {
//     }
//     const response =await listarTodos();
//     setAlunos (response.data)


//     } catch (error) {
//       setAlunos([]);
//       console.log (error);
//       setErroMsg(error); 
//     }
//    }

    
//         console.log (alunos)
//        return (
//           <div>

//              <h1>Listagem de alunos</h1>
//              <ul>
//               {
// alunos.map((aluno) => (
// <li key={aluno.matricula}>
// {aluno.nome} - {aluno.amail} - Matricula: {aluno.matricula}
// </li>
//        ))
//       }             
//       </ul>

//     </div>


//   );



    
 
// export default listarAluno

