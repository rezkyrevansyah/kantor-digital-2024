describe("Sidebar - Layanan", () => {
  Cypress.on("uncaught:exception", (err, runnable) => {
    return false;
  });

  beforeEach(() => {
    cy.visit("/");

    // Buka hamburger bar
    cy.get(".navbar-nav > .nav-item > .nav-link").click();
    cy.get(".sidebar").should("be.visible");

    // Klik tentang BAZNAS
    cy.get(
      "#control_sidebar > div > div > aside > div > nav > ul > li:nth-child(2) > a"
    ).click();

    cy.get(':nth-child(5) > [href="#"]').click();
    cy.get(
      "#control_sidebar > div > div > aside > div > nav > ul > li.nav-item.has-treeview.menu-open > ul"
    ).should("be.visible");
  });

  it("Test Halaman Agenda Pimpinan BAZNAS", () => {
    cy.get(".nav-pills > :nth-child(4) > .nav-link").click();

    // Validasi halaman yang terbuka dengan memastikan statusnya 200
    cy.url().then((currentUrl) => {
      cy.request(currentUrl).then((response) => {
        expect(response.status).to.eq(200); // Pastikan status 200 OK
      });
    });

    cy.get(":nth-child(2) > :nth-child(1) > .col-12 > .row").should("exist");
  });
});
