import MessageSerializer from './messageSerializer'

function CrossWindowCommunication(options) {
  this.pendingMessages = {}
  this.errorListener = options.errorListener || (function () { })
  this.requestListener = options.requestListener || (function () { })

  this.targetWindow = options.targetWindow || window.parent,
    this.targetOrigin = options.targetOrigin || '*'

  this.version = options.version || SDK_VERSION

  this._isInitialized = false
}

CrossWindowCommunication.prototype.init = function () {
  if (this._isInitialized) {
    return
  }

  this.destroy()
  this._bindedEventHandler = this._eventHandler.bind(this)
  if (window.addEventListener) {
    window.addEventListener('message', this._bindedEventHandler, false)
  } else if (window.attachEvent) {
    window.attachEvent('onmessage', this._bindedEventHandler)
  }

  this._isInitialized = true
}

CrossWindowCommunication.prototype.destroy = function () {
  if (this._bindedEventHandler) {
    window.removeEventListener('remove', this._bindedEventHandler, false)
    this._bindedEventHandler = null
  }
}

CrossWindowCommunication.prototype.send = function (method, payload, timeout) {
  timeout = timeout || 30000
  var promise = new Promise((resolve, reject) => {
    var id = generateId()
    var timeoutId = setTimeout(() => { reject(new Error(`Message ${id} timed out!`)) }, timeout)
    this.pendingMessages[id] = { resolve: resolve, reject: reject, timeoutId: timeoutId }

    var message = {
      id: id,
      method: method,
      payload: payload,
      version: this.version,
      type: 'request'
    }
    this._postMessage(this.targetWindow, message, this.targetOrigin)
  })
  return promise
}

CrossWindowCommunication.prototype._postMessage = function (window, message, targetOrigin) {
  var serializedMessage = MessageSerializer.serialize(message)
  window.postMessage(serializedMessage, targetOrigin)
}

CrossWindowCommunication.prototype._eventHandler = function (event) {
  var message
  try {
    message = MessageSerializer.deserialize(event.data)
  } catch (error) {
    return // Ignore malformed messages, since it probably shouldn't be handled by SDK
  }

  if (!message.id) {
    this.errorListener(new Error('Message received without id!'))
    return
  }

  switch (message.type) {
    case 'response': this._handleResponseMessage(message); return;
    case 'error': this._handleErrorMessage(message); return;
    case 'request': this._handleRequestMessage(message, event.source); return;
    default: this.errorListener(new Error(`Message received with unknown type "${message.type}"!`))
  }
}

CrossWindowCommunication.prototype._handleResponseMessage = function (message) {
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

CrossWindowCommunication.prototype._handleErrorMessage = function (message) {
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

CrossWindowCommunication.prototype._handleRequestMessage = function (message, sourceWindow) {
  var id = message.id
  var method = message.method
  var payload = message.payload

  var promise = this.requestListener(method, payload)
  Promise.resolve(promise)
    .then(res => {
      this._postMessage(sourceWindow, { id: id, payload: res, version: this.version, type: 'response' }, '*')
    }).catch(error => {
      this._postMessage(sourceWindow, { id: id, payload: error.message, version: this.version, type: 'error' }, '*')
    })
}

function generateId() {
  return ~~(Math.random() * (1 << 30))
}

export default CrossWindowCommunication
