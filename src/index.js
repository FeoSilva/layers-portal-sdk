import { getModule } from './modules'

// Consume events when loaded
if (window.Layers && Layers.q) {
  for (let params of Layers.q) {
    _LayersInner(...params)
  }
  delete Layers.q

  // events consumed
  Layers = function () { return _Layers('root', ...arguments) }
  Layers.ui = function () { return _Layers('ui', ...arguments) }
  Layers.api = function () { return _Layers('api', ...arguments) }
}

function _Layers(moduleName, method, payload) {
  return new Promise((resolve, reject) => {
    _LayersInner(resolve, reject, moduleName, method, payload)
  })
}

async function _LayersInner(resolve, reject, moduleName, method, payload) {
  if (method.indexOf('_') === 0) {
    throw new Error(`Can not run private method ${method}!`)
  }

  const module_ = await getModule(moduleName)

  try {
    const res = await module_.handle(method, payload)
    resolve(res)
  } catch(error) {
    reject(error)
  }
}
