/// <reference types="cypress" />
describe("Network Reqeusts", ()=>{
    beforeEach(()=>{
        cy.visit('https://example.cypress.io/commands/network-requests');
    })
    it('Get Reqeust', ()=>{
      cy.intercept({
        method: "GET",
        url: "**/comments/*",
          }).as("getComment");
          cy.get('.network-btn').click();
          cy.wait('@getComment').its('response.statusCode').should('eq', 200);
        

        // cy.visit('https://example.cypress.io/commands/network-requests');
        // cy.intercept('GET', '**/comments/*').as('getComment')
        // cy.get('.network-btn').click();
        // cy.wait('@getComment').its('response.statusCode').should('be.oneOf', [200])
    })
})
