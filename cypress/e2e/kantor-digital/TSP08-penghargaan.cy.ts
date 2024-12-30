describe("Penghargaan - Right Navbar", () => {
  Cypress.on("uncaught:exception", (err, runnable) => {
    return false;
  });

  beforeEach(() => {
    cy.visit("sumsel.baznas.go.id");
    cy.get(".navbar-nav > .nav-item > .nav-link").click();
    cy.get(".sidebar").should("be.visible");

    cy.get(
      "#control_sidebar > div > div > aside > div > nav > ul > li:nth-child(2) > a"
    ).click();

    cy.get(
      "#control_sidebar > div > div > aside > div > nav > ul > li.nav-item.has-treeview.menu-open > ul > li:nth-child(3) > a"
    ).click();
    cy.get(
      "#control_sidebar > div > div > div.content-wrapper > section > div > div > div > div:nth-child(1) > h4"
    ).should("be.visible");
  });

  it("should click buttons corresponding to the years in contents", () => {
    // Ambil semua elemen dengan kelas 'contents' dan ambil tahun dari kelasnya
    cy.get(".col-md-6.p-2.contents").each(($el) => {
      const className = $el.attr("class"); // Ambil semua kelas

      if (className) {
        const yearMatch = className.match(/(\d{4})/); // Cari tahun (4 digit)

        if (yearMatch) {
          const year = yearMatch[0]; // Ambil tahun yang ditemukan

          // Klik tombol yang memiliki value yang sesuai dengan tahun
          cy.get(`button[value="awd_${year}"]`).then(($buttons) => {
            // Pastikan kita hanya mengklik tombol yang ada
            if ($buttons.length > 0) {
              // Klik tombol pertama yang ditemukan
              cy.wrap($buttons[0]).click();
            }
          });
        }
      }
    });
  });
});
