context("Test Apply page with correct data", () => {

  it('Visit the Apply page with path "/us/apply"', () => {
    cy.visit("/apply").wait(500);
    cy.location().should((location) => {
      expect(location.pathname).to.eq("/us/apply");
    });
  });

  it("Call the form and fill with right values", () => {
    // It gets data in fixtures folder to fill form
    cy.fixture("/apply/names.json").then((data) => {
      const { firstName, lastName } = data.user;

      cy.get("[data-cy=first_name]")
        .should("have.css", "border-color", "rgb(0, 0, 0)") // focus the form
        .type(firstName);

      cy.get("[data-cy=last_name]")
        .should("have.css", "border-color", "rgb(0, 0, 0)")
        .type(lastName);

      cy.get("[data-cy=dropdown_program_selector]").click().wait(500); // Gets Drowpdown of Courses
      cy.get("#react-select-2-option-0").click(); // Selects Level 1 with position 0
    });
  // });

  // it("Fill the input fields with correct values", () => {
    cy.fixture("/apply/form_values/right.json").each((right) => {
      cy.get("[data-cy=email]")
        .should("have.css", "border-color", "rgb(0, 0, 0)").wait(200)
        .clear()
        .type(right.email);

      cy.get("[data-cy=phone]")
        .should("have.css", "border-color", "rgb(0, 0, 0)").wait(500)
        .clear()
        .type(right.phone);
    });
  })
  
  it("Should submit the form and redirect to thank-you page", () => {
    cy.get('Button[type="submit"]').contains("APPLY").click().wait(500);
    cy.location().should((location) => {
      expect(location.pathname).to.eq("/us/thank-you");
    });
  })

});
