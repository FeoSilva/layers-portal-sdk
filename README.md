# Layers SDK for JavaScript v1

![npm](https://img.shields.io/npm/v/layers-sdk)
![NPM](https://img.shields.io/npm/l/layers-sdk)


```html
<script>
window.LayersOptions = {
  appId: "test-app"
}
!function(){var e;window.Layers||(window.Layers=((e=function(n,t){return new Promise((function(r,a){e.q.push([r,a,n,t])}))}).q=[],e.eh={},e.on=function(n,t){var r=e.eh[n]||[];r.push(t),e.eh[n]=r},e.ready=!1,e.connected=!1,e.platform=null,e));var n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src="https://unpkg.com/layers-sdk@3/dist/app.js";var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(n,t)}();
</script>
```

Example:
```javascript

Layers.on('ready', function () {
  // Called when SDK is ready
})

Layers.on('connected', function () {
  // Called when SDK connects with Layers
})


/* Creating a post */
const promise = Layers('createPost', {
  type: "message",
  title: "Post Title",
  text: "**Post body (markdown)**",
})

/* Creating a group */
const promise = Layers('createGroup')

/* Closing window */
const promise = Layers('close')

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
