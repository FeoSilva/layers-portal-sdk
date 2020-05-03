import { Message } from "../../../../src/bridge/ios"

describe('Bridge - iOS', () => {
  class MockedIosEnvironment {

    constructor(onMessageSub) {
      cy.on("window:before:load", $window => {
        $window.webkit = {
          messageHandlers: {
            LayersIosBridge: {
              postMessage(messageString) {
                const message: Message = JSON.parse(messageString)
                onMessageSub(message, $window)
              }
            }
          }
        }
      })
    }

    sendToChild(message: Message, $window: Window) {
      $window.dispatchEvent(new CustomEvent("layers:ios", {
        detail: message
      }))
    }
  }

  it('Parent can ping child and get response', () => {
    cy.visit("child.html")
    const onMessageStub = cy.stub()
    const iosEnv = new MockedIosEnvironment(onMessageStub)

    const message: Message = {
      id: Math.random(),
      layers: true,
      success: true,
      type: "request",
      version: "1",
      method: "ping",
    }
    cy.window().then(async $window => {
      iosEnv.sendToChild(message, $window)
    }).should(() => {
      assert.equal(onMessageStub.lastCall.args[0].payload, "pong")
    })
  })

  it('Child can ping parent and get response', () => {
    cy.visit("child.html")
    const iosEnv = new MockedIosEnvironment((message: Message, $window: Window) => {
      if (message.method === "ping") {
        const responseMessage: Message = {
          id: message.id,
          layers: true,
          success: true,
          type: "response",
          version: message.version,
          payload: "pong"
        }
        iosEnv.sendToChild(responseMessage, $window)
      }
    })

    cy.window().then(async $window => {
      const res = await $window.Layers('ping')
      expect(res).to.be.equal("pong")
    })
  })
})