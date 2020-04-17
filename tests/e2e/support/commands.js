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
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('getIframeWindow', () => {
  cy.log('getIframeWindow')

  return cy
  .get('iframe#child', { log: false })
  .its('0.contentWindow', { log: false }).should('not.be.empty')
  .then((_window) => cy.wrap(_window, { log: false }))
})

Cypress.Commands.add('getIframeDocument', () => {
  cy.log('getIframeDocument')

  return cy
  .get('iframe#child', { log: false })
  .its('0.contentDocument', { log: false }).should('not.be.empty')
  .then((doc) => cy.wrap(doc, { log: false }))
})

Cypress.Commands.add('getIframeBody', () => {
  cy.log('getIframeBody')

  return cy
  .get('iframe#child', { log: false })
  .its('0.contentDocument.body', { log: false }).should('not.be.empty')
  .then((body) => cy.wrap(body, { log: false }))
})