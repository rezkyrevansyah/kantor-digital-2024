describe("Keuangan - Right Navbar", () => {
  Cypress.on("uncaught:exception", (err: Error, runnable: Mocha.Runnable) => {
    return false; // Ignore uncaught exceptions globally
  });

  beforeEach(() => {
    cy.visit("https://kotapalembang.baznas.go.id/");

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

  it("Mengecek apakah file bisa diakses", () => {
    cy.contains("404").should("not.exist");

    const rowSelector = ".table-responsive table tbody tr";

    cy.get(rowSelector)
      .should("exist")
      .then((rows) => {
        const rowCount = rows.length;
        cy.log(`Number of rows: ${rowCount}`);
      });

    cy.get(rowSelector).each(($row, index, $rows) => {
      cy.log(`Checking row ${index + 1} of ${$rows.length}`);

      cy.wrap($row)
        .find("i.fas.fa-book")
        .should("exist")
        .and("be.visible")
        .click({ force: true })
        .then(() => {
          cy.log(`Icon clicked successfully in row ${index + 1}`);
        });

      cy.wrap($row)
        .find("a[href]")
        .should("have.attr", "href")
        .then((href) => {
          if (typeof href === "string") {
            cy.request({ url: href, failOnStatusCode: false }).then(
              (response) => {
                if (response.status === 200) {
                  cy.log(`Valid link found in row ${index + 1}: ${href}`);
                } else {
                  cy.log(
                    `Invalid link in row ${index + 1}: ${href}, Status: ${
                      response.status
                    }`
                  );
                }
              }
            );
          }
        });
    });
  });
});
