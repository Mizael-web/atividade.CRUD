import axios from "axios";


const API_URL = import.meta.env.VITE_API_URL

export const listarTodos = async () =>  axios.get (`${API_URL}/aluno`);
export const criar = async (aluno) => axios.post (`${API_URL}/aluno`, aluno);
export const editar = async (matricula) => axios.put (`${API_URL}/aluno/${matricula}`, aluno);
export const listarPorMatricula = async (matricula) => axios.get (`${API_URL}/aluno/${matricula}`);
export const excluirPorMatricula = async (matricula) => axios.delete (`${API_URL}/aluno/${matricula}`);
export const excluirTodos = async () => axios.delete (`${API_URL}/aluno/`);


// router.get("/aluno", AlunoController.listarTodos)
// router.post("/aluno", AlunoController.criar)
// router.put("/aluno/:matricula", AlunoController.editar)
// router.get("/aluno/:matricula", AlunoController.listarPorMatricula)
// router.delete("/aluno/:matricula", AlunoController.excluirPorMatricula)
// router.delete("/aluno", AlunoController.excluirTodos)
