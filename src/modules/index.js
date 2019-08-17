import RootModule from './root'
import UIModule from './ui'
import APIModule from './api'

const MODULES = {
  'root': new RootModule(),
  'ui': new UIModule(),
  'api': new APIModule()
}

async function getModule(moduleName) {
  const module_ = MODULES[moduleName]

  if (!module_) {
    throw new Error(`Module ${moduleName} not found.`)
  }

  await module_._ensureInit()

  return module_
}

export { getModule }