import BaseModule from './base'
import CrossWindowCommunication from '../utils/crossWindowCommunication'

class UIModule extends BaseModule {
  async _init() {
    if (!window) {
      throw new Error('Can not use UI module without "window"')
    }

    this.parentCommunication = new CrossWindowCommunication({
      requestListener: this._requestListener.bind(this),
      errorListener: this._errorListener.bind(this)
    })
    this.parentCommunication.init()
  }

  async _requestListener(methodName, payload) {
    const method = this[methodName]
    if (!method) {
      this._errorListener(new Error(`Unknown request method ${methodName}`))
      return
    }

    return await method.bind(this)(payload)
  }

  async _errorListener(error) {
    console.error('Error listener:', error)
  }

  async createPost(data) {
    return await this.parentCommunication.send('createPost', data)
  }
}

export default UIModule