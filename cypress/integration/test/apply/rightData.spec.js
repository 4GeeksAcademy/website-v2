context("Test Apply page with correct data", () => {

  it('Visit the Apply page with path "/us/apply"', () => {
    cy.visit("/us/apply").wait(3500);
  });

  it("Call the form and fill with right values", () => {

    cy.log('**_____ Start intercept _____**')
    cy.intercept('POST', '**/marketing/lead', (req) => {
      console.log("REQUIRE", req)
      req.body.first_name = "intercepted Name"
      req.body.email = "example@email.com"
      req.body.phone = "+56123474332"
    }).as('postForm').wait(5000)

    cy.log('**_____ Filling form data _____**')
    cy.fixture("/contact/right.json").each((right) => {
      const { firstName } = right;

      cy.get("[data-cy=first_name]")
        .clear().click()
        .type(firstName)
        .should("have.css", "border-color", "rgb(0, 0, 0)"); // focus the form
    });
        
    cy.fixture("/apply/form_values/right.json").each((right) => {

      const { email, phone } = right;

      cy.get("[data-cy=email]")
        .clear().click()
        .type(email)
        .should("have.css", "border-color", "rgb(0, 0, 0)");

      cy.get("[data-cy=phone]")
        .clear().click()
        .type(phone)
        .should("have.css", "border-color", "rgb(0, 0, 0)");

      cy.get("[data-cy=dropdown_program_selector]")
        .click().wait(500)
        .get("#react-select-2-option-0").click()

      cy.get("[data-cy=dropdown_academy_selector]")
        .click().wait(2500)
        .get("#react-select-3-option-1").click()

    });

    cy.get('Button[type="submit"]').contains('APPLY').wait(2000).click()

    cy.log("**_____ Verifying Interception _____**")
    cy.wait('@postForm');
    // it verify if the response has been intercepted and changed
    cy.get('@postForm').then(xhr => {
      console.log("Response Intercepted:::",xhr)
      expect(xhr.response.statusCode).to.equal(201)
      expect(xhr.request.body.first_name).to.equal('intercepted Name')
      expect(xhr.request.body.email).to.equal('example@email.com')
      expect(xhr.request.body.phone).to.equal('+56123474332')
    })
  })

});
