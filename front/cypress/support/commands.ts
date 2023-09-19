/**
 * @file File for custom commands.
 */

/// <reference types="cypress" />

Cypress.Commands.add('getBySel', (selector: string, ...args) => {
  return cy.get(`[data-cy=${selector}]`, ...args)
})
