describe("Transfer Zakat - Bottom Navbar", () => {
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

    cy.get(":nth-child(5) > .mb-0 > a > .img-fluid-new").click();
  });

  it("Klik tombol salin pada setiap baris dan cek isi notifikasi toast", () => {
    // Dapatkan semua baris pada tabel
    cy.get("#zakat tbody tr").each(($row) => {
      // Dapatkan teks dari elemen <p> pada kolom ketiga (nomor rekening)
      const rekeningText = $row.find("td:nth-child(3) p").text().trim();

      // Klik tombol "salin" pada kolom terakhir
      cy.wrap($row).find("td:last-child p").click();

      // Memastikan elemen toast muncul dan memiliki teks yang sesuai
      cy.get(".toast").should("be.visible").and("contain.text", rekeningText);

      // Menunggu sebentar agar toast hilang sebelum melan/utkan ke baris berikutnya
      cy.wait(1000);
    });
  });
});
