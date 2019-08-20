import { getModule } from './modules'

// Consume events when loaded
if (window.Layers && Layers.q) {
  for (var params of Layers.q) {
    var resolve = params[0]
    var reject = params[1]
    var moduleName = params[2]
    var method = params[3]
    var payload = params[4]
    _LayersInner(resolve, reject, moduleName, method, payload)
  }
  delete Layers.q

  // events consumed
  Layers = function (method, payload) { return _Layers('root', method, payload) }
  Layers.ui = function (method, payload) { return _Layers('ui', method, payload) }
  Layers.api = function (method, payload) { return _Layers('api', method, payload) }
}

function _Layers(moduleName, method, payload) {
  return new Promise((resolve, reject) => {
    _LayersInner(resolve, reject, moduleName, method, payload)
  })
}

function _LayersInner(resolve, reject, moduleName, method, payload) {
  if (method.indexOf('_') === 0) {
    throw new Error(`Can not run private method ${method}!`)
  }

  getModule(moduleName).then(module_ => {
    module_.handle(method, payload)
      .then(resolve)
      .catch(reject)
  })
}
