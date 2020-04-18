import { LayersOptions } from "../app"

export interface SetupRequest {
  options: LayersOptions
  url: string
  state: any
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
  protected options: LayersOptions

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
    
    this.options = params.options
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
