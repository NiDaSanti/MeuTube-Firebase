!function() {
    "use strict";
    function addClass(el, newClassName) {
        el.className += " " + newClassName;
    }
    function removeClass(el, removeClassName) {
        var elClass = el.className;
        while (-1 != elClass.indexOf(removeClassName)) {
            elClass = elClass.replace(removeClassName, "");
            elClass = elClass.trim();
        }
        el.className = elClass;
    }
    function isMobile() {
        return navigator.userAgent.match(/(iPad|iPhone|iPod|android|Android)/g) ? true : false;
    }
    var currentScript;
    var Kloudless;
    if (document.currentScript) currentScript = document.currentScript; else {
        var scripts = document.getElementsByTagName("script");
        currentScript = scripts[scripts.length - 1];
    }
    var kObjName = currentScript.getAttribute("data-kloudless-object") || "Kloudless";
    if (void 0 === window[kObjName]) window[kObjName] = {};
    Kloudless = window[kObjName];
    Kloudless.explorerUrl = "http://localhost:3000/file-explorer";
    if (-1 === Kloudless.explorerUrl.indexOf("://")) Kloudless.explorerUrl = window.location.protocol + "//" + window.location.host + Kloudless.explorerUrl;
    Kloudless._frames = {};
    Kloudless._explorers = {};
    Kloudless._queuedAction = {};
    var frames = Kloudless._frames;
    var explorers = Kloudless._explorers;
    var queuedAction = Kloudless._queuedAction;
    var backdropDiv = null;
    var bodyOverflow = null;
    var style = document.createElement("style");
    var loaderCSS = "iframe.kloudless-modal,iframe.kloudless-modal-dropzone{display:block;box-sizing:border-box;position:fixed;top:50%;left:50%;width:700px;height:515px;margin-top:-250px;margin-left:-350px;border:solid 0 #666;border-radius:2px;box-shadow:0 0 10px rgba(0,0,0,0.4);transition:all 0;-webkit-transition:all 0;z-index:9999;}@media only screen and (max-width:750px),only screen and (max-device-width:750px){iframe.kloudless-modal,iframe.kloudless-modal-dropzone{width:1px;min-width:100%;height:100%;margin:0;top:0;left:0}iframe.kloudless-modal html,iframe.kloudless-modal-dropzone html,iframe.kloudless-modal body,iframe.kloudless-modal-dropzone body{overflow:hidden}}iframe.kloudless-modal-dropzone{position:relative;top:0;left:0;margin-top:0;margin-left:0}.backdrop_div{position:fixed;margin:0;top:0;left:0;padding:0;width:100%;height:100%;display:none;background-color:rgba(0,0,0,0.6);z-index:9998;opacity:.5}";
    style.type = "text/css";
    if (style.styleSheet) style.styleSheet.cssText = loaderCSS; else style.appendChild(document.createTextNode(loaderCSS));
    document.getElementsByTagName("head")[0].appendChild(style);
    !function() {
        function getDomainFromUrl(url) {
            var pathParts = url.split("://", 2);
            return pathParts[0] + "://" + pathParts[1].split("/")[0];
        }
        window.addEventListener("message", function(message) {
            var matchedOrigin;
            for (var id in Kloudless._explorers) if (Kloudless._explorers[id].explorer_url && getDomainFromUrl(Kloudless._explorers[id].explorer_url) === message.origin) {
                matchedOrigin = true;
                break;
            }
            if (!matchedOrigin) return;
            var contents;
            try {
                contents = JSON.parse(message.data);
            } catch (e) {
                return;
            }
            var exp_id = contents.exp_id;
            var explorer;
            explorer = Kloudless._explorers[exp_id];
            if (explorer) explorer._fire.apply(explorer, [ contents.action, contents.data ]);
        });
    }();
    var CDN = {
        experimental: "https://kloudless.blackboardcdn.fozzie.bbsaas.io/explorer/explorer.html",
        dev: "https://kloudless.blackboardcdn.animal.bbsaas.io/explorer/explorer.html",
        stage: "https://kloudless.blackboardcdn.kermit.bbsaas.io/explorer/explorer.html",
        prod: "https://kloudless.blackboardcdn.com/explorer/explorer.html",
        local: Kloudless.explorerUrl
    };
    var getExplorerUrl = function(options) {
        if (options.use_local_explorer) return CDN.local;
        if (options.use_loader_explorer) if (currentScript && currentScript.src) {
            var urlParts = currentScript.src.split("/");
            var baseIndex = urlParts.indexOf("loader");
            if (baseIndex > 0) {
                var explorerUrl = urlParts.slice(0, baseIndex).join("/") + "/explorer/explorer.html";
                return explorerUrl;
            } else console.log("ERROR: nonstandard currentScript url.  Cannot use loader explorer");
        } else console.log("ERROR: no currentScript url.  Cannot use loader explorer");
        if (options && options.base_url) if (options.base_url.indexOf("fozzie") > 1) return CDN.experimental; else if (options.base_url.indexOf("animal") > 1 || options.base_url.indexOf("test") > 1) return CDN.dev; else if (options.base_url.indexOf("elmo") > 1 || options.base_url.indexOf("stage") > 1) return CDN.stage;
        return CDN.prod;
    };
    var initialise_frame = function(options, elementId) {
        var exp_id = Math.floor(Math.random() * Math.pow(10, 12));
        var frame = document.createElement("iframe");
        if (isMobile()) frame.setAttribute("scrolling", "no");
        frame.setAttribute("class", "kloudless-modal");
        frame.setAttribute("title", options.iframe_title || "explorer");
        var frameSrc = options.explorer_url + "?app_id=" + options.app_id + "&exp_id=" + exp_id + "&flavor=" + options.flavor + "&origin=" + encodeURIComponent(window.location.protocol + "//" + window.location.host) + "&custom_css=" + encodeURIComponent(options.custom_css) + "&multiselect=" + options.multiselect + "&link=" + options.link + "&computer=" + options.computer + "&copy_to_upload_location=" + options.copy_to_upload_location + "&upload_location_uri=" + options.upload_location_uri + "&services=" + (options.services ? JSON.stringify(options.services) : "") + "&persist=" + JSON.stringify(options.persist) + "&account_key=" + options.account_key + "&create_folder=" + options.create_folder + "&types=" + JSON.stringify(options.types) + "&inst_prov_type=" + options.inst_prov_type + "&inst_domain=" + options.inst_domain;
        if (options.base_url) frameSrc = frameSrc + "&base_url=" + encodeURIComponent(options.base_url);
        frame.setAttribute("src", frameSrc);
        frame.style.display = "none";
        frames[exp_id] = frame;
        var body = document.getElementsByTagName("body")[0];
        if (elementId) {
            document.getElementById(elementId).appendChild(frame);
        } else body.appendChild(frame);
        if (!backdropDiv) {
            var div = document.createElement("div");
            backdropDiv = body.appendChild(div);
            addClass(backdropDiv, "backdrop_div");
        }
        return exp_id;
    };
    Kloudless._fileWidget = function(options) {
        this._setOptions(options);
        this.handlers = {};
        this.defaultHandlers = {};
    };
    Kloudless._fileWidget.prototype._setOptions = function(options) {
        options = options || {};
        if (!options.app_id) throw new Error("You need to specify an app ID.");
        this.options = options;
        this.app_id = options.app_id;
        this.exp_id = options.exp_id;
        this.custom_css = options.custom_css ? options.custom_css : false;
        this.elementId = options.elementId;
        this.flavor = void 0 === options.flavor ? "chooser" : options.flavor;
        this.multiselect = void 0 === options.multiselect ? false : options.multiselect;
        this.link = void 0 === options.link ? true : options.link;
        this.computer = void 0 === options.computer ? false : options.computer;
        this.copy_to_upload_location = void 0 === options.copy_to_upload_location ? null : options.copy_to_upload_location;
        this.upload_location_uri = window.encodeURIComponent(options.upload_location_uri || "");
        this.create_folder = void 0 === options.create_folder ? true : options.create_folder;
        this.account_key = void 0 === options.account_key ? false : options.account_key;
        this.persist = void 0 === options.persist ? "local" : options.persist;
        this.display_backdrop = void 0 === options.display_backdrop ? false : options.display_backdrop;
        this.services = options.services || null;
        this.files = options.files || [];
        this.types = options.types || [];
        this.inst_prov_type = void 0 === options.inst_prov_type ? "disabled" : options.inst_prov_type;
        this.inst_domain = void 0 === options.inst_domain ? "" : options.inst_domain;
        if (!(this.files instanceof Array)) this.files = [];
        if (!(this.types instanceof Array)) this.types = [ this.types ];
        this.types = this.types.map(function(type) {
            return type.substr(type.lastIndexOf(".") + 1);
        });
        if (!this.options.link_options) this.options.link_options = {};
        if (void 0 !== options.direct_link && void 0 === this.options.link_options.direct) this.options.link_options.direct = options.direct_link;
        this.base_url = options.base_url;
        return this;
    };
    Kloudless._fileWidget.prototype.on = function(event, handler) {
        if (void 0 === this.handlers[event]) this.handlers[event] = [];
        this.handlers[event].push(handler);
        return this;
    };
    Kloudless._fileWidget.prototype._fire = function(event, data) {
        var self = this;
        if (-1 != [ "success", "cancel" ].indexOf(event)) self.close();
        var defaultHandler = self.defaultHandlers[event];
        if (defaultHandler) window.setTimeout(function() {
            defaultHandler.call(self, data);
        }, 0);
        if (void 0 !== self.handlers[event]) for (var i = 0; i < self.handlers[event].length; i++) !function(handler) {
            window.setTimeout(function() {
                handler.call(self, data);
            }, 0);
        }(self.handlers[event][i]);
        return self;
    };
    Kloudless.explorer = function(options) {
        var exp = new Kloudless._explorer(options);
        exp.on("load", function() {
            exp.message("INIT", {
                options: options
            });
            exp.loaded = true;
            if (queuedAction[exp.exp_id]) {
                var method = queuedAction[exp.exp_id].method;
                var args = queuedAction[exp.exp_id].args;
                delete queuedAction[exp.exp_id];
                method.apply(exp, args);
            }
        });
        exp.explorer_url = getExplorerUrl({
            use_local_explorer: options.use_local_explorer,
            use_loader_explorer: options.use_loader_explorer,
            base_url: exp.base_url
        });
        var id = initialise_frame({
            app_id: exp.app_id,
            exp_id: exp.exp_id,
            flavor: exp.flavor,
            custom_css: exp.custom_css,
            multiselect: exp.multiselect,
            link: exp.link,
            computer: exp.computer,
            copy_to_upload_location: exp.copy_to_upload_location,
            upload_location_uri: exp.upload_location_uri,
            account_key: exp.account_key,
            services: exp.services,
            persist: exp.persist,
            types: exp.types,
            inst_prov_type: exp.inst_prov_type,
            inst_domain: exp.inst_domain,
            create_folder: exp.create_folder,
            base_url: exp.base_url,
            iframe_title: exp.options.iframe_title,
            explorer_url: exp.explorer_url
        }, exp.elementId);
        exp.exp_id = id;
        exp.defaultHandlers.close = function() {
            var frame = frames[exp.exp_id];
            FX.fadeOut(frame, {
                duration: 200,
                complete: function() {
                    frame.style.display = "none";
                }
            });
        };
        explorers[exp.exp_id] = exp;
        return exp;
    };
    Kloudless._explorer = function(options) {
        Kloudless._fileWidget.call(this, options);
    };
    Kloudless._explorer.prototype = Object.create(Kloudless._fileWidget.prototype);
    Kloudless._explorer.prototype.constructor = Kloudless._explorer;
    Object.defineProperty(Kloudless._explorer.prototype, "constructor", {
        enumerable: false,
        value: Kloudless._explorer
    });
    Kloudless._explorer.prototype.message = function(action, data) {
        var self = this;
        frames[self.exp_id].contentWindow.postMessage(JSON.stringify({
            action: action,
            data: data
        }), Kloudless._explorers[self.exp_id].explorer_url);
    };
    Kloudless._explorer.prototype.update = function(opts) {
        this.message("DATA", {
            options: opts
        });
        var optsKeys = Object.keys(opts);
        for (var i = 0; i < optsKeys.length; i++) {
            var key = optsKeys[i];
            this.options[key] = opts[key];
        }
    };
    Kloudless._explorer.prototype.choose = function() {
        var self = this;
        if (!self.loaded) {
            queuedAction[self.exp_id] = {
                method: self.choose
            };
            return;
        }
        self._open({
            flavor: "chooser"
        });
        return self;
    };
    Kloudless._explorer.prototype.save = function(files) {
        var self = this;
        if (!self.loaded) {
            queuedAction[self.exp_id] = {
                method: self.save,
                args: [ files ]
            };
            return;
        }
        if (!(files instanceof Array)) files = [];
        files = self.files.concat(files);
        if (files.length < 1) {
            console.log("ERROR: No files to save");
            return;
        }
        self._open({
            flavor: "saver",
            files: files
        });
        return self;
    };
    Kloudless._explorer.prototype._open = function(data) {
        var self = this;
        var body = document.getElementsByTagName("body")[0];
        data.options = this.options;
        self.message("DATA", data);
        Kloudless._fileWidget.lastScrollTop = body.scrollTop;
        if (isMobile()) body.scrollTop = 0;
        frames[self.exp_id].style.display = "block";
        frames[self.exp_id].style.opacity = 0;
        addClass(body, "kfe-active");
        FX.fadeIn(frames[self.exp_id], {
            duration: 200,
            complete: function() {
                frames[self.exp_id].style.display = "block";
            }
        });
        if (self.display_backdrop) {
            backdropDiv.style.display = "block";
            bodyOverflow = body.style.overflow;
            body.style.overflow = "hidden";
        }
        self._fire("open");
        self.message("OPEN");
        return self;
    };
    Kloudless._explorer.prototype.close = function() {
        var self = this;
        var body = document.getElementsByTagName("body")[0];
        if (!self.loaded) {
            queuedAction[self.exp_id] = {
                method: self.close
            };
            return;
        }
        self.message("CLOSING");
        removeClass(body, "kfe-active");
        var lastScrollTop = Kloudless._fileWidget.lastScrollTop;
        if ("undefined" != typeof lastScrollTop) if (isMobile) body.scrollTop = lastScrollTop;
        if (self.display_backdrop) {
            backdropDiv.style.display = "none";
            body.style.overflow = bodyOverflow;
        }
        self._fire("close");
    };
    Kloudless._explorer.prototype.choosify = function(element) {
        var self = this;
        if (element instanceof Array) for (var i = 0; i < element.length; i++) {
            var el = element[i];
            el.addEventListener("click", function() {
                self.choose();
            });
        } else if (void 0 !== window.jQuery && element instanceof window.jQuery) for (var i = 0; i < element.length; i++) {
            var el = element.get(i);
            el.addEventListener("click", function() {
                self.choose();
            });
        } else element.addEventListener("click", function() {
            self.choose();
        });
        return this;
    };
    Kloudless._explorer.prototype.savify = function(element, files) {
        var self = this;
        if (element instanceof Array) for (var i = 0; i < element.length; i++) el.addEventListener("click", function() {
            self.save(files);
        }); else if (void 0 !== window.jQuery && element instanceof window.jQuery) for (var i = 0; i < element.length; i++) {
            var el = element.get(i);
            el.addEventListener("click", function() {
                self.save(files);
            });
        } else element.addEventListener("click", function() {
            self.save(files);
        });
        return this;
    };
    Kloudless.dropzone = function(options) {
        return new Kloudless._dropzone(options);
    };
    Kloudless._dropzone = function(options) {
        options = options || {};
        this.elementId = options.elementId;
        delete options.elementId;
        if (!this.elementId) throw new Error("Please specify the elementId for the dropzone to be bound to.");
        this.dropExplorer = Kloudless.explorer({
            app_id: options.app_id,
            flavor: "dropzone",
            multiselect: options.multiselect,
            elementId: this.elementId,
            iframe_title: options.iframe_title
        });
        this.clickExplorer = Kloudless.explorer(options);
        this.dropExplorerFrame = frames[this.dropExplorer.exp_id];
        this.clickExplorerFrame = frames[this.clickExplorer.exp_id];
        this._configureFrame();
    };
    Kloudless._dropzone.prototype._configureFrame = function() {
        var element = document.getElementById(this.elementId);
        var frame = this.dropExplorerFrame;
        var dropExp = this.dropExplorer;
        var clickExp = this.clickExplorer;
        dropExp.defaultHandlers.close = function() {
            frame.style.opacity = "1";
        };
        frame.style.display = "block";
        frame.style.opacity = "1";
        frame.style.height = "100%";
        frame.style.width = "100%";
        frame.setAttribute("class", "kloudless-modal-dropzone");
        frame.onload = function() {
            dropExp.on("dropzoneClicked", function() {
                clickExp._open({
                    flavor: "chooser"
                });
            });
            dropExp.on("drop", function(data) {
                element.style.width = "700px";
                element.style.height = "515px";
                element.style["border-style"] = "none";
                frame.style.opacity = "1";
            });
            var style = window.getComputedStyle(element);
            var height = style.height;
            var width = style.width;
            var borderStyle = style["border-style"];
            dropExp.on("close", function() {
                element.style.height = height;
                element.style.width = width;
                element.style["border-style"] = borderStyle;
                dropExp._open({
                    flavor: "dropzone"
                });
            });
        };
        return frame;
    };
    Kloudless._dropzone.prototype.on = function(event, handler) {
        this.dropExplorer.on(event, handler);
        this.clickExplorer.on(event, handler);
        return this;
    };
    Kloudless._dropzone.prototype.close = function() {
        this.dropExplorer.close();
        this.clickExplorer.close();
    };
    Kloudless._dropzone.prototype.update = function(opts) {
        this.dropExplorer.update(opts);
        this.clickExplorer.update(opts);
    };
    var FX = {
        easing: {
            linear: function(progress) {
                return progress;
            },
            quadratic: function(progress) {
                return Math.pow(progress, 2);
            }
        },
        animate: function(options) {
            var start = new Date();
            var id = setInterval(function() {
                var timePassed = new Date() - start;
                var progress = timePassed / options.duration;
                if (progress > 1) progress = 1;
                options.progress = progress;
                var delta = options.delta(progress);
                options.step(delta);
                if (1 == progress) {
                    clearInterval(id);
                    if ("undefined" != typeof options.complete) options.complete();
                }
            }, options.delay || 10);
        },
        fadeOut: function(element, options) {
            this.animate({
                duration: options.duration,
                delta: function(progress) {
                    progress = this.progress;
                    return FX.easing.quadratic(progress);
                },
                complete: options.complete,
                step: function(delta) {
                    element.style.opacity = 1 - delta;
                }
            });
        },
        fadeIn: function(element, options) {
            this.animate({
                duration: options.duration,
                delta: function(progress) {
                    progress = this.progress;
                    return FX.easing.quadratic(progress);
                },
                complete: options.complete,
                step: function(delta) {
                    element.style.opacity = 0 + delta;
                }
            });
        }
    };
}();

