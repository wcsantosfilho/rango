const port = 3003

const bodyParser = require('body-parser')
const express = require('express')
const server = express()
const allowCors = require('./cors')
const queryParser = require('express-query-int')

// Set default node environment to development 
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(allowCors)
server.use(queryParser())

// Vai carregar o express se for o modo de desenvolvimento
// se for TESTE não irá carregar
if (server.get('env') == 'development') {
    server.listen(port, function() {
        console.log(`Backend is running on port ${port} at ${server.get('env')}.`)
    })
}

module.exports = server