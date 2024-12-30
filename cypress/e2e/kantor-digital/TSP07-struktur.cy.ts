describe("Struktur Baznas", () => {
  Cypress.on("uncaught:exception", (err, runnable) => {
    return false;
  });

  beforeEach(() => {
    cy.visit("/");

    // Validasi halaman yang terbuka dengan memastikan statusnya 200
    cy.url().then((currentUrl) => {
      cy.request(currentUrl).then((response) => {
        expect(response.status).to.eq(200); // Pastikan status 200 OK
      });
    });

    // Buka hamburger bar
    cy.get(".navbar-nav > .nav-item > .nav-link").click();
    cy.get(".sidebar").should("be.visible");

    // Klik tentang BAZNAS
    cy.get(
      "#control_sidebar > div > div > aside > div > nav > ul > li:nth-child(2) > a"
    ).click();

    // Klik Struktur BAZNAS
    cy.get(
      "#control_sidebar > div > div > aside > div > nav > ul > li.nav-item.has-treeview.menu-open > ul > li:nth-child(2) > a"
    ).click();
    cy.get(".pl-2").should("exist");

    cy.wait(2000);
  });

  it("should check each col-6 p-1 and validate details", () => {
    cy.get(".row .col-6.p-1 a").each(($link) => {
      const href = $link.prop("href");
      cy.request(href).its("status").should("eq", 200);
    });

    cy.get(".row .col-6.p-1").then(($elements) => {
      const count = $elements.length;
      cy.log(`Number of col-6 p-1 elements: ${count}`);
      expect(count).to.be.greaterThan(0);

      for (let i = 0; i < count; i++) {
        cy.get(".row .col-6.p-1").eq(i).find("a").click();

        cy.url().should("include", "/struktur-baznas-detail");

        // Ambil isi dari <h1> di halaman detail
        cy.get(
          "h1.text-capitalize.color-main.font-weight-bold.text-center.mb-0"
        )
          .invoke("text")
          .then((h1Text) => {
            // Kembali ke halaman struktur
            cy.go("back");

            // Ambil isi dari <p> di halaman struktur
            cy.get(".row .col-6.p-1")
              .eq(i)
              .find("p.color-main.mb-0.font-weight-bold.font-14")
              .invoke("text")
              .then((pText) => {
                // Bandingkan isi <h1> dan <p>
                expect(h1Text.trim()).to.equal(pText.trim());
              });
          });

        cy.url().should("include", "/struktur-baznas");
      }
    });
  });
});
