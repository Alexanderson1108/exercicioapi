/// <reference types="cypress"/>
const { faker, fakerPT_BR } = require('@faker-js/faker');
import contrato from '../contratos/usuarios.contrato'

describe('teste de usuarios', () => {
    it('validar contrato', () => {
        cy.request('usuarios').then(response => {
            return contrato.validateAsync(response.body)
        })


    });
    it('lista usuarios', () => {
        cy.request({
            method: 'GET',
            url: 'usuarios',
        }).then((response) => {
            expect(response.body.usuarios[0].nome).to.equal('Fulano da Silva')
            expect(response.status).to.equal(200)
            expect(response.body).to.have.property('usuarios')
            expect(response.duration).to.be.lessThan(30)
        })
    });
    it('cadastro de usuario', () => {
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
    });
    it('Deve validar um usuário com email inválido', () => {
        cy.request({
            method: 'POST',
            url: 'usuarios',
            failOnStatusCode: false,
            body: {
                "nome": "Alex Anderson",
                "email": 'alex.alex',
                "password": "teste",
                "administrador": "true"
            },
        }).then((response) => {
            expect(response.body.email).to.equal('email deve ser um email válido')
        })
    })
    it.only('Deve editar um usuário previamente cadastrado', () => {
        let emailfaker = faker.internet.email()
        cy.cadastrarUsuario('ALEX ANDERSON',emailfaker, 'teste','true').then(response =>{
            let id = response.boy._id
            cy.request({
                method: 'PUT',
                url: `usuarios/${id}`,
                body: {
                    "nome": "ALEX ANDERSON",
                    "email": "abc@me.com",
                    "password": "teste",
                    "administrador": "true"
                }
            }).then(response => {
                expect(response.body.message).to.equal('Registro alterado com sucesso')
            })
        })
        })
            
    })
    it('Deve deletar um usuário previamente cadastrado', () => {
        cy.request('usuarios').then(response => {
            let id = response.body.usuarios[2]._id
            cy.request({
                method: 'DELETE',
                url: `usuarios/${id}`,
            }).then(response => {
                expect(response.body.message).to.equal('Registro excluído com sucesso')
            })
        })
    })
