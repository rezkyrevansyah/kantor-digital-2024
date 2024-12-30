describe("Bottom navbar check", () => {
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

  it("TC-KD-023 Navigasi ke konfirmasi zakat", () => {
    cy.get(".row > :nth-child(1) > .mb-0").click();
    cy.url().then((currentUrl) => {
      cy.request(currentUrl).then((response) => {
        expect(response.status).to.eq(200); // Pastikan status 200 OK
      });
    });
  });

  it("TC-KD-024 Navigasi ke kalkulator zakat", () => {
    cy.get(":nth-child(2) > .mb-0").click();
    cy.url().then((currentUrl) => {
      cy.request(currentUrl).then((response) => {
        expect(response.status).to.eq(200); // Pastikan status 200 OK
      });
    });
    cy.contains("kalkulator zakat").should("exist");
    cy.contains("A PHP Error was encountered").should("not.exist");
  });

  it("TC-KD-025 Navigasi ke bayar zakat online", () => {
    cy.get(":nth-child(3) > .mb-0").click();
    cy.url().then((currentUrl) => {
      cy.request(currentUrl).then((response) => {
        expect(response.status).to.eq(200); // Pastikan status 200 OK
      });
    });
    cy.get(".desc-zakat").should("exist");
    cy.get("#pay > :nth-child(1)");
    cy.get("#content-payment");
    cy.contains("A PHP Error was encountered").should("not.exist");
  });

  it("TC-KD-026 Navigasi ke sedekah", () => {
    cy.get(":nth-child(4) > .mb-0").click();
    cy.url().then((currentUrl) => {
      cy.request(currentUrl).then((response) => {
        expect(response.status).to.eq(200); // Pastikan status 200 OK
      });
    });
    cy.get(".desc-zakat").should("exist");
    cy.contains("A PHP Error was encountered").should("not.exist");
  });

  it("TC-KD-027 Navigasi ke transfer zakat", () => {
    cy.get(":nth-child(5) > .mb-0").click();
    cy.url().then((currentUrl) => {
      cy.request(currentUrl).then((response) => {
        expect(response.status).to.eq(200); // Pastikan status 200 OK
      });
    });
    cy.get(".col-6 > .color-main").should("exist");
    cy.contains("A PHP Error was encountered").should("not.exist");
  });

  it("TC-KD-028 top navbar -> halaman utama", () => {
    cy.get(".brand-image").click();
    cy.url().then((currentUrl) => {
      cy.request(currentUrl).then((response) => {
        expect(response.status).to.eq(200); // Pastikan status 200 OK
      });
    });
    cy.title().should("eq", "BAZNAS");
    cy.get(".brand-image").should("exist");
  });
});
