/**
 * @file Ok.
 */

// cypress/support/index.ts
declare global {
  namespace Cypress {
    interface Chainable {
      getBySel(selector: string, args?: any): Chainable<JQuery<HTMLElement>>
    }
  }
}
