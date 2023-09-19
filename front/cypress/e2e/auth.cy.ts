/**
 * @file This spec file contains test of user login.
 */

/// <reference types="cypress" />

describe('Auth register', function () {
  it('Register and redirect to home page', function () {
    cy.visit('/auth/register')

    cy.get('[data-cy="firstname"]').first().type('Cypress')
    cy.get('[data-cy="lastname"]').first().type('Lastname')
    cy.get('[data-cy="email"]').first().type('cypress@test.com')
    cy.get('[data-cy="password"]').first().type('Azerty')
    cy.get('[data-cy="password-match"]').first().type('Azerty')

    cy.get('[data-cy="submit"]').click()
    cy.url().should('include', '/catalog')
  })
})
