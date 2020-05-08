# Layers Portal SDK for JavaScript v1

![npm](https://img.shields.io/npm/v/layers-portal-sdk)
![NPM](https://img.shields.io/npm/l/layers-portal-sdk)


```html
<script>
window.LayersPortalOptions = {
  appId: "test-app"
}
!function(){var e;window.LayersPortal||(window.LayersPortal=((e=function(t,r){return new Promise((function(n,a){e.q.push([n,a,t,r])}))}).q=[],e.eh={},e.on=function(t,r){var n=e.eh[t]||[];n.push(r),e.eh[t]=n},e.ready=!1,e.connected=!1,e.platform=null,e));var t=document.createElement("script");t.type="text/javascript",t.async=!0,t.src="https://js.layers.digital/v1/LayersPortal.js";var r=document.getElementsByTagName("script")[0];r.parentNode.insertBefore(t,r)}();
</script>
```

Example:
```javascript

LayersPortal.on('ready', function () {
  // Called when SDK is ready
})

LayersPortal.on('connected', function () {
  // Called when SDK connects with Layers
})


/* Creating a post */
const promise = LayersPortal('createPost', {
  type: "message",
  title: "Post Title",
  text: "**Post body (markdown)**",
})

/* Creating a group */
const promise = LayersPortal('createGroup')

/* Closing window */
const promise = LayersPortal('close')

/* Using async/await */
try {
  const result = await promise
  // Use result
} catch (error) {
  // Handle errors
}

/* Using then/catch */
promise.then(result => {
  // Use result
}).catch(error => {
  // Handle errors
})
```
