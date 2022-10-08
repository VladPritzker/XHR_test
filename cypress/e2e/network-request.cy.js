/// <reference types="cypress" />
describe("Network Reqeusts", () => {
    let message = "Unable to find comment!"

    beforeEach(() => {
        cy.visit('https://example.cypress.io/commands/network-requests');
    })
    it('Get Reqeust', () => {
        cy.intercept({
            method: "GET",
            url: "**/comments/*"
        }, {
            "postId": 1,
            "id": 1,
            "name": "id labore ex et quam laborum",
            "email": "Eliseo@gardner.biz",
            "body": "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
        }).as("getComment");
        cy.get('.network-btn').click();
        cy.wait('@getComment').its('response.statusCode').should('eq', 200);


        // cy.visit('https://example.cypress.io/commands/network-requests');
        // cy.intercept('GET', '**/comments/*').as('getComment')
        // cy.get('.network-btn').click();
        // cy.wait('@getComment').its('response.statusCode').should('be.oneOf', [200])
    })
    it("Post Request", () => {
        cy.intercept('POST', "/comments").as('postComment')

        cy.get(".network-post").click();

        cy.wait("@postComment").should(({request, response})=>{
            console.log(request);
            expect(request.body).to.include('name=Using+POST+in+cy.intercept()&email=hello%40cypress.io&body=You+can+change+the+method+used+for+cy.intercept()+to+be+GET%2C+POST%2C+PUT%2C+PATCH%2C+or+DELETE')
            expect(request.method).to.include('POST')
            console.log(response);
            expect(response.body).to.have.property('name', "Using POST in cy.intercept()")

            expect(request.headers).to.have.property('content-type')
            expect(request.headers).to.have.property('origin', 'https://example.cypress.io')
        })  
    })
    it.only("Pot request", ()=>{
        cy.intercept({
            method: "PUT", 
            url: "**/comments/*"
        },
        {
          statusCode: 404,
          body: {error: message},
          delay: 500    
        }).as("putComment")
        cy.get(".network-put").click()

        cy.wait('@putComment')

        cy.get(".network-put-comment").should('contain', message)


    })
})