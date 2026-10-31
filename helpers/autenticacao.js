const request = require ('supertest');
obterToken = async(usuario, senha) => {
    const respostalogin = await request(process.env.BASE_URL)  
                        .post('/login')
                        .set('Content-Type', 'application/json')
                        .send({
                             'username': usuario,
                             'senha': senha
                           })
    
                return respostalogin.body.token 
}
module.exports = {
    obterToken
}