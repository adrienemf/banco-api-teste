const request = require ('supertest');
const {expect} = require ('chai');
require ('dotenv').config()
const { obterToken } = require('../helpers/autenticacao') 
const postTransferencia = require ('../fixtures/postTransferencia.json')

describe ('Transferencias',() =>{
    let token
        beforeEach (async ()=> {
            token = await obterToken('julio.lima','123456')
        } )
    describe ('Post/transferencia', () =>{
        
        it ('Deve retornar sucesso com 201 quando o valor da transferencia for igual ou acima de 10,00', async () => {
            const bodyTransferencia = {...postTransferencia}
            
            const resposta = await request(process.env.BASE_URL)
           .post('/transferencias')
           .set('Content-Type', 'application/json')
           .set('Authorization', 'Bearer ' + token)
           .send(bodyTransferencia)
            expect(resposta.status).to.equal(201);
    
        })
        it ('Deve retornar sucesso com 422 quando o valor da transferencia for abaixo de 10,00', async () => {
           const bodyTransferencia = {...postTransferencia}
                 bodyTransferencia.valor = 7
            
           const resposta = await request(process.env.BASE_URL)
           .post('/transferencias')
           .set('Content-Type', 'application/json')
           .set('Authorization', 'Bearer ' + token )
           .send(bodyTransferencia)
           
            expect(resposta.status).to.equal(422);
        })

    })
    describe ('GET/transferencia/{id}', () =>{
      it ('Deve retornar sucesso com 200 e dados iguais ao registro de transferencia contido no banco de dados quando o id for valido', async () => {
          const resposta = await request (process.env.BASE_URL)
          .get('/transferencias/15')
          .set('Authorization', `Bearer ${token}`)

          expect(resposta.status).to.equal(200);
          expect(resposta.body.id).to.equal(15);
          expect(resposta.body.id).to.be.a('number');
          expect(resposta.body.conta_origem_id).to.equal(1);
          expect(resposta.body.conta_destino_id).to.equal(2);
      })
    })

    describe ('GET/transferencias', () =>{
        it ('Deve retornar 10 elementos na paginação', async () => {
            const resposta = await request (process.env.BASE_URL)
            .get('/transferencias?page=1&limit=10')
            .set('Authorization', `Bearer ${token}`)

            expect(resposta.status).to.equal(200);
            expect(resposta.body.limit).to.equal(10);
            expect(resposta.body.transferencias).to.have.lengthOf(10);


 
        })
    })
})