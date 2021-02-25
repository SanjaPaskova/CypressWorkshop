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
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

var accessToken: string;

Cypress.Commands.add('filllocalstorage', () => {
  cy.fixture('localstorage.json').then((localstore) => {
    Object.keys(localstore).forEach(function (key) {
      var value = localstore[key];
      window.localStorage.setItem(key, value);
      if (key.includes('idToken')) {
        accessToken = value;
        return accessToken;
      }
    });
  });
})

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      filllocalstorage(): Chainable<Element>,
    }
  }
}

export { }