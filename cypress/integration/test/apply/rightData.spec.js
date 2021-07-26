context('Test Apply page with correct data', () => {

  it('Call the form and fill with right values', () => {
    cy.visit('/us/apply').wait(4000);
    // It gets data in fixtures folder to fill form
    cy.fixture('/apply/names.json').then((data) => {
      const { firstName } = data.user;

      cy.get('[data-cy=first_name]')
        .click()
        .wait(200)
        .should('have.css', 'border-color', 'rgb(0, 0, 0)') // focus the form
        .type(firstName);
    });

    cy.get('[data-cy=dropdown_program_selector]')
      .click()
      .wait(1200); // Gets Drowpdown of Courses
    cy.get('#react-select-2-option-1').click(); // Selects Level 1 with position 0

    cy.get('[data-cy=dropdown_academy_selector]')
      .click()
      .wait(1200);
    cy.get('#react-select-3-option-0').click();

    cy.fixture('/apply/form_values/right.json').each((right) => {
      cy.get('[data-cy=email]')
        .click()
        .wait(200)
        .should('have.css', 'border-color', 'rgb(0, 0, 0)')
        .wait(200)
        .clear()
        .type(right.email);

      cy.get('[data-cy=phone]')
        .click()
        .wait(200)
        .should('have.css', 'border-color', 'rgb(0, 0, 0)')
        .wait(500)
        .clear()
        .type(right.phone);
    });
  });

  it('Should submit the form', () => {
      cy.get('Button[type="submit"]')
        .contains('APPLY')

    cy.request({
      url: `https://breathecode-cypress.herokuapp.com/v1/marketing/lead`,
      method: 'POST',
      body: {
        automations: 'strong',
        browser_lang: null,
        city: 'Miami',
        consent: true,
        country: 'USA',
        course: 'software-engineering',
        email: 'mark@outlook.com',
        first_name: 'Tomas',
        language: 'us',
        latitude: null,
        location: 'downtown-miami',
        longitude: null,
        phone: '1234567890',
        referral_key: '',
        tags: 'website-lead',
        utm_language: 'us',
        utm_url: 'http://localhost:8080/us/apply',
      },
    });
    
  });
});
