context("Contact Form", () => {
  it('Must visit the Contact with path "/us/contact"', () => {
    cy.visit("/contact").wait(2000);
    cy.location().should((location) => {
      expect(location.pathname).to.eq("/us/contact/");
    });
  });

  it("Call the form and verify that the hint for empty inputs are correct", () => {
    // It gets data in fixtures folder to fill form
    cy.fixture("fillContact.json").then((data) => {
      const { name, lastName, email, comment } = data.formValue;

      cy.get("#contact-form"); // --> Select form and type values

      cy.get("[data-cy=first_name]")
        .type(name)
        .clear()
        .should(($input) => {
          const val = $input.val();
          expect(val).to.match(regex.names);
        });
      cy.get("span")
        .contains("Please specify a valid first name")
        .log("Hint alert for First Name has been called");

      cy.get("[data-cy=last_name]")
        .type(lastName)
        .clear()
        .should(($input) => {
          const val = $input.val();
          expect(val).to.match(regex.names);
        });
      cy.get("span")
        .contains("Please specify a valid last name")
        .log("Hint alert for Last Name has been called");

      cy.get("[data-cy=email]")
        .type(email)
        .clear()
        .should(($input) => {
          const val = $input.val();
          expect(val).not.to.match(regex.email);
        });
      cy.get("span")
        .contains("Please specify a valid email")
        .log("Hint alert for email has been called");

      cy.get("[data-cy=comment]")
        .type(comment)
        .clear()
        .should(($input) => {
          const val = $input.val();
          expect(val).not.to.match(regex.text);
        });
    });
  });
  it("Submit the form with empty values", () => {
    cy.get('Button[type="submit"]').contains("Send").click().wait(2000);
  });

  it("Call the form and fill with data values", () => {
    cy.fixture("fillContact.json").then((data) => {
      const { name, lastName, email, comment } = data.formValue;

      cy.get("#contact-form"); // --> Select form and type values

      cy.get('Input[name="first_name"]')
        .type(name)
        .should(($input) => {
          const val = $input.val();
          expect(val).to.match(regex.names);
          expect(val).to.include(name);
          expect(val).not.to.include(regex.number);
        });

      cy.get('Input[name="last_name"]')
        .type(lastName)
        .should(($input) => {
          const val = $input.val();
          expect(val).to.match(regex.names);
          expect(val).to.include(lastName);
          expect(val).not.to.include(regex.number);
        });

      cy.get('Input[name="email"]')
        .type(email)
        .should(($input) => {
          const val = $input.val();
          expect(val).to.match(regex.email); // --> Email Regex
          expect(val).to.include(email);
          expect(val).not.to.include(" ");
        });

      cy.get('TextArea[name="client_comments"]')
        .type(comment)
        .should(($input) => {
          const val = $input.val();
          expect(val).to.match(regex.text);
          expect(val).to.include(comment);
        });
    });
  });
  it("Submit the form with values to api", () => {
    cy.get('Button[type="submit"]').contains("Send").click().wait(2000);
    cy.get(".thankfulness").contains("Thank you 🤣 Gracias").log("success");
  });
});
