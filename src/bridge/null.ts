import Bridge, { SetupRequest, SetupResponse } from "./base"
import { LAYERS_PORTAL_INNER_LOCATION_BASE_KEY, LAYERS_PORTAL_LOCATION_KEY } from "./iframe"

export class NullBridge extends Bridge {
  async setup(params: SetupRequest): Promise<SetupResponse> {

    if (params.options.insidePortalOnly) {
      const layersLastLocation = localStorage[LAYERS_PORTAL_LOCATION_KEY]
      const portalBaseUrl = localStorage[LAYERS_PORTAL_INNER_LOCATION_BASE_KEY]

      if (!layersLastLocation) {
        window.location.href = "https://id.layers.digital/"
      } else if (window.location.href.startsWith(portalBaseUrl)) {
        const path = window.location.href.substring(portalBaseUrl.length)
        window.location.href = `${layersLastLocation}${path}`
      } else {
        window.location.href = layersLastLocation
      }
      return
    }

    // Do nothing...
    this.ready = false

    return {
      bridgeConnected: false
    }
  }

  getPlatform(): string {
    return null
  }

  async send(_method: string, _payload?: any, _timeout?: number) {
    throw new Error("App has no bridge to Layers " + _method)
  }

  async download(data: { url: string, filename: string }) {
    const { url, filename } = data
    const link = document.createElement("a");
    link.download = filename;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

export default NullBridge
