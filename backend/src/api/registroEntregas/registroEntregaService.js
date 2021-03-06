/* Rotas do express */
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
            res.json(result)
        }
    )
})


/* Chamada http://localhost:3003/api/registroEntrega/summaryByDate/?paramData=yyyymmaa */
RegistroEntrega.route('summaryByDate', (req, res, next) => {
    var pData = req.query.paramData.toString()
    var yy = pData.substring(0, 4)
    var mm = pData.substring(4, 6)
    var dd = pData.substring(6, 8)
    p2Data = yy.concat("-").concat(mm).concat("-").concat(dd)
    RegistroEntrega.aggregate([
        { $project : { day: {$substr: ["$dataEntrega", 0, 10]}, quantidade: {$sum: "$items.quantidadeEntrega"}}},
        { $match: { day: p2Data }},
        { $group : { _id: "$day", qtde: {$sum: "$quantidade"}}},
        { $project : { _id: 1, qtde: 1}}
    ]). 
        then((result) => {
            res.json(result)
        }
    )
})

module.exports = RegistroEntrega