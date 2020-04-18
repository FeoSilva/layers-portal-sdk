
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
(function (exports) {
    'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function debounce(func, wait, immediate) {
        var timeout = 0;
        return function executedFunction() {
            var context = this;
            var args = arguments;
            var later = function () {
                timeout = null;
                if (!immediate)
                    func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow)
                func.apply(context, args);
        };
    }

    var HistoryWatcher = /** @class */ (function () {
        function HistoryWatcher() {
            var _this = this;
            this.listeners = [];
            var locationChangeCallback = debounce(function () {
                _this.updateHistory();
            }, 0);
            // Monkey patch history functions
            this.monkeyPatchHistory();
            window.addEventListener("locationchange", locationChangeCallback, false);
            window.addEventListener("hashchange", locationChangeCallback, false);
            window.addEventListener("popstate", locationChangeCallback, false);
            window.addEventListener("pushState", locationChangeCallback, false);
            window.addEventListener("replaceState", locationChangeCallback, false);
        }
        HistoryWatcher.prototype.addListener = function (listener) {
            this.listeners.push(listener);
        };
        HistoryWatcher.prototype.destroy = function () {
            // TODO
        };
        HistoryWatcher.prototype.monkeyPatchHistory = function () {
            var _wr = function (type) {
                var orig = history[type];
                return function () {
                    var rv = orig.apply(this, arguments);
                    var e = new Event(type);
                    e.arguments = arguments;
                    window.dispatchEvent(e);
                    return rv;
                };
            };
            history.pushState = _wr("pushState");
            history.replaceState = _wr("replaceState");
        };
        HistoryWatcher.prototype.updateHistory = function () {
            var _a;
            var url = window.location.href;
            var state = (_a = window === null || window === void 0 ? void 0 : window.history) === null || _a === void 0 ? void 0 : _a.state;
            for (var _i = 0, _b = this.listeners; _i < _b.length; _i++) {
                var listener = _b[_i];
                listener({ url: url, state: state });
            }
        };
        return HistoryWatcher;
    }());

    var TitleWatcher = /** @class */ (function () {
        function TitleWatcher() {
            var _this = this;
            this.listeners = [];
            if (!document.querySelector('title')) {
                setTimeout(function () { return _this.setup(); }, 0);
                return;
            }
            else {
                this.setup();
            }
        }
        TitleWatcher.prototype.setup = function () {
            var _this = this;
            this.observer = new MutationObserver(function () { return _this.updateTitle(); });
            this.observer.observe(document.querySelector('title'), { subtree: true, characterData: true, childList: true });
        };
        TitleWatcher.prototype.addListener = function (listener) {
            this.listeners.push(listener);
        };
        TitleWatcher.prototype.destroy = function () {
            this.observer.disconnect();
        };
        TitleWatcher.prototype.updateTitle = function () {
            var data = this.getTitle();
            for (var _i = 0, _a = this.listeners; _i < _a.length; _i++) {
                var listener = _a[_i];
                listener(data);
            }
        };
        TitleWatcher.prototype.getTitle = function () {
            var titleElement = document.querySelector('title');
            return titleElement === null || titleElement === void 0 ? void 0 : titleElement.innerText;
        };
        return TitleWatcher;
    }());

    var Bridge = /** @class */ (function () {
        function Bridge() {
            this.requestHandlers = new Map();
            this.ready = false;
        }
        Bridge.prototype.addRequestHandler = function (method, handler) {
            this.requestHandlers.set(method, handler);
        };
        Bridge.prototype.download = function (data) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.send('download', data)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        Bridge.prototype.setup = function (params) {
            return __awaiter(this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (this.ready) {
                                throw new Error("LayersSDK already set up!");
                            }
                            this.options = params.options;
                            return [4 /*yield*/, this.send("setup", params)];
                        case 1:
                            response = _a.sent();
                            if (response.success) {
                                this.ready = true;
                            }
                            else {
                                throw new Error("Handshake failed!");
                            }
                            return [2 /*return*/, {
                                    bridgeConnected: true,
                                    platform: this.getPlatform()
                                }];
                    }
                });
            });
        };
        return Bridge;
    }());

    /*
     * Source : https://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
     */
    function hash(string) {
        var hash = 0;
        for (var i = 0; i < string.length; i++) {
            var chr = string.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash.toString(16);
    }

    var REGEX = /^LAYERS:(-?[0-9a-f]+):(.+)$/;
    var MessageSerializer = /** @class */ (function () {
        function MessageSerializer() {
        }
        MessageSerializer.prototype.serialize = function (message) {
            var messageString = JSON.stringify(message);
            var messageHash = hash(messageString);
            return "LAYERS:" + messageHash + ":" + messageString;
        };
        MessageSerializer.prototype.deserialize = function (string) {
            var match = REGEX.exec(string);
            if (!match) {
                throw new Error('Malformed message');
            }
            var messageHash = match[1];
            var messageString = match[2];
            if (hash(messageString) !== messageHash) {
                throw new Error('Corrupted message');
            }
            var message = JSON.parse(messageString);
            return message;
        };
        return MessageSerializer;
    }());
    var MessageSerializer$1 = new MessageSerializer();

    var IFrameBridge$1 = /** @class */ (function (_super) {
        __extends(IFrameBridge, _super);
        function IFrameBridge(options) {
            var _this = _super.call(this) || this;
            _this.pendingMessages = {};
            _this.targetWindow = options.targetWindow;
            _this.targetOrigin = options.targetOrigin;
            _this.version = "3.0.12";
            _this._bindedEventHandler = _this._eventHandler.bind(_this);
            window.addEventListener('message', _this._bindedEventHandler, false);
            return _this;
        }
        IFrameBridge.prototype.getPlatform = function () {
            return "iframe";
        };
        IFrameBridge.prototype.setup = function (params) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (window === this.targetWindow) {
                                throw new Error("Target must be a different Window");
                            }
                            return [4 /*yield*/, _super.prototype.setup.call(this, params)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        IFrameBridge.prototype.destroy = function () {
            if (this._bindedEventHandler) {
                window.removeEventListener('message', this._bindedEventHandler, false);
                this._bindedEventHandler = null;
            }
            this.ready = false;
        };
        IFrameBridge.prototype.send = function (method, payload, timeout) {
            var _this = this;
            if (timeout === void 0) { timeout = 30000; }
            var promise = new Promise(function (resolve, reject) {
                var id = generateId();
                var timeoutId = setTimeout(function () { reject(new Error("Message " + id + " timed out!")); }, timeout);
                _this.pendingMessages[id] = { resolve: resolve, reject: reject, timeoutId: timeoutId };
                var message = {
                    id: id,
                    method: method,
                    payload: payload,
                    version: _this.version,
                    type: 'request'
                };
                try {
                    _this._postMessage(_this.targetWindow, message, _this.targetOrigin);
                }
                catch (error) {
                    return reject(error);
                }
            });
            return promise;
        };
        IFrameBridge.prototype.dispatch = function (method, payload) {
            if (!this.requestHandlers.has(method))
                return;
            var handler = this.requestHandlers.get(method);
            return handler(payload);
        };
        IFrameBridge.prototype._postMessage = function (_window, message, targetOrigin) {
            var serializedMessage = MessageSerializer$1.serialize(message);
            _window.postMessage(serializedMessage, targetOrigin);
        };
        IFrameBridge.prototype._eventHandler = function (event) {
            var message;
            try {
                message = MessageSerializer$1.deserialize(event.data);
            }
            catch (error) {
                return; // Ignore malformed messages, since it probably shouldn't be handled by SDK
            }
            if (!message.id) {
                this.dispatch("error", new Error('Message received without id!'));
                return;
            }
            switch (message.type) {
                case 'response':
                    this._handleResponseMessage(message);
                    return;
                case 'error':
                    this._handleErrorMessage(message);
                    return;
                case 'request':
                    this._handleRequestMessage(message, event.source);
                    return;
                default: this.dispatch("error", new Error("Message received with unknown type \"" + message.type + "\"!"));
            }
        };
        IFrameBridge.prototype._handleResponseMessage = function (message) {
            var id = message.id;
            var payload = message.payload;
            if (!(id in this.pendingMessages)) {
                return;
            }
            var pendingMessage = this.pendingMessages[id];
            var resolve = pendingMessage.resolve;
            var timeoutId = pendingMessage.timeoutId;
            clearTimeout(timeoutId);
            delete this.pendingMessages[id];
            resolve(payload);
        };
        IFrameBridge.prototype._handleErrorMessage = function (message) {
            var id = message.id;
            var error = new Error(message.payload);
            if (!(id in this.pendingMessages)) {
                return;
            }
            var pendingMessage = this.pendingMessages[id];
            var reject = pendingMessage.reject;
            var timeoutId = pendingMessage.timeoutId;
            clearTimeout(timeoutId);
            delete this.pendingMessages[id];
            reject(error);
        };
        IFrameBridge.prototype._handleRequestMessage = function (message, sourceWindow) {
            var _this = this;
            var id = message.id;
            var method = message.method;
            var payload = message.payload;
            var promise = this.dispatch(method, payload);
            Promise.resolve(promise)
                .then(function (res) {
                _this._postMessage(sourceWindow, { id: id, payload: res, version: _this.version, type: 'response' }, '*');
            }).catch(function (error) {
                _this._postMessage(sourceWindow, { id: id, payload: error.message, version: _this.version, type: 'error' }, '*');
            });
        };
        return IFrameBridge;
    }(Bridge));
    function generateId() {
        return ~~(Math.random() * (1 << 30));
    }

    var NullBridge = /** @class */ (function (_super) {
        __extends(NullBridge, _super);
        function NullBridge() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        NullBridge.prototype.setup = function (params) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    // Do nothing...
                    this.ready = false;
                    return [2 /*return*/, {
                            bridgeConnected: false
                        }];
                });
            });
        };
        NullBridge.prototype.getPlatform = function () {
            return null;
        };
        NullBridge.prototype.send = function (_method, _payload, _timeout) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    throw new Error("App has no bridge to Layers " + _method);
                });
            });
        };
        NullBridge.prototype.download = function (data) {
            return __awaiter(this, void 0, void 0, function () {
                var url, filename, link;
                return __generator(this, function (_a) {
                    url = data.url, filename = data.filename;
                    link = document.createElement("a");
                    link.download = filename;
                    link.href = url;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    return [2 /*return*/];
                });
            });
        };
        return NullBridge;
    }(Bridge));

    var AndroidBridge = /** @class */ (function (_super) {
        __extends(AndroidBridge, _super);
        function AndroidBridge() {
            var _this = _super.call(this) || this;
            _this.pendingMessages = {};
            _this.version = "3.0.12";
            _this._bindedEventHandler = _this._eventHandler.bind(_this);
            window.addEventListener('layers:android', _this._bindedEventHandler, false);
            return _this;
        }
        AndroidBridge.prototype.getPlatform = function () {
            return "android";
        };
        AndroidBridge.prototype.destroy = function () {
            if (this._bindedEventHandler) {
                window.removeEventListener('layers:android', this._bindedEventHandler, false);
                this._bindedEventHandler = null;
            }
            this.ready = false;
        };
        AndroidBridge.prototype.send = function (method, payload, timeout) {
            var _this = this;
            if (timeout === void 0) { timeout = 30000; }
            var promise = new Promise(function (resolve, reject) {
                var id = generateId$1();
                var timeoutId = setTimeout(function () { reject(new Error("Message " + id + " timed out!")); }, timeout);
                _this.pendingMessages[id] = { resolve: resolve, reject: reject, timeoutId: timeoutId };
                var message = {
                    layers: true,
                    id: id,
                    method: method,
                    payload: payload,
                    version: _this.version,
                    type: 'request',
                    success: true
                };
                try {
                    _this._postMessage(message);
                }
                catch (error) {
                    return reject(error);
                }
            });
            return promise;
        };
        AndroidBridge.prototype.dispatch = function (method, payload) {
            if (!this.requestHandlers.has(method))
                return;
            var handler = this.requestHandlers.get(method);
            return handler(payload);
        };
        AndroidBridge.prototype._postMessage = function (message) {
            window.LayersAndroidBridge.send(JSON.stringify(message));
        };
        AndroidBridge.prototype._eventHandler = function (event) {
            var message = event.detail;
            if (!message.id) {
                this.dispatch("error", new Error('Message received without id!'));
                return;
            }
            switch (message.type) {
                case 'response':
                    this._handleResponseMessage(message);
                    return;
                case 'request':
                    this._handleRequestMessage(message);
                    return;
                default: this.dispatch("error", new Error("Message received with unknown type \"" + message.type + "\"!"));
            }
        };
        AndroidBridge.prototype._handleResponseMessage = function (message) {
            var id = message.id;
            var payload = message.payload;
            if (!(id in this.pendingMessages)) {
                return;
            }
            var pendingMessage = this.pendingMessages[id];
            var timeoutId = pendingMessage.timeoutId;
            clearTimeout(timeoutId);
            delete this.pendingMessages[id];
            if (message.success) {
                var resolve = pendingMessage.resolve;
                resolve(payload);
            }
            else {
                var reject = pendingMessage.reject;
                reject(payload);
            }
        };
        AndroidBridge.prototype._handleRequestMessage = function (message) {
            var _this = this;
            var id = message.id;
            var method = message.method;
            var payload = message.payload;
            var promise = this.dispatch(method, payload);
            Promise.resolve(promise)
                .then(function (res) {
                _this._postMessage({ layers: true, id: id, payload: res, version: _this.version, type: 'response', success: true });
            }).catch(function (error) {
                _this._postMessage({ layers: true, id: id, payload: error.message, version: _this.version, type: 'error', success: false });
            });
        };
        return AndroidBridge;
    }(Bridge));
    function generateId$1() {
        return ~~(Math.random() * (1 << 30));
    }

    function createBridge() {
        if (window.LayersAndroidBridge) {
            return new AndroidBridge();
        }
        if (!window.frameElement && window.parent === window) {
            return new NullBridge();
        }
        return new IFrameBridge$1({
            targetOrigin: "*",
            targetWindow: window.parent,
        });
    }

    var _a;
    var SDK_METHOD_SYMBOL = Symbol("IS_SDK_METHOD");
    /**
     * Decorator used to allow methods to be called by SDK users
     */
    var SdkMethod = function () {
        return function (_target, _propertyKey, descriptor) {
            descriptor.value[SDK_METHOD_SYMBOL] = true;
        };
    };
    var LayersSDKCore = /** @class */ (function () {
        function LayersSDKCore() {
            if (!window) {
                throw new Error('Can not use Layers SDK without "window"');
            }
            this.ready = false;
            this.connected = false;
            this.eventTarget = new EventTarget();
            this.historyWatcher = new HistoryWatcher();
            this.titleWatcher = new TitleWatcher();
        }
        LayersSDKCore.prototype.setup = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                var _this = this;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (this.ready) {
                                throw new Error("LayersSDK already set up!");
                            }
                            this.options = options;
                            this.parentBridge = createBridge();
                            this.parentBridge.addRequestHandler("ping", function () {
                                return "pong";
                            });
                            _a = this;
                            return [4 /*yield*/, this.parentBridge.setup({
                                    options: options,
                                    url: window.location.href,
                                    state: history === null || history === void 0 ? void 0 : history.state,
                                    title: this.titleWatcher.getTitle()
                                })];
                        case 1:
                            _a.setupResult = _b.sent();
                            this.ready = true;
                            this.eventTarget.dispatchEvent(new CustomEvent("ready", {
                                detail: this.setupResult
                            }));
                            if (!this.setupResult.bridgeConnected) {
                                return [2 /*return*/];
                            }
                            this.connected = true;
                            this.eventTarget.dispatchEvent(new CustomEvent("connected", {
                                detail: this.setupResult
                            }));
                            this.historyWatcher.addListener(function (params) {
                                _this.update(params);
                            });
                            this.titleWatcher.addListener(function (title) {
                                _this.update({ title: title });
                            });
                            this.historyWatcher.updateHistory();
                            this.titleWatcher.updateTitle();
                            return [2 /*return*/];
                    }
                });
            });
        };
        LayersSDKCore.prototype.handle = function (methodName, payload) {
            return __awaiter(this, void 0, void 0, function () {
                var method;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            method = this[methodName];
                            if (!method || !method[SDK_METHOD_SYMBOL]) {
                                throw new Error("Method " + methodName + " not found.");
                            }
                            return [4 /*yield*/, method.bind(this)(payload)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        LayersSDKCore.prototype.onReady = function (callback) {
            if (this.ready) {
                callback(this.setupResult);
                return;
            }
            this.eventTarget.addEventListener("ready", function (event) {
                callback(event.detail);
            });
        };
        LayersSDKCore.prototype.onConnected = function (callback) {
            if (this.connected) {
                callback(this.setupResult);
                return;
            }
            this.eventTarget.addEventListener("connected", function (event) {
                callback(event.detail);
            });
        };
        LayersSDKCore.prototype.ping = function () {
            return this.parentBridge.send('ping');
        };
        LayersSDKCore.prototype.update = function (params) {
            if (this.parentBridge.ready) {
                this.parentBridge.send("update", params);
            }
        };
        LayersSDKCore.prototype.download = function (data) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.parentBridge.download(data)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        LayersSDKCore.prototype.createPost = function (data) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.parentBridge.send('createPost', data)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        LayersSDKCore.prototype.close = function (payload) {
            try {
                this.parentBridge.send('close', payload);
            }
            catch (e) { }
            try {
                window.close();
            }
            catch (e) { }
        };
        LayersSDKCore.prototype.createGroup = function (data) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.parentBridge.send('createGroup', data)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        __decorate([
            SdkMethod()
        ], LayersSDKCore.prototype, "setup", null);
        __decorate([
            SdkMethod()
        ], LayersSDKCore.prototype, "onReady", null);
        __decorate([
            SdkMethod()
        ], LayersSDKCore.prototype, "onConnected", null);
        __decorate([
            SdkMethod()
        ], LayersSDKCore.prototype, "ping", null);
        __decorate([
            SdkMethod()
        ], LayersSDKCore.prototype, "update", null);
        __decorate([
            SdkMethod()
        ], LayersSDKCore.prototype, "download", null);
        __decorate([
            SdkMethod()
        ], LayersSDKCore.prototype, "createPost", null);
        __decorate([
            SdkMethod()
        ], LayersSDKCore.prototype, "close", null);
        __decorate([
            SdkMethod()
        ], LayersSDKCore.prototype, "createGroup", null);
        return LayersSDKCore;
    }());
    // Get commands queued before SDK was loaded
    var commandQueue = (_a = window.Layers) === null || _a === void 0 ? void 0 : _a.q;
    var sdkCore = new LayersSDKCore();
    if (window.LayersOptions) {
        sdkCore.setup(window.LayersOptions);
    }
    // Expose "Layers" globally
    window.Layers = function (method, payload) {
        return sdkCore.handle(method, payload);
    };
    // Consume queued commands now that SDK is ready
    if (commandQueue) {
        for (var _i = 0, commandQueue_1 = commandQueue; _i < commandQueue_1.length; _i++) {
            var command = commandQueue_1[_i];
            var resolve = command[0], reject = command[1], method = command[2], payload = command[3];
            sdkCore.handle(method, payload)
                .then(resolve)
                .catch(reject);
        }
    }

    exports.LayersSDKCore = LayersSDKCore;
    exports.SdkMethod = SdkMethod;

    return exports;

}({}));
//# sourceMappingURL=app.js.map
