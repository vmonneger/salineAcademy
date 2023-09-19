/**
 * @file Cypress configuration file.
 */
import { defineConfig } from 'cypress'

const baseUrl = () => {
  return process.env.DEV ? 'http://localhost' : 'https://salinehetic.tech'
}

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost',
  },
})
