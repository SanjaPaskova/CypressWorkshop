/// <reference types = "cypress"/>

describe('Login and fill local storage', () => {
    it('Login', () => {
        cy.task("login", { url: Cypress.config().baseUrl, username: Cypress.env("username"), password: Cypress.env("password") }).then(function () {
            cy.filllocalstorage();
        });
    });
});