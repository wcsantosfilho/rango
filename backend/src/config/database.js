const mongoose = require('mongoose')
const config = require('./config')

/*
    * Set the database according with environment
    * Should be changed by a configuration file later
*/
console.log('process.env.NODE_ENV', process.env.NODE_ENV)

if (process.env.NODE_ENV == "production") {
    console.log("entrou no production")
    MONGO_URI = config.production.mongodbURI
}
if (process.env.NODE_ENV == "test") {
    console.log("entrou no test")
    MONGO_URI = config.test.mongodbURI
}
if (process.env.NODE_ENV == "development") {
    console.log("entrou no development")
    MONGO_URI = config.development.mongodbURI
}


mongoose.Promise = global.Promise

module.exports = mongoose.connect(MONGO_URI, {useNewUrlParser: true})
console.log("MONGO_URI:" + MONGO_URI)
mongoose.Error.messages.general.required = "O atributo '{PATH}' é obrigatório."
mongoose.Error.messages.Number.min = 
    "O '{VALUE}' informado é menor que o limite mínimo de '{MIN}'."
mongoose.Error.messages.Number.max = 
    "O '{VALUE}' informado é maior que o limite máximo de '{MAX}'."
mongoose.Error.messages.String.enum =
    "'{VALUE}' não é válido para o atributo '{PATH}'."

module.exports = mongoose