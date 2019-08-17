!function(e){function t(r){if(n[r])return n[r].exports;var s=n[r]={i:r,l:!1,exports:{}};return e[r].call(s.exports,s,s.exports,t),s.l=!0,s.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var s in e)t.d(r,s,function(t){return e[t]}.bind(null,s));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t,n){"use strict";function r(e,t,n){return new Promise((r,i)=>{s(r,i,e,t,n)})}async function s(e,t,n,r,s){if(0===r.indexOf("_"))throw new Error(`Can not run private method ${r}!`);const i=await async function(e){const t=o[e];if(!t)throw new Error(`Module ${e} not found.`);return await t._ensureInit(),t}(n);try{const t=await i.handle(r,s);e(t)}catch(e){t(e)}}n.r(t);var i=class{constructor(){this.initialized=!1}async _ensureInit(){this.initialized||(this._init&&await this._init(),this.initialized=!0)}async handle(e,t){const n=this[e];if(!n)throw new Error(`Method ${e} not found.`);return await n.bind(this)(t)}};const o={root:new class extends i{async _init(){console.log("loading root...")}async setup(){await new Promise(e=>setTimeout(e,1e3))}},ui:new class extends i{async _init(){if(!window)throw new Error('Can not use UI module without "window"');this.parentCommunication=new class{constructor(e){this.pendingMessages={},this.errorListener=e.errorListener||(()=>void 0),this.requestListener=e.requestListener||(()=>void 0),this.targetWindow=e.targetWindow||window.parent}init(){const e=this._eventHandler.bind(this);window.addEventListener?window.addEventListener("message",e,!1):window.attachEvent&&window.attachEvent("onmessage",e)}async send(e,t,n=3e4){return new Promise((r,s)=>{const i=~~(1073741824*Math.random()),o=setTimeout(()=>{s(new Error(`Message ${i} timed out!`))},n);this.pendingMessages[i]={resolve:r,reject:s,timeoutId:o},this.targetWindow.postMessage({id:i,method:e,payload:t,version:"0.0.1",type:"request"})})}_eventHandler(e){const t=e.data;if(t.id)switch(t.type){case"response":return void this._handleResponseMessage(t);case"error":return void this._handleErrorMessage(t);case"request":return void this._handleRequestMessage(t);default:this.errorListener(new Error(`Message received with unknown type "${t.type}"!`))}else this.errorListener(new Error("Message received without id!"))}_handleResponseMessage(e){const{id:t,payload:n}=e;if(!(t in this.pendingMessages))return void this.errorListener(new Error(`Received response message with inexistent id ${t}!`));const{resolve:r,timeoutId:s}=this.pendingMessages[t];clearTimeout(s),delete this.pendingMessages[t],r(n)}_handleErrorMessage(e){const{id:t,payload:n}=e;if(!(t in this.pendingMessages))return void this.errorListener(new Error(`Received error message with inexistent id ${t}!`));const{reject:r,timeoutId:s}=this.pendingMessages[t];clearTimeout(s),delete this.pendingMessages[t],r(n)}_handleRequestMessage(e){const{id:t,method:n,payload:r}=e;Promise.resolve(this.requestListener(n,r)).then(e=>{this.targetWindow.postMessage({id:t,payload:e,version:"0.0.1",type:"response"})}).catch(e=>{this.targetWindow.postMessage({id:t,payload:e,version:"0.0.1",type:"error"})})}}({requestListener:this._requestListener.bind(this),errorListener:this._errorListener.bind(this)}),this.parentCommunication.init()}async _requestListener(e,t){const n=this[e];return n?await n.find(this)(t):void this._errorListener(new Error(`Unknown request method ${e}`))}async _errorListener(e){console.error(e)}async createPost(e){return await this.parentCommunication.send("createPost",e)}},api:new class extends i{async setup(){}}};if(window.Layers&&Layers.q){for(let e of Layers.q)s(...e);Layers.q=[],Layers=function(){return r("root",...arguments)},Layers.UI=function(){return r("ui",...arguments)},Layers.API=function(){return r("api",...arguments)}}}]);