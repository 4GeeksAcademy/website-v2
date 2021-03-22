context("Regex test form", () => {
  it('Visit the Apply page with path "/us/apply"', () => {
    cy.visit("/apply").wait(500);
    cy.location().should((location) => {
      expect(location.pathname).to.eq("/us/apply");
    });
  });

  it("Call the form and fill with wrong values", () => {
    // It gets data in fixtures folder to fill form
    cy.fixture("/apply/names.json").then((data) => {
      const { firstName, lastName } = data.robot;

      cy.get("[data-cy=first_name]").type(firstName);

      cy.get("[data-cy=last_name]").type(lastName);
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
    cy.get(":nth-child(2) > .Form__Alert-iZcfNU") // Alert after submit
  })
});
