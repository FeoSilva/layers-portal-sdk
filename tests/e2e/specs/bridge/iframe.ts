describe('Bridge - IFrame', () => {
  it('Can test with iframe', () => {
    cy.visit("parent.html")
    cy.get('h1').should('contain', 'Parent')
    cy.getIframeBody().find('h1').should('contain', 'Child')
  })

  it('Parent can ping child and get response', () => {
    cy.visit("parent.html")

    cy.window().then(async $window => {
      const res = await $window.iframeBridge.send('ping')
      expect(res).to.be.equal("pong")
    })
  })
  it('Child can ping parent and get response', () => {
    cy.visit("parent.html")

    cy.getIframeWindow().then(async $window => {
      const res = await $window.LayersPortal('ping')
      expect(res).to.be.equal("pong")
    })
  })
})