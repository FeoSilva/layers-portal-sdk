import Bridge from "./base"

declare global {
  interface Window {
    webkit: {
      messageHandlers: {
        LayersIosBridge: {
          postMessage: (message: Message) => void
        }
      }
    }
  }
}

type MessageID = number
export interface Message {
  layers: boolean;
  id: MessageID;
  method?: string;
  payload?: any;
  version: string;
  type: string;
  success: boolean;
}

interface IosBridgeEvent extends CustomEvent {
  detail: Message
}

export class IosBridge extends Bridge {
  private pendingMessages: {}
  private version: any
  private _bindedEventHandler: EventListener

  constructor() {
    super()

    this.pendingMessages = {}

    this.version = "__LAYERS_SDK_VERSION__"

    this._bindedEventHandler = this._eventHandler.bind(this)
    window.addEventListener('layers:ios', this._bindedEventHandler, false)
  }

  getPlatform(): string {
    return "ios"
  }

  destroy() {
    if (this._bindedEventHandler) {
      window.removeEventListener('layers:ios', this._bindedEventHandler, false)
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
        layers: true,
        id: id,
        method: method,
        payload: payload,
        version: this.version,
        type: 'request',
        success: true
      }
      try {
        this._postMessage(message)
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

  private _postMessage(message: Message) {
    window.webkit.messageHandlers.LayersIosBridge.postMessage(message)
  }

  private _eventHandler(event: IosBridgeEvent) {
    const message = event.detail

    if (!message.id) {
      this.dispatch("error", new Error('Message received without id!'))
      return
    }

    switch (message.type) {
      case 'response': this._handleResponseMessage(message); return;
      case 'request': this._handleRequestMessage(message); return;
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
    var timeoutId = pendingMessage.timeoutId

    clearTimeout(timeoutId)
    delete this.pendingMessages[id]

    if (message.success) {
      const resolve = pendingMessage.resolve
      resolve(payload)
    } else {
      const reject = pendingMessage.reject
      reject(payload)
    }
  }

  private _handleRequestMessage(message: Message) {
    const id = message.id
    const method = message.method
    const payload = message.payload

    const promise = this.dispatch(method, payload)
    Promise.resolve(promise)
      .then(res => {
        this._postMessage({ layers:true, id: id, payload: res, version: this.version, type: 'response', success: true })
      }).catch(error => {
        this._postMessage({ layers:true, id: id, payload: error.message, version: this.version, type: 'error', success: false })
      })
  }
}

function generateId(): MessageID {
  return ~~(Math.random() * (1 << 30))
}

export default IFrameBridge
