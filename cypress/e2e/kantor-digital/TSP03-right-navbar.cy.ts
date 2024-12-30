//* Test Scenario : memastikan navigasi right navbar berjalan berjalan dengan baik

describe("Memastikan navigasi right navbar berjalan berjalan dengan baik", () => {
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
  });

  it("TC-KD-004 Testing Halaman Beranda Pada Right Navigation Bar", () => {
    // Buka hamburger bar
    cy.get(".navbar-nav > .nav-item > .nav-link").click();
    cy.get(".sidebar").should("be.visible");

    // Klik beranda
    // Expected results : berhasil menampilkan beranda
    cy.get(
      "#control_sidebar > div > div > aside > div > nav > ul > li:nth-child(1) > a"
    ).click();

    // Validasi halaman yang terbuka dengan memastikan statusnya 200
    cy.url().then((currentUrl) => {
      cy.request(currentUrl).then((response) => {
        expect(response.status).to.eq(200); // Pastikan status 200 OK
      });
    });
  });

  it("TC-KD-005 Testing Halaman Profil BAZNAS Pada Right Navigation Bar", () => {
    // Buka hamburger bar
    cy.get(".navbar-nav > .nav-item > .nav-link").click();
    cy.get(".sidebar").should("be.visible");

    // Klik tentang BAZNAS
    cy.get(
      "#control_sidebar > div > div > aside > div > nav > ul > li:nth-child(2) > a"
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

  it("TC-KD-006 Testing Halaman Struktur BAZNAS Pada Right Navigation Bar", () => {
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

    // Validasi halaman yang terbuka dengan memastikan statusnya 200
    cy.url().then((currentUrl) => {
      cy.request(currentUrl).then((response) => {
        expect(response.status).to.eq(200); // Pastikan status 200 OK
      });
    });

    cy.get(".pl-2").should("exist");
  });

  it("TC-KD-007 Testing Halaman Penghargaan Pada Right Navigation Bar", () => {
    // 1. Buka hamburger bar
    cy.get(".navbar-nav > .nav-item > .nav-link").click();
    cy.get(".sidebar").should("be.visible");

    // 2. Klik tentang BAZNAS
    cy.get(
      "#control_sidebar > div > div > aside > div > nav > ul > li:nth-child(2) > a"
    ).click();

    // 3. Klik Penghargaan
    //     Expected results : berhasil menampilkan halaman penghargaan
    cy.get(
      "#control_sidebar > div > div > aside > div > nav > ul > li.nav-item.has-treeview.menu-open > ul > li:nth-child(3) > a"
    ).click();

    // Validasi halaman yang terbuka dengan memastikan statusnya 200
    cy.url().then((currentUrl) => {
      cy.request(currentUrl).then((response) => {
        expect(response.status).to.eq(200); // Pastikan status 200 OK
      });
    });

    cy.get(
      "#control_sidebar > div > div > div.content-wrapper > section > div > div > div > div:nth-child(1) > h4"
    ).should("be.visible");
    cy.get(".card-body > :nth-child(1) > :nth-child(1) > .pl-2").should(
      "be.visible"
    );
    cy.get(".col-12.pl-2 > div.d-none").should("be.visible");
  });

  it("TC-KD-008 Testing Halaman Mitra Baznas Pada Right Navigation Bar", () => {
    // 1. Buka hamburger bar
    cy.get(".navbar-nav > .nav-item > .nav-link").click();
    cy.get(".sidebar").should("be.visible");

    // 2. Klik tentang BAZNAS
    cy.get(
      "#control_sidebar > div > div > aside > div > nav > ul > li:nth-child(2) > a"
    ).click();

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

  it("TC-KD-013 Testing Halaman Pemberitahuan Pada Right Navigation Bar", () => {
    // 1. Buka hamburger bar
    cy.get(".navbar-nav > .nav-item > .nav-link").click();
    cy.get(".sidebar").should("be.visible");

    // 2. Klik tentang BAZNAS
    cy.get(
      "#control_sidebar > div > div > aside > div > nav > ul > li:nth-child(2) > a"
    ).click();

    // 3. klik menu pemberitahuan
    cy.get(
      "#control_sidebar > div > div > aside > div > nav > ul > li.nav-item.has-treeview.menu-open > ul > li:nth-child(5) > a"
    ).click();

    // Validasi halaman yang terbuka dengan memastikan statusnya 200
    cy.url().then((currentUrl) => {
      cy.request(currentUrl).then((response) => {
        expect(response.status).to.eq(200); // Pastikan status 200 OK
      });
    });

    cy.get(
      "#control_sidebar > div > div > div.content-wrapper > section > div > div > div > div:nth-child(1) > h4"
    ).should("be.visible");
    cy.get(".table").should("exist");
  });

  it("TC-KD-014 Testing Halaman Kontak Baznas Pada Right Navigation Bar", () => {
    // 1. Buka hamburger bar
    cy.get(".navbar-nav > .nav-item > .nav-link").click();
    cy.get(".sidebar").should("be.visible");

    // 2. Klik tentang BAZNAS
    cy.get(
      "#control_sidebar > div > div > aside > div > nav > ul > li:nth-child(2) > a"
    ).click();

    // 3. Klik menu kontak BAZNAS
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

  it("TC-KD-015 Testing Halaman Berita Pada Right Navigation Bar", () => {
    // 1. Buka hamburger bar
    cy.get(".navbar-nav > .nav-item > .nav-link").click();
    cy.get(".sidebar").should("be.visible");

    // 2. Klik BERITA
    cy.get(".nav-pills > :nth-child(3) > .nav-link").click();

    // Validasi halaman yang terbuka dengan memastikan statusnya 200
    cy.url().then((currentUrl) => {
      cy.request(currentUrl).then((response) => {
        expect(response.status).to.eq(200); // Pastikan status 200 OK
      });
    });

    cy.get(".active > .item > .bg-main > .d-none").should("exist");
  });

  it("TC-KD-016 Testing Halaman Agenda Pimpinan Pada Right Navigation Bar", () => {
    // 1. Buka hamburger bar
    cy.get(".navbar-nav > .nav-item > .nav-link").click();
    cy.get(".sidebar").should("be.visible");

    // 2. Klik agenda pimpinan
    cy.get(".nav-pills > :nth-child(4) > .nav-link").click();

    // Validasi halaman yang terbuka dengan memastikan statusnya 200
    cy.url().then((currentUrl) => {
      cy.request(currentUrl).then((response) => {
        expect(response.status).to.eq(200); // Pastikan status 200 OK
      });
    });

    cy.get(":nth-child(2) > :nth-child(1) > .col-12 > .row").should("exist");
  });

  it("TC-KD-017 Testing Halaman Konfirmasi ZIS Pada Right Navigation Bar", () => {
    // 1. Buka hamburger bar
    cy.get(".navbar-nav > .nav-item > .nav-link").click();
    cy.get(".sidebar").should("be.visible");

    // 2. Klik LAYANAN
    cy.get(':nth-child(5) > [href="#"]').click();
    cy.get(
      "#control_sidebar > div > div > aside > div > nav > ul > li.nav-item.has-treeview.menu-open > ul"
    ).should("be.visible");

    // 3. klik menu Konfirmasi ZIS
    cy.get(".menu-is-opening > .nav > :nth-child(1) > .nav-link").click();

    // Validasi halaman yang terbuka dengan memastikan statusnya 200
    cy.url().then((currentUrl) => {
      cy.request(currentUrl).then((response) => {
        expect(response.status).to.eq(200); // Pastikan status 200 OK
      });
    });

    cy.get(".container > .color-main").should("exist");
    cy.get(".mt-1 > :nth-child(1)").should("exist");
    cy.contains("PHP Error").should("not.exist");
  });

  it("TC-KD-018 Testing Halaman Kalkulator Zakat Pada Right Navigation Bar", () => {
    // 1. Buka hamburger bar
    cy.get(".navbar-nav > .nav-item > .nav-link").click();
    cy.get(".sidebar").should("be.visible");

    // 2. Klik LAYANAN
    cy.get(':nth-child(5) > [href="#"]').click();
    cy.get(
      "#control_sidebar > div > div > aside > div > nav > ul > li.nav-item.has-treeview.menu-open > ul"
    ).should("be.visible");

    // 3. klik menu Kalkulator Zakat
    cy.get(".menu-is-opening > .nav > :nth-child(2) > .nav-link").click();

    // Validasi halaman yang terbuka dengan memastikan statusnya 200
    cy.url().then((currentUrl) => {
      cy.request(currentUrl).then((response) => {
        expect(response.status).to.eq(200); // Pastikan status 200 OK
      });
    });

    cy.get(".row > :nth-child(1) > .color-main").should("exist");
    cy.get("#calculator_type").should("exist");
    cy.get("#penghasilan > .pl-3").should("exist");
  });

  it("TC-KD-019 Testing Halaman Info Rekening Zakat Pada Right Navigation Bar", () => {
    // 1. Buka hamburger bar
    cy.get(".navbar-nav > .nav-item > .nav-link").click();
    cy.get(".sidebar").should("be.visible");

    // 2. Klik LAYANAN
    cy.get(':nth-child(5) > [href="#"]').click();
    cy.get(
      "#control_sidebar > div > div > aside > div > nav > ul > li.nav-item.has-treeview.menu-open > ul"
    ).should("be.visible");

    // 3. klik menu Info Rekening Zakat
    cy.get(".menu-is-opening > .nav > :nth-child(3) > .nav-link").click();

    // Validasi halaman yang terbuka dengan memastikan statusnya 200
    cy.url().then((currentUrl) => {
      cy.request(currentUrl).then((response) => {
        expect(response.status).to.eq(200); // Pastikan status 200 OK
      });
    });

    cy.get(".bg-main > .text-white").should("exist");
    cy.get(".col-6 > .color-main").should("exist");
    cy.get("#zakat").should("exist");
    cy.get(".mr-3").should("exist");
    cy.get(".mr-3").should("exist");
  });

  it("TC-KD-020 Testing Halaman Keuangan Pada Right Navigation Bar", () => {
    // 1. Buka hamburger bar
    cy.get(".navbar-nav > .nav-item > .nav-link").click();
    cy.get(".sidebar").should("be.visible");

    // 2. Klik LAPORAN
    cy.get(':nth-child(6) > [href="#"] > .text-uppercase').parent().click();

    // 3. klik menu Keuangan
    cy.get(".menu-open > .nav > .nav-item > .nav-link").click();

    cy.get(".bg-main > .text-white").should("exist");
    cy.get(".table-responsive").should("exist");

    // Validasi halaman yang terbuka dengan memastikan statusnya 200
    cy.url().then((currentUrl) => {
      cy.request(currentUrl).then((response) => {
        expect(response.status).to.eq(200); // Pastikan status 200 OK
      });
    });
  });

  it("TC-KD-021 Testing Halaman Jaringan Pada Right Navigation Bar", () => {
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

  it("TC-KD-022 Testing Halaman Registrasi Pada Right Navigation Bar", () => {
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