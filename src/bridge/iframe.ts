import Bridge, { SetupRequest } from "./base"
import MessageSerializer from "../util/messageSerializer"

type MessageID = number
interface Message {
  id: MessageID;
  method?: string;
  payload: any;
  version: string;
  type: string;
}

export interface Options {
  targetWindow: Window;
  targetOrigin: string;
}

export class IFrameBridge extends Bridge {
  private pendingMessages: {}
  private targetWindow: any
  private targetOrigin: any
  private version: any
  private _bindedEventHandler: EventListener

  constructor(options: Options) {
    super()

    this.pendingMessages = {}

    this.targetWindow = options.targetWindow
    this.targetOrigin = options.targetOrigin

    this.version = "__LAYERS_SDK_VERSION__"

    this._bindedEventHandler = this._eventHandler.bind(this)
    window.addEventListener('message', this._bindedEventHandler, false)
  }

  getPlatform(): string {
    return "iframe"
  }

  async setup(params: SetupRequest) {
    if (window === this.targetWindow) {
      throw new Error("Target must be a different Window")
    }
    return await super.setup(params)
  }

  destroy() {
    if (this._bindedEventHandler) {
      window.removeEventListener('message', this._bindedEventHandler, false)
      this._bindedEventHandler = null
    }

    this.ready = false
  }

  send(method: string, payload?: any, timeout: number = 30000) {
    const promise = new Promise((resolve, reject) => {
      const id = generateId()
      const timeoutId = setTimeout(() => { reject(new Error(`Message ${id} timed out!`)) }, timeout)
      this.pendingMessages[id] = { resolve: resolve, reject: reject, timeoutId: timeoutId }

      const message: Message = {
        id: id,
        method: method,
        payload: payload,
        version: this.version,
        type: 'request'
      }
      try {
        this._postMessage(this.targetWindow, message, this.targetOrigin)
      } catch (error) {
        return reject(error)
      }
    })
    return promise
  }

  private dispatch(method: string, payload: any) {
    if (!this.requestHandlers.has(method)) return

    const handler = this.requestHandlers.get(method)
    return handler(payload)
  }

  private _postMessage(_window: Window, message: Message, targetOrigin: string) {
    const serializedMessage = MessageSerializer.serialize(message)
    _window.postMessage(serializedMessage, targetOrigin)
  }

  private _eventHandler(event: MessageEvent) {
    let message: Message
    try {
      message = MessageSerializer.deserialize(event.data)
    } catch (error) {
      return // Ignore malformed messages, since it probably shouldn't be handled by SDK
    }

    if (!message.id) {
      this.dispatch("error", new Error('Message received without id!'))
      return
    }

    switch (message.type) {
      case 'response': this._handleResponseMessage(message); return;
      case 'error': this._handleErrorMessage(message); return;
      case 'request': this._handleRequestMessage(message, event.source); return;
      default: this.dispatch("error", new Error(`Message received with unknown type "${message.type}"!`))
    }
  }

  private _handleResponseMessage(message: Message) {
    var id = message.id
    var payload = message.payload

    if (!(id in this.pendingMessages)) {
      return
    }

    var pendingMessage = this.pendingMessages[id]
    var resolve = pendingMessage.resolve
    var timeoutId = pendingMessage.timeoutId

    clearTimeout(timeoutId)
    delete this.pendingMessages[id]

    resolve(payload)
  }

  private _handleErrorMessage(message: Message) {
    var id = message.id
    var error = new Error(message.payload)

    if (!(id in this.pendingMessages)) {
      return
    }

    var pendingMessage = this.pendingMessages[id]
    var reject = pendingMessage.reject
    var timeoutId = pendingMessage.timeoutId

    clearTimeout(timeoutId)
    delete this.pendingMessages[id]

    reject(error)
  }

  private _handleRequestMessage(message: Message, sourceWindow: any) {
    const id = message.id
    const method = message.method
    const payload = message.payload

    const promise = this.dispatch(method, payload)
    Promise.resolve(promise)
      .then(res => {
        this._postMessage(sourceWindow, { id: id, payload: res, version: this.version, type: 'response' }, '*')
      }).catch(error => {
        this._postMessage(sourceWindow, { id: id, payload: error.message, version: this.version, type: 'error' }, '*')
      })
  }
}

function generateId(): MessageID {
  return ~~(Math.random() * (1 << 30))
}

export default IFrameBridge
