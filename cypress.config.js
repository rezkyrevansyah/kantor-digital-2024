const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://kotayogya.baznas.go.id/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
