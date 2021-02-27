context("Home Page", () => {
  it('The path Home must be "/"', () => {
    cy.visit("localhost:8000/").wait(5000);

    cy.location().should((location) => {
      expect(location.pathname).to.eq("/");
    });
  });

  it('Shoud open and close the "CHOOSE PROGRAM" section', () => {
    cy.get("button").contains("CHOOSE PROGRAM").click();
  });
});
