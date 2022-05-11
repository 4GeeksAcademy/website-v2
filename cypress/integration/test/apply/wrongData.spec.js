context("Test Apply page with wrong data", () => {
  it('Visit the Apply page with path "/us/apply"', () => {
    cy.visit("/us/apply").wait(500);
  });

  it("Call the form and fill with wrong values", () => {
    // It gets data in fixtures folder to fill form
    cy.fixture("/contact/wrong.json").each((wrong) => {
      const { firstName } = wrong;

      cy.get("[data-cy=first_name]").clear({ force: true }).type(firstName);
    });

    cy.fixture("/apply/form_values/wrong.json").each((wrong) => {
      const { email, phone } = wrong;

      cy.get("[data-cy=email]")
        .clear({ force: true })
        .type(email)
        .should("have.css", "background-color", "rgb(250, 240, 240)"); // reject input color
      cy.get("span").contains("Please specify a valid email");

      cy.get("[data-cy=phone]")
        .clear({ force: true })
        .type(phone)
        .should("have.css", "background-color", "rgb(250, 240, 240)"); // reject input color
      cy.get("span").contains("Please specify a valid phone number");
    });
    cy.get("#dropdown_program_selector").click({ force: true }).wait(2000).type("level 1 {enter}", { force: true })
       

    cy.get("#dropdown_academy_selector").click({ force: true }).wait(2000).type("miami {enter}", { force: true })
  });

  it("Shouldn't submit the form", () => {
    cy.get('Button[type="submit"]').contains("APPLY").click({ force: true });
    cy.get("[data-cy=alertText]"); // Alert after submit
  });
});
