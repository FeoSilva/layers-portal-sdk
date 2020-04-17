import { Message } from "../../../../src/bridge/android"

describe('Bridge - Android', () => {
  class MockedAndroidEnvironment {

    constructor(onMessageSub) {
      cy.on("window:before:load", $window => {
        $window.LayersAndroidBridge = {
          send(messageString) {
            const message: Message = JSON.parse(messageString)
            onMessageSub(message, $window)
          }
        }
      })
    }

    sendToChild(message: Message, $window: Window) {
      $window.dispatchEvent(new CustomEvent("layers:android", {
        detail: message
      }))
    }
  }

  it('Parent can ping child and get response', () => {
    cy.visit("child.html")
    const onMessageStub = cy.stub()
    const androidEnv = new MockedAndroidEnvironment(onMessageStub)

    const message: Message = {
      id: Math.random(),
      layers: true,
      success: true,
      type: "request",
      version: "1",
      method: "ping",
    }
    cy.window().then(async $window => {
      androidEnv.sendToChild(message, $window)
    }).should(() => {
      assert.equal(onMessageStub.lastCall.args[0].payload, "pong")
    })
  })

  it('Child can ping parent and get response', () => {
    cy.visit("child.html")
    const androidEnv = new MockedAndroidEnvironment((message: Message, $window: Window) => {
      if (message.method === "ping") {
        const responseMessage: Message = {
          id: message.id,
          layers: true,
          success: true,
          type: "response",
          version: message.version,
          payload: "pong"
        }
        androidEnv.sendToChild(responseMessage, $window)
      }
    })

    cy.window().then(async $window => {
      const res = await $window.Layers('ping')
      expect(res).to.be.equal("pong")
    })
  })
})