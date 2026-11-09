const original = {
  name: 'Marina Teste Cypress',
  email: 'marina.cypress@example.com',
  phone: '11987654321'
}
const updated = {
  name: 'Marina Atualizada Cypress',
  email: 'marina.atualizada@example.com',
  phone: '11912345678'
}

function fill(contact) {
  cy.get('input[placeholder="Nome"]').clear().type(contact.name)
  cy.get('input[placeholder="E-mail"]').clear().type(contact.email)
  cy.get('input[placeholder="Telefone"]').clear().type(contact.phone)
}

function addContact(contact) {
  fill(contact)
  cy.contains('button', /^Adicionar$/).click()
}

function card(name) {
  return cy.contains('.contato li', name).closest('.contato')
}

function verify(contact) {
  card(contact.name).within(() => {
    cy.contains('li', contact.email).should('be.visible')
    cy.contains('li', contact.phone).should('be.visible')
  })
}

describe('Agenda de contatos da EBAC', () => {
  beforeEach(() => cy.visit('/'))

  it('inclui um contato com nome, e-mail e telefone', () => {
    addContact(original)
    verify(original)
  })

  it('altera os dados de um contato existente', () => {
    addContact(original)
    card(original.name).contains('button', /^Editar$/).click()
    fill(updated)
    cy.contains('button', /^Salvar$/).click()
    verify(updated)
    cy.contains('.contato li', original.name).should('not.exist')
  })

  it('remove apenas o contato selecionado', () => {
    addContact(original)
    addContact(updated)
    card(original.name).contains('button', /^Deletar$/).click()
    cy.contains('.contato li', original.name).should('not.exist')
    verify(updated)
  })
})
