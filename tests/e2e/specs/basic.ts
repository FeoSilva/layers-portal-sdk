describe('Ready/Connected events', () => {
  it(`Parent receives 'setup'`, () => {
    cy.visit("parent.html")

    cy.window().should($window => {
      const setupCallArguments = $window['setup_call_arguments']
      assert(setupCallArguments)
      assert.deepEqual(setupCallArguments[0], {
        options: {
          appId: "test-app"
        },
        location: "http://0.0.0.0:30080/tests/e2e/static/child.html",
        title: "Child"
      })
    })
  })

  it(`Emit 'ready' event when bridge sets up`, () => {
    cy.visit("parent.html")

    cy.getIframeWindow().should($window => {
      const onReadyCallArguments = $window['onReady_call_arguments']
      assert(onReadyCallArguments)
      assert.deepEqual(onReadyCallArguments[0], {
        bridgeConnected: true,
        platform: "iframe"
      })
    })
  })

  it(`Emit 'connected' event when bridge sets up`, () => {
    cy.visit("parent.html")

    cy.getIframeWindow().should($window => {
      const onConnectedCallArguments = $window['onConnected_call_arguments']
      assert(onConnectedCallArguments)
      assert.deepEqual(onConnectedCallArguments[0], {
        bridgeConnected: true,
        platform: "iframe"
      })
    })
  })

  it(`Emit 'ready' event when using NullBridge`, () => {
    cy.visit("child.html")

    cy.window().should($window => {
      const onReadyCallArguments = $window['onReady_call_arguments']
      assert(onReadyCallArguments)
      assert.deepEqual(onReadyCallArguments[0], {
        bridgeConnected: false
      })
    })
  })

  it(`Do not emit 'connected' event when using NullBridge`, () => {
    cy.visit("child.html")

    cy.window().should($window => {
      const onConnectedCallArguments = $window['onConnected_call_arguments']
      console.log(onConnectedCallArguments)
      assert(!onConnectedCallArguments)
    })
  })
})

describe('Location detection', () => {
  it('When app first loads with initial location', () => {
    cy.visit("parent.html")
    const updateStub = cy.stub()
    cy.window().then($window => {
      $window.iframeBridge.addRequestHandler("update", updateStub)
    }).then(() => {
      cy.getIframeBody().find("a").eq(0).click().then(() => {
        cy.wait(0).window().should(() => {
          expect(updateStub).to.be.calledWith({ location: "http://0.0.0.0:30080/tests/e2e/static/child.html#test1" })
        })
      })
    })
  })
})

describe('Title detection', () => {
  it('When app changes its title', () => {
    cy.visit("parent.html")
    const updateStub = cy.stub()
    cy.window().then($window => {
      $window.iframeBridge.addRequestHandler("update", updateStub)
    })

    cy.getIframeDocument().then($document => {
      $document.title = "New Title"

      cy.wait(0).window().should(() => {
        expect(updateStub).to.be.calledWith({ title: "New Title" })
      })
    })
  })
})
