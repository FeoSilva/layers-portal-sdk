import RootModule from './root'
import UIModule from './ui'
import APIModule from './api'

var MODULES = {
  'root': new RootModule(),
  'ui': new UIModule(),
  'api': new APIModule()
}

function getModule(moduleName) {
  return new Promise((resolve, reject) => {
    var module_ = MODULES[moduleName]

    if (!module_) {
      reject(new Error(`Module ${moduleName} not found.`))
    }

    module_._ensureInit().then(() => {
      resolve(module_)
    })
  })
}

export { getModule }