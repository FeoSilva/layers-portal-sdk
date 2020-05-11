import HistoryWatcher from "./util/HistoryWatcher"
import TitleWatcher from "./util/TitleWatcher"
import { createBridge } from './bridge'
import Bridge, { SetupResponse } from "./bridge/base"
import createEventTarget from "./util/createEventTarget"

export interface LayersPortalOptions {
  // ID do App
  appId: string;

  // Indica se a página só pode ser aberta dentro do Layers
  // Caso não esteja, redireciona para o Layers ID, id.layers.digital
  insidePortalOnly: boolean;

  // Indica se o loading vai ser controlado manualmente
  // O app deve chamar Layers.finishLoading()
  manualLoadingControl: boolean;
}

export interface LayersPortalSDK {
  (method: string, payload?: any): Promise<any>

  on(eventName: string, handler: (payload: any) => void): void
  ready: boolean
  connected: boolean
  platform: string | null
}

function buildLayersSdk(): LayersPortalSDK {

  let parentBridge: Bridge
  let eventTarget = createEventTarget()
  let historyWatcher: HistoryWatcher = new HistoryWatcher()
  let titleWatcher: TitleWatcher = new TitleWatcher
  let setupResult: SetupResponse

  interface RealLayersSDK extends LayersPortalSDK {
    ready: boolean
    connected: boolean
    options?: LayersPortalOptions
  }

  const METHODS: {[methodName: string]: (this: RealLayersSDK, ...params: any) => any } = {
    async setup(options: LayersPortalOptions) {
      if (this.ready) {
        throw new Error("LayersPortalSDK already set up!")
      }

      this.options = options

      parentBridge = createBridge()
      parentBridge.addRequestHandler("ping", () => {
        return "pong"
      })

      setupResult = await parentBridge.setup({
        options: options,
        url: window.location.href,
        state: history?.state,
        title: titleWatcher.getTitle()
      })

      this.ready = true
      eventTarget.dispatchEvent(new CustomEvent("ready", {
        detail: setupResult
      }))

      if (!setupResult.bridgeConnected) {
        return;
      }

      this.connected = true
      eventTarget.dispatchEvent(new CustomEvent("connected", {
        detail: setupResult
      }))

      historyWatcher.addListener(params => {
        this('update', params)
      })
      titleWatcher.addListener(title => {
        this('update', { title })
      })

      historyWatcher.updateHistory()
      titleWatcher.updateTitle()
    },

    ping() {
      return parentBridge.send('ping')
    },

    getAccountToken() {
      return parentBridge.send('getAccountToken')
    },

    getCommunity() {
      return parentBridge.send('getCommunity')
    },

    ready() {
      return parentBridge.send('ready')
    },

    update(params: { url?: string, state?: any, title?: string }) {
      return parentBridge.send("update", params)
    },

    async download(data: { url: string, filename: string }) {
      return await parentBridge.download(data)
    },

    close(payload?: any) {
      try {
        parentBridge.send('close', payload)
      } catch (e) { }
      try {
        window.close()
      } catch (e) { }
    }
  }

  const _Layers: RealLayersSDK = async (methodName: string, payload?: any) => {
    const method = METHODS[methodName]
    if (!method) {
      throw new Error(`Method ${methodName} not found.`)
    }

    return await method.bind(_Layers)(payload)
  }

  _Layers.ready = false
  _Layers.connected = false
  _Layers.platform = this
  _Layers.on = (eventName: string, handler: (payload: any) => void) => {
    eventTarget.addEventListener(eventName, (event: CustomEvent) => {
      handler(event.detail)
    })
  }

  // Get commands queued before SDK was loaded
  const commandQueue: [(resolve: any) => any, (reject: any) => any, string, any][] = (<any>window.LayersPortal)?.q

  // Consume queued commands now that SDK is ready
  if (commandQueue) {
    for (const command of commandQueue) {
      const [ resolve, reject, method, payload ] = command
      _Layers(method, payload)
        .then(resolve)
        .catch(reject)
    }
  }

  // Get event handlers set before SDK was loaded
  const eventHandlers: {[eventName: string]: ((payload: any) => void)[]} = (<any>window.LayersPortal)?.eh
  if (eventHandlers) {
    for (const eventName in eventHandlers) {
      for (const handler of eventHandlers[eventName]) {
        _Layers.on(eventName, handler)
      }
    }
  }

  return _Layers
}

declare global {
  interface Window {
    LayersPortal: LayersPortalSDK;
    LayersPortalOptions: LayersPortalOptions;
  }
}

// Expose "LayersPortal" globally
window.LayersPortal = buildLayersSdk()
if (window.LayersPortalOptions) {
  window.LayersPortal('setup', window.LayersPortalOptions)
}
