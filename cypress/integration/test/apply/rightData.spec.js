context("Regex test form", () => {
  it('Visit the Apply page with path "/us/apply"', () => {
    cy.visit("/apply").wait(500);
    cy.location().should((location) => {
      expect(location.pathname).to.eq("/us/apply");
    });
  });

  it("Call the form and verify that the hint for empty inputs are correct", () => {
    // It gets data in fixtures folder to fill form
    cy.fixture("/contact/fillContact.json").then((data) => {
      const { name, lastName } = data.applyValues.rightValues;

      cy.get("[data-cy=first_name]")
        .should("have.css", "border-color", "rgb(0, 0, 0)") // select the form
        .type(name);

      cy.get("[data-cy=last_name]")
        .should("have.css", "border-color", "rgb(0, 0, 0)")
        .type(lastName);

      cy.get("[data-cy=dropdown_program_selector]").click().wait(500); // Gets Drowpdown of Courses
      cy.get("#react-select-2-option-0").click(); // Selects Level 1 with position 0
    });

    // Get the list of right emails and fill it
    cy.fixture("/contact/email/right.json").each((right) => {
      cy.get("[data-cy=email]")
        .should("have.css", "border-color", "rgb(0, 0, 0)").wait(500)
        .clear()
        .type(right.email);
    });

    // Get the list of right phone numbers and fill it
    cy.fixture("/contact/phone/right.json").each((right) => {
      cy.get("[data-cy=phone]")
        .should("have.css", "border-color", "rgb(0, 0, 0)").wait(500)
        .clear()
        .type(right.phone);
    });
    cy.get('Button[type="submit"]').contains("APPLY").click().wait(500);
  });
});
