const express = require("express");
const DestinatarioController = require("../../../modules/destinatario/controllers/destinatario.controllers")

const router = express.Router()

router.get ("/destinatario", DestinatarioController.listarTodos)

router.get ("/destinatario/:id", DestinatarioController.listarPorId)

router.post ("/destinatario", DestinatarioController.criar)

router.put("/destinatario/:id", DestinatarioController.editar)

router.delete("/destinatario/:id", DestinatarioController.excluirPorId)


router.delete("/destinatario", DestinatarioController.excluirTodos)


module.exports = router