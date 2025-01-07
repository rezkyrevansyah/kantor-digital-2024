describe("Sidebar - Event", () => {
  Cypress.on("uncaught:exception", (err: Error, runnable: Mocha.Runnable) => {
    return false; // Ignore uncaught exceptions globally
  });

  beforeEach(() => {
    cy.visit("/");

    // 1. Buka hamburger bar
    cy.get(".navbar-nav > .nav-item > .nav-link").click();
    cy.get(".sidebar").should("be.visible");

    // 2. Klik LAPORAN
    cy.get(':nth-child(6) > [href="#"] > .text-uppercase').parent().click();

    // 3. Klik menu Keuangan
    cy.get(".menu-open > .nav > .nav-item > .nav-link").click();

    cy.get(".bg-main > .text-white").should("exist");
    cy.get(".table-responsive").should("exist");
  });

  it("Sidebar - Event", () => {
    // 1. Buka hamburger bar
    cy.get(".navbar-nav > .nav-item > .nav-link").click();
    cy.get(".sidebar").should("be.visible");

    // 2. Klik Registrasi
    cy.get('.nav-pills > :nth-child(8) > [href="#"]').click();
    cy.get(".menu-is-opening > .nav > .nav-item > .nav-link").click();

    // Validasi halaman yang terbuka dengan memastikan statusnya 200
    cy.url().then((currentUrl) => {
      cy.request(currentUrl).then((response) => {
        expect(response.status).to.eq(200); // Pastikan status 200 OK
      });
    });

    cy.contains("PHP Error").should("not.exist");
    cy.contains("404").should("not.exist");
    cy.get(".mt-1 > :nth-child(1)").should("exist");
    cy.get(".container > .color-main").should("exist");
  });
});
