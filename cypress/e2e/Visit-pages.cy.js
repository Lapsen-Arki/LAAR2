describe("Visit pages", () => {
  it("Visit frontpage", () => {
    cy.visit("/");
  });
  it("Visit login page", () => {
    cy.visit("/login");
  });
  it("Visit register page", () => {
    cy.visit("/register");
  });
});
