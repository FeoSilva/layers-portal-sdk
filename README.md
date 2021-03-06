# Layers SDK for JavaScript v1

![npm](https://img.shields.io/npm/v/layers-sdk)
![NPM](https://img.shields.io/npm/l/layers-sdk)


```html
<script>
!function(){var n;window.Layers=window.Layers||(n=function(n,t,e){return new Promise((r,u)=>{func.q.push([r,u,n,t,e])})},func=function(){return n("root",...arguments)},func.q=[],func.ui=function(){return n("ui",...arguments)},func.api=function(){return n("api",...arguments)},func);var t=document.createElement("script");t.type="text/javascript",t.async=!0,t.src="https://unpkg.com/layers-sdk@2/dist/app.js";var e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(t,e)}();
</script>
```

Example:
```javascript
/* Setting up Layers SDK */
await Layers('boot', {
  appId: "", // Your APP's ID
  appKey: "" // Your APP's secret key
})


/* Creating a post */
const promise = Layers.ui('createPost', {
  type: "message",
  title: "Post Title",
  text: "**Post body (markdown)**",
})

/* Creating a group */
const promise = Layers.ui('createGroup')

/* Closing window */
const promise = Layers.ui('close')

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