class CrossWindowCommunication {
  constructor(options) {
    this.pendingMessages = {}
    this.errorListener = options.errorListener || (() => undefined)
    this.requestListener = options.requestListener || (() => undefined)
    this.targetWindow = options.targetWindow || window.parent
  }

  init() {
    const handler = this._eventHandler.bind(this)
    if (window.addEventListener) {
      window.addEventListener('message', handler, false)
    } else if (window.attachEvent) {
      window.attachEvent('on' + 'message', handler)
    }
  }

  async send(method, payload, timeout = 30000) {
    const promise = new Promise((resolve, reject) => {
      const id = generateId()
      const timeoutId = setTimeout(() => { reject(new Error(`Message ${id} timed out!`)) }, timeout)
      this.pendingMessages[id] = { resolve, reject, timeoutId }

      this.targetWindow.postMessage({ id, method, payload, version: SDK_VERSION, type: 'request' })
    })
    return promise
  }

  _eventHandler(event) {
    const message = event.data

    if (!message.id) {
      this.errorListener(new Error('Message received without id!'))
      return
    }

    switch (message.type) {
      case 'response': this._handleResponseMessage(message); return;
      case 'error': this._handleErrorMessage(message); return;
      case 'request': this._handleRequestMessage(message); return;
      default: this.errorListener(new Error(`Message received with unknown type "${message.type}"!`))
    }
  }

  _handleResponseMessage(message) {
    const { id, payload } = message

    if (!(id in this.pendingMessages)) {
      this.errorListener(new Error(`Received response message with inexistent id ${id}!`))
      return
    }

    const { resolve, timeoutId } = this.pendingMessages[id]
    clearTimeout(timeoutId)
    delete this.pendingMessages[id]

    resolve(payload)
  }

  _handleErrorMessage(message) {
    const { id, payload } = message

    if (!(id in this.pendingMessages)) {
      this.errorListener(new Error(`Received error message with inexistent id ${id}!`))
      return
    }

    const { reject, timeoutId } = this.pendingMessages[id]
    clearTimeout(timeoutId)
    delete this.pendingMessages[id]

    reject(payload)
  }

  _handleRequestMessage(message) {
    const { id, method, payload } = message

    Promise.resolve(this.requestListener(method, payload))
      .then(res => {
        this.targetWindow.postMessage({ id, payload: res, version: SDK_VERSION, type: 'response' })
      }).catch(error => {
        this.targetWindow.postMessage({ id, payload: error, version: SDK_VERSION, type: 'error' })
      })
  }
}

function generateId() {
  return ~~(Math.random() * (1 << 30))
}

export default CrossWindowCommunication
