describe("Sidebar - Halaman Berita", () => {
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

    // 1. Buka hamburger bar
    cy.get(".navbar-nav > .nav-item > .nav-link").click();
    cy.get(".sidebar").should("be.visible");

    // 2. Klik BERITA
    cy.get(".nav-pills > :nth-child(3) > .nav-link").click();
  });

  it("TC-KD-006 Menampilkan berita pada banner", () => {
    cy.get(".owl-item .item div[style]").each(($el) => {
      // Ambil nilai dari atribut style
      const style = $el.attr("style");

      // Pastikan atribut style ada
      if (style && style.includes("background-image")) {
        // Cari URL langsung dari string style tanpa regex
        const startIndex = style.indexOf("url(") + 4;
        const endIndex = style.indexOf(")", startIndex);
        const imageUrl = style
          .substring(startIndex, endIndex)
          .replace(/['"]/g, "");

        // Validasi URL gambar dengan request
        cy.request(imageUrl).then((response) => {
          expect(response.status).to.eq(200);
          cy.log(`Image URL validated: ${imageUrl}`);
        });
      } else {
        cy.log("No background-image found for this element.");
      }
    });
  });

  it("TC-KD-007 Menampilkan berita pada list", () => {
    // dapatkan list
    cy.get(".col-12 > .row > .col-4 > a > .w-100").then(($items) => {
      const itemCount = $items.length; // hitung item

      // Iterasi
      for (let i = 0; i < itemCount; i++) {
        cy.get(
          `:nth-child(${i + 1}) > .col-12 > .row > .col-4 > a > .w-100`
        ).click();
        cy.contains("404 Page Not Found").should("not.exist");
        cy.get(".p-3 > .color-main").should("exist");
        cy.go("back");
      }
    });
  });
});
