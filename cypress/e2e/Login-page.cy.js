describe("Login page", () => {
  it("Visit login page", () => {
    cy.visit("/login");
    cy.get("form > :nth-child(1)").should("be.visible");
    cy.get("form > :nth-child(2)").should("be.visible");
    cy.get("form > .MuiButton-root").should("be.visible");
  });
  it("Login with incorrect credentials", () => {
    cy.visit("/login");
    cy.get("form > :nth-child(1)").type("testuser");
    cy.get("form > :nth-child(2)").type("password");
    cy.get("form > .MuiButton-root").click();
    cy.get("form > .MuiPaper-root").should("be.visible");
  });
  it("Login with no email", () => {
    cy.visit("/login");
    cy.get("form > :nth-child(2)").type("password");
    cy.get("form > .MuiButton-root").click();
    cy.get("form > .MuiPaper-root").should("not.exist");
  });
  it("Successful login", () => {
    cy.visit("/login");
    cy.get("form > :nth-child(1)").type("t4255476@gmail.com");
    cy.get("form > :nth-child(2)").type("TESTAUKSIENtesti2!");
    cy.get("form > .MuiButton-root").click();
    cy.get("form > .MuiPaper-root").should("be.visible");
    cy.url().should("eq", Cypress.config().baseUrl + "/");
  });
});
