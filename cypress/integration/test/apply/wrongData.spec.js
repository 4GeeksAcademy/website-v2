context("Test Apply page with wrong data", () => {

  it('Start Website', () => {
    cy.visit('/').wait(1500);
  });

  it('Visit the Apply page with path "/us/apply"', () => {
    cy.visit("/us/apply").wait(3500);
    cy.location().should((location) => {
      expect(location.pathname).to.eq("/us/apply");
    });
  });

  it("Call the form and fill with wrong values", () => {
    // It gets data in fixtures folder to fill form
    cy.fixture("/apply/names.json").then((data) => {
      const { firstName, lastName } = data.robot;

      cy.get("[data-cy=first_name]").type(firstName);
    });    
  });

  it("Fill the input fields with wrong values", () => {
    cy.fixture("/apply/form_values/wrong.json").each((wrong) => {
      cy.get("[data-cy=email]")
        .clear()
        .type(wrong.email)
        .should("have.css", "background-color", "rgb(255, 205, 201)"); // reject input color
      cy.get("span").contains("Please specify a valid email");
  
      cy.get("[data-cy=phone]")
        .clear()
        .type(wrong.phone)
        .should("have.css", "background-color", "rgb(255, 205, 201)");
      cy.get("span").contains("Please specify a valid phone number");
    });
  })

  it("Select Program level 2", () => {
    cy.get("[data-cy=dropdown_program_selector]").click().wait(500); // Gets Drowpdown of Courses
    cy.get("#react-select-2-option-1").click(); // Selects Level with option 1
  })
  it("Shouldn't submit the form", () => {
    cy.get('Button[type="submit"]').contains("APPLY").click().wait(500);
    cy.get('[data-cy=alertText]') // Alert after submit
    // cy.get(".Form__Alert-gbvxik") // Alert after submit
  })
});
