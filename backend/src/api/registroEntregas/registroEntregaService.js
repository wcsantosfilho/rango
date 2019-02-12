const RegistroEntrega = require('./registroEntrega')

RegistroEntrega.methods(['get', 'post', 'put', 'delete'])
RegistroEntrega.updateOptions({ new: true, runValidators: true})

RegistroEntrega.route('summary', (req, res, next) => {
    RegistroEntrega.aggregate([
        { $project : { quantidade: {$sum: "$items.quantidadeEntrega"}}},
        { $group : { _id: null, qtde: {$sum: "$quantidade"}}},
        { $project : { _id: 0, qtde: 1}}
    ]). 
        then((result) => {
            console.log(result)
            res.json(result[0])
        }
    )
})

RegistroEntrega.route('summaryDate', (req, res, next) => {
    RegistroEntrega.aggregate([
        { $project : { day: {$substr: ["$dataEntrega", 0, 10]}, quantidade: {$sum: "$items.quantidadeEntrega"}}},
        { $group : { _id: "$day", qtde: {$sum: "$quantidade"}}},
        { $project : { _id: 1, qtde: 1}}
    ]). 
        then((result) => {
            console.log(result)
            res.json(result)
        }
    )
})

module.exports = RegistroEntrega