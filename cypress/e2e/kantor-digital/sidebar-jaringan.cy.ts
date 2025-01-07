describe("Sidebar - Jaringan", () => {
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

  it("TC-KD-029 Testing Halaman Jaringan Pada Right Navigation Bar", () => {
    // 1. Buka hamburger bar
    cy.get(".navbar-nav > .nav-item > .nav-link").click();
    cy.get(".sidebar").should("be.visible");

    // 2. Klik JARINGAN
    cy.get(":nth-child(7) > .nav-link").click();

    cy.contains("PHP Error").should("not.exist");
    cy.contains("404").should("not.exist");
    cy.get(
      ".card-body > :nth-child(1) > :nth-child(1) > .text-capitalize"
    ).should("exist");
    cy.get("h5.color-main").should("exist");
    cy.get("#myTabContent").should("exist");

    // Validasi halaman yang terbuka dengan memastikan statusnya 200
    cy.url().then((currentUrl) => {
      cy.request(currentUrl).then((response) => {
        expect(response.status).to.eq(200); // Pastikan status 200 OK
      });
    });

    // Buka sub-menu atau elemen tambahan
    cy.get(".collapsed").click();
    cy.get("#baznaskabkota > ol").should("exist");

    // Cek apakah elemen #laz-provinsi ada
    cy.get("body").then(($body) => {
      if ($body.find("#laz-provinsi").length) {
        // Jika elemen #laz-provinsi ada, klik tab LAZ Provinsi
        cy.get("#laz-provinsi").click();
        cy.get("#baznaskabkota > ol").should("exist");

        cy.get("#laz-kota").click();
        cy.get("#baznaskabkota > ol").should("exist");
      }
    });
  });
});
