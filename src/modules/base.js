function BaseModule() {
  this.initialized = false
}
BaseModule.prototype._ensureInit = function() {
  return new Promise((resolve, reject) => {
    if (!this.initialized) {
      if (this._init) {
        Promise.resolve(this._init()).then(() => {
          this.initialized = true
          resolve()
        })
      }
    }
    resolve()
  })
}
BaseModule.prototype.handle = function(methodName, payload) {
  return new Promise((resolve, reject) => {
    var method = this[methodName]
    if (!method) {
      reject(new Error(`Method ${methodName} not found.`))
    }

    var promise = Promise.resolve(method.bind(this)(payload))
    promise.then(resolve).catch(reject)
  })
}

export default BaseModule