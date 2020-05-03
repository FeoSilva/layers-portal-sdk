import HistoryWatcher from "./util/HistoryWatcher"
import TitleWatcher from "./util/TitleWatcher"
import { createBridge } from './bridge'
import Bridge, { SetupResponse } from "./bridge/base"
import createEventTarget from "./util/createEventTarget"

const SDK_METHOD_SYMBOL = Symbol("IS_SDK_METHOD")

export interface LayersOptions {
  // ID do App
  appId: string;

  // Indica se a página só pode ser aberta dentro do Layers
  // Caso não esteja, redireciona para o Layers ID, id.layers.digital
  insidePortalOnly: boolean;

  // Indica se o loading vai ser controlado manualmente
  // O app deve chamar Layers.finishLoading()
  manualLoadingControl: boolean;
}

/**
 * Decorator used to allow methods to be called by SDK users
 */
export const SdkMethod = () => {
  return function (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.value[SDK_METHOD_SYMBOL] = true
  }
}

export class LayersSDKCore {
  ready: boolean
  connected: boolean

  private eventTarget: EventTarget
  private options?: LayersOptions
  private parentBridge?: Bridge
  private historyWatcher: HistoryWatcher
  private titleWatcher: TitleWatcher
  private setupResult?: SetupResponse

  constructor() {
    if (!window) {
      throw new Error('Can not use Layers SDK without "window"')
    }

    this.ready = false
    this.connected = false
    this.eventTarget = createEventTarget()
    this.historyWatcher = new HistoryWatcher()
    this.titleWatcher = new TitleWatcher()
  }

  @SdkMethod()
  public async setup(options: LayersOptions) {
    if (this.ready) {
      throw new Error("LayersSDK already set up!")
    }

    this.options = options

    this.parentBridge = createBridge()
    this.parentBridge.addRequestHandler("ping", () => {
      return "pong"
    })

    this.setupResult = await this.parentBridge.setup({
      options: options,
      url: window.location.href,
      state: history?.state,
      title: this.titleWatcher.getTitle()
    })
    
    this.ready = true
    this.eventTarget.dispatchEvent(new CustomEvent("ready", {
      detail: this.setupResult
    }))
    
    if (!this.setupResult.bridgeConnected) {
      return;
    }

    this.connected = true
    this.eventTarget.dispatchEvent(new CustomEvent("connected", {
      detail: this.setupResult
    }))

    this.historyWatcher.addListener(params => {
      this.update(params)
    })
    this.titleWatcher.addListener(title => {
      this.update({ title })
    })

    this.historyWatcher.updateHistory()
    this.titleWatcher.updateTitle()
  }

  public async handle(methodName: string, payload: any) {
    const method = this[methodName]
    if (!method || !method[SDK_METHOD_SYMBOL]) {
      throw new Error(`Method ${methodName} not found.`)
    }

    return await method.bind(this)(payload)
  }

  @SdkMethod()
  protected onReady(callback: Function) {
    if (this.ready) {
      callback(this.setupResult)
      return
    }
    
    this.eventTarget.addEventListener("ready", (event: CustomEvent) => {
      callback(event.detail)
    })
  }

  @SdkMethod()
  protected onConnected(callback: Function) {
    if (this.connected) {
      callback(this.setupResult)
      return
    }
    this.eventTarget.addEventListener("connected", (event: CustomEvent) => {
      callback(event.detail)
    })
  }

  @SdkMethod()
  protected ping() {
    return this.parentBridge.send('ping')
  }

  @SdkMethod()
  protected update(params: { url?: string, state?: any, title?: string }) {
    if (this.parentBridge.ready) {
      this.parentBridge.send("update", params)
    }
  }

  @SdkMethod()
  protected async download(data: { url: string, filename: string }) {
    return await this.parentBridge.download(data)
  }

  @SdkMethod()
  protected async createPost(data: any) {
    return await this.parentBridge.send('createPost', data)
  }

  @SdkMethod()
  protected close(payload?: any) {
    try {
      this.parentBridge.send('close', payload)
    } catch (e) { }
    try {
      window.close()
    } catch (e) { }
  }

  @SdkMethod()
  protected async createGroup(data: any) {
    return await this.parentBridge.send('createGroup', data)
  }
}


declare global {
  interface Window {
    Layers: Function;
    LayersOptions: LayersOptions;
  }
}

// Get commands queued before SDK was loaded
const commandQueue: [(any) => any, (any) => any, string, any][] = (<any>window.Layers)?.q

const sdkCore = new LayersSDKCore()
if (window.LayersOptions) {
  sdkCore.setup(window.LayersOptions)
}

// Expose "Layers" globally
window.Layers = function (method, payload) {
  return sdkCore.handle(method, payload)
}

// Consume queued commands now that SDK is ready
if (commandQueue) {
  for (const command of commandQueue) {
    const [ resolve, reject, method, payload ] = command
    sdkCore.handle(method, payload)
      .then(resolve)
      .catch(reject)
  }
}