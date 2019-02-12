const restful = require('node-restful')
const mongoose = restful.mongoose

const itensSchema = new mongoose.Schema({
    itemEntrega: { type: String, required: true},
    quantidadeEntrega: { type: Number, min: 0, required: true }
})

const entregaSchema = new mongoose.Schema({
    dataEntrega: { type: Date, required: true },
    items: [ itensSchema ]
})

module.exports = restful.model('registroEntrega', entregaSchema)