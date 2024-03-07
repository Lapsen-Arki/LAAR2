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
  /*   it("Visit results page", () => {
    cy.visit("/results");
  }); */
  it("Visit profile page", () => {
    cy.visit("/profile");
  });
  it("Visit dashboard page", () => {
    cy.visit("/profile-share");
  });
  it("Visit admin page", () => {
    cy.visit("/admin");
  });
  it("Visit about page", () => {
    cy.visit("/account");
  });
  it("Visit contact page", () => {
    cy.visit("/subscription");
  });
  it("Visit terms page", () => {
    cy.visit("/shopping-list");
  });
});
