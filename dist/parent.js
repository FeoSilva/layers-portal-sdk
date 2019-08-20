!function(e){var t={};function r(n){if(t[n])return t[n].exports;var i=t[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,r),i.l=!0,i.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)r.d(n,i,function(t){return e[t]}.bind(null,i));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=2)}([function(e,t,r){"use strict";var n=function(e){var t,r=0;for(t=0;t<e.length;t++)r=(r<<5)-r+e.charCodeAt(t),r|=0;return r.toString(16)},i=/^LAYERS:(-?[0-9a-f]+):(.+)$/;function s(){}s.prototype.serialize=function(e){var t=JSON.stringify(e);return`LAYERS:${n(t)}:${t}`},s.prototype.deserialize=function(e){var t=i.exec(e);if(!t)throw new Error("Malformed message");var r=t[1],s=t[2];if(n(s)!==r)throw new Error("Corrupted message");return JSON.parse(s)};var o=new s;function a(e){this.pendingMessages={},this.errorListener=e.errorListener||function(){},this.requestListener=e.requestListener||function(){},this.targetWindow=e.targetWindow||window.parent,this.targetOrigin=e.targetOrigin||"*",this.version=e.version||"1.0.5",this._isInitialized=!1}a.prototype.init=function(){this._isInitialized||(this.destroy(),this._bindedEventHandler=this._eventHandler.bind(this),window.addEventListener?window.addEventListener("message",this._bindedEventHandler,!1):window.attachEvent&&window.attachEvent("onmessage",this._bindedEventHandler),this._isInitialized=!0)},a.prototype.destroy=function(){this._bindedEventHandler&&(window.removeEventListener("remove",this._bindedEventHandler,!1),this._bindedEventHandler=null)},a.prototype.send=function(e,t,r){return r=r||3e4,new Promise((n,i)=>{var s=~~(Math.random()*(1<<30)),o=setTimeout(()=>{i(new Error(`Message ${s} timed out!`))},r);this.pendingMessages[s]={resolve:n,reject:i,timeoutId:o};var a={id:s,method:e,payload:t,version:this.version,type:"request"};this._postMessage(this.targetWindow,a,this.targetOrigin)})},a.prototype._postMessage=function(e,t,r){var n=o.serialize(t);e.postMessage(n,r)},a.prototype._eventHandler=function(e){var t;try{t=o.deserialize(e.data)}catch(e){return}if(t.id)switch(t.type){case"response":return void this._handleResponseMessage(t);case"error":return void this._handleErrorMessage(t);case"request":return void this._handleRequestMessage(t,e.source);default:this.errorListener(new Error(`Message received with unknown type "${t.type}"!`))}else this.errorListener(new Error("Message received without id!"))},a.prototype._handleResponseMessage=function(e){var t=e.id,r=e.payload;if(t in this.pendingMessages){var n=this.pendingMessages[t],i=n.resolve,s=n.timeoutId;clearTimeout(s),delete this.pendingMessages[t],i(r)}},a.prototype._handleErrorMessage=function(e){var t=e.id,r=new Error(e.payload);if(t in this.pendingMessages){var n=this.pendingMessages[t],i=n.reject,s=n.timeoutId;clearTimeout(s),delete this.pendingMessages[t],i(r)}},a.prototype._handleRequestMessage=function(e,t){var r=e.id,n=e.method,i=e.payload,s=this.requestListener(n,i);Promise.resolve(s).then(e=>{this._postMessage(t,{id:r,payload:e,version:this.version,type:"response"},"*")}).catch(e=>{this._postMessage(t,{id:r,payload:e.message,version:this.version,type:"error"},"*")})};t.a=a},,function(e,t,r){"use strict";r.r(t);var n=r(0);window.CrossWindowCommunication=n.a}]);