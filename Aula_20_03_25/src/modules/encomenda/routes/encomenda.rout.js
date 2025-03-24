<<<<<<< HEAD
const express = require ( "express")
const EncomendaController = require ("../controllers/encomenda.controllers")


const router = express.Router()

router.get ("/encomenda", EncomendaController.listarTodos)

router.post ("/encomenda", EncomendaController.criar)

router.put("/encomenda/:id", EncomendaController.editar)

router.get ("/encomenda/:id", EncomendaController.listarPorId)

router.delete("/encomenda/:id", EncomendaController.excluirPorId)

router.delete("/encomenda", EncomendaController.excluirTodos)

module.exports = router

=======
const express = require("express");
const EncomendaController = require("../controllers/encomenda.controllers");
>>>>>>> 820fe92d3eae7c8848937d2d999cbbcfe08053f4

const router = express.Router();

router.get("/encomenda",EncomendaController.listarTodos);
router.post("/encomenda",EncomendaController.criar);
router.put("/encomenda/:id",EncomendaController.editar);
router.get("/encomenda/:id",EncomendaController.listarPorId);
router.delete("/encomenda/:id",EncomendaController.excluirPorId);
router.delete("/encomenda",EncomendaController.excluirTodos); // Corrigido para excluirTodos()

module.exports = router;
