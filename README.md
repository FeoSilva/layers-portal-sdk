# Layers SDK for JavaScript v1

![npm](https://img.shields.io/npm/v/layers-sdk)
![NPM](https://img.shields.io/npm/l/layers-sdk)


```html
<script>
window.LayersOptions = {
  appId: "test-app"
}
!function(){if(!window.Layers){function s(n,r){return new Promise(function(e,t){s.q.push([e,t,n,r])})}s.q=[],window.Layers=s}var e=document.createElement("script");e.type="text/javascript",e.async=!0,e.src="https://unpkg.com/layers-sdk@3/dist/app.js";var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)}();
</script>
```

Example:
```javascript

Layers('onReady', function () {
  // Called when SDK is ready
})

Layers('onConnected', function () {
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
