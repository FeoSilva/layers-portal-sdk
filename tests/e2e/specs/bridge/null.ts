describe('Bridges - Null', () => {
  it('Page should throw if it tries to communicate with NullBridge', () => {
    cy.visit("child.html")

    cy.window().then(async $window => {
      try {
        await $window.LayersPortal('ping')
        assert.fail("It should have thrown an error")
      } catch (error) {}
    })
  })
})
