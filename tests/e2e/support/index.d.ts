declare namespace Cypress {
  interface Chainable {
    getIframeWindow(): Chainable<Window>
    getIframeDocument(): Chainable<Document>
    getIframeBody(): Chainable<Element>
  }
}