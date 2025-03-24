const express = require("express");
const EncomendaController = require("../controllers/encomenda.controllers");

const router = express.Router();

router.get("/encomenda",EncomendaController.listarTodos);
router.post("/encomenda",EncomendaController.criar);
router.put("/encomenda/:id",EncomendaController.editar);
router.get("/encomenda/:id",EncomendaController.listarPorId);
router.delete("/encomenda/:id",EncomendaController.excluirPorId);
router.delete("/encomenda",EncomendaController.excluirTodos); // Corrigido para excluirTodos()

module.exports = router;
