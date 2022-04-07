context("Test Contact page with wrong data", () => {
  it('Visit the Contact page with path "/us/contact"', () => {
    cy.visit("/us/contact").wait(500);
  });

  it("Call the form and fill with wrong values", () => {
    // It gets data in fixtures folder to fill form
    cy.fixture("/contact/wrong.json").each((wrong) => {
      const { firstName, lastName, email, comment } = wrong;

      cy.get("[data-cy=first_name]").clear().type(firstName);

      cy.get("[data-cy=last_name]").clear().type(lastName);

      cy.get("[data-cy=email]")
        .clear()
        .type(email)
        .should("have.css", "background-color", "rgb(250, 240, 240)"); // reject input color
      cy.get("span").contains("Please specify a valid email");

      cy.get("[data-cy=comment]").clear().type(comment);
    });
  });

  it("Shouldn't submit the form", () => {
    cy.get('Button[type="submit"]').contains("Send").click();
    cy.get("[data-action=alert-message]"); // Alert after submit
  });
});
