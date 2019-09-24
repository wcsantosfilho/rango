const express = require('express')
const registroEntregas = require('../api/registroEntregas/novoRegistroEntregaService')

module.exports = function(server) {
    // Definir URL base para todas as rotas
    const router = express.Router()
    server.use('/api', router)

    // bar seria uma outra rota alternativa a /api
    server.use('/bar', (req,res,next) => {
        console.log('%s %s %s', req.method, req.url, req.path)
        res.status(200)
        res.send()
        next()
    })

    // foo fica dentro de /api
    router.use('/foo', (req, res, next) => {
        try {
            var result = { "xpto": "abcd" }
            res.send(result)
            next()
        } catch (error) {
            res.status(500).send(error)
        }
    })

    // estas ficam dentro de api e estão definidas em RegistroEntregaService.js
    router.use('/getAllperson',  registroEntregas.getAllPerson)
    router.use('/getOneperson/:id',  registroEntregas.getOnePerson)
    router.use('/addperson', registroEntregas.addPerson)
}