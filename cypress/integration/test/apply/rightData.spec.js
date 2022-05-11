context("Test Apply page with correct data", () => {
  it('Visit the Apply page with path "/us/apply"', () => {
    cy.visit("/us/apply").wait(5000);
  });

  it("Call the form and fill with right values", () => {
    cy.log("**_____ Filling form data _____**");
    cy.fixture("/contact/right.json").then((right) => {
      const { firstName } = right;

      cy.log("**_____ Start intercept _____**");
      cy.intercept("POST", "**/marketing/lead", (req) => {
        req.body.first_name = firstName;
      }).as("postForm");

      cy.get("[data-cy=first_name]")
        .clear({ force: true })
        .click({ force: true })
        .type(firstName)
        .should("have.css", "border-color", "rgb(0, 0, 0)"); // focus the form
    });

    cy.fixture("/apply/form_values/right.json").then((right) => {
      const { email, phone } = right;

      cy.log("**_____ Start intercept _____**");
      cy.intercept("POST", "**/marketing/lead", (req) => {
        req.body.email = email;
        req.body.phone = phone;
      }).as("postForm");

      cy.get("[data-cy=email]")
        .clear({ force: true })
        .click({ force: true })
        .type(email)
        .should("have.css", "border-color", "rgb(0, 0, 0)");

      cy.get("[data-cy=phone]")
        .clear({ force: true })
        .click({ force: true })
        .type(phone)
        .should("have.css", "border-color", "rgb(0, 0, 0)");

        
        cy.get("#dropdown_program_selector").click({ force: true }).wait(2000).type("level 1 {enter}", { force: true })
        // .click({ force: true })
        // .wait(1500)

      cy.get("#dropdown_academy_selector").click({ force: true }).wait(2000).type("miami {enter}", { force: true })
        // .wait(5000)
        // .click({ force: true })
        // .wait(3500)
        // .get("#react-select-3-option-1")
        // .click();
    });

    cy.get('Button[type="submit"]').contains("APPLY").click().wait(2500);

    cy.log("**_____ Verifying Interception _____**");
    cy.wait("@postForm");
    // it verify if the response has been intercepted and changed
    cy.get("@postForm").then(({ request, response }) => {
      console.log("Response Intercepted:::", response);
      console.log("Request Intercepted:::", request);
      // expect(xhr.response.statusCode).to.equal(201)
      expect(response.body.first_name).to.equal(request.body.first_name);
      expect(response.body.email).to.equal(request.body.email);
      expect(response.body.phone).to.equal(request.body.phone);
    });
  });
});
