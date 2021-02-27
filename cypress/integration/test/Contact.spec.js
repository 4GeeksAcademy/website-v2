context("Contact Form", () => {
  it('Must visit the Contact with path "/us/contact"', () => {
    cy.visit("localhost:8000/us/contact").wait(4000);

    cy.location().should((location) => {
      expect(location.pathname).to.eq("/us/contact");
    });
  });

  it("Call fill the form", () => {
    cy.get("#contact-form");
    cy.get('Input[name="first_name"]')
      .type("pedro")
      .should("have.value", "pedro");

    cy.get('Input[name="last_name"]')
      .type("rodriguez")
      .should("have.value", "rodriguez");

    cy.get('Input[name="email"]')
      .type("pd_test_@gmail.com")
      .should("have.value", "pd_test_@gmail.com");

    cy.get('TextArea[name="client_comments"]').type(
      "hola mundoooooo 123ww wsl"
    );
  });

  it("Submit the form with values", () => {
    cy.get('Button[type="submit"]').click({ multiple: true });
  });
});
