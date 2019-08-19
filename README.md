# Layers SDK for JavaScript

![npm](https://img.shields.io/npm/v/layers-sdk)
![NPM](https://img.shields.io/npm/l/layers-sdk)


```html
<script>
!function(){var n;window.Layers=window.Layers||(n=function(n,t,e){return new Promise((r,u)=>{func.q.push([r,u,n,t,e])})},func=function(){return n("root",...arguments)},func.q=[],func.ui=function(){return n("ui",...arguments)},func.api=function(){return n("api",...arguments)},func);var t=document.createElement("script");t.type="text/javascript",t.async=!0,t.src="https://unpkg.com/layers-sdk@1/dist/main.js";var e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(t,e)}();
</script>
```

Example:
```javascript
const promise = Layers.ui('createPost', {
  type: "event",
  title: "Post Title",
  text: "**Post body (markdown)**",
})

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