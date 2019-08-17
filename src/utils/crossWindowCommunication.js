class CrossWindowCommunication {
  constructor(options) {
    this.pendingMessages = {}
    this.errorListener = options.errorListener || (() => undefined)
    this.requestListener = options.requestListener || (() => undefined)
    this.targetWindow = options.targetWindow || window.parent,
    this.version = options.version || SDK_VERSION

    this._isInitialized = false
  }

  init() {
    if (this._isInitialized) {
      return
    }

    this._bindedEventHandler = this._eventHandler.bind(this)
    if (window.addEventListener) {
      window.addEventListener('message', this._bindedEventHandler, false)
    } else if (window.attachEvent) {
      window.attachEvent('on' + 'message', this._bindedEventHandler)
    }

    this._isInitialized = true
  }

  destroy() {
    if (this._bindedEventHandler) {
      window.removeEventListener('remove', this._bindedEventHandler, false)
    }
  }

  async send(method, payload, timeout = 30000) {
    const promise = new Promise((resolve, reject) => {
      const id = generateId()
      const timeoutId = setTimeout(() => { reject(new Error(`Message ${id} timed out!`)) }, timeout)
      this.pendingMessages[id] = { resolve, reject, timeoutId }

      this.targetWindow.postMessage({ id, method, payload, version: this.version, type: 'request' }, '*')
    })
    return promise
  }

  _eventHandler(event) {
    const message = event.data
    const sourceWindow = event.source

    if (!message.id) {
      this.errorListener(new Error('Message received without id!'))
      return
    }

    switch (message.type) {
      case 'response': this._handleResponseMessage(message); return;
      case 'error': this._handleErrorMessage(message); return;
      case 'request': this._handleRequestMessage(message, sourceWindow); return;
      default: this.errorListener(new Error(`Message received with unknown type "${message.type}"!`))
    }
  }

  _handleResponseMessage(message) {
    const { id, payload } = message

    if (!(id in this.pendingMessages)) {
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

  _handleRequestMessage(message, sourceWindow) {
    const { id, method, payload } = message

    Promise.resolve(this.requestListener(method, payload))
      .then(res => {
        sourceWindow.postMessage({ id, payload: res, version: this.version, type: 'response' }, '*')
      }).catch(error => {
        sourceWindow.postMessage({ id, payload: error, version: this.version, type: 'error' }, '*')
      })
  }
}

function generateId() {
  return ~~(Math.random() * (1 << 30))
}

export default CrossWindowCommunication
