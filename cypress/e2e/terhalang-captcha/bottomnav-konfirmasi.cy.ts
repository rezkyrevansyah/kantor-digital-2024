describe("Transfer Zakat - Bottom Navbar", () => {
  Cypress.on("uncaught:exception", (err, runnable) => {
    return false;
  });

  beforeEach(() => {
    cy.visit("/konfirmasi-zis");
    // Validasi halaman yang terbuka dengan memastikan statusnya 200
    cy.url().then((currentUrl) => {
      cy.request(currentUrl).then((response) => {
        expect(response.status).to.eq(200); // Pastikan status 200 OK
      });
    });
  });

  it("Test Konfirmasi Zakat", () => {
    // test sapaan
    cy.get<HTMLSelectElement>(
      "#konfirmasi > div:nth-child(1) > div:nth-child(1) > div > select"
    )
      .select(0)
      .should("have.value", "Bapak");
    cy.get<HTMLSelectElement>(
      "#konfirmasi > div:nth-child(1) > div:nth-child(1) > div > select"
    )
      .select(1)
      .should("have.value", "Ibu");

    // test nama
    cy.get<HTMLInputElement>(
      "#konfirmasi > div:nth-child(1) > div:nth-child(2) > div > input"
    )
      .eq(0)
      .type("testing");

    // test jenis pembayaran zakat
    cy.get<HTMLSelectElement>("#type_of_fund")
      .select(0)
      .should("have.value", "Zakat");

    cy.get<HTMLSelectElement>("#jenis")
      .select(0)
      .should("have.value", "Zakat Penghasilan");
    cy.get<HTMLSelectElement>("#jenis")
      .select(1)
      .should("have.value", "Zakat Maal");

    // test jenis pembayaran infak
    cy.get<HTMLSelectElement>("#type_of_fund")
      .select(1)
      .should("have.value", "Infak");

    const infakJenisValues = [
      { value: "Infak Sedekah", text: "Infaq/Sedekah" },
      { value: "Infak Operasional", text: "Sedekah BAZNAS" },
      {
        value: "Dompet Bencana & Kemanusiaan",
        text: "Dompet Bencana & Kemanusiaan",
      },
      { value: "Dompet Pendidikan", text: "Dompet Pendidikan" },
      { value: "Dompet Kesehatan", text: "Dompet Kesehatan" },
      {
        value: "Dompet Solidaritas Dunia Islam",
        text: "Dompet Solidaritas Dunia Islam",
      },
      { value: "Dompet Palestina", text: "Dompet Palestina" },
      { value: "Dompet Peduli Mustahik", text: "Dompet Peduli Mustahik" },
      { value: "Dompet Yatim", text: "Dompet Yatim" },
      {
        value: "Dompet Pemberdayaan Ekonomi",
        text: "Dompet Pemberdayaan Ekonomi",
      },
      { value: "Dompet Bantuan Hukum", text: "Dompet Bantuan Hukum" },
      { value: "Dompet Sekolah Jeddah", text: "Dompet Sekolah Jeddah" },
    ];

    infakJenisValues.forEach((item, index) => {
      cy.get<HTMLSelectElement>("#jenis")
        .select(index)
        .should("have.value", item.value);
    });

    // test jenis pembayaran fidyah
    cy.get<HTMLSelectElement>("#type_of_fund")
      .select(3)
      .should("have.value", "Fidyah");
    cy.get<HTMLSelectElement>("#jenis")
      .select(0)
      .should("have.value", "Fidyah");

    // test jenis pembayaran kurban
    cy.get<HTMLSelectElement>("#type_of_fund")
      .select(4)
      .should("have.value", "Kurban");
    cy.get<HTMLSelectElement>("#jenis")
      .select(1)
      .should("have.value", "Kurban Kambing");

    // test NPWZ
    cy.get<HTMLInputElement>(
      ":nth-child(3) > :nth-child(1) > .form-group > .form-control"
    )
      .eq(0)
      .type("00000");

    // test No HP
    cy.get<HTMLInputElement>(
      ":nth-child(3) > :nth-child(2) > .form-group > .form-control"
    )
      .eq(0)
      .type("00000");

    // test email
    cy.get<HTMLInputElement>("#email").eq(0).type("testing@gmail.com");

    // test tanggal transfer
    cy.get<HTMLInputElement>(
      "#konfirmasi > div:nth-child(4) > div:nth-child(2) > div > input"
    ).type("2024-09-20");

    // test asal bank
    cy.get<HTMLInputElement>("#bank_asal").eq(0).type("testing");

    // test tujuan bank
    cy.get<HTMLSelectElement>("#bank_name")
      .select(0)
      .should("contain", "Pilih Bank Tujuan");

    // test nominal
    cy.get<HTMLInputElement>("#nominal").eq(0).type("1000000");

    // test catatan
    cy.get<HTMLInputElement>(
      ":nth-child(7) > :nth-child(2) > .form-group > .form-control"
    )
      .eq(0)
      .type("testing");

    // test file upload
    cy.get<HTMLInputElement>('input[type="file"]').selectFile(
      "cypress/assets/testing.jpg"
    );

    // test captcha
    cy.get("#captcha_code").should("exist");
  });
});
