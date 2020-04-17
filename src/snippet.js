// Declare dump window.Layers to queue up commands until real SDK is loaded
if (!window.Layers) {
  function _Layers(method, payload) {
    return new Promise(function(resolve, reject) {
      _Layers.q.push([resolve, reject, method, payload])
    })
  }
  _Layers.q = []

  window.Layers = _Layers
}

// Inject real SDK
var t = document.createElement("script");
t.type = "text/javascript", t.async = !0, t.src = "__LAYERS_SDK_PUBLIC_URL__";
var e = document.getElementsByTagName("script")[0];
e.parentNode.insertBefore(t, e)