context("Test Contact page with wrong data", () => {
  it('Visit the Contact page with path "/us/apply"', () => {
    cy.visit("/contact").wait(500);
    cy.location().should((location) => {
      expect(location.pathname).to.eq("/us/contact");
    });
  });

  it("Call the form and fill with wrong values", () => {
    // It gets data in fixtures folder to fill form
    cy.fixture("/contact/wrong.json").each((wrong) => {
      const { firstName, lastName, email, comment } = wrong;

      cy.get("[data-cy=first_name]")
        .clear()
        .type(firstName)
      //   .should("have.css", "background-color", "rgb(255, 205, 201)");
      // cy.get("span").contains("Please specify a valid first name");

      cy.get("[data-cy=last_name]")
        .clear()
        .type(lastName)
      //   .should("have.css", "background-color", "rgb(255, 205, 201)");
      // cy.get("span").contains("Please specify a valid last name");

      cy.get("[data-cy=email]")
        .clear()
        .type(email)
        .should("have.css", "background-color", "rgb(255, 205, 201)"); // reject input color
      cy.get("span").contains("Please specify a valid email");

      cy.get("[data-cy=comment]").clear().type(comment);
    });
  });

  it("Shouldn't submit the form", () => {
    cy.get('Button[type="submit"]').contains("Send").click();
    cy.get("[data-action=alert-message]") // Alert after submit
  });
});
