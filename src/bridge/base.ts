import { LayersSettings } from "../app"

export interface SetupRequest {
  settings: LayersSettings
  location: string
  title: string
}
export interface SetupResponse {
  bridgeConnected: boolean
  platform?: string
  payload?: any
}

export default abstract class Bridge {
  ready: boolean
  
  protected requestHandlers: Map<string, (any) => any>
  protected settings: LayersSettings

  constructor() {
    this.requestHandlers = new Map()
    this.ready = false
  }

  addRequestHandler(method: string, handler: (any) => any) {
    this.requestHandlers.set(method, handler)
  }
  
  abstract send(method: string, payload?: any, timeout?: number): Promise<any>

  abstract getPlatform(): string

  async download(data: { url: string, filename: string }) {
    return await this.send('download', data)
  }

  async setup(params: SetupRequest): Promise<SetupResponse> {
    if (this.ready) {
      throw new Error("LayersSDK already set up!")
    }
    
    this.settings = params.settings
    const response = await this.send("setup", params)

    if (response.success) {
      this.ready = true
    } else {
      throw new Error("Handshake failed!")
    }

    return {
      bridgeConnected: true,
      platform: this.getPlatform()
    }
  }
}
