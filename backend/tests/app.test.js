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
test('#A1 - POST de: /api/registroEntrega/', function (t) {
    supertest(app.server)
    .post('/api/registroEntrega/')
    .send({ dataEntrega: "2019-01-01T22:00:00.000Z", items: [
        {itemEntrega: "Refeições", quantidadeEntrega: 150},
        {itemEntrega: "Roupas", quantidadeEntrega: 50}
        ]
    })
    .expect('Content-Type', /json/)
    .expect(201)
    .end((err, res) => {
        // TESTE 1
        t.error(err, 'Sem erros na execução do POST')
        // TESTE 2
        var entrega0 = "Refeições"
        var qtde0 = 150
        t.same(res.body.items[0].itemEntrega, entrega0, 'A lista de registros de entrega foi gravada corretamente')
        t.same(res.body.items[0].quantidadeEntrega, qtde0, 'A lista de registros de entrega foi gravada corretamente')
        
        t.end()
    })
})

test('#A2 - POST de: /api/registroEntrega/', function (t) {
    supertest(app.server)
    .post('/api/registroEntrega/')
    .send({ dataEntrega: "2019-01-02T21:34:00.000Z", items: [
        {itemEntrega: "Refeições", quantidadeEntrega: 80},
        {itemEntrega: "Roupas", quantidadeEntrega: 20}
        ]
    })
    .expect('Content-Type', /json/)
    .expect(201)
    .end((err, res) => {
        // TESTE 1
        t.error(err, 'Sem erros na execução do POST')
        // TESTE 2
        var entrega1 = "Roupas"
        var qtde1 = 20
        t.same(res.body.items[1].itemEntrega, entrega1, 'A lista de registros de entrega foi gravada corretamente')
        t.same(res.body.items[1].quantidadeEntrega, qtde1, 'A lista de registros de entrega foi gravada corretamente')
        
        t.end()
    })
})


test('#A3 - POST de: /api/registroEntrega/', function (t) {
    supertest(app.server)
    .post('/api/registroEntrega/')
    .send({ dataEntrega: "2019-01-03T22:02:00.000Z", items: [
        {itemEntrega: "Refeições", quantidadeEntrega: -10},
        {itemEntrega: "", quantidadeEntrega: 0}
        ]
    })
    .expect('Content-Type', /json/)
    .expect(400)
    .end((err, res) => {
        // TESTE 1
        t.error(err, 'Com erro de validação de dados!')
        t.same(res.body.name, 'ValidationError', 'Erro de validação por quantidade negativa')
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
        var actualThings = res.body
        console.log(res.body[0].items[0]);
        // TESTE 1
        t.error(err, 'Sem erros na execução do GET')
        // TESTE 2
        var entrega0 = "Refeições"
        var qtde0 = 150
        t.same(res.body[0].items[0].itemEntrega, entrega0, 'A lista de itens de entrega foi lida corretamente')
        t.same(res.body[0].items[0].quantidadeEntrega, qtde0, 'A lista de qtdes de entrega foi lida corretamente')
        
        // Fecha a conexão com o banco para encerrar o teste, 
        // caso contrário ficava suspenso
        app.db.connection.close()
        t.end()
    })
})

