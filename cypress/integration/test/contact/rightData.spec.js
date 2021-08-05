context("Test Contact page with correct data", () => {

  it('Visit the Contact page with path "/us/contact"', () => {
    cy.visit("/us/contact").wait(500);
  });

  it("Call the form and fill with right values", () => {

    cy.log('**_____ Start intercept _____**')
    cy.intercept('POST', '**/marketing/lead', (req) => {
      console.log("REQUIRE", req)
      req.body.first_name = "jhon"
      req.body.last_name = "doe"
      req.body.email = "jdoe@gmail.com"
      req.body.comment = "api succesfully intercepted"
    }).as('postContact').wait(5000)


    cy.log('**_____ Filling form data _____**')
    cy.fixture("/contact/right.json").each((right) => {
      const { firstName, lastName, email, comment } = right;

      cy.get("[data-cy=first_name]")
        .clear()
        .type(firstName)
        .should("have.css", "border-color", "rgb(0, 0, 0)"); // focus the form

      cy.get("[data-cy=last_name]")
        .clear()
        .type(lastName)
        .should("have.css", "border-color", "rgb(0, 0, 0)");

      cy.get("[data-cy=email]")
        .clear()
        .type(email)
        .should("have.css", "border-color", "rgb(0, 0, 0)");

      cy.get("[data-cy=comment]")
        .clear()
        .type(comment)
        .should("have.css", "border-color", "rgb(0, 0, 0)");
    });

    cy.log("**_____ Submit Form _____**")
    cy.get('Button[type="submit"]').contains("Send").wait(2500).click();
    // cy.get("[data-cy=thankfulness]").contains("Thank you 🤣 Gracias");

    cy.log("**_____ Verifying Interception API _____**")
    cy.wait('@postContact');
    cy.get('@postContact').then(xhr => {
      console.log("Response Intercepted:::",xhr)
      expect(xhr.response.statusCode).to.equal(201)
      expect(xhr.request.body.first_name).to.equal('jhon')
      expect(xhr.request.body.last_name).to.equal('doe')
      expect(xhr.request.body.email).to.equal('jdoe@gmail.com')
      expect(xhr.request.body.comment).to.equal('api succesfully intercepted')
    })

  });
});
