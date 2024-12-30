describe("Home Page", () => {
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

  it.only("TC-KD-001 Check href and img API", () => {
    // get link dan image
    cy.get(".owl-carousel .item a").each(($link) => {
      const href = $link.prop("href");

      // cek href ada
      if (href) {
        cy.log(`Checking link: ${href}`);
        // api call
        cy.request(href).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.not.contain("404");
          cy.log(`Link ${href} status: ${response.status}`);
        });
      } else {
        cy.log("Link kosong, skip...");
      }
    });

    cy.get(".owl-carousel .item img").each(($img) => {
      const src = $img.prop("src");

      // cek src ada
      if (src) {
        cy.log(`Checking image: ${src}`);
        // api call
        cy.request(src).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.not.contain("404");
          cy.log(`Image ${src} status: ${response.status}`);
        });
      } else {
        cy.log("Link kosong, skip...");
      }
    });
  });

  // selectors
  const newsSelectors = [
    {
      selector:
        "#control_sidebar > div > div > div.content-wrapper > section > div > div > div > div:nth-child(3) > div.row > div:nth-child(1) > a > div:nth-child(2) > div:nth-child(1) > p",
      titleSelector:
        "#control_sidebar > div > div > div.content-wrapper > section > div > div > div > div:nth-child(1) > div.p-3 > h4",
      testCaseId: "TC-KD-002",
    },
    {
      selector:
        "#control_sidebar > div > div > div.content-wrapper > section > div > div > div > div:nth-child(3) > div.row > div:nth-child(2) > div:nth-child(1) > div > div.col-8.pl-2 > a > div:nth-child(1) > h6",
      titleSelector:
        "#control_sidebar > div > div > div.content-wrapper > section > div > div > div > div:nth-child(1) > div.p-3 > h4",
      testCaseId: "TC-KD-003",
    },
    {
      selector:
        "#control_sidebar > div > div > div.content-wrapper > section > div > div > div > div:nth-child(3) > div.row > div:nth-child(2) > div:nth-child(2) > div > div.col-8.pl-2 > a > div:nth-child(1) > h6",
      titleSelector:
        "#control_sidebar > div > div > div.content-wrapper > section > div > div > div > div:nth-child(1) > div.p-3 > h4",
      testCaseId: "TC-KD-004",
    },
    {
      selector:
        "#control_sidebar > div > div > div.content-wrapper > section > div > div > div > div:nth-child(3) > div.row > div:nth-child(2) > div:nth-child(3) > div > div.col-8.pl-2 > a > div:nth-child(1) > h6",
      titleSelector:
        "#control_sidebar > div > div > div.content-wrapper > section > div > div > div > div:nth-child(1) > div.p-3 > h4",
      testCaseId: "TC-KD-005",
    },
  ];

  // iterasi
  newsSelectors.forEach(({ selector, titleSelector, testCaseId }) => {
    it.only(testCaseId + " dan cek apakah elemen yang dituju muncul", () => {
      cy.get(selector).click();
      cy.get(titleSelector).should("exist");
      cy.contains("A PHP Error was encountered").should("not.exist");
      cy.contains("404 Page Not Found").should("not.exist");
      cy.go("back");
    });
  });
});
