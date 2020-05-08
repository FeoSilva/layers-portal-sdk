describe(`Layers('close')`, () => {
  it('Calls window.close()', () => {
    cy.visit("parent.html")

    const windowCloseStub = cy.stub()
    cy.getIframeWindow().then($window => {
      $window.close = windowCloseStub

      $window.LayersPortal('close')

      cy.getIframeWindow().should(() => {
        expect(windowCloseStub).to.be.called
      })
    })
  })

  it('Sends message to bridge', () => {
    cy.visit("parent.html")

    const onMessageStub = cy.stub()
    cy.window().then($window => {
      $window.iframeBridge.addRequestHandler("close", onMessageStub)
    })

    cy.getIframeWindow().then($window => {
      $window.LayersPortal('close')

      cy.getIframeWindow().should(() => {
        expect(onMessageStub).to.be.called
      })
    })
  })
})