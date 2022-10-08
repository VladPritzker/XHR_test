/// <reference types="cypress" />
describe("Network Reqeusts", () => {
    beforeEach(() => {
        cy.visit('https://example.cypress.io/commands/network-requests');
    })
    it("Post Request", () => {
        cy.intercept('POST', "/comments").as('postComment')

        cy.get(".network-post").click();

        cy.wait("@postComment").should(({request, response})=>{
            console.log(request);
            expect(request.body).to.include('name=Using+POST+in+cy.intercept()&email=hello%40cypress.io&body=You+can+change+the+method+used+for+cy.intercept()+to+be+GET%2C+POST%2C+PUT%2C+PATCH%2C+or+DELETE')
            console.log(response);
            expect(response.body).to.have.property('name', "Using POST in cy.intercept()2")
        })
        

    })
})