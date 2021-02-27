context("Open Choose Program", () => {
  beforeEach(() => {
    cy.visit("localhost:8000/").wait(7000);
    cy.get("#Choose-Programs").contains("The Programs").click();
  });
  it("Click in Level 1: Full-Stack Developer", () => {
    cy.get("#Choose-Programs")
      .contains("Level 1: Full-Stack Developer")
      .click();
    cy.location().should((location) => {
      expect(location.pathname).to.eq(
        "/us/course/full-stack-web-development-bootcamp-part-time"
      );
    });
  });
  it("Click in Level 2: Software Engineer", () => {
    cy.get("#Choose-Programs").contains("Level 2: Software Engineer").click();
    cy.location().should((location) => {
      expect(location.pathname).to.eq(
        "/us/course/software-engineering-coding-bootcamp"
      );
    });
  });
  it("Click in Online / Remote", () => {
    cy.get("#Choose-Programs").contains("Online / Remote").click();
    cy.location().should((location) => {
      expect(location.pathname).to.eq(
        "/us/course/full-stack-web-development-bootcamp-part-time"
      );
    });
  });
});
