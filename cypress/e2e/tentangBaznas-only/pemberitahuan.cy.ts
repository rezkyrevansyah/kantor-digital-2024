describe("Pemberitahuan - Right Navbar", () => {
  Cypress.on("uncaught:exception", (err, runnable) => {
    return false; // Abaikan uncaught exceptions
  });

  beforeEach(() => {
    cy.visit("sumsel.baznas.go.id");
    // 1. Buka hamburger bar
    cy.get(".navbar-nav > .nav-item > .nav-link").click();
    cy.get(".sidebar").should("be.visible");

    // 2. Klik tentang BAZNAS
    cy.get(
      "#control_sidebar > div > div > aside > div > nav > ul > li:nth-child(2) > a"
    ).click();

    // 3. Klik menu pemberitahuan
    cy.get(
      "#control_sidebar > div > div > aside > div > nav > ul > li.nav-item.has-treeview.menu-open > ul > li:nth-child(5) > a"
    ).click();
    cy.get(
      "#control_sidebar > div > div > div.content-wrapper > section > div > div > div > div:nth-child(1) > h4"
    ).should("be.visible");
    cy.get(".table").should("exist");
  });

  it("Memastikan file bisa tampil", () => {
    const rowSelector = ".table-responsive table tbody tr";

    // Hitung jumlah baris tabel
    cy.get(rowSelector)
      .should("exist")
      .then((rows) => {
        const rowCount = rows.length;
        cy.log(`Number of rows: ${rowCount}`);
      });

    // Iterasi untuk setiap baris
    cy.get(rowSelector).each(($row, index) => {
      cy.log(`Checking row ${index + 1}`);

      // Cari semua link dalam baris
      cy.wrap($row)
        .find("a[href]")
        .each(($link) => {
          const url = $link.attr("href"); // Ambil URL

          if (url && url.startsWith("http")) {
            // Kirim permintaan HTTP untuk memvalidasi status
            cy.request({ url, failOnStatusCode: false }).then((response) => {
              if (response.status === 200) {
                cy.log(`Valid link in row ${index + 1}: ${url}`);
              } else {
                cy.log(
                  `Invalid link in row ${index + 1}: ${url}, Status: ${
                    response.status
                  }`
                );
              }
            });
          } else {
            cy.log(`Skipping invalid or non-HTTP link in row ${index + 1}`);
          }
        });
    });
  });
});
