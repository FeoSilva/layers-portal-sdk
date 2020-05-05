import { LayersSDK } from './app'

// Declare dump window.Layers to queue up commands until real SDK is loaded
if (!window.Layers) {
  window.Layers = (() => {
    const _Layers = (method: string, payload?: any) => {
      return new Promise(function(resolve, reject) {
        _Layers['q'].push([resolve, reject, method, payload])
      })
    }
    _Layers['q'] = []
    _Layers['eh'] = {}
    _Layers['on'] = (eventName: string, handler: (payload: any) => void) => {
      const handlers = _Layers['eh'][eventName] || []
      handlers.push(handler)
      _Layers['eh'][eventName] = handlers
    }
    _Layers['ready'] = false
    _Layers['connected'] = false
    _Layers['platform'] = null
    return _Layers
  })()
}

// Inject real SDK
const scriptEl = document.createElement("script")
scriptEl.type = "text/javascript"
scriptEl.async = true
scriptEl.src = "__LAYERS_SDK_PUBLIC_URL__"

const firstScriptEl = document.getElementsByTagName("script")[0];
firstScriptEl.parentNode.insertBefore(scriptEl, firstScriptEl)