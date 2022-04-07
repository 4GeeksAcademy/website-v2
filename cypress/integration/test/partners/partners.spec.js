context("Test Contact page with correct data", () => {
  it('Visit the Partners page with path "/us/partners"', () => {
    cy.visit("/us/partners").wait(3500);
  });

  it("Call the form and fill with right values", () => {
    cy.log("**_____ Filling form data _____**");
    cy.wait(3000);
    cy.fixture("/contact/right.json").then((contact) => {
      cy.fixture("/apply/form_values/right.json").then((apply) => {
        cy.wait(3000);
        const { firstName, lastName, email, comment } = contact;
        const { phone } = apply;

        cy.log("**_____ Intercepting... _____**");
        cy.intercept("POST", "**/marketing/lead").as("post_partner");

        cy.get("[data-cy=full_name]")
          .type(`${firstName} ${lastName}`)
          .should("have.css", "border-color", "rgb(0, 0, 0)"); // focus the form

        cy.get("[data-cy=email]")
          .type(email)
          .should("have.css", "border-color", "rgb(0, 0, 0)");

        cy.get("[data-cy=phone]").type("{movetoend}" + phone);

        cy.get("[data-cy=client_comments]")
          .type(comment)
          .should("have.css", "border-color", "rgb(0, 0, 0)");
      });
    });

    cy.log("**_____ Submit Form _____**");
    cy.get('Button[type="submit"]')
      .contains("SEND")
      .click({ force: true })
      .wait(2500);

    cy.log("**_____ Verifying Interception API _____**");
    cy.wait("@post_partner");
    cy.get("@post_partner").then(({ request, response }) => {
      console.log("Request Intercepted:::", request);
      console.log("Response Intercepted:::", response);

      cy.wrap(request.body)
        .its("automations")
        .should("eq", response.body.automations);
      cy.wrap(request.body).its("city").should("eq", response.body.city);
      cy.wrap(request.body)
        .its("location")
        .should("eq", response.body.location);
      cy.wrap(request.body)
        .its("first_name")
        .should("eq", response.body.first_name);
      cy.wrap(request.body).its("email").should("eq", response.body.email);
      cy.wrap(request.body).its("phone").should("eq", response.body.phone);
      cy.wrap(request.body)
        .its("client_comments")
        .should("eq", response.body.client_comments);
    });
  });
});
