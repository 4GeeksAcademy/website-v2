context("Regex test form", () => {
  it('Visit the Apply page with path "/us/apply"', () => {
    cy.visit("/apply").wait(500);
    cy.location().should((location) => {
      expect(location.pathname).to.eq("/us/apply");
    });
  });

  it("Call the form and verify that the regex is rejecting wrong values", () => {
    // It gets data in fixtures folder to fill form
    cy.fixture("/contact/fillContact.json").then((data) => {
      const { name, lastName, email } = data.applyValues.wrongValues;

      cy.get("[data-cy=first_name]").type(name);

      cy.get("[data-cy=last_name]").type(lastName);

      cy.get("[data-cy=dropdown_program_selector]").click().wait(500); // Gets Drowpdown of Courses
      cy.get("#react-select-2-option-1").click(); // Selects Level 2 with option 1
    });

    // Get the list of wrong emails and fill it
    cy.fixture("/contact/email/wrong.json").each((wrong) => {
      cy.get("[data-cy=email]")
        .clear()
        .type(wrong.email)
        .should("have.css", "background-color", "rgb(255, 205, 201)"); // reject input color

      // Get the list of wrong phone numbers and fill it
    });
    cy.fixture("/contact/phone/wrong.json").each((wrong) => {
      cy.get("[data-cy=phone]")
        .clear()
        .type(wrong.phone)
        .should("have.css", "background-color", "rgb(255, 205, 201)");
      cy.get("span").contains("Please specify a valid phone number");
    });

    cy.get('Button[type="submit"]').contains("APPLY").click().wait(500);
  });
});
