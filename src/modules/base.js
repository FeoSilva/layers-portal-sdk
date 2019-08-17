class BaseModule {
  constructor() {
    this.initialized = false
  }

  async _ensureInit() {
    if (!this.initialized) {
      if (this._init) await this._init()
      this.initialized = true
    }
  }

  async handle(methodName, payload) {
    const method = this[methodName]
    if (!method) {
      throw new Error(`Method ${methodName} not found.`)
    }

    return await method.bind(this)(payload)
  }
}
export default BaseModule