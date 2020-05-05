!function(e){"use strict";var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,n)};function n(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}function r(e,t,n,r){var i,o=arguments.length,s=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,n,r);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(s=(o<3?i(s):o>3?i(t,n,s):i(t,n))||s);return o>3&&s&&Object.defineProperty(t,n,s),s}function i(e,t,n,r){return new(n||(n=Promise))((function(i,o){function s(e){try{d(r.next(e))}catch(e){o(e)}}function a(e){try{d(r.throw(e))}catch(e){o(e)}}function d(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,a)}d((r=r.apply(e,t||[])).next())}))}function o(e,t){var n,r,i,o,s={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function a(o){return function(a){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;s;)try{if(n=1,r&&(i=2&o[0]?r.return:o[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,o[1])).done)return i;switch(r=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return s.label++,{value:o[1],done:!1};case 5:s.label++,r=o[1],o=[0];continue;case 7:o=s.ops.pop(),s.trys.pop();continue;default:if(!(i=s.trys,(i=i.length>0&&i[i.length-1])||6!==o[0]&&2!==o[0])){s=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){s.label=o[1];break}if(6===o[0]&&s.label<i[1]){s.label=i[1],i=o;break}if(i&&s.label<i[2]){s.label=i[2],s.ops.push(o);break}i[2]&&s.ops.pop(),s.trys.pop();continue}o=t.call(e,s)}catch(e){o=[6,e],r=0}finally{n=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,a])}}}var s=function(){function e(){var e=this;this.listeners=[];var t,n,r,i,o=(t=function(){e.updateHistory()},n=0,i=0,function(){var e=this,o=arguments,s=function(){i=null,r||t.apply(e,o)},a=r&&!i;clearTimeout(i),i=setTimeout(s,n),a&&t.apply(e,o)});this.monkeyPatchHistory(),window.addEventListener("locationchange",o,!1),window.addEventListener("hashchange",o,!1),window.addEventListener("popstate",o,!1),window.addEventListener("pushState",o,!1),window.addEventListener("replaceState",o,!1)}return e.prototype.addListener=function(e){this.listeners.push(e)},e.prototype.destroy=function(){},e.prototype.monkeyPatchHistory=function(){var e=function(e){var t=history[e];return function(){var n=t.apply(this,arguments),r=new Event(e);return r.arguments=arguments,window.dispatchEvent(r),n}};history.pushState=e("pushState"),history.replaceState=e("replaceState")},e.prototype.updateHistory=function(){for(var e,t=window.location.href,n=null===(e=null===window||void 0===window?void 0:window.history)||void 0===e?void 0:e.state,r=0,i=this.listeners;r<i.length;r++){(0,i[r])({url:t,state:n})}},e}(),a=function(){function e(){var e=this;this.listeners=[],document.querySelector("title")?this.setup():setTimeout((function(){return e.setup()}),0)}return e.prototype.setup=function(){var e=this;this.observer=new MutationObserver((function(){return e.updateTitle()}));var t=document.querySelector("title");t&&this.observer.observe(t,{subtree:!0,characterData:!0,childList:!0})},e.prototype.addListener=function(e){this.listeners.push(e)},e.prototype.destroy=function(){this.observer&&this.observer.disconnect()},e.prototype.updateTitle=function(){for(var e=this.getTitle(),t=0,n=this.listeners;t<n.length;t++){(0,n[t])(e)}},e.prototype.getTitle=function(){var e=document.querySelector("title");return null==e?void 0:e.innerText},e}(),d=function(){function e(){this.requestHandlers=new Map,this.ready=!1}return e.prototype.addRequestHandler=function(e,t){this.requestHandlers.set(e,t)},e.prototype.download=function(e){return i(this,void 0,void 0,(function(){return o(this,(function(t){switch(t.label){case 0:return[4,this.send("download",e)];case 1:return[2,t.sent()]}}))}))},e.prototype.setup=function(e){return i(this,void 0,void 0,(function(){return o(this,(function(t){switch(t.label){case 0:if(this.ready)throw new Error("LayersSDK already set up!");return this.options=e.options,[4,this.send("setup",e)];case 1:if(!t.sent().success)throw new Error("Handshake failed!");return this.ready=!0,[2,{bridgeConnected:!0,platform:this.getPlatform()}]}}))}))},e}();function u(e){for(var t=0,n=0;n<e.length;n++){t=(t<<5)-t+e.charCodeAt(n),t|=0}return t.toString(16)}var c=/^LAYERS:(-?[0-9a-f]+):(.+)$/,p=new(function(){function e(){}return e.prototype.serialize=function(e){var t=JSON.stringify(e);return"LAYERS:"+u(t)+":"+t},e.prototype.deserialize=function(e){var t=c.exec(e);if(!t)throw new Error("Malformed message");var n=t[1],r=t[2];if(u(r)!==n)throw new Error("Corrupted message");return JSON.parse(r)},e}()),l=function(e){function t(t){var n=e.call(this)||this;return n.pendingMessages={},n.targetWindow=t.targetWindow,n.targetOrigin=t.targetOrigin,n.version="3.0.15",n._bindedEventHandler=n._eventHandler.bind(n),window.addEventListener("message",n._bindedEventHandler,!1),n}return n(t,e),t.prototype.getPlatform=function(){return"iframe"},t.prototype.setup=function(t){return i(this,void 0,void 0,(function(){return o(this,(function(n){switch(n.label){case 0:if(window===this.targetWindow)throw new Error("Target must be a different Window");return[4,e.prototype.setup.call(this,t)];case 1:return[2,n.sent()]}}))}))},t.prototype.destroy=function(){this._bindedEventHandler&&(window.removeEventListener("message",this._bindedEventHandler,!1),this._bindedEventHandler=null),this.ready=!1},t.prototype.send=function(e,t,n){var r=this;return void 0===n&&(n=3e4),new Promise((function(i,o){var s=~~(Math.random()*(1<<30)),a=setTimeout((function(){o(new Error("Message "+s+" timed out!"))}),n);r.pendingMessages[s]={resolve:i,reject:o,timeoutId:a};var d={id:s,method:e,payload:t,version:r.version,type:"request"};try{r._postMessage(r.targetWindow,d,r.targetOrigin)}catch(e){return o(e)}}))},t.prototype.dispatch=function(e,t){if(this.requestHandlers.has(e))return this.requestHandlers.get(e)(t)},t.prototype._postMessage=function(e,t,n){var r=p.serialize(t);e.postMessage(r,n)},t.prototype._eventHandler=function(e){var t;try{t=p.deserialize(e.data)}catch(e){return}if(t.id)switch(t.type){case"response":return void this._handleResponseMessage(t);case"error":return void this._handleErrorMessage(t);case"request":return void this._handleRequestMessage(t,e.source);default:this.dispatch("error",new Error('Message received with unknown type "'+t.type+'"!'))}else this.dispatch("error",new Error("Message received without id!"))},t.prototype._handleResponseMessage=function(e){var t=e.id,n=e.payload;if(t in this.pendingMessages){var r=this.pendingMessages[t],i=r.resolve,o=r.timeoutId;clearTimeout(o),delete this.pendingMessages[t],i(n)}},t.prototype._handleErrorMessage=function(e){var t=e.id,n=new Error(e.payload);if(t in this.pendingMessages){var r=this.pendingMessages[t],i=r.reject,o=r.timeoutId;clearTimeout(o),delete this.pendingMessages[t],i(n)}},t.prototype._handleRequestMessage=function(e,t){var n=this,r=e.id,i=e.method,o=e.payload,s=this.dispatch(i,o);Promise.resolve(s).then((function(e){n._postMessage(t,{id:r,payload:e,version:n.version,type:"response"},"*")})).catch((function(e){n._postMessage(t,{id:r,payload:e.message,version:n.version,type:"error"},"*")}))},t}(d);var h=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return n(t,e),t.prototype.setup=function(e){return i(this,void 0,void 0,(function(){return o(this,(function(e){return this.ready=!1,[2,{bridgeConnected:!1}]}))}))},t.prototype.getPlatform=function(){return null},t.prototype.send=function(e,t,n){return i(this,void 0,void 0,(function(){return o(this,(function(t){throw new Error("App has no bridge to Layers "+e)}))}))},t.prototype.download=function(e){return i(this,void 0,void 0,(function(){var t,n,r;return o(this,(function(i){return t=e.url,n=e.filename,(r=document.createElement("a")).download=n,r.href=t,document.body.appendChild(r),r.click(),document.body.removeChild(r),[2]}))}))},t}(d),f=function(e){function t(){var t=e.call(this)||this;return t.pendingMessages={},t.version="3.0.15",t._bindedEventHandler=t._eventHandler.bind(t),window.addEventListener("layers:android",t._bindedEventHandler,!1),t}return n(t,e),t.prototype.getPlatform=function(){return"android"},t.prototype.destroy=function(){this._bindedEventHandler&&(window.removeEventListener("layers:android",this._bindedEventHandler,!1),this._bindedEventHandler=null),this.ready=!1},t.prototype.send=function(e,t,n){var r=this;return void 0===n&&(n=3e4),new Promise((function(i,o){var s=~~(Math.random()*(1<<30)),a=setTimeout((function(){o(new Error("Message "+s+" timed out!"))}),n);r.pendingMessages[s]={resolve:i,reject:o,timeoutId:a};var d={layers:!0,id:s,method:e,payload:t,version:r.version,type:"request",success:!0};try{r._postMessage(d)}catch(e){return o(e)}}))},t.prototype.dispatch=function(e,t){if(this.requestHandlers.has(e))return this.requestHandlers.get(e)(t)},t.prototype._postMessage=function(e){window.LayersAndroidBridge.send(JSON.stringify(e))},t.prototype._eventHandler=function(e){var t=e.detail;if(t.id)switch(t.type){case"response":return void this._handleResponseMessage(t);case"request":return void this._handleRequestMessage(t);default:this.dispatch("error",new Error('Message received with unknown type "'+t.type+'"!'))}else this.dispatch("error",new Error("Message received without id!"))},t.prototype._handleResponseMessage=function(e){var t=e.id,n=e.payload;if(t in this.pendingMessages){var r=this.pendingMessages[t],i=r.timeoutId;if(clearTimeout(i),delete this.pendingMessages[t],e.success)(0,r.resolve)(n);else(0,r.reject)(n)}},t.prototype._handleRequestMessage=function(e){var t=this,n=e.id,r=e.method,i=e.payload,o=this.dispatch(r,i);Promise.resolve(o).then((function(e){t._postMessage({layers:!0,id:n,payload:e,version:t.version,type:"response",success:!0})})).catch((function(e){t._postMessage({layers:!0,id:n,payload:e.message,version:t.version,type:"error",success:!1})}))},t}(d);var v,y=function(e){function t(){var t=e.call(this)||this;return t.pendingMessages={},t.version="3.0.15",t._bindedEventHandler=t._eventHandler.bind(t),window.addEventListener("layers:ios",t._bindedEventHandler,!1),t}return n(t,e),t.prototype.getPlatform=function(){return"ios"},t.prototype.destroy=function(){this._bindedEventHandler&&(window.removeEventListener("layers:ios",this._bindedEventHandler,!1),this._bindedEventHandler=null),this.ready=!1},t.prototype.send=function(e,t,n){var r=this;return void 0===n&&(n=3e4),new Promise((function(i,o){var s=~~(Math.random()*(1<<30)),a=setTimeout((function(){o(new Error("Message "+s+" timed out!"))}),n);r.pendingMessages[s]={resolve:i,reject:o,timeoutId:a};var d={layers:!0,id:s,method:e,payload:t,version:r.version,type:"request",success:!0};try{r._postMessage(d)}catch(e){return o(e)}}))},t.prototype.dispatch=function(e,t){if(this.requestHandlers.has(e))return this.requestHandlers.get(e)(t)},t.prototype._postMessage=function(e){window.webkit.messageHandlers.LayersIosBridge.postMessage(e)},t.prototype._eventHandler=function(e){var t=e.detail;if(t.id)switch(t.type){case"response":return void this._handleResponseMessage(t);case"request":return void this._handleRequestMessage(t);default:this.dispatch("error",new Error('Message received with unknown type "'+t.type+'"!'))}else this.dispatch("error",new Error("Message received without id!"))},t.prototype._handleResponseMessage=function(e){var t=e.id,n=e.payload;if(t in this.pendingMessages){var r=this.pendingMessages[t],i=r.timeoutId;if(clearTimeout(i),delete this.pendingMessages[t],e.success)(0,r.resolve)(n);else(0,r.reject)(n)}},t.prototype._handleRequestMessage=function(e){var t=this,n=e.id,r=e.method,i=e.payload,o=this.dispatch(r,i);Promise.resolve(o).then((function(e){t._postMessage({layers:!0,id:n,payload:e,version:t.version,type:"response",success:!0})})).catch((function(e){t._postMessage({layers:!0,id:n,payload:e.message,version:t.version,type:"error",success:!1})}))},t}(d);var w=Symbol("IS_SDK_METHOD"),g=function(){return function(e,t,n){n.value[w]=!0}},m=function(){function e(){if(!window)throw new Error('Can not use Layers SDK without "window"');this.ready=!1,this.connected=!1,this.eventTarget=document.createElement("div"),this.historyWatcher=new s,this.titleWatcher=new a}return e.prototype.setup=function(e){return i(this,void 0,void 0,(function(){var t,n=this;return o(this,(function(r){switch(r.label){case 0:if(this.ready)throw new Error("LayersSDK already set up!");return this.options=e,this.parentBridge=function(){var e,t;return window.LayersAndroidBridge?new f:(null===(t=null===(e=window.webkit)||void 0===e?void 0:e.messageHandlers)||void 0===t?void 0:t.LayersIosBridge)?new y:window.frameElement||window.parent!==window?new l({targetOrigin:"*",targetWindow:window.parent}):new h}(),this.parentBridge.addRequestHandler("ping",(function(){return"pong"})),t=this,[4,this.parentBridge.setup({options:e,url:window.location.href,state:null===history||void 0===history?void 0:history.state,title:this.titleWatcher.getTitle()})];case 1:return t.setupResult=r.sent(),this.ready=!0,this.eventTarget.dispatchEvent(new CustomEvent("ready",{detail:this.setupResult})),this.setupResult.bridgeConnected?(this.connected=!0,this.eventTarget.dispatchEvent(new CustomEvent("connected",{detail:this.setupResult})),this.historyWatcher.addListener((function(e){n.update(e)})),this.titleWatcher.addListener((function(e){n.update({title:e})})),this.historyWatcher.updateHistory(),this.titleWatcher.updateTitle(),[2]):[2]}}))}))},e.prototype.handle=function(e,t){return i(this,void 0,void 0,(function(){var n;return o(this,(function(r){switch(r.label){case 0:if(!(n=this[e])||!n[w])throw new Error("Method "+e+" not found.");return[4,n.bind(this)(t)];case 1:return[2,r.sent()]}}))}))},e.prototype.onReady=function(e){this.ready?e(this.setupResult):this.eventTarget.addEventListener("ready",(function(t){e(t.detail)}))},e.prototype.onConnected=function(e){this.connected?e(this.setupResult):this.eventTarget.addEventListener("connected",(function(t){e(t.detail)}))},e.prototype.ping=function(){return this.parentBridge.send("ping")},e.prototype.update=function(e){this.parentBridge.ready&&this.parentBridge.send("update",e)},e.prototype.download=function(e){return i(this,void 0,void 0,(function(){return o(this,(function(t){switch(t.label){case 0:return[4,this.parentBridge.download(e)];case 1:return[2,t.sent()]}}))}))},e.prototype.createPost=function(e){return i(this,void 0,void 0,(function(){return o(this,(function(t){switch(t.label){case 0:return[4,this.parentBridge.send("createPost",e)];case 1:return[2,t.sent()]}}))}))},e.prototype.close=function(e){try{this.parentBridge.send("close",e)}catch(e){}try{window.close()}catch(e){}},e.prototype.createGroup=function(e){return i(this,void 0,void 0,(function(){return o(this,(function(t){switch(t.label){case 0:return[4,this.parentBridge.send("createGroup",e)];case 1:return[2,t.sent()]}}))}))},r([g()],e.prototype,"setup",null),r([g()],e.prototype,"onReady",null),r([g()],e.prototype,"onConnected",null),r([g()],e.prototype,"ping",null),r([g()],e.prototype,"update",null),r([g()],e.prototype,"download",null),r([g()],e.prototype,"createPost",null),r([g()],e.prototype,"close",null),r([g()],e.prototype,"createGroup",null),e}(),M=null===(v=window.Layers)||void 0===v?void 0:v.q,b=new m;if(window.LayersOptions&&b.setup(window.LayersOptions),window.Layers=function(e,t){return b.handle(e,t)},M)for(var E=0,_=M;E<_.length;E++){var H=_[E],L=H[0],R=H[1],q=H[2],S=H[3];b.handle(q,S).then(L).catch(R)}e.LayersSDKCore=m,e.SdkMethod=g}({});
//# sourceMappingURL=app.js.map