!function() {
    "use strict";
    if (!window.Event.prototype.preventDefault) window.Event.prototype.preventDefault = function() {
        this.returnValue = false;
    };
    if (!Element.prototype.addEventListener) {
        var eventListeners = [];
        var addEventListener = function(type, listener) {
            var self = this;
            var wrapper = function(e) {
                e.target = e.srcElement;
                e.currentTarget = self;
                if (listener.handleEvent) listener.handleEvent(e); else listener.call(self, e);
            };
            this.attachEvent("on" + type, wrapper);
            eventListeners.push({
                object: this,
                type: type,
                listener: listener,
                wrapper: wrapper
            });
        };
        var removeEventListener = function(type, listener) {
            var counter = 0;
            while (counter < eventListeners.length) {
                var eventListener = eventListeners[counter];
                if (eventListener.object == this && eventListener.type == type && eventListener.listener == listener) {
                    this.detachEvent("on" + type, eventListener.wrapper);
                    break;
                }
                ++counter;
            }
        };
        Element.prototype.addEventListener = addEventListener;
        Element.prototype.removeEventListener = removeEventListener;
        if (window.HTMLDocument) {
            window.HTMLDocument.prototype.addEventListener = addEventListener;
            window.HTMLDocument.prototype.removeEventListener = removeEventListener;
        }
        if (window.Window) {
            window.Window.prototype.addEventListener = addEventListener;
            window.Window.prototype.removeEventListener = removeEventListener;
        }
    }
    window.console = window.console || {
        log: function() {}
    };
}();