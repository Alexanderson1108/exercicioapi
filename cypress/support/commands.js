// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('token', (email, senha) => { 
    cy.request({
        method: 'POST',
        url: '/login',
        body: {
        "email": email,
        "password": senha
    }
    }).then((response) => {
        expect(response.status).to.equal(200)
        return response.body.authorization
    })
    
 })
 Cypress.Commands.add('cadastrarProduto', (token, produto, preco, descricao, quantidade) =>{
    cy.request({
        method: 'POST',
        url: '/Produtos',
        headers: { authorization: token },
        body: {
            "nome": produto,
            "preco": preco,
            "descricao": descricao,
            "quantidade": quantidade
        },
        failOnStatusCode: false
    })
 })
 Cypress.Commands.add('login', (email, senha) => { 
    it('login com sucesso', () => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:3000/login',
        body: {
        "email": email,
        "password": senha
    }
    }).then((response) => {
        expect(response.status).to.equal(200)
        expect(response.body.message).to.equal('Login realizado com sucesso')
        cy.log(response.body.authorization)
    })

});})
Cypress.Commands.add('cadastrarUsuario', () => { it('cadastro de usuario', () => {
    let emailfaker = faker.internet.email()
    cy.request({
        method: 'POST',
        url: 'usuarios',
        body: {
            "nome": "Alex Anderson",
            "email": emailfaker,
            "password": "teste",
            "administrador": "true"
        }
    }).then((response) => {
        expect(response.body.message).to.equal('Cadastro realizado com sucesso')
    })

});})
