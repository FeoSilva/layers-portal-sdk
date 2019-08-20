import BaseModule from './base'
import CrossWindowCommunication from '../utils/crossWindowCommunication'

function UIModule() {}
UIModule.prototype = new BaseModule()

UIModule.prototype._init = function() {
  if (!window) {
    throw new Error('Can not use UI module without "window"')
  }

  this.parentCommunication = new CrossWindowCommunication({
    requestListener: this._requestListener.bind(this),
    errorListener: this._errorListener.bind(this)
  })
  this.parentCommunication.init()
}

UIModule.prototype._requestListener = function (methodName, payload) {
  var method = this[methodName]
  if (!method) {
    throw new Error(`Unknown request method ${methodName}`)
  }

  return method.bind(this)(payload)
}

UIModule.prototype._errorListener = function(error) {
  console.error('Error listener:', error)
}

UIModule.prototype.createPost = function(data) {
  return this.parentCommunication.send('createPost', data)
}

UIModule.prototype.close = function(data) {
  return this.parentCommunication.send('close', data)
}

export default UIModule