const Mongoose = require('mongoose')

const personModel = Mongoose.model("person", {
    firstname: String,
    lastname: String
})
/*
const itensSchema = new Mongoose.Schema({
    itemEntrega: { type: String, required: true},
    quantidadeEntrega: { type: Number, min: 0, required: true }
})

const entregaSchema = new Mongoose.Schema({
    dataEntrega: { type: Date, required: true },
    items: [ itensSchema ]
})

module.exports = Mongoose('registroEntrega', entregaSchema)
*/

module.exports = personModel