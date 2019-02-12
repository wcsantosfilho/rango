const test = require('tape')
const supertest = require('supertest')
const app = require('../src/loader')

test('#A - GET de: /api/registroEntrega/', function (t) {
    // Chama app.server porque foram exportados "server" e "db"
    // para que o teste possa fechar a conexao do db ao final e 
    // o teste não ficar suspenso
    supertest(app.server)
    .get('/api/registroEntrega/')
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) => {
        var expectedThings = [
            {"_id":"5c3d2660313d1c069074419a","dataEntrega":"2019-01-14T22:00:00.000Z","__v":0,
                "items":[
                    {"itemEntrega":" Refeições","quantidadeEntrega":150,"_id":"5c3d2660313d1c069074419c"},
                    {"itemEntrega":" Sucos","quantidadeEntrega":80,"_id":"5c3d2660313d1c069074419b"}
                ]
            },
            {"_id":"5c3d26cf313d1c06907441a1","dataEntrega":"2019-01-13T22:00:00.000Z","__v":0,
                "items":[
                    {"itemEntrega":" Refeições","quantidadeEntrega":202,"_id":"5c3d26cf313d1c06907441a4"},
                    {"itemEntrega":" Roupas","quantidadeEntrega":55,"_id":"5c3d26cf313d1c06907441a3"},
                    {"itemEntrega":" Sapatos","quantidadeEntrega":12,"_id":"5c3d26cf313d1c06907441a2"}
                ]
            }
        ]
        var actualThings = res.body
    
        t.error(err, 'Sem erros')
        t.same(actualThings, expectedThings, 'Retrieve list of things')
        
        // Fecha a conexão com o banco para encerrar o teste, 
        // caso contrário ficava suspenso
        
        app.db.connection.close()
        t.end()
    })
})

