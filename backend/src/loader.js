const server = require('./config/server')
const db = require('./config/database')
require('./config/routes')(server)

module.exports = { server, db }