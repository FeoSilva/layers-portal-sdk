import Bridge, { SetupRequest, SetupResponse } from "./base"

export class NullBridge extends Bridge {
  async setup(params: SetupRequest): Promise<SetupResponse> {
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
