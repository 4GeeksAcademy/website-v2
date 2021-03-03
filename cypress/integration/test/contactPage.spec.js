/// <reference types="cypress" />

context("Contact Form", () => {
  it('Must visit the Contact with path "/us/contact"', () => {
    cy.visit("localhost:8000/us/contact").wait(4000);

    cy.location().should((location) => {
      expect(location.pathname).to.eq("/us/contact/");
    });
  });

  it("Call the form and fill out", () => {
    cy.get("#contact-form");
    cy.get('Input[name="first_name"]').type("Ariel")

    cy.get('Input[name="last_name"]').type("C. Serrano")

    cy.get('Input[name="email"]').type("calisayaariel62@gmail.com")

    cy.get('TextArea[name="client_comments"]').type("testing form with cypress")

    cy.request({
      url: "https://breathecode.herokuapp.com/v1/marketing/lead",
      method: "POST",
      form: true,
      body: {
        first_name: "Ariel",
        last_name: "C. Serrano",
        email: "calisayaariel62@gmail.com",
        client_comments: "testing form with cypress"
      },
    });
    
  });
  it("Submit the form with values to api", () => {
  cy.get('Button[type="submit"]').contains("Send").click();
  // cy.get("Column > H3").contains("Thank you 🤣 Gracias").log("success")

    
  //   // try request
  //   cy.visit({
  //     url: "https://breathecode.herokuapp.com/v1/marketing/lead",
  //     method: "POST",
  //     form: true,
  //     body: {
  //       first_name: "Ariel",
  //       last_name: "C. Serrano",
  //       email: "calisayaariel62@gmail.com",
  //       client_comments: "testing form with cypress"
  //     },
  //   });
  });
});