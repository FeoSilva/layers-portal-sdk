import { IFrameBridge } from "./iframe"
import Bridge from "./base"
import NullBridge from "./null"
import { AndroidBridge } from "./android"

export function createBridge(): Bridge {
  if (window.LayersAndroidBridge) {
    return new AndroidBridge()
  }

  if (!window.frameElement && window.parent === window) {
    return new NullBridge()
  }

  return new IFrameBridge({
    targetOrigin: "*",
    targetWindow: window.parent,
  })
}