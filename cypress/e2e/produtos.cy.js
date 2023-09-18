/// <reference types="cypress"/>
import contrato from '../contratos/produtos.contratos'

describe('teste de produtos', () => {
    let token
    before(() => {
        cy.token('fulano@qa.com', 'teste').then(tkn => { token = tkn })
    });
    it('deve validar contrado', () => {
        cy.request('produtos').then(response =>{
            return contrato.validateAsync(response.body)
        })
        
    });
    it('listar produtos', () => {
        cy.request({
            method: 'GET',
            url: '/Produtos'
        }).then((response) => {
            expect(response.body.produtos[7].nome).to.equal('Logitech MX Vertical')
            expect(response.status).to.equal(200)
            expect(response.body).to.have.property('produtos')
            expect(response.duration).to.be.lessThan(15)
        })

    });

    it('cadastrar poduto', () => {
        let produto = `livro ${Math.floor(Math.random() * 100000)}`
        cy.request({
            method: 'POST',
            url: '/Produtos',
            body: {
                "nome": produto,
                "preco": 200,
                "descricao": "Livro",
                "quantidade": 100
            },
            headers: { authorization: token }
        }).then((response) => {
            expect(response.status).to.equal(201)
            expect(response.body.message).to.equal('Cadastro realizado com sucesso')
        })

    });
    it('validar ptoduto repetido', () => {
        cy.cadastrarProduto(token, 'livro257', 250, 'Livro', 150).then((response) => {
            expect(response.status).to.equal(400)
            expect(response.body.message).to.equal('Já existe produto com esse nome')



        });
    });

    it('deve editar produto ja cadastrado', () => {
        cy.request('produtos').then(response => {
            let id = response.body.produtos[4]._id
            cy.request({
                method: 'PUT',
                url: `produtos/${id}`,
                headers: { authorization: token },
                body: {
                    "nome": "Samsung 60 poleg",
                    "preco": 300,
                    "descricao": "TV",
                    "quantidade": 20
                }
            }).then(response => {
                expect(response.body.message).to.equal('Registro alterado com sucesso')
            })
        })

    });
    it('deve editar prodtudo previo', () => {
        let produto = `livro ${Math.floor(Math.random() * 100000)}`
        cy.cadastrarProduto(token, produto, 250, 'Livro', 150)
        .then(response =>{
            let id = response.body._id
            cy.request({
                method: 'PUT',
                url: `produtos/${id}`,
                headers: { authorization: token },
                body: {
                    "nome": "livro editado6",
                    "preco": 300,
                    "descricao": "TV",
                    "quantidade": 20
                }
            }).then(response => {
                expect(response.body.message).to.equal('Registro alterado com sucesso')
            })
        })
    });

    it('deletar produto', () => {
        let produto = `livro ${Math.floor(Math.random() * 100000)}`
        cy.cadastrarProduto(token, produto, 200, 'Livro', 100).then(response => {
            let id = response.body._id
            cy.request({
                method: 'DELETE',
                url: `produtos/${id}`,
                headers: { authorization: token },
            }).then(response => {
                expect(response.body.message).to.equal('Registro excluído com sucesso')
            })
        })
    });
});