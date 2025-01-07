describe("Sidebar - Layanan", () => {
  Cypress.on("uncaught:exception", (err, runnable) => {
    return false;
  });

  beforeEach(() => {
    cy.visit("/");

    // Buka hamburger bar
    cy.get(".navbar-nav > .nav-item > .nav-link").click();
    cy.get(".sidebar").should("be.visible");

    cy.get(':nth-child(5) > [href="#"] > .text-uppercase').click();
  });

  context("Penghasilan - Kalkulator Zakat", () => {
    const gajiPerBulanSelector =
      "#form_penghasilan > :nth-child(2) > .col-sm-11 > .form-control";
    const penghasilanPerBulanSelector =
      "#form_penghasilan > :nth-child(4) > .col-sm-11 > .form-control";
    const jumlahPenghasilanSelector =
      "#form_penghasilan > :nth-child(6) > .col-sm-11 > .form-control";
    const jumlahWajibZakatSelector =
      ".zakat_penghasilan > .form-group > .col-sm-11 > .form-control";
    const buttonHitungZakatSelector = ".btn_hitung_penghasilan > .btn";
    const buttonBayarZakatSelector = ".btn_bayar_penghasilan > .btn";

    const formatWithDots = (number: number): string => {
      return number.toLocaleString("id-ID");
    };

    it("Penghasilan", () => {
      cy.get(".menu-is-opening > .nav > :nth-child(2) > .nav-link > p").click();

      const gajiPerBulan = 1000000; // 5 juta
      const penghasilanPerBulan = 3000000; // 5 juta
      const expectedJumlahPenghasilan = gajiPerBulan + penghasilanPerBulan;
      const expectedJumlahWajibZakat = (expectedJumlahPenghasilan * 2.5) / 100; // 2.5%

      // Input gaji per bulan
      cy.get(gajiPerBulanSelector).type(gajiPerBulan.toString());

      // Input penghasilan per bulan
      cy.get(penghasilanPerBulanSelector).type(penghasilanPerBulan.toString());

      // Verify jumlah penghasilan (formatted with dots)
      cy.get(jumlahPenghasilanSelector).should(
        "have.value",
        formatWithDots(expectedJumlahPenghasilan)
      );

      // Click hitung zakat
      cy.get(buttonHitungZakatSelector).click();

      // Verify jumlah wajib zakat (formatted with dots and 2 decimal places)
      cy.get(jumlahWajibZakatSelector).should(
        "have.value",
        formatWithDots(parseFloat(expectedJumlahWajibZakat.toFixed(2)))
      );

      // Click bayar zakat
      cy.get(buttonBayarZakatSelector).click();

      // Pastikan jenis dana pada halaman bayar zakat sesuai
      cy.get("#type_of_fund").contains("Zakat");
      cy.get("#jenis").contains("Zakat Penghasilan");
    });
  });

  context("Perusahaan - Kalkulator Zakat", () => {
    // element
    const tabJasa = "#custom-tabs-three-home-tab";
    const pendapatanSebelumPajakSelector = "#pdp_pre_pajak";
    const jumlahWajibZakatSelector =
      ".total_zakper_jasa > .form-group > .col-sm-11 > .form-control";
    const buttonHitungZakatSelector = ".btn_zakper_jasa > .btn";
    const buttonBayarZakatSelector = ":nth-child(4) > :nth-child(3) > .btn";

    // Helper function to format numbers with dots as thousand separators
    const formatWithDots = (number: number): string => {
      return number.toLocaleString("id-ID");
    };

    it("Tab Jasa", () => {
      cy.get(".menu-is-opening > .nav > :nth-child(2) > .nav-link > p").click();
      cy.get("#calculator_type").select(1).should("have.value", "perusahaan");
      cy.get(tabJasa).click();

      const pendapatanSebelumPajak = 10000000; // 10 juta
      const expectedJumlahWajibZakat = (pendapatanSebelumPajak * 2.5) / 100; // 2.5%

      // Input pendapatan sebelum pajak
      cy.get(pendapatanSebelumPajakSelector).type(
        pendapatanSebelumPajak.toString()
      );

      // Click hitung zakat
      cy.get(buttonHitungZakatSelector).click();

      // Verify jumlah wajib zakat (formatted with dots)
      cy.get(jumlahWajibZakatSelector).should(
        "have.value",
        formatWithDots(parseFloat(expectedJumlahWajibZakat.toFixed(2)))
      );

      // Click bayar zakat
      cy.get(buttonBayarZakatSelector).click();

      // Pastikan jenis dana pada halaman bayar zakat sesuai
      cy.get("#type_of_fund").contains("Zakat");
      cy.get("#jenis").contains("Zakat Maal");
    });

    const aktivaLancarDagang =
      "#custom-tabs-three-profile > form > :nth-child(2) > .col-sm-11 > .form-control";
    const pasivaLancarDagang =
      "#custom-tabs-three-profile > form > :nth-child(4) > .col-sm-11 > .form-control";
    const jumlahDagang =
      "#custom-tabs-three-profile > form > :nth-child(6) > .col-sm-11 > .form-control";
    const jumlahWajibZakatDagang = "#jml_zakper_niaga";
    const buttonHitungZakatDagang = ".btn_zakper_niaga > .btn";
    const buttonBayarZakatDagang = ":nth-child(8) > :nth-child(3) > .btn";
    const tabDagang = "#custom-tabs-three-profile-tab";

    it("Tab Dagang/Industri", () => {
      cy.get(".menu-is-opening > .nav > :nth-child(2) > .nav-link > p").click();
      cy.get("#calculator_type").select(1).should("have.value", "perusahaan");
      cy.get(tabDagang).click();

      const aktivaLancar = 10000000; // 10 juta
      const pasivaLancar = 5000000; // 5 juta
      const expectedJumlah = aktivaLancar - pasivaLancar;
      const expectedJumlahWajibZakat = (expectedJumlah * 2.5) / 100; // 2.5%

      // Input aktiva lancar
      cy.get(aktivaLancarDagang).type(aktivaLancar.toString());

      // Input pasiva lancar
      cy.get(pasivaLancarDagang).type(pasivaLancar.toString());

      // Verify jumlah (formatted with dots)
      cy.get(jumlahDagang).should("have.value", formatWithDots(expectedJumlah));

      // Click hitung zakat
      cy.get(buttonHitungZakatDagang).click();

      // Verify jumlah wajib zakat (formatted with dots and 2 decimal places)
      cy.get(jumlahWajibZakatDagang).should(
        "have.value",
        formatWithDots(parseFloat(expectedJumlahWajibZakat.toFixed(2)))
      );

      // Click bayar zakat
      cy.get(buttonBayarZakatDagang).click();

      // Pastikan jenis dana pada halaman bayar zakat sesuai
      cy.get("#type_of_fund").contains("Zakat");
      cy.get("#jenis").contains("Zakat Maal");
    });
  });

  context("Perdagangan - Kalkulator Zakat", () => {
    const asetLancarSelector = "#aset_lancar";
    const labaSelector = "#laba";
    const jumlahDagang = "#jumlah_aset";
    const wajibZakatDagang = "#jml_zak_per";
    const buttonHitungDagang = ".btn_zak_per > .btn";
    const buttonBayarDagang = ":nth-child(10) > :nth-child(3) > .btn";

    const formatWithDots = (number: number): string => {
      return number.toLocaleString("id-ID");
    };

    it("Perdagangan", () => {
      cy.get(".menu-is-opening > .nav > :nth-child(2) > .nav-link > p").click();
      cy.get("#calculator_type").select(2).should("have.value", "perdagangan");

      const asetLancar = 10000000; // 10 juta
      const laba = 10000000; // 10 juta
      const expectedJumlahPenghasilan = asetLancar + laba;
      const expectedJumlahWajibZakat = (expectedJumlahPenghasilan * 2.5) / 100; // 2.5%

      // Input gaji per bulan
      cy.get(asetLancarSelector).type(asetLancar.toString());

      // Input penghasilan per bulan
      cy.get(labaSelector).type(laba.toString());

      // Verify jumlah penghasilan (formatted with dots)
      cy.get(jumlahDagang).should(
        "have.value",
        formatWithDots(expectedJumlahPenghasilan)
      );

      // Click hitung zakat
      cy.get(buttonHitungDagang).click();

      // Verify jumlah wajib zakat (formatted with dots and 2 decimal places)
      cy.get(wajibZakatDagang).should(
        "have.value",
        formatWithDots(parseFloat(expectedJumlahWajibZakat.toFixed(2)))
      );

      // Click bayar zakat
      cy.get(buttonBayarDagang).click();

      // Pastikan jenis dana pada halaman bayar zakat sesuai
      cy.get("#type_of_fund").contains("Zakat");
      cy.get("#jenis").contains("Zakat Maal");
    });
  });

  context("Emas - Kalkulator Zakat", () => {
    // element
    const emasSelector = "#txt_emas";
    const wajibZakatEmas = "#jml_zak_ms";
    const buttonHitungEmas = ".btn_zak_ms > .btn";
    const buttonBayarEmas = ":nth-child(6) > :nth-child(3) > .btn";

    // Helper function to format numbers with dots as thousand separators
    const formatWithDots = (number: number): string => {
      return number.toLocaleString("id-ID");
    };

    it("Emas", () => {
      cy.get(".menu-is-opening > .nav > :nth-child(2) > .nav-link > p").click();

      cy.get("#calculator_type").select(3).should("have.value", "emas_perak");

      const hargaEmas = 10000000; // 10 juta
      const expectedJumlahWajibZakat = (hargaEmas * 2.5) / 100; // 2.5%

      // Input pendapatan sebelum pajak
      cy.get(emasSelector).type(hargaEmas.toString());

      // Click hitung zakat
      cy.get(buttonHitungEmas).click();

      // Verify jumlah wajib zakat (formatted with dots)
      cy.get(wajibZakatEmas).should(
        "have.value",
        formatWithDots(parseFloat(expectedJumlahWajibZakat.toFixed(2)))
      );

      // Click bayar zakat
      cy.get(buttonBayarEmas).click();

      // Pastikan jenis dana pada halaman bayar zakat sesuai
      cy.get("#type_of_fund").contains("Zakat");
      cy.get("#jenis").contains("Zakat Maal");
    });
  });

  it("Info Rekening Zakat", () => {
    cy.get(":nth-child(5) > .mb-0 > a > .img-fluid-new").click();

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
