const express = require ( "express")
const RemetenteController = require ("../controllers/remetente.controllers")

const router = express.Router()

router.get ("/remetente", RemetenteController.listarTodos)

router.post ("/remetente", RemetenteController.criar)

router.put("/remetente/:id", RemetenteController.editar)

router.get ("/remetente/:id", RemetenteController.listarPorId)

router.delete("/remetente/:id", RemetenteController.excluirPorId)

router.delete("/remetente", RemetenteController.excluirTodos)

module.exports = router




