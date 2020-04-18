import { IFrameBridge } from "./bridge/iframe"

const iframeElement: HTMLIFrameElement = <HTMLIFrameElement> document.getElementById("child")

const iframeBridge = new IFrameBridge({
  targetOrigin: "*",
  targetWindow: iframeElement.contentWindow,
})
iframeBridge.addRequestHandler("update", data => {
  console.log("update", data)
})
iframeBridge.addRequestHandler("setup", function () {
  window.setup_call_arguments = arguments
  return {
    success: true,
    payload: {
      userId: "X",
      token: "Y"
    }
  }
})

iframeBridge.addRequestHandler("ping", async () => {
  return "pong"
})

iframeBridge.addRequestHandler("startHandshake", async () => {
  return "pong"
})

iframeBridge.addRequestHandler("ready", async () => {
  console.log('child is ready')

  const res = await iframeBridge.send("ping")
  console.log("res", res)
})

iframeBridge.addRequestHandler("updateLocation", (data: { location: string }) => {
  console.log('update location', data.location)
})


declare global {
  interface Window {
    iframeBridge: IFrameBridge
    setup_call_arguments: any
  }
}
window.iframeBridge = iframeBridge