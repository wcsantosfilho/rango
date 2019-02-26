const test = require('tape')
const supertest = require('supertest')
const app = require('../src/loader')
/**
  * @desc Chama app.server porque foram exportados "server" e "db"
        para que o teste possa fechar a conexao do db ao final e 
        o teste não ficar suspenso
*/

/**
  * @desc Testes da API
  * @param  string testDescription - the message to be displayed
            callback - tests to be done
  * @return ???
*/
test('#A - GET de: /api/registroEntrega/', function (t) {
    // Chama app.server porque foram exportados "server" e "db"
    // para que o teste possa fechar a conexao do db ao final e 
    // o teste não ficar suspenso
    supertest(app.server)
    .post('/api/registroEntrega/')
    .send({ dataEntrega: "2019-01-01T22:00:00.000Z", items: [
        {itemEntrega: "Refeições", quantidadeEntrega: 150},
        {itemEntrega: "Roupas", quantidadeEntrega: 50}
        ]
    })
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) => {
        var actualThings = res.body
        // TESTE 1
        t.error(err, 'Sem erros na execução do GET')
        // TESTE 2
        //t.same(actualThings, expectedThings, 'A lista de registros de entrega é trazida corretamente')
        
        // Fecha a conexão com o banco para encerrar o teste, 
        // caso contrário ficava suspenso
        app.db.connection.close()
        t.end()
    })
})



/**
  * @desc Teste de leitura da API
  * @param  string testDescription - the message to be displayed
            callback - tests to be done
  * @return ???
*/
test('#B - GET de: /api/registroEntrega/', function (t) {
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
        // TESTE 1
        t.error(err, 'Sem erros na execução do GET')
        // TESTE 2
        t.same(actualThings, expectedThings, 'A lista de registros de entrega é trazida corretamente')
        
        // Fecha a conexão com o banco para encerrar o teste, 
        // caso contrário ficava suspenso
        app.db.connection.close()
        t.end()
    })
})

