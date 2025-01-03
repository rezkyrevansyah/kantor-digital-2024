describe("Sidebar - Tentang Baznas", () => {
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
  });

  it("Test Halaman Profil BAZNAS", () => {
    cy.get(
      "#control_sidebar > div > div > aside > div > nav > ul > li.nav-item.has-treeview.menu-is-opening.menu-open > ul > li:nth-child(1) > a"
    ).click();

    // Klik Profil BAZNAS
    cy.get(
      "#control_sidebar > div > div > aside > div > nav > ul > li.nav-item.has-treeview.menu-is-opening.menu-open > ul > li:nth-child(1) > a"
    ).click();

    // Validasi halaman yang terbuka dengan memastikan statusnya 200
    cy.url().then((currentUrl) => {
      cy.request(currentUrl).then((response) => {
        expect(response.status).to.eq(200); // Pastikan status 200 OK
      });
    });

    cy.get("b").should("exist");
    cy.get(":nth-child(2) > .text-capitalize").should("exist");
  });

  it("Test Halaman Struktur BAZNAS", () => {
    cy.get(
      "#control_sidebar > div > div > aside > div > nav > ul > li.nav-item.has-treeview.menu-open > ul > li:nth-child(2) > a"
    ).click();

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

  it("Test Halaman Penghargaan", () => {
    cy.get(
      "#control_sidebar > div > div > aside > div > nav > ul > li.nav-item.has-treeview.menu-open > ul > li:nth-child(3) > a"
    ).click();
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

  it("Test Halaman Mitra Baznas", () => {
    // 3. klik menu mitra baznas
    cy.get(
      "#control_sidebar > div > div > aside > div > nav > ul > li.nav-item.has-treeview.menu-open > ul > li:nth-child(4) > a"
    ).click();

    // Validasi halaman yang terbuka dengan memastikan statusnya 200
    cy.url().then((currentUrl) => {
      cy.request(currentUrl).then((response) => {
        expect(response.status).to.eq(200); // Pastikan status 200 OK
      });
    });

    cy.get(".card-body > :nth-child(1) > :nth-child(1) > .color-main").should(
      "exist"
    );
  });

  it("Test Halaman Pemberitahuan", () => {
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

  it("Test Halaman Kontak Baznas", () => {
    cy.get(".menu-open > .nav > :nth-child(6) > .nav-link > p").click();

    // Validasi halaman yang terbuka dengan memastikan statusnya 200
    cy.url().then((currentUrl) => {
      cy.request(currentUrl).then((response) => {
        expect(response.status).to.eq(200); // Pastikan status 200 OK
      });
    });

    cy.get(".text").should("exist");
    cy.get(".col-12.mt-3 > :nth-child(4)").should("exist");
  });
});
