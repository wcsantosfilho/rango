const express = require('express')

module.exports = function(server) {
    // Definir URL base para todas as rotas
    const router = express.Router()
    server.use('/api', router)

    // Rotas do Registro de Entregas
    const RegistroEntrega = require('../api/registroEntregas/registroEntregaService')
    RegistroEntrega.register(router, '/registroEntrega')
}