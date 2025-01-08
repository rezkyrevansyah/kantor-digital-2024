describe("Bayar Zakat Check", () => {
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

    cy.get(":nth-child(4) > .mb-0 > a > .img-fluid-new").click();

    cy.wait(1000);
  });

  it("Test Bayar Zakat", () => {
    cy.get("#type_of_fund").select(0);
    cy.get("#type_of_fund").select(1);
    cy.get("#type_of_fund").select(2);
    cy.get("#type_of_fund").select(3);
    cy.get("#type_of_fund").select(4);
    cy.get("#type_of_fund").select(2);

    cy.get("#nominal").type("1000000");

    cy.get("#name").type("Testing");
    cy.get("#bapak").click();

    cy.get("#handphone").type("081287656678");
    cy.get("#email").type("testing@gmail.com");

    cy.get('[style="width: 304px; height: 78px;"] > div > iframe').click();

    cy.get("#cookies").click();
  });
});
