(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined")
      return require.apply(this, arguments);
    throw new Error('Dynamic require of "' + x + '" is not supported');
  });
  var __commonJS = (cb, mod) => function __require2() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __reExport = (target, module, copyDefault, desc) => {
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
          __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
    }
    return target;
  };
  var __toESM = (module, isNodeMode) => {
    return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", !isNodeMode && module && module.__esModule ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
  };

  // node_modules/@rails/ujs/lib/assets/compiled/rails-ujs.js
  var require_rails_ujs = __commonJS({
    "node_modules/@rails/ujs/lib/assets/compiled/rails-ujs.js"(exports, module) {
      (function() {
        var context = this;
        (function() {
          (function() {
            this.Rails = {
              linkClickSelector: "a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]",
              buttonClickSelector: {
                selector: "button[data-remote]:not([form]), button[data-confirm]:not([form])",
                exclude: "form button"
              },
              inputChangeSelector: "select[data-remote], input[data-remote], textarea[data-remote]",
              formSubmitSelector: "form:not([data-turbo=true])",
              formInputClickSelector: "form:not([data-turbo=true]) input[type=submit], form:not([data-turbo=true]) input[type=image], form:not([data-turbo=true]) button[type=submit], form:not([data-turbo=true]) button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])",
              formDisableSelector: "input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled",
              formEnableSelector: "input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled",
              fileInputSelector: "input[name][type=file]:not([disabled])",
              linkDisableSelector: "a[data-disable-with], a[data-disable]",
              buttonDisableSelector: "button[data-remote][data-disable-with], button[data-remote][data-disable]"
            };
          }).call(this);
        }).call(context);
        var Rails2 = context.Rails;
        (function() {
          (function() {
            var nonce;
            nonce = null;
            Rails2.loadCSPNonce = function() {
              var ref;
              return nonce = (ref = document.querySelector("meta[name=csp-nonce]")) != null ? ref.content : void 0;
            };
            Rails2.cspNonce = function() {
              return nonce != null ? nonce : Rails2.loadCSPNonce();
            };
          }).call(this);
          (function() {
            var expando, m;
            m = Element.prototype.matches || Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector;
            Rails2.matches = function(element, selector) {
              if (selector.exclude != null) {
                return m.call(element, selector.selector) && !m.call(element, selector.exclude);
              } else {
                return m.call(element, selector);
              }
            };
            expando = "_ujsData";
            Rails2.getData = function(element, key) {
              var ref;
              return (ref = element[expando]) != null ? ref[key] : void 0;
            };
            Rails2.setData = function(element, key, value) {
              if (element[expando] == null) {
                element[expando] = {};
              }
              return element[expando][key] = value;
            };
            Rails2.$ = function(selector) {
              return Array.prototype.slice.call(document.querySelectorAll(selector));
            };
          }).call(this);
          (function() {
            var $5, csrfParam, csrfToken;
            $5 = Rails2.$;
            csrfToken = Rails2.csrfToken = function() {
              var meta;
              meta = document.querySelector("meta[name=csrf-token]");
              return meta && meta.content;
            };
            csrfParam = Rails2.csrfParam = function() {
              var meta;
              meta = document.querySelector("meta[name=csrf-param]");
              return meta && meta.content;
            };
            Rails2.CSRFProtection = function(xhr) {
              var token;
              token = csrfToken();
              if (token != null) {
                return xhr.setRequestHeader("X-CSRF-Token", token);
              }
            };
            Rails2.refreshCSRFTokens = function() {
              var param, token;
              token = csrfToken();
              param = csrfParam();
              if (token != null && param != null) {
                return $5('form input[name="' + param + '"]').forEach(function(input) {
                  return input.value = token;
                });
              }
            };
          }).call(this);
          (function() {
            var CustomEvent, fire, matches, preventDefault;
            matches = Rails2.matches;
            CustomEvent = window.CustomEvent;
            if (typeof CustomEvent !== "function") {
              CustomEvent = function(event, params) {
                var evt;
                evt = document.createEvent("CustomEvent");
                evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
                return evt;
              };
              CustomEvent.prototype = window.Event.prototype;
              preventDefault = CustomEvent.prototype.preventDefault;
              CustomEvent.prototype.preventDefault = function() {
                var result;
                result = preventDefault.call(this);
                if (this.cancelable && !this.defaultPrevented) {
                  Object.defineProperty(this, "defaultPrevented", {
                    get: function() {
                      return true;
                    }
                  });
                }
                return result;
              };
            }
            fire = Rails2.fire = function(obj, name, data) {
              var event;
              event = new CustomEvent(name, {
                bubbles: true,
                cancelable: true,
                detail: data
              });
              obj.dispatchEvent(event);
              return !event.defaultPrevented;
            };
            Rails2.stopEverything = function(e) {
              fire(e.target, "ujs:everythingStopped");
              e.preventDefault();
              e.stopPropagation();
              return e.stopImmediatePropagation();
            };
            Rails2.delegate = function(element, selector, eventType, handler) {
              return element.addEventListener(eventType, function(e) {
                var target;
                target = e.target;
                while (!(!(target instanceof Element) || matches(target, selector))) {
                  target = target.parentNode;
                }
                if (target instanceof Element && handler.call(target, e) === false) {
                  e.preventDefault();
                  return e.stopPropagation();
                }
              });
            };
          }).call(this);
          (function() {
            var AcceptHeaders, CSRFProtection, createXHR, cspNonce, fire, prepareOptions, processResponse;
            cspNonce = Rails2.cspNonce, CSRFProtection = Rails2.CSRFProtection, fire = Rails2.fire;
            AcceptHeaders = {
              "*": "*/*",
              text: "text/plain",
              html: "text/html",
              xml: "application/xml, text/xml",
              json: "application/json, text/javascript",
              script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
            };
            Rails2.ajax = function(options) {
              var xhr;
              options = prepareOptions(options);
              xhr = createXHR(options, function() {
                var ref, response;
                response = processResponse((ref = xhr.response) != null ? ref : xhr.responseText, xhr.getResponseHeader("Content-Type"));
                if (Math.floor(xhr.status / 100) === 2) {
                  if (typeof options.success === "function") {
                    options.success(response, xhr.statusText, xhr);
                  }
                } else {
                  if (typeof options.error === "function") {
                    options.error(response, xhr.statusText, xhr);
                  }
                }
                return typeof options.complete === "function" ? options.complete(xhr, xhr.statusText) : void 0;
              });
              if (options.beforeSend != null && !options.beforeSend(xhr, options)) {
                return false;
              }
              if (xhr.readyState === XMLHttpRequest.OPENED) {
                return xhr.send(options.data);
              }
            };
            prepareOptions = function(options) {
              options.url = options.url || location.href;
              options.type = options.type.toUpperCase();
              if (options.type === "GET" && options.data) {
                if (options.url.indexOf("?") < 0) {
                  options.url += "?" + options.data;
                } else {
                  options.url += "&" + options.data;
                }
              }
              if (AcceptHeaders[options.dataType] == null) {
                options.dataType = "*";
              }
              options.accept = AcceptHeaders[options.dataType];
              if (options.dataType !== "*") {
                options.accept += ", */*; q=0.01";
              }
              return options;
            };
            createXHR = function(options, done) {
              var xhr;
              xhr = new XMLHttpRequest();
              xhr.open(options.type, options.url, true);
              xhr.setRequestHeader("Accept", options.accept);
              if (typeof options.data === "string") {
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
              }
              if (!options.crossDomain) {
                xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                CSRFProtection(xhr);
              }
              xhr.withCredentials = !!options.withCredentials;
              xhr.onreadystatechange = function() {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                  return done(xhr);
                }
              };
              return xhr;
            };
            processResponse = function(response, type) {
              var parser, script;
              if (typeof response === "string" && typeof type === "string") {
                if (type.match(/\bjson\b/)) {
                  try {
                    response = JSON.parse(response);
                  } catch (error) {
                  }
                } else if (type.match(/\b(?:java|ecma)script\b/)) {
                  script = document.createElement("script");
                  script.setAttribute("nonce", cspNonce());
                  script.text = response;
                  document.head.appendChild(script).parentNode.removeChild(script);
                } else if (type.match(/\b(xml|html|svg)\b/)) {
                  parser = new DOMParser();
                  type = type.replace(/;.+/, "");
                  try {
                    response = parser.parseFromString(response, type);
                  } catch (error) {
                  }
                }
              }
              return response;
            };
            Rails2.href = function(element) {
              return element.href;
            };
            Rails2.isCrossDomain = function(url) {
              var e, originAnchor, urlAnchor;
              originAnchor = document.createElement("a");
              originAnchor.href = location.href;
              urlAnchor = document.createElement("a");
              try {
                urlAnchor.href = url;
                return !((!urlAnchor.protocol || urlAnchor.protocol === ":") && !urlAnchor.host || originAnchor.protocol + "//" + originAnchor.host === urlAnchor.protocol + "//" + urlAnchor.host);
              } catch (error) {
                e = error;
                return true;
              }
            };
          }).call(this);
          (function() {
            var matches, toArray;
            matches = Rails2.matches;
            toArray = function(e) {
              return Array.prototype.slice.call(e);
            };
            Rails2.serializeElement = function(element, additionalParam) {
              var inputs, params;
              inputs = [element];
              if (matches(element, "form")) {
                inputs = toArray(element.elements);
              }
              params = [];
              inputs.forEach(function(input) {
                if (!input.name || input.disabled) {
                  return;
                }
                if (matches(input, "fieldset[disabled] *")) {
                  return;
                }
                if (matches(input, "select")) {
                  return toArray(input.options).forEach(function(option) {
                    if (option.selected) {
                      return params.push({
                        name: input.name,
                        value: option.value
                      });
                    }
                  });
                } else if (input.checked || ["radio", "checkbox", "submit"].indexOf(input.type) === -1) {
                  return params.push({
                    name: input.name,
                    value: input.value
                  });
                }
              });
              if (additionalParam) {
                params.push(additionalParam);
              }
              return params.map(function(param) {
                if (param.name != null) {
                  return encodeURIComponent(param.name) + "=" + encodeURIComponent(param.value);
                } else {
                  return param;
                }
              }).join("&");
            };
            Rails2.formElements = function(form, selector) {
              if (matches(form, "form")) {
                return toArray(form.elements).filter(function(el) {
                  return matches(el, selector);
                });
              } else {
                return toArray(form.querySelectorAll(selector));
              }
            };
          }).call(this);
          (function() {
            var allowAction, fire, stopEverything;
            fire = Rails2.fire, stopEverything = Rails2.stopEverything;
            Rails2.handleConfirm = function(e) {
              if (!allowAction(this)) {
                return stopEverything(e);
              }
            };
            Rails2.confirm = function(message, element) {
              return confirm(message);
            };
            allowAction = function(element) {
              var answer, callback, message;
              message = element.getAttribute("data-confirm");
              if (!message) {
                return true;
              }
              answer = false;
              if (fire(element, "confirm")) {
                try {
                  answer = Rails2.confirm(message, element);
                } catch (error) {
                }
                callback = fire(element, "confirm:complete", [answer]);
              }
              return answer && callback;
            };
          }).call(this);
          (function() {
            var disableFormElement, disableFormElements, disableLinkElement, enableFormElement, enableFormElements, enableLinkElement, formElements, getData, isXhrRedirect, matches, setData, stopEverything;
            matches = Rails2.matches, getData = Rails2.getData, setData = Rails2.setData, stopEverything = Rails2.stopEverything, formElements = Rails2.formElements;
            Rails2.handleDisabledElement = function(e) {
              var element;
              element = this;
              if (element.disabled) {
                return stopEverything(e);
              }
            };
            Rails2.enableElement = function(e) {
              var element;
              if (e instanceof Event) {
                if (isXhrRedirect(e)) {
                  return;
                }
                element = e.target;
              } else {
                element = e;
              }
              if (matches(element, Rails2.linkDisableSelector)) {
                return enableLinkElement(element);
              } else if (matches(element, Rails2.buttonDisableSelector) || matches(element, Rails2.formEnableSelector)) {
                return enableFormElement(element);
              } else if (matches(element, Rails2.formSubmitSelector)) {
                return enableFormElements(element);
              }
            };
            Rails2.disableElement = function(e) {
              var element;
              element = e instanceof Event ? e.target : e;
              if (matches(element, Rails2.linkDisableSelector)) {
                return disableLinkElement(element);
              } else if (matches(element, Rails2.buttonDisableSelector) || matches(element, Rails2.formDisableSelector)) {
                return disableFormElement(element);
              } else if (matches(element, Rails2.formSubmitSelector)) {
                return disableFormElements(element);
              }
            };
            disableLinkElement = function(element) {
              var replacement;
              if (getData(element, "ujs:disabled")) {
                return;
              }
              replacement = element.getAttribute("data-disable-with");
              if (replacement != null) {
                setData(element, "ujs:enable-with", element.innerHTML);
                element.innerHTML = replacement;
              }
              element.addEventListener("click", stopEverything);
              return setData(element, "ujs:disabled", true);
            };
            enableLinkElement = function(element) {
              var originalText;
              originalText = getData(element, "ujs:enable-with");
              if (originalText != null) {
                element.innerHTML = originalText;
                setData(element, "ujs:enable-with", null);
              }
              element.removeEventListener("click", stopEverything);
              return setData(element, "ujs:disabled", null);
            };
            disableFormElements = function(form) {
              return formElements(form, Rails2.formDisableSelector).forEach(disableFormElement);
            };
            disableFormElement = function(element) {
              var replacement;
              if (getData(element, "ujs:disabled")) {
                return;
              }
              replacement = element.getAttribute("data-disable-with");
              if (replacement != null) {
                if (matches(element, "button")) {
                  setData(element, "ujs:enable-with", element.innerHTML);
                  element.innerHTML = replacement;
                } else {
                  setData(element, "ujs:enable-with", element.value);
                  element.value = replacement;
                }
              }
              element.disabled = true;
              return setData(element, "ujs:disabled", true);
            };
            enableFormElements = function(form) {
              return formElements(form, Rails2.formEnableSelector).forEach(enableFormElement);
            };
            enableFormElement = function(element) {
              var originalText;
              originalText = getData(element, "ujs:enable-with");
              if (originalText != null) {
                if (matches(element, "button")) {
                  element.innerHTML = originalText;
                } else {
                  element.value = originalText;
                }
                setData(element, "ujs:enable-with", null);
              }
              element.disabled = false;
              return setData(element, "ujs:disabled", null);
            };
            isXhrRedirect = function(event) {
              var ref, xhr;
              xhr = (ref = event.detail) != null ? ref[0] : void 0;
              return (xhr != null ? xhr.getResponseHeader("X-Xhr-Redirect") : void 0) != null;
            };
          }).call(this);
          (function() {
            var stopEverything;
            stopEverything = Rails2.stopEverything;
            Rails2.handleMethod = function(e) {
              var csrfParam, csrfToken, form, formContent, href, link, method;
              link = this;
              method = link.getAttribute("data-method");
              if (!method) {
                return;
              }
              href = Rails2.href(link);
              csrfToken = Rails2.csrfToken();
              csrfParam = Rails2.csrfParam();
              form = document.createElement("form");
              formContent = "<input name='_method' value='" + method + "' type='hidden' />";
              if (csrfParam != null && csrfToken != null && !Rails2.isCrossDomain(href)) {
                formContent += "<input name='" + csrfParam + "' value='" + csrfToken + "' type='hidden' />";
              }
              formContent += '<input type="submit" />';
              form.method = "post";
              form.action = href;
              form.target = link.target;
              form.innerHTML = formContent;
              form.style.display = "none";
              document.body.appendChild(form);
              form.querySelector('[type="submit"]').click();
              return stopEverything(e);
            };
          }).call(this);
          (function() {
            var ajax, fire, getData, isCrossDomain, isRemote, matches, serializeElement, setData, stopEverything, slice = [].slice;
            matches = Rails2.matches, getData = Rails2.getData, setData = Rails2.setData, fire = Rails2.fire, stopEverything = Rails2.stopEverything, ajax = Rails2.ajax, isCrossDomain = Rails2.isCrossDomain, serializeElement = Rails2.serializeElement;
            isRemote = function(element) {
              var value;
              value = element.getAttribute("data-remote");
              return value != null && value !== "false";
            };
            Rails2.handleRemote = function(e) {
              var button, data, dataType, element, method, url, withCredentials;
              element = this;
              if (!isRemote(element)) {
                return true;
              }
              if (!fire(element, "ajax:before")) {
                fire(element, "ajax:stopped");
                return false;
              }
              withCredentials = element.getAttribute("data-with-credentials");
              dataType = element.getAttribute("data-type") || "script";
              if (matches(element, Rails2.formSubmitSelector)) {
                button = getData(element, "ujs:submit-button");
                method = getData(element, "ujs:submit-button-formmethod") || element.method;
                url = getData(element, "ujs:submit-button-formaction") || element.getAttribute("action") || location.href;
                if (method.toUpperCase() === "GET") {
                  url = url.replace(/\?.*$/, "");
                }
                if (element.enctype === "multipart/form-data") {
                  data = new FormData(element);
                  if (button != null) {
                    data.append(button.name, button.value);
                  }
                } else {
                  data = serializeElement(element, button);
                }
                setData(element, "ujs:submit-button", null);
                setData(element, "ujs:submit-button-formmethod", null);
                setData(element, "ujs:submit-button-formaction", null);
              } else if (matches(element, Rails2.buttonClickSelector) || matches(element, Rails2.inputChangeSelector)) {
                method = element.getAttribute("data-method");
                url = element.getAttribute("data-url");
                data = serializeElement(element, element.getAttribute("data-params"));
              } else {
                method = element.getAttribute("data-method");
                url = Rails2.href(element);
                data = element.getAttribute("data-params");
              }
              ajax({
                type: method || "GET",
                url,
                data,
                dataType,
                beforeSend: function(xhr, options) {
                  if (fire(element, "ajax:beforeSend", [xhr, options])) {
                    return fire(element, "ajax:send", [xhr]);
                  } else {
                    fire(element, "ajax:stopped");
                    return false;
                  }
                },
                success: function() {
                  var args;
                  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
                  return fire(element, "ajax:success", args);
                },
                error: function() {
                  var args;
                  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
                  return fire(element, "ajax:error", args);
                },
                complete: function() {
                  var args;
                  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
                  return fire(element, "ajax:complete", args);
                },
                crossDomain: isCrossDomain(url),
                withCredentials: withCredentials != null && withCredentials !== "false"
              });
              return stopEverything(e);
            };
            Rails2.formSubmitButtonClick = function(e) {
              var button, form;
              button = this;
              form = button.form;
              if (!form) {
                return;
              }
              if (button.name) {
                setData(form, "ujs:submit-button", {
                  name: button.name,
                  value: button.value
                });
              }
              setData(form, "ujs:formnovalidate-button", button.formNoValidate);
              setData(form, "ujs:submit-button-formaction", button.getAttribute("formaction"));
              return setData(form, "ujs:submit-button-formmethod", button.getAttribute("formmethod"));
            };
            Rails2.preventInsignificantClick = function(e) {
              var data, insignificantMetaClick, link, metaClick, method, nonPrimaryMouseClick;
              link = this;
              method = (link.getAttribute("data-method") || "GET").toUpperCase();
              data = link.getAttribute("data-params");
              metaClick = e.metaKey || e.ctrlKey;
              insignificantMetaClick = metaClick && method === "GET" && !data;
              nonPrimaryMouseClick = e.button != null && e.button !== 0;
              if (nonPrimaryMouseClick || insignificantMetaClick) {
                return e.stopImmediatePropagation();
              }
            };
          }).call(this);
          (function() {
            var $5, CSRFProtection, delegate, disableElement, enableElement, fire, formSubmitButtonClick, getData, handleConfirm, handleDisabledElement, handleMethod, handleRemote, loadCSPNonce, preventInsignificantClick, refreshCSRFTokens;
            fire = Rails2.fire, delegate = Rails2.delegate, getData = Rails2.getData, $5 = Rails2.$, refreshCSRFTokens = Rails2.refreshCSRFTokens, CSRFProtection = Rails2.CSRFProtection, loadCSPNonce = Rails2.loadCSPNonce, enableElement = Rails2.enableElement, disableElement = Rails2.disableElement, handleDisabledElement = Rails2.handleDisabledElement, handleConfirm = Rails2.handleConfirm, preventInsignificantClick = Rails2.preventInsignificantClick, handleRemote = Rails2.handleRemote, formSubmitButtonClick = Rails2.formSubmitButtonClick, handleMethod = Rails2.handleMethod;
            if (typeof jQuery !== "undefined" && jQuery !== null && jQuery.ajax != null) {
              if (jQuery.rails) {
                throw new Error("If you load both jquery_ujs and rails-ujs, use rails-ujs only.");
              }
              jQuery.rails = Rails2;
              jQuery.ajaxPrefilter(function(options, originalOptions, xhr) {
                if (!options.crossDomain) {
                  return CSRFProtection(xhr);
                }
              });
            }
            Rails2.start = function() {
              if (window._rails_loaded) {
                throw new Error("rails-ujs has already been loaded!");
              }
              window.addEventListener("pageshow", function() {
                $5(Rails2.formEnableSelector).forEach(function(el) {
                  if (getData(el, "ujs:disabled")) {
                    return enableElement(el);
                  }
                });
                return $5(Rails2.linkDisableSelector).forEach(function(el) {
                  if (getData(el, "ujs:disabled")) {
                    return enableElement(el);
                  }
                });
              });
              delegate(document, Rails2.linkDisableSelector, "ajax:complete", enableElement);
              delegate(document, Rails2.linkDisableSelector, "ajax:stopped", enableElement);
              delegate(document, Rails2.buttonDisableSelector, "ajax:complete", enableElement);
              delegate(document, Rails2.buttonDisableSelector, "ajax:stopped", enableElement);
              delegate(document, Rails2.linkClickSelector, "click", preventInsignificantClick);
              delegate(document, Rails2.linkClickSelector, "click", handleDisabledElement);
              delegate(document, Rails2.linkClickSelector, "click", handleConfirm);
              delegate(document, Rails2.linkClickSelector, "click", disableElement);
              delegate(document, Rails2.linkClickSelector, "click", handleRemote);
              delegate(document, Rails2.linkClickSelector, "click", handleMethod);
              delegate(document, Rails2.buttonClickSelector, "click", preventInsignificantClick);
              delegate(document, Rails2.buttonClickSelector, "click", handleDisabledElement);
              delegate(document, Rails2.buttonClickSelector, "click", handleConfirm);
              delegate(document, Rails2.buttonClickSelector, "click", disableElement);
              delegate(document, Rails2.buttonClickSelector, "click", handleRemote);
              delegate(document, Rails2.inputChangeSelector, "change", handleDisabledElement);
              delegate(document, Rails2.inputChangeSelector, "change", handleConfirm);
              delegate(document, Rails2.inputChangeSelector, "change", handleRemote);
              delegate(document, Rails2.formSubmitSelector, "submit", handleDisabledElement);
              delegate(document, Rails2.formSubmitSelector, "submit", handleConfirm);
              delegate(document, Rails2.formSubmitSelector, "submit", handleRemote);
              delegate(document, Rails2.formSubmitSelector, "submit", function(e) {
                return setTimeout(function() {
                  return disableElement(e);
                }, 13);
              });
              delegate(document, Rails2.formSubmitSelector, "ajax:send", disableElement);
              delegate(document, Rails2.formSubmitSelector, "ajax:complete", enableElement);
              delegate(document, Rails2.formInputClickSelector, "click", preventInsignificantClick);
              delegate(document, Rails2.formInputClickSelector, "click", handleDisabledElement);
              delegate(document, Rails2.formInputClickSelector, "click", handleConfirm);
              delegate(document, Rails2.formInputClickSelector, "click", formSubmitButtonClick);
              document.addEventListener("DOMContentLoaded", refreshCSRFTokens);
              document.addEventListener("DOMContentLoaded", loadCSPNonce);
              return window._rails_loaded = true;
            };
            if (window.Rails === Rails2 && fire(document, "rails:attachBindings")) {
              Rails2.start();
            }
          }).call(this);
        }).call(this);
        if (typeof module === "object" && module.exports) {
          module.exports = Rails2;
        } else if (typeof define === "function" && define.amd) {
          define(Rails2);
        }
      }).call(exports);
    }
  });

  // node_modules/jquery/dist/jquery.js
  var require_jquery = __commonJS({
    "node_modules/jquery/dist/jquery.js"(exports, module) {
      (function(global2, factory) {
        "use strict";
        if (typeof module === "object" && typeof module.exports === "object") {
          module.exports = global2.document ? factory(global2, true) : function(w) {
            if (!w.document) {
              throw new Error("jQuery requires a window with a document");
            }
            return factory(w);
          };
        } else {
          factory(global2);
        }
      })(typeof window !== "undefined" ? window : exports, function(window2, noGlobal) {
        "use strict";
        var arr = [];
        var getProto = Object.getPrototypeOf;
        var slice = arr.slice;
        var flat = arr.flat ? function(array) {
          return arr.flat.call(array);
        } : function(array) {
          return arr.concat.apply([], array);
        };
        var push = arr.push;
        var indexOf = arr.indexOf;
        var class2type = {};
        var toString = class2type.toString;
        var hasOwn = class2type.hasOwnProperty;
        var fnToString = hasOwn.toString;
        var ObjectFunctionString = fnToString.call(Object);
        var support = {};
        var isFunction = function isFunction2(obj) {
          return typeof obj === "function" && typeof obj.nodeType !== "number" && typeof obj.item !== "function";
        };
        var isWindow = function isWindow2(obj) {
          return obj != null && obj === obj.window;
        };
        var document2 = window2.document;
        var preservedScriptAttributes = {
          type: true,
          src: true,
          nonce: true,
          noModule: true
        };
        function DOMEval(code, node, doc) {
          doc = doc || document2;
          var i, val, script = doc.createElement("script");
          script.text = code;
          if (node) {
            for (i in preservedScriptAttributes) {
              val = node[i] || node.getAttribute && node.getAttribute(i);
              if (val) {
                script.setAttribute(i, val);
              }
            }
          }
          doc.head.appendChild(script).parentNode.removeChild(script);
        }
        function toType(obj) {
          if (obj == null) {
            return obj + "";
          }
          return typeof obj === "object" || typeof obj === "function" ? class2type[toString.call(obj)] || "object" : typeof obj;
        }
        var version = "3.6.0", jQuery2 = function(selector, context) {
          return new jQuery2.fn.init(selector, context);
        };
        jQuery2.fn = jQuery2.prototype = {
          jquery: version,
          constructor: jQuery2,
          length: 0,
          toArray: function() {
            return slice.call(this);
          },
          get: function(num) {
            if (num == null) {
              return slice.call(this);
            }
            return num < 0 ? this[num + this.length] : this[num];
          },
          pushStack: function(elems) {
            var ret = jQuery2.merge(this.constructor(), elems);
            ret.prevObject = this;
            return ret;
          },
          each: function(callback) {
            return jQuery2.each(this, callback);
          },
          map: function(callback) {
            return this.pushStack(jQuery2.map(this, function(elem, i) {
              return callback.call(elem, i, elem);
            }));
          },
          slice: function() {
            return this.pushStack(slice.apply(this, arguments));
          },
          first: function() {
            return this.eq(0);
          },
          last: function() {
            return this.eq(-1);
          },
          even: function() {
            return this.pushStack(jQuery2.grep(this, function(_elem, i) {
              return (i + 1) % 2;
            }));
          },
          odd: function() {
            return this.pushStack(jQuery2.grep(this, function(_elem, i) {
              return i % 2;
            }));
          },
          eq: function(i) {
            var len = this.length, j = +i + (i < 0 ? len : 0);
            return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
          },
          end: function() {
            return this.prevObject || this.constructor();
          },
          push,
          sort: arr.sort,
          splice: arr.splice
        };
        jQuery2.extend = jQuery2.fn.extend = function() {
          var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = false;
          if (typeof target === "boolean") {
            deep = target;
            target = arguments[i] || {};
            i++;
          }
          if (typeof target !== "object" && !isFunction(target)) {
            target = {};
          }
          if (i === length) {
            target = this;
            i--;
          }
          for (; i < length; i++) {
            if ((options = arguments[i]) != null) {
              for (name in options) {
                copy = options[name];
                if (name === "__proto__" || target === copy) {
                  continue;
                }
                if (deep && copy && (jQuery2.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
                  src = target[name];
                  if (copyIsArray && !Array.isArray(src)) {
                    clone = [];
                  } else if (!copyIsArray && !jQuery2.isPlainObject(src)) {
                    clone = {};
                  } else {
                    clone = src;
                  }
                  copyIsArray = false;
                  target[name] = jQuery2.extend(deep, clone, copy);
                } else if (copy !== void 0) {
                  target[name] = copy;
                }
              }
            }
          }
          return target;
        };
        jQuery2.extend({
          expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),
          isReady: true,
          error: function(msg) {
            throw new Error(msg);
          },
          noop: function() {
          },
          isPlainObject: function(obj) {
            var proto, Ctor;
            if (!obj || toString.call(obj) !== "[object Object]") {
              return false;
            }
            proto = getProto(obj);
            if (!proto) {
              return true;
            }
            Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
            return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
          },
          isEmptyObject: function(obj) {
            var name;
            for (name in obj) {
              return false;
            }
            return true;
          },
          globalEval: function(code, options, doc) {
            DOMEval(code, { nonce: options && options.nonce }, doc);
          },
          each: function(obj, callback) {
            var length, i = 0;
            if (isArrayLike(obj)) {
              length = obj.length;
              for (; i < length; i++) {
                if (callback.call(obj[i], i, obj[i]) === false) {
                  break;
                }
              }
            } else {
              for (i in obj) {
                if (callback.call(obj[i], i, obj[i]) === false) {
                  break;
                }
              }
            }
            return obj;
          },
          makeArray: function(arr2, results) {
            var ret = results || [];
            if (arr2 != null) {
              if (isArrayLike(Object(arr2))) {
                jQuery2.merge(ret, typeof arr2 === "string" ? [arr2] : arr2);
              } else {
                push.call(ret, arr2);
              }
            }
            return ret;
          },
          inArray: function(elem, arr2, i) {
            return arr2 == null ? -1 : indexOf.call(arr2, elem, i);
          },
          merge: function(first, second) {
            var len = +second.length, j = 0, i = first.length;
            for (; j < len; j++) {
              first[i++] = second[j];
            }
            first.length = i;
            return first;
          },
          grep: function(elems, callback, invert) {
            var callbackInverse, matches = [], i = 0, length = elems.length, callbackExpect = !invert;
            for (; i < length; i++) {
              callbackInverse = !callback(elems[i], i);
              if (callbackInverse !== callbackExpect) {
                matches.push(elems[i]);
              }
            }
            return matches;
          },
          map: function(elems, callback, arg) {
            var length, value, i = 0, ret = [];
            if (isArrayLike(elems)) {
              length = elems.length;
              for (; i < length; i++) {
                value = callback(elems[i], i, arg);
                if (value != null) {
                  ret.push(value);
                }
              }
            } else {
              for (i in elems) {
                value = callback(elems[i], i, arg);
                if (value != null) {
                  ret.push(value);
                }
              }
            }
            return flat(ret);
          },
          guid: 1,
          support
        });
        if (typeof Symbol === "function") {
          jQuery2.fn[Symbol.iterator] = arr[Symbol.iterator];
        }
        jQuery2.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(_i, name) {
          class2type["[object " + name + "]"] = name.toLowerCase();
        });
        function isArrayLike(obj) {
          var length = !!obj && "length" in obj && obj.length, type = toType(obj);
          if (isFunction(obj) || isWindow(obj)) {
            return false;
          }
          return type === "array" || length === 0 || typeof length === "number" && length > 0 && length - 1 in obj;
        }
        var Sizzle = function(window3) {
          var i, support2, Expr, getText, isXML, tokenize, compile, select, outermostContext, sortInput, hasDuplicate, setDocument, document3, docElem, documentIsHTML, rbuggyQSA, rbuggyMatches, matches, contains, expando = "sizzle" + 1 * new Date(), preferredDoc = window3.document, dirruns = 0, done = 0, classCache = createCache(), tokenCache = createCache(), compilerCache = createCache(), nonnativeSelectorCache = createCache(), sortOrder = function(a, b) {
            if (a === b) {
              hasDuplicate = true;
            }
            return 0;
          }, hasOwn2 = {}.hasOwnProperty, arr2 = [], pop = arr2.pop, pushNative = arr2.push, push2 = arr2.push, slice2 = arr2.slice, indexOf2 = function(list, elem) {
            var i2 = 0, len = list.length;
            for (; i2 < len; i2++) {
              if (list[i2] === elem) {
                return i2;
              }
            }
            return -1;
          }, booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", whitespace = "[\\x20\\t\\r\\n\\f]", identifier = "(?:\\\\[\\da-fA-F]{1,6}" + whitespace + "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+", attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace + "*([*^$|!~]?=)" + whitespace + `*(?:'((?:\\\\.|[^\\\\'])*)'|"((?:\\\\.|[^\\\\"])*)"|(` + identifier + "))|)" + whitespace + "*\\]", pseudos = ":(" + identifier + `)(?:\\((('((?:\\\\.|[^\\\\'])*)'|"((?:\\\\.|[^\\\\"])*)")|((?:\\\\.|[^\\\\()[\\]]|` + attributes + ")*)|.*)\\)|)", rwhitespace = new RegExp(whitespace + "+", "g"), rtrim2 = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"), rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"), rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"), rdescend = new RegExp(whitespace + "|>"), rpseudo = new RegExp(pseudos), ridentifier = new RegExp("^" + identifier + "$"), matchExpr = {
            "ID": new RegExp("^#(" + identifier + ")"),
            "CLASS": new RegExp("^\\.(" + identifier + ")"),
            "TAG": new RegExp("^(" + identifier + "|[*])"),
            "ATTR": new RegExp("^" + attributes),
            "PSEUDO": new RegExp("^" + pseudos),
            "CHILD": new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
            "bool": new RegExp("^(?:" + booleans + ")$", "i"),
            "needsContext": new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
          }, rhtml2 = /HTML$/i, rinputs = /^(?:input|select|textarea|button)$/i, rheader = /^h\d$/i, rnative = /^[^{]+\{\s*\[native \w/, rquickExpr2 = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, rsibling = /[+~]/, runescape = new RegExp("\\\\[\\da-fA-F]{1,6}" + whitespace + "?|\\\\([^\\r\\n\\f])", "g"), funescape = function(escape, nonHex) {
            var high = "0x" + escape.slice(1) - 65536;
            return nonHex ? nonHex : high < 0 ? String.fromCharCode(high + 65536) : String.fromCharCode(high >> 10 | 55296, high & 1023 | 56320);
          }, rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g, fcssescape = function(ch, asCodePoint) {
            if (asCodePoint) {
              if (ch === "\0") {
                return "\uFFFD";
              }
              return ch.slice(0, -1) + "\\" + ch.charCodeAt(ch.length - 1).toString(16) + " ";
            }
            return "\\" + ch;
          }, unloadHandler = function() {
            setDocument();
          }, inDisabledFieldset = addCombinator(function(elem) {
            return elem.disabled === true && elem.nodeName.toLowerCase() === "fieldset";
          }, { dir: "parentNode", next: "legend" });
          try {
            push2.apply(arr2 = slice2.call(preferredDoc.childNodes), preferredDoc.childNodes);
            arr2[preferredDoc.childNodes.length].nodeType;
          } catch (e) {
            push2 = {
              apply: arr2.length ? function(target, els) {
                pushNative.apply(target, slice2.call(els));
              } : function(target, els) {
                var j = target.length, i2 = 0;
                while (target[j++] = els[i2++]) {
                }
                target.length = j - 1;
              }
            };
          }
          function Sizzle2(selector, context, results, seed) {
            var m, i2, elem, nid, match, groups, newSelector, newContext = context && context.ownerDocument, nodeType = context ? context.nodeType : 9;
            results = results || [];
            if (typeof selector !== "string" || !selector || nodeType !== 1 && nodeType !== 9 && nodeType !== 11) {
              return results;
            }
            if (!seed) {
              setDocument(context);
              context = context || document3;
              if (documentIsHTML) {
                if (nodeType !== 11 && (match = rquickExpr2.exec(selector))) {
                  if (m = match[1]) {
                    if (nodeType === 9) {
                      if (elem = context.getElementById(m)) {
                        if (elem.id === m) {
                          results.push(elem);
                          return results;
                        }
                      } else {
                        return results;
                      }
                    } else {
                      if (newContext && (elem = newContext.getElementById(m)) && contains(context, elem) && elem.id === m) {
                        results.push(elem);
                        return results;
                      }
                    }
                  } else if (match[2]) {
                    push2.apply(results, context.getElementsByTagName(selector));
                    return results;
                  } else if ((m = match[3]) && support2.getElementsByClassName && context.getElementsByClassName) {
                    push2.apply(results, context.getElementsByClassName(m));
                    return results;
                  }
                }
                if (support2.qsa && !nonnativeSelectorCache[selector + " "] && (!rbuggyQSA || !rbuggyQSA.test(selector)) && (nodeType !== 1 || context.nodeName.toLowerCase() !== "object")) {
                  newSelector = selector;
                  newContext = context;
                  if (nodeType === 1 && (rdescend.test(selector) || rcombinators.test(selector))) {
                    newContext = rsibling.test(selector) && testContext(context.parentNode) || context;
                    if (newContext !== context || !support2.scope) {
                      if (nid = context.getAttribute("id")) {
                        nid = nid.replace(rcssescape, fcssescape);
                      } else {
                        context.setAttribute("id", nid = expando);
                      }
                    }
                    groups = tokenize(selector);
                    i2 = groups.length;
                    while (i2--) {
                      groups[i2] = (nid ? "#" + nid : ":scope") + " " + toSelector(groups[i2]);
                    }
                    newSelector = groups.join(",");
                  }
                  try {
                    push2.apply(results, newContext.querySelectorAll(newSelector));
                    return results;
                  } catch (qsaError) {
                    nonnativeSelectorCache(selector, true);
                  } finally {
                    if (nid === expando) {
                      context.removeAttribute("id");
                    }
                  }
                }
              }
            }
            return select(selector.replace(rtrim2, "$1"), context, results, seed);
          }
          function createCache() {
            var keys = [];
            function cache(key, value) {
              if (keys.push(key + " ") > Expr.cacheLength) {
                delete cache[keys.shift()];
              }
              return cache[key + " "] = value;
            }
            return cache;
          }
          function markFunction(fn) {
            fn[expando] = true;
            return fn;
          }
          function assert(fn) {
            var el = document3.createElement("fieldset");
            try {
              return !!fn(el);
            } catch (e) {
              return false;
            } finally {
              if (el.parentNode) {
                el.parentNode.removeChild(el);
              }
              el = null;
            }
          }
          function addHandle(attrs, handler) {
            var arr3 = attrs.split("|"), i2 = arr3.length;
            while (i2--) {
              Expr.attrHandle[arr3[i2]] = handler;
            }
          }
          function siblingCheck(a, b) {
            var cur = b && a, diff = cur && a.nodeType === 1 && b.nodeType === 1 && a.sourceIndex - b.sourceIndex;
            if (diff) {
              return diff;
            }
            if (cur) {
              while (cur = cur.nextSibling) {
                if (cur === b) {
                  return -1;
                }
              }
            }
            return a ? 1 : -1;
          }
          function createInputPseudo(type) {
            return function(elem) {
              var name = elem.nodeName.toLowerCase();
              return name === "input" && elem.type === type;
            };
          }
          function createButtonPseudo(type) {
            return function(elem) {
              var name = elem.nodeName.toLowerCase();
              return (name === "input" || name === "button") && elem.type === type;
            };
          }
          function createDisabledPseudo(disabled) {
            return function(elem) {
              if ("form" in elem) {
                if (elem.parentNode && elem.disabled === false) {
                  if ("label" in elem) {
                    if ("label" in elem.parentNode) {
                      return elem.parentNode.disabled === disabled;
                    } else {
                      return elem.disabled === disabled;
                    }
                  }
                  return elem.isDisabled === disabled || elem.isDisabled !== !disabled && inDisabledFieldset(elem) === disabled;
                }
                return elem.disabled === disabled;
              } else if ("label" in elem) {
                return elem.disabled === disabled;
              }
              return false;
            };
          }
          function createPositionalPseudo(fn) {
            return markFunction(function(argument) {
              argument = +argument;
              return markFunction(function(seed, matches2) {
                var j, matchIndexes = fn([], seed.length, argument), i2 = matchIndexes.length;
                while (i2--) {
                  if (seed[j = matchIndexes[i2]]) {
                    seed[j] = !(matches2[j] = seed[j]);
                  }
                }
              });
            });
          }
          function testContext(context) {
            return context && typeof context.getElementsByTagName !== "undefined" && context;
          }
          support2 = Sizzle2.support = {};
          isXML = Sizzle2.isXML = function(elem) {
            var namespace = elem && elem.namespaceURI, docElem2 = elem && (elem.ownerDocument || elem).documentElement;
            return !rhtml2.test(namespace || docElem2 && docElem2.nodeName || "HTML");
          };
          setDocument = Sizzle2.setDocument = function(node) {
            var hasCompare, subWindow, doc = node ? node.ownerDocument || node : preferredDoc;
            if (doc == document3 || doc.nodeType !== 9 || !doc.documentElement) {
              return document3;
            }
            document3 = doc;
            docElem = document3.documentElement;
            documentIsHTML = !isXML(document3);
            if (preferredDoc != document3 && (subWindow = document3.defaultView) && subWindow.top !== subWindow) {
              if (subWindow.addEventListener) {
                subWindow.addEventListener("unload", unloadHandler, false);
              } else if (subWindow.attachEvent) {
                subWindow.attachEvent("onunload", unloadHandler);
              }
            }
            support2.scope = assert(function(el) {
              docElem.appendChild(el).appendChild(document3.createElement("div"));
              return typeof el.querySelectorAll !== "undefined" && !el.querySelectorAll(":scope fieldset div").length;
            });
            support2.attributes = assert(function(el) {
              el.className = "i";
              return !el.getAttribute("className");
            });
            support2.getElementsByTagName = assert(function(el) {
              el.appendChild(document3.createComment(""));
              return !el.getElementsByTagName("*").length;
            });
            support2.getElementsByClassName = rnative.test(document3.getElementsByClassName);
            support2.getById = assert(function(el) {
              docElem.appendChild(el).id = expando;
              return !document3.getElementsByName || !document3.getElementsByName(expando).length;
            });
            if (support2.getById) {
              Expr.filter["ID"] = function(id) {
                var attrId = id.replace(runescape, funescape);
                return function(elem) {
                  return elem.getAttribute("id") === attrId;
                };
              };
              Expr.find["ID"] = function(id, context) {
                if (typeof context.getElementById !== "undefined" && documentIsHTML) {
                  var elem = context.getElementById(id);
                  return elem ? [elem] : [];
                }
              };
            } else {
              Expr.filter["ID"] = function(id) {
                var attrId = id.replace(runescape, funescape);
                return function(elem) {
                  var node2 = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
                  return node2 && node2.value === attrId;
                };
              };
              Expr.find["ID"] = function(id, context) {
                if (typeof context.getElementById !== "undefined" && documentIsHTML) {
                  var node2, i2, elems, elem = context.getElementById(id);
                  if (elem) {
                    node2 = elem.getAttributeNode("id");
                    if (node2 && node2.value === id) {
                      return [elem];
                    }
                    elems = context.getElementsByName(id);
                    i2 = 0;
                    while (elem = elems[i2++]) {
                      node2 = elem.getAttributeNode("id");
                      if (node2 && node2.value === id) {
                        return [elem];
                      }
                    }
                  }
                  return [];
                }
              };
            }
            Expr.find["TAG"] = support2.getElementsByTagName ? function(tag, context) {
              if (typeof context.getElementsByTagName !== "undefined") {
                return context.getElementsByTagName(tag);
              } else if (support2.qsa) {
                return context.querySelectorAll(tag);
              }
            } : function(tag, context) {
              var elem, tmp = [], i2 = 0, results = context.getElementsByTagName(tag);
              if (tag === "*") {
                while (elem = results[i2++]) {
                  if (elem.nodeType === 1) {
                    tmp.push(elem);
                  }
                }
                return tmp;
              }
              return results;
            };
            Expr.find["CLASS"] = support2.getElementsByClassName && function(className, context) {
              if (typeof context.getElementsByClassName !== "undefined" && documentIsHTML) {
                return context.getElementsByClassName(className);
              }
            };
            rbuggyMatches = [];
            rbuggyQSA = [];
            if (support2.qsa = rnative.test(document3.querySelectorAll)) {
              assert(function(el) {
                var input;
                docElem.appendChild(el).innerHTML = "<a id='" + expando + "'></a><select id='" + expando + "-\r\\' msallowcapture=''><option selected=''></option></select>";
                if (el.querySelectorAll("[msallowcapture^='']").length) {
                  rbuggyQSA.push("[*^$]=" + whitespace + `*(?:''|"")`);
                }
                if (!el.querySelectorAll("[selected]").length) {
                  rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")");
                }
                if (!el.querySelectorAll("[id~=" + expando + "-]").length) {
                  rbuggyQSA.push("~=");
                }
                input = document3.createElement("input");
                input.setAttribute("name", "");
                el.appendChild(input);
                if (!el.querySelectorAll("[name='']").length) {
                  rbuggyQSA.push("\\[" + whitespace + "*name" + whitespace + "*=" + whitespace + `*(?:''|"")`);
                }
                if (!el.querySelectorAll(":checked").length) {
                  rbuggyQSA.push(":checked");
                }
                if (!el.querySelectorAll("a#" + expando + "+*").length) {
                  rbuggyQSA.push(".#.+[+~]");
                }
                el.querySelectorAll("\\\f");
                rbuggyQSA.push("[\\r\\n\\f]");
              });
              assert(function(el) {
                el.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                var input = document3.createElement("input");
                input.setAttribute("type", "hidden");
                el.appendChild(input).setAttribute("name", "D");
                if (el.querySelectorAll("[name=d]").length) {
                  rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?=");
                }
                if (el.querySelectorAll(":enabled").length !== 2) {
                  rbuggyQSA.push(":enabled", ":disabled");
                }
                docElem.appendChild(el).disabled = true;
                if (el.querySelectorAll(":disabled").length !== 2) {
                  rbuggyQSA.push(":enabled", ":disabled");
                }
                el.querySelectorAll("*,:x");
                rbuggyQSA.push(",.*:");
              });
            }
            if (support2.matchesSelector = rnative.test(matches = docElem.matches || docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)) {
              assert(function(el) {
                support2.disconnectedMatch = matches.call(el, "*");
                matches.call(el, "[s!='']:x");
                rbuggyMatches.push("!=", pseudos);
              });
            }
            rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
            rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|"));
            hasCompare = rnative.test(docElem.compareDocumentPosition);
            contains = hasCompare || rnative.test(docElem.contains) ? function(a, b) {
              var adown = a.nodeType === 9 ? a.documentElement : a, bup = b && b.parentNode;
              return a === bup || !!(bup && bup.nodeType === 1 && (adown.contains ? adown.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16));
            } : function(a, b) {
              if (b) {
                while (b = b.parentNode) {
                  if (b === a) {
                    return true;
                  }
                }
              }
              return false;
            };
            sortOrder = hasCompare ? function(a, b) {
              if (a === b) {
                hasDuplicate = true;
                return 0;
              }
              var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
              if (compare) {
                return compare;
              }
              compare = (a.ownerDocument || a) == (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1;
              if (compare & 1 || !support2.sortDetached && b.compareDocumentPosition(a) === compare) {
                if (a == document3 || a.ownerDocument == preferredDoc && contains(preferredDoc, a)) {
                  return -1;
                }
                if (b == document3 || b.ownerDocument == preferredDoc && contains(preferredDoc, b)) {
                  return 1;
                }
                return sortInput ? indexOf2(sortInput, a) - indexOf2(sortInput, b) : 0;
              }
              return compare & 4 ? -1 : 1;
            } : function(a, b) {
              if (a === b) {
                hasDuplicate = true;
                return 0;
              }
              var cur, i2 = 0, aup = a.parentNode, bup = b.parentNode, ap = [a], bp = [b];
              if (!aup || !bup) {
                return a == document3 ? -1 : b == document3 ? 1 : aup ? -1 : bup ? 1 : sortInput ? indexOf2(sortInput, a) - indexOf2(sortInput, b) : 0;
              } else if (aup === bup) {
                return siblingCheck(a, b);
              }
              cur = a;
              while (cur = cur.parentNode) {
                ap.unshift(cur);
              }
              cur = b;
              while (cur = cur.parentNode) {
                bp.unshift(cur);
              }
              while (ap[i2] === bp[i2]) {
                i2++;
              }
              return i2 ? siblingCheck(ap[i2], bp[i2]) : ap[i2] == preferredDoc ? -1 : bp[i2] == preferredDoc ? 1 : 0;
            };
            return document3;
          };
          Sizzle2.matches = function(expr, elements) {
            return Sizzle2(expr, null, null, elements);
          };
          Sizzle2.matchesSelector = function(elem, expr) {
            setDocument(elem);
            if (support2.matchesSelector && documentIsHTML && !nonnativeSelectorCache[expr + " "] && (!rbuggyMatches || !rbuggyMatches.test(expr)) && (!rbuggyQSA || !rbuggyQSA.test(expr))) {
              try {
                var ret = matches.call(elem, expr);
                if (ret || support2.disconnectedMatch || elem.document && elem.document.nodeType !== 11) {
                  return ret;
                }
              } catch (e) {
                nonnativeSelectorCache(expr, true);
              }
            }
            return Sizzle2(expr, document3, null, [elem]).length > 0;
          };
          Sizzle2.contains = function(context, elem) {
            if ((context.ownerDocument || context) != document3) {
              setDocument(context);
            }
            return contains(context, elem);
          };
          Sizzle2.attr = function(elem, name) {
            if ((elem.ownerDocument || elem) != document3) {
              setDocument(elem);
            }
            var fn = Expr.attrHandle[name.toLowerCase()], val = fn && hasOwn2.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : void 0;
            return val !== void 0 ? val : support2.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
          };
          Sizzle2.escape = function(sel) {
            return (sel + "").replace(rcssescape, fcssescape);
          };
          Sizzle2.error = function(msg) {
            throw new Error("Syntax error, unrecognized expression: " + msg);
          };
          Sizzle2.uniqueSort = function(results) {
            var elem, duplicates = [], j = 0, i2 = 0;
            hasDuplicate = !support2.detectDuplicates;
            sortInput = !support2.sortStable && results.slice(0);
            results.sort(sortOrder);
            if (hasDuplicate) {
              while (elem = results[i2++]) {
                if (elem === results[i2]) {
                  j = duplicates.push(i2);
                }
              }
              while (j--) {
                results.splice(duplicates[j], 1);
              }
            }
            sortInput = null;
            return results;
          };
          getText = Sizzle2.getText = function(elem) {
            var node, ret = "", i2 = 0, nodeType = elem.nodeType;
            if (!nodeType) {
              while (node = elem[i2++]) {
                ret += getText(node);
              }
            } else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
              if (typeof elem.textContent === "string") {
                return elem.textContent;
              } else {
                for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                  ret += getText(elem);
                }
              }
            } else if (nodeType === 3 || nodeType === 4) {
              return elem.nodeValue;
            }
            return ret;
          };
          Expr = Sizzle2.selectors = {
            cacheLength: 50,
            createPseudo: markFunction,
            match: matchExpr,
            attrHandle: {},
            find: {},
            relative: {
              ">": { dir: "parentNode", first: true },
              " ": { dir: "parentNode" },
              "+": { dir: "previousSibling", first: true },
              "~": { dir: "previousSibling" }
            },
            preFilter: {
              "ATTR": function(match) {
                match[1] = match[1].replace(runescape, funescape);
                match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape);
                if (match[2] === "~=") {
                  match[3] = " " + match[3] + " ";
                }
                return match.slice(0, 4);
              },
              "CHILD": function(match) {
                match[1] = match[1].toLowerCase();
                if (match[1].slice(0, 3) === "nth") {
                  if (!match[3]) {
                    Sizzle2.error(match[0]);
                  }
                  match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === "even" || match[3] === "odd"));
                  match[5] = +(match[7] + match[8] || match[3] === "odd");
                } else if (match[3]) {
                  Sizzle2.error(match[0]);
                }
                return match;
              },
              "PSEUDO": function(match) {
                var excess, unquoted = !match[6] && match[2];
                if (matchExpr["CHILD"].test(match[0])) {
                  return null;
                }
                if (match[3]) {
                  match[2] = match[4] || match[5] || "";
                } else if (unquoted && rpseudo.test(unquoted) && (excess = tokenize(unquoted, true)) && (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {
                  match[0] = match[0].slice(0, excess);
                  match[2] = unquoted.slice(0, excess);
                }
                return match.slice(0, 3);
              }
            },
            filter: {
              "TAG": function(nodeNameSelector) {
                var nodeName2 = nodeNameSelector.replace(runescape, funescape).toLowerCase();
                return nodeNameSelector === "*" ? function() {
                  return true;
                } : function(elem) {
                  return elem.nodeName && elem.nodeName.toLowerCase() === nodeName2;
                };
              },
              "CLASS": function(className) {
                var pattern = classCache[className + " "];
                return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function(elem) {
                  return pattern.test(typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "");
                });
              },
              "ATTR": function(name, operator, check) {
                return function(elem) {
                  var result = Sizzle2.attr(elem, name);
                  if (result == null) {
                    return operator === "!=";
                  }
                  if (!operator) {
                    return true;
                  }
                  result += "";
                  return operator === "=" ? result === check : operator === "!=" ? result !== check : operator === "^=" ? check && result.indexOf(check) === 0 : operator === "*=" ? check && result.indexOf(check) > -1 : operator === "$=" ? check && result.slice(-check.length) === check : operator === "~=" ? (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1 : operator === "|=" ? result === check || result.slice(0, check.length + 1) === check + "-" : false;
                };
              },
              "CHILD": function(type, what, _argument, first, last) {
                var simple = type.slice(0, 3) !== "nth", forward = type.slice(-4) !== "last", ofType = what === "of-type";
                return first === 1 && last === 0 ? function(elem) {
                  return !!elem.parentNode;
                } : function(elem, _context, xml) {
                  var cache, uniqueCache, outerCache, node, nodeIndex, start, dir2 = simple !== forward ? "nextSibling" : "previousSibling", parent = elem.parentNode, name = ofType && elem.nodeName.toLowerCase(), useCache = !xml && !ofType, diff = false;
                  if (parent) {
                    if (simple) {
                      while (dir2) {
                        node = elem;
                        while (node = node[dir2]) {
                          if (ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) {
                            return false;
                          }
                        }
                        start = dir2 = type === "only" && !start && "nextSibling";
                      }
                      return true;
                    }
                    start = [forward ? parent.firstChild : parent.lastChild];
                    if (forward && useCache) {
                      node = parent;
                      outerCache = node[expando] || (node[expando] = {});
                      uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});
                      cache = uniqueCache[type] || [];
                      nodeIndex = cache[0] === dirruns && cache[1];
                      diff = nodeIndex && cache[2];
                      node = nodeIndex && parent.childNodes[nodeIndex];
                      while (node = ++nodeIndex && node && node[dir2] || (diff = nodeIndex = 0) || start.pop()) {
                        if (node.nodeType === 1 && ++diff && node === elem) {
                          uniqueCache[type] = [dirruns, nodeIndex, diff];
                          break;
                        }
                      }
                    } else {
                      if (useCache) {
                        node = elem;
                        outerCache = node[expando] || (node[expando] = {});
                        uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});
                        cache = uniqueCache[type] || [];
                        nodeIndex = cache[0] === dirruns && cache[1];
                        diff = nodeIndex;
                      }
                      if (diff === false) {
                        while (node = ++nodeIndex && node && node[dir2] || (diff = nodeIndex = 0) || start.pop()) {
                          if ((ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) && ++diff) {
                            if (useCache) {
                              outerCache = node[expando] || (node[expando] = {});
                              uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});
                              uniqueCache[type] = [dirruns, diff];
                            }
                            if (node === elem) {
                              break;
                            }
                          }
                        }
                      }
                    }
                    diff -= last;
                    return diff === first || diff % first === 0 && diff / first >= 0;
                  }
                };
              },
              "PSEUDO": function(pseudo, argument) {
                var args, fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle2.error("unsupported pseudo: " + pseudo);
                if (fn[expando]) {
                  return fn(argument);
                }
                if (fn.length > 1) {
                  args = [pseudo, pseudo, "", argument];
                  return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function(seed, matches2) {
                    var idx, matched = fn(seed, argument), i2 = matched.length;
                    while (i2--) {
                      idx = indexOf2(seed, matched[i2]);
                      seed[idx] = !(matches2[idx] = matched[i2]);
                    }
                  }) : function(elem) {
                    return fn(elem, 0, args);
                  };
                }
                return fn;
              }
            },
            pseudos: {
              "not": markFunction(function(selector) {
                var input = [], results = [], matcher = compile(selector.replace(rtrim2, "$1"));
                return matcher[expando] ? markFunction(function(seed, matches2, _context, xml) {
                  var elem, unmatched = matcher(seed, null, xml, []), i2 = seed.length;
                  while (i2--) {
                    if (elem = unmatched[i2]) {
                      seed[i2] = !(matches2[i2] = elem);
                    }
                  }
                }) : function(elem, _context, xml) {
                  input[0] = elem;
                  matcher(input, null, xml, results);
                  input[0] = null;
                  return !results.pop();
                };
              }),
              "has": markFunction(function(selector) {
                return function(elem) {
                  return Sizzle2(selector, elem).length > 0;
                };
              }),
              "contains": markFunction(function(text) {
                text = text.replace(runescape, funescape);
                return function(elem) {
                  return (elem.textContent || getText(elem)).indexOf(text) > -1;
                };
              }),
              "lang": markFunction(function(lang) {
                if (!ridentifier.test(lang || "")) {
                  Sizzle2.error("unsupported lang: " + lang);
                }
                lang = lang.replace(runescape, funescape).toLowerCase();
                return function(elem) {
                  var elemLang;
                  do {
                    if (elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang")) {
                      elemLang = elemLang.toLowerCase();
                      return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
                    }
                  } while ((elem = elem.parentNode) && elem.nodeType === 1);
                  return false;
                };
              }),
              "target": function(elem) {
                var hash = window3.location && window3.location.hash;
                return hash && hash.slice(1) === elem.id;
              },
              "root": function(elem) {
                return elem === docElem;
              },
              "focus": function(elem) {
                return elem === document3.activeElement && (!document3.hasFocus || document3.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
              },
              "enabled": createDisabledPseudo(false),
              "disabled": createDisabledPseudo(true),
              "checked": function(elem) {
                var nodeName2 = elem.nodeName.toLowerCase();
                return nodeName2 === "input" && !!elem.checked || nodeName2 === "option" && !!elem.selected;
              },
              "selected": function(elem) {
                if (elem.parentNode) {
                  elem.parentNode.selectedIndex;
                }
                return elem.selected === true;
              },
              "empty": function(elem) {
                for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                  if (elem.nodeType < 6) {
                    return false;
                  }
                }
                return true;
              },
              "parent": function(elem) {
                return !Expr.pseudos["empty"](elem);
              },
              "header": function(elem) {
                return rheader.test(elem.nodeName);
              },
              "input": function(elem) {
                return rinputs.test(elem.nodeName);
              },
              "button": function(elem) {
                var name = elem.nodeName.toLowerCase();
                return name === "input" && elem.type === "button" || name === "button";
              },
              "text": function(elem) {
                var attr;
                return elem.nodeName.toLowerCase() === "input" && elem.type === "text" && ((attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text");
              },
              "first": createPositionalPseudo(function() {
                return [0];
              }),
              "last": createPositionalPseudo(function(_matchIndexes, length) {
                return [length - 1];
              }),
              "eq": createPositionalPseudo(function(_matchIndexes, length, argument) {
                return [argument < 0 ? argument + length : argument];
              }),
              "even": createPositionalPseudo(function(matchIndexes, length) {
                var i2 = 0;
                for (; i2 < length; i2 += 2) {
                  matchIndexes.push(i2);
                }
                return matchIndexes;
              }),
              "odd": createPositionalPseudo(function(matchIndexes, length) {
                var i2 = 1;
                for (; i2 < length; i2 += 2) {
                  matchIndexes.push(i2);
                }
                return matchIndexes;
              }),
              "lt": createPositionalPseudo(function(matchIndexes, length, argument) {
                var i2 = argument < 0 ? argument + length : argument > length ? length : argument;
                for (; --i2 >= 0; ) {
                  matchIndexes.push(i2);
                }
                return matchIndexes;
              }),
              "gt": createPositionalPseudo(function(matchIndexes, length, argument) {
                var i2 = argument < 0 ? argument + length : argument;
                for (; ++i2 < length; ) {
                  matchIndexes.push(i2);
                }
                return matchIndexes;
              })
            }
          };
          Expr.pseudos["nth"] = Expr.pseudos["eq"];
          for (i in { radio: true, checkbox: true, file: true, password: true, image: true }) {
            Expr.pseudos[i] = createInputPseudo(i);
          }
          for (i in { submit: true, reset: true }) {
            Expr.pseudos[i] = createButtonPseudo(i);
          }
          function setFilters() {
          }
          setFilters.prototype = Expr.filters = Expr.pseudos;
          Expr.setFilters = new setFilters();
          tokenize = Sizzle2.tokenize = function(selector, parseOnly) {
            var matched, match, tokens, type, soFar, groups, preFilters, cached = tokenCache[selector + " "];
            if (cached) {
              return parseOnly ? 0 : cached.slice(0);
            }
            soFar = selector;
            groups = [];
            preFilters = Expr.preFilter;
            while (soFar) {
              if (!matched || (match = rcomma.exec(soFar))) {
                if (match) {
                  soFar = soFar.slice(match[0].length) || soFar;
                }
                groups.push(tokens = []);
              }
              matched = false;
              if (match = rcombinators.exec(soFar)) {
                matched = match.shift();
                tokens.push({
                  value: matched,
                  type: match[0].replace(rtrim2, " ")
                });
                soFar = soFar.slice(matched.length);
              }
              for (type in Expr.filter) {
                if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match)))) {
                  matched = match.shift();
                  tokens.push({
                    value: matched,
                    type,
                    matches: match
                  });
                  soFar = soFar.slice(matched.length);
                }
              }
              if (!matched) {
                break;
              }
            }
            return parseOnly ? soFar.length : soFar ? Sizzle2.error(selector) : tokenCache(selector, groups).slice(0);
          };
          function toSelector(tokens) {
            var i2 = 0, len = tokens.length, selector = "";
            for (; i2 < len; i2++) {
              selector += tokens[i2].value;
            }
            return selector;
          }
          function addCombinator(matcher, combinator, base) {
            var dir2 = combinator.dir, skip = combinator.next, key = skip || dir2, checkNonElements = base && key === "parentNode", doneName = done++;
            return combinator.first ? function(elem, context, xml) {
              while (elem = elem[dir2]) {
                if (elem.nodeType === 1 || checkNonElements) {
                  return matcher(elem, context, xml);
                }
              }
              return false;
            } : function(elem, context, xml) {
              var oldCache, uniqueCache, outerCache, newCache = [dirruns, doneName];
              if (xml) {
                while (elem = elem[dir2]) {
                  if (elem.nodeType === 1 || checkNonElements) {
                    if (matcher(elem, context, xml)) {
                      return true;
                    }
                  }
                }
              } else {
                while (elem = elem[dir2]) {
                  if (elem.nodeType === 1 || checkNonElements) {
                    outerCache = elem[expando] || (elem[expando] = {});
                    uniqueCache = outerCache[elem.uniqueID] || (outerCache[elem.uniqueID] = {});
                    if (skip && skip === elem.nodeName.toLowerCase()) {
                      elem = elem[dir2] || elem;
                    } else if ((oldCache = uniqueCache[key]) && oldCache[0] === dirruns && oldCache[1] === doneName) {
                      return newCache[2] = oldCache[2];
                    } else {
                      uniqueCache[key] = newCache;
                      if (newCache[2] = matcher(elem, context, xml)) {
                        return true;
                      }
                    }
                  }
                }
              }
              return false;
            };
          }
          function elementMatcher(matchers) {
            return matchers.length > 1 ? function(elem, context, xml) {
              var i2 = matchers.length;
              while (i2--) {
                if (!matchers[i2](elem, context, xml)) {
                  return false;
                }
              }
              return true;
            } : matchers[0];
          }
          function multipleContexts(selector, contexts, results) {
            var i2 = 0, len = contexts.length;
            for (; i2 < len; i2++) {
              Sizzle2(selector, contexts[i2], results);
            }
            return results;
          }
          function condense(unmatched, map, filter, context, xml) {
            var elem, newUnmatched = [], i2 = 0, len = unmatched.length, mapped = map != null;
            for (; i2 < len; i2++) {
              if (elem = unmatched[i2]) {
                if (!filter || filter(elem, context, xml)) {
                  newUnmatched.push(elem);
                  if (mapped) {
                    map.push(i2);
                  }
                }
              }
            }
            return newUnmatched;
          }
          function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
            if (postFilter && !postFilter[expando]) {
              postFilter = setMatcher(postFilter);
            }
            if (postFinder && !postFinder[expando]) {
              postFinder = setMatcher(postFinder, postSelector);
            }
            return markFunction(function(seed, results, context, xml) {
              var temp, i2, elem, preMap = [], postMap = [], preexisting = results.length, elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []), matcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems, matcherOut = matcher ? postFinder || (seed ? preFilter : preexisting || postFilter) ? [] : results : matcherIn;
              if (matcher) {
                matcher(matcherIn, matcherOut, context, xml);
              }
              if (postFilter) {
                temp = condense(matcherOut, postMap);
                postFilter(temp, [], context, xml);
                i2 = temp.length;
                while (i2--) {
                  if (elem = temp[i2]) {
                    matcherOut[postMap[i2]] = !(matcherIn[postMap[i2]] = elem);
                  }
                }
              }
              if (seed) {
                if (postFinder || preFilter) {
                  if (postFinder) {
                    temp = [];
                    i2 = matcherOut.length;
                    while (i2--) {
                      if (elem = matcherOut[i2]) {
                        temp.push(matcherIn[i2] = elem);
                      }
                    }
                    postFinder(null, matcherOut = [], temp, xml);
                  }
                  i2 = matcherOut.length;
                  while (i2--) {
                    if ((elem = matcherOut[i2]) && (temp = postFinder ? indexOf2(seed, elem) : preMap[i2]) > -1) {
                      seed[temp] = !(results[temp] = elem);
                    }
                  }
                }
              } else {
                matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut);
                if (postFinder) {
                  postFinder(null, results, matcherOut, xml);
                } else {
                  push2.apply(results, matcherOut);
                }
              }
            });
          }
          function matcherFromTokens(tokens) {
            var checkContext, matcher, j, len = tokens.length, leadingRelative = Expr.relative[tokens[0].type], implicitRelative = leadingRelative || Expr.relative[" "], i2 = leadingRelative ? 1 : 0, matchContext = addCombinator(function(elem) {
              return elem === checkContext;
            }, implicitRelative, true), matchAnyContext = addCombinator(function(elem) {
              return indexOf2(checkContext, elem) > -1;
            }, implicitRelative, true), matchers = [function(elem, context, xml) {
              var ret = !leadingRelative && (xml || context !== outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
              checkContext = null;
              return ret;
            }];
            for (; i2 < len; i2++) {
              if (matcher = Expr.relative[tokens[i2].type]) {
                matchers = [addCombinator(elementMatcher(matchers), matcher)];
              } else {
                matcher = Expr.filter[tokens[i2].type].apply(null, tokens[i2].matches);
                if (matcher[expando]) {
                  j = ++i2;
                  for (; j < len; j++) {
                    if (Expr.relative[tokens[j].type]) {
                      break;
                    }
                  }
                  return setMatcher(i2 > 1 && elementMatcher(matchers), i2 > 1 && toSelector(tokens.slice(0, i2 - 1).concat({ value: tokens[i2 - 2].type === " " ? "*" : "" })).replace(rtrim2, "$1"), matcher, i2 < j && matcherFromTokens(tokens.slice(i2, j)), j < len && matcherFromTokens(tokens = tokens.slice(j)), j < len && toSelector(tokens));
                }
                matchers.push(matcher);
              }
            }
            return elementMatcher(matchers);
          }
          function matcherFromGroupMatchers(elementMatchers, setMatchers) {
            var bySet = setMatchers.length > 0, byElement = elementMatchers.length > 0, superMatcher = function(seed, context, xml, results, outermost) {
              var elem, j, matcher, matchedCount = 0, i2 = "0", unmatched = seed && [], setMatched = [], contextBackup = outermostContext, elems = seed || byElement && Expr.find["TAG"]("*", outermost), dirrunsUnique = dirruns += contextBackup == null ? 1 : Math.random() || 0.1, len = elems.length;
              if (outermost) {
                outermostContext = context == document3 || context || outermost;
              }
              for (; i2 !== len && (elem = elems[i2]) != null; i2++) {
                if (byElement && elem) {
                  j = 0;
                  if (!context && elem.ownerDocument != document3) {
                    setDocument(elem);
                    xml = !documentIsHTML;
                  }
                  while (matcher = elementMatchers[j++]) {
                    if (matcher(elem, context || document3, xml)) {
                      results.push(elem);
                      break;
                    }
                  }
                  if (outermost) {
                    dirruns = dirrunsUnique;
                  }
                }
                if (bySet) {
                  if (elem = !matcher && elem) {
                    matchedCount--;
                  }
                  if (seed) {
                    unmatched.push(elem);
                  }
                }
              }
              matchedCount += i2;
              if (bySet && i2 !== matchedCount) {
                j = 0;
                while (matcher = setMatchers[j++]) {
                  matcher(unmatched, setMatched, context, xml);
                }
                if (seed) {
                  if (matchedCount > 0) {
                    while (i2--) {
                      if (!(unmatched[i2] || setMatched[i2])) {
                        setMatched[i2] = pop.call(results);
                      }
                    }
                  }
                  setMatched = condense(setMatched);
                }
                push2.apply(results, setMatched);
                if (outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1) {
                  Sizzle2.uniqueSort(results);
                }
              }
              if (outermost) {
                dirruns = dirrunsUnique;
                outermostContext = contextBackup;
              }
              return unmatched;
            };
            return bySet ? markFunction(superMatcher) : superMatcher;
          }
          compile = Sizzle2.compile = function(selector, match) {
            var i2, setMatchers = [], elementMatchers = [], cached = compilerCache[selector + " "];
            if (!cached) {
              if (!match) {
                match = tokenize(selector);
              }
              i2 = match.length;
              while (i2--) {
                cached = matcherFromTokens(match[i2]);
                if (cached[expando]) {
                  setMatchers.push(cached);
                } else {
                  elementMatchers.push(cached);
                }
              }
              cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));
              cached.selector = selector;
            }
            return cached;
          };
          select = Sizzle2.select = function(selector, context, results, seed) {
            var i2, tokens, token, type, find, compiled = typeof selector === "function" && selector, match = !seed && tokenize(selector = compiled.selector || selector);
            results = results || [];
            if (match.length === 1) {
              tokens = match[0] = match[0].slice(0);
              if (tokens.length > 2 && (token = tokens[0]).type === "ID" && context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {
                context = (Expr.find["ID"](token.matches[0].replace(runescape, funescape), context) || [])[0];
                if (!context) {
                  return results;
                } else if (compiled) {
                  context = context.parentNode;
                }
                selector = selector.slice(tokens.shift().value.length);
              }
              i2 = matchExpr["needsContext"].test(selector) ? 0 : tokens.length;
              while (i2--) {
                token = tokens[i2];
                if (Expr.relative[type = token.type]) {
                  break;
                }
                if (find = Expr.find[type]) {
                  if (seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && testContext(context.parentNode) || context)) {
                    tokens.splice(i2, 1);
                    selector = seed.length && toSelector(tokens);
                    if (!selector) {
                      push2.apply(results, seed);
                      return results;
                    }
                    break;
                  }
                }
              }
            }
            (compiled || compile(selector, match))(seed, context, !documentIsHTML, results, !context || rsibling.test(selector) && testContext(context.parentNode) || context);
            return results;
          };
          support2.sortStable = expando.split("").sort(sortOrder).join("") === expando;
          support2.detectDuplicates = !!hasDuplicate;
          setDocument();
          support2.sortDetached = assert(function(el) {
            return el.compareDocumentPosition(document3.createElement("fieldset")) & 1;
          });
          if (!assert(function(el) {
            el.innerHTML = "<a href='#'></a>";
            return el.firstChild.getAttribute("href") === "#";
          })) {
            addHandle("type|href|height|width", function(elem, name, isXML2) {
              if (!isXML2) {
                return elem.getAttribute(name, name.toLowerCase() === "type" ? 1 : 2);
              }
            });
          }
          if (!support2.attributes || !assert(function(el) {
            el.innerHTML = "<input/>";
            el.firstChild.setAttribute("value", "");
            return el.firstChild.getAttribute("value") === "";
          })) {
            addHandle("value", function(elem, _name, isXML2) {
              if (!isXML2 && elem.nodeName.toLowerCase() === "input") {
                return elem.defaultValue;
              }
            });
          }
          if (!assert(function(el) {
            return el.getAttribute("disabled") == null;
          })) {
            addHandle(booleans, function(elem, name, isXML2) {
              var val;
              if (!isXML2) {
                return elem[name] === true ? name.toLowerCase() : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
              }
            });
          }
          return Sizzle2;
        }(window2);
        jQuery2.find = Sizzle;
        jQuery2.expr = Sizzle.selectors;
        jQuery2.expr[":"] = jQuery2.expr.pseudos;
        jQuery2.uniqueSort = jQuery2.unique = Sizzle.uniqueSort;
        jQuery2.text = Sizzle.getText;
        jQuery2.isXMLDoc = Sizzle.isXML;
        jQuery2.contains = Sizzle.contains;
        jQuery2.escapeSelector = Sizzle.escape;
        var dir = function(elem, dir2, until) {
          var matched = [], truncate = until !== void 0;
          while ((elem = elem[dir2]) && elem.nodeType !== 9) {
            if (elem.nodeType === 1) {
              if (truncate && jQuery2(elem).is(until)) {
                break;
              }
              matched.push(elem);
            }
          }
          return matched;
        };
        var siblings = function(n, elem) {
          var matched = [];
          for (; n; n = n.nextSibling) {
            if (n.nodeType === 1 && n !== elem) {
              matched.push(n);
            }
          }
          return matched;
        };
        var rneedsContext = jQuery2.expr.match.needsContext;
        function nodeName(elem, name) {
          return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
        }
        var rsingleTag = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
        function winnow(elements, qualifier, not) {
          if (isFunction(qualifier)) {
            return jQuery2.grep(elements, function(elem, i) {
              return !!qualifier.call(elem, i, elem) !== not;
            });
          }
          if (qualifier.nodeType) {
            return jQuery2.grep(elements, function(elem) {
              return elem === qualifier !== not;
            });
          }
          if (typeof qualifier !== "string") {
            return jQuery2.grep(elements, function(elem) {
              return indexOf.call(qualifier, elem) > -1 !== not;
            });
          }
          return jQuery2.filter(qualifier, elements, not);
        }
        jQuery2.filter = function(expr, elems, not) {
          var elem = elems[0];
          if (not) {
            expr = ":not(" + expr + ")";
          }
          if (elems.length === 1 && elem.nodeType === 1) {
            return jQuery2.find.matchesSelector(elem, expr) ? [elem] : [];
          }
          return jQuery2.find.matches(expr, jQuery2.grep(elems, function(elem2) {
            return elem2.nodeType === 1;
          }));
        };
        jQuery2.fn.extend({
          find: function(selector) {
            var i, ret, len = this.length, self = this;
            if (typeof selector !== "string") {
              return this.pushStack(jQuery2(selector).filter(function() {
                for (i = 0; i < len; i++) {
                  if (jQuery2.contains(self[i], this)) {
                    return true;
                  }
                }
              }));
            }
            ret = this.pushStack([]);
            for (i = 0; i < len; i++) {
              jQuery2.find(selector, self[i], ret);
            }
            return len > 1 ? jQuery2.uniqueSort(ret) : ret;
          },
          filter: function(selector) {
            return this.pushStack(winnow(this, selector || [], false));
          },
          not: function(selector) {
            return this.pushStack(winnow(this, selector || [], true));
          },
          is: function(selector) {
            return !!winnow(this, typeof selector === "string" && rneedsContext.test(selector) ? jQuery2(selector) : selector || [], false).length;
          }
        });
        var rootjQuery, rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/, init = jQuery2.fn.init = function(selector, context, root) {
          var match, elem;
          if (!selector) {
            return this;
          }
          root = root || rootjQuery;
          if (typeof selector === "string") {
            if (selector[0] === "<" && selector[selector.length - 1] === ">" && selector.length >= 3) {
              match = [null, selector, null];
            } else {
              match = rquickExpr.exec(selector);
            }
            if (match && (match[1] || !context)) {
              if (match[1]) {
                context = context instanceof jQuery2 ? context[0] : context;
                jQuery2.merge(this, jQuery2.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document2, true));
                if (rsingleTag.test(match[1]) && jQuery2.isPlainObject(context)) {
                  for (match in context) {
                    if (isFunction(this[match])) {
                      this[match](context[match]);
                    } else {
                      this.attr(match, context[match]);
                    }
                  }
                }
                return this;
              } else {
                elem = document2.getElementById(match[2]);
                if (elem) {
                  this[0] = elem;
                  this.length = 1;
                }
                return this;
              }
            } else if (!context || context.jquery) {
              return (context || root).find(selector);
            } else {
              return this.constructor(context).find(selector);
            }
          } else if (selector.nodeType) {
            this[0] = selector;
            this.length = 1;
            return this;
          } else if (isFunction(selector)) {
            return root.ready !== void 0 ? root.ready(selector) : selector(jQuery2);
          }
          return jQuery2.makeArray(selector, this);
        };
        init.prototype = jQuery2.fn;
        rootjQuery = jQuery2(document2);
        var rparentsprev = /^(?:parents|prev(?:Until|All))/, guaranteedUnique = {
          children: true,
          contents: true,
          next: true,
          prev: true
        };
        jQuery2.fn.extend({
          has: function(target) {
            var targets = jQuery2(target, this), l = targets.length;
            return this.filter(function() {
              var i = 0;
              for (; i < l; i++) {
                if (jQuery2.contains(this, targets[i])) {
                  return true;
                }
              }
            });
          },
          closest: function(selectors, context) {
            var cur, i = 0, l = this.length, matched = [], targets = typeof selectors !== "string" && jQuery2(selectors);
            if (!rneedsContext.test(selectors)) {
              for (; i < l; i++) {
                for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {
                  if (cur.nodeType < 11 && (targets ? targets.index(cur) > -1 : cur.nodeType === 1 && jQuery2.find.matchesSelector(cur, selectors))) {
                    matched.push(cur);
                    break;
                  }
                }
              }
            }
            return this.pushStack(matched.length > 1 ? jQuery2.uniqueSort(matched) : matched);
          },
          index: function(elem) {
            if (!elem) {
              return this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
            }
            if (typeof elem === "string") {
              return indexOf.call(jQuery2(elem), this[0]);
            }
            return indexOf.call(this, elem.jquery ? elem[0] : elem);
          },
          add: function(selector, context) {
            return this.pushStack(jQuery2.uniqueSort(jQuery2.merge(this.get(), jQuery2(selector, context))));
          },
          addBack: function(selector) {
            return this.add(selector == null ? this.prevObject : this.prevObject.filter(selector));
          }
        });
        function sibling(cur, dir2) {
          while ((cur = cur[dir2]) && cur.nodeType !== 1) {
          }
          return cur;
        }
        jQuery2.each({
          parent: function(elem) {
            var parent = elem.parentNode;
            return parent && parent.nodeType !== 11 ? parent : null;
          },
          parents: function(elem) {
            return dir(elem, "parentNode");
          },
          parentsUntil: function(elem, _i, until) {
            return dir(elem, "parentNode", until);
          },
          next: function(elem) {
            return sibling(elem, "nextSibling");
          },
          prev: function(elem) {
            return sibling(elem, "previousSibling");
          },
          nextAll: function(elem) {
            return dir(elem, "nextSibling");
          },
          prevAll: function(elem) {
            return dir(elem, "previousSibling");
          },
          nextUntil: function(elem, _i, until) {
            return dir(elem, "nextSibling", until);
          },
          prevUntil: function(elem, _i, until) {
            return dir(elem, "previousSibling", until);
          },
          siblings: function(elem) {
            return siblings((elem.parentNode || {}).firstChild, elem);
          },
          children: function(elem) {
            return siblings(elem.firstChild);
          },
          contents: function(elem) {
            if (elem.contentDocument != null && getProto(elem.contentDocument)) {
              return elem.contentDocument;
            }
            if (nodeName(elem, "template")) {
              elem = elem.content || elem;
            }
            return jQuery2.merge([], elem.childNodes);
          }
        }, function(name, fn) {
          jQuery2.fn[name] = function(until, selector) {
            var matched = jQuery2.map(this, fn, until);
            if (name.slice(-5) !== "Until") {
              selector = until;
            }
            if (selector && typeof selector === "string") {
              matched = jQuery2.filter(selector, matched);
            }
            if (this.length > 1) {
              if (!guaranteedUnique[name]) {
                jQuery2.uniqueSort(matched);
              }
              if (rparentsprev.test(name)) {
                matched.reverse();
              }
            }
            return this.pushStack(matched);
          };
        });
        var rnothtmlwhite = /[^\x20\t\r\n\f]+/g;
        function createOptions(options) {
          var object = {};
          jQuery2.each(options.match(rnothtmlwhite) || [], function(_, flag) {
            object[flag] = true;
          });
          return object;
        }
        jQuery2.Callbacks = function(options) {
          options = typeof options === "string" ? createOptions(options) : jQuery2.extend({}, options);
          var firing, memory, fired, locked, list = [], queue = [], firingIndex = -1, fire = function() {
            locked = locked || options.once;
            fired = firing = true;
            for (; queue.length; firingIndex = -1) {
              memory = queue.shift();
              while (++firingIndex < list.length) {
                if (list[firingIndex].apply(memory[0], memory[1]) === false && options.stopOnFalse) {
                  firingIndex = list.length;
                  memory = false;
                }
              }
            }
            if (!options.memory) {
              memory = false;
            }
            firing = false;
            if (locked) {
              if (memory) {
                list = [];
              } else {
                list = "";
              }
            }
          }, self = {
            add: function() {
              if (list) {
                if (memory && !firing) {
                  firingIndex = list.length - 1;
                  queue.push(memory);
                }
                (function add(args) {
                  jQuery2.each(args, function(_, arg) {
                    if (isFunction(arg)) {
                      if (!options.unique || !self.has(arg)) {
                        list.push(arg);
                      }
                    } else if (arg && arg.length && toType(arg) !== "string") {
                      add(arg);
                    }
                  });
                })(arguments);
                if (memory && !firing) {
                  fire();
                }
              }
              return this;
            },
            remove: function() {
              jQuery2.each(arguments, function(_, arg) {
                var index;
                while ((index = jQuery2.inArray(arg, list, index)) > -1) {
                  list.splice(index, 1);
                  if (index <= firingIndex) {
                    firingIndex--;
                  }
                }
              });
              return this;
            },
            has: function(fn) {
              return fn ? jQuery2.inArray(fn, list) > -1 : list.length > 0;
            },
            empty: function() {
              if (list) {
                list = [];
              }
              return this;
            },
            disable: function() {
              locked = queue = [];
              list = memory = "";
              return this;
            },
            disabled: function() {
              return !list;
            },
            lock: function() {
              locked = queue = [];
              if (!memory && !firing) {
                list = memory = "";
              }
              return this;
            },
            locked: function() {
              return !!locked;
            },
            fireWith: function(context, args) {
              if (!locked) {
                args = args || [];
                args = [context, args.slice ? args.slice() : args];
                queue.push(args);
                if (!firing) {
                  fire();
                }
              }
              return this;
            },
            fire: function() {
              self.fireWith(this, arguments);
              return this;
            },
            fired: function() {
              return !!fired;
            }
          };
          return self;
        };
        function Identity(v) {
          return v;
        }
        function Thrower(ex) {
          throw ex;
        }
        function adoptValue(value, resolve, reject, noValue) {
          var method;
          try {
            if (value && isFunction(method = value.promise)) {
              method.call(value).done(resolve).fail(reject);
            } else if (value && isFunction(method = value.then)) {
              method.call(value, resolve, reject);
            } else {
              resolve.apply(void 0, [value].slice(noValue));
            }
          } catch (value2) {
            reject.apply(void 0, [value2]);
          }
        }
        jQuery2.extend({
          Deferred: function(func) {
            var tuples = [
              [
                "notify",
                "progress",
                jQuery2.Callbacks("memory"),
                jQuery2.Callbacks("memory"),
                2
              ],
              [
                "resolve",
                "done",
                jQuery2.Callbacks("once memory"),
                jQuery2.Callbacks("once memory"),
                0,
                "resolved"
              ],
              [
                "reject",
                "fail",
                jQuery2.Callbacks("once memory"),
                jQuery2.Callbacks("once memory"),
                1,
                "rejected"
              ]
            ], state = "pending", promise = {
              state: function() {
                return state;
              },
              always: function() {
                deferred.done(arguments).fail(arguments);
                return this;
              },
              "catch": function(fn) {
                return promise.then(null, fn);
              },
              pipe: function() {
                var fns = arguments;
                return jQuery2.Deferred(function(newDefer) {
                  jQuery2.each(tuples, function(_i, tuple) {
                    var fn = isFunction(fns[tuple[4]]) && fns[tuple[4]];
                    deferred[tuple[1]](function() {
                      var returned = fn && fn.apply(this, arguments);
                      if (returned && isFunction(returned.promise)) {
                        returned.promise().progress(newDefer.notify).done(newDefer.resolve).fail(newDefer.reject);
                      } else {
                        newDefer[tuple[0] + "With"](this, fn ? [returned] : arguments);
                      }
                    });
                  });
                  fns = null;
                }).promise();
              },
              then: function(onFulfilled, onRejected, onProgress) {
                var maxDepth = 0;
                function resolve(depth, deferred2, handler, special) {
                  return function() {
                    var that = this, args = arguments, mightThrow = function() {
                      var returned, then;
                      if (depth < maxDepth) {
                        return;
                      }
                      returned = handler.apply(that, args);
                      if (returned === deferred2.promise()) {
                        throw new TypeError("Thenable self-resolution");
                      }
                      then = returned && (typeof returned === "object" || typeof returned === "function") && returned.then;
                      if (isFunction(then)) {
                        if (special) {
                          then.call(returned, resolve(maxDepth, deferred2, Identity, special), resolve(maxDepth, deferred2, Thrower, special));
                        } else {
                          maxDepth++;
                          then.call(returned, resolve(maxDepth, deferred2, Identity, special), resolve(maxDepth, deferred2, Thrower, special), resolve(maxDepth, deferred2, Identity, deferred2.notifyWith));
                        }
                      } else {
                        if (handler !== Identity) {
                          that = void 0;
                          args = [returned];
                        }
                        (special || deferred2.resolveWith)(that, args);
                      }
                    }, process = special ? mightThrow : function() {
                      try {
                        mightThrow();
                      } catch (e) {
                        if (jQuery2.Deferred.exceptionHook) {
                          jQuery2.Deferred.exceptionHook(e, process.stackTrace);
                        }
                        if (depth + 1 >= maxDepth) {
                          if (handler !== Thrower) {
                            that = void 0;
                            args = [e];
                          }
                          deferred2.rejectWith(that, args);
                        }
                      }
                    };
                    if (depth) {
                      process();
                    } else {
                      if (jQuery2.Deferred.getStackHook) {
                        process.stackTrace = jQuery2.Deferred.getStackHook();
                      }
                      window2.setTimeout(process);
                    }
                  };
                }
                return jQuery2.Deferred(function(newDefer) {
                  tuples[0][3].add(resolve(0, newDefer, isFunction(onProgress) ? onProgress : Identity, newDefer.notifyWith));
                  tuples[1][3].add(resolve(0, newDefer, isFunction(onFulfilled) ? onFulfilled : Identity));
                  tuples[2][3].add(resolve(0, newDefer, isFunction(onRejected) ? onRejected : Thrower));
                }).promise();
              },
              promise: function(obj) {
                return obj != null ? jQuery2.extend(obj, promise) : promise;
              }
            }, deferred = {};
            jQuery2.each(tuples, function(i, tuple) {
              var list = tuple[2], stateString = tuple[5];
              promise[tuple[1]] = list.add;
              if (stateString) {
                list.add(function() {
                  state = stateString;
                }, tuples[3 - i][2].disable, tuples[3 - i][3].disable, tuples[0][2].lock, tuples[0][3].lock);
              }
              list.add(tuple[3].fire);
              deferred[tuple[0]] = function() {
                deferred[tuple[0] + "With"](this === deferred ? void 0 : this, arguments);
                return this;
              };
              deferred[tuple[0] + "With"] = list.fireWith;
            });
            promise.promise(deferred);
            if (func) {
              func.call(deferred, deferred);
            }
            return deferred;
          },
          when: function(singleValue) {
            var remaining = arguments.length, i = remaining, resolveContexts = Array(i), resolveValues = slice.call(arguments), primary = jQuery2.Deferred(), updateFunc = function(i2) {
              return function(value) {
                resolveContexts[i2] = this;
                resolveValues[i2] = arguments.length > 1 ? slice.call(arguments) : value;
                if (!--remaining) {
                  primary.resolveWith(resolveContexts, resolveValues);
                }
              };
            };
            if (remaining <= 1) {
              adoptValue(singleValue, primary.done(updateFunc(i)).resolve, primary.reject, !remaining);
              if (primary.state() === "pending" || isFunction(resolveValues[i] && resolveValues[i].then)) {
                return primary.then();
              }
            }
            while (i--) {
              adoptValue(resolveValues[i], updateFunc(i), primary.reject);
            }
            return primary.promise();
          }
        });
        var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
        jQuery2.Deferred.exceptionHook = function(error, stack) {
          if (window2.console && window2.console.warn && error && rerrorNames.test(error.name)) {
            window2.console.warn("jQuery.Deferred exception: " + error.message, error.stack, stack);
          }
        };
        jQuery2.readyException = function(error) {
          window2.setTimeout(function() {
            throw error;
          });
        };
        var readyList = jQuery2.Deferred();
        jQuery2.fn.ready = function(fn) {
          readyList.then(fn).catch(function(error) {
            jQuery2.readyException(error);
          });
          return this;
        };
        jQuery2.extend({
          isReady: false,
          readyWait: 1,
          ready: function(wait) {
            if (wait === true ? --jQuery2.readyWait : jQuery2.isReady) {
              return;
            }
            jQuery2.isReady = true;
            if (wait !== true && --jQuery2.readyWait > 0) {
              return;
            }
            readyList.resolveWith(document2, [jQuery2]);
          }
        });
        jQuery2.ready.then = readyList.then;
        function completed() {
          document2.removeEventListener("DOMContentLoaded", completed);
          window2.removeEventListener("load", completed);
          jQuery2.ready();
        }
        if (document2.readyState === "complete" || document2.readyState !== "loading" && !document2.documentElement.doScroll) {
          window2.setTimeout(jQuery2.ready);
        } else {
          document2.addEventListener("DOMContentLoaded", completed);
          window2.addEventListener("load", completed);
        }
        var access = function(elems, fn, key, value, chainable, emptyGet, raw) {
          var i = 0, len = elems.length, bulk = key == null;
          if (toType(key) === "object") {
            chainable = true;
            for (i in key) {
              access(elems, fn, i, key[i], true, emptyGet, raw);
            }
          } else if (value !== void 0) {
            chainable = true;
            if (!isFunction(value)) {
              raw = true;
            }
            if (bulk) {
              if (raw) {
                fn.call(elems, value);
                fn = null;
              } else {
                bulk = fn;
                fn = function(elem, _key, value2) {
                  return bulk.call(jQuery2(elem), value2);
                };
              }
            }
            if (fn) {
              for (; i < len; i++) {
                fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
              }
            }
          }
          if (chainable) {
            return elems;
          }
          if (bulk) {
            return fn.call(elems);
          }
          return len ? fn(elems[0], key) : emptyGet;
        };
        var rmsPrefix = /^-ms-/, rdashAlpha = /-([a-z])/g;
        function fcamelCase(_all, letter) {
          return letter.toUpperCase();
        }
        function camelCase(string) {
          return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
        }
        var acceptData = function(owner) {
          return owner.nodeType === 1 || owner.nodeType === 9 || !+owner.nodeType;
        };
        function Data() {
          this.expando = jQuery2.expando + Data.uid++;
        }
        Data.uid = 1;
        Data.prototype = {
          cache: function(owner) {
            var value = owner[this.expando];
            if (!value) {
              value = {};
              if (acceptData(owner)) {
                if (owner.nodeType) {
                  owner[this.expando] = value;
                } else {
                  Object.defineProperty(owner, this.expando, {
                    value,
                    configurable: true
                  });
                }
              }
            }
            return value;
          },
          set: function(owner, data, value) {
            var prop, cache = this.cache(owner);
            if (typeof data === "string") {
              cache[camelCase(data)] = value;
            } else {
              for (prop in data) {
                cache[camelCase(prop)] = data[prop];
              }
            }
            return cache;
          },
          get: function(owner, key) {
            return key === void 0 ? this.cache(owner) : owner[this.expando] && owner[this.expando][camelCase(key)];
          },
          access: function(owner, key, value) {
            if (key === void 0 || key && typeof key === "string" && value === void 0) {
              return this.get(owner, key);
            }
            this.set(owner, key, value);
            return value !== void 0 ? value : key;
          },
          remove: function(owner, key) {
            var i, cache = owner[this.expando];
            if (cache === void 0) {
              return;
            }
            if (key !== void 0) {
              if (Array.isArray(key)) {
                key = key.map(camelCase);
              } else {
                key = camelCase(key);
                key = key in cache ? [key] : key.match(rnothtmlwhite) || [];
              }
              i = key.length;
              while (i--) {
                delete cache[key[i]];
              }
            }
            if (key === void 0 || jQuery2.isEmptyObject(cache)) {
              if (owner.nodeType) {
                owner[this.expando] = void 0;
              } else {
                delete owner[this.expando];
              }
            }
          },
          hasData: function(owner) {
            var cache = owner[this.expando];
            return cache !== void 0 && !jQuery2.isEmptyObject(cache);
          }
        };
        var dataPriv = new Data();
        var dataUser = new Data();
        var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, rmultiDash = /[A-Z]/g;
        function getData(data) {
          if (data === "true") {
            return true;
          }
          if (data === "false") {
            return false;
          }
          if (data === "null") {
            return null;
          }
          if (data === +data + "") {
            return +data;
          }
          if (rbrace.test(data)) {
            return JSON.parse(data);
          }
          return data;
        }
        function dataAttr(elem, key, data) {
          var name;
          if (data === void 0 && elem.nodeType === 1) {
            name = "data-" + key.replace(rmultiDash, "-$&").toLowerCase();
            data = elem.getAttribute(name);
            if (typeof data === "string") {
              try {
                data = getData(data);
              } catch (e) {
              }
              dataUser.set(elem, key, data);
            } else {
              data = void 0;
            }
          }
          return data;
        }
        jQuery2.extend({
          hasData: function(elem) {
            return dataUser.hasData(elem) || dataPriv.hasData(elem);
          },
          data: function(elem, name, data) {
            return dataUser.access(elem, name, data);
          },
          removeData: function(elem, name) {
            dataUser.remove(elem, name);
          },
          _data: function(elem, name, data) {
            return dataPriv.access(elem, name, data);
          },
          _removeData: function(elem, name) {
            dataPriv.remove(elem, name);
          }
        });
        jQuery2.fn.extend({
          data: function(key, value) {
            var i, name, data, elem = this[0], attrs = elem && elem.attributes;
            if (key === void 0) {
              if (this.length) {
                data = dataUser.get(elem);
                if (elem.nodeType === 1 && !dataPriv.get(elem, "hasDataAttrs")) {
                  i = attrs.length;
                  while (i--) {
                    if (attrs[i]) {
                      name = attrs[i].name;
                      if (name.indexOf("data-") === 0) {
                        name = camelCase(name.slice(5));
                        dataAttr(elem, name, data[name]);
                      }
                    }
                  }
                  dataPriv.set(elem, "hasDataAttrs", true);
                }
              }
              return data;
            }
            if (typeof key === "object") {
              return this.each(function() {
                dataUser.set(this, key);
              });
            }
            return access(this, function(value2) {
              var data2;
              if (elem && value2 === void 0) {
                data2 = dataUser.get(elem, key);
                if (data2 !== void 0) {
                  return data2;
                }
                data2 = dataAttr(elem, key);
                if (data2 !== void 0) {
                  return data2;
                }
                return;
              }
              this.each(function() {
                dataUser.set(this, key, value2);
              });
            }, null, value, arguments.length > 1, null, true);
          },
          removeData: function(key) {
            return this.each(function() {
              dataUser.remove(this, key);
            });
          }
        });
        jQuery2.extend({
          queue: function(elem, type, data) {
            var queue;
            if (elem) {
              type = (type || "fx") + "queue";
              queue = dataPriv.get(elem, type);
              if (data) {
                if (!queue || Array.isArray(data)) {
                  queue = dataPriv.access(elem, type, jQuery2.makeArray(data));
                } else {
                  queue.push(data);
                }
              }
              return queue || [];
            }
          },
          dequeue: function(elem, type) {
            type = type || "fx";
            var queue = jQuery2.queue(elem, type), startLength = queue.length, fn = queue.shift(), hooks = jQuery2._queueHooks(elem, type), next = function() {
              jQuery2.dequeue(elem, type);
            };
            if (fn === "inprogress") {
              fn = queue.shift();
              startLength--;
            }
            if (fn) {
              if (type === "fx") {
                queue.unshift("inprogress");
              }
              delete hooks.stop;
              fn.call(elem, next, hooks);
            }
            if (!startLength && hooks) {
              hooks.empty.fire();
            }
          },
          _queueHooks: function(elem, type) {
            var key = type + "queueHooks";
            return dataPriv.get(elem, key) || dataPriv.access(elem, key, {
              empty: jQuery2.Callbacks("once memory").add(function() {
                dataPriv.remove(elem, [type + "queue", key]);
              })
            });
          }
        });
        jQuery2.fn.extend({
          queue: function(type, data) {
            var setter = 2;
            if (typeof type !== "string") {
              data = type;
              type = "fx";
              setter--;
            }
            if (arguments.length < setter) {
              return jQuery2.queue(this[0], type);
            }
            return data === void 0 ? this : this.each(function() {
              var queue = jQuery2.queue(this, type, data);
              jQuery2._queueHooks(this, type);
              if (type === "fx" && queue[0] !== "inprogress") {
                jQuery2.dequeue(this, type);
              }
            });
          },
          dequeue: function(type) {
            return this.each(function() {
              jQuery2.dequeue(this, type);
            });
          },
          clearQueue: function(type) {
            return this.queue(type || "fx", []);
          },
          promise: function(type, obj) {
            var tmp, count = 1, defer = jQuery2.Deferred(), elements = this, i = this.length, resolve = function() {
              if (!--count) {
                defer.resolveWith(elements, [elements]);
              }
            };
            if (typeof type !== "string") {
              obj = type;
              type = void 0;
            }
            type = type || "fx";
            while (i--) {
              tmp = dataPriv.get(elements[i], type + "queueHooks");
              if (tmp && tmp.empty) {
                count++;
                tmp.empty.add(resolve);
              }
            }
            resolve();
            return defer.promise(obj);
          }
        });
        var pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source;
        var rcssNum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i");
        var cssExpand = ["Top", "Right", "Bottom", "Left"];
        var documentElement = document2.documentElement;
        var isAttached = function(elem) {
          return jQuery2.contains(elem.ownerDocument, elem);
        }, composed = { composed: true };
        if (documentElement.getRootNode) {
          isAttached = function(elem) {
            return jQuery2.contains(elem.ownerDocument, elem) || elem.getRootNode(composed) === elem.ownerDocument;
          };
        }
        var isHiddenWithinTree = function(elem, el) {
          elem = el || elem;
          return elem.style.display === "none" || elem.style.display === "" && isAttached(elem) && jQuery2.css(elem, "display") === "none";
        };
        function adjustCSS(elem, prop, valueParts, tween) {
          var adjusted, scale, maxIterations = 20, currentValue = tween ? function() {
            return tween.cur();
          } : function() {
            return jQuery2.css(elem, prop, "");
          }, initial = currentValue(), unit = valueParts && valueParts[3] || (jQuery2.cssNumber[prop] ? "" : "px"), initialInUnit = elem.nodeType && (jQuery2.cssNumber[prop] || unit !== "px" && +initial) && rcssNum.exec(jQuery2.css(elem, prop));
          if (initialInUnit && initialInUnit[3] !== unit) {
            initial = initial / 2;
            unit = unit || initialInUnit[3];
            initialInUnit = +initial || 1;
            while (maxIterations--) {
              jQuery2.style(elem, prop, initialInUnit + unit);
              if ((1 - scale) * (1 - (scale = currentValue() / initial || 0.5)) <= 0) {
                maxIterations = 0;
              }
              initialInUnit = initialInUnit / scale;
            }
            initialInUnit = initialInUnit * 2;
            jQuery2.style(elem, prop, initialInUnit + unit);
            valueParts = valueParts || [];
          }
          if (valueParts) {
            initialInUnit = +initialInUnit || +initial || 0;
            adjusted = valueParts[1] ? initialInUnit + (valueParts[1] + 1) * valueParts[2] : +valueParts[2];
            if (tween) {
              tween.unit = unit;
              tween.start = initialInUnit;
              tween.end = adjusted;
            }
          }
          return adjusted;
        }
        var defaultDisplayMap = {};
        function getDefaultDisplay(elem) {
          var temp, doc = elem.ownerDocument, nodeName2 = elem.nodeName, display = defaultDisplayMap[nodeName2];
          if (display) {
            return display;
          }
          temp = doc.body.appendChild(doc.createElement(nodeName2));
          display = jQuery2.css(temp, "display");
          temp.parentNode.removeChild(temp);
          if (display === "none") {
            display = "block";
          }
          defaultDisplayMap[nodeName2] = display;
          return display;
        }
        function showHide(elements, show) {
          var display, elem, values = [], index = 0, length = elements.length;
          for (; index < length; index++) {
            elem = elements[index];
            if (!elem.style) {
              continue;
            }
            display = elem.style.display;
            if (show) {
              if (display === "none") {
                values[index] = dataPriv.get(elem, "display") || null;
                if (!values[index]) {
                  elem.style.display = "";
                }
              }
              if (elem.style.display === "" && isHiddenWithinTree(elem)) {
                values[index] = getDefaultDisplay(elem);
              }
            } else {
              if (display !== "none") {
                values[index] = "none";
                dataPriv.set(elem, "display", display);
              }
            }
          }
          for (index = 0; index < length; index++) {
            if (values[index] != null) {
              elements[index].style.display = values[index];
            }
          }
          return elements;
        }
        jQuery2.fn.extend({
          show: function() {
            return showHide(this, true);
          },
          hide: function() {
            return showHide(this);
          },
          toggle: function(state) {
            if (typeof state === "boolean") {
              return state ? this.show() : this.hide();
            }
            return this.each(function() {
              if (isHiddenWithinTree(this)) {
                jQuery2(this).show();
              } else {
                jQuery2(this).hide();
              }
            });
          }
        });
        var rcheckableType = /^(?:checkbox|radio)$/i;
        var rtagName = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i;
        var rscriptType = /^$|^module$|\/(?:java|ecma)script/i;
        (function() {
          var fragment = document2.createDocumentFragment(), div = fragment.appendChild(document2.createElement("div")), input = document2.createElement("input");
          input.setAttribute("type", "radio");
          input.setAttribute("checked", "checked");
          input.setAttribute("name", "t");
          div.appendChild(input);
          support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked;
          div.innerHTML = "<textarea>x</textarea>";
          support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue;
          div.innerHTML = "<option></option>";
          support.option = !!div.lastChild;
        })();
        var wrapMap = {
          thead: [1, "<table>", "</table>"],
          col: [2, "<table><colgroup>", "</colgroup></table>"],
          tr: [2, "<table><tbody>", "</tbody></table>"],
          td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
          _default: [0, "", ""]
        };
        wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
        wrapMap.th = wrapMap.td;
        if (!support.option) {
          wrapMap.optgroup = wrapMap.option = [1, "<select multiple='multiple'>", "</select>"];
        }
        function getAll(context, tag) {
          var ret;
          if (typeof context.getElementsByTagName !== "undefined") {
            ret = context.getElementsByTagName(tag || "*");
          } else if (typeof context.querySelectorAll !== "undefined") {
            ret = context.querySelectorAll(tag || "*");
          } else {
            ret = [];
          }
          if (tag === void 0 || tag && nodeName(context, tag)) {
            return jQuery2.merge([context], ret);
          }
          return ret;
        }
        function setGlobalEval(elems, refElements) {
          var i = 0, l = elems.length;
          for (; i < l; i++) {
            dataPriv.set(elems[i], "globalEval", !refElements || dataPriv.get(refElements[i], "globalEval"));
          }
        }
        var rhtml = /<|&#?\w+;/;
        function buildFragment(elems, context, scripts, selection, ignored) {
          var elem, tmp, tag, wrap, attached, j, fragment = context.createDocumentFragment(), nodes = [], i = 0, l = elems.length;
          for (; i < l; i++) {
            elem = elems[i];
            if (elem || elem === 0) {
              if (toType(elem) === "object") {
                jQuery2.merge(nodes, elem.nodeType ? [elem] : elem);
              } else if (!rhtml.test(elem)) {
                nodes.push(context.createTextNode(elem));
              } else {
                tmp = tmp || fragment.appendChild(context.createElement("div"));
                tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
                wrap = wrapMap[tag] || wrapMap._default;
                tmp.innerHTML = wrap[1] + jQuery2.htmlPrefilter(elem) + wrap[2];
                j = wrap[0];
                while (j--) {
                  tmp = tmp.lastChild;
                }
                jQuery2.merge(nodes, tmp.childNodes);
                tmp = fragment.firstChild;
                tmp.textContent = "";
              }
            }
          }
          fragment.textContent = "";
          i = 0;
          while (elem = nodes[i++]) {
            if (selection && jQuery2.inArray(elem, selection) > -1) {
              if (ignored) {
                ignored.push(elem);
              }
              continue;
            }
            attached = isAttached(elem);
            tmp = getAll(fragment.appendChild(elem), "script");
            if (attached) {
              setGlobalEval(tmp);
            }
            if (scripts) {
              j = 0;
              while (elem = tmp[j++]) {
                if (rscriptType.test(elem.type || "")) {
                  scripts.push(elem);
                }
              }
            }
          }
          return fragment;
        }
        var rtypenamespace = /^([^.]*)(?:\.(.+)|)/;
        function returnTrue() {
          return true;
        }
        function returnFalse() {
          return false;
        }
        function expectSync(elem, type) {
          return elem === safeActiveElement() === (type === "focus");
        }
        function safeActiveElement() {
          try {
            return document2.activeElement;
          } catch (err) {
          }
        }
        function on(elem, types, selector, data, fn, one) {
          var origFn, type;
          if (typeof types === "object") {
            if (typeof selector !== "string") {
              data = data || selector;
              selector = void 0;
            }
            for (type in types) {
              on(elem, type, selector, data, types[type], one);
            }
            return elem;
          }
          if (data == null && fn == null) {
            fn = selector;
            data = selector = void 0;
          } else if (fn == null) {
            if (typeof selector === "string") {
              fn = data;
              data = void 0;
            } else {
              fn = data;
              data = selector;
              selector = void 0;
            }
          }
          if (fn === false) {
            fn = returnFalse;
          } else if (!fn) {
            return elem;
          }
          if (one === 1) {
            origFn = fn;
            fn = function(event) {
              jQuery2().off(event);
              return origFn.apply(this, arguments);
            };
            fn.guid = origFn.guid || (origFn.guid = jQuery2.guid++);
          }
          return elem.each(function() {
            jQuery2.event.add(this, types, fn, data, selector);
          });
        }
        jQuery2.event = {
          global: {},
          add: function(elem, types, handler, data, selector) {
            var handleObjIn, eventHandle, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = dataPriv.get(elem);
            if (!acceptData(elem)) {
              return;
            }
            if (handler.handler) {
              handleObjIn = handler;
              handler = handleObjIn.handler;
              selector = handleObjIn.selector;
            }
            if (selector) {
              jQuery2.find.matchesSelector(documentElement, selector);
            }
            if (!handler.guid) {
              handler.guid = jQuery2.guid++;
            }
            if (!(events = elemData.events)) {
              events = elemData.events = /* @__PURE__ */ Object.create(null);
            }
            if (!(eventHandle = elemData.handle)) {
              eventHandle = elemData.handle = function(e) {
                return typeof jQuery2 !== "undefined" && jQuery2.event.triggered !== e.type ? jQuery2.event.dispatch.apply(elem, arguments) : void 0;
              };
            }
            types = (types || "").match(rnothtmlwhite) || [""];
            t = types.length;
            while (t--) {
              tmp = rtypenamespace.exec(types[t]) || [];
              type = origType = tmp[1];
              namespaces = (tmp[2] || "").split(".").sort();
              if (!type) {
                continue;
              }
              special = jQuery2.event.special[type] || {};
              type = (selector ? special.delegateType : special.bindType) || type;
              special = jQuery2.event.special[type] || {};
              handleObj = jQuery2.extend({
                type,
                origType,
                data,
                handler,
                guid: handler.guid,
                selector,
                needsContext: selector && jQuery2.expr.match.needsContext.test(selector),
                namespace: namespaces.join(".")
              }, handleObjIn);
              if (!(handlers = events[type])) {
                handlers = events[type] = [];
                handlers.delegateCount = 0;
                if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {
                  if (elem.addEventListener) {
                    elem.addEventListener(type, eventHandle);
                  }
                }
              }
              if (special.add) {
                special.add.call(elem, handleObj);
                if (!handleObj.handler.guid) {
                  handleObj.handler.guid = handler.guid;
                }
              }
              if (selector) {
                handlers.splice(handlers.delegateCount++, 0, handleObj);
              } else {
                handlers.push(handleObj);
              }
              jQuery2.event.global[type] = true;
            }
          },
          remove: function(elem, types, handler, selector, mappedTypes) {
            var j, origCount, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = dataPriv.hasData(elem) && dataPriv.get(elem);
            if (!elemData || !(events = elemData.events)) {
              return;
            }
            types = (types || "").match(rnothtmlwhite) || [""];
            t = types.length;
            while (t--) {
              tmp = rtypenamespace.exec(types[t]) || [];
              type = origType = tmp[1];
              namespaces = (tmp[2] || "").split(".").sort();
              if (!type) {
                for (type in events) {
                  jQuery2.event.remove(elem, type + types[t], handler, selector, true);
                }
                continue;
              }
              special = jQuery2.event.special[type] || {};
              type = (selector ? special.delegateType : special.bindType) || type;
              handlers = events[type] || [];
              tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");
              origCount = j = handlers.length;
              while (j--) {
                handleObj = handlers[j];
                if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!tmp || tmp.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
                  handlers.splice(j, 1);
                  if (handleObj.selector) {
                    handlers.delegateCount--;
                  }
                  if (special.remove) {
                    special.remove.call(elem, handleObj);
                  }
                }
              }
              if (origCount && !handlers.length) {
                if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {
                  jQuery2.removeEvent(elem, type, elemData.handle);
                }
                delete events[type];
              }
            }
            if (jQuery2.isEmptyObject(events)) {
              dataPriv.remove(elem, "handle events");
            }
          },
          dispatch: function(nativeEvent) {
            var i, j, ret, matched, handleObj, handlerQueue, args = new Array(arguments.length), event = jQuery2.event.fix(nativeEvent), handlers = (dataPriv.get(this, "events") || /* @__PURE__ */ Object.create(null))[event.type] || [], special = jQuery2.event.special[event.type] || {};
            args[0] = event;
            for (i = 1; i < arguments.length; i++) {
              args[i] = arguments[i];
            }
            event.delegateTarget = this;
            if (special.preDispatch && special.preDispatch.call(this, event) === false) {
              return;
            }
            handlerQueue = jQuery2.event.handlers.call(this, event, handlers);
            i = 0;
            while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
              event.currentTarget = matched.elem;
              j = 0;
              while ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped()) {
                if (!event.rnamespace || handleObj.namespace === false || event.rnamespace.test(handleObj.namespace)) {
                  event.handleObj = handleObj;
                  event.data = handleObj.data;
                  ret = ((jQuery2.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);
                  if (ret !== void 0) {
                    if ((event.result = ret) === false) {
                      event.preventDefault();
                      event.stopPropagation();
                    }
                  }
                }
              }
            }
            if (special.postDispatch) {
              special.postDispatch.call(this, event);
            }
            return event.result;
          },
          handlers: function(event, handlers) {
            var i, handleObj, sel, matchedHandlers, matchedSelectors, handlerQueue = [], delegateCount = handlers.delegateCount, cur = event.target;
            if (delegateCount && cur.nodeType && !(event.type === "click" && event.button >= 1)) {
              for (; cur !== this; cur = cur.parentNode || this) {
                if (cur.nodeType === 1 && !(event.type === "click" && cur.disabled === true)) {
                  matchedHandlers = [];
                  matchedSelectors = {};
                  for (i = 0; i < delegateCount; i++) {
                    handleObj = handlers[i];
                    sel = handleObj.selector + " ";
                    if (matchedSelectors[sel] === void 0) {
                      matchedSelectors[sel] = handleObj.needsContext ? jQuery2(sel, this).index(cur) > -1 : jQuery2.find(sel, this, null, [cur]).length;
                    }
                    if (matchedSelectors[sel]) {
                      matchedHandlers.push(handleObj);
                    }
                  }
                  if (matchedHandlers.length) {
                    handlerQueue.push({ elem: cur, handlers: matchedHandlers });
                  }
                }
              }
            }
            cur = this;
            if (delegateCount < handlers.length) {
              handlerQueue.push({ elem: cur, handlers: handlers.slice(delegateCount) });
            }
            return handlerQueue;
          },
          addProp: function(name, hook) {
            Object.defineProperty(jQuery2.Event.prototype, name, {
              enumerable: true,
              configurable: true,
              get: isFunction(hook) ? function() {
                if (this.originalEvent) {
                  return hook(this.originalEvent);
                }
              } : function() {
                if (this.originalEvent) {
                  return this.originalEvent[name];
                }
              },
              set: function(value) {
                Object.defineProperty(this, name, {
                  enumerable: true,
                  configurable: true,
                  writable: true,
                  value
                });
              }
            });
          },
          fix: function(originalEvent) {
            return originalEvent[jQuery2.expando] ? originalEvent : new jQuery2.Event(originalEvent);
          },
          special: {
            load: {
              noBubble: true
            },
            click: {
              setup: function(data) {
                var el = this || data;
                if (rcheckableType.test(el.type) && el.click && nodeName(el, "input")) {
                  leverageNative(el, "click", returnTrue);
                }
                return false;
              },
              trigger: function(data) {
                var el = this || data;
                if (rcheckableType.test(el.type) && el.click && nodeName(el, "input")) {
                  leverageNative(el, "click");
                }
                return true;
              },
              _default: function(event) {
                var target = event.target;
                return rcheckableType.test(target.type) && target.click && nodeName(target, "input") && dataPriv.get(target, "click") || nodeName(target, "a");
              }
            },
            beforeunload: {
              postDispatch: function(event) {
                if (event.result !== void 0 && event.originalEvent) {
                  event.originalEvent.returnValue = event.result;
                }
              }
            }
          }
        };
        function leverageNative(el, type, expectSync2) {
          if (!expectSync2) {
            if (dataPriv.get(el, type) === void 0) {
              jQuery2.event.add(el, type, returnTrue);
            }
            return;
          }
          dataPriv.set(el, type, false);
          jQuery2.event.add(el, type, {
            namespace: false,
            handler: function(event) {
              var notAsync, result, saved = dataPriv.get(this, type);
              if (event.isTrigger & 1 && this[type]) {
                if (!saved.length) {
                  saved = slice.call(arguments);
                  dataPriv.set(this, type, saved);
                  notAsync = expectSync2(this, type);
                  this[type]();
                  result = dataPriv.get(this, type);
                  if (saved !== result || notAsync) {
                    dataPriv.set(this, type, false);
                  } else {
                    result = {};
                  }
                  if (saved !== result) {
                    event.stopImmediatePropagation();
                    event.preventDefault();
                    return result && result.value;
                  }
                } else if ((jQuery2.event.special[type] || {}).delegateType) {
                  event.stopPropagation();
                }
              } else if (saved.length) {
                dataPriv.set(this, type, {
                  value: jQuery2.event.trigger(jQuery2.extend(saved[0], jQuery2.Event.prototype), saved.slice(1), this)
                });
                event.stopImmediatePropagation();
              }
            }
          });
        }
        jQuery2.removeEvent = function(elem, type, handle) {
          if (elem.removeEventListener) {
            elem.removeEventListener(type, handle);
          }
        };
        jQuery2.Event = function(src, props) {
          if (!(this instanceof jQuery2.Event)) {
            return new jQuery2.Event(src, props);
          }
          if (src && src.type) {
            this.originalEvent = src;
            this.type = src.type;
            this.isDefaultPrevented = src.defaultPrevented || src.defaultPrevented === void 0 && src.returnValue === false ? returnTrue : returnFalse;
            this.target = src.target && src.target.nodeType === 3 ? src.target.parentNode : src.target;
            this.currentTarget = src.currentTarget;
            this.relatedTarget = src.relatedTarget;
          } else {
            this.type = src;
          }
          if (props) {
            jQuery2.extend(this, props);
          }
          this.timeStamp = src && src.timeStamp || Date.now();
          this[jQuery2.expando] = true;
        };
        jQuery2.Event.prototype = {
          constructor: jQuery2.Event,
          isDefaultPrevented: returnFalse,
          isPropagationStopped: returnFalse,
          isImmediatePropagationStopped: returnFalse,
          isSimulated: false,
          preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = returnTrue;
            if (e && !this.isSimulated) {
              e.preventDefault();
            }
          },
          stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = returnTrue;
            if (e && !this.isSimulated) {
              e.stopPropagation();
            }
          },
          stopImmediatePropagation: function() {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = returnTrue;
            if (e && !this.isSimulated) {
              e.stopImmediatePropagation();
            }
            this.stopPropagation();
          }
        };
        jQuery2.each({
          altKey: true,
          bubbles: true,
          cancelable: true,
          changedTouches: true,
          ctrlKey: true,
          detail: true,
          eventPhase: true,
          metaKey: true,
          pageX: true,
          pageY: true,
          shiftKey: true,
          view: true,
          "char": true,
          code: true,
          charCode: true,
          key: true,
          keyCode: true,
          button: true,
          buttons: true,
          clientX: true,
          clientY: true,
          offsetX: true,
          offsetY: true,
          pointerId: true,
          pointerType: true,
          screenX: true,
          screenY: true,
          targetTouches: true,
          toElement: true,
          touches: true,
          which: true
        }, jQuery2.event.addProp);
        jQuery2.each({ focus: "focusin", blur: "focusout" }, function(type, delegateType) {
          jQuery2.event.special[type] = {
            setup: function() {
              leverageNative(this, type, expectSync);
              return false;
            },
            trigger: function() {
              leverageNative(this, type);
              return true;
            },
            _default: function() {
              return true;
            },
            delegateType
          };
        });
        jQuery2.each({
          mouseenter: "mouseover",
          mouseleave: "mouseout",
          pointerenter: "pointerover",
          pointerleave: "pointerout"
        }, function(orig, fix) {
          jQuery2.event.special[orig] = {
            delegateType: fix,
            bindType: fix,
            handle: function(event) {
              var ret, target = this, related = event.relatedTarget, handleObj = event.handleObj;
              if (!related || related !== target && !jQuery2.contains(target, related)) {
                event.type = handleObj.origType;
                ret = handleObj.handler.apply(this, arguments);
                event.type = fix;
              }
              return ret;
            }
          };
        });
        jQuery2.fn.extend({
          on: function(types, selector, data, fn) {
            return on(this, types, selector, data, fn);
          },
          one: function(types, selector, data, fn) {
            return on(this, types, selector, data, fn, 1);
          },
          off: function(types, selector, fn) {
            var handleObj, type;
            if (types && types.preventDefault && types.handleObj) {
              handleObj = types.handleObj;
              jQuery2(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler);
              return this;
            }
            if (typeof types === "object") {
              for (type in types) {
                this.off(type, selector, types[type]);
              }
              return this;
            }
            if (selector === false || typeof selector === "function") {
              fn = selector;
              selector = void 0;
            }
            if (fn === false) {
              fn = returnFalse;
            }
            return this.each(function() {
              jQuery2.event.remove(this, types, fn, selector);
            });
          }
        });
        var rnoInnerhtml = /<script|<style|<link/i, rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i, rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
        function manipulationTarget(elem, content) {
          if (nodeName(elem, "table") && nodeName(content.nodeType !== 11 ? content : content.firstChild, "tr")) {
            return jQuery2(elem).children("tbody")[0] || elem;
          }
          return elem;
        }
        function disableScript(elem) {
          elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
          return elem;
        }
        function restoreScript(elem) {
          if ((elem.type || "").slice(0, 5) === "true/") {
            elem.type = elem.type.slice(5);
          } else {
            elem.removeAttribute("type");
          }
          return elem;
        }
        function cloneCopyEvent(src, dest) {
          var i, l, type, pdataOld, udataOld, udataCur, events;
          if (dest.nodeType !== 1) {
            return;
          }
          if (dataPriv.hasData(src)) {
            pdataOld = dataPriv.get(src);
            events = pdataOld.events;
            if (events) {
              dataPriv.remove(dest, "handle events");
              for (type in events) {
                for (i = 0, l = events[type].length; i < l; i++) {
                  jQuery2.event.add(dest, type, events[type][i]);
                }
              }
            }
          }
          if (dataUser.hasData(src)) {
            udataOld = dataUser.access(src);
            udataCur = jQuery2.extend({}, udataOld);
            dataUser.set(dest, udataCur);
          }
        }
        function fixInput(src, dest) {
          var nodeName2 = dest.nodeName.toLowerCase();
          if (nodeName2 === "input" && rcheckableType.test(src.type)) {
            dest.checked = src.checked;
          } else if (nodeName2 === "input" || nodeName2 === "textarea") {
            dest.defaultValue = src.defaultValue;
          }
        }
        function domManip(collection, args, callback, ignored) {
          args = flat(args);
          var fragment, first, scripts, hasScripts, node, doc, i = 0, l = collection.length, iNoClone = l - 1, value = args[0], valueIsFunction = isFunction(value);
          if (valueIsFunction || l > 1 && typeof value === "string" && !support.checkClone && rchecked.test(value)) {
            return collection.each(function(index) {
              var self = collection.eq(index);
              if (valueIsFunction) {
                args[0] = value.call(this, index, self.html());
              }
              domManip(self, args, callback, ignored);
            });
          }
          if (l) {
            fragment = buildFragment(args, collection[0].ownerDocument, false, collection, ignored);
            first = fragment.firstChild;
            if (fragment.childNodes.length === 1) {
              fragment = first;
            }
            if (first || ignored) {
              scripts = jQuery2.map(getAll(fragment, "script"), disableScript);
              hasScripts = scripts.length;
              for (; i < l; i++) {
                node = fragment;
                if (i !== iNoClone) {
                  node = jQuery2.clone(node, true, true);
                  if (hasScripts) {
                    jQuery2.merge(scripts, getAll(node, "script"));
                  }
                }
                callback.call(collection[i], node, i);
              }
              if (hasScripts) {
                doc = scripts[scripts.length - 1].ownerDocument;
                jQuery2.map(scripts, restoreScript);
                for (i = 0; i < hasScripts; i++) {
                  node = scripts[i];
                  if (rscriptType.test(node.type || "") && !dataPriv.access(node, "globalEval") && jQuery2.contains(doc, node)) {
                    if (node.src && (node.type || "").toLowerCase() !== "module") {
                      if (jQuery2._evalUrl && !node.noModule) {
                        jQuery2._evalUrl(node.src, {
                          nonce: node.nonce || node.getAttribute("nonce")
                        }, doc);
                      }
                    } else {
                      DOMEval(node.textContent.replace(rcleanScript, ""), node, doc);
                    }
                  }
                }
              }
            }
          }
          return collection;
        }
        function remove(elem, selector, keepData) {
          var node, nodes = selector ? jQuery2.filter(selector, elem) : elem, i = 0;
          for (; (node = nodes[i]) != null; i++) {
            if (!keepData && node.nodeType === 1) {
              jQuery2.cleanData(getAll(node));
            }
            if (node.parentNode) {
              if (keepData && isAttached(node)) {
                setGlobalEval(getAll(node, "script"));
              }
              node.parentNode.removeChild(node);
            }
          }
          return elem;
        }
        jQuery2.extend({
          htmlPrefilter: function(html) {
            return html;
          },
          clone: function(elem, dataAndEvents, deepDataAndEvents) {
            var i, l, srcElements, destElements, clone = elem.cloneNode(true), inPage = isAttached(elem);
            if (!support.noCloneChecked && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery2.isXMLDoc(elem)) {
              destElements = getAll(clone);
              srcElements = getAll(elem);
              for (i = 0, l = srcElements.length; i < l; i++) {
                fixInput(srcElements[i], destElements[i]);
              }
            }
            if (dataAndEvents) {
              if (deepDataAndEvents) {
                srcElements = srcElements || getAll(elem);
                destElements = destElements || getAll(clone);
                for (i = 0, l = srcElements.length; i < l; i++) {
                  cloneCopyEvent(srcElements[i], destElements[i]);
                }
              } else {
                cloneCopyEvent(elem, clone);
              }
            }
            destElements = getAll(clone, "script");
            if (destElements.length > 0) {
              setGlobalEval(destElements, !inPage && getAll(elem, "script"));
            }
            return clone;
          },
          cleanData: function(elems) {
            var data, elem, type, special = jQuery2.event.special, i = 0;
            for (; (elem = elems[i]) !== void 0; i++) {
              if (acceptData(elem)) {
                if (data = elem[dataPriv.expando]) {
                  if (data.events) {
                    for (type in data.events) {
                      if (special[type]) {
                        jQuery2.event.remove(elem, type);
                      } else {
                        jQuery2.removeEvent(elem, type, data.handle);
                      }
                    }
                  }
                  elem[dataPriv.expando] = void 0;
                }
                if (elem[dataUser.expando]) {
                  elem[dataUser.expando] = void 0;
                }
              }
            }
          }
        });
        jQuery2.fn.extend({
          detach: function(selector) {
            return remove(this, selector, true);
          },
          remove: function(selector) {
            return remove(this, selector);
          },
          text: function(value) {
            return access(this, function(value2) {
              return value2 === void 0 ? jQuery2.text(this) : this.empty().each(function() {
                if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                  this.textContent = value2;
                }
              });
            }, null, value, arguments.length);
          },
          append: function() {
            return domManip(this, arguments, function(elem) {
              if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                var target = manipulationTarget(this, elem);
                target.appendChild(elem);
              }
            });
          },
          prepend: function() {
            return domManip(this, arguments, function(elem) {
              if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                var target = manipulationTarget(this, elem);
                target.insertBefore(elem, target.firstChild);
              }
            });
          },
          before: function() {
            return domManip(this, arguments, function(elem) {
              if (this.parentNode) {
                this.parentNode.insertBefore(elem, this);
              }
            });
          },
          after: function() {
            return domManip(this, arguments, function(elem) {
              if (this.parentNode) {
                this.parentNode.insertBefore(elem, this.nextSibling);
              }
            });
          },
          empty: function() {
            var elem, i = 0;
            for (; (elem = this[i]) != null; i++) {
              if (elem.nodeType === 1) {
                jQuery2.cleanData(getAll(elem, false));
                elem.textContent = "";
              }
            }
            return this;
          },
          clone: function(dataAndEvents, deepDataAndEvents) {
            dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
            deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
            return this.map(function() {
              return jQuery2.clone(this, dataAndEvents, deepDataAndEvents);
            });
          },
          html: function(value) {
            return access(this, function(value2) {
              var elem = this[0] || {}, i = 0, l = this.length;
              if (value2 === void 0 && elem.nodeType === 1) {
                return elem.innerHTML;
              }
              if (typeof value2 === "string" && !rnoInnerhtml.test(value2) && !wrapMap[(rtagName.exec(value2) || ["", ""])[1].toLowerCase()]) {
                value2 = jQuery2.htmlPrefilter(value2);
                try {
                  for (; i < l; i++) {
                    elem = this[i] || {};
                    if (elem.nodeType === 1) {
                      jQuery2.cleanData(getAll(elem, false));
                      elem.innerHTML = value2;
                    }
                  }
                  elem = 0;
                } catch (e) {
                }
              }
              if (elem) {
                this.empty().append(value2);
              }
            }, null, value, arguments.length);
          },
          replaceWith: function() {
            var ignored = [];
            return domManip(this, arguments, function(elem) {
              var parent = this.parentNode;
              if (jQuery2.inArray(this, ignored) < 0) {
                jQuery2.cleanData(getAll(this));
                if (parent) {
                  parent.replaceChild(elem, this);
                }
              }
            }, ignored);
          }
        });
        jQuery2.each({
          appendTo: "append",
          prependTo: "prepend",
          insertBefore: "before",
          insertAfter: "after",
          replaceAll: "replaceWith"
        }, function(name, original) {
          jQuery2.fn[name] = function(selector) {
            var elems, ret = [], insert = jQuery2(selector), last = insert.length - 1, i = 0;
            for (; i <= last; i++) {
              elems = i === last ? this : this.clone(true);
              jQuery2(insert[i])[original](elems);
              push.apply(ret, elems.get());
            }
            return this.pushStack(ret);
          };
        });
        var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");
        var getStyles = function(elem) {
          var view = elem.ownerDocument.defaultView;
          if (!view || !view.opener) {
            view = window2;
          }
          return view.getComputedStyle(elem);
        };
        var swap = function(elem, options, callback) {
          var ret, name, old = {};
          for (name in options) {
            old[name] = elem.style[name];
            elem.style[name] = options[name];
          }
          ret = callback.call(elem);
          for (name in options) {
            elem.style[name] = old[name];
          }
          return ret;
        };
        var rboxStyle = new RegExp(cssExpand.join("|"), "i");
        (function() {
          function computeStyleTests() {
            if (!div) {
              return;
            }
            container.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0";
            div.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%";
            documentElement.appendChild(container).appendChild(div);
            var divStyle = window2.getComputedStyle(div);
            pixelPositionVal = divStyle.top !== "1%";
            reliableMarginLeftVal = roundPixelMeasures(divStyle.marginLeft) === 12;
            div.style.right = "60%";
            pixelBoxStylesVal = roundPixelMeasures(divStyle.right) === 36;
            boxSizingReliableVal = roundPixelMeasures(divStyle.width) === 36;
            div.style.position = "absolute";
            scrollboxSizeVal = roundPixelMeasures(div.offsetWidth / 3) === 12;
            documentElement.removeChild(container);
            div = null;
          }
          function roundPixelMeasures(measure) {
            return Math.round(parseFloat(measure));
          }
          var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal, reliableTrDimensionsVal, reliableMarginLeftVal, container = document2.createElement("div"), div = document2.createElement("div");
          if (!div.style) {
            return;
          }
          div.style.backgroundClip = "content-box";
          div.cloneNode(true).style.backgroundClip = "";
          support.clearCloneStyle = div.style.backgroundClip === "content-box";
          jQuery2.extend(support, {
            boxSizingReliable: function() {
              computeStyleTests();
              return boxSizingReliableVal;
            },
            pixelBoxStyles: function() {
              computeStyleTests();
              return pixelBoxStylesVal;
            },
            pixelPosition: function() {
              computeStyleTests();
              return pixelPositionVal;
            },
            reliableMarginLeft: function() {
              computeStyleTests();
              return reliableMarginLeftVal;
            },
            scrollboxSize: function() {
              computeStyleTests();
              return scrollboxSizeVal;
            },
            reliableTrDimensions: function() {
              var table, tr, trChild, trStyle;
              if (reliableTrDimensionsVal == null) {
                table = document2.createElement("table");
                tr = document2.createElement("tr");
                trChild = document2.createElement("div");
                table.style.cssText = "position:absolute;left:-11111px;border-collapse:separate";
                tr.style.cssText = "border:1px solid";
                tr.style.height = "1px";
                trChild.style.height = "9px";
                trChild.style.display = "block";
                documentElement.appendChild(table).appendChild(tr).appendChild(trChild);
                trStyle = window2.getComputedStyle(tr);
                reliableTrDimensionsVal = parseInt(trStyle.height, 10) + parseInt(trStyle.borderTopWidth, 10) + parseInt(trStyle.borderBottomWidth, 10) === tr.offsetHeight;
                documentElement.removeChild(table);
              }
              return reliableTrDimensionsVal;
            }
          });
        })();
        function curCSS(elem, name, computed) {
          var width, minWidth, maxWidth, ret, style = elem.style;
          computed = computed || getStyles(elem);
          if (computed) {
            ret = computed.getPropertyValue(name) || computed[name];
            if (ret === "" && !isAttached(elem)) {
              ret = jQuery2.style(elem, name);
            }
            if (!support.pixelBoxStyles() && rnumnonpx.test(ret) && rboxStyle.test(name)) {
              width = style.width;
              minWidth = style.minWidth;
              maxWidth = style.maxWidth;
              style.minWidth = style.maxWidth = style.width = ret;
              ret = computed.width;
              style.width = width;
              style.minWidth = minWidth;
              style.maxWidth = maxWidth;
            }
          }
          return ret !== void 0 ? ret + "" : ret;
        }
        function addGetHookIf(conditionFn, hookFn) {
          return {
            get: function() {
              if (conditionFn()) {
                delete this.get;
                return;
              }
              return (this.get = hookFn).apply(this, arguments);
            }
          };
        }
        var cssPrefixes = ["Webkit", "Moz", "ms"], emptyStyle = document2.createElement("div").style, vendorProps = {};
        function vendorPropName(name) {
          var capName = name[0].toUpperCase() + name.slice(1), i = cssPrefixes.length;
          while (i--) {
            name = cssPrefixes[i] + capName;
            if (name in emptyStyle) {
              return name;
            }
          }
        }
        function finalPropName(name) {
          var final = jQuery2.cssProps[name] || vendorProps[name];
          if (final) {
            return final;
          }
          if (name in emptyStyle) {
            return name;
          }
          return vendorProps[name] = vendorPropName(name) || name;
        }
        var rdisplayswap = /^(none|table(?!-c[ea]).+)/, rcustomProp = /^--/, cssShow = { position: "absolute", visibility: "hidden", display: "block" }, cssNormalTransform = {
          letterSpacing: "0",
          fontWeight: "400"
        };
        function setPositiveNumber(_elem, value, subtract) {
          var matches = rcssNum.exec(value);
          return matches ? Math.max(0, matches[2] - (subtract || 0)) + (matches[3] || "px") : value;
        }
        function boxModelAdjustment(elem, dimension, box, isBorderBox, styles, computedVal) {
          var i = dimension === "width" ? 1 : 0, extra = 0, delta = 0;
          if (box === (isBorderBox ? "border" : "content")) {
            return 0;
          }
          for (; i < 4; i += 2) {
            if (box === "margin") {
              delta += jQuery2.css(elem, box + cssExpand[i], true, styles);
            }
            if (!isBorderBox) {
              delta += jQuery2.css(elem, "padding" + cssExpand[i], true, styles);
              if (box !== "padding") {
                delta += jQuery2.css(elem, "border" + cssExpand[i] + "Width", true, styles);
              } else {
                extra += jQuery2.css(elem, "border" + cssExpand[i] + "Width", true, styles);
              }
            } else {
              if (box === "content") {
                delta -= jQuery2.css(elem, "padding" + cssExpand[i], true, styles);
              }
              if (box !== "margin") {
                delta -= jQuery2.css(elem, "border" + cssExpand[i] + "Width", true, styles);
              }
            }
          }
          if (!isBorderBox && computedVal >= 0) {
            delta += Math.max(0, Math.ceil(elem["offset" + dimension[0].toUpperCase() + dimension.slice(1)] - computedVal - delta - extra - 0.5)) || 0;
          }
          return delta;
        }
        function getWidthOrHeight(elem, dimension, extra) {
          var styles = getStyles(elem), boxSizingNeeded = !support.boxSizingReliable() || extra, isBorderBox = boxSizingNeeded && jQuery2.css(elem, "boxSizing", false, styles) === "border-box", valueIsBorderBox = isBorderBox, val = curCSS(elem, dimension, styles), offsetProp = "offset" + dimension[0].toUpperCase() + dimension.slice(1);
          if (rnumnonpx.test(val)) {
            if (!extra) {
              return val;
            }
            val = "auto";
          }
          if ((!support.boxSizingReliable() && isBorderBox || !support.reliableTrDimensions() && nodeName(elem, "tr") || val === "auto" || !parseFloat(val) && jQuery2.css(elem, "display", false, styles) === "inline") && elem.getClientRects().length) {
            isBorderBox = jQuery2.css(elem, "boxSizing", false, styles) === "border-box";
            valueIsBorderBox = offsetProp in elem;
            if (valueIsBorderBox) {
              val = elem[offsetProp];
            }
          }
          val = parseFloat(val) || 0;
          return val + boxModelAdjustment(elem, dimension, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles, val) + "px";
        }
        jQuery2.extend({
          cssHooks: {
            opacity: {
              get: function(elem, computed) {
                if (computed) {
                  var ret = curCSS(elem, "opacity");
                  return ret === "" ? "1" : ret;
                }
              }
            }
          },
          cssNumber: {
            "animationIterationCount": true,
            "columnCount": true,
            "fillOpacity": true,
            "flexGrow": true,
            "flexShrink": true,
            "fontWeight": true,
            "gridArea": true,
            "gridColumn": true,
            "gridColumnEnd": true,
            "gridColumnStart": true,
            "gridRow": true,
            "gridRowEnd": true,
            "gridRowStart": true,
            "lineHeight": true,
            "opacity": true,
            "order": true,
            "orphans": true,
            "widows": true,
            "zIndex": true,
            "zoom": true
          },
          cssProps: {},
          style: function(elem, name, value, extra) {
            if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
              return;
            }
            var ret, type, hooks, origName = camelCase(name), isCustomProp = rcustomProp.test(name), style = elem.style;
            if (!isCustomProp) {
              name = finalPropName(origName);
            }
            hooks = jQuery2.cssHooks[name] || jQuery2.cssHooks[origName];
            if (value !== void 0) {
              type = typeof value;
              if (type === "string" && (ret = rcssNum.exec(value)) && ret[1]) {
                value = adjustCSS(elem, name, ret);
                type = "number";
              }
              if (value == null || value !== value) {
                return;
              }
              if (type === "number" && !isCustomProp) {
                value += ret && ret[3] || (jQuery2.cssNumber[origName] ? "" : "px");
              }
              if (!support.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
                style[name] = "inherit";
              }
              if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value, extra)) !== void 0) {
                if (isCustomProp) {
                  style.setProperty(name, value);
                } else {
                  style[name] = value;
                }
              }
            } else {
              if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== void 0) {
                return ret;
              }
              return style[name];
            }
          },
          css: function(elem, name, extra, styles) {
            var val, num, hooks, origName = camelCase(name), isCustomProp = rcustomProp.test(name);
            if (!isCustomProp) {
              name = finalPropName(origName);
            }
            hooks = jQuery2.cssHooks[name] || jQuery2.cssHooks[origName];
            if (hooks && "get" in hooks) {
              val = hooks.get(elem, true, extra);
            }
            if (val === void 0) {
              val = curCSS(elem, name, styles);
            }
            if (val === "normal" && name in cssNormalTransform) {
              val = cssNormalTransform[name];
            }
            if (extra === "" || extra) {
              num = parseFloat(val);
              return extra === true || isFinite(num) ? num || 0 : val;
            }
            return val;
          }
        });
        jQuery2.each(["height", "width"], function(_i, dimension) {
          jQuery2.cssHooks[dimension] = {
            get: function(elem, computed, extra) {
              if (computed) {
                return rdisplayswap.test(jQuery2.css(elem, "display")) && (!elem.getClientRects().length || !elem.getBoundingClientRect().width) ? swap(elem, cssShow, function() {
                  return getWidthOrHeight(elem, dimension, extra);
                }) : getWidthOrHeight(elem, dimension, extra);
              }
            },
            set: function(elem, value, extra) {
              var matches, styles = getStyles(elem), scrollboxSizeBuggy = !support.scrollboxSize() && styles.position === "absolute", boxSizingNeeded = scrollboxSizeBuggy || extra, isBorderBox = boxSizingNeeded && jQuery2.css(elem, "boxSizing", false, styles) === "border-box", subtract = extra ? boxModelAdjustment(elem, dimension, extra, isBorderBox, styles) : 0;
              if (isBorderBox && scrollboxSizeBuggy) {
                subtract -= Math.ceil(elem["offset" + dimension[0].toUpperCase() + dimension.slice(1)] - parseFloat(styles[dimension]) - boxModelAdjustment(elem, dimension, "border", false, styles) - 0.5);
              }
              if (subtract && (matches = rcssNum.exec(value)) && (matches[3] || "px") !== "px") {
                elem.style[dimension] = value;
                value = jQuery2.css(elem, dimension);
              }
              return setPositiveNumber(elem, value, subtract);
            }
          };
        });
        jQuery2.cssHooks.marginLeft = addGetHookIf(support.reliableMarginLeft, function(elem, computed) {
          if (computed) {
            return (parseFloat(curCSS(elem, "marginLeft")) || elem.getBoundingClientRect().left - swap(elem, { marginLeft: 0 }, function() {
              return elem.getBoundingClientRect().left;
            })) + "px";
          }
        });
        jQuery2.each({
          margin: "",
          padding: "",
          border: "Width"
        }, function(prefix, suffix) {
          jQuery2.cssHooks[prefix + suffix] = {
            expand: function(value) {
              var i = 0, expanded = {}, parts = typeof value === "string" ? value.split(" ") : [value];
              for (; i < 4; i++) {
                expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
              }
              return expanded;
            }
          };
          if (prefix !== "margin") {
            jQuery2.cssHooks[prefix + suffix].set = setPositiveNumber;
          }
        });
        jQuery2.fn.extend({
          css: function(name, value) {
            return access(this, function(elem, name2, value2) {
              var styles, len, map = {}, i = 0;
              if (Array.isArray(name2)) {
                styles = getStyles(elem);
                len = name2.length;
                for (; i < len; i++) {
                  map[name2[i]] = jQuery2.css(elem, name2[i], false, styles);
                }
                return map;
              }
              return value2 !== void 0 ? jQuery2.style(elem, name2, value2) : jQuery2.css(elem, name2);
            }, name, value, arguments.length > 1);
          }
        });
        function Tween(elem, options, prop, end, easing) {
          return new Tween.prototype.init(elem, options, prop, end, easing);
        }
        jQuery2.Tween = Tween;
        Tween.prototype = {
          constructor: Tween,
          init: function(elem, options, prop, end, easing, unit) {
            this.elem = elem;
            this.prop = prop;
            this.easing = easing || jQuery2.easing._default;
            this.options = options;
            this.start = this.now = this.cur();
            this.end = end;
            this.unit = unit || (jQuery2.cssNumber[prop] ? "" : "px");
          },
          cur: function() {
            var hooks = Tween.propHooks[this.prop];
            return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
          },
          run: function(percent) {
            var eased, hooks = Tween.propHooks[this.prop];
            if (this.options.duration) {
              this.pos = eased = jQuery2.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration);
            } else {
              this.pos = eased = percent;
            }
            this.now = (this.end - this.start) * eased + this.start;
            if (this.options.step) {
              this.options.step.call(this.elem, this.now, this);
            }
            if (hooks && hooks.set) {
              hooks.set(this);
            } else {
              Tween.propHooks._default.set(this);
            }
            return this;
          }
        };
        Tween.prototype.init.prototype = Tween.prototype;
        Tween.propHooks = {
          _default: {
            get: function(tween) {
              var result;
              if (tween.elem.nodeType !== 1 || tween.elem[tween.prop] != null && tween.elem.style[tween.prop] == null) {
                return tween.elem[tween.prop];
              }
              result = jQuery2.css(tween.elem, tween.prop, "");
              return !result || result === "auto" ? 0 : result;
            },
            set: function(tween) {
              if (jQuery2.fx.step[tween.prop]) {
                jQuery2.fx.step[tween.prop](tween);
              } else if (tween.elem.nodeType === 1 && (jQuery2.cssHooks[tween.prop] || tween.elem.style[finalPropName(tween.prop)] != null)) {
                jQuery2.style(tween.elem, tween.prop, tween.now + tween.unit);
              } else {
                tween.elem[tween.prop] = tween.now;
              }
            }
          }
        };
        Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
          set: function(tween) {
            if (tween.elem.nodeType && tween.elem.parentNode) {
              tween.elem[tween.prop] = tween.now;
            }
          }
        };
        jQuery2.easing = {
          linear: function(p) {
            return p;
          },
          swing: function(p) {
            return 0.5 - Math.cos(p * Math.PI) / 2;
          },
          _default: "swing"
        };
        jQuery2.fx = Tween.prototype.init;
        jQuery2.fx.step = {};
        var fxNow, inProgress, rfxtypes = /^(?:toggle|show|hide)$/, rrun = /queueHooks$/;
        function schedule() {
          if (inProgress) {
            if (document2.hidden === false && window2.requestAnimationFrame) {
              window2.requestAnimationFrame(schedule);
            } else {
              window2.setTimeout(schedule, jQuery2.fx.interval);
            }
            jQuery2.fx.tick();
          }
        }
        function createFxNow() {
          window2.setTimeout(function() {
            fxNow = void 0;
          });
          return fxNow = Date.now();
        }
        function genFx(type, includeWidth) {
          var which, i = 0, attrs = { height: type };
          includeWidth = includeWidth ? 1 : 0;
          for (; i < 4; i += 2 - includeWidth) {
            which = cssExpand[i];
            attrs["margin" + which] = attrs["padding" + which] = type;
          }
          if (includeWidth) {
            attrs.opacity = attrs.width = type;
          }
          return attrs;
        }
        function createTween(value, prop, animation) {
          var tween, collection = (Animation.tweeners[prop] || []).concat(Animation.tweeners["*"]), index = 0, length = collection.length;
          for (; index < length; index++) {
            if (tween = collection[index].call(animation, prop, value)) {
              return tween;
            }
          }
        }
        function defaultPrefilter(elem, props, opts) {
          var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display, isBox = "width" in props || "height" in props, anim = this, orig = {}, style = elem.style, hidden = elem.nodeType && isHiddenWithinTree(elem), dataShow = dataPriv.get(elem, "fxshow");
          if (!opts.queue) {
            hooks = jQuery2._queueHooks(elem, "fx");
            if (hooks.unqueued == null) {
              hooks.unqueued = 0;
              oldfire = hooks.empty.fire;
              hooks.empty.fire = function() {
                if (!hooks.unqueued) {
                  oldfire();
                }
              };
            }
            hooks.unqueued++;
            anim.always(function() {
              anim.always(function() {
                hooks.unqueued--;
                if (!jQuery2.queue(elem, "fx").length) {
                  hooks.empty.fire();
                }
              });
            });
          }
          for (prop in props) {
            value = props[prop];
            if (rfxtypes.test(value)) {
              delete props[prop];
              toggle = toggle || value === "toggle";
              if (value === (hidden ? "hide" : "show")) {
                if (value === "show" && dataShow && dataShow[prop] !== void 0) {
                  hidden = true;
                } else {
                  continue;
                }
              }
              orig[prop] = dataShow && dataShow[prop] || jQuery2.style(elem, prop);
            }
          }
          propTween = !jQuery2.isEmptyObject(props);
          if (!propTween && jQuery2.isEmptyObject(orig)) {
            return;
          }
          if (isBox && elem.nodeType === 1) {
            opts.overflow = [style.overflow, style.overflowX, style.overflowY];
            restoreDisplay = dataShow && dataShow.display;
            if (restoreDisplay == null) {
              restoreDisplay = dataPriv.get(elem, "display");
            }
            display = jQuery2.css(elem, "display");
            if (display === "none") {
              if (restoreDisplay) {
                display = restoreDisplay;
              } else {
                showHide([elem], true);
                restoreDisplay = elem.style.display || restoreDisplay;
                display = jQuery2.css(elem, "display");
                showHide([elem]);
              }
            }
            if (display === "inline" || display === "inline-block" && restoreDisplay != null) {
              if (jQuery2.css(elem, "float") === "none") {
                if (!propTween) {
                  anim.done(function() {
                    style.display = restoreDisplay;
                  });
                  if (restoreDisplay == null) {
                    display = style.display;
                    restoreDisplay = display === "none" ? "" : display;
                  }
                }
                style.display = "inline-block";
              }
            }
          }
          if (opts.overflow) {
            style.overflow = "hidden";
            anim.always(function() {
              style.overflow = opts.overflow[0];
              style.overflowX = opts.overflow[1];
              style.overflowY = opts.overflow[2];
            });
          }
          propTween = false;
          for (prop in orig) {
            if (!propTween) {
              if (dataShow) {
                if ("hidden" in dataShow) {
                  hidden = dataShow.hidden;
                }
              } else {
                dataShow = dataPriv.access(elem, "fxshow", { display: restoreDisplay });
              }
              if (toggle) {
                dataShow.hidden = !hidden;
              }
              if (hidden) {
                showHide([elem], true);
              }
              anim.done(function() {
                if (!hidden) {
                  showHide([elem]);
                }
                dataPriv.remove(elem, "fxshow");
                for (prop in orig) {
                  jQuery2.style(elem, prop, orig[prop]);
                }
              });
            }
            propTween = createTween(hidden ? dataShow[prop] : 0, prop, anim);
            if (!(prop in dataShow)) {
              dataShow[prop] = propTween.start;
              if (hidden) {
                propTween.end = propTween.start;
                propTween.start = 0;
              }
            }
          }
        }
        function propFilter(props, specialEasing) {
          var index, name, easing, value, hooks;
          for (index in props) {
            name = camelCase(index);
            easing = specialEasing[name];
            value = props[index];
            if (Array.isArray(value)) {
              easing = value[1];
              value = props[index] = value[0];
            }
            if (index !== name) {
              props[name] = value;
              delete props[index];
            }
            hooks = jQuery2.cssHooks[name];
            if (hooks && "expand" in hooks) {
              value = hooks.expand(value);
              delete props[name];
              for (index in value) {
                if (!(index in props)) {
                  props[index] = value[index];
                  specialEasing[index] = easing;
                }
              }
            } else {
              specialEasing[name] = easing;
            }
          }
        }
        function Animation(elem, properties, options) {
          var result, stopped, index = 0, length = Animation.prefilters.length, deferred = jQuery2.Deferred().always(function() {
            delete tick.elem;
          }), tick = function() {
            if (stopped) {
              return false;
            }
            var currentTime = fxNow || createFxNow(), remaining = Math.max(0, animation.startTime + animation.duration - currentTime), temp = remaining / animation.duration || 0, percent = 1 - temp, index2 = 0, length2 = animation.tweens.length;
            for (; index2 < length2; index2++) {
              animation.tweens[index2].run(percent);
            }
            deferred.notifyWith(elem, [animation, percent, remaining]);
            if (percent < 1 && length2) {
              return remaining;
            }
            if (!length2) {
              deferred.notifyWith(elem, [animation, 1, 0]);
            }
            deferred.resolveWith(elem, [animation]);
            return false;
          }, animation = deferred.promise({
            elem,
            props: jQuery2.extend({}, properties),
            opts: jQuery2.extend(true, {
              specialEasing: {},
              easing: jQuery2.easing._default
            }, options),
            originalProperties: properties,
            originalOptions: options,
            startTime: fxNow || createFxNow(),
            duration: options.duration,
            tweens: [],
            createTween: function(prop, end) {
              var tween = jQuery2.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
              animation.tweens.push(tween);
              return tween;
            },
            stop: function(gotoEnd) {
              var index2 = 0, length2 = gotoEnd ? animation.tweens.length : 0;
              if (stopped) {
                return this;
              }
              stopped = true;
              for (; index2 < length2; index2++) {
                animation.tweens[index2].run(1);
              }
              if (gotoEnd) {
                deferred.notifyWith(elem, [animation, 1, 0]);
                deferred.resolveWith(elem, [animation, gotoEnd]);
              } else {
                deferred.rejectWith(elem, [animation, gotoEnd]);
              }
              return this;
            }
          }), props = animation.props;
          propFilter(props, animation.opts.specialEasing);
          for (; index < length; index++) {
            result = Animation.prefilters[index].call(animation, elem, props, animation.opts);
            if (result) {
              if (isFunction(result.stop)) {
                jQuery2._queueHooks(animation.elem, animation.opts.queue).stop = result.stop.bind(result);
              }
              return result;
            }
          }
          jQuery2.map(props, createTween, animation);
          if (isFunction(animation.opts.start)) {
            animation.opts.start.call(elem, animation);
          }
          animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);
          jQuery2.fx.timer(jQuery2.extend(tick, {
            elem,
            anim: animation,
            queue: animation.opts.queue
          }));
          return animation;
        }
        jQuery2.Animation = jQuery2.extend(Animation, {
          tweeners: {
            "*": [function(prop, value) {
              var tween = this.createTween(prop, value);
              adjustCSS(tween.elem, prop, rcssNum.exec(value), tween);
              return tween;
            }]
          },
          tweener: function(props, callback) {
            if (isFunction(props)) {
              callback = props;
              props = ["*"];
            } else {
              props = props.match(rnothtmlwhite);
            }
            var prop, index = 0, length = props.length;
            for (; index < length; index++) {
              prop = props[index];
              Animation.tweeners[prop] = Animation.tweeners[prop] || [];
              Animation.tweeners[prop].unshift(callback);
            }
          },
          prefilters: [defaultPrefilter],
          prefilter: function(callback, prepend) {
            if (prepend) {
              Animation.prefilters.unshift(callback);
            } else {
              Animation.prefilters.push(callback);
            }
          }
        });
        jQuery2.speed = function(speed, easing, fn) {
          var opt = speed && typeof speed === "object" ? jQuery2.extend({}, speed) : {
            complete: fn || !fn && easing || isFunction(speed) && speed,
            duration: speed,
            easing: fn && easing || easing && !isFunction(easing) && easing
          };
          if (jQuery2.fx.off) {
            opt.duration = 0;
          } else {
            if (typeof opt.duration !== "number") {
              if (opt.duration in jQuery2.fx.speeds) {
                opt.duration = jQuery2.fx.speeds[opt.duration];
              } else {
                opt.duration = jQuery2.fx.speeds._default;
              }
            }
          }
          if (opt.queue == null || opt.queue === true) {
            opt.queue = "fx";
          }
          opt.old = opt.complete;
          opt.complete = function() {
            if (isFunction(opt.old)) {
              opt.old.call(this);
            }
            if (opt.queue) {
              jQuery2.dequeue(this, opt.queue);
            }
          };
          return opt;
        };
        jQuery2.fn.extend({
          fadeTo: function(speed, to, easing, callback) {
            return this.filter(isHiddenWithinTree).css("opacity", 0).show().end().animate({ opacity: to }, speed, easing, callback);
          },
          animate: function(prop, speed, easing, callback) {
            var empty = jQuery2.isEmptyObject(prop), optall = jQuery2.speed(speed, easing, callback), doAnimation = function() {
              var anim = Animation(this, jQuery2.extend({}, prop), optall);
              if (empty || dataPriv.get(this, "finish")) {
                anim.stop(true);
              }
            };
            doAnimation.finish = doAnimation;
            return empty || optall.queue === false ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
          },
          stop: function(type, clearQueue, gotoEnd) {
            var stopQueue = function(hooks) {
              var stop = hooks.stop;
              delete hooks.stop;
              stop(gotoEnd);
            };
            if (typeof type !== "string") {
              gotoEnd = clearQueue;
              clearQueue = type;
              type = void 0;
            }
            if (clearQueue) {
              this.queue(type || "fx", []);
            }
            return this.each(function() {
              var dequeue = true, index = type != null && type + "queueHooks", timers = jQuery2.timers, data = dataPriv.get(this);
              if (index) {
                if (data[index] && data[index].stop) {
                  stopQueue(data[index]);
                }
              } else {
                for (index in data) {
                  if (data[index] && data[index].stop && rrun.test(index)) {
                    stopQueue(data[index]);
                  }
                }
              }
              for (index = timers.length; index--; ) {
                if (timers[index].elem === this && (type == null || timers[index].queue === type)) {
                  timers[index].anim.stop(gotoEnd);
                  dequeue = false;
                  timers.splice(index, 1);
                }
              }
              if (dequeue || !gotoEnd) {
                jQuery2.dequeue(this, type);
              }
            });
          },
          finish: function(type) {
            if (type !== false) {
              type = type || "fx";
            }
            return this.each(function() {
              var index, data = dataPriv.get(this), queue = data[type + "queue"], hooks = data[type + "queueHooks"], timers = jQuery2.timers, length = queue ? queue.length : 0;
              data.finish = true;
              jQuery2.queue(this, type, []);
              if (hooks && hooks.stop) {
                hooks.stop.call(this, true);
              }
              for (index = timers.length; index--; ) {
                if (timers[index].elem === this && timers[index].queue === type) {
                  timers[index].anim.stop(true);
                  timers.splice(index, 1);
                }
              }
              for (index = 0; index < length; index++) {
                if (queue[index] && queue[index].finish) {
                  queue[index].finish.call(this);
                }
              }
              delete data.finish;
            });
          }
        });
        jQuery2.each(["toggle", "show", "hide"], function(_i, name) {
          var cssFn = jQuery2.fn[name];
          jQuery2.fn[name] = function(speed, easing, callback) {
            return speed == null || typeof speed === "boolean" ? cssFn.apply(this, arguments) : this.animate(genFx(name, true), speed, easing, callback);
          };
        });
        jQuery2.each({
          slideDown: genFx("show"),
          slideUp: genFx("hide"),
          slideToggle: genFx("toggle"),
          fadeIn: { opacity: "show" },
          fadeOut: { opacity: "hide" },
          fadeToggle: { opacity: "toggle" }
        }, function(name, props) {
          jQuery2.fn[name] = function(speed, easing, callback) {
            return this.animate(props, speed, easing, callback);
          };
        });
        jQuery2.timers = [];
        jQuery2.fx.tick = function() {
          var timer, i = 0, timers = jQuery2.timers;
          fxNow = Date.now();
          for (; i < timers.length; i++) {
            timer = timers[i];
            if (!timer() && timers[i] === timer) {
              timers.splice(i--, 1);
            }
          }
          if (!timers.length) {
            jQuery2.fx.stop();
          }
          fxNow = void 0;
        };
        jQuery2.fx.timer = function(timer) {
          jQuery2.timers.push(timer);
          jQuery2.fx.start();
        };
        jQuery2.fx.interval = 13;
        jQuery2.fx.start = function() {
          if (inProgress) {
            return;
          }
          inProgress = true;
          schedule();
        };
        jQuery2.fx.stop = function() {
          inProgress = null;
        };
        jQuery2.fx.speeds = {
          slow: 600,
          fast: 200,
          _default: 400
        };
        jQuery2.fn.delay = function(time, type) {
          time = jQuery2.fx ? jQuery2.fx.speeds[time] || time : time;
          type = type || "fx";
          return this.queue(type, function(next, hooks) {
            var timeout = window2.setTimeout(next, time);
            hooks.stop = function() {
              window2.clearTimeout(timeout);
            };
          });
        };
        (function() {
          var input = document2.createElement("input"), select = document2.createElement("select"), opt = select.appendChild(document2.createElement("option"));
          input.type = "checkbox";
          support.checkOn = input.value !== "";
          support.optSelected = opt.selected;
          input = document2.createElement("input");
          input.value = "t";
          input.type = "radio";
          support.radioValue = input.value === "t";
        })();
        var boolHook, attrHandle = jQuery2.expr.attrHandle;
        jQuery2.fn.extend({
          attr: function(name, value) {
            return access(this, jQuery2.attr, name, value, arguments.length > 1);
          },
          removeAttr: function(name) {
            return this.each(function() {
              jQuery2.removeAttr(this, name);
            });
          }
        });
        jQuery2.extend({
          attr: function(elem, name, value) {
            var ret, hooks, nType = elem.nodeType;
            if (nType === 3 || nType === 8 || nType === 2) {
              return;
            }
            if (typeof elem.getAttribute === "undefined") {
              return jQuery2.prop(elem, name, value);
            }
            if (nType !== 1 || !jQuery2.isXMLDoc(elem)) {
              hooks = jQuery2.attrHooks[name.toLowerCase()] || (jQuery2.expr.match.bool.test(name) ? boolHook : void 0);
            }
            if (value !== void 0) {
              if (value === null) {
                jQuery2.removeAttr(elem, name);
                return;
              }
              if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== void 0) {
                return ret;
              }
              elem.setAttribute(name, value + "");
              return value;
            }
            if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
              return ret;
            }
            ret = jQuery2.find.attr(elem, name);
            return ret == null ? void 0 : ret;
          },
          attrHooks: {
            type: {
              set: function(elem, value) {
                if (!support.radioValue && value === "radio" && nodeName(elem, "input")) {
                  var val = elem.value;
                  elem.setAttribute("type", value);
                  if (val) {
                    elem.value = val;
                  }
                  return value;
                }
              }
            }
          },
          removeAttr: function(elem, value) {
            var name, i = 0, attrNames = value && value.match(rnothtmlwhite);
            if (attrNames && elem.nodeType === 1) {
              while (name = attrNames[i++]) {
                elem.removeAttribute(name);
              }
            }
          }
        });
        boolHook = {
          set: function(elem, value, name) {
            if (value === false) {
              jQuery2.removeAttr(elem, name);
            } else {
              elem.setAttribute(name, name);
            }
            return name;
          }
        };
        jQuery2.each(jQuery2.expr.match.bool.source.match(/\w+/g), function(_i, name) {
          var getter = attrHandle[name] || jQuery2.find.attr;
          attrHandle[name] = function(elem, name2, isXML) {
            var ret, handle, lowercaseName = name2.toLowerCase();
            if (!isXML) {
              handle = attrHandle[lowercaseName];
              attrHandle[lowercaseName] = ret;
              ret = getter(elem, name2, isXML) != null ? lowercaseName : null;
              attrHandle[lowercaseName] = handle;
            }
            return ret;
          };
        });
        var rfocusable = /^(?:input|select|textarea|button)$/i, rclickable = /^(?:a|area)$/i;
        jQuery2.fn.extend({
          prop: function(name, value) {
            return access(this, jQuery2.prop, name, value, arguments.length > 1);
          },
          removeProp: function(name) {
            return this.each(function() {
              delete this[jQuery2.propFix[name] || name];
            });
          }
        });
        jQuery2.extend({
          prop: function(elem, name, value) {
            var ret, hooks, nType = elem.nodeType;
            if (nType === 3 || nType === 8 || nType === 2) {
              return;
            }
            if (nType !== 1 || !jQuery2.isXMLDoc(elem)) {
              name = jQuery2.propFix[name] || name;
              hooks = jQuery2.propHooks[name];
            }
            if (value !== void 0) {
              if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== void 0) {
                return ret;
              }
              return elem[name] = value;
            }
            if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
              return ret;
            }
            return elem[name];
          },
          propHooks: {
            tabIndex: {
              get: function(elem) {
                var tabindex = jQuery2.find.attr(elem, "tabindex");
                if (tabindex) {
                  return parseInt(tabindex, 10);
                }
                if (rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href) {
                  return 0;
                }
                return -1;
              }
            }
          },
          propFix: {
            "for": "htmlFor",
            "class": "className"
          }
        });
        if (!support.optSelected) {
          jQuery2.propHooks.selected = {
            get: function(elem) {
              var parent = elem.parentNode;
              if (parent && parent.parentNode) {
                parent.parentNode.selectedIndex;
              }
              return null;
            },
            set: function(elem) {
              var parent = elem.parentNode;
              if (parent) {
                parent.selectedIndex;
                if (parent.parentNode) {
                  parent.parentNode.selectedIndex;
                }
              }
            }
          };
        }
        jQuery2.each([
          "tabIndex",
          "readOnly",
          "maxLength",
          "cellSpacing",
          "cellPadding",
          "rowSpan",
          "colSpan",
          "useMap",
          "frameBorder",
          "contentEditable"
        ], function() {
          jQuery2.propFix[this.toLowerCase()] = this;
        });
        function stripAndCollapse(value) {
          var tokens = value.match(rnothtmlwhite) || [];
          return tokens.join(" ");
        }
        function getClass(elem) {
          return elem.getAttribute && elem.getAttribute("class") || "";
        }
        function classesToArray(value) {
          if (Array.isArray(value)) {
            return value;
          }
          if (typeof value === "string") {
            return value.match(rnothtmlwhite) || [];
          }
          return [];
        }
        jQuery2.fn.extend({
          addClass: function(value) {
            var classes, elem, cur, curValue, clazz, j, finalValue, i = 0;
            if (isFunction(value)) {
              return this.each(function(j2) {
                jQuery2(this).addClass(value.call(this, j2, getClass(this)));
              });
            }
            classes = classesToArray(value);
            if (classes.length) {
              while (elem = this[i++]) {
                curValue = getClass(elem);
                cur = elem.nodeType === 1 && " " + stripAndCollapse(curValue) + " ";
                if (cur) {
                  j = 0;
                  while (clazz = classes[j++]) {
                    if (cur.indexOf(" " + clazz + " ") < 0) {
                      cur += clazz + " ";
                    }
                  }
                  finalValue = stripAndCollapse(cur);
                  if (curValue !== finalValue) {
                    elem.setAttribute("class", finalValue);
                  }
                }
              }
            }
            return this;
          },
          removeClass: function(value) {
            var classes, elem, cur, curValue, clazz, j, finalValue, i = 0;
            if (isFunction(value)) {
              return this.each(function(j2) {
                jQuery2(this).removeClass(value.call(this, j2, getClass(this)));
              });
            }
            if (!arguments.length) {
              return this.attr("class", "");
            }
            classes = classesToArray(value);
            if (classes.length) {
              while (elem = this[i++]) {
                curValue = getClass(elem);
                cur = elem.nodeType === 1 && " " + stripAndCollapse(curValue) + " ";
                if (cur) {
                  j = 0;
                  while (clazz = classes[j++]) {
                    while (cur.indexOf(" " + clazz + " ") > -1) {
                      cur = cur.replace(" " + clazz + " ", " ");
                    }
                  }
                  finalValue = stripAndCollapse(cur);
                  if (curValue !== finalValue) {
                    elem.setAttribute("class", finalValue);
                  }
                }
              }
            }
            return this;
          },
          toggleClass: function(value, stateVal) {
            var type = typeof value, isValidValue = type === "string" || Array.isArray(value);
            if (typeof stateVal === "boolean" && isValidValue) {
              return stateVal ? this.addClass(value) : this.removeClass(value);
            }
            if (isFunction(value)) {
              return this.each(function(i) {
                jQuery2(this).toggleClass(value.call(this, i, getClass(this), stateVal), stateVal);
              });
            }
            return this.each(function() {
              var className, i, self, classNames;
              if (isValidValue) {
                i = 0;
                self = jQuery2(this);
                classNames = classesToArray(value);
                while (className = classNames[i++]) {
                  if (self.hasClass(className)) {
                    self.removeClass(className);
                  } else {
                    self.addClass(className);
                  }
                }
              } else if (value === void 0 || type === "boolean") {
                className = getClass(this);
                if (className) {
                  dataPriv.set(this, "__className__", className);
                }
                if (this.setAttribute) {
                  this.setAttribute("class", className || value === false ? "" : dataPriv.get(this, "__className__") || "");
                }
              }
            });
          },
          hasClass: function(selector) {
            var className, elem, i = 0;
            className = " " + selector + " ";
            while (elem = this[i++]) {
              if (elem.nodeType === 1 && (" " + stripAndCollapse(getClass(elem)) + " ").indexOf(className) > -1) {
                return true;
              }
            }
            return false;
          }
        });
        var rreturn = /\r/g;
        jQuery2.fn.extend({
          val: function(value) {
            var hooks, ret, valueIsFunction, elem = this[0];
            if (!arguments.length) {
              if (elem) {
                hooks = jQuery2.valHooks[elem.type] || jQuery2.valHooks[elem.nodeName.toLowerCase()];
                if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== void 0) {
                  return ret;
                }
                ret = elem.value;
                if (typeof ret === "string") {
                  return ret.replace(rreturn, "");
                }
                return ret == null ? "" : ret;
              }
              return;
            }
            valueIsFunction = isFunction(value);
            return this.each(function(i) {
              var val;
              if (this.nodeType !== 1) {
                return;
              }
              if (valueIsFunction) {
                val = value.call(this, i, jQuery2(this).val());
              } else {
                val = value;
              }
              if (val == null) {
                val = "";
              } else if (typeof val === "number") {
                val += "";
              } else if (Array.isArray(val)) {
                val = jQuery2.map(val, function(value2) {
                  return value2 == null ? "" : value2 + "";
                });
              }
              hooks = jQuery2.valHooks[this.type] || jQuery2.valHooks[this.nodeName.toLowerCase()];
              if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === void 0) {
                this.value = val;
              }
            });
          }
        });
        jQuery2.extend({
          valHooks: {
            option: {
              get: function(elem) {
                var val = jQuery2.find.attr(elem, "value");
                return val != null ? val : stripAndCollapse(jQuery2.text(elem));
              }
            },
            select: {
              get: function(elem) {
                var value, option, i, options = elem.options, index = elem.selectedIndex, one = elem.type === "select-one", values = one ? null : [], max = one ? index + 1 : options.length;
                if (index < 0) {
                  i = max;
                } else {
                  i = one ? index : 0;
                }
                for (; i < max; i++) {
                  option = options[i];
                  if ((option.selected || i === index) && !option.disabled && (!option.parentNode.disabled || !nodeName(option.parentNode, "optgroup"))) {
                    value = jQuery2(option).val();
                    if (one) {
                      return value;
                    }
                    values.push(value);
                  }
                }
                return values;
              },
              set: function(elem, value) {
                var optionSet, option, options = elem.options, values = jQuery2.makeArray(value), i = options.length;
                while (i--) {
                  option = options[i];
                  if (option.selected = jQuery2.inArray(jQuery2.valHooks.option.get(option), values) > -1) {
                    optionSet = true;
                  }
                }
                if (!optionSet) {
                  elem.selectedIndex = -1;
                }
                return values;
              }
            }
          }
        });
        jQuery2.each(["radio", "checkbox"], function() {
          jQuery2.valHooks[this] = {
            set: function(elem, value) {
              if (Array.isArray(value)) {
                return elem.checked = jQuery2.inArray(jQuery2(elem).val(), value) > -1;
              }
            }
          };
          if (!support.checkOn) {
            jQuery2.valHooks[this].get = function(elem) {
              return elem.getAttribute("value") === null ? "on" : elem.value;
            };
          }
        });
        support.focusin = "onfocusin" in window2;
        var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/, stopPropagationCallback = function(e) {
          e.stopPropagation();
        };
        jQuery2.extend(jQuery2.event, {
          trigger: function(event, data, elem, onlyHandlers) {
            var i, cur, tmp, bubbleType, ontype, handle, special, lastElement, eventPath = [elem || document2], type = hasOwn.call(event, "type") ? event.type : event, namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
            cur = lastElement = tmp = elem = elem || document2;
            if (elem.nodeType === 3 || elem.nodeType === 8) {
              return;
            }
            if (rfocusMorph.test(type + jQuery2.event.triggered)) {
              return;
            }
            if (type.indexOf(".") > -1) {
              namespaces = type.split(".");
              type = namespaces.shift();
              namespaces.sort();
            }
            ontype = type.indexOf(":") < 0 && "on" + type;
            event = event[jQuery2.expando] ? event : new jQuery2.Event(type, typeof event === "object" && event);
            event.isTrigger = onlyHandlers ? 2 : 3;
            event.namespace = namespaces.join(".");
            event.rnamespace = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
            event.result = void 0;
            if (!event.target) {
              event.target = elem;
            }
            data = data == null ? [event] : jQuery2.makeArray(data, [event]);
            special = jQuery2.event.special[type] || {};
            if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
              return;
            }
            if (!onlyHandlers && !special.noBubble && !isWindow(elem)) {
              bubbleType = special.delegateType || type;
              if (!rfocusMorph.test(bubbleType + type)) {
                cur = cur.parentNode;
              }
              for (; cur; cur = cur.parentNode) {
                eventPath.push(cur);
                tmp = cur;
              }
              if (tmp === (elem.ownerDocument || document2)) {
                eventPath.push(tmp.defaultView || tmp.parentWindow || window2);
              }
            }
            i = 0;
            while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {
              lastElement = cur;
              event.type = i > 1 ? bubbleType : special.bindType || type;
              handle = (dataPriv.get(cur, "events") || /* @__PURE__ */ Object.create(null))[event.type] && dataPriv.get(cur, "handle");
              if (handle) {
                handle.apply(cur, data);
              }
              handle = ontype && cur[ontype];
              if (handle && handle.apply && acceptData(cur)) {
                event.result = handle.apply(cur, data);
                if (event.result === false) {
                  event.preventDefault();
                }
              }
            }
            event.type = type;
            if (!onlyHandlers && !event.isDefaultPrevented()) {
              if ((!special._default || special._default.apply(eventPath.pop(), data) === false) && acceptData(elem)) {
                if (ontype && isFunction(elem[type]) && !isWindow(elem)) {
                  tmp = elem[ontype];
                  if (tmp) {
                    elem[ontype] = null;
                  }
                  jQuery2.event.triggered = type;
                  if (event.isPropagationStopped()) {
                    lastElement.addEventListener(type, stopPropagationCallback);
                  }
                  elem[type]();
                  if (event.isPropagationStopped()) {
                    lastElement.removeEventListener(type, stopPropagationCallback);
                  }
                  jQuery2.event.triggered = void 0;
                  if (tmp) {
                    elem[ontype] = tmp;
                  }
                }
              }
            }
            return event.result;
          },
          simulate: function(type, elem, event) {
            var e = jQuery2.extend(new jQuery2.Event(), event, {
              type,
              isSimulated: true
            });
            jQuery2.event.trigger(e, null, elem);
          }
        });
        jQuery2.fn.extend({
          trigger: function(type, data) {
            return this.each(function() {
              jQuery2.event.trigger(type, data, this);
            });
          },
          triggerHandler: function(type, data) {
            var elem = this[0];
            if (elem) {
              return jQuery2.event.trigger(type, data, elem, true);
            }
          }
        });
        if (!support.focusin) {
          jQuery2.each({ focus: "focusin", blur: "focusout" }, function(orig, fix) {
            var handler = function(event) {
              jQuery2.event.simulate(fix, event.target, jQuery2.event.fix(event));
            };
            jQuery2.event.special[fix] = {
              setup: function() {
                var doc = this.ownerDocument || this.document || this, attaches = dataPriv.access(doc, fix);
                if (!attaches) {
                  doc.addEventListener(orig, handler, true);
                }
                dataPriv.access(doc, fix, (attaches || 0) + 1);
              },
              teardown: function() {
                var doc = this.ownerDocument || this.document || this, attaches = dataPriv.access(doc, fix) - 1;
                if (!attaches) {
                  doc.removeEventListener(orig, handler, true);
                  dataPriv.remove(doc, fix);
                } else {
                  dataPriv.access(doc, fix, attaches);
                }
              }
            };
          });
        }
        var location2 = window2.location;
        var nonce = { guid: Date.now() };
        var rquery = /\?/;
        jQuery2.parseXML = function(data) {
          var xml, parserErrorElem;
          if (!data || typeof data !== "string") {
            return null;
          }
          try {
            xml = new window2.DOMParser().parseFromString(data, "text/xml");
          } catch (e) {
          }
          parserErrorElem = xml && xml.getElementsByTagName("parsererror")[0];
          if (!xml || parserErrorElem) {
            jQuery2.error("Invalid XML: " + (parserErrorElem ? jQuery2.map(parserErrorElem.childNodes, function(el) {
              return el.textContent;
            }).join("\n") : data));
          }
          return xml;
        };
        var rbracket = /\[\]$/, rCRLF = /\r?\n/g, rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i, rsubmittable = /^(?:input|select|textarea|keygen)/i;
        function buildParams(prefix, obj, traditional, add) {
          var name;
          if (Array.isArray(obj)) {
            jQuery2.each(obj, function(i, v) {
              if (traditional || rbracket.test(prefix)) {
                add(prefix, v);
              } else {
                buildParams(prefix + "[" + (typeof v === "object" && v != null ? i : "") + "]", v, traditional, add);
              }
            });
          } else if (!traditional && toType(obj) === "object") {
            for (name in obj) {
              buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
            }
          } else {
            add(prefix, obj);
          }
        }
        jQuery2.param = function(a, traditional) {
          var prefix, s = [], add = function(key, valueOrFunction) {
            var value = isFunction(valueOrFunction) ? valueOrFunction() : valueOrFunction;
            s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value == null ? "" : value);
          };
          if (a == null) {
            return "";
          }
          if (Array.isArray(a) || a.jquery && !jQuery2.isPlainObject(a)) {
            jQuery2.each(a, function() {
              add(this.name, this.value);
            });
          } else {
            for (prefix in a) {
              buildParams(prefix, a[prefix], traditional, add);
            }
          }
          return s.join("&");
        };
        jQuery2.fn.extend({
          serialize: function() {
            return jQuery2.param(this.serializeArray());
          },
          serializeArray: function() {
            return this.map(function() {
              var elements = jQuery2.prop(this, "elements");
              return elements ? jQuery2.makeArray(elements) : this;
            }).filter(function() {
              var type = this.type;
              return this.name && !jQuery2(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type));
            }).map(function(_i, elem) {
              var val = jQuery2(this).val();
              if (val == null) {
                return null;
              }
              if (Array.isArray(val)) {
                return jQuery2.map(val, function(val2) {
                  return { name: elem.name, value: val2.replace(rCRLF, "\r\n") };
                });
              }
              return { name: elem.name, value: val.replace(rCRLF, "\r\n") };
            }).get();
          }
        });
        var r20 = /%20/g, rhash = /#.*$/, rantiCache = /([?&])_=[^&]*/, rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg, rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, rnoContent = /^(?:GET|HEAD)$/, rprotocol = /^\/\//, prefilters = {}, transports = {}, allTypes = "*/".concat("*"), originAnchor = document2.createElement("a");
        originAnchor.href = location2.href;
        function addToPrefiltersOrTransports(structure) {
          return function(dataTypeExpression, func) {
            if (typeof dataTypeExpression !== "string") {
              func = dataTypeExpression;
              dataTypeExpression = "*";
            }
            var dataType, i = 0, dataTypes = dataTypeExpression.toLowerCase().match(rnothtmlwhite) || [];
            if (isFunction(func)) {
              while (dataType = dataTypes[i++]) {
                if (dataType[0] === "+") {
                  dataType = dataType.slice(1) || "*";
                  (structure[dataType] = structure[dataType] || []).unshift(func);
                } else {
                  (structure[dataType] = structure[dataType] || []).push(func);
                }
              }
            }
          };
        }
        function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
          var inspected = {}, seekingTransport = structure === transports;
          function inspect(dataType) {
            var selected;
            inspected[dataType] = true;
            jQuery2.each(structure[dataType] || [], function(_, prefilterOrFactory) {
              var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
              if (typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[dataTypeOrTransport]) {
                options.dataTypes.unshift(dataTypeOrTransport);
                inspect(dataTypeOrTransport);
                return false;
              } else if (seekingTransport) {
                return !(selected = dataTypeOrTransport);
              }
            });
            return selected;
          }
          return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
        }
        function ajaxExtend(target, src) {
          var key, deep, flatOptions = jQuery2.ajaxSettings.flatOptions || {};
          for (key in src) {
            if (src[key] !== void 0) {
              (flatOptions[key] ? target : deep || (deep = {}))[key] = src[key];
            }
          }
          if (deep) {
            jQuery2.extend(true, target, deep);
          }
          return target;
        }
        function ajaxHandleResponses(s, jqXHR, responses) {
          var ct, type, finalDataType, firstDataType, contents = s.contents, dataTypes = s.dataTypes;
          while (dataTypes[0] === "*") {
            dataTypes.shift();
            if (ct === void 0) {
              ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
            }
          }
          if (ct) {
            for (type in contents) {
              if (contents[type] && contents[type].test(ct)) {
                dataTypes.unshift(type);
                break;
              }
            }
          }
          if (dataTypes[0] in responses) {
            finalDataType = dataTypes[0];
          } else {
            for (type in responses) {
              if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
                finalDataType = type;
                break;
              }
              if (!firstDataType) {
                firstDataType = type;
              }
            }
            finalDataType = finalDataType || firstDataType;
          }
          if (finalDataType) {
            if (finalDataType !== dataTypes[0]) {
              dataTypes.unshift(finalDataType);
            }
            return responses[finalDataType];
          }
        }
        function ajaxConvert(s, response, jqXHR, isSuccess) {
          var conv2, current, conv, tmp, prev, converters = {}, dataTypes = s.dataTypes.slice();
          if (dataTypes[1]) {
            for (conv in s.converters) {
              converters[conv.toLowerCase()] = s.converters[conv];
            }
          }
          current = dataTypes.shift();
          while (current) {
            if (s.responseFields[current]) {
              jqXHR[s.responseFields[current]] = response;
            }
            if (!prev && isSuccess && s.dataFilter) {
              response = s.dataFilter(response, s.dataType);
            }
            prev = current;
            current = dataTypes.shift();
            if (current) {
              if (current === "*") {
                current = prev;
              } else if (prev !== "*" && prev !== current) {
                conv = converters[prev + " " + current] || converters["* " + current];
                if (!conv) {
                  for (conv2 in converters) {
                    tmp = conv2.split(" ");
                    if (tmp[1] === current) {
                      conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]];
                      if (conv) {
                        if (conv === true) {
                          conv = converters[conv2];
                        } else if (converters[conv2] !== true) {
                          current = tmp[0];
                          dataTypes.unshift(tmp[1]);
                        }
                        break;
                      }
                    }
                  }
                }
                if (conv !== true) {
                  if (conv && s.throws) {
                    response = conv(response);
                  } else {
                    try {
                      response = conv(response);
                    } catch (e) {
                      return {
                        state: "parsererror",
                        error: conv ? e : "No conversion from " + prev + " to " + current
                      };
                    }
                  }
                }
              }
            }
          }
          return { state: "success", data: response };
        }
        jQuery2.extend({
          active: 0,
          lastModified: {},
          etag: {},
          ajaxSettings: {
            url: location2.href,
            type: "GET",
            isLocal: rlocalProtocol.test(location2.protocol),
            global: true,
            processData: true,
            async: true,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
              "*": allTypes,
              text: "text/plain",
              html: "text/html",
              xml: "application/xml, text/xml",
              json: "application/json, text/javascript"
            },
            contents: {
              xml: /\bxml\b/,
              html: /\bhtml/,
              json: /\bjson\b/
            },
            responseFields: {
              xml: "responseXML",
              text: "responseText",
              json: "responseJSON"
            },
            converters: {
              "* text": String,
              "text html": true,
              "text json": JSON.parse,
              "text xml": jQuery2.parseXML
            },
            flatOptions: {
              url: true,
              context: true
            }
          },
          ajaxSetup: function(target, settings) {
            return settings ? ajaxExtend(ajaxExtend(target, jQuery2.ajaxSettings), settings) : ajaxExtend(jQuery2.ajaxSettings, target);
          },
          ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
          ajaxTransport: addToPrefiltersOrTransports(transports),
          ajax: function(url, options) {
            if (typeof url === "object") {
              options = url;
              url = void 0;
            }
            options = options || {};
            var transport, cacheURL, responseHeadersString, responseHeaders, timeoutTimer, urlAnchor, completed2, fireGlobals, i, uncached, s = jQuery2.ajaxSetup({}, options), callbackContext = s.context || s, globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery2(callbackContext) : jQuery2.event, deferred = jQuery2.Deferred(), completeDeferred = jQuery2.Callbacks("once memory"), statusCode = s.statusCode || {}, requestHeaders = {}, requestHeadersNames = {}, strAbort = "canceled", jqXHR = {
              readyState: 0,
              getResponseHeader: function(key) {
                var match;
                if (completed2) {
                  if (!responseHeaders) {
                    responseHeaders = {};
                    while (match = rheaders.exec(responseHeadersString)) {
                      responseHeaders[match[1].toLowerCase() + " "] = (responseHeaders[match[1].toLowerCase() + " "] || []).concat(match[2]);
                    }
                  }
                  match = responseHeaders[key.toLowerCase() + " "];
                }
                return match == null ? null : match.join(", ");
              },
              getAllResponseHeaders: function() {
                return completed2 ? responseHeadersString : null;
              },
              setRequestHeader: function(name, value) {
                if (completed2 == null) {
                  name = requestHeadersNames[name.toLowerCase()] = requestHeadersNames[name.toLowerCase()] || name;
                  requestHeaders[name] = value;
                }
                return this;
              },
              overrideMimeType: function(type) {
                if (completed2 == null) {
                  s.mimeType = type;
                }
                return this;
              },
              statusCode: function(map) {
                var code;
                if (map) {
                  if (completed2) {
                    jqXHR.always(map[jqXHR.status]);
                  } else {
                    for (code in map) {
                      statusCode[code] = [statusCode[code], map[code]];
                    }
                  }
                }
                return this;
              },
              abort: function(statusText) {
                var finalText = statusText || strAbort;
                if (transport) {
                  transport.abort(finalText);
                }
                done(0, finalText);
                return this;
              }
            };
            deferred.promise(jqXHR);
            s.url = ((url || s.url || location2.href) + "").replace(rprotocol, location2.protocol + "//");
            s.type = options.method || options.type || s.method || s.type;
            s.dataTypes = (s.dataType || "*").toLowerCase().match(rnothtmlwhite) || [""];
            if (s.crossDomain == null) {
              urlAnchor = document2.createElement("a");
              try {
                urlAnchor.href = s.url;
                urlAnchor.href = urlAnchor.href;
                s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !== urlAnchor.protocol + "//" + urlAnchor.host;
              } catch (e) {
                s.crossDomain = true;
              }
            }
            if (s.data && s.processData && typeof s.data !== "string") {
              s.data = jQuery2.param(s.data, s.traditional);
            }
            inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);
            if (completed2) {
              return jqXHR;
            }
            fireGlobals = jQuery2.event && s.global;
            if (fireGlobals && jQuery2.active++ === 0) {
              jQuery2.event.trigger("ajaxStart");
            }
            s.type = s.type.toUpperCase();
            s.hasContent = !rnoContent.test(s.type);
            cacheURL = s.url.replace(rhash, "");
            if (!s.hasContent) {
              uncached = s.url.slice(cacheURL.length);
              if (s.data && (s.processData || typeof s.data === "string")) {
                cacheURL += (rquery.test(cacheURL) ? "&" : "?") + s.data;
                delete s.data;
              }
              if (s.cache === false) {
                cacheURL = cacheURL.replace(rantiCache, "$1");
                uncached = (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce.guid++ + uncached;
              }
              s.url = cacheURL + uncached;
            } else if (s.data && s.processData && (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0) {
              s.data = s.data.replace(r20, "+");
            }
            if (s.ifModified) {
              if (jQuery2.lastModified[cacheURL]) {
                jqXHR.setRequestHeader("If-Modified-Since", jQuery2.lastModified[cacheURL]);
              }
              if (jQuery2.etag[cacheURL]) {
                jqXHR.setRequestHeader("If-None-Match", jQuery2.etag[cacheURL]);
              }
            }
            if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
              jqXHR.setRequestHeader("Content-Type", s.contentType);
            }
            jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);
            for (i in s.headers) {
              jqXHR.setRequestHeader(i, s.headers[i]);
            }
            if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || completed2)) {
              return jqXHR.abort();
            }
            strAbort = "abort";
            completeDeferred.add(s.complete);
            jqXHR.done(s.success);
            jqXHR.fail(s.error);
            transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);
            if (!transport) {
              done(-1, "No Transport");
            } else {
              jqXHR.readyState = 1;
              if (fireGlobals) {
                globalEventContext.trigger("ajaxSend", [jqXHR, s]);
              }
              if (completed2) {
                return jqXHR;
              }
              if (s.async && s.timeout > 0) {
                timeoutTimer = window2.setTimeout(function() {
                  jqXHR.abort("timeout");
                }, s.timeout);
              }
              try {
                completed2 = false;
                transport.send(requestHeaders, done);
              } catch (e) {
                if (completed2) {
                  throw e;
                }
                done(-1, e);
              }
            }
            function done(status, nativeStatusText, responses, headers) {
              var isSuccess, success, error, response, modified, statusText = nativeStatusText;
              if (completed2) {
                return;
              }
              completed2 = true;
              if (timeoutTimer) {
                window2.clearTimeout(timeoutTimer);
              }
              transport = void 0;
              responseHeadersString = headers || "";
              jqXHR.readyState = status > 0 ? 4 : 0;
              isSuccess = status >= 200 && status < 300 || status === 304;
              if (responses) {
                response = ajaxHandleResponses(s, jqXHR, responses);
              }
              if (!isSuccess && jQuery2.inArray("script", s.dataTypes) > -1 && jQuery2.inArray("json", s.dataTypes) < 0) {
                s.converters["text script"] = function() {
                };
              }
              response = ajaxConvert(s, response, jqXHR, isSuccess);
              if (isSuccess) {
                if (s.ifModified) {
                  modified = jqXHR.getResponseHeader("Last-Modified");
                  if (modified) {
                    jQuery2.lastModified[cacheURL] = modified;
                  }
                  modified = jqXHR.getResponseHeader("etag");
                  if (modified) {
                    jQuery2.etag[cacheURL] = modified;
                  }
                }
                if (status === 204 || s.type === "HEAD") {
                  statusText = "nocontent";
                } else if (status === 304) {
                  statusText = "notmodified";
                } else {
                  statusText = response.state;
                  success = response.data;
                  error = response.error;
                  isSuccess = !error;
                }
              } else {
                error = statusText;
                if (status || !statusText) {
                  statusText = "error";
                  if (status < 0) {
                    status = 0;
                  }
                }
              }
              jqXHR.status = status;
              jqXHR.statusText = (nativeStatusText || statusText) + "";
              if (isSuccess) {
                deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
              } else {
                deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
              }
              jqXHR.statusCode(statusCode);
              statusCode = void 0;
              if (fireGlobals) {
                globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [jqXHR, s, isSuccess ? success : error]);
              }
              completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);
              if (fireGlobals) {
                globalEventContext.trigger("ajaxComplete", [jqXHR, s]);
                if (!--jQuery2.active) {
                  jQuery2.event.trigger("ajaxStop");
                }
              }
            }
            return jqXHR;
          },
          getJSON: function(url, data, callback) {
            return jQuery2.get(url, data, callback, "json");
          },
          getScript: function(url, callback) {
            return jQuery2.get(url, void 0, callback, "script");
          }
        });
        jQuery2.each(["get", "post"], function(_i, method) {
          jQuery2[method] = function(url, data, callback, type) {
            if (isFunction(data)) {
              type = type || callback;
              callback = data;
              data = void 0;
            }
            return jQuery2.ajax(jQuery2.extend({
              url,
              type: method,
              dataType: type,
              data,
              success: callback
            }, jQuery2.isPlainObject(url) && url));
          };
        });
        jQuery2.ajaxPrefilter(function(s) {
          var i;
          for (i in s.headers) {
            if (i.toLowerCase() === "content-type") {
              s.contentType = s.headers[i] || "";
            }
          }
        });
        jQuery2._evalUrl = function(url, options, doc) {
          return jQuery2.ajax({
            url,
            type: "GET",
            dataType: "script",
            cache: true,
            async: false,
            global: false,
            converters: {
              "text script": function() {
              }
            },
            dataFilter: function(response) {
              jQuery2.globalEval(response, options, doc);
            }
          });
        };
        jQuery2.fn.extend({
          wrapAll: function(html) {
            var wrap;
            if (this[0]) {
              if (isFunction(html)) {
                html = html.call(this[0]);
              }
              wrap = jQuery2(html, this[0].ownerDocument).eq(0).clone(true);
              if (this[0].parentNode) {
                wrap.insertBefore(this[0]);
              }
              wrap.map(function() {
                var elem = this;
                while (elem.firstElementChild) {
                  elem = elem.firstElementChild;
                }
                return elem;
              }).append(this);
            }
            return this;
          },
          wrapInner: function(html) {
            if (isFunction(html)) {
              return this.each(function(i) {
                jQuery2(this).wrapInner(html.call(this, i));
              });
            }
            return this.each(function() {
              var self = jQuery2(this), contents = self.contents();
              if (contents.length) {
                contents.wrapAll(html);
              } else {
                self.append(html);
              }
            });
          },
          wrap: function(html) {
            var htmlIsFunction = isFunction(html);
            return this.each(function(i) {
              jQuery2(this).wrapAll(htmlIsFunction ? html.call(this, i) : html);
            });
          },
          unwrap: function(selector) {
            this.parent(selector).not("body").each(function() {
              jQuery2(this).replaceWith(this.childNodes);
            });
            return this;
          }
        });
        jQuery2.expr.pseudos.hidden = function(elem) {
          return !jQuery2.expr.pseudos.visible(elem);
        };
        jQuery2.expr.pseudos.visible = function(elem) {
          return !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
        };
        jQuery2.ajaxSettings.xhr = function() {
          try {
            return new window2.XMLHttpRequest();
          } catch (e) {
          }
        };
        var xhrSuccessStatus = {
          0: 200,
          1223: 204
        }, xhrSupported = jQuery2.ajaxSettings.xhr();
        support.cors = !!xhrSupported && "withCredentials" in xhrSupported;
        support.ajax = xhrSupported = !!xhrSupported;
        jQuery2.ajaxTransport(function(options) {
          var callback, errorCallback;
          if (support.cors || xhrSupported && !options.crossDomain) {
            return {
              send: function(headers, complete) {
                var i, xhr = options.xhr();
                xhr.open(options.type, options.url, options.async, options.username, options.password);
                if (options.xhrFields) {
                  for (i in options.xhrFields) {
                    xhr[i] = options.xhrFields[i];
                  }
                }
                if (options.mimeType && xhr.overrideMimeType) {
                  xhr.overrideMimeType(options.mimeType);
                }
                if (!options.crossDomain && !headers["X-Requested-With"]) {
                  headers["X-Requested-With"] = "XMLHttpRequest";
                }
                for (i in headers) {
                  xhr.setRequestHeader(i, headers[i]);
                }
                callback = function(type) {
                  return function() {
                    if (callback) {
                      callback = errorCallback = xhr.onload = xhr.onerror = xhr.onabort = xhr.ontimeout = xhr.onreadystatechange = null;
                      if (type === "abort") {
                        xhr.abort();
                      } else if (type === "error") {
                        if (typeof xhr.status !== "number") {
                          complete(0, "error");
                        } else {
                          complete(xhr.status, xhr.statusText);
                        }
                      } else {
                        complete(xhrSuccessStatus[xhr.status] || xhr.status, xhr.statusText, (xhr.responseType || "text") !== "text" || typeof xhr.responseText !== "string" ? { binary: xhr.response } : { text: xhr.responseText }, xhr.getAllResponseHeaders());
                      }
                    }
                  };
                };
                xhr.onload = callback();
                errorCallback = xhr.onerror = xhr.ontimeout = callback("error");
                if (xhr.onabort !== void 0) {
                  xhr.onabort = errorCallback;
                } else {
                  xhr.onreadystatechange = function() {
                    if (xhr.readyState === 4) {
                      window2.setTimeout(function() {
                        if (callback) {
                          errorCallback();
                        }
                      });
                    }
                  };
                }
                callback = callback("abort");
                try {
                  xhr.send(options.hasContent && options.data || null);
                } catch (e) {
                  if (callback) {
                    throw e;
                  }
                }
              },
              abort: function() {
                if (callback) {
                  callback();
                }
              }
            };
          }
        });
        jQuery2.ajaxPrefilter(function(s) {
          if (s.crossDomain) {
            s.contents.script = false;
          }
        });
        jQuery2.ajaxSetup({
          accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
          },
          contents: {
            script: /\b(?:java|ecma)script\b/
          },
          converters: {
            "text script": function(text) {
              jQuery2.globalEval(text);
              return text;
            }
          }
        });
        jQuery2.ajaxPrefilter("script", function(s) {
          if (s.cache === void 0) {
            s.cache = false;
          }
          if (s.crossDomain) {
            s.type = "GET";
          }
        });
        jQuery2.ajaxTransport("script", function(s) {
          if (s.crossDomain || s.scriptAttrs) {
            var script, callback;
            return {
              send: function(_, complete) {
                script = jQuery2("<script>").attr(s.scriptAttrs || {}).prop({ charset: s.scriptCharset, src: s.url }).on("load error", callback = function(evt) {
                  script.remove();
                  callback = null;
                  if (evt) {
                    complete(evt.type === "error" ? 404 : 200, evt.type);
                  }
                });
                document2.head.appendChild(script[0]);
              },
              abort: function() {
                if (callback) {
                  callback();
                }
              }
            };
          }
        });
        var oldCallbacks = [], rjsonp = /(=)\?(?=&|$)|\?\?/;
        jQuery2.ajaxSetup({
          jsonp: "callback",
          jsonpCallback: function() {
            var callback = oldCallbacks.pop() || jQuery2.expando + "_" + nonce.guid++;
            this[callback] = true;
            return callback;
          }
        });
        jQuery2.ajaxPrefilter("json jsonp", function(s, originalSettings, jqXHR) {
          var callbackName, overwritten, responseContainer, jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ? "url" : typeof s.data === "string" && (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0 && rjsonp.test(s.data) && "data");
          if (jsonProp || s.dataTypes[0] === "jsonp") {
            callbackName = s.jsonpCallback = isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback;
            if (jsonProp) {
              s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName);
            } else if (s.jsonp !== false) {
              s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName;
            }
            s.converters["script json"] = function() {
              if (!responseContainer) {
                jQuery2.error(callbackName + " was not called");
              }
              return responseContainer[0];
            };
            s.dataTypes[0] = "json";
            overwritten = window2[callbackName];
            window2[callbackName] = function() {
              responseContainer = arguments;
            };
            jqXHR.always(function() {
              if (overwritten === void 0) {
                jQuery2(window2).removeProp(callbackName);
              } else {
                window2[callbackName] = overwritten;
              }
              if (s[callbackName]) {
                s.jsonpCallback = originalSettings.jsonpCallback;
                oldCallbacks.push(callbackName);
              }
              if (responseContainer && isFunction(overwritten)) {
                overwritten(responseContainer[0]);
              }
              responseContainer = overwritten = void 0;
            });
            return "script";
          }
        });
        support.createHTMLDocument = function() {
          var body = document2.implementation.createHTMLDocument("").body;
          body.innerHTML = "<form></form><form></form>";
          return body.childNodes.length === 2;
        }();
        jQuery2.parseHTML = function(data, context, keepScripts) {
          if (typeof data !== "string") {
            return [];
          }
          if (typeof context === "boolean") {
            keepScripts = context;
            context = false;
          }
          var base, parsed, scripts;
          if (!context) {
            if (support.createHTMLDocument) {
              context = document2.implementation.createHTMLDocument("");
              base = context.createElement("base");
              base.href = document2.location.href;
              context.head.appendChild(base);
            } else {
              context = document2;
            }
          }
          parsed = rsingleTag.exec(data);
          scripts = !keepScripts && [];
          if (parsed) {
            return [context.createElement(parsed[1])];
          }
          parsed = buildFragment([data], context, scripts);
          if (scripts && scripts.length) {
            jQuery2(scripts).remove();
          }
          return jQuery2.merge([], parsed.childNodes);
        };
        jQuery2.fn.load = function(url, params, callback) {
          var selector, type, response, self = this, off = url.indexOf(" ");
          if (off > -1) {
            selector = stripAndCollapse(url.slice(off));
            url = url.slice(0, off);
          }
          if (isFunction(params)) {
            callback = params;
            params = void 0;
          } else if (params && typeof params === "object") {
            type = "POST";
          }
          if (self.length > 0) {
            jQuery2.ajax({
              url,
              type: type || "GET",
              dataType: "html",
              data: params
            }).done(function(responseText) {
              response = arguments;
              self.html(selector ? jQuery2("<div>").append(jQuery2.parseHTML(responseText)).find(selector) : responseText);
            }).always(callback && function(jqXHR, status) {
              self.each(function() {
                callback.apply(this, response || [jqXHR.responseText, status, jqXHR]);
              });
            });
          }
          return this;
        };
        jQuery2.expr.pseudos.animated = function(elem) {
          return jQuery2.grep(jQuery2.timers, function(fn) {
            return elem === fn.elem;
          }).length;
        };
        jQuery2.offset = {
          setOffset: function(elem, options, i) {
            var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition, position = jQuery2.css(elem, "position"), curElem = jQuery2(elem), props = {};
            if (position === "static") {
              elem.style.position = "relative";
            }
            curOffset = curElem.offset();
            curCSSTop = jQuery2.css(elem, "top");
            curCSSLeft = jQuery2.css(elem, "left");
            calculatePosition = (position === "absolute" || position === "fixed") && (curCSSTop + curCSSLeft).indexOf("auto") > -1;
            if (calculatePosition) {
              curPosition = curElem.position();
              curTop = curPosition.top;
              curLeft = curPosition.left;
            } else {
              curTop = parseFloat(curCSSTop) || 0;
              curLeft = parseFloat(curCSSLeft) || 0;
            }
            if (isFunction(options)) {
              options = options.call(elem, i, jQuery2.extend({}, curOffset));
            }
            if (options.top != null) {
              props.top = options.top - curOffset.top + curTop;
            }
            if (options.left != null) {
              props.left = options.left - curOffset.left + curLeft;
            }
            if ("using" in options) {
              options.using.call(elem, props);
            } else {
              curElem.css(props);
            }
          }
        };
        jQuery2.fn.extend({
          offset: function(options) {
            if (arguments.length) {
              return options === void 0 ? this : this.each(function(i) {
                jQuery2.offset.setOffset(this, options, i);
              });
            }
            var rect, win, elem = this[0];
            if (!elem) {
              return;
            }
            if (!elem.getClientRects().length) {
              return { top: 0, left: 0 };
            }
            rect = elem.getBoundingClientRect();
            win = elem.ownerDocument.defaultView;
            return {
              top: rect.top + win.pageYOffset,
              left: rect.left + win.pageXOffset
            };
          },
          position: function() {
            if (!this[0]) {
              return;
            }
            var offsetParent, offset, doc, elem = this[0], parentOffset = { top: 0, left: 0 };
            if (jQuery2.css(elem, "position") === "fixed") {
              offset = elem.getBoundingClientRect();
            } else {
              offset = this.offset();
              doc = elem.ownerDocument;
              offsetParent = elem.offsetParent || doc.documentElement;
              while (offsetParent && (offsetParent === doc.body || offsetParent === doc.documentElement) && jQuery2.css(offsetParent, "position") === "static") {
                offsetParent = offsetParent.parentNode;
              }
              if (offsetParent && offsetParent !== elem && offsetParent.nodeType === 1) {
                parentOffset = jQuery2(offsetParent).offset();
                parentOffset.top += jQuery2.css(offsetParent, "borderTopWidth", true);
                parentOffset.left += jQuery2.css(offsetParent, "borderLeftWidth", true);
              }
            }
            return {
              top: offset.top - parentOffset.top - jQuery2.css(elem, "marginTop", true),
              left: offset.left - parentOffset.left - jQuery2.css(elem, "marginLeft", true)
            };
          },
          offsetParent: function() {
            return this.map(function() {
              var offsetParent = this.offsetParent;
              while (offsetParent && jQuery2.css(offsetParent, "position") === "static") {
                offsetParent = offsetParent.offsetParent;
              }
              return offsetParent || documentElement;
            });
          }
        });
        jQuery2.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function(method, prop) {
          var top = prop === "pageYOffset";
          jQuery2.fn[method] = function(val) {
            return access(this, function(elem, method2, val2) {
              var win;
              if (isWindow(elem)) {
                win = elem;
              } else if (elem.nodeType === 9) {
                win = elem.defaultView;
              }
              if (val2 === void 0) {
                return win ? win[prop] : elem[method2];
              }
              if (win) {
                win.scrollTo(!top ? val2 : win.pageXOffset, top ? val2 : win.pageYOffset);
              } else {
                elem[method2] = val2;
              }
            }, method, val, arguments.length);
          };
        });
        jQuery2.each(["top", "left"], function(_i, prop) {
          jQuery2.cssHooks[prop] = addGetHookIf(support.pixelPosition, function(elem, computed) {
            if (computed) {
              computed = curCSS(elem, prop);
              return rnumnonpx.test(computed) ? jQuery2(elem).position()[prop] + "px" : computed;
            }
          });
        });
        jQuery2.each({ Height: "height", Width: "width" }, function(name, type) {
          jQuery2.each({
            padding: "inner" + name,
            content: type,
            "": "outer" + name
          }, function(defaultExtra, funcName) {
            jQuery2.fn[funcName] = function(margin, value) {
              var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"), extra = defaultExtra || (margin === true || value === true ? "margin" : "border");
              return access(this, function(elem, type2, value2) {
                var doc;
                if (isWindow(elem)) {
                  return funcName.indexOf("outer") === 0 ? elem["inner" + name] : elem.document.documentElement["client" + name];
                }
                if (elem.nodeType === 9) {
                  doc = elem.documentElement;
                  return Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name]);
                }
                return value2 === void 0 ? jQuery2.css(elem, type2, extra) : jQuery2.style(elem, type2, value2, extra);
              }, type, chainable ? margin : void 0, chainable);
            };
          });
        });
        jQuery2.each([
          "ajaxStart",
          "ajaxStop",
          "ajaxComplete",
          "ajaxError",
          "ajaxSuccess",
          "ajaxSend"
        ], function(_i, type) {
          jQuery2.fn[type] = function(fn) {
            return this.on(type, fn);
          };
        });
        jQuery2.fn.extend({
          bind: function(types, data, fn) {
            return this.on(types, null, data, fn);
          },
          unbind: function(types, fn) {
            return this.off(types, null, fn);
          },
          delegate: function(selector, types, data, fn) {
            return this.on(types, selector, data, fn);
          },
          undelegate: function(selector, types, fn) {
            return arguments.length === 1 ? this.off(selector, "**") : this.off(types, selector || "**", fn);
          },
          hover: function(fnOver, fnOut) {
            return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
          }
        });
        jQuery2.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function(_i, name) {
          jQuery2.fn[name] = function(data, fn) {
            return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);
          };
        });
        var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
        jQuery2.proxy = function(fn, context) {
          var tmp, args, proxy;
          if (typeof context === "string") {
            tmp = fn[context];
            context = fn;
            fn = tmp;
          }
          if (!isFunction(fn)) {
            return void 0;
          }
          args = slice.call(arguments, 2);
          proxy = function() {
            return fn.apply(context || this, args.concat(slice.call(arguments)));
          };
          proxy.guid = fn.guid = fn.guid || jQuery2.guid++;
          return proxy;
        };
        jQuery2.holdReady = function(hold) {
          if (hold) {
            jQuery2.readyWait++;
          } else {
            jQuery2.ready(true);
          }
        };
        jQuery2.isArray = Array.isArray;
        jQuery2.parseJSON = JSON.parse;
        jQuery2.nodeName = nodeName;
        jQuery2.isFunction = isFunction;
        jQuery2.isWindow = isWindow;
        jQuery2.camelCase = camelCase;
        jQuery2.type = toType;
        jQuery2.now = Date.now;
        jQuery2.isNumeric = function(obj) {
          var type = jQuery2.type(obj);
          return (type === "number" || type === "string") && !isNaN(obj - parseFloat(obj));
        };
        jQuery2.trim = function(text) {
          return text == null ? "" : (text + "").replace(rtrim, "");
        };
        if (typeof define === "function" && define.amd) {
          define("jquery", [], function() {
            return jQuery2;
          });
        }
        var _jQuery = window2.jQuery, _$ = window2.$;
        jQuery2.noConflict = function(deep) {
          if (window2.$ === jQuery2) {
            window2.$ = _$;
          }
          if (deep && window2.jQuery === jQuery2) {
            window2.jQuery = _jQuery;
          }
          return jQuery2;
        };
        if (typeof noGlobal === "undefined") {
          window2.jQuery = window2.$ = jQuery2;
        }
        return jQuery2;
      });
    }
  });

  // node_modules/sifter/sifter.js
  var require_sifter = __commonJS({
    "node_modules/sifter/sifter.js"(exports, module) {
      (function(root, factory) {
        if (typeof define === "function" && define.amd) {
          define(factory);
        } else if (typeof exports === "object") {
          module.exports = factory();
        } else {
          root.Sifter = factory();
        }
      })(exports, function() {
        var Sifter = function(items, settings) {
          this.items = items;
          this.settings = settings || { diacritics: true };
        };
        Sifter.prototype.tokenize = function(query) {
          query = trim(String(query || "").toLowerCase());
          if (!query || !query.length)
            return [];
          var i, n, regex, letter;
          var tokens = [];
          var words = query.split(/ +/);
          for (i = 0, n = words.length; i < n; i++) {
            regex = escape_regex(words[i]);
            if (this.settings.diacritics) {
              for (letter in DIACRITICS) {
                if (DIACRITICS.hasOwnProperty(letter)) {
                  regex = regex.replace(new RegExp(letter, "g"), DIACRITICS[letter]);
                }
              }
            }
            tokens.push({
              string: words[i],
              regex: new RegExp(regex, "i")
            });
          }
          return tokens;
        };
        Sifter.prototype.iterator = function(object, callback) {
          var iterator;
          if (is_array(object)) {
            iterator = Array.prototype.forEach || function(callback2) {
              for (var i = 0, n = this.length; i < n; i++) {
                callback2(this[i], i, this);
              }
            };
          } else {
            iterator = function(callback2) {
              for (var key in this) {
                if (this.hasOwnProperty(key)) {
                  callback2(this[key], key, this);
                }
              }
            };
          }
          iterator.apply(object, [callback]);
        };
        Sifter.prototype.getScoreFunction = function(search, options) {
          var self, fields, tokens, token_count, nesting;
          self = this;
          search = self.prepareSearch(search, options);
          tokens = search.tokens;
          fields = search.options.fields;
          token_count = tokens.length;
          nesting = search.options.nesting;
          var scoreValue = function(value, token) {
            var score, pos;
            if (!value)
              return 0;
            value = String(value || "");
            pos = value.search(token.regex);
            if (pos === -1)
              return 0;
            score = token.string.length / value.length;
            if (pos === 0)
              score += 0.5;
            return score;
          };
          var scoreObject = function() {
            var field_count = fields.length;
            if (!field_count) {
              return function() {
                return 0;
              };
            }
            if (field_count === 1) {
              return function(token, data) {
                return scoreValue(getattr(data, fields[0], nesting), token);
              };
            }
            return function(token, data) {
              for (var i = 0, sum = 0; i < field_count; i++) {
                sum += scoreValue(getattr(data, fields[i], nesting), token);
              }
              return sum / field_count;
            };
          }();
          if (!token_count) {
            return function() {
              return 0;
            };
          }
          if (token_count === 1) {
            return function(data) {
              return scoreObject(tokens[0], data);
            };
          }
          if (search.options.conjunction === "and") {
            return function(data) {
              var score;
              for (var i = 0, sum = 0; i < token_count; i++) {
                score = scoreObject(tokens[i], data);
                if (score <= 0)
                  return 0;
                sum += score;
              }
              return sum / token_count;
            };
          } else {
            return function(data) {
              for (var i = 0, sum = 0; i < token_count; i++) {
                sum += scoreObject(tokens[i], data);
              }
              return sum / token_count;
            };
          }
        };
        Sifter.prototype.getSortFunction = function(search, options) {
          var i, n, self, field, fields, fields_count, multiplier, multipliers, get_field, implicit_score, sort;
          self = this;
          search = self.prepareSearch(search, options);
          sort = !search.query && options.sort_empty || options.sort;
          get_field = function(name, result) {
            if (name === "$score")
              return result.score;
            return getattr(self.items[result.id], name, options.nesting);
          };
          fields = [];
          if (sort) {
            for (i = 0, n = sort.length; i < n; i++) {
              if (search.query || sort[i].field !== "$score") {
                fields.push(sort[i]);
              }
            }
          }
          if (search.query) {
            implicit_score = true;
            for (i = 0, n = fields.length; i < n; i++) {
              if (fields[i].field === "$score") {
                implicit_score = false;
                break;
              }
            }
            if (implicit_score) {
              fields.unshift({ field: "$score", direction: "desc" });
            }
          } else {
            for (i = 0, n = fields.length; i < n; i++) {
              if (fields[i].field === "$score") {
                fields.splice(i, 1);
                break;
              }
            }
          }
          multipliers = [];
          for (i = 0, n = fields.length; i < n; i++) {
            multipliers.push(fields[i].direction === "desc" ? -1 : 1);
          }
          fields_count = fields.length;
          if (!fields_count) {
            return null;
          } else if (fields_count === 1) {
            field = fields[0].field;
            multiplier = multipliers[0];
            return function(a, b) {
              return multiplier * cmp(get_field(field, a), get_field(field, b));
            };
          } else {
            return function(a, b) {
              var i2, result, a_value, b_value, field2;
              for (i2 = 0; i2 < fields_count; i2++) {
                field2 = fields[i2].field;
                result = multipliers[i2] * cmp(get_field(field2, a), get_field(field2, b));
                if (result)
                  return result;
              }
              return 0;
            };
          }
        };
        Sifter.prototype.prepareSearch = function(query, options) {
          if (typeof query === "object")
            return query;
          options = extend({}, options);
          var option_fields = options.fields;
          var option_sort = options.sort;
          var option_sort_empty = options.sort_empty;
          if (option_fields && !is_array(option_fields))
            options.fields = [option_fields];
          if (option_sort && !is_array(option_sort))
            options.sort = [option_sort];
          if (option_sort_empty && !is_array(option_sort_empty))
            options.sort_empty = [option_sort_empty];
          return {
            options,
            query: String(query || "").toLowerCase(),
            tokens: this.tokenize(query),
            total: 0,
            items: []
          };
        };
        Sifter.prototype.search = function(query, options) {
          var self = this, value, score, search, calculateScore;
          var fn_sort;
          var fn_score;
          search = this.prepareSearch(query, options);
          options = search.options;
          query = search.query;
          fn_score = options.score || self.getScoreFunction(search);
          if (query.length) {
            self.iterator(self.items, function(item, id) {
              score = fn_score(item);
              if (options.filter === false || score > 0) {
                search.items.push({ "score": score, "id": id });
              }
            });
          } else {
            self.iterator(self.items, function(item, id) {
              search.items.push({ "score": 1, "id": id });
            });
          }
          fn_sort = self.getSortFunction(search, options);
          if (fn_sort)
            search.items.sort(fn_sort);
          search.total = search.items.length;
          if (typeof options.limit === "number") {
            search.items = search.items.slice(0, options.limit);
          }
          return search;
        };
        var cmp = function(a, b) {
          if (typeof a === "number" && typeof b === "number") {
            return a > b ? 1 : a < b ? -1 : 0;
          }
          a = asciifold(String(a || ""));
          b = asciifold(String(b || ""));
          if (a > b)
            return 1;
          if (b > a)
            return -1;
          return 0;
        };
        var extend = function(a, b) {
          var i, n, k, object;
          for (i = 1, n = arguments.length; i < n; i++) {
            object = arguments[i];
            if (!object)
              continue;
            for (k in object) {
              if (object.hasOwnProperty(k)) {
                a[k] = object[k];
              }
            }
          }
          return a;
        };
        var getattr = function(obj, name, nesting) {
          if (!obj || !name)
            return;
          if (!nesting)
            return obj[name];
          var names = name.split(".");
          while (names.length && (obj = obj[names.shift()]))
            ;
          return obj;
        };
        var trim = function(str) {
          return (str + "").replace(/^\s+|\s+$|/g, "");
        };
        var escape_regex = function(str) {
          return (str + "").replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
        };
        var is_array = Array.isArray || typeof $ !== "undefined" && $.isArray || function(object) {
          return Object.prototype.toString.call(object) === "[object Array]";
        };
        var DIACRITICS = {
          "a": "[a\u1E00\u1E01\u0102\u0103\xC2\xE2\u01CD\u01CE\u023A\u2C65\u0226\u0227\u1EA0\u1EA1\xC4\xE4\xC0\xE0\xC1\xE1\u0100\u0101\xC3\xE3\xC5\xE5\u0105\u0104\xC3\u0105\u0104]",
          "b": "[b\u2422\u03B2\u0392B\u0E3F\u{10301}\u16D2]",
          "c": "[c\u0106\u0107\u0108\u0109\u010C\u010D\u010A\u010BC\u0304c\u0304\xC7\xE7\u1E08\u1E09\u023B\u023C\u0187\u0188\u0255\u1D04\uFF23\uFF43]",
          "d": "[d\u010E\u010F\u1E0A\u1E0B\u1E10\u1E11\u1E0C\u1E0D\u1E12\u1E13\u1E0E\u1E0F\u0110\u0111D\u0326d\u0326\u0189\u0256\u018A\u0257\u018B\u018C\u1D6D\u1D81\u1D91\u0221\u1D05\uFF24\uFF44\xF0]",
          "e": "[e\xC9\xE9\xC8\xE8\xCA\xEA\u1E18\u1E19\u011A\u011B\u0114\u0115\u1EBC\u1EBD\u1E1A\u1E1B\u1EBA\u1EBB\u0116\u0117\xCB\xEB\u0112\u0113\u0228\u0229\u0118\u0119\u1D92\u0246\u0247\u0204\u0205\u1EBE\u1EBF\u1EC0\u1EC1\u1EC4\u1EC5\u1EC2\u1EC3\u1E1C\u1E1D\u1E16\u1E17\u1E14\u1E15\u0206\u0207\u1EB8\u1EB9\u1EC6\u1EC7\u2C78\u1D07\uFF25\uFF45\u0258\u01DD\u018F\u0190\u03B5]",
          "f": "[f\u0191\u0192\u1E1E\u1E1F]",
          "g": "[g\u0262\u20B2\u01E4\u01E5\u011C\u011D\u011E\u011F\u0122\u0123\u0193\u0260\u0120\u0121]",
          "h": "[h\u0124\u0125\u0126\u0127\u1E28\u1E29\u1E96\u1E96\u1E24\u1E25\u1E22\u1E23\u0266\u02B0\u01F6\u0195]",
          "i": "[i\xCD\xED\xCC\xEC\u012C\u012D\xCE\xEE\u01CF\u01D0\xCF\xEF\u1E2E\u1E2F\u0128\u0129\u012E\u012F\u012A\u012B\u1EC8\u1EC9\u0208\u0209\u020A\u020B\u1ECA\u1ECB\u1E2C\u1E2D\u0197\u0268\u0268\u0306\u1D7B\u1D96\u0130iI\u0131\u026A\uFF29\uFF49]",
          "j": "[j\u0237\u0134\u0135\u0248\u0249\u029D\u025F\u02B2]",
          "k": "[k\u0198\u0199\uA740\uA741\u1E30\u1E31\u01E8\u01E9\u1E32\u1E33\u1E34\u1E35\u03BA\u03F0\u20AD]",
          "l": "[l\u0141\u0142\u013D\u013E\u013B\u013C\u0139\u013A\u1E36\u1E37\u1E38\u1E39\u1E3C\u1E3D\u1E3A\u1E3B\u013F\u0140\u023D\u019A\u2C60\u2C61\u2C62\u026B\u026C\u1D85\u026D\u0234\u029F\uFF2C\uFF4C]",
          "n": "[n\u0143\u0144\u01F8\u01F9\u0147\u0148\xD1\xF1\u1E44\u1E45\u0145\u0146\u1E46\u1E47\u1E4A\u1E4B\u1E48\u1E49N\u0308n\u0308\u019D\u0272\u0220\u019E\u1D70\u1D87\u0273\u0235\u0274\uFF2E\uFF4E\u014A\u014B]",
          "o": "[o\xD8\xF8\xD6\xF6\xD3\xF3\xD2\xF2\xD4\xF4\u01D1\u01D2\u0150\u0151\u014E\u014F\u022E\u022F\u1ECC\u1ECD\u019F\u0275\u01A0\u01A1\u1ECE\u1ECF\u014C\u014D\xD5\xF5\u01EA\u01EB\u020C\u020D\u0555\u0585]",
          "p": "[p\u1E54\u1E55\u1E56\u1E57\u2C63\u1D7D\u01A4\u01A5\u1D71]",
          "q": "[q\uA756\uA757\u02A0\u024A\u024B\uA758\uA759q\u0303]",
          "r": "[r\u0154\u0155\u024C\u024D\u0158\u0159\u0156\u0157\u1E58\u1E59\u0210\u0211\u0212\u0213\u1E5A\u1E5B\u2C64\u027D]",
          "s": "[s\u015A\u015B\u1E60\u1E61\u1E62\u1E63\uA7A8\uA7A9\u015C\u015D\u0160\u0161\u015E\u015F\u0218\u0219S\u0308s\u0308]",
          "t": "[t\u0164\u0165\u1E6A\u1E6B\u0162\u0163\u1E6C\u1E6D\u01AE\u0288\u021A\u021B\u1E70\u1E71\u1E6E\u1E6F\u01AC\u01AD]",
          "u": "[u\u016C\u016D\u0244\u0289\u1EE4\u1EE5\xDC\xFC\xDA\xFA\xD9\xF9\xDB\xFB\u01D3\u01D4\u0170\u0171\u016C\u016D\u01AF\u01B0\u1EE6\u1EE7\u016A\u016B\u0168\u0169\u0172\u0173\u0214\u0215\u222A]",
          "v": "[v\u1E7C\u1E7D\u1E7E\u1E7F\u01B2\u028B\uA75E\uA75F\u2C71\u028B]",
          "w": "[w\u1E82\u1E83\u1E80\u1E81\u0174\u0175\u1E84\u1E85\u1E86\u1E87\u1E88\u1E89]",
          "x": "[x\u1E8C\u1E8D\u1E8A\u1E8B\u03C7]",
          "y": "[y\xDD\xFD\u1EF2\u1EF3\u0176\u0177\u0178\xFF\u1EF8\u1EF9\u1E8E\u1E8F\u1EF4\u1EF5\u024E\u024F\u01B3\u01B4]",
          "z": "[z\u0179\u017A\u1E90\u1E91\u017D\u017E\u017B\u017C\u1E92\u1E93\u1E94\u1E95\u01B5\u01B6]"
        };
        var asciifold = function() {
          var i, n, k, chunk;
          var foreignletters = "";
          var lookup = {};
          for (k in DIACRITICS) {
            if (DIACRITICS.hasOwnProperty(k)) {
              chunk = DIACRITICS[k].substring(2, DIACRITICS[k].length - 1);
              foreignletters += chunk;
              for (i = 0, n = chunk.length; i < n; i++) {
                lookup[chunk.charAt(i)] = k;
              }
            }
          }
          var regexp = new RegExp("[" + foreignletters + "]", "g");
          return function(str) {
            return str.replace(regexp, function(foreignletter) {
              return lookup[foreignletter];
            }).toLowerCase();
          };
        }();
        return Sifter;
      });
    }
  });

  // node_modules/microplugin/src/microplugin.js
  var require_microplugin = __commonJS({
    "node_modules/microplugin/src/microplugin.js"(exports, module) {
      (function(root, factory) {
        if (typeof define === "function" && define.amd) {
          define(factory);
        } else if (typeof exports === "object") {
          module.exports = factory();
        } else {
          root.MicroPlugin = factory();
        }
      })(exports, function() {
        var MicroPlugin = {};
        MicroPlugin.mixin = function(Interface) {
          Interface.plugins = {};
          Interface.prototype.initializePlugins = function(plugins) {
            var i, n, key;
            var self = this;
            var queue = [];
            self.plugins = {
              names: [],
              settings: {},
              requested: {},
              loaded: {}
            };
            if (utils.isArray(plugins)) {
              for (i = 0, n = plugins.length; i < n; i++) {
                if (typeof plugins[i] === "string") {
                  queue.push(plugins[i]);
                } else {
                  self.plugins.settings[plugins[i].name] = plugins[i].options;
                  queue.push(plugins[i].name);
                }
              }
            } else if (plugins) {
              for (key in plugins) {
                if (plugins.hasOwnProperty(key)) {
                  self.plugins.settings[key] = plugins[key];
                  queue.push(key);
                }
              }
            }
            while (queue.length) {
              self.require(queue.shift());
            }
          };
          Interface.prototype.loadPlugin = function(name) {
            var self = this;
            var plugins = self.plugins;
            var plugin = Interface.plugins[name];
            if (!Interface.plugins.hasOwnProperty(name)) {
              throw new Error('Unable to find "' + name + '" plugin');
            }
            plugins.requested[name] = true;
            plugins.loaded[name] = plugin.fn.apply(self, [self.plugins.settings[name] || {}]);
            plugins.names.push(name);
          };
          Interface.prototype.require = function(name) {
            var self = this;
            var plugins = self.plugins;
            if (!self.plugins.loaded.hasOwnProperty(name)) {
              if (plugins.requested[name]) {
                throw new Error('Plugin has circular dependency ("' + name + '")');
              }
              self.loadPlugin(name);
            }
            return plugins.loaded[name];
          };
          Interface.define = function(name, fn) {
            Interface.plugins[name] = {
              "name": name,
              "fn": fn
            };
          };
        };
        var utils = {
          isArray: Array.isArray || function(vArg) {
            return Object.prototype.toString.call(vArg) === "[object Array]";
          }
        };
        return MicroPlugin;
      });
    }
  });

  // node_modules/selectize/dist/js/selectize.js
  var require_selectize = __commonJS({
    "node_modules/selectize/dist/js/selectize.js"(exports, module) {
      (function(root, factory) {
        if (typeof define === "function" && define.amd) {
          define(["jquery", "sifter", "microplugin"], factory);
        } else if (typeof exports === "object") {
          module.exports = factory(require_jquery(), require_sifter(), require_microplugin());
        } else {
          root.Selectize = factory(root.jQuery, root.Sifter, root.MicroPlugin);
        }
      })(exports, function($5, Sifter, MicroPlugin) {
        "use strict";
        var highlight = function($element, pattern) {
          if (typeof pattern === "string" && !pattern.length)
            return;
          var regex = typeof pattern === "string" ? new RegExp(pattern, "i") : pattern;
          var highlight2 = function(node) {
            var skip = 0;
            if (node.nodeType === 3) {
              var pos = node.data.search(regex);
              if (pos >= 0 && node.data.length > 0) {
                var match = node.data.match(regex);
                var spannode = document.createElement("span");
                spannode.className = "highlight";
                var middlebit = node.splitText(pos);
                var endbit = middlebit.splitText(match[0].length);
                var middleclone = middlebit.cloneNode(true);
                spannode.appendChild(middleclone);
                middlebit.parentNode.replaceChild(spannode, middlebit);
                skip = 1;
              }
            } else if (node.nodeType === 1 && node.childNodes && !/(script|style)/i.test(node.tagName) && (node.className !== "highlight" || node.tagName !== "SPAN")) {
              for (var i = 0; i < node.childNodes.length; ++i) {
                i += highlight2(node.childNodes[i]);
              }
            }
            return skip;
          };
          return $element.each(function() {
            highlight2(this);
          });
        };
        $5.fn.removeHighlight = function() {
          return this.find("span.highlight").each(function() {
            this.parentNode.firstChild.nodeName;
            var parent = this.parentNode;
            parent.replaceChild(this.firstChild, this);
            parent.normalize();
          }).end();
        };
        var MicroEvent = function() {
        };
        MicroEvent.prototype = {
          on: function(event, fct) {
            this._events = this._events || {};
            this._events[event] = this._events[event] || [];
            this._events[event].push(fct);
          },
          off: function(event, fct) {
            var n = arguments.length;
            if (n === 0)
              return delete this._events;
            if (n === 1)
              return delete this._events[event];
            this._events = this._events || {};
            if (event in this._events === false)
              return;
            this._events[event].splice(this._events[event].indexOf(fct), 1);
          },
          trigger: function(event) {
            this._events = this._events || {};
            if (event in this._events === false)
              return;
            for (var i = 0; i < this._events[event].length; i++) {
              this._events[event][i].apply(this, Array.prototype.slice.call(arguments, 1));
            }
          }
        };
        MicroEvent.mixin = function(destObject) {
          var props = ["on", "off", "trigger"];
          for (var i = 0; i < props.length; i++) {
            destObject.prototype[props[i]] = MicroEvent.prototype[props[i]];
          }
        };
        var IS_MAC = /Mac/.test(navigator.userAgent);
        var KEY_A = 65;
        var KEY_COMMA = 188;
        var KEY_RETURN = 13;
        var KEY_ESC = 27;
        var KEY_LEFT = 37;
        var KEY_UP = 38;
        var KEY_P = 80;
        var KEY_RIGHT = 39;
        var KEY_DOWN = 40;
        var KEY_N = 78;
        var KEY_BACKSPACE = 8;
        var KEY_DELETE = 46;
        var KEY_SHIFT = 16;
        var KEY_CMD = IS_MAC ? 91 : 17;
        var KEY_CTRL = IS_MAC ? 18 : 17;
        var KEY_TAB = 9;
        var TAG_SELECT = 1;
        var TAG_INPUT = 2;
        var SUPPORTS_VALIDITY_API = !/android/i.test(window.navigator.userAgent) && !!document.createElement("input").validity;
        var isset = function(object) {
          return typeof object !== "undefined";
        };
        var hash_key = function(value) {
          if (typeof value === "undefined" || value === null)
            return null;
          if (typeof value === "boolean")
            return value ? "1" : "0";
          return value + "";
        };
        var escape_html = function(str) {
          return (str + "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
        };
        var escape_replace = function(str) {
          return (str + "").replace(/\$/g, "$$$$");
        };
        var hook = {};
        hook.before = function(self, method, fn) {
          var original = self[method];
          self[method] = function() {
            fn.apply(self, arguments);
            return original.apply(self, arguments);
          };
        };
        hook.after = function(self, method, fn) {
          var original = self[method];
          self[method] = function() {
            var result = original.apply(self, arguments);
            fn.apply(self, arguments);
            return result;
          };
        };
        var once = function(fn) {
          var called = false;
          return function() {
            if (called)
              return;
            called = true;
            fn.apply(this, arguments);
          };
        };
        var debounce = function(fn, delay) {
          var timeout;
          return function() {
            var self = this;
            var args = arguments;
            window.clearTimeout(timeout);
            timeout = window.setTimeout(function() {
              fn.apply(self, args);
            }, delay);
          };
        };
        var debounce_events = function(self, types, fn) {
          var type;
          var trigger = self.trigger;
          var event_args = {};
          self.trigger = function() {
            var type2 = arguments[0];
            if (types.indexOf(type2) !== -1) {
              event_args[type2] = arguments;
            } else {
              return trigger.apply(self, arguments);
            }
          };
          fn.apply(self, []);
          self.trigger = trigger;
          for (type in event_args) {
            if (event_args.hasOwnProperty(type)) {
              trigger.apply(self, event_args[type]);
            }
          }
        };
        var watchChildEvent = function($parent, event, selector, fn) {
          $parent.on(event, selector, function(e) {
            var child = e.target;
            while (child && child.parentNode !== $parent[0]) {
              child = child.parentNode;
            }
            e.currentTarget = child;
            return fn.apply(this, [e]);
          });
        };
        var getSelection = function(input) {
          var result = {};
          if ("selectionStart" in input) {
            result.start = input.selectionStart;
            result.length = input.selectionEnd - result.start;
          } else if (document.selection) {
            input.focus();
            var sel = document.selection.createRange();
            var selLen = document.selection.createRange().text.length;
            sel.moveStart("character", -input.value.length);
            result.start = sel.text.length - selLen;
            result.length = selLen;
          }
          return result;
        };
        var transferStyles = function($from, $to, properties) {
          var i, n, styles = {};
          if (properties) {
            for (i = 0, n = properties.length; i < n; i++) {
              styles[properties[i]] = $from.css(properties[i]);
            }
          } else {
            styles = $from.css();
          }
          $to.css(styles);
        };
        var measureString = function(str, $parent) {
          if (!str) {
            return 0;
          }
          if (!Selectize.$testInput) {
            Selectize.$testInput = $5("<span />").css({
              position: "absolute",
              top: -99999,
              left: -99999,
              width: "auto",
              padding: 0,
              whiteSpace: "pre"
            }).appendTo("body");
          }
          Selectize.$testInput.text(str);
          transferStyles($parent, Selectize.$testInput, [
            "letterSpacing",
            "fontSize",
            "fontFamily",
            "fontWeight",
            "textTransform"
          ]);
          return Selectize.$testInput.width();
        };
        var autoGrow = function($input) {
          var currentWidth = null;
          var update = function(e, options) {
            var value, keyCode, printable, placeholder, width;
            var shift, character, selection;
            e = e || window.event || {};
            options = options || {};
            if (e.metaKey || e.altKey)
              return;
            if (!options.force && $input.data("grow") === false)
              return;
            value = $input.val();
            if (e.type && e.type.toLowerCase() === "keydown") {
              keyCode = e.keyCode;
              printable = keyCode >= 48 && keyCode <= 57 || keyCode >= 65 && keyCode <= 90 || keyCode >= 96 && keyCode <= 111 || keyCode >= 186 && keyCode <= 222 || keyCode === 32;
              if (keyCode === KEY_DELETE || keyCode === KEY_BACKSPACE) {
                selection = getSelection($input[0]);
                if (selection.length) {
                  value = value.substring(0, selection.start) + value.substring(selection.start + selection.length);
                } else if (keyCode === KEY_BACKSPACE && selection.start) {
                  value = value.substring(0, selection.start - 1) + value.substring(selection.start + 1);
                } else if (keyCode === KEY_DELETE && typeof selection.start !== "undefined") {
                  value = value.substring(0, selection.start) + value.substring(selection.start + 1);
                }
              } else if (printable) {
                shift = e.shiftKey;
                character = String.fromCharCode(e.keyCode);
                if (shift)
                  character = character.toUpperCase();
                else
                  character = character.toLowerCase();
                value += character;
              }
            }
            placeholder = $input.attr("placeholder");
            if (!value && placeholder) {
              value = placeholder;
            }
            width = measureString(value, $input) + 4;
            if (width !== currentWidth) {
              currentWidth = width;
              $input.width(width);
              $input.triggerHandler("resize");
            }
          };
          $input.on("keydown keyup update blur", update);
          update();
        };
        var domToString = function(d) {
          var tmp = document.createElement("div");
          tmp.appendChild(d.cloneNode(true));
          return tmp.innerHTML;
        };
        var logError = function(message, options) {
          if (!options)
            options = {};
          var component = "Selectize";
          console.error(component + ": " + message);
          if (options.explanation) {
            if (console.group)
              console.group();
            console.error(options.explanation);
            if (console.group)
              console.groupEnd();
          }
        };
        var Selectize = function($input, settings) {
          var key, i, n, dir, input, self = this;
          input = $input[0];
          input.selectize = self;
          var computedStyle = window.getComputedStyle && window.getComputedStyle(input, null);
          dir = computedStyle ? computedStyle.getPropertyValue("direction") : input.currentStyle && input.currentStyle.direction;
          dir = dir || $input.parents("[dir]:first").attr("dir") || "";
          $5.extend(self, {
            order: 0,
            settings,
            $input,
            tabIndex: $input.attr("tabindex") || "",
            tagType: input.tagName.toLowerCase() === "select" ? TAG_SELECT : TAG_INPUT,
            rtl: /rtl/i.test(dir),
            eventNS: ".selectize" + ++Selectize.count,
            highlightedValue: null,
            isBlurring: false,
            isOpen: false,
            isDisabled: false,
            isRequired: $input.is("[required]"),
            isInvalid: false,
            isLocked: false,
            isFocused: false,
            isInputHidden: false,
            isSetup: false,
            isShiftDown: false,
            isCmdDown: false,
            isCtrlDown: false,
            ignoreFocus: false,
            ignoreBlur: false,
            ignoreHover: false,
            hasOptions: false,
            currentResults: null,
            lastValue: "",
            caretPos: 0,
            loading: 0,
            loadedSearches: {},
            $activeOption: null,
            $activeItems: [],
            optgroups: {},
            options: {},
            userOptions: {},
            items: [],
            renderCache: {},
            onSearchChange: settings.loadThrottle === null ? self.onSearchChange : debounce(self.onSearchChange, settings.loadThrottle)
          });
          self.sifter = new Sifter(this.options, { diacritics: settings.diacritics });
          if (self.settings.options) {
            for (i = 0, n = self.settings.options.length; i < n; i++) {
              self.registerOption(self.settings.options[i]);
            }
            delete self.settings.options;
          }
          if (self.settings.optgroups) {
            for (i = 0, n = self.settings.optgroups.length; i < n; i++) {
              self.registerOptionGroup(self.settings.optgroups[i]);
            }
            delete self.settings.optgroups;
          }
          self.settings.mode = self.settings.mode || (self.settings.maxItems === 1 ? "single" : "multi");
          if (typeof self.settings.hideSelected !== "boolean") {
            self.settings.hideSelected = self.settings.mode === "multi";
          }
          self.initializePlugins(self.settings.plugins);
          self.setupCallbacks();
          self.setupTemplates();
          self.setup();
        };
        MicroEvent.mixin(Selectize);
        if (typeof MicroPlugin !== "undefined") {
          MicroPlugin.mixin(Selectize);
        } else {
          logError("Dependency MicroPlugin is missing", { explanation: 'Make sure you either: (1) are using the "standalone" version of Selectize, or (2) require MicroPlugin before you load Selectize.' });
        }
        $5.extend(Selectize.prototype, {
          setup: function() {
            var self = this;
            var settings = self.settings;
            var eventNS = self.eventNS;
            var $window = $5(window);
            var $document = $5(document);
            var $input = self.$input;
            var $wrapper;
            var $control;
            var $control_input;
            var $dropdown;
            var $dropdown_content;
            var $dropdown_parent;
            var inputMode;
            var timeout_blur;
            var timeout_focus;
            var classes;
            var classes_plugins;
            var inputId;
            inputMode = self.settings.mode;
            classes = $input.attr("class") || "";
            $wrapper = $5("<div>").addClass(settings.wrapperClass).addClass(classes).addClass(inputMode);
            $control = $5("<div>").addClass(settings.inputClass).addClass("items").appendTo($wrapper);
            $control_input = $5('<input type="text" autocomplete="off" />').appendTo($control).attr("tabindex", $input.is(":disabled") ? "-1" : self.tabIndex);
            $dropdown_parent = $5(settings.dropdownParent || $wrapper);
            $dropdown = $5("<div>").addClass(settings.dropdownClass).addClass(inputMode).hide().appendTo($dropdown_parent);
            $dropdown_content = $5("<div>").addClass(settings.dropdownContentClass).appendTo($dropdown);
            if (inputId = $input.attr("id")) {
              $control_input.attr("id", inputId + "-selectized");
              $5("label[for='" + inputId + "']").attr("for", inputId + "-selectized");
            }
            if (self.settings.copyClassesToDropdown) {
              $dropdown.addClass(classes);
            }
            $wrapper.css({
              width: $input[0].style.width
            });
            if (self.plugins.names.length) {
              classes_plugins = "plugin-" + self.plugins.names.join(" plugin-");
              $wrapper.addClass(classes_plugins);
              $dropdown.addClass(classes_plugins);
            }
            if ((settings.maxItems === null || settings.maxItems > 1) && self.tagType === TAG_SELECT) {
              $input.attr("multiple", "multiple");
            }
            if (self.settings.placeholder) {
              $control_input.attr("placeholder", settings.placeholder);
            }
            if (!self.settings.splitOn && self.settings.delimiter) {
              var delimiterEscaped = self.settings.delimiter.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
              self.settings.splitOn = new RegExp("\\s*" + delimiterEscaped + "+\\s*");
            }
            if ($input.attr("autocorrect")) {
              $control_input.attr("autocorrect", $input.attr("autocorrect"));
            }
            if ($input.attr("autocapitalize")) {
              $control_input.attr("autocapitalize", $input.attr("autocapitalize"));
            }
            $control_input[0].type = $input[0].type;
            self.$wrapper = $wrapper;
            self.$control = $control;
            self.$control_input = $control_input;
            self.$dropdown = $dropdown;
            self.$dropdown_content = $dropdown_content;
            $dropdown.on("mouseenter mousedown click", "[data-disabled]>[data-selectable]", function(e) {
              e.stopImmediatePropagation();
            });
            $dropdown.on("mouseenter", "[data-selectable]", function() {
              return self.onOptionHover.apply(self, arguments);
            });
            $dropdown.on("mousedown click", "[data-selectable]", function() {
              return self.onOptionSelect.apply(self, arguments);
            });
            watchChildEvent($control, "mousedown", "*:not(input)", function() {
              return self.onItemSelect.apply(self, arguments);
            });
            autoGrow($control_input);
            $control.on({
              mousedown: function() {
                return self.onMouseDown.apply(self, arguments);
              },
              click: function() {
                return self.onClick.apply(self, arguments);
              }
            });
            $control_input.on({
              mousedown: function(e) {
                e.stopPropagation();
              },
              keydown: function() {
                return self.onKeyDown.apply(self, arguments);
              },
              keyup: function() {
                return self.onKeyUp.apply(self, arguments);
              },
              keypress: function() {
                return self.onKeyPress.apply(self, arguments);
              },
              resize: function() {
                self.positionDropdown.apply(self, []);
              },
              blur: function() {
                return self.onBlur.apply(self, arguments);
              },
              focus: function() {
                self.ignoreBlur = false;
                return self.onFocus.apply(self, arguments);
              },
              paste: function() {
                return self.onPaste.apply(self, arguments);
              }
            });
            $document.on("keydown" + eventNS, function(e) {
              self.isCmdDown = e[IS_MAC ? "metaKey" : "ctrlKey"];
              self.isCtrlDown = e[IS_MAC ? "altKey" : "ctrlKey"];
              self.isShiftDown = e.shiftKey;
            });
            $document.on("keyup" + eventNS, function(e) {
              if (e.keyCode === KEY_CTRL)
                self.isCtrlDown = false;
              if (e.keyCode === KEY_SHIFT)
                self.isShiftDown = false;
              if (e.keyCode === KEY_CMD)
                self.isCmdDown = false;
            });
            $document.on("mousedown" + eventNS, function(e) {
              if (self.isFocused) {
                if (e.target === self.$dropdown[0] || e.target.parentNode === self.$dropdown[0]) {
                  return false;
                }
                if (!self.$control.has(e.target).length && e.target !== self.$control[0]) {
                  self.blur(e.target);
                }
              }
            });
            $window.on(["scroll" + eventNS, "resize" + eventNS].join(" "), function() {
              if (self.isOpen) {
                self.positionDropdown.apply(self, arguments);
              }
            });
            $window.on("mousemove" + eventNS, function() {
              self.ignoreHover = false;
            });
            this.revertSettings = {
              $children: $input.children().detach(),
              tabindex: $input.attr("tabindex")
            };
            $input.attr("tabindex", -1).hide().after(self.$wrapper);
            if ($5.isArray(settings.items)) {
              self.setValue(settings.items);
              delete settings.items;
            }
            if (SUPPORTS_VALIDITY_API) {
              $input.on("invalid" + eventNS, function(e) {
                e.preventDefault();
                self.isInvalid = true;
                self.refreshState();
              });
            }
            self.updateOriginalInput();
            self.refreshItems();
            self.refreshState();
            self.updatePlaceholder();
            self.isSetup = true;
            if ($input.is(":disabled")) {
              self.disable();
            }
            self.on("change", this.onChange);
            $input.data("selectize", self);
            $input.addClass("selectized");
            self.trigger("initialize");
            if (settings.preload === true) {
              self.onSearchChange("");
            }
          },
          setupTemplates: function() {
            var self = this;
            var field_label = self.settings.labelField;
            var field_optgroup = self.settings.optgroupLabelField;
            var templates = {
              "optgroup": function(data) {
                return '<div class="optgroup">' + data.html + "</div>";
              },
              "optgroup_header": function(data, escape) {
                return '<div class="optgroup-header">' + escape(data[field_optgroup]) + "</div>";
              },
              "option": function(data, escape) {
                return '<div class="option">' + escape(data[field_label]) + "</div>";
              },
              "item": function(data, escape) {
                return '<div class="item">' + escape(data[field_label]) + "</div>";
              },
              "option_create": function(data, escape) {
                return '<div class="create">Add <strong>' + escape(data.input) + "</strong>&hellip;</div>";
              }
            };
            self.settings.render = $5.extend({}, templates, self.settings.render);
          },
          setupCallbacks: function() {
            var key, fn, callbacks = {
              "initialize": "onInitialize",
              "change": "onChange",
              "item_add": "onItemAdd",
              "item_remove": "onItemRemove",
              "clear": "onClear",
              "option_add": "onOptionAdd",
              "option_remove": "onOptionRemove",
              "option_clear": "onOptionClear",
              "optgroup_add": "onOptionGroupAdd",
              "optgroup_remove": "onOptionGroupRemove",
              "optgroup_clear": "onOptionGroupClear",
              "dropdown_open": "onDropdownOpen",
              "dropdown_close": "onDropdownClose",
              "type": "onType",
              "load": "onLoad",
              "focus": "onFocus",
              "blur": "onBlur"
            };
            for (key in callbacks) {
              if (callbacks.hasOwnProperty(key)) {
                fn = this.settings[callbacks[key]];
                if (fn)
                  this.on(key, fn);
              }
            }
          },
          onClick: function(e) {
            var self = this;
            if (!self.isFocused || !self.isOpen) {
              self.focus();
              e.preventDefault();
            }
          },
          onMouseDown: function(e) {
            var self = this;
            var defaultPrevented = e.isDefaultPrevented();
            var $target = $5(e.target);
            if (self.isFocused) {
              if (e.target !== self.$control_input[0]) {
                if (self.settings.mode === "single") {
                  self.isOpen ? self.close() : self.open();
                } else if (!defaultPrevented) {
                  self.setActiveItem(null);
                }
                return false;
              }
            } else {
              if (!defaultPrevented) {
                window.setTimeout(function() {
                  self.focus();
                }, 0);
              }
            }
          },
          onChange: function() {
            this.$input.trigger("change");
          },
          onPaste: function(e) {
            var self = this;
            if (self.isFull() || self.isInputHidden || self.isLocked) {
              e.preventDefault();
              return;
            }
            if (self.settings.splitOn) {
              setTimeout(function() {
                var pastedText = self.$control_input.val();
                if (!pastedText.match(self.settings.splitOn)) {
                  return;
                }
                var splitInput = $5.trim(pastedText).split(self.settings.splitOn);
                for (var i = 0, n = splitInput.length; i < n; i++) {
                  self.createItem(splitInput[i]);
                }
              }, 0);
            }
          },
          onKeyPress: function(e) {
            if (this.isLocked)
              return e && e.preventDefault();
            var character = String.fromCharCode(e.keyCode || e.which);
            if (this.settings.create && this.settings.mode === "multi" && character === this.settings.delimiter) {
              this.createItem();
              e.preventDefault();
              return false;
            }
          },
          onKeyDown: function(e) {
            var isInput = e.target === this.$control_input[0];
            var self = this;
            if (self.isLocked) {
              if (e.keyCode !== KEY_TAB) {
                e.preventDefault();
              }
              return;
            }
            switch (e.keyCode) {
              case KEY_A:
                if (self.isCmdDown) {
                  self.selectAll();
                  return;
                }
                break;
              case KEY_ESC:
                if (self.isOpen) {
                  e.preventDefault();
                  e.stopPropagation();
                  self.close();
                }
                return;
              case KEY_N:
                if (!e.ctrlKey || e.altKey)
                  break;
              case KEY_DOWN:
                if (!self.isOpen && self.hasOptions) {
                  self.open();
                } else if (self.$activeOption) {
                  self.ignoreHover = true;
                  var $next = self.getAdjacentOption(self.$activeOption, 1);
                  if ($next.length)
                    self.setActiveOption($next, true, true);
                }
                e.preventDefault();
                return;
              case KEY_P:
                if (!e.ctrlKey || e.altKey)
                  break;
              case KEY_UP:
                if (self.$activeOption) {
                  self.ignoreHover = true;
                  var $prev = self.getAdjacentOption(self.$activeOption, -1);
                  if ($prev.length)
                    self.setActiveOption($prev, true, true);
                }
                e.preventDefault();
                return;
              case KEY_RETURN:
                if (self.isOpen && self.$activeOption) {
                  self.onOptionSelect({ currentTarget: self.$activeOption });
                  e.preventDefault();
                }
                return;
              case KEY_LEFT:
                self.advanceSelection(-1, e);
                return;
              case KEY_RIGHT:
                self.advanceSelection(1, e);
                return;
              case KEY_TAB:
                if (self.settings.selectOnTab && self.isOpen && self.$activeOption) {
                  self.onOptionSelect({ currentTarget: self.$activeOption });
                  if (!self.isFull()) {
                    e.preventDefault();
                  }
                }
                if (self.settings.create && self.createItem()) {
                  e.preventDefault();
                }
                return;
              case KEY_BACKSPACE:
              case KEY_DELETE:
                self.deleteSelection(e);
                return;
            }
            if ((self.isFull() || self.isInputHidden) && !(IS_MAC ? e.metaKey : e.ctrlKey)) {
              e.preventDefault();
              return;
            }
          },
          onKeyUp: function(e) {
            var self = this;
            if (self.isLocked)
              return e && e.preventDefault();
            var value = self.$control_input.val() || "";
            if (self.lastValue !== value) {
              self.lastValue = value;
              self.onSearchChange(value);
              self.refreshOptions();
              self.trigger("type", value);
            }
          },
          onSearchChange: function(value) {
            var self = this;
            var fn = self.settings.load;
            if (!fn)
              return;
            if (self.loadedSearches.hasOwnProperty(value))
              return;
            self.loadedSearches[value] = true;
            self.load(function(callback) {
              fn.apply(self, [value, callback]);
            });
          },
          onFocus: function(e) {
            var self = this;
            var wasFocused = self.isFocused;
            if (self.isDisabled) {
              self.blur();
              e && e.preventDefault();
              return false;
            }
            if (self.ignoreFocus)
              return;
            self.isFocused = true;
            if (self.settings.preload === "focus")
              self.onSearchChange("");
            if (!wasFocused)
              self.trigger("focus");
            if (!self.$activeItems.length) {
              self.showInput();
              self.setActiveItem(null);
              self.refreshOptions(!!self.settings.openOnFocus);
            }
            self.refreshState();
          },
          onBlur: function(e, dest) {
            var self = this;
            if (!self.isFocused)
              return;
            self.isFocused = false;
            if (self.ignoreFocus) {
              return;
            } else if (!self.ignoreBlur && document.activeElement === self.$dropdown_content[0]) {
              self.ignoreBlur = true;
              self.onFocus(e);
              return;
            }
            var deactivate = function() {
              self.close();
              self.setTextboxValue("");
              self.setActiveItem(null);
              self.setActiveOption(null);
              self.setCaret(self.items.length);
              self.refreshState();
              dest && dest.focus && dest.focus();
              self.isBlurring = false;
              self.ignoreFocus = false;
              self.trigger("blur");
            };
            self.isBlurring = true;
            self.ignoreFocus = true;
            if (self.settings.create && self.settings.createOnBlur) {
              self.createItem(null, false, deactivate);
            } else {
              deactivate();
            }
          },
          onOptionHover: function(e) {
            if (this.ignoreHover)
              return;
            this.setActiveOption(e.currentTarget, false);
          },
          onOptionSelect: function(e) {
            var value, $target, $option, self = this;
            if (e.preventDefault) {
              e.preventDefault();
              e.stopPropagation();
            }
            $target = $5(e.currentTarget);
            if ($target.hasClass("create")) {
              self.createItem(null, function() {
                if (self.settings.closeAfterSelect) {
                  self.close();
                }
              });
            } else {
              value = $target.attr("data-value");
              if (typeof value !== "undefined") {
                self.lastQuery = null;
                self.setTextboxValue("");
                self.addItem(value);
                if (self.settings.closeAfterSelect) {
                  self.close();
                } else if (!self.settings.hideSelected && e.type && /mouse/.test(e.type)) {
                  self.setActiveOption(self.getOption(value));
                }
              }
            }
          },
          onItemSelect: function(e) {
            var self = this;
            if (self.isLocked)
              return;
            if (self.settings.mode === "multi") {
              e.preventDefault();
              self.setActiveItem(e.currentTarget, e);
            }
          },
          load: function(fn) {
            var self = this;
            var $wrapper = self.$wrapper.addClass(self.settings.loadingClass);
            self.loading++;
            fn.apply(self, [function(results) {
              self.loading = Math.max(self.loading - 1, 0);
              if (results && results.length) {
                self.addOption(results);
                self.refreshOptions(self.isFocused && !self.isInputHidden);
              }
              if (!self.loading) {
                $wrapper.removeClass(self.settings.loadingClass);
              }
              self.trigger("load", results);
            }]);
          },
          setTextboxValue: function(value) {
            var $input = this.$control_input;
            var changed = $input.val() !== value;
            if (changed) {
              $input.val(value).triggerHandler("update");
              this.lastValue = value;
            }
          },
          getValue: function() {
            if (this.tagType === TAG_SELECT && this.$input.attr("multiple")) {
              return this.items;
            } else {
              return this.items.join(this.settings.delimiter);
            }
          },
          setValue: function(value, silent) {
            var events = silent ? [] : ["change"];
            debounce_events(this, events, function() {
              this.clear(silent);
              this.addItems(value, silent);
            });
          },
          setActiveItem: function($item, e) {
            var self = this;
            var eventName;
            var i, idx, begin, end, item, swap;
            var $last;
            if (self.settings.mode === "single")
              return;
            $item = $5($item);
            if (!$item.length) {
              $5(self.$activeItems).removeClass("active");
              self.$activeItems = [];
              if (self.isFocused) {
                self.showInput();
              }
              return;
            }
            eventName = e && e.type.toLowerCase();
            if (eventName === "mousedown" && self.isShiftDown && self.$activeItems.length) {
              $last = self.$control.children(".active:last");
              begin = Array.prototype.indexOf.apply(self.$control[0].childNodes, [$last[0]]);
              end = Array.prototype.indexOf.apply(self.$control[0].childNodes, [$item[0]]);
              if (begin > end) {
                swap = begin;
                begin = end;
                end = swap;
              }
              for (i = begin; i <= end; i++) {
                item = self.$control[0].childNodes[i];
                if (self.$activeItems.indexOf(item) === -1) {
                  $5(item).addClass("active");
                  self.$activeItems.push(item);
                }
              }
              e.preventDefault();
            } else if (eventName === "mousedown" && self.isCtrlDown || eventName === "keydown" && this.isShiftDown) {
              if ($item.hasClass("active")) {
                idx = self.$activeItems.indexOf($item[0]);
                self.$activeItems.splice(idx, 1);
                $item.removeClass("active");
              } else {
                self.$activeItems.push($item.addClass("active")[0]);
              }
            } else {
              $5(self.$activeItems).removeClass("active");
              self.$activeItems = [$item.addClass("active")[0]];
            }
            self.hideInput();
            if (!this.isFocused) {
              self.focus();
            }
          },
          setActiveOption: function($option, scroll, animate) {
            var height_menu, height_item, y;
            var scroll_top, scroll_bottom;
            var self = this;
            if (self.$activeOption)
              self.$activeOption.removeClass("active");
            self.$activeOption = null;
            $option = $5($option);
            if (!$option.length)
              return;
            self.$activeOption = $option.addClass("active");
            if (scroll || !isset(scroll)) {
              height_menu = self.$dropdown_content.height();
              height_item = self.$activeOption.outerHeight(true);
              scroll = self.$dropdown_content.scrollTop() || 0;
              y = self.$activeOption.offset().top - self.$dropdown_content.offset().top + scroll;
              scroll_top = y;
              scroll_bottom = y - height_menu + height_item;
              if (y + height_item > height_menu + scroll) {
                self.$dropdown_content.stop().animate({ scrollTop: scroll_bottom }, animate ? self.settings.scrollDuration : 0);
              } else if (y < scroll) {
                self.$dropdown_content.stop().animate({ scrollTop: scroll_top }, animate ? self.settings.scrollDuration : 0);
              }
            }
          },
          selectAll: function() {
            var self = this;
            if (self.settings.mode === "single")
              return;
            self.$activeItems = Array.prototype.slice.apply(self.$control.children(":not(input)").addClass("active"));
            if (self.$activeItems.length) {
              self.hideInput();
              self.close();
            }
            self.focus();
          },
          hideInput: function() {
            var self = this;
            self.setTextboxValue("");
            self.$control_input.css({ opacity: 0, position: "absolute", left: self.rtl ? 1e4 : -1e4 });
            self.isInputHidden = true;
          },
          showInput: function() {
            this.$control_input.css({ opacity: 1, position: "relative", left: 0 });
            this.isInputHidden = false;
          },
          focus: function() {
            var self = this;
            if (self.isDisabled)
              return;
            self.ignoreFocus = true;
            self.$control_input[0].focus();
            window.setTimeout(function() {
              self.ignoreFocus = false;
              self.onFocus();
            }, 0);
          },
          blur: function(dest) {
            this.$control_input[0].blur();
            this.onBlur(null, dest);
          },
          getScoreFunction: function(query) {
            return this.sifter.getScoreFunction(query, this.getSearchOptions());
          },
          getSearchOptions: function() {
            var settings = this.settings;
            var sort = settings.sortField;
            if (typeof sort === "string") {
              sort = [{ field: sort }];
            }
            return {
              fields: settings.searchField,
              conjunction: settings.searchConjunction,
              sort,
              nesting: settings.nesting
            };
          },
          search: function(query) {
            var i, value, score, result, calculateScore;
            var self = this;
            var settings = self.settings;
            var options = this.getSearchOptions();
            if (settings.score) {
              calculateScore = self.settings.score.apply(this, [query]);
              if (typeof calculateScore !== "function") {
                throw new Error('Selectize "score" setting must be a function that returns a function');
              }
            }
            if (query !== self.lastQuery) {
              self.lastQuery = query;
              result = self.sifter.search(query, $5.extend(options, { score: calculateScore }));
              self.currentResults = result;
            } else {
              result = $5.extend(true, {}, self.currentResults);
            }
            if (settings.hideSelected) {
              for (i = result.items.length - 1; i >= 0; i--) {
                if (self.items.indexOf(hash_key(result.items[i].id)) !== -1) {
                  result.items.splice(i, 1);
                }
              }
            }
            return result;
          },
          refreshOptions: function(triggerDropdown) {
            var i, j, k, n, groups, groups_order, option, option_html, optgroup, optgroups, html, html_children, has_create_option;
            var $active, $active_before, $create;
            if (typeof triggerDropdown === "undefined") {
              triggerDropdown = true;
            }
            var self = this;
            var query = $5.trim(self.$control_input.val());
            var results = self.search(query);
            var $dropdown_content = self.$dropdown_content;
            var active_before = self.$activeOption && hash_key(self.$activeOption.attr("data-value"));
            n = results.items.length;
            if (typeof self.settings.maxOptions === "number") {
              n = Math.min(n, self.settings.maxOptions);
            }
            groups = {};
            groups_order = [];
            for (i = 0; i < n; i++) {
              option = self.options[results.items[i].id];
              option_html = self.render("option", option);
              optgroup = option[self.settings.optgroupField] || "";
              optgroups = $5.isArray(optgroup) ? optgroup : [optgroup];
              for (j = 0, k = optgroups && optgroups.length; j < k; j++) {
                optgroup = optgroups[j];
                if (!self.optgroups.hasOwnProperty(optgroup)) {
                  optgroup = "";
                }
                if (!groups.hasOwnProperty(optgroup)) {
                  groups[optgroup] = document.createDocumentFragment();
                  groups_order.push(optgroup);
                }
                groups[optgroup].appendChild(option_html);
              }
            }
            if (this.settings.lockOptgroupOrder) {
              groups_order.sort(function(a, b) {
                var a_order = self.optgroups[a].$order || 0;
                var b_order = self.optgroups[b].$order || 0;
                return a_order - b_order;
              });
            }
            html = document.createDocumentFragment();
            for (i = 0, n = groups_order.length; i < n; i++) {
              optgroup = groups_order[i];
              if (self.optgroups.hasOwnProperty(optgroup) && groups[optgroup].childNodes.length) {
                html_children = document.createDocumentFragment();
                html_children.appendChild(self.render("optgroup_header", self.optgroups[optgroup]));
                html_children.appendChild(groups[optgroup]);
                html.appendChild(self.render("optgroup", $5.extend({}, self.optgroups[optgroup], {
                  html: domToString(html_children),
                  dom: html_children
                })));
              } else {
                html.appendChild(groups[optgroup]);
              }
            }
            $dropdown_content.html(html);
            if (self.settings.highlight) {
              $dropdown_content.removeHighlight();
              if (results.query.length && results.tokens.length) {
                for (i = 0, n = results.tokens.length; i < n; i++) {
                  highlight($dropdown_content, results.tokens[i].regex);
                }
              }
            }
            if (!self.settings.hideSelected) {
              for (i = 0, n = self.items.length; i < n; i++) {
                self.getOption(self.items[i]).addClass("selected");
              }
            }
            has_create_option = self.canCreate(query);
            if (has_create_option) {
              $dropdown_content.prepend(self.render("option_create", { input: query }));
              $create = $5($dropdown_content[0].childNodes[0]);
            }
            self.hasOptions = results.items.length > 0 || has_create_option;
            if (self.hasOptions) {
              if (results.items.length > 0) {
                $active_before = active_before && self.getOption(active_before);
                if ($active_before && $active_before.length) {
                  $active = $active_before;
                } else if (self.settings.mode === "single" && self.items.length) {
                  $active = self.getOption(self.items[0]);
                }
                if (!$active || !$active.length) {
                  if ($create && !self.settings.addPrecedence) {
                    $active = self.getAdjacentOption($create, 1);
                  } else {
                    $active = $dropdown_content.find("[data-selectable]:first");
                  }
                }
              } else {
                $active = $create;
              }
              self.setActiveOption($active);
              if (triggerDropdown && !self.isOpen) {
                self.open();
              }
            } else {
              self.setActiveOption(null);
              if (triggerDropdown && self.isOpen) {
                self.close();
              }
            }
          },
          addOption: function(data) {
            var i, n, value, self = this;
            if ($5.isArray(data)) {
              for (i = 0, n = data.length; i < n; i++) {
                self.addOption(data[i]);
              }
              return;
            }
            if (value = self.registerOption(data)) {
              self.userOptions[value] = true;
              self.lastQuery = null;
              self.trigger("option_add", value, data);
            }
          },
          registerOption: function(data) {
            var key = hash_key(data[this.settings.valueField]);
            if (typeof key === "undefined" || key === null || this.options.hasOwnProperty(key))
              return false;
            data.$order = data.$order || ++this.order;
            this.options[key] = data;
            return key;
          },
          registerOptionGroup: function(data) {
            var key = hash_key(data[this.settings.optgroupValueField]);
            if (!key)
              return false;
            data.$order = data.$order || ++this.order;
            this.optgroups[key] = data;
            return key;
          },
          addOptionGroup: function(id, data) {
            data[this.settings.optgroupValueField] = id;
            if (id = this.registerOptionGroup(data)) {
              this.trigger("optgroup_add", id, data);
            }
          },
          removeOptionGroup: function(id) {
            if (this.optgroups.hasOwnProperty(id)) {
              delete this.optgroups[id];
              this.renderCache = {};
              this.trigger("optgroup_remove", id);
            }
          },
          clearOptionGroups: function() {
            this.optgroups = {};
            this.renderCache = {};
            this.trigger("optgroup_clear");
          },
          updateOption: function(value, data) {
            var self = this;
            var $item, $item_new;
            var value_new, index_item, cache_items, cache_options, order_old;
            value = hash_key(value);
            value_new = hash_key(data[self.settings.valueField]);
            if (value === null)
              return;
            if (!self.options.hasOwnProperty(value))
              return;
            if (typeof value_new !== "string")
              throw new Error("Value must be set in option data");
            order_old = self.options[value].$order;
            if (value_new !== value) {
              delete self.options[value];
              index_item = self.items.indexOf(value);
              if (index_item !== -1) {
                self.items.splice(index_item, 1, value_new);
              }
            }
            data.$order = data.$order || order_old;
            self.options[value_new] = data;
            cache_items = self.renderCache["item"];
            cache_options = self.renderCache["option"];
            if (cache_items) {
              delete cache_items[value];
              delete cache_items[value_new];
            }
            if (cache_options) {
              delete cache_options[value];
              delete cache_options[value_new];
            }
            if (self.items.indexOf(value_new) !== -1) {
              $item = self.getItem(value);
              $item_new = $5(self.render("item", data));
              if ($item.hasClass("active"))
                $item_new.addClass("active");
              $item.replaceWith($item_new);
            }
            self.lastQuery = null;
            if (self.isOpen) {
              self.refreshOptions(false);
            }
          },
          removeOption: function(value, silent) {
            var self = this;
            value = hash_key(value);
            var cache_items = self.renderCache["item"];
            var cache_options = self.renderCache["option"];
            if (cache_items)
              delete cache_items[value];
            if (cache_options)
              delete cache_options[value];
            delete self.userOptions[value];
            delete self.options[value];
            self.lastQuery = null;
            self.trigger("option_remove", value);
            self.removeItem(value, silent);
          },
          clearOptions: function() {
            var self = this;
            self.loadedSearches = {};
            self.userOptions = {};
            self.renderCache = {};
            var options = self.options;
            $5.each(self.options, function(key, value) {
              if (self.items.indexOf(key) == -1) {
                delete options[key];
              }
            });
            self.options = self.sifter.items = options;
            self.lastQuery = null;
            self.trigger("option_clear");
          },
          getOption: function(value) {
            return this.getElementWithValue(value, this.$dropdown_content.find("[data-selectable]"));
          },
          getAdjacentOption: function($option, direction) {
            var $options = this.$dropdown.find("[data-selectable]");
            var index = $options.index($option) + direction;
            return index >= 0 && index < $options.length ? $options.eq(index) : $5();
          },
          getElementWithValue: function(value, $els) {
            value = hash_key(value);
            if (typeof value !== "undefined" && value !== null) {
              for (var i = 0, n = $els.length; i < n; i++) {
                if ($els[i].getAttribute("data-value") === value) {
                  return $5($els[i]);
                }
              }
            }
            return $5();
          },
          getItem: function(value) {
            return this.getElementWithValue(value, this.$control.children());
          },
          addItems: function(values, silent) {
            this.buffer = document.createDocumentFragment();
            var childNodes = this.$control[0].childNodes;
            for (var i = 0; i < childNodes.length; i++) {
              this.buffer.appendChild(childNodes[i]);
            }
            var items = $5.isArray(values) ? values : [values];
            for (var i = 0, n = items.length; i < n; i++) {
              this.isPending = i < n - 1;
              this.addItem(items[i], silent);
            }
            var control = this.$control[0];
            control.insertBefore(this.buffer, control.firstChild);
            this.buffer = null;
          },
          addItem: function(value, silent) {
            var events = silent ? [] : ["change"];
            debounce_events(this, events, function() {
              var $item, $option, $options;
              var self = this;
              var inputMode = self.settings.mode;
              var i, active, value_next, wasFull;
              value = hash_key(value);
              if (self.items.indexOf(value) !== -1) {
                if (inputMode === "single")
                  self.close();
                return;
              }
              if (!self.options.hasOwnProperty(value))
                return;
              if (inputMode === "single")
                self.clear(silent);
              if (inputMode === "multi" && self.isFull())
                return;
              $item = $5(self.render("item", self.options[value]));
              wasFull = self.isFull();
              self.items.splice(self.caretPos, 0, value);
              self.insertAtCaret($item);
              if (!self.isPending || !wasFull && self.isFull()) {
                self.refreshState();
              }
              if (self.isSetup) {
                $options = self.$dropdown_content.find("[data-selectable]");
                if (!self.isPending) {
                  $option = self.getOption(value);
                  value_next = self.getAdjacentOption($option, 1).attr("data-value");
                  self.refreshOptions(self.isFocused && inputMode !== "single");
                  if (value_next) {
                    self.setActiveOption(self.getOption(value_next));
                  }
                }
                if (!$options.length || self.isFull()) {
                  self.close();
                } else if (!self.isPending) {
                  self.positionDropdown();
                }
                self.updatePlaceholder();
                self.trigger("item_add", value, $item);
                if (!self.isPending) {
                  self.updateOriginalInput({ silent });
                }
              }
            });
          },
          removeItem: function(value, silent) {
            var self = this;
            var $item, i, idx;
            $item = value instanceof $5 ? value : self.getItem(value);
            value = hash_key($item.attr("data-value"));
            i = self.items.indexOf(value);
            if (i !== -1) {
              $item.remove();
              if ($item.hasClass("active")) {
                idx = self.$activeItems.indexOf($item[0]);
                self.$activeItems.splice(idx, 1);
              }
              self.items.splice(i, 1);
              self.lastQuery = null;
              if (!self.settings.persist && self.userOptions.hasOwnProperty(value)) {
                self.removeOption(value, silent);
              }
              if (i < self.caretPos) {
                self.setCaret(self.caretPos - 1);
              }
              self.refreshState();
              self.updatePlaceholder();
              self.updateOriginalInput({ silent });
              self.positionDropdown();
              self.trigger("item_remove", value, $item);
            }
          },
          createItem: function(input, triggerDropdown) {
            var self = this;
            var caret = self.caretPos;
            input = input || $5.trim(self.$control_input.val() || "");
            var callback = arguments[arguments.length - 1];
            if (typeof callback !== "function")
              callback = function() {
              };
            if (typeof triggerDropdown !== "boolean") {
              triggerDropdown = true;
            }
            if (!self.canCreate(input)) {
              callback();
              return false;
            }
            self.lock();
            var setup = typeof self.settings.create === "function" ? this.settings.create : function(input2) {
              var data = {};
              data[self.settings.labelField] = input2;
              data[self.settings.valueField] = input2;
              return data;
            };
            var create = once(function(data) {
              self.unlock();
              if (!data || typeof data !== "object")
                return callback();
              var value = hash_key(data[self.settings.valueField]);
              if (typeof value !== "string")
                return callback();
              self.setTextboxValue("");
              self.addOption(data);
              self.setCaret(caret);
              self.addItem(value);
              self.refreshOptions(triggerDropdown && self.settings.mode !== "single");
              callback(data);
            });
            var output = setup.apply(this, [input, create]);
            if (typeof output !== "undefined") {
              create(output);
            }
            return true;
          },
          refreshItems: function() {
            this.lastQuery = null;
            if (this.isSetup) {
              this.addItem(this.items);
            }
            this.refreshState();
            this.updateOriginalInput();
          },
          refreshState: function() {
            this.refreshValidityState();
            this.refreshClasses();
          },
          refreshValidityState: function() {
            if (!this.isRequired)
              return false;
            var invalid = !this.items.length;
            this.isInvalid = invalid;
            this.$control_input.prop("required", invalid);
            this.$input.prop("required", !invalid);
          },
          refreshClasses: function() {
            var self = this;
            var isFull = self.isFull();
            var isLocked = self.isLocked;
            self.$wrapper.toggleClass("rtl", self.rtl);
            self.$control.toggleClass("focus", self.isFocused).toggleClass("disabled", self.isDisabled).toggleClass("required", self.isRequired).toggleClass("invalid", self.isInvalid).toggleClass("locked", isLocked).toggleClass("full", isFull).toggleClass("not-full", !isFull).toggleClass("input-active", self.isFocused && !self.isInputHidden).toggleClass("dropdown-active", self.isOpen).toggleClass("has-options", !$5.isEmptyObject(self.options)).toggleClass("has-items", self.items.length > 0);
            self.$control_input.data("grow", !isFull && !isLocked);
          },
          isFull: function() {
            return this.settings.maxItems !== null && this.items.length >= this.settings.maxItems;
          },
          updateOriginalInput: function(opts) {
            var i, n, options, label, self = this;
            opts = opts || {};
            if (self.tagType === TAG_SELECT) {
              options = [];
              for (i = 0, n = self.items.length; i < n; i++) {
                label = self.options[self.items[i]][self.settings.labelField] || "";
                options.push('<option value="' + escape_html(self.items[i]) + '" selected="selected">' + escape_html(label) + "</option>");
              }
              if (!options.length && !this.$input.attr("multiple")) {
                options.push('<option value="" selected="selected"></option>');
              }
              self.$input.html(options.join(""));
            } else {
              self.$input.val(self.getValue());
              self.$input.attr("value", self.$input.val());
            }
            if (self.isSetup) {
              if (!opts.silent) {
                self.trigger("change", self.$input.val());
              }
            }
          },
          updatePlaceholder: function() {
            if (!this.settings.placeholder)
              return;
            var $input = this.$control_input;
            if (this.items.length) {
              $input.removeAttr("placeholder");
            } else {
              $input.attr("placeholder", this.settings.placeholder);
            }
            $input.triggerHandler("update", { force: true });
          },
          open: function() {
            var self = this;
            if (self.isLocked || self.isOpen || self.settings.mode === "multi" && self.isFull())
              return;
            self.focus();
            self.isOpen = true;
            self.refreshState();
            self.$dropdown.css({ visibility: "hidden", display: "block" });
            self.positionDropdown();
            self.$dropdown.css({ visibility: "visible" });
            self.trigger("dropdown_open", self.$dropdown);
          },
          close: function() {
            var self = this;
            var trigger = self.isOpen;
            if (self.settings.mode === "single" && self.items.length) {
              self.hideInput();
              if (!self.isBlurring) {
                self.$control_input.blur();
              }
            }
            self.isOpen = false;
            self.$dropdown.hide();
            self.setActiveOption(null);
            self.refreshState();
            if (trigger)
              self.trigger("dropdown_close", self.$dropdown);
          },
          positionDropdown: function() {
            var $control = this.$control;
            var offset = this.settings.dropdownParent === "body" ? $control.offset() : $control.position();
            offset.top += $control.outerHeight(true);
            this.$dropdown.css({
              width: $control[0].getBoundingClientRect().width,
              top: offset.top,
              left: offset.left
            });
          },
          clear: function(silent) {
            var self = this;
            if (!self.items.length)
              return;
            self.$control.children(":not(input)").remove();
            self.items = [];
            self.lastQuery = null;
            self.setCaret(0);
            self.setActiveItem(null);
            self.updatePlaceholder();
            self.updateOriginalInput({ silent });
            self.refreshState();
            self.showInput();
            self.trigger("clear");
          },
          insertAtCaret: function($el) {
            var caret = Math.min(this.caretPos, this.items.length);
            var el = $el[0];
            var target = this.buffer || this.$control[0];
            if (caret === 0) {
              target.insertBefore(el, target.firstChild);
            } else {
              target.insertBefore(el, target.childNodes[caret]);
            }
            this.setCaret(caret + 1);
          },
          deleteSelection: function(e) {
            var i, n, direction, selection, values, caret, option_select, $option_select, $tail;
            var self = this;
            direction = e && e.keyCode === KEY_BACKSPACE ? -1 : 1;
            selection = getSelection(self.$control_input[0]);
            if (self.$activeOption && !self.settings.hideSelected) {
              option_select = self.getAdjacentOption(self.$activeOption, -1).attr("data-value");
            }
            values = [];
            if (self.$activeItems.length) {
              $tail = self.$control.children(".active:" + (direction > 0 ? "last" : "first"));
              caret = self.$control.children(":not(input)").index($tail);
              if (direction > 0) {
                caret++;
              }
              for (i = 0, n = self.$activeItems.length; i < n; i++) {
                values.push($5(self.$activeItems[i]).attr("data-value"));
              }
              if (e) {
                e.preventDefault();
                e.stopPropagation();
              }
            } else if ((self.isFocused || self.settings.mode === "single") && self.items.length) {
              if (direction < 0 && selection.start === 0 && selection.length === 0) {
                values.push(self.items[self.caretPos - 1]);
              } else if (direction > 0 && selection.start === self.$control_input.val().length) {
                values.push(self.items[self.caretPos]);
              }
            }
            if (!values.length || typeof self.settings.onDelete === "function" && self.settings.onDelete.apply(self, [values]) === false) {
              return false;
            }
            if (typeof caret !== "undefined") {
              self.setCaret(caret);
            }
            while (values.length) {
              self.removeItem(values.pop());
            }
            self.showInput();
            self.positionDropdown();
            self.refreshOptions(true);
            if (option_select) {
              $option_select = self.getOption(option_select);
              if ($option_select.length) {
                self.setActiveOption($option_select);
              }
            }
            return true;
          },
          advanceSelection: function(direction, e) {
            var tail, selection, idx, valueLength, cursorAtEdge, $tail;
            var self = this;
            if (direction === 0)
              return;
            if (self.rtl)
              direction *= -1;
            tail = direction > 0 ? "last" : "first";
            selection = getSelection(self.$control_input[0]);
            if (self.isFocused && !self.isInputHidden) {
              valueLength = self.$control_input.val().length;
              cursorAtEdge = direction < 0 ? selection.start === 0 && selection.length === 0 : selection.start === valueLength;
              if (cursorAtEdge && !valueLength) {
                self.advanceCaret(direction, e);
              }
            } else {
              $tail = self.$control.children(".active:" + tail);
              if ($tail.length) {
                idx = self.$control.children(":not(input)").index($tail);
                self.setActiveItem(null);
                self.setCaret(direction > 0 ? idx + 1 : idx);
              }
            }
          },
          advanceCaret: function(direction, e) {
            var self = this, fn, $adj;
            if (direction === 0)
              return;
            fn = direction > 0 ? "next" : "prev";
            if (self.isShiftDown) {
              $adj = self.$control_input[fn]();
              if ($adj.length) {
                self.hideInput();
                self.setActiveItem($adj);
                e && e.preventDefault();
              }
            } else {
              self.setCaret(self.caretPos + direction);
            }
          },
          setCaret: function(i) {
            var self = this;
            if (self.settings.mode === "single") {
              i = self.items.length;
            } else {
              i = Math.max(0, Math.min(self.items.length, i));
            }
            if (!self.isPending) {
              var j, n, fn, $children, $child;
              $children = self.$control.children(":not(input)");
              for (j = 0, n = $children.length; j < n; j++) {
                $child = $5($children[j]).detach();
                if (j < i) {
                  self.$control_input.before($child);
                } else {
                  self.$control.append($child);
                }
              }
            }
            self.caretPos = i;
          },
          lock: function() {
            this.close();
            this.isLocked = true;
            this.refreshState();
          },
          unlock: function() {
            this.isLocked = false;
            this.refreshState();
          },
          disable: function() {
            var self = this;
            self.$input.prop("disabled", true);
            self.$control_input.prop("disabled", true).prop("tabindex", -1);
            self.isDisabled = true;
            self.lock();
          },
          enable: function() {
            var self = this;
            self.$input.prop("disabled", false);
            self.$control_input.prop("disabled", false).prop("tabindex", self.tabIndex);
            self.isDisabled = false;
            self.unlock();
          },
          destroy: function() {
            var self = this;
            var eventNS = self.eventNS;
            var revertSettings = self.revertSettings;
            self.trigger("destroy");
            self.off();
            self.$wrapper.remove();
            self.$dropdown.remove();
            self.$input.html("").append(revertSettings.$children).removeAttr("tabindex").removeClass("selectized").attr({ tabindex: revertSettings.tabindex }).show();
            self.$control_input.removeData("grow");
            self.$input.removeData("selectize");
            if (--Selectize.count == 0 && Selectize.$testInput) {
              Selectize.$testInput.remove();
              Selectize.$testInput = void 0;
            }
            $5(window).off(eventNS);
            $5(document).off(eventNS);
            $5(document.body).off(eventNS);
            delete self.$input[0].selectize;
          },
          render: function(templateName, data) {
            var value, id, label;
            var html = "";
            var cache = false;
            var self = this;
            var regex_tag = /^[\t \r\n]*<([a-z][a-z0-9\-_]*(?:\:[a-z][a-z0-9\-_]*)?)/i;
            if (templateName === "option" || templateName === "item") {
              value = hash_key(data[self.settings.valueField]);
              cache = !!value;
            }
            if (cache) {
              if (!isset(self.renderCache[templateName])) {
                self.renderCache[templateName] = {};
              }
              if (self.renderCache[templateName].hasOwnProperty(value)) {
                return self.renderCache[templateName][value];
              }
            }
            html = $5(self.settings.render[templateName].apply(this, [data, escape_html]));
            if (templateName === "option" || templateName === "option_create") {
              if (!data[self.settings.disabledField]) {
                html.attr("data-selectable", "");
              }
            } else if (templateName === "optgroup") {
              id = data[self.settings.optgroupValueField] || "";
              html.attr("data-group", id);
              if (data[self.settings.disabledField]) {
                html.attr("data-disabled", "");
              }
            }
            if (templateName === "option" || templateName === "item") {
              html.attr("data-value", value || "");
            }
            if (cache) {
              self.renderCache[templateName][value] = html[0];
            }
            return html[0];
          },
          clearCache: function(templateName) {
            var self = this;
            if (typeof templateName === "undefined") {
              self.renderCache = {};
            } else {
              delete self.renderCache[templateName];
            }
          },
          canCreate: function(input) {
            var self = this;
            if (!self.settings.create)
              return false;
            var filter = self.settings.createFilter;
            return input.length && (typeof filter !== "function" || filter.apply(self, [input])) && (typeof filter !== "string" || new RegExp(filter).test(input)) && (!(filter instanceof RegExp) || filter.test(input));
          }
        });
        Selectize.count = 0;
        Selectize.defaults = {
          options: [],
          optgroups: [],
          plugins: [],
          delimiter: ",",
          splitOn: null,
          persist: true,
          diacritics: true,
          create: false,
          createOnBlur: false,
          createFilter: null,
          highlight: true,
          openOnFocus: true,
          maxOptions: 1e3,
          maxItems: null,
          hideSelected: null,
          addPrecedence: false,
          selectOnTab: false,
          preload: false,
          allowEmptyOption: false,
          closeAfterSelect: false,
          scrollDuration: 60,
          loadThrottle: 300,
          loadingClass: "loading",
          dataAttr: "data-data",
          optgroupField: "optgroup",
          valueField: "value",
          labelField: "text",
          disabledField: "disabled",
          optgroupLabelField: "label",
          optgroupValueField: "value",
          lockOptgroupOrder: false,
          sortField: "$order",
          searchField: ["text"],
          searchConjunction: "and",
          mode: null,
          wrapperClass: "selectize-control",
          inputClass: "selectize-input",
          dropdownClass: "selectize-dropdown",
          dropdownContentClass: "selectize-dropdown-content",
          dropdownParent: null,
          copyClassesToDropdown: true,
          render: {}
        };
        $5.fn.selectize = function(settings_user) {
          var defaults = $5.fn.selectize.defaults;
          var settings = $5.extend({}, defaults, settings_user);
          var attr_data = settings.dataAttr;
          var field_label = settings.labelField;
          var field_value = settings.valueField;
          var field_disabled = settings.disabledField;
          var field_optgroup = settings.optgroupField;
          var field_optgroup_label = settings.optgroupLabelField;
          var field_optgroup_value = settings.optgroupValueField;
          var init_textbox = function($input, settings_element) {
            var i, n, values, option;
            var data_raw = $input.attr(attr_data);
            if (!data_raw) {
              var value = $5.trim($input.val() || "");
              if (!settings.allowEmptyOption && !value.length)
                return;
              values = value.split(settings.delimiter);
              for (i = 0, n = values.length; i < n; i++) {
                option = {};
                option[field_label] = values[i];
                option[field_value] = values[i];
                settings_element.options.push(option);
              }
              settings_element.items = values;
            } else {
              settings_element.options = JSON.parse(data_raw);
              for (i = 0, n = settings_element.options.length; i < n; i++) {
                settings_element.items.push(settings_element.options[i][field_value]);
              }
            }
          };
          var init_select = function($input, settings_element) {
            var i, n, tagName, $children, order = 0;
            var options = settings_element.options;
            var optionsMap = {};
            var readData = function($el) {
              var data = attr_data && $el.attr(attr_data);
              if (typeof data === "string" && data.length) {
                return JSON.parse(data);
              }
              return null;
            };
            var addOption = function($option, group) {
              $option = $5($option);
              var value = hash_key($option.val());
              if (!value && !settings.allowEmptyOption)
                return;
              if (optionsMap.hasOwnProperty(value)) {
                if (group) {
                  var arr = optionsMap[value][field_optgroup];
                  if (!arr) {
                    optionsMap[value][field_optgroup] = group;
                  } else if (!$5.isArray(arr)) {
                    optionsMap[value][field_optgroup] = [arr, group];
                  } else {
                    arr.push(group);
                  }
                }
                return;
              }
              var option = readData($option) || {};
              option[field_label] = option[field_label] || $option.text();
              option[field_value] = option[field_value] || value;
              option[field_disabled] = option[field_disabled] || $option.prop("disabled");
              option[field_optgroup] = option[field_optgroup] || group;
              optionsMap[value] = option;
              options.push(option);
              if ($option.is(":selected")) {
                settings_element.items.push(value);
              }
            };
            var addGroup = function($optgroup) {
              var i2, n2, id, optgroup, $options;
              $optgroup = $5($optgroup);
              id = $optgroup.attr("label");
              if (id) {
                optgroup = readData($optgroup) || {};
                optgroup[field_optgroup_label] = id;
                optgroup[field_optgroup_value] = id;
                optgroup[field_disabled] = $optgroup.prop("disabled");
                settings_element.optgroups.push(optgroup);
              }
              $options = $5("option", $optgroup);
              for (i2 = 0, n2 = $options.length; i2 < n2; i2++) {
                addOption($options[i2], id);
              }
            };
            settings_element.maxItems = $input.attr("multiple") ? null : 1;
            $children = $input.children();
            for (i = 0, n = $children.length; i < n; i++) {
              tagName = $children[i].tagName.toLowerCase();
              if (tagName === "optgroup") {
                addGroup($children[i]);
              } else if (tagName === "option") {
                addOption($children[i]);
              }
            }
          };
          return this.each(function() {
            if (this.selectize)
              return;
            var instance;
            var $input = $5(this);
            var tag_name = this.tagName.toLowerCase();
            var placeholder = $input.attr("placeholder") || $input.attr("data-placeholder");
            if (!placeholder && !settings.allowEmptyOption) {
              placeholder = $input.children('option[value=""]').text();
            }
            var settings_element = {
              "placeholder": placeholder,
              "options": [],
              "optgroups": [],
              "items": []
            };
            if (tag_name === "select") {
              init_select($input, settings_element);
            } else {
              init_textbox($input, settings_element);
            }
            instance = new Selectize($input, $5.extend(true, {}, defaults, settings_element, settings_user));
          });
        };
        $5.fn.selectize.defaults = Selectize.defaults;
        $5.fn.selectize.support = {
          validity: SUPPORTS_VALIDITY_API
        };
        Selectize.define("drag_drop", function(options) {
          if (!$5.fn.sortable)
            throw new Error('The "drag_drop" plugin requires jQuery UI "sortable".');
          if (this.settings.mode !== "multi")
            return;
          var self = this;
          self.lock = function() {
            var original = self.lock;
            return function() {
              var sortable = self.$control.data("sortable");
              if (sortable)
                sortable.disable();
              return original.apply(self, arguments);
            };
          }();
          self.unlock = function() {
            var original = self.unlock;
            return function() {
              var sortable = self.$control.data("sortable");
              if (sortable)
                sortable.enable();
              return original.apply(self, arguments);
            };
          }();
          self.setup = function() {
            var original = self.setup;
            return function() {
              original.apply(this, arguments);
              var $control = self.$control.sortable({
                items: "[data-value]",
                forcePlaceholderSize: true,
                disabled: self.isLocked,
                start: function(e, ui) {
                  ui.placeholder.css("width", ui.helper.css("width"));
                  $control.css({ overflow: "visible" });
                },
                stop: function() {
                  $control.css({ overflow: "hidden" });
                  var active = self.$activeItems ? self.$activeItems.slice() : null;
                  var values = [];
                  $control.children("[data-value]").each(function() {
                    values.push($5(this).attr("data-value"));
                  });
                  self.setValue(values);
                  self.setActiveItem(active);
                }
              });
            };
          }();
        });
        Selectize.define("dropdown_header", function(options) {
          var self = this;
          options = $5.extend({
            title: "Untitled",
            headerClass: "selectize-dropdown-header",
            titleRowClass: "selectize-dropdown-header-title",
            labelClass: "selectize-dropdown-header-label",
            closeClass: "selectize-dropdown-header-close",
            html: function(data) {
              return '<div class="' + data.headerClass + '"><div class="' + data.titleRowClass + '"><span class="' + data.labelClass + '">' + data.title + '</span><a href="javascript:void(0)" class="' + data.closeClass + '">&times;</a></div></div>';
            }
          }, options);
          self.setup = function() {
            var original = self.setup;
            return function() {
              original.apply(self, arguments);
              self.$dropdown_header = $5(options.html(options));
              self.$dropdown.prepend(self.$dropdown_header);
            };
          }();
        });
        Selectize.define("optgroup_columns", function(options) {
          var self = this;
          options = $5.extend({
            equalizeWidth: true,
            equalizeHeight: true
          }, options);
          this.getAdjacentOption = function($option, direction) {
            var $options = $option.closest("[data-group]").find("[data-selectable]");
            var index = $options.index($option) + direction;
            return index >= 0 && index < $options.length ? $options.eq(index) : $5();
          };
          this.onKeyDown = function() {
            var original = self.onKeyDown;
            return function(e) {
              var index, $option, $options, $optgroup;
              if (this.isOpen && (e.keyCode === KEY_LEFT || e.keyCode === KEY_RIGHT)) {
                self.ignoreHover = true;
                $optgroup = this.$activeOption.closest("[data-group]");
                index = $optgroup.find("[data-selectable]").index(this.$activeOption);
                if (e.keyCode === KEY_LEFT) {
                  $optgroup = $optgroup.prev("[data-group]");
                } else {
                  $optgroup = $optgroup.next("[data-group]");
                }
                $options = $optgroup.find("[data-selectable]");
                $option = $options.eq(Math.min($options.length - 1, index));
                if ($option.length) {
                  this.setActiveOption($option);
                }
                return;
              }
              return original.apply(this, arguments);
            };
          }();
          var getScrollbarWidth = function() {
            var div;
            var width = getScrollbarWidth.width;
            var doc = document;
            if (typeof width === "undefined") {
              div = doc.createElement("div");
              div.innerHTML = '<div style="width:50px;height:50px;position:absolute;left:-50px;top:-50px;overflow:auto;"><div style="width:1px;height:100px;"></div></div>';
              div = div.firstChild;
              doc.body.appendChild(div);
              width = getScrollbarWidth.width = div.offsetWidth - div.clientWidth;
              doc.body.removeChild(div);
            }
            return width;
          };
          var equalizeSizes = function() {
            var i, n, height_max, width, width_last, width_parent, $optgroups;
            $optgroups = $5("[data-group]", self.$dropdown_content);
            n = $optgroups.length;
            if (!n || !self.$dropdown_content.width())
              return;
            if (options.equalizeHeight) {
              height_max = 0;
              for (i = 0; i < n; i++) {
                height_max = Math.max(height_max, $optgroups.eq(i).height());
              }
              $optgroups.css({ height: height_max });
            }
            if (options.equalizeWidth) {
              width_parent = self.$dropdown_content.innerWidth() - getScrollbarWidth();
              width = Math.round(width_parent / n);
              $optgroups.css({ width });
              if (n > 1) {
                width_last = width_parent - width * (n - 1);
                $optgroups.eq(n - 1).css({ width: width_last });
              }
            }
          };
          if (options.equalizeHeight || options.equalizeWidth) {
            hook.after(this, "positionDropdown", equalizeSizes);
            hook.after(this, "refreshOptions", equalizeSizes);
          }
        });
        Selectize.define("remove_button", function(options) {
          options = $5.extend({
            label: "&times;",
            title: "Remove",
            className: "remove",
            append: true
          }, options);
          var singleClose = function(thisRef, options2) {
            options2.className = "remove-single";
            var self = thisRef;
            var html = '<a href="javascript:void(0)" class="' + options2.className + '" tabindex="-1" title="' + escape_html(options2.title) + '">' + options2.label + "</a>";
            var append = function(html_container, html_element) {
              return $5("<span>").append(html_container).append(html_element);
            };
            thisRef.setup = function() {
              var original = self.setup;
              return function() {
                if (options2.append) {
                  var id = $5(self.$input.context).attr("id");
                  var selectizer = $5("#" + id);
                  var render_item = self.settings.render.item;
                  self.settings.render.item = function(data) {
                    return append(render_item.apply(thisRef, arguments), html);
                  };
                }
                original.apply(thisRef, arguments);
                thisRef.$control.on("click", "." + options2.className, function(e) {
                  e.preventDefault();
                  if (self.isLocked)
                    return;
                  self.clear();
                });
              };
            }();
          };
          var multiClose = function(thisRef, options2) {
            var self = thisRef;
            var html = '<a href="javascript:void(0)" class="' + options2.className + '" tabindex="-1" title="' + escape_html(options2.title) + '">' + options2.label + "</a>";
            var append = function(html_container, html_element) {
              var pos = html_container.search(/(<\/[^>]+>\s*)$/);
              return html_container.substring(0, pos) + html_element + html_container.substring(pos);
            };
            thisRef.setup = function() {
              var original = self.setup;
              return function() {
                if (options2.append) {
                  var render_item = self.settings.render.item;
                  self.settings.render.item = function(data) {
                    return append(render_item.apply(thisRef, arguments), html);
                  };
                }
                original.apply(thisRef, arguments);
                thisRef.$control.on("click", "." + options2.className, function(e) {
                  e.preventDefault();
                  if (self.isLocked)
                    return;
                  var $item = $5(e.currentTarget).parent();
                  self.setActiveItem($item);
                  if (self.deleteSelection()) {
                    self.setCaret(self.items.length);
                  }
                });
              };
            }();
          };
          if (this.settings.mode === "single") {
            singleClose(this, options);
            return;
          } else {
            multiClose(this, options);
          }
        });
        Selectize.define("restore_on_backspace", function(options) {
          var self = this;
          options.text = options.text || function(option) {
            return option[this.settings.labelField];
          };
          this.onKeyDown = function() {
            var original = self.onKeyDown;
            return function(e) {
              var index, option;
              if (e.keyCode === KEY_BACKSPACE && this.$control_input.val() === "" && !this.$activeItems.length) {
                index = this.caretPos - 1;
                if (index >= 0 && index < this.items.length) {
                  option = this.options[this.items[index]];
                  if (this.deleteSelection(e)) {
                    this.setTextboxValue(options.text.apply(this, [option]));
                    this.refreshOptions(true);
                  }
                  e.preventDefault();
                  return;
                }
              }
              return original.apply(this, arguments);
            };
          }();
        });
        return Selectize;
      });
    }
  });

  // node_modules/moment/moment.js
  var require_moment = __commonJS({
    "node_modules/moment/moment.js"(exports, module) {
      (function(global2, factory) {
        typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : global2.moment = factory();
      })(exports, function() {
        "use strict";
        var hookCallback;
        function hooks() {
          return hookCallback.apply(null, arguments);
        }
        function setHookCallback(callback) {
          hookCallback = callback;
        }
        function isArray(input) {
          return input instanceof Array || Object.prototype.toString.call(input) === "[object Array]";
        }
        function isObject(input) {
          return input != null && Object.prototype.toString.call(input) === "[object Object]";
        }
        function hasOwnProp(a, b) {
          return Object.prototype.hasOwnProperty.call(a, b);
        }
        function isObjectEmpty(obj) {
          if (Object.getOwnPropertyNames) {
            return Object.getOwnPropertyNames(obj).length === 0;
          } else {
            var k;
            for (k in obj) {
              if (hasOwnProp(obj, k)) {
                return false;
              }
            }
            return true;
          }
        }
        function isUndefined(input) {
          return input === void 0;
        }
        function isNumber(input) {
          return typeof input === "number" || Object.prototype.toString.call(input) === "[object Number]";
        }
        function isDate(input) {
          return input instanceof Date || Object.prototype.toString.call(input) === "[object Date]";
        }
        function map(arr, fn) {
          var res = [], i;
          for (i = 0; i < arr.length; ++i) {
            res.push(fn(arr[i], i));
          }
          return res;
        }
        function extend(a, b) {
          for (var i in b) {
            if (hasOwnProp(b, i)) {
              a[i] = b[i];
            }
          }
          if (hasOwnProp(b, "toString")) {
            a.toString = b.toString;
          }
          if (hasOwnProp(b, "valueOf")) {
            a.valueOf = b.valueOf;
          }
          return a;
        }
        function createUTC(input, format2, locale2, strict) {
          return createLocalOrUTC(input, format2, locale2, strict, true).utc();
        }
        function defaultParsingFlags() {
          return {
            empty: false,
            unusedTokens: [],
            unusedInput: [],
            overflow: -2,
            charsLeftOver: 0,
            nullInput: false,
            invalidEra: null,
            invalidMonth: null,
            invalidFormat: false,
            userInvalidated: false,
            iso: false,
            parsedDateParts: [],
            era: null,
            meridiem: null,
            rfc2822: false,
            weekdayMismatch: false
          };
        }
        function getParsingFlags(m) {
          if (m._pf == null) {
            m._pf = defaultParsingFlags();
          }
          return m._pf;
        }
        var some;
        if (Array.prototype.some) {
          some = Array.prototype.some;
        } else {
          some = function(fun) {
            var t = Object(this), len = t.length >>> 0, i;
            for (i = 0; i < len; i++) {
              if (i in t && fun.call(this, t[i], i, t)) {
                return true;
              }
            }
            return false;
          };
        }
        function isValid(m) {
          if (m._isValid == null) {
            var flags = getParsingFlags(m), parsedParts = some.call(flags.parsedDateParts, function(i) {
              return i != null;
            }), isNowValid = !isNaN(m._d.getTime()) && flags.overflow < 0 && !flags.empty && !flags.invalidEra && !flags.invalidMonth && !flags.invalidWeekday && !flags.weekdayMismatch && !flags.nullInput && !flags.invalidFormat && !flags.userInvalidated && (!flags.meridiem || flags.meridiem && parsedParts);
            if (m._strict) {
              isNowValid = isNowValid && flags.charsLeftOver === 0 && flags.unusedTokens.length === 0 && flags.bigHour === void 0;
            }
            if (Object.isFrozen == null || !Object.isFrozen(m)) {
              m._isValid = isNowValid;
            } else {
              return isNowValid;
            }
          }
          return m._isValid;
        }
        function createInvalid(flags) {
          var m = createUTC(NaN);
          if (flags != null) {
            extend(getParsingFlags(m), flags);
          } else {
            getParsingFlags(m).userInvalidated = true;
          }
          return m;
        }
        var momentProperties = hooks.momentProperties = [], updateInProgress = false;
        function copyConfig(to2, from2) {
          var i, prop, val;
          if (!isUndefined(from2._isAMomentObject)) {
            to2._isAMomentObject = from2._isAMomentObject;
          }
          if (!isUndefined(from2._i)) {
            to2._i = from2._i;
          }
          if (!isUndefined(from2._f)) {
            to2._f = from2._f;
          }
          if (!isUndefined(from2._l)) {
            to2._l = from2._l;
          }
          if (!isUndefined(from2._strict)) {
            to2._strict = from2._strict;
          }
          if (!isUndefined(from2._tzm)) {
            to2._tzm = from2._tzm;
          }
          if (!isUndefined(from2._isUTC)) {
            to2._isUTC = from2._isUTC;
          }
          if (!isUndefined(from2._offset)) {
            to2._offset = from2._offset;
          }
          if (!isUndefined(from2._pf)) {
            to2._pf = getParsingFlags(from2);
          }
          if (!isUndefined(from2._locale)) {
            to2._locale = from2._locale;
          }
          if (momentProperties.length > 0) {
            for (i = 0; i < momentProperties.length; i++) {
              prop = momentProperties[i];
              val = from2[prop];
              if (!isUndefined(val)) {
                to2[prop] = val;
              }
            }
          }
          return to2;
        }
        function Moment(config) {
          copyConfig(this, config);
          this._d = new Date(config._d != null ? config._d.getTime() : NaN);
          if (!this.isValid()) {
            this._d = new Date(NaN);
          }
          if (updateInProgress === false) {
            updateInProgress = true;
            hooks.updateOffset(this);
            updateInProgress = false;
          }
        }
        function isMoment(obj) {
          return obj instanceof Moment || obj != null && obj._isAMomentObject != null;
        }
        function warn(msg) {
          if (hooks.suppressDeprecationWarnings === false && typeof console !== "undefined" && console.warn) {
            console.warn("Deprecation warning: " + msg);
          }
        }
        function deprecate(msg, fn) {
          var firstTime = true;
          return extend(function() {
            if (hooks.deprecationHandler != null) {
              hooks.deprecationHandler(null, msg);
            }
            if (firstTime) {
              var args = [], arg, i, key;
              for (i = 0; i < arguments.length; i++) {
                arg = "";
                if (typeof arguments[i] === "object") {
                  arg += "\n[" + i + "] ";
                  for (key in arguments[0]) {
                    if (hasOwnProp(arguments[0], key)) {
                      arg += key + ": " + arguments[0][key] + ", ";
                    }
                  }
                  arg = arg.slice(0, -2);
                } else {
                  arg = arguments[i];
                }
                args.push(arg);
              }
              warn(msg + "\nArguments: " + Array.prototype.slice.call(args).join("") + "\n" + new Error().stack);
              firstTime = false;
            }
            return fn.apply(this, arguments);
          }, fn);
        }
        var deprecations = {};
        function deprecateSimple(name, msg) {
          if (hooks.deprecationHandler != null) {
            hooks.deprecationHandler(name, msg);
          }
          if (!deprecations[name]) {
            warn(msg);
            deprecations[name] = true;
          }
        }
        hooks.suppressDeprecationWarnings = false;
        hooks.deprecationHandler = null;
        function isFunction(input) {
          return typeof Function !== "undefined" && input instanceof Function || Object.prototype.toString.call(input) === "[object Function]";
        }
        function set(config) {
          var prop, i;
          for (i in config) {
            if (hasOwnProp(config, i)) {
              prop = config[i];
              if (isFunction(prop)) {
                this[i] = prop;
              } else {
                this["_" + i] = prop;
              }
            }
          }
          this._config = config;
          this._dayOfMonthOrdinalParseLenient = new RegExp((this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + "|" + /\d{1,2}/.source);
        }
        function mergeConfigs(parentConfig, childConfig) {
          var res = extend({}, parentConfig), prop;
          for (prop in childConfig) {
            if (hasOwnProp(childConfig, prop)) {
              if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
                res[prop] = {};
                extend(res[prop], parentConfig[prop]);
                extend(res[prop], childConfig[prop]);
              } else if (childConfig[prop] != null) {
                res[prop] = childConfig[prop];
              } else {
                delete res[prop];
              }
            }
          }
          for (prop in parentConfig) {
            if (hasOwnProp(parentConfig, prop) && !hasOwnProp(childConfig, prop) && isObject(parentConfig[prop])) {
              res[prop] = extend({}, res[prop]);
            }
          }
          return res;
        }
        function Locale(config) {
          if (config != null) {
            this.set(config);
          }
        }
        var keys;
        if (Object.keys) {
          keys = Object.keys;
        } else {
          keys = function(obj) {
            var i, res = [];
            for (i in obj) {
              if (hasOwnProp(obj, i)) {
                res.push(i);
              }
            }
            return res;
          };
        }
        var defaultCalendar = {
          sameDay: "[Today at] LT",
          nextDay: "[Tomorrow at] LT",
          nextWeek: "dddd [at] LT",
          lastDay: "[Yesterday at] LT",
          lastWeek: "[Last] dddd [at] LT",
          sameElse: "L"
        };
        function calendar(key, mom, now2) {
          var output = this._calendar[key] || this._calendar["sameElse"];
          return isFunction(output) ? output.call(mom, now2) : output;
        }
        function zeroFill(number, targetLength, forceSign) {
          var absNumber = "" + Math.abs(number), zerosToFill = targetLength - absNumber.length, sign2 = number >= 0;
          return (sign2 ? forceSign ? "+" : "" : "-") + Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
        }
        var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g, localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, formatFunctions = {}, formatTokenFunctions = {};
        function addFormatToken(token2, padded, ordinal2, callback) {
          var func = callback;
          if (typeof callback === "string") {
            func = function() {
              return this[callback]();
            };
          }
          if (token2) {
            formatTokenFunctions[token2] = func;
          }
          if (padded) {
            formatTokenFunctions[padded[0]] = function() {
              return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
            };
          }
          if (ordinal2) {
            formatTokenFunctions[ordinal2] = function() {
              return this.localeData().ordinal(func.apply(this, arguments), token2);
            };
          }
        }
        function removeFormattingTokens(input) {
          if (input.match(/\[[\s\S]/)) {
            return input.replace(/^\[|\]$/g, "");
          }
          return input.replace(/\\/g, "");
        }
        function makeFormatFunction(format2) {
          var array = format2.match(formattingTokens), i, length;
          for (i = 0, length = array.length; i < length; i++) {
            if (formatTokenFunctions[array[i]]) {
              array[i] = formatTokenFunctions[array[i]];
            } else {
              array[i] = removeFormattingTokens(array[i]);
            }
          }
          return function(mom) {
            var output = "", i2;
            for (i2 = 0; i2 < length; i2++) {
              output += isFunction(array[i2]) ? array[i2].call(mom, format2) : array[i2];
            }
            return output;
          };
        }
        function formatMoment(m, format2) {
          if (!m.isValid()) {
            return m.localeData().invalidDate();
          }
          format2 = expandFormat(format2, m.localeData());
          formatFunctions[format2] = formatFunctions[format2] || makeFormatFunction(format2);
          return formatFunctions[format2](m);
        }
        function expandFormat(format2, locale2) {
          var i = 5;
          function replaceLongDateFormatTokens(input) {
            return locale2.longDateFormat(input) || input;
          }
          localFormattingTokens.lastIndex = 0;
          while (i >= 0 && localFormattingTokens.test(format2)) {
            format2 = format2.replace(localFormattingTokens, replaceLongDateFormatTokens);
            localFormattingTokens.lastIndex = 0;
            i -= 1;
          }
          return format2;
        }
        var defaultLongDateFormat = {
          LTS: "h:mm:ss A",
          LT: "h:mm A",
          L: "MM/DD/YYYY",
          LL: "MMMM D, YYYY",
          LLL: "MMMM D, YYYY h:mm A",
          LLLL: "dddd, MMMM D, YYYY h:mm A"
        };
        function longDateFormat(key) {
          var format2 = this._longDateFormat[key], formatUpper = this._longDateFormat[key.toUpperCase()];
          if (format2 || !formatUpper) {
            return format2;
          }
          this._longDateFormat[key] = formatUpper.match(formattingTokens).map(function(tok) {
            if (tok === "MMMM" || tok === "MM" || tok === "DD" || tok === "dddd") {
              return tok.slice(1);
            }
            return tok;
          }).join("");
          return this._longDateFormat[key];
        }
        var defaultInvalidDate = "Invalid date";
        function invalidDate() {
          return this._invalidDate;
        }
        var defaultOrdinal = "%d", defaultDayOfMonthOrdinalParse = /\d{1,2}/;
        function ordinal(number) {
          return this._ordinal.replace("%d", number);
        }
        var defaultRelativeTime = {
          future: "in %s",
          past: "%s ago",
          s: "a few seconds",
          ss: "%d seconds",
          m: "a minute",
          mm: "%d minutes",
          h: "an hour",
          hh: "%d hours",
          d: "a day",
          dd: "%d days",
          w: "a week",
          ww: "%d weeks",
          M: "a month",
          MM: "%d months",
          y: "a year",
          yy: "%d years"
        };
        function relativeTime(number, withoutSuffix, string, isFuture) {
          var output = this._relativeTime[string];
          return isFunction(output) ? output(number, withoutSuffix, string, isFuture) : output.replace(/%d/i, number);
        }
        function pastFuture(diff2, output) {
          var format2 = this._relativeTime[diff2 > 0 ? "future" : "past"];
          return isFunction(format2) ? format2(output) : format2.replace(/%s/i, output);
        }
        var aliases = {};
        function addUnitAlias(unit, shorthand) {
          var lowerCase = unit.toLowerCase();
          aliases[lowerCase] = aliases[lowerCase + "s"] = aliases[shorthand] = unit;
        }
        function normalizeUnits(units) {
          return typeof units === "string" ? aliases[units] || aliases[units.toLowerCase()] : void 0;
        }
        function normalizeObjectUnits(inputObject) {
          var normalizedInput = {}, normalizedProp, prop;
          for (prop in inputObject) {
            if (hasOwnProp(inputObject, prop)) {
              normalizedProp = normalizeUnits(prop);
              if (normalizedProp) {
                normalizedInput[normalizedProp] = inputObject[prop];
              }
            }
          }
          return normalizedInput;
        }
        var priorities = {};
        function addUnitPriority(unit, priority) {
          priorities[unit] = priority;
        }
        function getPrioritizedUnits(unitsObj) {
          var units = [], u;
          for (u in unitsObj) {
            if (hasOwnProp(unitsObj, u)) {
              units.push({ unit: u, priority: priorities[u] });
            }
          }
          units.sort(function(a, b) {
            return a.priority - b.priority;
          });
          return units;
        }
        function isLeapYear(year) {
          return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
        }
        function absFloor(number) {
          if (number < 0) {
            return Math.ceil(number) || 0;
          } else {
            return Math.floor(number);
          }
        }
        function toInt(argumentForCoercion) {
          var coercedNumber = +argumentForCoercion, value = 0;
          if (coercedNumber !== 0 && isFinite(coercedNumber)) {
            value = absFloor(coercedNumber);
          }
          return value;
        }
        function makeGetSet(unit, keepTime) {
          return function(value) {
            if (value != null) {
              set$1(this, unit, value);
              hooks.updateOffset(this, keepTime);
              return this;
            } else {
              return get(this, unit);
            }
          };
        }
        function get(mom, unit) {
          return mom.isValid() ? mom._d["get" + (mom._isUTC ? "UTC" : "") + unit]() : NaN;
        }
        function set$1(mom, unit, value) {
          if (mom.isValid() && !isNaN(value)) {
            if (unit === "FullYear" && isLeapYear(mom.year()) && mom.month() === 1 && mom.date() === 29) {
              value = toInt(value);
              mom._d["set" + (mom._isUTC ? "UTC" : "") + unit](value, mom.month(), daysInMonth(value, mom.month()));
            } else {
              mom._d["set" + (mom._isUTC ? "UTC" : "") + unit](value);
            }
          }
        }
        function stringGet(units) {
          units = normalizeUnits(units);
          if (isFunction(this[units])) {
            return this[units]();
          }
          return this;
        }
        function stringSet(units, value) {
          if (typeof units === "object") {
            units = normalizeObjectUnits(units);
            var prioritized = getPrioritizedUnits(units), i;
            for (i = 0; i < prioritized.length; i++) {
              this[prioritized[i].unit](units[prioritized[i].unit]);
            }
          } else {
            units = normalizeUnits(units);
            if (isFunction(this[units])) {
              return this[units](value);
            }
          }
          return this;
        }
        var match1 = /\d/, match2 = /\d\d/, match3 = /\d{3}/, match4 = /\d{4}/, match6 = /[+-]?\d{6}/, match1to2 = /\d\d?/, match3to4 = /\d\d\d\d?/, match5to6 = /\d\d\d\d\d\d?/, match1to3 = /\d{1,3}/, match1to4 = /\d{1,4}/, match1to6 = /[+-]?\d{1,6}/, matchUnsigned = /\d+/, matchSigned = /[+-]?\d+/, matchOffset = /Z|[+-]\d\d:?\d\d/gi, matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi, matchTimestamp = /[+-]?\d+(\.\d{1,3})?/, matchWord = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i, regexes;
        regexes = {};
        function addRegexToken(token2, regex, strictRegex) {
          regexes[token2] = isFunction(regex) ? regex : function(isStrict, localeData2) {
            return isStrict && strictRegex ? strictRegex : regex;
          };
        }
        function getParseRegexForToken(token2, config) {
          if (!hasOwnProp(regexes, token2)) {
            return new RegExp(unescapeFormat(token2));
          }
          return regexes[token2](config._strict, config._locale);
        }
        function unescapeFormat(s) {
          return regexEscape(s.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(matched, p1, p2, p3, p4) {
            return p1 || p2 || p3 || p4;
          }));
        }
        function regexEscape(s) {
          return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
        }
        var tokens = {};
        function addParseToken(token2, callback) {
          var i, func = callback;
          if (typeof token2 === "string") {
            token2 = [token2];
          }
          if (isNumber(callback)) {
            func = function(input, array) {
              array[callback] = toInt(input);
            };
          }
          for (i = 0; i < token2.length; i++) {
            tokens[token2[i]] = func;
          }
        }
        function addWeekParseToken(token2, callback) {
          addParseToken(token2, function(input, array, config, token3) {
            config._w = config._w || {};
            callback(input, config._w, config, token3);
          });
        }
        function addTimeToArrayFromToken(token2, input, config) {
          if (input != null && hasOwnProp(tokens, token2)) {
            tokens[token2](input, config._a, config, token2);
          }
        }
        var YEAR = 0, MONTH = 1, DATE = 2, HOUR = 3, MINUTE = 4, SECOND = 5, MILLISECOND = 6, WEEK = 7, WEEKDAY = 8;
        function mod(n, x) {
          return (n % x + x) % x;
        }
        var indexOf;
        if (Array.prototype.indexOf) {
          indexOf = Array.prototype.indexOf;
        } else {
          indexOf = function(o) {
            var i;
            for (i = 0; i < this.length; ++i) {
              if (this[i] === o) {
                return i;
              }
            }
            return -1;
          };
        }
        function daysInMonth(year, month) {
          if (isNaN(year) || isNaN(month)) {
            return NaN;
          }
          var modMonth = mod(month, 12);
          year += (month - modMonth) / 12;
          return modMonth === 1 ? isLeapYear(year) ? 29 : 28 : 31 - modMonth % 7 % 2;
        }
        addFormatToken("M", ["MM", 2], "Mo", function() {
          return this.month() + 1;
        });
        addFormatToken("MMM", 0, 0, function(format2) {
          return this.localeData().monthsShort(this, format2);
        });
        addFormatToken("MMMM", 0, 0, function(format2) {
          return this.localeData().months(this, format2);
        });
        addUnitAlias("month", "M");
        addUnitPriority("month", 8);
        addRegexToken("M", match1to2);
        addRegexToken("MM", match1to2, match2);
        addRegexToken("MMM", function(isStrict, locale2) {
          return locale2.monthsShortRegex(isStrict);
        });
        addRegexToken("MMMM", function(isStrict, locale2) {
          return locale2.monthsRegex(isStrict);
        });
        addParseToken(["M", "MM"], function(input, array) {
          array[MONTH] = toInt(input) - 1;
        });
        addParseToken(["MMM", "MMMM"], function(input, array, config, token2) {
          var month = config._locale.monthsParse(input, token2, config._strict);
          if (month != null) {
            array[MONTH] = month;
          } else {
            getParsingFlags(config).invalidMonth = input;
          }
        });
        var defaultLocaleMonths = "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), defaultLocaleMonthsShort = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/, defaultMonthsShortRegex = matchWord, defaultMonthsRegex = matchWord;
        function localeMonths(m, format2) {
          if (!m) {
            return isArray(this._months) ? this._months : this._months["standalone"];
          }
          return isArray(this._months) ? this._months[m.month()] : this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(format2) ? "format" : "standalone"][m.month()];
        }
        function localeMonthsShort(m, format2) {
          if (!m) {
            return isArray(this._monthsShort) ? this._monthsShort : this._monthsShort["standalone"];
          }
          return isArray(this._monthsShort) ? this._monthsShort[m.month()] : this._monthsShort[MONTHS_IN_FORMAT.test(format2) ? "format" : "standalone"][m.month()];
        }
        function handleStrictParse(monthName, format2, strict) {
          var i, ii, mom, llc = monthName.toLocaleLowerCase();
          if (!this._monthsParse) {
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
            for (i = 0; i < 12; ++i) {
              mom = createUTC([2e3, i]);
              this._shortMonthsParse[i] = this.monthsShort(mom, "").toLocaleLowerCase();
              this._longMonthsParse[i] = this.months(mom, "").toLocaleLowerCase();
            }
          }
          if (strict) {
            if (format2 === "MMM") {
              ii = indexOf.call(this._shortMonthsParse, llc);
              return ii !== -1 ? ii : null;
            } else {
              ii = indexOf.call(this._longMonthsParse, llc);
              return ii !== -1 ? ii : null;
            }
          } else {
            if (format2 === "MMM") {
              ii = indexOf.call(this._shortMonthsParse, llc);
              if (ii !== -1) {
                return ii;
              }
              ii = indexOf.call(this._longMonthsParse, llc);
              return ii !== -1 ? ii : null;
            } else {
              ii = indexOf.call(this._longMonthsParse, llc);
              if (ii !== -1) {
                return ii;
              }
              ii = indexOf.call(this._shortMonthsParse, llc);
              return ii !== -1 ? ii : null;
            }
          }
        }
        function localeMonthsParse(monthName, format2, strict) {
          var i, mom, regex;
          if (this._monthsParseExact) {
            return handleStrictParse.call(this, monthName, format2, strict);
          }
          if (!this._monthsParse) {
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
          }
          for (i = 0; i < 12; i++) {
            mom = createUTC([2e3, i]);
            if (strict && !this._longMonthsParse[i]) {
              this._longMonthsParse[i] = new RegExp("^" + this.months(mom, "").replace(".", "") + "$", "i");
              this._shortMonthsParse[i] = new RegExp("^" + this.monthsShort(mom, "").replace(".", "") + "$", "i");
            }
            if (!strict && !this._monthsParse[i]) {
              regex = "^" + this.months(mom, "") + "|^" + this.monthsShort(mom, "");
              this._monthsParse[i] = new RegExp(regex.replace(".", ""), "i");
            }
            if (strict && format2 === "MMMM" && this._longMonthsParse[i].test(monthName)) {
              return i;
            } else if (strict && format2 === "MMM" && this._shortMonthsParse[i].test(monthName)) {
              return i;
            } else if (!strict && this._monthsParse[i].test(monthName)) {
              return i;
            }
          }
        }
        function setMonth(mom, value) {
          var dayOfMonth;
          if (!mom.isValid()) {
            return mom;
          }
          if (typeof value === "string") {
            if (/^\d+$/.test(value)) {
              value = toInt(value);
            } else {
              value = mom.localeData().monthsParse(value);
              if (!isNumber(value)) {
                return mom;
              }
            }
          }
          dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
          mom._d["set" + (mom._isUTC ? "UTC" : "") + "Month"](value, dayOfMonth);
          return mom;
        }
        function getSetMonth(value) {
          if (value != null) {
            setMonth(this, value);
            hooks.updateOffset(this, true);
            return this;
          } else {
            return get(this, "Month");
          }
        }
        function getDaysInMonth() {
          return daysInMonth(this.year(), this.month());
        }
        function monthsShortRegex(isStrict) {
          if (this._monthsParseExact) {
            if (!hasOwnProp(this, "_monthsRegex")) {
              computeMonthsParse.call(this);
            }
            if (isStrict) {
              return this._monthsShortStrictRegex;
            } else {
              return this._monthsShortRegex;
            }
          } else {
            if (!hasOwnProp(this, "_monthsShortRegex")) {
              this._monthsShortRegex = defaultMonthsShortRegex;
            }
            return this._monthsShortStrictRegex && isStrict ? this._monthsShortStrictRegex : this._monthsShortRegex;
          }
        }
        function monthsRegex(isStrict) {
          if (this._monthsParseExact) {
            if (!hasOwnProp(this, "_monthsRegex")) {
              computeMonthsParse.call(this);
            }
            if (isStrict) {
              return this._monthsStrictRegex;
            } else {
              return this._monthsRegex;
            }
          } else {
            if (!hasOwnProp(this, "_monthsRegex")) {
              this._monthsRegex = defaultMonthsRegex;
            }
            return this._monthsStrictRegex && isStrict ? this._monthsStrictRegex : this._monthsRegex;
          }
        }
        function computeMonthsParse() {
          function cmpLenRev(a, b) {
            return b.length - a.length;
          }
          var shortPieces = [], longPieces = [], mixedPieces = [], i, mom;
          for (i = 0; i < 12; i++) {
            mom = createUTC([2e3, i]);
            shortPieces.push(this.monthsShort(mom, ""));
            longPieces.push(this.months(mom, ""));
            mixedPieces.push(this.months(mom, ""));
            mixedPieces.push(this.monthsShort(mom, ""));
          }
          shortPieces.sort(cmpLenRev);
          longPieces.sort(cmpLenRev);
          mixedPieces.sort(cmpLenRev);
          for (i = 0; i < 12; i++) {
            shortPieces[i] = regexEscape(shortPieces[i]);
            longPieces[i] = regexEscape(longPieces[i]);
          }
          for (i = 0; i < 24; i++) {
            mixedPieces[i] = regexEscape(mixedPieces[i]);
          }
          this._monthsRegex = new RegExp("^(" + mixedPieces.join("|") + ")", "i");
          this._monthsShortRegex = this._monthsRegex;
          this._monthsStrictRegex = new RegExp("^(" + longPieces.join("|") + ")", "i");
          this._monthsShortStrictRegex = new RegExp("^(" + shortPieces.join("|") + ")", "i");
        }
        addFormatToken("Y", 0, 0, function() {
          var y = this.year();
          return y <= 9999 ? zeroFill(y, 4) : "+" + y;
        });
        addFormatToken(0, ["YY", 2], 0, function() {
          return this.year() % 100;
        });
        addFormatToken(0, ["YYYY", 4], 0, "year");
        addFormatToken(0, ["YYYYY", 5], 0, "year");
        addFormatToken(0, ["YYYYYY", 6, true], 0, "year");
        addUnitAlias("year", "y");
        addUnitPriority("year", 1);
        addRegexToken("Y", matchSigned);
        addRegexToken("YY", match1to2, match2);
        addRegexToken("YYYY", match1to4, match4);
        addRegexToken("YYYYY", match1to6, match6);
        addRegexToken("YYYYYY", match1to6, match6);
        addParseToken(["YYYYY", "YYYYYY"], YEAR);
        addParseToken("YYYY", function(input, array) {
          array[YEAR] = input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
        });
        addParseToken("YY", function(input, array) {
          array[YEAR] = hooks.parseTwoDigitYear(input);
        });
        addParseToken("Y", function(input, array) {
          array[YEAR] = parseInt(input, 10);
        });
        function daysInYear(year) {
          return isLeapYear(year) ? 366 : 365;
        }
        hooks.parseTwoDigitYear = function(input) {
          return toInt(input) + (toInt(input) > 68 ? 1900 : 2e3);
        };
        var getSetYear = makeGetSet("FullYear", true);
        function getIsLeapYear() {
          return isLeapYear(this.year());
        }
        function createDate(y, m, d, h, M, s, ms) {
          var date;
          if (y < 100 && y >= 0) {
            date = new Date(y + 400, m, d, h, M, s, ms);
            if (isFinite(date.getFullYear())) {
              date.setFullYear(y);
            }
          } else {
            date = new Date(y, m, d, h, M, s, ms);
          }
          return date;
        }
        function createUTCDate(y) {
          var date, args;
          if (y < 100 && y >= 0) {
            args = Array.prototype.slice.call(arguments);
            args[0] = y + 400;
            date = new Date(Date.UTC.apply(null, args));
            if (isFinite(date.getUTCFullYear())) {
              date.setUTCFullYear(y);
            }
          } else {
            date = new Date(Date.UTC.apply(null, arguments));
          }
          return date;
        }
        function firstWeekOffset(year, dow, doy) {
          var fwd = 7 + dow - doy, fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;
          return -fwdlw + fwd - 1;
        }
        function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
          var localWeekday = (7 + weekday - dow) % 7, weekOffset = firstWeekOffset(year, dow, doy), dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset, resYear, resDayOfYear;
          if (dayOfYear <= 0) {
            resYear = year - 1;
            resDayOfYear = daysInYear(resYear) + dayOfYear;
          } else if (dayOfYear > daysInYear(year)) {
            resYear = year + 1;
            resDayOfYear = dayOfYear - daysInYear(year);
          } else {
            resYear = year;
            resDayOfYear = dayOfYear;
          }
          return {
            year: resYear,
            dayOfYear: resDayOfYear
          };
        }
        function weekOfYear(mom, dow, doy) {
          var weekOffset = firstWeekOffset(mom.year(), dow, doy), week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1, resWeek, resYear;
          if (week < 1) {
            resYear = mom.year() - 1;
            resWeek = week + weeksInYear(resYear, dow, doy);
          } else if (week > weeksInYear(mom.year(), dow, doy)) {
            resWeek = week - weeksInYear(mom.year(), dow, doy);
            resYear = mom.year() + 1;
          } else {
            resYear = mom.year();
            resWeek = week;
          }
          return {
            week: resWeek,
            year: resYear
          };
        }
        function weeksInYear(year, dow, doy) {
          var weekOffset = firstWeekOffset(year, dow, doy), weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
          return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
        }
        addFormatToken("w", ["ww", 2], "wo", "week");
        addFormatToken("W", ["WW", 2], "Wo", "isoWeek");
        addUnitAlias("week", "w");
        addUnitAlias("isoWeek", "W");
        addUnitPriority("week", 5);
        addUnitPriority("isoWeek", 5);
        addRegexToken("w", match1to2);
        addRegexToken("ww", match1to2, match2);
        addRegexToken("W", match1to2);
        addRegexToken("WW", match1to2, match2);
        addWeekParseToken(["w", "ww", "W", "WW"], function(input, week, config, token2) {
          week[token2.substr(0, 1)] = toInt(input);
        });
        function localeWeek(mom) {
          return weekOfYear(mom, this._week.dow, this._week.doy).week;
        }
        var defaultLocaleWeek = {
          dow: 0,
          doy: 6
        };
        function localeFirstDayOfWeek() {
          return this._week.dow;
        }
        function localeFirstDayOfYear() {
          return this._week.doy;
        }
        function getSetWeek(input) {
          var week = this.localeData().week(this);
          return input == null ? week : this.add((input - week) * 7, "d");
        }
        function getSetISOWeek(input) {
          var week = weekOfYear(this, 1, 4).week;
          return input == null ? week : this.add((input - week) * 7, "d");
        }
        addFormatToken("d", 0, "do", "day");
        addFormatToken("dd", 0, 0, function(format2) {
          return this.localeData().weekdaysMin(this, format2);
        });
        addFormatToken("ddd", 0, 0, function(format2) {
          return this.localeData().weekdaysShort(this, format2);
        });
        addFormatToken("dddd", 0, 0, function(format2) {
          return this.localeData().weekdays(this, format2);
        });
        addFormatToken("e", 0, 0, "weekday");
        addFormatToken("E", 0, 0, "isoWeekday");
        addUnitAlias("day", "d");
        addUnitAlias("weekday", "e");
        addUnitAlias("isoWeekday", "E");
        addUnitPriority("day", 11);
        addUnitPriority("weekday", 11);
        addUnitPriority("isoWeekday", 11);
        addRegexToken("d", match1to2);
        addRegexToken("e", match1to2);
        addRegexToken("E", match1to2);
        addRegexToken("dd", function(isStrict, locale2) {
          return locale2.weekdaysMinRegex(isStrict);
        });
        addRegexToken("ddd", function(isStrict, locale2) {
          return locale2.weekdaysShortRegex(isStrict);
        });
        addRegexToken("dddd", function(isStrict, locale2) {
          return locale2.weekdaysRegex(isStrict);
        });
        addWeekParseToken(["dd", "ddd", "dddd"], function(input, week, config, token2) {
          var weekday = config._locale.weekdaysParse(input, token2, config._strict);
          if (weekday != null) {
            week.d = weekday;
          } else {
            getParsingFlags(config).invalidWeekday = input;
          }
        });
        addWeekParseToken(["d", "e", "E"], function(input, week, config, token2) {
          week[token2] = toInt(input);
        });
        function parseWeekday(input, locale2) {
          if (typeof input !== "string") {
            return input;
          }
          if (!isNaN(input)) {
            return parseInt(input, 10);
          }
          input = locale2.weekdaysParse(input);
          if (typeof input === "number") {
            return input;
          }
          return null;
        }
        function parseIsoWeekday(input, locale2) {
          if (typeof input === "string") {
            return locale2.weekdaysParse(input) % 7 || 7;
          }
          return isNaN(input) ? null : input;
        }
        function shiftWeekdays(ws, n) {
          return ws.slice(n, 7).concat(ws.slice(0, n));
        }
        var defaultLocaleWeekdays = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), defaultLocaleWeekdaysShort = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), defaultLocaleWeekdaysMin = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), defaultWeekdaysRegex = matchWord, defaultWeekdaysShortRegex = matchWord, defaultWeekdaysMinRegex = matchWord;
        function localeWeekdays(m, format2) {
          var weekdays = isArray(this._weekdays) ? this._weekdays : this._weekdays[m && m !== true && this._weekdays.isFormat.test(format2) ? "format" : "standalone"];
          return m === true ? shiftWeekdays(weekdays, this._week.dow) : m ? weekdays[m.day()] : weekdays;
        }
        function localeWeekdaysShort(m) {
          return m === true ? shiftWeekdays(this._weekdaysShort, this._week.dow) : m ? this._weekdaysShort[m.day()] : this._weekdaysShort;
        }
        function localeWeekdaysMin(m) {
          return m === true ? shiftWeekdays(this._weekdaysMin, this._week.dow) : m ? this._weekdaysMin[m.day()] : this._weekdaysMin;
        }
        function handleStrictParse$1(weekdayName, format2, strict) {
          var i, ii, mom, llc = weekdayName.toLocaleLowerCase();
          if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._minWeekdaysParse = [];
            for (i = 0; i < 7; ++i) {
              mom = createUTC([2e3, 1]).day(i);
              this._minWeekdaysParse[i] = this.weekdaysMin(mom, "").toLocaleLowerCase();
              this._shortWeekdaysParse[i] = this.weekdaysShort(mom, "").toLocaleLowerCase();
              this._weekdaysParse[i] = this.weekdays(mom, "").toLocaleLowerCase();
            }
          }
          if (strict) {
            if (format2 === "dddd") {
              ii = indexOf.call(this._weekdaysParse, llc);
              return ii !== -1 ? ii : null;
            } else if (format2 === "ddd") {
              ii = indexOf.call(this._shortWeekdaysParse, llc);
              return ii !== -1 ? ii : null;
            } else {
              ii = indexOf.call(this._minWeekdaysParse, llc);
              return ii !== -1 ? ii : null;
            }
          } else {
            if (format2 === "dddd") {
              ii = indexOf.call(this._weekdaysParse, llc);
              if (ii !== -1) {
                return ii;
              }
              ii = indexOf.call(this._shortWeekdaysParse, llc);
              if (ii !== -1) {
                return ii;
              }
              ii = indexOf.call(this._minWeekdaysParse, llc);
              return ii !== -1 ? ii : null;
            } else if (format2 === "ddd") {
              ii = indexOf.call(this._shortWeekdaysParse, llc);
              if (ii !== -1) {
                return ii;
              }
              ii = indexOf.call(this._weekdaysParse, llc);
              if (ii !== -1) {
                return ii;
              }
              ii = indexOf.call(this._minWeekdaysParse, llc);
              return ii !== -1 ? ii : null;
            } else {
              ii = indexOf.call(this._minWeekdaysParse, llc);
              if (ii !== -1) {
                return ii;
              }
              ii = indexOf.call(this._weekdaysParse, llc);
              if (ii !== -1) {
                return ii;
              }
              ii = indexOf.call(this._shortWeekdaysParse, llc);
              return ii !== -1 ? ii : null;
            }
          }
        }
        function localeWeekdaysParse(weekdayName, format2, strict) {
          var i, mom, regex;
          if (this._weekdaysParseExact) {
            return handleStrictParse$1.call(this, weekdayName, format2, strict);
          }
          if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._minWeekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._fullWeekdaysParse = [];
          }
          for (i = 0; i < 7; i++) {
            mom = createUTC([2e3, 1]).day(i);
            if (strict && !this._fullWeekdaysParse[i]) {
              this._fullWeekdaysParse[i] = new RegExp("^" + this.weekdays(mom, "").replace(".", "\\.?") + "$", "i");
              this._shortWeekdaysParse[i] = new RegExp("^" + this.weekdaysShort(mom, "").replace(".", "\\.?") + "$", "i");
              this._minWeekdaysParse[i] = new RegExp("^" + this.weekdaysMin(mom, "").replace(".", "\\.?") + "$", "i");
            }
            if (!this._weekdaysParse[i]) {
              regex = "^" + this.weekdays(mom, "") + "|^" + this.weekdaysShort(mom, "") + "|^" + this.weekdaysMin(mom, "");
              this._weekdaysParse[i] = new RegExp(regex.replace(".", ""), "i");
            }
            if (strict && format2 === "dddd" && this._fullWeekdaysParse[i].test(weekdayName)) {
              return i;
            } else if (strict && format2 === "ddd" && this._shortWeekdaysParse[i].test(weekdayName)) {
              return i;
            } else if (strict && format2 === "dd" && this._minWeekdaysParse[i].test(weekdayName)) {
              return i;
            } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
              return i;
            }
          }
        }
        function getSetDayOfWeek(input) {
          if (!this.isValid()) {
            return input != null ? this : NaN;
          }
          var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
          if (input != null) {
            input = parseWeekday(input, this.localeData());
            return this.add(input - day, "d");
          } else {
            return day;
          }
        }
        function getSetLocaleDayOfWeek(input) {
          if (!this.isValid()) {
            return input != null ? this : NaN;
          }
          var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
          return input == null ? weekday : this.add(input - weekday, "d");
        }
        function getSetISODayOfWeek(input) {
          if (!this.isValid()) {
            return input != null ? this : NaN;
          }
          if (input != null) {
            var weekday = parseIsoWeekday(input, this.localeData());
            return this.day(this.day() % 7 ? weekday : weekday - 7);
          } else {
            return this.day() || 7;
          }
        }
        function weekdaysRegex(isStrict) {
          if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, "_weekdaysRegex")) {
              computeWeekdaysParse.call(this);
            }
            if (isStrict) {
              return this._weekdaysStrictRegex;
            } else {
              return this._weekdaysRegex;
            }
          } else {
            if (!hasOwnProp(this, "_weekdaysRegex")) {
              this._weekdaysRegex = defaultWeekdaysRegex;
            }
            return this._weekdaysStrictRegex && isStrict ? this._weekdaysStrictRegex : this._weekdaysRegex;
          }
        }
        function weekdaysShortRegex(isStrict) {
          if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, "_weekdaysRegex")) {
              computeWeekdaysParse.call(this);
            }
            if (isStrict) {
              return this._weekdaysShortStrictRegex;
            } else {
              return this._weekdaysShortRegex;
            }
          } else {
            if (!hasOwnProp(this, "_weekdaysShortRegex")) {
              this._weekdaysShortRegex = defaultWeekdaysShortRegex;
            }
            return this._weekdaysShortStrictRegex && isStrict ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
          }
        }
        function weekdaysMinRegex(isStrict) {
          if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, "_weekdaysRegex")) {
              computeWeekdaysParse.call(this);
            }
            if (isStrict) {
              return this._weekdaysMinStrictRegex;
            } else {
              return this._weekdaysMinRegex;
            }
          } else {
            if (!hasOwnProp(this, "_weekdaysMinRegex")) {
              this._weekdaysMinRegex = defaultWeekdaysMinRegex;
            }
            return this._weekdaysMinStrictRegex && isStrict ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
          }
        }
        function computeWeekdaysParse() {
          function cmpLenRev(a, b) {
            return b.length - a.length;
          }
          var minPieces = [], shortPieces = [], longPieces = [], mixedPieces = [], i, mom, minp, shortp, longp;
          for (i = 0; i < 7; i++) {
            mom = createUTC([2e3, 1]).day(i);
            minp = regexEscape(this.weekdaysMin(mom, ""));
            shortp = regexEscape(this.weekdaysShort(mom, ""));
            longp = regexEscape(this.weekdays(mom, ""));
            minPieces.push(minp);
            shortPieces.push(shortp);
            longPieces.push(longp);
            mixedPieces.push(minp);
            mixedPieces.push(shortp);
            mixedPieces.push(longp);
          }
          minPieces.sort(cmpLenRev);
          shortPieces.sort(cmpLenRev);
          longPieces.sort(cmpLenRev);
          mixedPieces.sort(cmpLenRev);
          this._weekdaysRegex = new RegExp("^(" + mixedPieces.join("|") + ")", "i");
          this._weekdaysShortRegex = this._weekdaysRegex;
          this._weekdaysMinRegex = this._weekdaysRegex;
          this._weekdaysStrictRegex = new RegExp("^(" + longPieces.join("|") + ")", "i");
          this._weekdaysShortStrictRegex = new RegExp("^(" + shortPieces.join("|") + ")", "i");
          this._weekdaysMinStrictRegex = new RegExp("^(" + minPieces.join("|") + ")", "i");
        }
        function hFormat() {
          return this.hours() % 12 || 12;
        }
        function kFormat() {
          return this.hours() || 24;
        }
        addFormatToken("H", ["HH", 2], 0, "hour");
        addFormatToken("h", ["hh", 2], 0, hFormat);
        addFormatToken("k", ["kk", 2], 0, kFormat);
        addFormatToken("hmm", 0, 0, function() {
          return "" + hFormat.apply(this) + zeroFill(this.minutes(), 2);
        });
        addFormatToken("hmmss", 0, 0, function() {
          return "" + hFormat.apply(this) + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2);
        });
        addFormatToken("Hmm", 0, 0, function() {
          return "" + this.hours() + zeroFill(this.minutes(), 2);
        });
        addFormatToken("Hmmss", 0, 0, function() {
          return "" + this.hours() + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2);
        });
        function meridiem(token2, lowercase) {
          addFormatToken(token2, 0, 0, function() {
            return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
          });
        }
        meridiem("a", true);
        meridiem("A", false);
        addUnitAlias("hour", "h");
        addUnitPriority("hour", 13);
        function matchMeridiem(isStrict, locale2) {
          return locale2._meridiemParse;
        }
        addRegexToken("a", matchMeridiem);
        addRegexToken("A", matchMeridiem);
        addRegexToken("H", match1to2);
        addRegexToken("h", match1to2);
        addRegexToken("k", match1to2);
        addRegexToken("HH", match1to2, match2);
        addRegexToken("hh", match1to2, match2);
        addRegexToken("kk", match1to2, match2);
        addRegexToken("hmm", match3to4);
        addRegexToken("hmmss", match5to6);
        addRegexToken("Hmm", match3to4);
        addRegexToken("Hmmss", match5to6);
        addParseToken(["H", "HH"], HOUR);
        addParseToken(["k", "kk"], function(input, array, config) {
          var kInput = toInt(input);
          array[HOUR] = kInput === 24 ? 0 : kInput;
        });
        addParseToken(["a", "A"], function(input, array, config) {
          config._isPm = config._locale.isPM(input);
          config._meridiem = input;
        });
        addParseToken(["h", "hh"], function(input, array, config) {
          array[HOUR] = toInt(input);
          getParsingFlags(config).bigHour = true;
        });
        addParseToken("hmm", function(input, array, config) {
          var pos = input.length - 2;
          array[HOUR] = toInt(input.substr(0, pos));
          array[MINUTE] = toInt(input.substr(pos));
          getParsingFlags(config).bigHour = true;
        });
        addParseToken("hmmss", function(input, array, config) {
          var pos1 = input.length - 4, pos2 = input.length - 2;
          array[HOUR] = toInt(input.substr(0, pos1));
          array[MINUTE] = toInt(input.substr(pos1, 2));
          array[SECOND] = toInt(input.substr(pos2));
          getParsingFlags(config).bigHour = true;
        });
        addParseToken("Hmm", function(input, array, config) {
          var pos = input.length - 2;
          array[HOUR] = toInt(input.substr(0, pos));
          array[MINUTE] = toInt(input.substr(pos));
        });
        addParseToken("Hmmss", function(input, array, config) {
          var pos1 = input.length - 4, pos2 = input.length - 2;
          array[HOUR] = toInt(input.substr(0, pos1));
          array[MINUTE] = toInt(input.substr(pos1, 2));
          array[SECOND] = toInt(input.substr(pos2));
        });
        function localeIsPM(input) {
          return (input + "").toLowerCase().charAt(0) === "p";
        }
        var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i, getSetHour = makeGetSet("Hours", true);
        function localeMeridiem(hours2, minutes2, isLower) {
          if (hours2 > 11) {
            return isLower ? "pm" : "PM";
          } else {
            return isLower ? "am" : "AM";
          }
        }
        var baseConfig = {
          calendar: defaultCalendar,
          longDateFormat: defaultLongDateFormat,
          invalidDate: defaultInvalidDate,
          ordinal: defaultOrdinal,
          dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
          relativeTime: defaultRelativeTime,
          months: defaultLocaleMonths,
          monthsShort: defaultLocaleMonthsShort,
          week: defaultLocaleWeek,
          weekdays: defaultLocaleWeekdays,
          weekdaysMin: defaultLocaleWeekdaysMin,
          weekdaysShort: defaultLocaleWeekdaysShort,
          meridiemParse: defaultLocaleMeridiemParse
        };
        var locales = {}, localeFamilies = {}, globalLocale;
        function commonPrefix(arr1, arr2) {
          var i, minl = Math.min(arr1.length, arr2.length);
          for (i = 0; i < minl; i += 1) {
            if (arr1[i] !== arr2[i]) {
              return i;
            }
          }
          return minl;
        }
        function normalizeLocale(key) {
          return key ? key.toLowerCase().replace("_", "-") : key;
        }
        function chooseLocale(names) {
          var i = 0, j, next, locale2, split;
          while (i < names.length) {
            split = normalizeLocale(names[i]).split("-");
            j = split.length;
            next = normalizeLocale(names[i + 1]);
            next = next ? next.split("-") : null;
            while (j > 0) {
              locale2 = loadLocale(split.slice(0, j).join("-"));
              if (locale2) {
                return locale2;
              }
              if (next && next.length >= j && commonPrefix(split, next) >= j - 1) {
                break;
              }
              j--;
            }
            i++;
          }
          return globalLocale;
        }
        function loadLocale(name) {
          var oldLocale = null, aliasedRequire;
          if (locales[name] === void 0 && typeof module !== "undefined" && module && module.exports) {
            try {
              oldLocale = globalLocale._abbr;
              aliasedRequire = __require;
              aliasedRequire("./locale/" + name);
              getSetGlobalLocale(oldLocale);
            } catch (e) {
              locales[name] = null;
            }
          }
          return locales[name];
        }
        function getSetGlobalLocale(key, values) {
          var data;
          if (key) {
            if (isUndefined(values)) {
              data = getLocale(key);
            } else {
              data = defineLocale(key, values);
            }
            if (data) {
              globalLocale = data;
            } else {
              if (typeof console !== "undefined" && console.warn) {
                console.warn("Locale " + key + " not found. Did you forget to load it?");
              }
            }
          }
          return globalLocale._abbr;
        }
        function defineLocale(name, config) {
          if (config !== null) {
            var locale2, parentConfig = baseConfig;
            config.abbr = name;
            if (locales[name] != null) {
              deprecateSimple("defineLocaleOverride", "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info.");
              parentConfig = locales[name]._config;
            } else if (config.parentLocale != null) {
              if (locales[config.parentLocale] != null) {
                parentConfig = locales[config.parentLocale]._config;
              } else {
                locale2 = loadLocale(config.parentLocale);
                if (locale2 != null) {
                  parentConfig = locale2._config;
                } else {
                  if (!localeFamilies[config.parentLocale]) {
                    localeFamilies[config.parentLocale] = [];
                  }
                  localeFamilies[config.parentLocale].push({
                    name,
                    config
                  });
                  return null;
                }
              }
            }
            locales[name] = new Locale(mergeConfigs(parentConfig, config));
            if (localeFamilies[name]) {
              localeFamilies[name].forEach(function(x) {
                defineLocale(x.name, x.config);
              });
            }
            getSetGlobalLocale(name);
            return locales[name];
          } else {
            delete locales[name];
            return null;
          }
        }
        function updateLocale(name, config) {
          if (config != null) {
            var locale2, tmpLocale, parentConfig = baseConfig;
            if (locales[name] != null && locales[name].parentLocale != null) {
              locales[name].set(mergeConfigs(locales[name]._config, config));
            } else {
              tmpLocale = loadLocale(name);
              if (tmpLocale != null) {
                parentConfig = tmpLocale._config;
              }
              config = mergeConfigs(parentConfig, config);
              if (tmpLocale == null) {
                config.abbr = name;
              }
              locale2 = new Locale(config);
              locale2.parentLocale = locales[name];
              locales[name] = locale2;
            }
            getSetGlobalLocale(name);
          } else {
            if (locales[name] != null) {
              if (locales[name].parentLocale != null) {
                locales[name] = locales[name].parentLocale;
                if (name === getSetGlobalLocale()) {
                  getSetGlobalLocale(name);
                }
              } else if (locales[name] != null) {
                delete locales[name];
              }
            }
          }
          return locales[name];
        }
        function getLocale(key) {
          var locale2;
          if (key && key._locale && key._locale._abbr) {
            key = key._locale._abbr;
          }
          if (!key) {
            return globalLocale;
          }
          if (!isArray(key)) {
            locale2 = loadLocale(key);
            if (locale2) {
              return locale2;
            }
            key = [key];
          }
          return chooseLocale(key);
        }
        function listLocales() {
          return keys(locales);
        }
        function checkOverflow(m) {
          var overflow, a = m._a;
          if (a && getParsingFlags(m).overflow === -2) {
            overflow = a[MONTH] < 0 || a[MONTH] > 11 ? MONTH : a[DATE] < 1 || a[DATE] > daysInMonth(a[YEAR], a[MONTH]) ? DATE : a[HOUR] < 0 || a[HOUR] > 24 || a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0) ? HOUR : a[MINUTE] < 0 || a[MINUTE] > 59 ? MINUTE : a[SECOND] < 0 || a[SECOND] > 59 ? SECOND : a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND : -1;
            if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
              overflow = DATE;
            }
            if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
              overflow = WEEK;
            }
            if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
              overflow = WEEKDAY;
            }
            getParsingFlags(m).overflow = overflow;
          }
          return m;
        }
        var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, tzRegex = /Z|[+-]\d\d(?::?\d\d)?/, isoDates = [
          ["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/],
          ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/],
          ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/],
          ["GGGG-[W]WW", /\d{4}-W\d\d/, false],
          ["YYYY-DDD", /\d{4}-\d{3}/],
          ["YYYY-MM", /\d{4}-\d\d/, false],
          ["YYYYYYMMDD", /[+-]\d{10}/],
          ["YYYYMMDD", /\d{8}/],
          ["GGGG[W]WWE", /\d{4}W\d{3}/],
          ["GGGG[W]WW", /\d{4}W\d{2}/, false],
          ["YYYYDDD", /\d{7}/],
          ["YYYYMM", /\d{6}/, false],
          ["YYYY", /\d{4}/, false]
        ], isoTimes = [
          ["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/],
          ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/],
          ["HH:mm:ss", /\d\d:\d\d:\d\d/],
          ["HH:mm", /\d\d:\d\d/],
          ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/],
          ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/],
          ["HHmmss", /\d\d\d\d\d\d/],
          ["HHmm", /\d\d\d\d/],
          ["HH", /\d\d/]
        ], aspNetJsonRegex = /^\/?Date\((-?\d+)/i, rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/, obsOffsets = {
          UT: 0,
          GMT: 0,
          EDT: -4 * 60,
          EST: -5 * 60,
          CDT: -5 * 60,
          CST: -6 * 60,
          MDT: -6 * 60,
          MST: -7 * 60,
          PDT: -7 * 60,
          PST: -8 * 60
        };
        function configFromISO(config) {
          var i, l, string = config._i, match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string), allowTime, dateFormat, timeFormat, tzFormat;
          if (match) {
            getParsingFlags(config).iso = true;
            for (i = 0, l = isoDates.length; i < l; i++) {
              if (isoDates[i][1].exec(match[1])) {
                dateFormat = isoDates[i][0];
                allowTime = isoDates[i][2] !== false;
                break;
              }
            }
            if (dateFormat == null) {
              config._isValid = false;
              return;
            }
            if (match[3]) {
              for (i = 0, l = isoTimes.length; i < l; i++) {
                if (isoTimes[i][1].exec(match[3])) {
                  timeFormat = (match[2] || " ") + isoTimes[i][0];
                  break;
                }
              }
              if (timeFormat == null) {
                config._isValid = false;
                return;
              }
            }
            if (!allowTime && timeFormat != null) {
              config._isValid = false;
              return;
            }
            if (match[4]) {
              if (tzRegex.exec(match[4])) {
                tzFormat = "Z";
              } else {
                config._isValid = false;
                return;
              }
            }
            config._f = dateFormat + (timeFormat || "") + (tzFormat || "");
            configFromStringAndFormat(config);
          } else {
            config._isValid = false;
          }
        }
        function extractFromRFC2822Strings(yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
          var result = [
            untruncateYear(yearStr),
            defaultLocaleMonthsShort.indexOf(monthStr),
            parseInt(dayStr, 10),
            parseInt(hourStr, 10),
            parseInt(minuteStr, 10)
          ];
          if (secondStr) {
            result.push(parseInt(secondStr, 10));
          }
          return result;
        }
        function untruncateYear(yearStr) {
          var year = parseInt(yearStr, 10);
          if (year <= 49) {
            return 2e3 + year;
          } else if (year <= 999) {
            return 1900 + year;
          }
          return year;
        }
        function preprocessRFC2822(s) {
          return s.replace(/\([^)]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, "");
        }
        function checkWeekday(weekdayStr, parsedInput, config) {
          if (weekdayStr) {
            var weekdayProvided = defaultLocaleWeekdaysShort.indexOf(weekdayStr), weekdayActual = new Date(parsedInput[0], parsedInput[1], parsedInput[2]).getDay();
            if (weekdayProvided !== weekdayActual) {
              getParsingFlags(config).weekdayMismatch = true;
              config._isValid = false;
              return false;
            }
          }
          return true;
        }
        function calculateOffset(obsOffset, militaryOffset, numOffset) {
          if (obsOffset) {
            return obsOffsets[obsOffset];
          } else if (militaryOffset) {
            return 0;
          } else {
            var hm = parseInt(numOffset, 10), m = hm % 100, h = (hm - m) / 100;
            return h * 60 + m;
          }
        }
        function configFromRFC2822(config) {
          var match = rfc2822.exec(preprocessRFC2822(config._i)), parsedArray;
          if (match) {
            parsedArray = extractFromRFC2822Strings(match[4], match[3], match[2], match[5], match[6], match[7]);
            if (!checkWeekday(match[1], parsedArray, config)) {
              return;
            }
            config._a = parsedArray;
            config._tzm = calculateOffset(match[8], match[9], match[10]);
            config._d = createUTCDate.apply(null, config._a);
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
            getParsingFlags(config).rfc2822 = true;
          } else {
            config._isValid = false;
          }
        }
        function configFromString(config) {
          var matched = aspNetJsonRegex.exec(config._i);
          if (matched !== null) {
            config._d = new Date(+matched[1]);
            return;
          }
          configFromISO(config);
          if (config._isValid === false) {
            delete config._isValid;
          } else {
            return;
          }
          configFromRFC2822(config);
          if (config._isValid === false) {
            delete config._isValid;
          } else {
            return;
          }
          if (config._strict) {
            config._isValid = false;
          } else {
            hooks.createFromInputFallback(config);
          }
        }
        hooks.createFromInputFallback = deprecate("value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.", function(config) {
          config._d = new Date(config._i + (config._useUTC ? " UTC" : ""));
        });
        function defaults(a, b, c) {
          if (a != null) {
            return a;
          }
          if (b != null) {
            return b;
          }
          return c;
        }
        function currentDateArray(config) {
          var nowValue = new Date(hooks.now());
          if (config._useUTC) {
            return [
              nowValue.getUTCFullYear(),
              nowValue.getUTCMonth(),
              nowValue.getUTCDate()
            ];
          }
          return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
        }
        function configFromArray(config) {
          var i, date, input = [], currentDate, expectedWeekday, yearToUse;
          if (config._d) {
            return;
          }
          currentDate = currentDateArray(config);
          if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
            dayOfYearFromWeekInfo(config);
          }
          if (config._dayOfYear != null) {
            yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);
            if (config._dayOfYear > daysInYear(yearToUse) || config._dayOfYear === 0) {
              getParsingFlags(config)._overflowDayOfYear = true;
            }
            date = createUTCDate(yearToUse, 0, config._dayOfYear);
            config._a[MONTH] = date.getUTCMonth();
            config._a[DATE] = date.getUTCDate();
          }
          for (i = 0; i < 3 && config._a[i] == null; ++i) {
            config._a[i] = input[i] = currentDate[i];
          }
          for (; i < 7; i++) {
            config._a[i] = input[i] = config._a[i] == null ? i === 2 ? 1 : 0 : config._a[i];
          }
          if (config._a[HOUR] === 24 && config._a[MINUTE] === 0 && config._a[SECOND] === 0 && config._a[MILLISECOND] === 0) {
            config._nextDay = true;
            config._a[HOUR] = 0;
          }
          config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
          expectedWeekday = config._useUTC ? config._d.getUTCDay() : config._d.getDay();
          if (config._tzm != null) {
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
          }
          if (config._nextDay) {
            config._a[HOUR] = 24;
          }
          if (config._w && typeof config._w.d !== "undefined" && config._w.d !== expectedWeekday) {
            getParsingFlags(config).weekdayMismatch = true;
          }
        }
        function dayOfYearFromWeekInfo(config) {
          var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow, curWeek;
          w = config._w;
          if (w.GG != null || w.W != null || w.E != null) {
            dow = 1;
            doy = 4;
            weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(createLocal(), 1, 4).year);
            week = defaults(w.W, 1);
            weekday = defaults(w.E, 1);
            if (weekday < 1 || weekday > 7) {
              weekdayOverflow = true;
            }
          } else {
            dow = config._locale._week.dow;
            doy = config._locale._week.doy;
            curWeek = weekOfYear(createLocal(), dow, doy);
            weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);
            week = defaults(w.w, curWeek.week);
            if (w.d != null) {
              weekday = w.d;
              if (weekday < 0 || weekday > 6) {
                weekdayOverflow = true;
              }
            } else if (w.e != null) {
              weekday = w.e + dow;
              if (w.e < 0 || w.e > 6) {
                weekdayOverflow = true;
              }
            } else {
              weekday = dow;
            }
          }
          if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
            getParsingFlags(config)._overflowWeeks = true;
          } else if (weekdayOverflow != null) {
            getParsingFlags(config)._overflowWeekday = true;
          } else {
            temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
            config._a[YEAR] = temp.year;
            config._dayOfYear = temp.dayOfYear;
          }
        }
        hooks.ISO_8601 = function() {
        };
        hooks.RFC_2822 = function() {
        };
        function configFromStringAndFormat(config) {
          if (config._f === hooks.ISO_8601) {
            configFromISO(config);
            return;
          }
          if (config._f === hooks.RFC_2822) {
            configFromRFC2822(config);
            return;
          }
          config._a = [];
          getParsingFlags(config).empty = true;
          var string = "" + config._i, i, parsedInput, tokens2, token2, skipped, stringLength = string.length, totalParsedInputLength = 0, era;
          tokens2 = expandFormat(config._f, config._locale).match(formattingTokens) || [];
          for (i = 0; i < tokens2.length; i++) {
            token2 = tokens2[i];
            parsedInput = (string.match(getParseRegexForToken(token2, config)) || [])[0];
            if (parsedInput) {
              skipped = string.substr(0, string.indexOf(parsedInput));
              if (skipped.length > 0) {
                getParsingFlags(config).unusedInput.push(skipped);
              }
              string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
              totalParsedInputLength += parsedInput.length;
            }
            if (formatTokenFunctions[token2]) {
              if (parsedInput) {
                getParsingFlags(config).empty = false;
              } else {
                getParsingFlags(config).unusedTokens.push(token2);
              }
              addTimeToArrayFromToken(token2, parsedInput, config);
            } else if (config._strict && !parsedInput) {
              getParsingFlags(config).unusedTokens.push(token2);
            }
          }
          getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
          if (string.length > 0) {
            getParsingFlags(config).unusedInput.push(string);
          }
          if (config._a[HOUR] <= 12 && getParsingFlags(config).bigHour === true && config._a[HOUR] > 0) {
            getParsingFlags(config).bigHour = void 0;
          }
          getParsingFlags(config).parsedDateParts = config._a.slice(0);
          getParsingFlags(config).meridiem = config._meridiem;
          config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);
          era = getParsingFlags(config).era;
          if (era !== null) {
            config._a[YEAR] = config._locale.erasConvertYear(era, config._a[YEAR]);
          }
          configFromArray(config);
          checkOverflow(config);
        }
        function meridiemFixWrap(locale2, hour, meridiem2) {
          var isPm;
          if (meridiem2 == null) {
            return hour;
          }
          if (locale2.meridiemHour != null) {
            return locale2.meridiemHour(hour, meridiem2);
          } else if (locale2.isPM != null) {
            isPm = locale2.isPM(meridiem2);
            if (isPm && hour < 12) {
              hour += 12;
            }
            if (!isPm && hour === 12) {
              hour = 0;
            }
            return hour;
          } else {
            return hour;
          }
        }
        function configFromStringAndArray(config) {
          var tempConfig, bestMoment, scoreToBeat, i, currentScore, validFormatFound, bestFormatIsValid = false;
          if (config._f.length === 0) {
            getParsingFlags(config).invalidFormat = true;
            config._d = new Date(NaN);
            return;
          }
          for (i = 0; i < config._f.length; i++) {
            currentScore = 0;
            validFormatFound = false;
            tempConfig = copyConfig({}, config);
            if (config._useUTC != null) {
              tempConfig._useUTC = config._useUTC;
            }
            tempConfig._f = config._f[i];
            configFromStringAndFormat(tempConfig);
            if (isValid(tempConfig)) {
              validFormatFound = true;
            }
            currentScore += getParsingFlags(tempConfig).charsLeftOver;
            currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;
            getParsingFlags(tempConfig).score = currentScore;
            if (!bestFormatIsValid) {
              if (scoreToBeat == null || currentScore < scoreToBeat || validFormatFound) {
                scoreToBeat = currentScore;
                bestMoment = tempConfig;
                if (validFormatFound) {
                  bestFormatIsValid = true;
                }
              }
            } else {
              if (currentScore < scoreToBeat) {
                scoreToBeat = currentScore;
                bestMoment = tempConfig;
              }
            }
          }
          extend(config, bestMoment || tempConfig);
        }
        function configFromObject(config) {
          if (config._d) {
            return;
          }
          var i = normalizeObjectUnits(config._i), dayOrDate = i.day === void 0 ? i.date : i.day;
          config._a = map([i.year, i.month, dayOrDate, i.hour, i.minute, i.second, i.millisecond], function(obj) {
            return obj && parseInt(obj, 10);
          });
          configFromArray(config);
        }
        function createFromConfig(config) {
          var res = new Moment(checkOverflow(prepareConfig(config)));
          if (res._nextDay) {
            res.add(1, "d");
            res._nextDay = void 0;
          }
          return res;
        }
        function prepareConfig(config) {
          var input = config._i, format2 = config._f;
          config._locale = config._locale || getLocale(config._l);
          if (input === null || format2 === void 0 && input === "") {
            return createInvalid({ nullInput: true });
          }
          if (typeof input === "string") {
            config._i = input = config._locale.preparse(input);
          }
          if (isMoment(input)) {
            return new Moment(checkOverflow(input));
          } else if (isDate(input)) {
            config._d = input;
          } else if (isArray(format2)) {
            configFromStringAndArray(config);
          } else if (format2) {
            configFromStringAndFormat(config);
          } else {
            configFromInput(config);
          }
          if (!isValid(config)) {
            config._d = null;
          }
          return config;
        }
        function configFromInput(config) {
          var input = config._i;
          if (isUndefined(input)) {
            config._d = new Date(hooks.now());
          } else if (isDate(input)) {
            config._d = new Date(input.valueOf());
          } else if (typeof input === "string") {
            configFromString(config);
          } else if (isArray(input)) {
            config._a = map(input.slice(0), function(obj) {
              return parseInt(obj, 10);
            });
            configFromArray(config);
          } else if (isObject(input)) {
            configFromObject(config);
          } else if (isNumber(input)) {
            config._d = new Date(input);
          } else {
            hooks.createFromInputFallback(config);
          }
        }
        function createLocalOrUTC(input, format2, locale2, strict, isUTC) {
          var c = {};
          if (format2 === true || format2 === false) {
            strict = format2;
            format2 = void 0;
          }
          if (locale2 === true || locale2 === false) {
            strict = locale2;
            locale2 = void 0;
          }
          if (isObject(input) && isObjectEmpty(input) || isArray(input) && input.length === 0) {
            input = void 0;
          }
          c._isAMomentObject = true;
          c._useUTC = c._isUTC = isUTC;
          c._l = locale2;
          c._i = input;
          c._f = format2;
          c._strict = strict;
          return createFromConfig(c);
        }
        function createLocal(input, format2, locale2, strict) {
          return createLocalOrUTC(input, format2, locale2, strict, false);
        }
        var prototypeMin = deprecate("moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/", function() {
          var other = createLocal.apply(null, arguments);
          if (this.isValid() && other.isValid()) {
            return other < this ? this : other;
          } else {
            return createInvalid();
          }
        }), prototypeMax = deprecate("moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/", function() {
          var other = createLocal.apply(null, arguments);
          if (this.isValid() && other.isValid()) {
            return other > this ? this : other;
          } else {
            return createInvalid();
          }
        });
        function pickBy(fn, moments) {
          var res, i;
          if (moments.length === 1 && isArray(moments[0])) {
            moments = moments[0];
          }
          if (!moments.length) {
            return createLocal();
          }
          res = moments[0];
          for (i = 1; i < moments.length; ++i) {
            if (!moments[i].isValid() || moments[i][fn](res)) {
              res = moments[i];
            }
          }
          return res;
        }
        function min() {
          var args = [].slice.call(arguments, 0);
          return pickBy("isBefore", args);
        }
        function max() {
          var args = [].slice.call(arguments, 0);
          return pickBy("isAfter", args);
        }
        var now = function() {
          return Date.now ? Date.now() : +new Date();
        };
        var ordering = [
          "year",
          "quarter",
          "month",
          "week",
          "day",
          "hour",
          "minute",
          "second",
          "millisecond"
        ];
        function isDurationValid(m) {
          var key, unitHasDecimal = false, i;
          for (key in m) {
            if (hasOwnProp(m, key) && !(indexOf.call(ordering, key) !== -1 && (m[key] == null || !isNaN(m[key])))) {
              return false;
            }
          }
          for (i = 0; i < ordering.length; ++i) {
            if (m[ordering[i]]) {
              if (unitHasDecimal) {
                return false;
              }
              if (parseFloat(m[ordering[i]]) !== toInt(m[ordering[i]])) {
                unitHasDecimal = true;
              }
            }
          }
          return true;
        }
        function isValid$1() {
          return this._isValid;
        }
        function createInvalid$1() {
          return createDuration(NaN);
        }
        function Duration(duration) {
          var normalizedInput = normalizeObjectUnits(duration), years2 = normalizedInput.year || 0, quarters = normalizedInput.quarter || 0, months2 = normalizedInput.month || 0, weeks2 = normalizedInput.week || normalizedInput.isoWeek || 0, days2 = normalizedInput.day || 0, hours2 = normalizedInput.hour || 0, minutes2 = normalizedInput.minute || 0, seconds2 = normalizedInput.second || 0, milliseconds2 = normalizedInput.millisecond || 0;
          this._isValid = isDurationValid(normalizedInput);
          this._milliseconds = +milliseconds2 + seconds2 * 1e3 + minutes2 * 6e4 + hours2 * 1e3 * 60 * 60;
          this._days = +days2 + weeks2 * 7;
          this._months = +months2 + quarters * 3 + years2 * 12;
          this._data = {};
          this._locale = getLocale();
          this._bubble();
        }
        function isDuration(obj) {
          return obj instanceof Duration;
        }
        function absRound(number) {
          if (number < 0) {
            return Math.round(-1 * number) * -1;
          } else {
            return Math.round(number);
          }
        }
        function compareArrays(array1, array2, dontConvert) {
          var len = Math.min(array1.length, array2.length), lengthDiff = Math.abs(array1.length - array2.length), diffs = 0, i;
          for (i = 0; i < len; i++) {
            if (dontConvert && array1[i] !== array2[i] || !dontConvert && toInt(array1[i]) !== toInt(array2[i])) {
              diffs++;
            }
          }
          return diffs + lengthDiff;
        }
        function offset(token2, separator) {
          addFormatToken(token2, 0, 0, function() {
            var offset2 = this.utcOffset(), sign2 = "+";
            if (offset2 < 0) {
              offset2 = -offset2;
              sign2 = "-";
            }
            return sign2 + zeroFill(~~(offset2 / 60), 2) + separator + zeroFill(~~offset2 % 60, 2);
          });
        }
        offset("Z", ":");
        offset("ZZ", "");
        addRegexToken("Z", matchShortOffset);
        addRegexToken("ZZ", matchShortOffset);
        addParseToken(["Z", "ZZ"], function(input, array, config) {
          config._useUTC = true;
          config._tzm = offsetFromString(matchShortOffset, input);
        });
        var chunkOffset = /([\+\-]|\d\d)/gi;
        function offsetFromString(matcher, string) {
          var matches = (string || "").match(matcher), chunk, parts, minutes2;
          if (matches === null) {
            return null;
          }
          chunk = matches[matches.length - 1] || [];
          parts = (chunk + "").match(chunkOffset) || ["-", 0, 0];
          minutes2 = +(parts[1] * 60) + toInt(parts[2]);
          return minutes2 === 0 ? 0 : parts[0] === "+" ? minutes2 : -minutes2;
        }
        function cloneWithOffset(input, model) {
          var res, diff2;
          if (model._isUTC) {
            res = model.clone();
            diff2 = (isMoment(input) || isDate(input) ? input.valueOf() : createLocal(input).valueOf()) - res.valueOf();
            res._d.setTime(res._d.valueOf() + diff2);
            hooks.updateOffset(res, false);
            return res;
          } else {
            return createLocal(input).local();
          }
        }
        function getDateOffset(m) {
          return -Math.round(m._d.getTimezoneOffset());
        }
        hooks.updateOffset = function() {
        };
        function getSetOffset(input, keepLocalTime, keepMinutes) {
          var offset2 = this._offset || 0, localAdjust;
          if (!this.isValid()) {
            return input != null ? this : NaN;
          }
          if (input != null) {
            if (typeof input === "string") {
              input = offsetFromString(matchShortOffset, input);
              if (input === null) {
                return this;
              }
            } else if (Math.abs(input) < 16 && !keepMinutes) {
              input = input * 60;
            }
            if (!this._isUTC && keepLocalTime) {
              localAdjust = getDateOffset(this);
            }
            this._offset = input;
            this._isUTC = true;
            if (localAdjust != null) {
              this.add(localAdjust, "m");
            }
            if (offset2 !== input) {
              if (!keepLocalTime || this._changeInProgress) {
                addSubtract(this, createDuration(input - offset2, "m"), 1, false);
              } else if (!this._changeInProgress) {
                this._changeInProgress = true;
                hooks.updateOffset(this, true);
                this._changeInProgress = null;
              }
            }
            return this;
          } else {
            return this._isUTC ? offset2 : getDateOffset(this);
          }
        }
        function getSetZone(input, keepLocalTime) {
          if (input != null) {
            if (typeof input !== "string") {
              input = -input;
            }
            this.utcOffset(input, keepLocalTime);
            return this;
          } else {
            return -this.utcOffset();
          }
        }
        function setOffsetToUTC(keepLocalTime) {
          return this.utcOffset(0, keepLocalTime);
        }
        function setOffsetToLocal(keepLocalTime) {
          if (this._isUTC) {
            this.utcOffset(0, keepLocalTime);
            this._isUTC = false;
            if (keepLocalTime) {
              this.subtract(getDateOffset(this), "m");
            }
          }
          return this;
        }
        function setOffsetToParsedOffset() {
          if (this._tzm != null) {
            this.utcOffset(this._tzm, false, true);
          } else if (typeof this._i === "string") {
            var tZone = offsetFromString(matchOffset, this._i);
            if (tZone != null) {
              this.utcOffset(tZone);
            } else {
              this.utcOffset(0, true);
            }
          }
          return this;
        }
        function hasAlignedHourOffset(input) {
          if (!this.isValid()) {
            return false;
          }
          input = input ? createLocal(input).utcOffset() : 0;
          return (this.utcOffset() - input) % 60 === 0;
        }
        function isDaylightSavingTime() {
          return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
        }
        function isDaylightSavingTimeShifted() {
          if (!isUndefined(this._isDSTShifted)) {
            return this._isDSTShifted;
          }
          var c = {}, other;
          copyConfig(c, this);
          c = prepareConfig(c);
          if (c._a) {
            other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
            this._isDSTShifted = this.isValid() && compareArrays(c._a, other.toArray()) > 0;
          } else {
            this._isDSTShifted = false;
          }
          return this._isDSTShifted;
        }
        function isLocal() {
          return this.isValid() ? !this._isUTC : false;
        }
        function isUtcOffset() {
          return this.isValid() ? this._isUTC : false;
        }
        function isUtc() {
          return this.isValid() ? this._isUTC && this._offset === 0 : false;
        }
        var aspNetRegex = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/, isoRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
        function createDuration(input, key) {
          var duration = input, match = null, sign2, ret, diffRes;
          if (isDuration(input)) {
            duration = {
              ms: input._milliseconds,
              d: input._days,
              M: input._months
            };
          } else if (isNumber(input) || !isNaN(+input)) {
            duration = {};
            if (key) {
              duration[key] = +input;
            } else {
              duration.milliseconds = +input;
            }
          } else if (match = aspNetRegex.exec(input)) {
            sign2 = match[1] === "-" ? -1 : 1;
            duration = {
              y: 0,
              d: toInt(match[DATE]) * sign2,
              h: toInt(match[HOUR]) * sign2,
              m: toInt(match[MINUTE]) * sign2,
              s: toInt(match[SECOND]) * sign2,
              ms: toInt(absRound(match[MILLISECOND] * 1e3)) * sign2
            };
          } else if (match = isoRegex.exec(input)) {
            sign2 = match[1] === "-" ? -1 : 1;
            duration = {
              y: parseIso(match[2], sign2),
              M: parseIso(match[3], sign2),
              w: parseIso(match[4], sign2),
              d: parseIso(match[5], sign2),
              h: parseIso(match[6], sign2),
              m: parseIso(match[7], sign2),
              s: parseIso(match[8], sign2)
            };
          } else if (duration == null) {
            duration = {};
          } else if (typeof duration === "object" && ("from" in duration || "to" in duration)) {
            diffRes = momentsDifference(createLocal(duration.from), createLocal(duration.to));
            duration = {};
            duration.ms = diffRes.milliseconds;
            duration.M = diffRes.months;
          }
          ret = new Duration(duration);
          if (isDuration(input) && hasOwnProp(input, "_locale")) {
            ret._locale = input._locale;
          }
          if (isDuration(input) && hasOwnProp(input, "_isValid")) {
            ret._isValid = input._isValid;
          }
          return ret;
        }
        createDuration.fn = Duration.prototype;
        createDuration.invalid = createInvalid$1;
        function parseIso(inp, sign2) {
          var res = inp && parseFloat(inp.replace(",", "."));
          return (isNaN(res) ? 0 : res) * sign2;
        }
        function positiveMomentsDifference(base, other) {
          var res = {};
          res.months = other.month() - base.month() + (other.year() - base.year()) * 12;
          if (base.clone().add(res.months, "M").isAfter(other)) {
            --res.months;
          }
          res.milliseconds = +other - +base.clone().add(res.months, "M");
          return res;
        }
        function momentsDifference(base, other) {
          var res;
          if (!(base.isValid() && other.isValid())) {
            return { milliseconds: 0, months: 0 };
          }
          other = cloneWithOffset(other, base);
          if (base.isBefore(other)) {
            res = positiveMomentsDifference(base, other);
          } else {
            res = positiveMomentsDifference(other, base);
            res.milliseconds = -res.milliseconds;
            res.months = -res.months;
          }
          return res;
        }
        function createAdder(direction, name) {
          return function(val, period) {
            var dur, tmp;
            if (period !== null && !isNaN(+period)) {
              deprecateSimple(name, "moment()." + name + "(period, number) is deprecated. Please use moment()." + name + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.");
              tmp = val;
              val = period;
              period = tmp;
            }
            dur = createDuration(val, period);
            addSubtract(this, dur, direction);
            return this;
          };
        }
        function addSubtract(mom, duration, isAdding, updateOffset) {
          var milliseconds2 = duration._milliseconds, days2 = absRound(duration._days), months2 = absRound(duration._months);
          if (!mom.isValid()) {
            return;
          }
          updateOffset = updateOffset == null ? true : updateOffset;
          if (months2) {
            setMonth(mom, get(mom, "Month") + months2 * isAdding);
          }
          if (days2) {
            set$1(mom, "Date", get(mom, "Date") + days2 * isAdding);
          }
          if (milliseconds2) {
            mom._d.setTime(mom._d.valueOf() + milliseconds2 * isAdding);
          }
          if (updateOffset) {
            hooks.updateOffset(mom, days2 || months2);
          }
        }
        var add = createAdder(1, "add"), subtract = createAdder(-1, "subtract");
        function isString(input) {
          return typeof input === "string" || input instanceof String;
        }
        function isMomentInput(input) {
          return isMoment(input) || isDate(input) || isString(input) || isNumber(input) || isNumberOrStringArray(input) || isMomentInputObject(input) || input === null || input === void 0;
        }
        function isMomentInputObject(input) {
          var objectTest = isObject(input) && !isObjectEmpty(input), propertyTest = false, properties = [
            "years",
            "year",
            "y",
            "months",
            "month",
            "M",
            "days",
            "day",
            "d",
            "dates",
            "date",
            "D",
            "hours",
            "hour",
            "h",
            "minutes",
            "minute",
            "m",
            "seconds",
            "second",
            "s",
            "milliseconds",
            "millisecond",
            "ms"
          ], i, property;
          for (i = 0; i < properties.length; i += 1) {
            property = properties[i];
            propertyTest = propertyTest || hasOwnProp(input, property);
          }
          return objectTest && propertyTest;
        }
        function isNumberOrStringArray(input) {
          var arrayTest = isArray(input), dataTypeTest = false;
          if (arrayTest) {
            dataTypeTest = input.filter(function(item) {
              return !isNumber(item) && isString(input);
            }).length === 0;
          }
          return arrayTest && dataTypeTest;
        }
        function isCalendarSpec(input) {
          var objectTest = isObject(input) && !isObjectEmpty(input), propertyTest = false, properties = [
            "sameDay",
            "nextDay",
            "lastDay",
            "nextWeek",
            "lastWeek",
            "sameElse"
          ], i, property;
          for (i = 0; i < properties.length; i += 1) {
            property = properties[i];
            propertyTest = propertyTest || hasOwnProp(input, property);
          }
          return objectTest && propertyTest;
        }
        function getCalendarFormat(myMoment, now2) {
          var diff2 = myMoment.diff(now2, "days", true);
          return diff2 < -6 ? "sameElse" : diff2 < -1 ? "lastWeek" : diff2 < 0 ? "lastDay" : diff2 < 1 ? "sameDay" : diff2 < 2 ? "nextDay" : diff2 < 7 ? "nextWeek" : "sameElse";
        }
        function calendar$1(time, formats) {
          if (arguments.length === 1) {
            if (!arguments[0]) {
              time = void 0;
              formats = void 0;
            } else if (isMomentInput(arguments[0])) {
              time = arguments[0];
              formats = void 0;
            } else if (isCalendarSpec(arguments[0])) {
              formats = arguments[0];
              time = void 0;
            }
          }
          var now2 = time || createLocal(), sod = cloneWithOffset(now2, this).startOf("day"), format2 = hooks.calendarFormat(this, sod) || "sameElse", output = formats && (isFunction(formats[format2]) ? formats[format2].call(this, now2) : formats[format2]);
          return this.format(output || this.localeData().calendar(format2, this, createLocal(now2)));
        }
        function clone() {
          return new Moment(this);
        }
        function isAfter(input, units) {
          var localInput = isMoment(input) ? input : createLocal(input);
          if (!(this.isValid() && localInput.isValid())) {
            return false;
          }
          units = normalizeUnits(units) || "millisecond";
          if (units === "millisecond") {
            return this.valueOf() > localInput.valueOf();
          } else {
            return localInput.valueOf() < this.clone().startOf(units).valueOf();
          }
        }
        function isBefore(input, units) {
          var localInput = isMoment(input) ? input : createLocal(input);
          if (!(this.isValid() && localInput.isValid())) {
            return false;
          }
          units = normalizeUnits(units) || "millisecond";
          if (units === "millisecond") {
            return this.valueOf() < localInput.valueOf();
          } else {
            return this.clone().endOf(units).valueOf() < localInput.valueOf();
          }
        }
        function isBetween(from2, to2, units, inclusivity) {
          var localFrom = isMoment(from2) ? from2 : createLocal(from2), localTo = isMoment(to2) ? to2 : createLocal(to2);
          if (!(this.isValid() && localFrom.isValid() && localTo.isValid())) {
            return false;
          }
          inclusivity = inclusivity || "()";
          return (inclusivity[0] === "(" ? this.isAfter(localFrom, units) : !this.isBefore(localFrom, units)) && (inclusivity[1] === ")" ? this.isBefore(localTo, units) : !this.isAfter(localTo, units));
        }
        function isSame(input, units) {
          var localInput = isMoment(input) ? input : createLocal(input), inputMs;
          if (!(this.isValid() && localInput.isValid())) {
            return false;
          }
          units = normalizeUnits(units) || "millisecond";
          if (units === "millisecond") {
            return this.valueOf() === localInput.valueOf();
          } else {
            inputMs = localInput.valueOf();
            return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
          }
        }
        function isSameOrAfter(input, units) {
          return this.isSame(input, units) || this.isAfter(input, units);
        }
        function isSameOrBefore(input, units) {
          return this.isSame(input, units) || this.isBefore(input, units);
        }
        function diff(input, units, asFloat) {
          var that, zoneDelta, output;
          if (!this.isValid()) {
            return NaN;
          }
          that = cloneWithOffset(input, this);
          if (!that.isValid()) {
            return NaN;
          }
          zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;
          units = normalizeUnits(units);
          switch (units) {
            case "year":
              output = monthDiff(this, that) / 12;
              break;
            case "month":
              output = monthDiff(this, that);
              break;
            case "quarter":
              output = monthDiff(this, that) / 3;
              break;
            case "second":
              output = (this - that) / 1e3;
              break;
            case "minute":
              output = (this - that) / 6e4;
              break;
            case "hour":
              output = (this - that) / 36e5;
              break;
            case "day":
              output = (this - that - zoneDelta) / 864e5;
              break;
            case "week":
              output = (this - that - zoneDelta) / 6048e5;
              break;
            default:
              output = this - that;
          }
          return asFloat ? output : absFloor(output);
        }
        function monthDiff(a, b) {
          if (a.date() < b.date()) {
            return -monthDiff(b, a);
          }
          var wholeMonthDiff = (b.year() - a.year()) * 12 + (b.month() - a.month()), anchor = a.clone().add(wholeMonthDiff, "months"), anchor2, adjust;
          if (b - anchor < 0) {
            anchor2 = a.clone().add(wholeMonthDiff - 1, "months");
            adjust = (b - anchor) / (anchor - anchor2);
          } else {
            anchor2 = a.clone().add(wholeMonthDiff + 1, "months");
            adjust = (b - anchor) / (anchor2 - anchor);
          }
          return -(wholeMonthDiff + adjust) || 0;
        }
        hooks.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
        hooks.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
        function toString() {
          return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
        }
        function toISOString(keepOffset) {
          if (!this.isValid()) {
            return null;
          }
          var utc = keepOffset !== true, m = utc ? this.clone().utc() : this;
          if (m.year() < 0 || m.year() > 9999) {
            return formatMoment(m, utc ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ");
          }
          if (isFunction(Date.prototype.toISOString)) {
            if (utc) {
              return this.toDate().toISOString();
            } else {
              return new Date(this.valueOf() + this.utcOffset() * 60 * 1e3).toISOString().replace("Z", formatMoment(m, "Z"));
            }
          }
          return formatMoment(m, utc ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYY-MM-DD[T]HH:mm:ss.SSSZ");
        }
        function inspect() {
          if (!this.isValid()) {
            return "moment.invalid(/* " + this._i + " */)";
          }
          var func = "moment", zone = "", prefix, year, datetime, suffix;
          if (!this.isLocal()) {
            func = this.utcOffset() === 0 ? "moment.utc" : "moment.parseZone";
            zone = "Z";
          }
          prefix = "[" + func + '("]';
          year = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY";
          datetime = "-MM-DD[T]HH:mm:ss.SSS";
          suffix = zone + '[")]';
          return this.format(prefix + year + datetime + suffix);
        }
        function format(inputString) {
          if (!inputString) {
            inputString = this.isUtc() ? hooks.defaultFormatUtc : hooks.defaultFormat;
          }
          var output = formatMoment(this, inputString);
          return this.localeData().postformat(output);
        }
        function from(time, withoutSuffix) {
          if (this.isValid() && (isMoment(time) && time.isValid() || createLocal(time).isValid())) {
            return createDuration({ to: this, from: time }).locale(this.locale()).humanize(!withoutSuffix);
          } else {
            return this.localeData().invalidDate();
          }
        }
        function fromNow(withoutSuffix) {
          return this.from(createLocal(), withoutSuffix);
        }
        function to(time, withoutSuffix) {
          if (this.isValid() && (isMoment(time) && time.isValid() || createLocal(time).isValid())) {
            return createDuration({ from: this, to: time }).locale(this.locale()).humanize(!withoutSuffix);
          } else {
            return this.localeData().invalidDate();
          }
        }
        function toNow(withoutSuffix) {
          return this.to(createLocal(), withoutSuffix);
        }
        function locale(key) {
          var newLocaleData;
          if (key === void 0) {
            return this._locale._abbr;
          } else {
            newLocaleData = getLocale(key);
            if (newLocaleData != null) {
              this._locale = newLocaleData;
            }
            return this;
          }
        }
        var lang = deprecate("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function(key) {
          if (key === void 0) {
            return this.localeData();
          } else {
            return this.locale(key);
          }
        });
        function localeData() {
          return this._locale;
        }
        var MS_PER_SECOND = 1e3, MS_PER_MINUTE = 60 * MS_PER_SECOND, MS_PER_HOUR = 60 * MS_PER_MINUTE, MS_PER_400_YEARS = (365 * 400 + 97) * 24 * MS_PER_HOUR;
        function mod$1(dividend, divisor) {
          return (dividend % divisor + divisor) % divisor;
        }
        function localStartOfDate(y, m, d) {
          if (y < 100 && y >= 0) {
            return new Date(y + 400, m, d) - MS_PER_400_YEARS;
          } else {
            return new Date(y, m, d).valueOf();
          }
        }
        function utcStartOfDate(y, m, d) {
          if (y < 100 && y >= 0) {
            return Date.UTC(y + 400, m, d) - MS_PER_400_YEARS;
          } else {
            return Date.UTC(y, m, d);
          }
        }
        function startOf(units) {
          var time, startOfDate;
          units = normalizeUnits(units);
          if (units === void 0 || units === "millisecond" || !this.isValid()) {
            return this;
          }
          startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;
          switch (units) {
            case "year":
              time = startOfDate(this.year(), 0, 1);
              break;
            case "quarter":
              time = startOfDate(this.year(), this.month() - this.month() % 3, 1);
              break;
            case "month":
              time = startOfDate(this.year(), this.month(), 1);
              break;
            case "week":
              time = startOfDate(this.year(), this.month(), this.date() - this.weekday());
              break;
            case "isoWeek":
              time = startOfDate(this.year(), this.month(), this.date() - (this.isoWeekday() - 1));
              break;
            case "day":
            case "date":
              time = startOfDate(this.year(), this.month(), this.date());
              break;
            case "hour":
              time = this._d.valueOf();
              time -= mod$1(time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE), MS_PER_HOUR);
              break;
            case "minute":
              time = this._d.valueOf();
              time -= mod$1(time, MS_PER_MINUTE);
              break;
            case "second":
              time = this._d.valueOf();
              time -= mod$1(time, MS_PER_SECOND);
              break;
          }
          this._d.setTime(time);
          hooks.updateOffset(this, true);
          return this;
        }
        function endOf(units) {
          var time, startOfDate;
          units = normalizeUnits(units);
          if (units === void 0 || units === "millisecond" || !this.isValid()) {
            return this;
          }
          startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;
          switch (units) {
            case "year":
              time = startOfDate(this.year() + 1, 0, 1) - 1;
              break;
            case "quarter":
              time = startOfDate(this.year(), this.month() - this.month() % 3 + 3, 1) - 1;
              break;
            case "month":
              time = startOfDate(this.year(), this.month() + 1, 1) - 1;
              break;
            case "week":
              time = startOfDate(this.year(), this.month(), this.date() - this.weekday() + 7) - 1;
              break;
            case "isoWeek":
              time = startOfDate(this.year(), this.month(), this.date() - (this.isoWeekday() - 1) + 7) - 1;
              break;
            case "day":
            case "date":
              time = startOfDate(this.year(), this.month(), this.date() + 1) - 1;
              break;
            case "hour":
              time = this._d.valueOf();
              time += MS_PER_HOUR - mod$1(time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE), MS_PER_HOUR) - 1;
              break;
            case "minute":
              time = this._d.valueOf();
              time += MS_PER_MINUTE - mod$1(time, MS_PER_MINUTE) - 1;
              break;
            case "second":
              time = this._d.valueOf();
              time += MS_PER_SECOND - mod$1(time, MS_PER_SECOND) - 1;
              break;
          }
          this._d.setTime(time);
          hooks.updateOffset(this, true);
          return this;
        }
        function valueOf() {
          return this._d.valueOf() - (this._offset || 0) * 6e4;
        }
        function unix() {
          return Math.floor(this.valueOf() / 1e3);
        }
        function toDate() {
          return new Date(this.valueOf());
        }
        function toArray() {
          var m = this;
          return [
            m.year(),
            m.month(),
            m.date(),
            m.hour(),
            m.minute(),
            m.second(),
            m.millisecond()
          ];
        }
        function toObject() {
          var m = this;
          return {
            years: m.year(),
            months: m.month(),
            date: m.date(),
            hours: m.hours(),
            minutes: m.minutes(),
            seconds: m.seconds(),
            milliseconds: m.milliseconds()
          };
        }
        function toJSON() {
          return this.isValid() ? this.toISOString() : null;
        }
        function isValid$2() {
          return isValid(this);
        }
        function parsingFlags() {
          return extend({}, getParsingFlags(this));
        }
        function invalidAt() {
          return getParsingFlags(this).overflow;
        }
        function creationData() {
          return {
            input: this._i,
            format: this._f,
            locale: this._locale,
            isUTC: this._isUTC,
            strict: this._strict
          };
        }
        addFormatToken("N", 0, 0, "eraAbbr");
        addFormatToken("NN", 0, 0, "eraAbbr");
        addFormatToken("NNN", 0, 0, "eraAbbr");
        addFormatToken("NNNN", 0, 0, "eraName");
        addFormatToken("NNNNN", 0, 0, "eraNarrow");
        addFormatToken("y", ["y", 1], "yo", "eraYear");
        addFormatToken("y", ["yy", 2], 0, "eraYear");
        addFormatToken("y", ["yyy", 3], 0, "eraYear");
        addFormatToken("y", ["yyyy", 4], 0, "eraYear");
        addRegexToken("N", matchEraAbbr);
        addRegexToken("NN", matchEraAbbr);
        addRegexToken("NNN", matchEraAbbr);
        addRegexToken("NNNN", matchEraName);
        addRegexToken("NNNNN", matchEraNarrow);
        addParseToken(["N", "NN", "NNN", "NNNN", "NNNNN"], function(input, array, config, token2) {
          var era = config._locale.erasParse(input, token2, config._strict);
          if (era) {
            getParsingFlags(config).era = era;
          } else {
            getParsingFlags(config).invalidEra = input;
          }
        });
        addRegexToken("y", matchUnsigned);
        addRegexToken("yy", matchUnsigned);
        addRegexToken("yyy", matchUnsigned);
        addRegexToken("yyyy", matchUnsigned);
        addRegexToken("yo", matchEraYearOrdinal);
        addParseToken(["y", "yy", "yyy", "yyyy"], YEAR);
        addParseToken(["yo"], function(input, array, config, token2) {
          var match;
          if (config._locale._eraYearOrdinalRegex) {
            match = input.match(config._locale._eraYearOrdinalRegex);
          }
          if (config._locale.eraYearOrdinalParse) {
            array[YEAR] = config._locale.eraYearOrdinalParse(input, match);
          } else {
            array[YEAR] = parseInt(input, 10);
          }
        });
        function localeEras(m, format2) {
          var i, l, date, eras = this._eras || getLocale("en")._eras;
          for (i = 0, l = eras.length; i < l; ++i) {
            switch (typeof eras[i].since) {
              case "string":
                date = hooks(eras[i].since).startOf("day");
                eras[i].since = date.valueOf();
                break;
            }
            switch (typeof eras[i].until) {
              case "undefined":
                eras[i].until = Infinity;
                break;
              case "string":
                date = hooks(eras[i].until).startOf("day").valueOf();
                eras[i].until = date.valueOf();
                break;
            }
          }
          return eras;
        }
        function localeErasParse(eraName, format2, strict) {
          var i, l, eras = this.eras(), name, abbr, narrow;
          eraName = eraName.toUpperCase();
          for (i = 0, l = eras.length; i < l; ++i) {
            name = eras[i].name.toUpperCase();
            abbr = eras[i].abbr.toUpperCase();
            narrow = eras[i].narrow.toUpperCase();
            if (strict) {
              switch (format2) {
                case "N":
                case "NN":
                case "NNN":
                  if (abbr === eraName) {
                    return eras[i];
                  }
                  break;
                case "NNNN":
                  if (name === eraName) {
                    return eras[i];
                  }
                  break;
                case "NNNNN":
                  if (narrow === eraName) {
                    return eras[i];
                  }
                  break;
              }
            } else if ([name, abbr, narrow].indexOf(eraName) >= 0) {
              return eras[i];
            }
          }
        }
        function localeErasConvertYear(era, year) {
          var dir = era.since <= era.until ? 1 : -1;
          if (year === void 0) {
            return hooks(era.since).year();
          } else {
            return hooks(era.since).year() + (year - era.offset) * dir;
          }
        }
        function getEraName() {
          var i, l, val, eras = this.localeData().eras();
          for (i = 0, l = eras.length; i < l; ++i) {
            val = this.clone().startOf("day").valueOf();
            if (eras[i].since <= val && val <= eras[i].until) {
              return eras[i].name;
            }
            if (eras[i].until <= val && val <= eras[i].since) {
              return eras[i].name;
            }
          }
          return "";
        }
        function getEraNarrow() {
          var i, l, val, eras = this.localeData().eras();
          for (i = 0, l = eras.length; i < l; ++i) {
            val = this.clone().startOf("day").valueOf();
            if (eras[i].since <= val && val <= eras[i].until) {
              return eras[i].narrow;
            }
            if (eras[i].until <= val && val <= eras[i].since) {
              return eras[i].narrow;
            }
          }
          return "";
        }
        function getEraAbbr() {
          var i, l, val, eras = this.localeData().eras();
          for (i = 0, l = eras.length; i < l; ++i) {
            val = this.clone().startOf("day").valueOf();
            if (eras[i].since <= val && val <= eras[i].until) {
              return eras[i].abbr;
            }
            if (eras[i].until <= val && val <= eras[i].since) {
              return eras[i].abbr;
            }
          }
          return "";
        }
        function getEraYear() {
          var i, l, dir, val, eras = this.localeData().eras();
          for (i = 0, l = eras.length; i < l; ++i) {
            dir = eras[i].since <= eras[i].until ? 1 : -1;
            val = this.clone().startOf("day").valueOf();
            if (eras[i].since <= val && val <= eras[i].until || eras[i].until <= val && val <= eras[i].since) {
              return (this.year() - hooks(eras[i].since).year()) * dir + eras[i].offset;
            }
          }
          return this.year();
        }
        function erasNameRegex(isStrict) {
          if (!hasOwnProp(this, "_erasNameRegex")) {
            computeErasParse.call(this);
          }
          return isStrict ? this._erasNameRegex : this._erasRegex;
        }
        function erasAbbrRegex(isStrict) {
          if (!hasOwnProp(this, "_erasAbbrRegex")) {
            computeErasParse.call(this);
          }
          return isStrict ? this._erasAbbrRegex : this._erasRegex;
        }
        function erasNarrowRegex(isStrict) {
          if (!hasOwnProp(this, "_erasNarrowRegex")) {
            computeErasParse.call(this);
          }
          return isStrict ? this._erasNarrowRegex : this._erasRegex;
        }
        function matchEraAbbr(isStrict, locale2) {
          return locale2.erasAbbrRegex(isStrict);
        }
        function matchEraName(isStrict, locale2) {
          return locale2.erasNameRegex(isStrict);
        }
        function matchEraNarrow(isStrict, locale2) {
          return locale2.erasNarrowRegex(isStrict);
        }
        function matchEraYearOrdinal(isStrict, locale2) {
          return locale2._eraYearOrdinalRegex || matchUnsigned;
        }
        function computeErasParse() {
          var abbrPieces = [], namePieces = [], narrowPieces = [], mixedPieces = [], i, l, eras = this.eras();
          for (i = 0, l = eras.length; i < l; ++i) {
            namePieces.push(regexEscape(eras[i].name));
            abbrPieces.push(regexEscape(eras[i].abbr));
            narrowPieces.push(regexEscape(eras[i].narrow));
            mixedPieces.push(regexEscape(eras[i].name));
            mixedPieces.push(regexEscape(eras[i].abbr));
            mixedPieces.push(regexEscape(eras[i].narrow));
          }
          this._erasRegex = new RegExp("^(" + mixedPieces.join("|") + ")", "i");
          this._erasNameRegex = new RegExp("^(" + namePieces.join("|") + ")", "i");
          this._erasAbbrRegex = new RegExp("^(" + abbrPieces.join("|") + ")", "i");
          this._erasNarrowRegex = new RegExp("^(" + narrowPieces.join("|") + ")", "i");
        }
        addFormatToken(0, ["gg", 2], 0, function() {
          return this.weekYear() % 100;
        });
        addFormatToken(0, ["GG", 2], 0, function() {
          return this.isoWeekYear() % 100;
        });
        function addWeekYearFormatToken(token2, getter) {
          addFormatToken(0, [token2, token2.length], 0, getter);
        }
        addWeekYearFormatToken("gggg", "weekYear");
        addWeekYearFormatToken("ggggg", "weekYear");
        addWeekYearFormatToken("GGGG", "isoWeekYear");
        addWeekYearFormatToken("GGGGG", "isoWeekYear");
        addUnitAlias("weekYear", "gg");
        addUnitAlias("isoWeekYear", "GG");
        addUnitPriority("weekYear", 1);
        addUnitPriority("isoWeekYear", 1);
        addRegexToken("G", matchSigned);
        addRegexToken("g", matchSigned);
        addRegexToken("GG", match1to2, match2);
        addRegexToken("gg", match1to2, match2);
        addRegexToken("GGGG", match1to4, match4);
        addRegexToken("gggg", match1to4, match4);
        addRegexToken("GGGGG", match1to6, match6);
        addRegexToken("ggggg", match1to6, match6);
        addWeekParseToken(["gggg", "ggggg", "GGGG", "GGGGG"], function(input, week, config, token2) {
          week[token2.substr(0, 2)] = toInt(input);
        });
        addWeekParseToken(["gg", "GG"], function(input, week, config, token2) {
          week[token2] = hooks.parseTwoDigitYear(input);
        });
        function getSetWeekYear(input) {
          return getSetWeekYearHelper.call(this, input, this.week(), this.weekday(), this.localeData()._week.dow, this.localeData()._week.doy);
        }
        function getSetISOWeekYear(input) {
          return getSetWeekYearHelper.call(this, input, this.isoWeek(), this.isoWeekday(), 1, 4);
        }
        function getISOWeeksInYear() {
          return weeksInYear(this.year(), 1, 4);
        }
        function getISOWeeksInISOWeekYear() {
          return weeksInYear(this.isoWeekYear(), 1, 4);
        }
        function getWeeksInYear() {
          var weekInfo = this.localeData()._week;
          return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
        }
        function getWeeksInWeekYear() {
          var weekInfo = this.localeData()._week;
          return weeksInYear(this.weekYear(), weekInfo.dow, weekInfo.doy);
        }
        function getSetWeekYearHelper(input, week, weekday, dow, doy) {
          var weeksTarget;
          if (input == null) {
            return weekOfYear(this, dow, doy).year;
          } else {
            weeksTarget = weeksInYear(input, dow, doy);
            if (week > weeksTarget) {
              week = weeksTarget;
            }
            return setWeekAll.call(this, input, week, weekday, dow, doy);
          }
        }
        function setWeekAll(weekYear, week, weekday, dow, doy) {
          var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy), date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);
          this.year(date.getUTCFullYear());
          this.month(date.getUTCMonth());
          this.date(date.getUTCDate());
          return this;
        }
        addFormatToken("Q", 0, "Qo", "quarter");
        addUnitAlias("quarter", "Q");
        addUnitPriority("quarter", 7);
        addRegexToken("Q", match1);
        addParseToken("Q", function(input, array) {
          array[MONTH] = (toInt(input) - 1) * 3;
        });
        function getSetQuarter(input) {
          return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
        }
        addFormatToken("D", ["DD", 2], "Do", "date");
        addUnitAlias("date", "D");
        addUnitPriority("date", 9);
        addRegexToken("D", match1to2);
        addRegexToken("DD", match1to2, match2);
        addRegexToken("Do", function(isStrict, locale2) {
          return isStrict ? locale2._dayOfMonthOrdinalParse || locale2._ordinalParse : locale2._dayOfMonthOrdinalParseLenient;
        });
        addParseToken(["D", "DD"], DATE);
        addParseToken("Do", function(input, array) {
          array[DATE] = toInt(input.match(match1to2)[0]);
        });
        var getSetDayOfMonth = makeGetSet("Date", true);
        addFormatToken("DDD", ["DDDD", 3], "DDDo", "dayOfYear");
        addUnitAlias("dayOfYear", "DDD");
        addUnitPriority("dayOfYear", 4);
        addRegexToken("DDD", match1to3);
        addRegexToken("DDDD", match3);
        addParseToken(["DDD", "DDDD"], function(input, array, config) {
          config._dayOfYear = toInt(input);
        });
        function getSetDayOfYear(input) {
          var dayOfYear = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1;
          return input == null ? dayOfYear : this.add(input - dayOfYear, "d");
        }
        addFormatToken("m", ["mm", 2], 0, "minute");
        addUnitAlias("minute", "m");
        addUnitPriority("minute", 14);
        addRegexToken("m", match1to2);
        addRegexToken("mm", match1to2, match2);
        addParseToken(["m", "mm"], MINUTE);
        var getSetMinute = makeGetSet("Minutes", false);
        addFormatToken("s", ["ss", 2], 0, "second");
        addUnitAlias("second", "s");
        addUnitPriority("second", 15);
        addRegexToken("s", match1to2);
        addRegexToken("ss", match1to2, match2);
        addParseToken(["s", "ss"], SECOND);
        var getSetSecond = makeGetSet("Seconds", false);
        addFormatToken("S", 0, 0, function() {
          return ~~(this.millisecond() / 100);
        });
        addFormatToken(0, ["SS", 2], 0, function() {
          return ~~(this.millisecond() / 10);
        });
        addFormatToken(0, ["SSS", 3], 0, "millisecond");
        addFormatToken(0, ["SSSS", 4], 0, function() {
          return this.millisecond() * 10;
        });
        addFormatToken(0, ["SSSSS", 5], 0, function() {
          return this.millisecond() * 100;
        });
        addFormatToken(0, ["SSSSSS", 6], 0, function() {
          return this.millisecond() * 1e3;
        });
        addFormatToken(0, ["SSSSSSS", 7], 0, function() {
          return this.millisecond() * 1e4;
        });
        addFormatToken(0, ["SSSSSSSS", 8], 0, function() {
          return this.millisecond() * 1e5;
        });
        addFormatToken(0, ["SSSSSSSSS", 9], 0, function() {
          return this.millisecond() * 1e6;
        });
        addUnitAlias("millisecond", "ms");
        addUnitPriority("millisecond", 16);
        addRegexToken("S", match1to3, match1);
        addRegexToken("SS", match1to3, match2);
        addRegexToken("SSS", match1to3, match3);
        var token, getSetMillisecond;
        for (token = "SSSS"; token.length <= 9; token += "S") {
          addRegexToken(token, matchUnsigned);
        }
        function parseMs(input, array) {
          array[MILLISECOND] = toInt(("0." + input) * 1e3);
        }
        for (token = "S"; token.length <= 9; token += "S") {
          addParseToken(token, parseMs);
        }
        getSetMillisecond = makeGetSet("Milliseconds", false);
        addFormatToken("z", 0, 0, "zoneAbbr");
        addFormatToken("zz", 0, 0, "zoneName");
        function getZoneAbbr() {
          return this._isUTC ? "UTC" : "";
        }
        function getZoneName() {
          return this._isUTC ? "Coordinated Universal Time" : "";
        }
        var proto = Moment.prototype;
        proto.add = add;
        proto.calendar = calendar$1;
        proto.clone = clone;
        proto.diff = diff;
        proto.endOf = endOf;
        proto.format = format;
        proto.from = from;
        proto.fromNow = fromNow;
        proto.to = to;
        proto.toNow = toNow;
        proto.get = stringGet;
        proto.invalidAt = invalidAt;
        proto.isAfter = isAfter;
        proto.isBefore = isBefore;
        proto.isBetween = isBetween;
        proto.isSame = isSame;
        proto.isSameOrAfter = isSameOrAfter;
        proto.isSameOrBefore = isSameOrBefore;
        proto.isValid = isValid$2;
        proto.lang = lang;
        proto.locale = locale;
        proto.localeData = localeData;
        proto.max = prototypeMax;
        proto.min = prototypeMin;
        proto.parsingFlags = parsingFlags;
        proto.set = stringSet;
        proto.startOf = startOf;
        proto.subtract = subtract;
        proto.toArray = toArray;
        proto.toObject = toObject;
        proto.toDate = toDate;
        proto.toISOString = toISOString;
        proto.inspect = inspect;
        if (typeof Symbol !== "undefined" && Symbol.for != null) {
          proto[Symbol.for("nodejs.util.inspect.custom")] = function() {
            return "Moment<" + this.format() + ">";
          };
        }
        proto.toJSON = toJSON;
        proto.toString = toString;
        proto.unix = unix;
        proto.valueOf = valueOf;
        proto.creationData = creationData;
        proto.eraName = getEraName;
        proto.eraNarrow = getEraNarrow;
        proto.eraAbbr = getEraAbbr;
        proto.eraYear = getEraYear;
        proto.year = getSetYear;
        proto.isLeapYear = getIsLeapYear;
        proto.weekYear = getSetWeekYear;
        proto.isoWeekYear = getSetISOWeekYear;
        proto.quarter = proto.quarters = getSetQuarter;
        proto.month = getSetMonth;
        proto.daysInMonth = getDaysInMonth;
        proto.week = proto.weeks = getSetWeek;
        proto.isoWeek = proto.isoWeeks = getSetISOWeek;
        proto.weeksInYear = getWeeksInYear;
        proto.weeksInWeekYear = getWeeksInWeekYear;
        proto.isoWeeksInYear = getISOWeeksInYear;
        proto.isoWeeksInISOWeekYear = getISOWeeksInISOWeekYear;
        proto.date = getSetDayOfMonth;
        proto.day = proto.days = getSetDayOfWeek;
        proto.weekday = getSetLocaleDayOfWeek;
        proto.isoWeekday = getSetISODayOfWeek;
        proto.dayOfYear = getSetDayOfYear;
        proto.hour = proto.hours = getSetHour;
        proto.minute = proto.minutes = getSetMinute;
        proto.second = proto.seconds = getSetSecond;
        proto.millisecond = proto.milliseconds = getSetMillisecond;
        proto.utcOffset = getSetOffset;
        proto.utc = setOffsetToUTC;
        proto.local = setOffsetToLocal;
        proto.parseZone = setOffsetToParsedOffset;
        proto.hasAlignedHourOffset = hasAlignedHourOffset;
        proto.isDST = isDaylightSavingTime;
        proto.isLocal = isLocal;
        proto.isUtcOffset = isUtcOffset;
        proto.isUtc = isUtc;
        proto.isUTC = isUtc;
        proto.zoneAbbr = getZoneAbbr;
        proto.zoneName = getZoneName;
        proto.dates = deprecate("dates accessor is deprecated. Use date instead.", getSetDayOfMonth);
        proto.months = deprecate("months accessor is deprecated. Use month instead", getSetMonth);
        proto.years = deprecate("years accessor is deprecated. Use year instead", getSetYear);
        proto.zone = deprecate("moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/", getSetZone);
        proto.isDSTShifted = deprecate("isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information", isDaylightSavingTimeShifted);
        function createUnix(input) {
          return createLocal(input * 1e3);
        }
        function createInZone() {
          return createLocal.apply(null, arguments).parseZone();
        }
        function preParsePostFormat(string) {
          return string;
        }
        var proto$1 = Locale.prototype;
        proto$1.calendar = calendar;
        proto$1.longDateFormat = longDateFormat;
        proto$1.invalidDate = invalidDate;
        proto$1.ordinal = ordinal;
        proto$1.preparse = preParsePostFormat;
        proto$1.postformat = preParsePostFormat;
        proto$1.relativeTime = relativeTime;
        proto$1.pastFuture = pastFuture;
        proto$1.set = set;
        proto$1.eras = localeEras;
        proto$1.erasParse = localeErasParse;
        proto$1.erasConvertYear = localeErasConvertYear;
        proto$1.erasAbbrRegex = erasAbbrRegex;
        proto$1.erasNameRegex = erasNameRegex;
        proto$1.erasNarrowRegex = erasNarrowRegex;
        proto$1.months = localeMonths;
        proto$1.monthsShort = localeMonthsShort;
        proto$1.monthsParse = localeMonthsParse;
        proto$1.monthsRegex = monthsRegex;
        proto$1.monthsShortRegex = monthsShortRegex;
        proto$1.week = localeWeek;
        proto$1.firstDayOfYear = localeFirstDayOfYear;
        proto$1.firstDayOfWeek = localeFirstDayOfWeek;
        proto$1.weekdays = localeWeekdays;
        proto$1.weekdaysMin = localeWeekdaysMin;
        proto$1.weekdaysShort = localeWeekdaysShort;
        proto$1.weekdaysParse = localeWeekdaysParse;
        proto$1.weekdaysRegex = weekdaysRegex;
        proto$1.weekdaysShortRegex = weekdaysShortRegex;
        proto$1.weekdaysMinRegex = weekdaysMinRegex;
        proto$1.isPM = localeIsPM;
        proto$1.meridiem = localeMeridiem;
        function get$1(format2, index, field, setter) {
          var locale2 = getLocale(), utc = createUTC().set(setter, index);
          return locale2[field](utc, format2);
        }
        function listMonthsImpl(format2, index, field) {
          if (isNumber(format2)) {
            index = format2;
            format2 = void 0;
          }
          format2 = format2 || "";
          if (index != null) {
            return get$1(format2, index, field, "month");
          }
          var i, out = [];
          for (i = 0; i < 12; i++) {
            out[i] = get$1(format2, i, field, "month");
          }
          return out;
        }
        function listWeekdaysImpl(localeSorted, format2, index, field) {
          if (typeof localeSorted === "boolean") {
            if (isNumber(format2)) {
              index = format2;
              format2 = void 0;
            }
            format2 = format2 || "";
          } else {
            format2 = localeSorted;
            index = format2;
            localeSorted = false;
            if (isNumber(format2)) {
              index = format2;
              format2 = void 0;
            }
            format2 = format2 || "";
          }
          var locale2 = getLocale(), shift = localeSorted ? locale2._week.dow : 0, i, out = [];
          if (index != null) {
            return get$1(format2, (index + shift) % 7, field, "day");
          }
          for (i = 0; i < 7; i++) {
            out[i] = get$1(format2, (i + shift) % 7, field, "day");
          }
          return out;
        }
        function listMonths(format2, index) {
          return listMonthsImpl(format2, index, "months");
        }
        function listMonthsShort(format2, index) {
          return listMonthsImpl(format2, index, "monthsShort");
        }
        function listWeekdays(localeSorted, format2, index) {
          return listWeekdaysImpl(localeSorted, format2, index, "weekdays");
        }
        function listWeekdaysShort(localeSorted, format2, index) {
          return listWeekdaysImpl(localeSorted, format2, index, "weekdaysShort");
        }
        function listWeekdaysMin(localeSorted, format2, index) {
          return listWeekdaysImpl(localeSorted, format2, index, "weekdaysMin");
        }
        getSetGlobalLocale("en", {
          eras: [
            {
              since: "0001-01-01",
              until: Infinity,
              offset: 1,
              name: "Anno Domini",
              narrow: "AD",
              abbr: "AD"
            },
            {
              since: "0000-12-31",
              until: -Infinity,
              offset: 1,
              name: "Before Christ",
              narrow: "BC",
              abbr: "BC"
            }
          ],
          dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
          ordinal: function(number) {
            var b = number % 10, output = toInt(number % 100 / 10) === 1 ? "th" : b === 1 ? "st" : b === 2 ? "nd" : b === 3 ? "rd" : "th";
            return number + output;
          }
        });
        hooks.lang = deprecate("moment.lang is deprecated. Use moment.locale instead.", getSetGlobalLocale);
        hooks.langData = deprecate("moment.langData is deprecated. Use moment.localeData instead.", getLocale);
        var mathAbs = Math.abs;
        function abs() {
          var data = this._data;
          this._milliseconds = mathAbs(this._milliseconds);
          this._days = mathAbs(this._days);
          this._months = mathAbs(this._months);
          data.milliseconds = mathAbs(data.milliseconds);
          data.seconds = mathAbs(data.seconds);
          data.minutes = mathAbs(data.minutes);
          data.hours = mathAbs(data.hours);
          data.months = mathAbs(data.months);
          data.years = mathAbs(data.years);
          return this;
        }
        function addSubtract$1(duration, input, value, direction) {
          var other = createDuration(input, value);
          duration._milliseconds += direction * other._milliseconds;
          duration._days += direction * other._days;
          duration._months += direction * other._months;
          return duration._bubble();
        }
        function add$1(input, value) {
          return addSubtract$1(this, input, value, 1);
        }
        function subtract$1(input, value) {
          return addSubtract$1(this, input, value, -1);
        }
        function absCeil(number) {
          if (number < 0) {
            return Math.floor(number);
          } else {
            return Math.ceil(number);
          }
        }
        function bubble() {
          var milliseconds2 = this._milliseconds, days2 = this._days, months2 = this._months, data = this._data, seconds2, minutes2, hours2, years2, monthsFromDays;
          if (!(milliseconds2 >= 0 && days2 >= 0 && months2 >= 0 || milliseconds2 <= 0 && days2 <= 0 && months2 <= 0)) {
            milliseconds2 += absCeil(monthsToDays(months2) + days2) * 864e5;
            days2 = 0;
            months2 = 0;
          }
          data.milliseconds = milliseconds2 % 1e3;
          seconds2 = absFloor(milliseconds2 / 1e3);
          data.seconds = seconds2 % 60;
          minutes2 = absFloor(seconds2 / 60);
          data.minutes = minutes2 % 60;
          hours2 = absFloor(minutes2 / 60);
          data.hours = hours2 % 24;
          days2 += absFloor(hours2 / 24);
          monthsFromDays = absFloor(daysToMonths(days2));
          months2 += monthsFromDays;
          days2 -= absCeil(monthsToDays(monthsFromDays));
          years2 = absFloor(months2 / 12);
          months2 %= 12;
          data.days = days2;
          data.months = months2;
          data.years = years2;
          return this;
        }
        function daysToMonths(days2) {
          return days2 * 4800 / 146097;
        }
        function monthsToDays(months2) {
          return months2 * 146097 / 4800;
        }
        function as(units) {
          if (!this.isValid()) {
            return NaN;
          }
          var days2, months2, milliseconds2 = this._milliseconds;
          units = normalizeUnits(units);
          if (units === "month" || units === "quarter" || units === "year") {
            days2 = this._days + milliseconds2 / 864e5;
            months2 = this._months + daysToMonths(days2);
            switch (units) {
              case "month":
                return months2;
              case "quarter":
                return months2 / 3;
              case "year":
                return months2 / 12;
            }
          } else {
            days2 = this._days + Math.round(monthsToDays(this._months));
            switch (units) {
              case "week":
                return days2 / 7 + milliseconds2 / 6048e5;
              case "day":
                return days2 + milliseconds2 / 864e5;
              case "hour":
                return days2 * 24 + milliseconds2 / 36e5;
              case "minute":
                return days2 * 1440 + milliseconds2 / 6e4;
              case "second":
                return days2 * 86400 + milliseconds2 / 1e3;
              case "millisecond":
                return Math.floor(days2 * 864e5) + milliseconds2;
              default:
                throw new Error("Unknown unit " + units);
            }
          }
        }
        function valueOf$1() {
          if (!this.isValid()) {
            return NaN;
          }
          return this._milliseconds + this._days * 864e5 + this._months % 12 * 2592e6 + toInt(this._months / 12) * 31536e6;
        }
        function makeAs(alias) {
          return function() {
            return this.as(alias);
          };
        }
        var asMilliseconds = makeAs("ms"), asSeconds = makeAs("s"), asMinutes = makeAs("m"), asHours = makeAs("h"), asDays = makeAs("d"), asWeeks = makeAs("w"), asMonths = makeAs("M"), asQuarters = makeAs("Q"), asYears = makeAs("y");
        function clone$1() {
          return createDuration(this);
        }
        function get$2(units) {
          units = normalizeUnits(units);
          return this.isValid() ? this[units + "s"]() : NaN;
        }
        function makeGetter(name) {
          return function() {
            return this.isValid() ? this._data[name] : NaN;
          };
        }
        var milliseconds = makeGetter("milliseconds"), seconds = makeGetter("seconds"), minutes = makeGetter("minutes"), hours = makeGetter("hours"), days = makeGetter("days"), months = makeGetter("months"), years = makeGetter("years");
        function weeks() {
          return absFloor(this.days() / 7);
        }
        var round = Math.round, thresholds = {
          ss: 44,
          s: 45,
          m: 45,
          h: 22,
          d: 26,
          w: null,
          M: 11
        };
        function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale2) {
          return locale2.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
        }
        function relativeTime$1(posNegDuration, withoutSuffix, thresholds2, locale2) {
          var duration = createDuration(posNegDuration).abs(), seconds2 = round(duration.as("s")), minutes2 = round(duration.as("m")), hours2 = round(duration.as("h")), days2 = round(duration.as("d")), months2 = round(duration.as("M")), weeks2 = round(duration.as("w")), years2 = round(duration.as("y")), a = seconds2 <= thresholds2.ss && ["s", seconds2] || seconds2 < thresholds2.s && ["ss", seconds2] || minutes2 <= 1 && ["m"] || minutes2 < thresholds2.m && ["mm", minutes2] || hours2 <= 1 && ["h"] || hours2 < thresholds2.h && ["hh", hours2] || days2 <= 1 && ["d"] || days2 < thresholds2.d && ["dd", days2];
          if (thresholds2.w != null) {
            a = a || weeks2 <= 1 && ["w"] || weeks2 < thresholds2.w && ["ww", weeks2];
          }
          a = a || months2 <= 1 && ["M"] || months2 < thresholds2.M && ["MM", months2] || years2 <= 1 && ["y"] || ["yy", years2];
          a[2] = withoutSuffix;
          a[3] = +posNegDuration > 0;
          a[4] = locale2;
          return substituteTimeAgo.apply(null, a);
        }
        function getSetRelativeTimeRounding(roundingFunction) {
          if (roundingFunction === void 0) {
            return round;
          }
          if (typeof roundingFunction === "function") {
            round = roundingFunction;
            return true;
          }
          return false;
        }
        function getSetRelativeTimeThreshold(threshold, limit) {
          if (thresholds[threshold] === void 0) {
            return false;
          }
          if (limit === void 0) {
            return thresholds[threshold];
          }
          thresholds[threshold] = limit;
          if (threshold === "s") {
            thresholds.ss = limit - 1;
          }
          return true;
        }
        function humanize(argWithSuffix, argThresholds) {
          if (!this.isValid()) {
            return this.localeData().invalidDate();
          }
          var withSuffix = false, th = thresholds, locale2, output;
          if (typeof argWithSuffix === "object") {
            argThresholds = argWithSuffix;
            argWithSuffix = false;
          }
          if (typeof argWithSuffix === "boolean") {
            withSuffix = argWithSuffix;
          }
          if (typeof argThresholds === "object") {
            th = Object.assign({}, thresholds, argThresholds);
            if (argThresholds.s != null && argThresholds.ss == null) {
              th.ss = argThresholds.s - 1;
            }
          }
          locale2 = this.localeData();
          output = relativeTime$1(this, !withSuffix, th, locale2);
          if (withSuffix) {
            output = locale2.pastFuture(+this, output);
          }
          return locale2.postformat(output);
        }
        var abs$1 = Math.abs;
        function sign(x) {
          return (x > 0) - (x < 0) || +x;
        }
        function toISOString$1() {
          if (!this.isValid()) {
            return this.localeData().invalidDate();
          }
          var seconds2 = abs$1(this._milliseconds) / 1e3, days2 = abs$1(this._days), months2 = abs$1(this._months), minutes2, hours2, years2, s, total = this.asSeconds(), totalSign, ymSign, daysSign, hmsSign;
          if (!total) {
            return "P0D";
          }
          minutes2 = absFloor(seconds2 / 60);
          hours2 = absFloor(minutes2 / 60);
          seconds2 %= 60;
          minutes2 %= 60;
          years2 = absFloor(months2 / 12);
          months2 %= 12;
          s = seconds2 ? seconds2.toFixed(3).replace(/\.?0+$/, "") : "";
          totalSign = total < 0 ? "-" : "";
          ymSign = sign(this._months) !== sign(total) ? "-" : "";
          daysSign = sign(this._days) !== sign(total) ? "-" : "";
          hmsSign = sign(this._milliseconds) !== sign(total) ? "-" : "";
          return totalSign + "P" + (years2 ? ymSign + years2 + "Y" : "") + (months2 ? ymSign + months2 + "M" : "") + (days2 ? daysSign + days2 + "D" : "") + (hours2 || minutes2 || seconds2 ? "T" : "") + (hours2 ? hmsSign + hours2 + "H" : "") + (minutes2 ? hmsSign + minutes2 + "M" : "") + (seconds2 ? hmsSign + s + "S" : "");
        }
        var proto$2 = Duration.prototype;
        proto$2.isValid = isValid$1;
        proto$2.abs = abs;
        proto$2.add = add$1;
        proto$2.subtract = subtract$1;
        proto$2.as = as;
        proto$2.asMilliseconds = asMilliseconds;
        proto$2.asSeconds = asSeconds;
        proto$2.asMinutes = asMinutes;
        proto$2.asHours = asHours;
        proto$2.asDays = asDays;
        proto$2.asWeeks = asWeeks;
        proto$2.asMonths = asMonths;
        proto$2.asQuarters = asQuarters;
        proto$2.asYears = asYears;
        proto$2.valueOf = valueOf$1;
        proto$2._bubble = bubble;
        proto$2.clone = clone$1;
        proto$2.get = get$2;
        proto$2.milliseconds = milliseconds;
        proto$2.seconds = seconds;
        proto$2.minutes = minutes;
        proto$2.hours = hours;
        proto$2.days = days;
        proto$2.weeks = weeks;
        proto$2.months = months;
        proto$2.years = years;
        proto$2.humanize = humanize;
        proto$2.toISOString = toISOString$1;
        proto$2.toString = toISOString$1;
        proto$2.toJSON = toISOString$1;
        proto$2.locale = locale;
        proto$2.localeData = localeData;
        proto$2.toIsoString = deprecate("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", toISOString$1);
        proto$2.lang = lang;
        addFormatToken("X", 0, 0, "unix");
        addFormatToken("x", 0, 0, "valueOf");
        addRegexToken("x", matchSigned);
        addRegexToken("X", matchTimestamp);
        addParseToken("X", function(input, array, config) {
          config._d = new Date(parseFloat(input) * 1e3);
        });
        addParseToken("x", function(input, array, config) {
          config._d = new Date(toInt(input));
        });
        hooks.version = "2.29.1";
        setHookCallback(createLocal);
        hooks.fn = proto;
        hooks.min = min;
        hooks.max = max;
        hooks.now = now;
        hooks.utc = createUTC;
        hooks.unix = createUnix;
        hooks.months = listMonths;
        hooks.isDate = isDate;
        hooks.locale = getSetGlobalLocale;
        hooks.invalid = createInvalid;
        hooks.duration = createDuration;
        hooks.isMoment = isMoment;
        hooks.weekdays = listWeekdays;
        hooks.parseZone = createInZone;
        hooks.localeData = getLocale;
        hooks.isDuration = isDuration;
        hooks.monthsShort = listMonthsShort;
        hooks.weekdaysMin = listWeekdaysMin;
        hooks.defineLocale = defineLocale;
        hooks.updateLocale = updateLocale;
        hooks.locales = listLocales;
        hooks.weekdaysShort = listWeekdaysShort;
        hooks.normalizeUnits = normalizeUnits;
        hooks.relativeTimeRounding = getSetRelativeTimeRounding;
        hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
        hooks.calendarFormat = getCalendarFormat;
        hooks.prototype = proto;
        hooks.HTML5_FMT = {
          DATETIME_LOCAL: "YYYY-MM-DDTHH:mm",
          DATETIME_LOCAL_SECONDS: "YYYY-MM-DDTHH:mm:ss",
          DATETIME_LOCAL_MS: "YYYY-MM-DDTHH:mm:ss.SSS",
          DATE: "YYYY-MM-DD",
          TIME: "HH:mm",
          TIME_SECONDS: "HH:mm:ss",
          TIME_MS: "HH:mm:ss.SSS",
          WEEK: "GGGG-[W]WW",
          MONTH: "YYYY-MM"
        };
        return hooks;
      });
    }
  });

  // node_modules/bootstrap-datetimepicker-npm/node_modules/moment/moment.js
  var require_moment2 = __commonJS({
    "node_modules/bootstrap-datetimepicker-npm/node_modules/moment/moment.js"(exports, module) {
      (function(undefined2) {
        var moment2, VERSION = "2.8.4", globalScope = typeof global !== "undefined" ? global : this, oldGlobalMoment, round = Math.round, hasOwnProperty = Object.prototype.hasOwnProperty, i, YEAR = 0, MONTH = 1, DATE = 2, HOUR = 3, MINUTE = 4, SECOND = 5, MILLISECOND = 6, locales = {}, momentProperties = [], hasModule = typeof module !== "undefined" && module && module.exports, aspNetJsonRegex = /^\/?Date\((\-?\d+)/i, aspNetTimeSpanJsonRegex = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/, isoDurationRegex = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/, formattingTokens = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|x|X|zz?|ZZ?|.)/g, localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, parseTokenOneOrTwoDigits = /\d\d?/, parseTokenOneToThreeDigits = /\d{1,3}/, parseTokenOneToFourDigits = /\d{1,4}/, parseTokenOneToSixDigits = /[+\-]?\d{1,6}/, parseTokenDigits = /\d+/, parseTokenWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, parseTokenTimezone = /Z|[\+\-]\d\d:?\d\d/gi, parseTokenT = /T/i, parseTokenOffsetMs = /[\+\-]?\d+/, parseTokenTimestampMs = /[\+\-]?\d+(\.\d{1,3})?/, parseTokenOneDigit = /\d/, parseTokenTwoDigits = /\d\d/, parseTokenThreeDigits = /\d{3}/, parseTokenFourDigits = /\d{4}/, parseTokenSixDigits = /[+-]?\d{6}/, parseTokenSignedNumber = /[+-]?\d+/, isoRegex = /^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/, isoFormat = "YYYY-MM-DDTHH:mm:ssZ", isoDates = [
          ["YYYYYY-MM-DD", /[+-]\d{6}-\d{2}-\d{2}/],
          ["YYYY-MM-DD", /\d{4}-\d{2}-\d{2}/],
          ["GGGG-[W]WW-E", /\d{4}-W\d{2}-\d/],
          ["GGGG-[W]WW", /\d{4}-W\d{2}/],
          ["YYYY-DDD", /\d{4}-\d{3}/]
        ], isoTimes = [
          ["HH:mm:ss.SSSS", /(T| )\d\d:\d\d:\d\d\.\d+/],
          ["HH:mm:ss", /(T| )\d\d:\d\d:\d\d/],
          ["HH:mm", /(T| )\d\d:\d\d/],
          ["HH", /(T| )\d\d/]
        ], parseTimezoneChunker = /([\+\-]|\d\d)/gi, proxyGettersAndSetters = "Date|Hours|Minutes|Seconds|Milliseconds".split("|"), unitMillisecondFactors = {
          "Milliseconds": 1,
          "Seconds": 1e3,
          "Minutes": 6e4,
          "Hours": 36e5,
          "Days": 864e5,
          "Months": 2592e6,
          "Years": 31536e6
        }, unitAliases = {
          ms: "millisecond",
          s: "second",
          m: "minute",
          h: "hour",
          d: "day",
          D: "date",
          w: "week",
          W: "isoWeek",
          M: "month",
          Q: "quarter",
          y: "year",
          DDD: "dayOfYear",
          e: "weekday",
          E: "isoWeekday",
          gg: "weekYear",
          GG: "isoWeekYear"
        }, camelFunctions = {
          dayofyear: "dayOfYear",
          isoweekday: "isoWeekday",
          isoweek: "isoWeek",
          weekyear: "weekYear",
          isoweekyear: "isoWeekYear"
        }, formatFunctions = {}, relativeTimeThresholds = {
          s: 45,
          m: 45,
          h: 22,
          d: 26,
          M: 11
        }, ordinalizeTokens = "DDD w W M D d".split(" "), paddedTokens = "M D H h m s w W".split(" "), formatTokenFunctions = {
          M: function() {
            return this.month() + 1;
          },
          MMM: function(format) {
            return this.localeData().monthsShort(this, format);
          },
          MMMM: function(format) {
            return this.localeData().months(this, format);
          },
          D: function() {
            return this.date();
          },
          DDD: function() {
            return this.dayOfYear();
          },
          d: function() {
            return this.day();
          },
          dd: function(format) {
            return this.localeData().weekdaysMin(this, format);
          },
          ddd: function(format) {
            return this.localeData().weekdaysShort(this, format);
          },
          dddd: function(format) {
            return this.localeData().weekdays(this, format);
          },
          w: function() {
            return this.week();
          },
          W: function() {
            return this.isoWeek();
          },
          YY: function() {
            return leftZeroFill(this.year() % 100, 2);
          },
          YYYY: function() {
            return leftZeroFill(this.year(), 4);
          },
          YYYYY: function() {
            return leftZeroFill(this.year(), 5);
          },
          YYYYYY: function() {
            var y = this.year(), sign = y >= 0 ? "+" : "-";
            return sign + leftZeroFill(Math.abs(y), 6);
          },
          gg: function() {
            return leftZeroFill(this.weekYear() % 100, 2);
          },
          gggg: function() {
            return leftZeroFill(this.weekYear(), 4);
          },
          ggggg: function() {
            return leftZeroFill(this.weekYear(), 5);
          },
          GG: function() {
            return leftZeroFill(this.isoWeekYear() % 100, 2);
          },
          GGGG: function() {
            return leftZeroFill(this.isoWeekYear(), 4);
          },
          GGGGG: function() {
            return leftZeroFill(this.isoWeekYear(), 5);
          },
          e: function() {
            return this.weekday();
          },
          E: function() {
            return this.isoWeekday();
          },
          a: function() {
            return this.localeData().meridiem(this.hours(), this.minutes(), true);
          },
          A: function() {
            return this.localeData().meridiem(this.hours(), this.minutes(), false);
          },
          H: function() {
            return this.hours();
          },
          h: function() {
            return this.hours() % 12 || 12;
          },
          m: function() {
            return this.minutes();
          },
          s: function() {
            return this.seconds();
          },
          S: function() {
            return toInt(this.milliseconds() / 100);
          },
          SS: function() {
            return leftZeroFill(toInt(this.milliseconds() / 10), 2);
          },
          SSS: function() {
            return leftZeroFill(this.milliseconds(), 3);
          },
          SSSS: function() {
            return leftZeroFill(this.milliseconds(), 3);
          },
          Z: function() {
            var a = -this.zone(), b = "+";
            if (a < 0) {
              a = -a;
              b = "-";
            }
            return b + leftZeroFill(toInt(a / 60), 2) + ":" + leftZeroFill(toInt(a) % 60, 2);
          },
          ZZ: function() {
            var a = -this.zone(), b = "+";
            if (a < 0) {
              a = -a;
              b = "-";
            }
            return b + leftZeroFill(toInt(a / 60), 2) + leftZeroFill(toInt(a) % 60, 2);
          },
          z: function() {
            return this.zoneAbbr();
          },
          zz: function() {
            return this.zoneName();
          },
          x: function() {
            return this.valueOf();
          },
          X: function() {
            return this.unix();
          },
          Q: function() {
            return this.quarter();
          }
        }, deprecations = {}, lists = ["months", "monthsShort", "weekdays", "weekdaysShort", "weekdaysMin"];
        function dfl(a, b, c) {
          switch (arguments.length) {
            case 2:
              return a != null ? a : b;
            case 3:
              return a != null ? a : b != null ? b : c;
            default:
              throw new Error("Implement me");
          }
        }
        function hasOwnProp(a, b) {
          return hasOwnProperty.call(a, b);
        }
        function defaultParsingFlags() {
          return {
            empty: false,
            unusedTokens: [],
            unusedInput: [],
            overflow: -2,
            charsLeftOver: 0,
            nullInput: false,
            invalidMonth: null,
            invalidFormat: false,
            userInvalidated: false,
            iso: false
          };
        }
        function printMsg(msg) {
          if (moment2.suppressDeprecationWarnings === false && typeof console !== "undefined" && console.warn) {
            console.warn("Deprecation warning: " + msg);
          }
        }
        function deprecate(msg, fn) {
          var firstTime = true;
          return extend(function() {
            if (firstTime) {
              printMsg(msg);
              firstTime = false;
            }
            return fn.apply(this, arguments);
          }, fn);
        }
        function deprecateSimple(name, msg) {
          if (!deprecations[name]) {
            printMsg(msg);
            deprecations[name] = true;
          }
        }
        function padToken(func, count) {
          return function(a) {
            return leftZeroFill(func.call(this, a), count);
          };
        }
        function ordinalizeToken(func, period) {
          return function(a) {
            return this.localeData().ordinal(func.call(this, a), period);
          };
        }
        while (ordinalizeTokens.length) {
          i = ordinalizeTokens.pop();
          formatTokenFunctions[i + "o"] = ordinalizeToken(formatTokenFunctions[i], i);
        }
        while (paddedTokens.length) {
          i = paddedTokens.pop();
          formatTokenFunctions[i + i] = padToken(formatTokenFunctions[i], 2);
        }
        formatTokenFunctions.DDDD = padToken(formatTokenFunctions.DDD, 3);
        function Locale() {
        }
        function Moment(config, skipOverflow) {
          if (skipOverflow !== false) {
            checkOverflow(config);
          }
          copyConfig(this, config);
          this._d = new Date(+config._d);
        }
        function Duration(duration) {
          var normalizedInput = normalizeObjectUnits(duration), years = normalizedInput.year || 0, quarters = normalizedInput.quarter || 0, months = normalizedInput.month || 0, weeks = normalizedInput.week || 0, days = normalizedInput.day || 0, hours = normalizedInput.hour || 0, minutes = normalizedInput.minute || 0, seconds = normalizedInput.second || 0, milliseconds = normalizedInput.millisecond || 0;
          this._milliseconds = +milliseconds + seconds * 1e3 + minutes * 6e4 + hours * 36e5;
          this._days = +days + weeks * 7;
          this._months = +months + quarters * 3 + years * 12;
          this._data = {};
          this._locale = moment2.localeData();
          this._bubble();
        }
        function extend(a, b) {
          for (var i2 in b) {
            if (hasOwnProp(b, i2)) {
              a[i2] = b[i2];
            }
          }
          if (hasOwnProp(b, "toString")) {
            a.toString = b.toString;
          }
          if (hasOwnProp(b, "valueOf")) {
            a.valueOf = b.valueOf;
          }
          return a;
        }
        function copyConfig(to, from) {
          var i2, prop, val;
          if (typeof from._isAMomentObject !== "undefined") {
            to._isAMomentObject = from._isAMomentObject;
          }
          if (typeof from._i !== "undefined") {
            to._i = from._i;
          }
          if (typeof from._f !== "undefined") {
            to._f = from._f;
          }
          if (typeof from._l !== "undefined") {
            to._l = from._l;
          }
          if (typeof from._strict !== "undefined") {
            to._strict = from._strict;
          }
          if (typeof from._tzm !== "undefined") {
            to._tzm = from._tzm;
          }
          if (typeof from._isUTC !== "undefined") {
            to._isUTC = from._isUTC;
          }
          if (typeof from._offset !== "undefined") {
            to._offset = from._offset;
          }
          if (typeof from._pf !== "undefined") {
            to._pf = from._pf;
          }
          if (typeof from._locale !== "undefined") {
            to._locale = from._locale;
          }
          if (momentProperties.length > 0) {
            for (i2 in momentProperties) {
              prop = momentProperties[i2];
              val = from[prop];
              if (typeof val !== "undefined") {
                to[prop] = val;
              }
            }
          }
          return to;
        }
        function absRound(number) {
          if (number < 0) {
            return Math.ceil(number);
          } else {
            return Math.floor(number);
          }
        }
        function leftZeroFill(number, targetLength, forceSign) {
          var output = "" + Math.abs(number), sign = number >= 0;
          while (output.length < targetLength) {
            output = "0" + output;
          }
          return (sign ? forceSign ? "+" : "" : "-") + output;
        }
        function positiveMomentsDifference(base, other) {
          var res = { milliseconds: 0, months: 0 };
          res.months = other.month() - base.month() + (other.year() - base.year()) * 12;
          if (base.clone().add(res.months, "M").isAfter(other)) {
            --res.months;
          }
          res.milliseconds = +other - +base.clone().add(res.months, "M");
          return res;
        }
        function momentsDifference(base, other) {
          var res;
          other = makeAs(other, base);
          if (base.isBefore(other)) {
            res = positiveMomentsDifference(base, other);
          } else {
            res = positiveMomentsDifference(other, base);
            res.milliseconds = -res.milliseconds;
            res.months = -res.months;
          }
          return res;
        }
        function createAdder(direction, name) {
          return function(val, period) {
            var dur, tmp;
            if (period !== null && !isNaN(+period)) {
              deprecateSimple(name, "moment()." + name + "(period, number) is deprecated. Please use moment()." + name + "(number, period).");
              tmp = val;
              val = period;
              period = tmp;
            }
            val = typeof val === "string" ? +val : val;
            dur = moment2.duration(val, period);
            addOrSubtractDurationFromMoment(this, dur, direction);
            return this;
          };
        }
        function addOrSubtractDurationFromMoment(mom, duration, isAdding, updateOffset) {
          var milliseconds = duration._milliseconds, days = duration._days, months = duration._months;
          updateOffset = updateOffset == null ? true : updateOffset;
          if (milliseconds) {
            mom._d.setTime(+mom._d + milliseconds * isAdding);
          }
          if (days) {
            rawSetter(mom, "Date", rawGetter(mom, "Date") + days * isAdding);
          }
          if (months) {
            rawMonthSetter(mom, rawGetter(mom, "Month") + months * isAdding);
          }
          if (updateOffset) {
            moment2.updateOffset(mom, days || months);
          }
        }
        function isArray(input) {
          return Object.prototype.toString.call(input) === "[object Array]";
        }
        function isDate(input) {
          return Object.prototype.toString.call(input) === "[object Date]" || input instanceof Date;
        }
        function compareArrays(array1, array2, dontConvert) {
          var len = Math.min(array1.length, array2.length), lengthDiff = Math.abs(array1.length - array2.length), diffs = 0, i2;
          for (i2 = 0; i2 < len; i2++) {
            if (dontConvert && array1[i2] !== array2[i2] || !dontConvert && toInt(array1[i2]) !== toInt(array2[i2])) {
              diffs++;
            }
          }
          return diffs + lengthDiff;
        }
        function normalizeUnits(units) {
          if (units) {
            var lowered = units.toLowerCase().replace(/(.)s$/, "$1");
            units = unitAliases[units] || camelFunctions[lowered] || lowered;
          }
          return units;
        }
        function normalizeObjectUnits(inputObject) {
          var normalizedInput = {}, normalizedProp, prop;
          for (prop in inputObject) {
            if (hasOwnProp(inputObject, prop)) {
              normalizedProp = normalizeUnits(prop);
              if (normalizedProp) {
                normalizedInput[normalizedProp] = inputObject[prop];
              }
            }
          }
          return normalizedInput;
        }
        function makeList(field) {
          var count, setter;
          if (field.indexOf("week") === 0) {
            count = 7;
            setter = "day";
          } else if (field.indexOf("month") === 0) {
            count = 12;
            setter = "month";
          } else {
            return;
          }
          moment2[field] = function(format, index) {
            var i2, getter, method = moment2._locale[field], results = [];
            if (typeof format === "number") {
              index = format;
              format = undefined2;
            }
            getter = function(i3) {
              var m = moment2().utc().set(setter, i3);
              return method.call(moment2._locale, m, format || "");
            };
            if (index != null) {
              return getter(index);
            } else {
              for (i2 = 0; i2 < count; i2++) {
                results.push(getter(i2));
              }
              return results;
            }
          };
        }
        function toInt(argumentForCoercion) {
          var coercedNumber = +argumentForCoercion, value = 0;
          if (coercedNumber !== 0 && isFinite(coercedNumber)) {
            if (coercedNumber >= 0) {
              value = Math.floor(coercedNumber);
            } else {
              value = Math.ceil(coercedNumber);
            }
          }
          return value;
        }
        function daysInMonth(year, month) {
          return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
        }
        function weeksInYear(year, dow, doy) {
          return weekOfYear(moment2([year, 11, 31 + dow - doy]), dow, doy).week;
        }
        function daysInYear(year) {
          return isLeapYear(year) ? 366 : 365;
        }
        function isLeapYear(year) {
          return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
        }
        function checkOverflow(m) {
          var overflow;
          if (m._a && m._pf.overflow === -2) {
            overflow = m._a[MONTH] < 0 || m._a[MONTH] > 11 ? MONTH : m._a[DATE] < 1 || m._a[DATE] > daysInMonth(m._a[YEAR], m._a[MONTH]) ? DATE : m._a[HOUR] < 0 || m._a[HOUR] > 24 || m._a[HOUR] === 24 && (m._a[MINUTE] !== 0 || m._a[SECOND] !== 0 || m._a[MILLISECOND] !== 0) ? HOUR : m._a[MINUTE] < 0 || m._a[MINUTE] > 59 ? MINUTE : m._a[SECOND] < 0 || m._a[SECOND] > 59 ? SECOND : m._a[MILLISECOND] < 0 || m._a[MILLISECOND] > 999 ? MILLISECOND : -1;
            if (m._pf._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
              overflow = DATE;
            }
            m._pf.overflow = overflow;
          }
        }
        function isValid(m) {
          if (m._isValid == null) {
            m._isValid = !isNaN(m._d.getTime()) && m._pf.overflow < 0 && !m._pf.empty && !m._pf.invalidMonth && !m._pf.nullInput && !m._pf.invalidFormat && !m._pf.userInvalidated;
            if (m._strict) {
              m._isValid = m._isValid && m._pf.charsLeftOver === 0 && m._pf.unusedTokens.length === 0 && m._pf.bigHour === undefined2;
            }
          }
          return m._isValid;
        }
        function normalizeLocale(key) {
          return key ? key.toLowerCase().replace("_", "-") : key;
        }
        function chooseLocale(names) {
          var i2 = 0, j, next, locale, split;
          while (i2 < names.length) {
            split = normalizeLocale(names[i2]).split("-");
            j = split.length;
            next = normalizeLocale(names[i2 + 1]);
            next = next ? next.split("-") : null;
            while (j > 0) {
              locale = loadLocale(split.slice(0, j).join("-"));
              if (locale) {
                return locale;
              }
              if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
                break;
              }
              j--;
            }
            i2++;
          }
          return null;
        }
        function loadLocale(name) {
          var oldLocale = null;
          if (!locales[name] && hasModule) {
            try {
              oldLocale = moment2.locale();
              __require("./locale/" + name);
              moment2.locale(oldLocale);
            } catch (e) {
            }
          }
          return locales[name];
        }
        function makeAs(input, model) {
          var res, diff;
          if (model._isUTC) {
            res = model.clone();
            diff = (moment2.isMoment(input) || isDate(input) ? +input : +moment2(input)) - +res;
            res._d.setTime(+res._d + diff);
            moment2.updateOffset(res, false);
            return res;
          } else {
            return moment2(input).local();
          }
        }
        extend(Locale.prototype, {
          set: function(config) {
            var prop, i2;
            for (i2 in config) {
              prop = config[i2];
              if (typeof prop === "function") {
                this[i2] = prop;
              } else {
                this["_" + i2] = prop;
              }
            }
            this._ordinalParseLenient = new RegExp(this._ordinalParse.source + "|" + /\d{1,2}/.source);
          },
          _months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
          months: function(m) {
            return this._months[m.month()];
          },
          _monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
          monthsShort: function(m) {
            return this._monthsShort[m.month()];
          },
          monthsParse: function(monthName, format, strict) {
            var i2, mom, regex;
            if (!this._monthsParse) {
              this._monthsParse = [];
              this._longMonthsParse = [];
              this._shortMonthsParse = [];
            }
            for (i2 = 0; i2 < 12; i2++) {
              mom = moment2.utc([2e3, i2]);
              if (strict && !this._longMonthsParse[i2]) {
                this._longMonthsParse[i2] = new RegExp("^" + this.months(mom, "").replace(".", "") + "$", "i");
                this._shortMonthsParse[i2] = new RegExp("^" + this.monthsShort(mom, "").replace(".", "") + "$", "i");
              }
              if (!strict && !this._monthsParse[i2]) {
                regex = "^" + this.months(mom, "") + "|^" + this.monthsShort(mom, "");
                this._monthsParse[i2] = new RegExp(regex.replace(".", ""), "i");
              }
              if (strict && format === "MMMM" && this._longMonthsParse[i2].test(monthName)) {
                return i2;
              } else if (strict && format === "MMM" && this._shortMonthsParse[i2].test(monthName)) {
                return i2;
              } else if (!strict && this._monthsParse[i2].test(monthName)) {
                return i2;
              }
            }
          },
          _weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
          weekdays: function(m) {
            return this._weekdays[m.day()];
          },
          _weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
          weekdaysShort: function(m) {
            return this._weekdaysShort[m.day()];
          },
          _weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
          weekdaysMin: function(m) {
            return this._weekdaysMin[m.day()];
          },
          weekdaysParse: function(weekdayName) {
            var i2, mom, regex;
            if (!this._weekdaysParse) {
              this._weekdaysParse = [];
            }
            for (i2 = 0; i2 < 7; i2++) {
              if (!this._weekdaysParse[i2]) {
                mom = moment2([2e3, 1]).day(i2);
                regex = "^" + this.weekdays(mom, "") + "|^" + this.weekdaysShort(mom, "") + "|^" + this.weekdaysMin(mom, "");
                this._weekdaysParse[i2] = new RegExp(regex.replace(".", ""), "i");
              }
              if (this._weekdaysParse[i2].test(weekdayName)) {
                return i2;
              }
            }
          },
          _longDateFormat: {
            LTS: "h:mm:ss A",
            LT: "h:mm A",
            L: "MM/DD/YYYY",
            LL: "MMMM D, YYYY",
            LLL: "MMMM D, YYYY LT",
            LLLL: "dddd, MMMM D, YYYY LT"
          },
          longDateFormat: function(key) {
            var output = this._longDateFormat[key];
            if (!output && this._longDateFormat[key.toUpperCase()]) {
              output = this._longDateFormat[key.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, function(val) {
                return val.slice(1);
              });
              this._longDateFormat[key] = output;
            }
            return output;
          },
          isPM: function(input) {
            return (input + "").toLowerCase().charAt(0) === "p";
          },
          _meridiemParse: /[ap]\.?m?\.?/i,
          meridiem: function(hours, minutes, isLower) {
            if (hours > 11) {
              return isLower ? "pm" : "PM";
            } else {
              return isLower ? "am" : "AM";
            }
          },
          _calendar: {
            sameDay: "[Today at] LT",
            nextDay: "[Tomorrow at] LT",
            nextWeek: "dddd [at] LT",
            lastDay: "[Yesterday at] LT",
            lastWeek: "[Last] dddd [at] LT",
            sameElse: "L"
          },
          calendar: function(key, mom, now) {
            var output = this._calendar[key];
            return typeof output === "function" ? output.apply(mom, [now]) : output;
          },
          _relativeTime: {
            future: "in %s",
            past: "%s ago",
            s: "a few seconds",
            m: "a minute",
            mm: "%d minutes",
            h: "an hour",
            hh: "%d hours",
            d: "a day",
            dd: "%d days",
            M: "a month",
            MM: "%d months",
            y: "a year",
            yy: "%d years"
          },
          relativeTime: function(number, withoutSuffix, string, isFuture) {
            var output = this._relativeTime[string];
            return typeof output === "function" ? output(number, withoutSuffix, string, isFuture) : output.replace(/%d/i, number);
          },
          pastFuture: function(diff, output) {
            var format = this._relativeTime[diff > 0 ? "future" : "past"];
            return typeof format === "function" ? format(output) : format.replace(/%s/i, output);
          },
          ordinal: function(number) {
            return this._ordinal.replace("%d", number);
          },
          _ordinal: "%d",
          _ordinalParse: /\d{1,2}/,
          preparse: function(string) {
            return string;
          },
          postformat: function(string) {
            return string;
          },
          week: function(mom) {
            return weekOfYear(mom, this._week.dow, this._week.doy).week;
          },
          _week: {
            dow: 0,
            doy: 6
          },
          _invalidDate: "Invalid date",
          invalidDate: function() {
            return this._invalidDate;
          }
        });
        function removeFormattingTokens(input) {
          if (input.match(/\[[\s\S]/)) {
            return input.replace(/^\[|\]$/g, "");
          }
          return input.replace(/\\/g, "");
        }
        function makeFormatFunction(format) {
          var array = format.match(formattingTokens), i2, length;
          for (i2 = 0, length = array.length; i2 < length; i2++) {
            if (formatTokenFunctions[array[i2]]) {
              array[i2] = formatTokenFunctions[array[i2]];
            } else {
              array[i2] = removeFormattingTokens(array[i2]);
            }
          }
          return function(mom) {
            var output = "";
            for (i2 = 0; i2 < length; i2++) {
              output += array[i2] instanceof Function ? array[i2].call(mom, format) : array[i2];
            }
            return output;
          };
        }
        function formatMoment(m, format) {
          if (!m.isValid()) {
            return m.localeData().invalidDate();
          }
          format = expandFormat(format, m.localeData());
          if (!formatFunctions[format]) {
            formatFunctions[format] = makeFormatFunction(format);
          }
          return formatFunctions[format](m);
        }
        function expandFormat(format, locale) {
          var i2 = 5;
          function replaceLongDateFormatTokens(input) {
            return locale.longDateFormat(input) || input;
          }
          localFormattingTokens.lastIndex = 0;
          while (i2 >= 0 && localFormattingTokens.test(format)) {
            format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
            localFormattingTokens.lastIndex = 0;
            i2 -= 1;
          }
          return format;
        }
        function getParseRegexForToken(token, config) {
          var a, strict = config._strict;
          switch (token) {
            case "Q":
              return parseTokenOneDigit;
            case "DDDD":
              return parseTokenThreeDigits;
            case "YYYY":
            case "GGGG":
            case "gggg":
              return strict ? parseTokenFourDigits : parseTokenOneToFourDigits;
            case "Y":
            case "G":
            case "g":
              return parseTokenSignedNumber;
            case "YYYYYY":
            case "YYYYY":
            case "GGGGG":
            case "ggggg":
              return strict ? parseTokenSixDigits : parseTokenOneToSixDigits;
            case "S":
              if (strict) {
                return parseTokenOneDigit;
              }
            case "SS":
              if (strict) {
                return parseTokenTwoDigits;
              }
            case "SSS":
              if (strict) {
                return parseTokenThreeDigits;
              }
            case "DDD":
              return parseTokenOneToThreeDigits;
            case "MMM":
            case "MMMM":
            case "dd":
            case "ddd":
            case "dddd":
              return parseTokenWord;
            case "a":
            case "A":
              return config._locale._meridiemParse;
            case "x":
              return parseTokenOffsetMs;
            case "X":
              return parseTokenTimestampMs;
            case "Z":
            case "ZZ":
              return parseTokenTimezone;
            case "T":
              return parseTokenT;
            case "SSSS":
              return parseTokenDigits;
            case "MM":
            case "DD":
            case "YY":
            case "GG":
            case "gg":
            case "HH":
            case "hh":
            case "mm":
            case "ss":
            case "ww":
            case "WW":
              return strict ? parseTokenTwoDigits : parseTokenOneOrTwoDigits;
            case "M":
            case "D":
            case "d":
            case "H":
            case "h":
            case "m":
            case "s":
            case "w":
            case "W":
            case "e":
            case "E":
              return parseTokenOneOrTwoDigits;
            case "Do":
              return strict ? config._locale._ordinalParse : config._locale._ordinalParseLenient;
            default:
              a = new RegExp(regexpEscape(unescapeFormat(token.replace("\\", "")), "i"));
              return a;
          }
        }
        function timezoneMinutesFromString(string) {
          string = string || "";
          var possibleTzMatches = string.match(parseTokenTimezone) || [], tzChunk = possibleTzMatches[possibleTzMatches.length - 1] || [], parts = (tzChunk + "").match(parseTimezoneChunker) || ["-", 0, 0], minutes = +(parts[1] * 60) + toInt(parts[2]);
          return parts[0] === "+" ? -minutes : minutes;
        }
        function addTimeToArrayFromToken(token, input, config) {
          var a, datePartArray = config._a;
          switch (token) {
            case "Q":
              if (input != null) {
                datePartArray[MONTH] = (toInt(input) - 1) * 3;
              }
              break;
            case "M":
            case "MM":
              if (input != null) {
                datePartArray[MONTH] = toInt(input) - 1;
              }
              break;
            case "MMM":
            case "MMMM":
              a = config._locale.monthsParse(input, token, config._strict);
              if (a != null) {
                datePartArray[MONTH] = a;
              } else {
                config._pf.invalidMonth = input;
              }
              break;
            case "D":
            case "DD":
              if (input != null) {
                datePartArray[DATE] = toInt(input);
              }
              break;
            case "Do":
              if (input != null) {
                datePartArray[DATE] = toInt(parseInt(input.match(/\d{1,2}/)[0], 10));
              }
              break;
            case "DDD":
            case "DDDD":
              if (input != null) {
                config._dayOfYear = toInt(input);
              }
              break;
            case "YY":
              datePartArray[YEAR] = moment2.parseTwoDigitYear(input);
              break;
            case "YYYY":
            case "YYYYY":
            case "YYYYYY":
              datePartArray[YEAR] = toInt(input);
              break;
            case "a":
            case "A":
              config._isPm = config._locale.isPM(input);
              break;
            case "h":
            case "hh":
              config._pf.bigHour = true;
            case "H":
            case "HH":
              datePartArray[HOUR] = toInt(input);
              break;
            case "m":
            case "mm":
              datePartArray[MINUTE] = toInt(input);
              break;
            case "s":
            case "ss":
              datePartArray[SECOND] = toInt(input);
              break;
            case "S":
            case "SS":
            case "SSS":
            case "SSSS":
              datePartArray[MILLISECOND] = toInt(("0." + input) * 1e3);
              break;
            case "x":
              config._d = new Date(toInt(input));
              break;
            case "X":
              config._d = new Date(parseFloat(input) * 1e3);
              break;
            case "Z":
            case "ZZ":
              config._useUTC = true;
              config._tzm = timezoneMinutesFromString(input);
              break;
            case "dd":
            case "ddd":
            case "dddd":
              a = config._locale.weekdaysParse(input);
              if (a != null) {
                config._w = config._w || {};
                config._w["d"] = a;
              } else {
                config._pf.invalidWeekday = input;
              }
              break;
            case "w":
            case "ww":
            case "W":
            case "WW":
            case "d":
            case "e":
            case "E":
              token = token.substr(0, 1);
            case "gggg":
            case "GGGG":
            case "GGGGG":
              token = token.substr(0, 2);
              if (input) {
                config._w = config._w || {};
                config._w[token] = toInt(input);
              }
              break;
            case "gg":
            case "GG":
              config._w = config._w || {};
              config._w[token] = moment2.parseTwoDigitYear(input);
          }
        }
        function dayOfYearFromWeekInfo(config) {
          var w, weekYear, week, weekday, dow, doy, temp;
          w = config._w;
          if (w.GG != null || w.W != null || w.E != null) {
            dow = 1;
            doy = 4;
            weekYear = dfl(w.GG, config._a[YEAR], weekOfYear(moment2(), 1, 4).year);
            week = dfl(w.W, 1);
            weekday = dfl(w.E, 1);
          } else {
            dow = config._locale._week.dow;
            doy = config._locale._week.doy;
            weekYear = dfl(w.gg, config._a[YEAR], weekOfYear(moment2(), dow, doy).year);
            week = dfl(w.w, 1);
            if (w.d != null) {
              weekday = w.d;
              if (weekday < dow) {
                ++week;
              }
            } else if (w.e != null) {
              weekday = w.e + dow;
            } else {
              weekday = dow;
            }
          }
          temp = dayOfYearFromWeeks(weekYear, week, weekday, doy, dow);
          config._a[YEAR] = temp.year;
          config._dayOfYear = temp.dayOfYear;
        }
        function dateFromConfig(config) {
          var i2, date, input = [], currentDate, yearToUse;
          if (config._d) {
            return;
          }
          currentDate = currentDateArray(config);
          if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
            dayOfYearFromWeekInfo(config);
          }
          if (config._dayOfYear) {
            yearToUse = dfl(config._a[YEAR], currentDate[YEAR]);
            if (config._dayOfYear > daysInYear(yearToUse)) {
              config._pf._overflowDayOfYear = true;
            }
            date = makeUTCDate(yearToUse, 0, config._dayOfYear);
            config._a[MONTH] = date.getUTCMonth();
            config._a[DATE] = date.getUTCDate();
          }
          for (i2 = 0; i2 < 3 && config._a[i2] == null; ++i2) {
            config._a[i2] = input[i2] = currentDate[i2];
          }
          for (; i2 < 7; i2++) {
            config._a[i2] = input[i2] = config._a[i2] == null ? i2 === 2 ? 1 : 0 : config._a[i2];
          }
          if (config._a[HOUR] === 24 && config._a[MINUTE] === 0 && config._a[SECOND] === 0 && config._a[MILLISECOND] === 0) {
            config._nextDay = true;
            config._a[HOUR] = 0;
          }
          config._d = (config._useUTC ? makeUTCDate : makeDate).apply(null, input);
          if (config._tzm != null) {
            config._d.setUTCMinutes(config._d.getUTCMinutes() + config._tzm);
          }
          if (config._nextDay) {
            config._a[HOUR] = 24;
          }
        }
        function dateFromObject(config) {
          var normalizedInput;
          if (config._d) {
            return;
          }
          normalizedInput = normalizeObjectUnits(config._i);
          config._a = [
            normalizedInput.year,
            normalizedInput.month,
            normalizedInput.day || normalizedInput.date,
            normalizedInput.hour,
            normalizedInput.minute,
            normalizedInput.second,
            normalizedInput.millisecond
          ];
          dateFromConfig(config);
        }
        function currentDateArray(config) {
          var now = new Date();
          if (config._useUTC) {
            return [
              now.getUTCFullYear(),
              now.getUTCMonth(),
              now.getUTCDate()
            ];
          } else {
            return [now.getFullYear(), now.getMonth(), now.getDate()];
          }
        }
        function makeDateFromStringAndFormat(config) {
          if (config._f === moment2.ISO_8601) {
            parseISO(config);
            return;
          }
          config._a = [];
          config._pf.empty = true;
          var string = "" + config._i, i2, parsedInput, tokens, token, skipped, stringLength = string.length, totalParsedInputLength = 0;
          tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];
          for (i2 = 0; i2 < tokens.length; i2++) {
            token = tokens[i2];
            parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
            if (parsedInput) {
              skipped = string.substr(0, string.indexOf(parsedInput));
              if (skipped.length > 0) {
                config._pf.unusedInput.push(skipped);
              }
              string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
              totalParsedInputLength += parsedInput.length;
            }
            if (formatTokenFunctions[token]) {
              if (parsedInput) {
                config._pf.empty = false;
              } else {
                config._pf.unusedTokens.push(token);
              }
              addTimeToArrayFromToken(token, parsedInput, config);
            } else if (config._strict && !parsedInput) {
              config._pf.unusedTokens.push(token);
            }
          }
          config._pf.charsLeftOver = stringLength - totalParsedInputLength;
          if (string.length > 0) {
            config._pf.unusedInput.push(string);
          }
          if (config._pf.bigHour === true && config._a[HOUR] <= 12) {
            config._pf.bigHour = undefined2;
          }
          if (config._isPm && config._a[HOUR] < 12) {
            config._a[HOUR] += 12;
          }
          if (config._isPm === false && config._a[HOUR] === 12) {
            config._a[HOUR] = 0;
          }
          dateFromConfig(config);
          checkOverflow(config);
        }
        function unescapeFormat(s) {
          return s.replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(matched, p1, p2, p3, p4) {
            return p1 || p2 || p3 || p4;
          });
        }
        function regexpEscape(s) {
          return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
        }
        function makeDateFromStringAndArray(config) {
          var tempConfig, bestMoment, scoreToBeat, i2, currentScore;
          if (config._f.length === 0) {
            config._pf.invalidFormat = true;
            config._d = new Date(NaN);
            return;
          }
          for (i2 = 0; i2 < config._f.length; i2++) {
            currentScore = 0;
            tempConfig = copyConfig({}, config);
            if (config._useUTC != null) {
              tempConfig._useUTC = config._useUTC;
            }
            tempConfig._pf = defaultParsingFlags();
            tempConfig._f = config._f[i2];
            makeDateFromStringAndFormat(tempConfig);
            if (!isValid(tempConfig)) {
              continue;
            }
            currentScore += tempConfig._pf.charsLeftOver;
            currentScore += tempConfig._pf.unusedTokens.length * 10;
            tempConfig._pf.score = currentScore;
            if (scoreToBeat == null || currentScore < scoreToBeat) {
              scoreToBeat = currentScore;
              bestMoment = tempConfig;
            }
          }
          extend(config, bestMoment || tempConfig);
        }
        function parseISO(config) {
          var i2, l, string = config._i, match = isoRegex.exec(string);
          if (match) {
            config._pf.iso = true;
            for (i2 = 0, l = isoDates.length; i2 < l; i2++) {
              if (isoDates[i2][1].exec(string)) {
                config._f = isoDates[i2][0] + (match[6] || " ");
                break;
              }
            }
            for (i2 = 0, l = isoTimes.length; i2 < l; i2++) {
              if (isoTimes[i2][1].exec(string)) {
                config._f += isoTimes[i2][0];
                break;
              }
            }
            if (string.match(parseTokenTimezone)) {
              config._f += "Z";
            }
            makeDateFromStringAndFormat(config);
          } else {
            config._isValid = false;
          }
        }
        function makeDateFromString(config) {
          parseISO(config);
          if (config._isValid === false) {
            delete config._isValid;
            moment2.createFromInputFallback(config);
          }
        }
        function map(arr, fn) {
          var res = [], i2;
          for (i2 = 0; i2 < arr.length; ++i2) {
            res.push(fn(arr[i2], i2));
          }
          return res;
        }
        function makeDateFromInput(config) {
          var input = config._i, matched;
          if (input === undefined2) {
            config._d = new Date();
          } else if (isDate(input)) {
            config._d = new Date(+input);
          } else if ((matched = aspNetJsonRegex.exec(input)) !== null) {
            config._d = new Date(+matched[1]);
          } else if (typeof input === "string") {
            makeDateFromString(config);
          } else if (isArray(input)) {
            config._a = map(input.slice(0), function(obj) {
              return parseInt(obj, 10);
            });
            dateFromConfig(config);
          } else if (typeof input === "object") {
            dateFromObject(config);
          } else if (typeof input === "number") {
            config._d = new Date(input);
          } else {
            moment2.createFromInputFallback(config);
          }
        }
        function makeDate(y, m, d, h, M, s, ms) {
          var date = new Date(y, m, d, h, M, s, ms);
          if (y < 1970) {
            date.setFullYear(y);
          }
          return date;
        }
        function makeUTCDate(y) {
          var date = new Date(Date.UTC.apply(null, arguments));
          if (y < 1970) {
            date.setUTCFullYear(y);
          }
          return date;
        }
        function parseWeekday(input, locale) {
          if (typeof input === "string") {
            if (!isNaN(input)) {
              input = parseInt(input, 10);
            } else {
              input = locale.weekdaysParse(input);
              if (typeof input !== "number") {
                return null;
              }
            }
          }
          return input;
        }
        function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
          return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
        }
        function relativeTime(posNegDuration, withoutSuffix, locale) {
          var duration = moment2.duration(posNegDuration).abs(), seconds = round(duration.as("s")), minutes = round(duration.as("m")), hours = round(duration.as("h")), days = round(duration.as("d")), months = round(duration.as("M")), years = round(duration.as("y")), args = seconds < relativeTimeThresholds.s && ["s", seconds] || minutes === 1 && ["m"] || minutes < relativeTimeThresholds.m && ["mm", minutes] || hours === 1 && ["h"] || hours < relativeTimeThresholds.h && ["hh", hours] || days === 1 && ["d"] || days < relativeTimeThresholds.d && ["dd", days] || months === 1 && ["M"] || months < relativeTimeThresholds.M && ["MM", months] || years === 1 && ["y"] || ["yy", years];
          args[2] = withoutSuffix;
          args[3] = +posNegDuration > 0;
          args[4] = locale;
          return substituteTimeAgo.apply({}, args);
        }
        function weekOfYear(mom, firstDayOfWeek, firstDayOfWeekOfYear) {
          var end = firstDayOfWeekOfYear - firstDayOfWeek, daysToDayOfWeek = firstDayOfWeekOfYear - mom.day(), adjustedMoment;
          if (daysToDayOfWeek > end) {
            daysToDayOfWeek -= 7;
          }
          if (daysToDayOfWeek < end - 7) {
            daysToDayOfWeek += 7;
          }
          adjustedMoment = moment2(mom).add(daysToDayOfWeek, "d");
          return {
            week: Math.ceil(adjustedMoment.dayOfYear() / 7),
            year: adjustedMoment.year()
          };
        }
        function dayOfYearFromWeeks(year, week, weekday, firstDayOfWeekOfYear, firstDayOfWeek) {
          var d = makeUTCDate(year, 0, 1).getUTCDay(), daysToAdd, dayOfYear;
          d = d === 0 ? 7 : d;
          weekday = weekday != null ? weekday : firstDayOfWeek;
          daysToAdd = firstDayOfWeek - d + (d > firstDayOfWeekOfYear ? 7 : 0) - (d < firstDayOfWeek ? 7 : 0);
          dayOfYear = 7 * (week - 1) + (weekday - firstDayOfWeek) + daysToAdd + 1;
          return {
            year: dayOfYear > 0 ? year : year - 1,
            dayOfYear: dayOfYear > 0 ? dayOfYear : daysInYear(year - 1) + dayOfYear
          };
        }
        function makeMoment(config) {
          var input = config._i, format = config._f, res;
          config._locale = config._locale || moment2.localeData(config._l);
          if (input === null || format === undefined2 && input === "") {
            return moment2.invalid({ nullInput: true });
          }
          if (typeof input === "string") {
            config._i = input = config._locale.preparse(input);
          }
          if (moment2.isMoment(input)) {
            return new Moment(input, true);
          } else if (format) {
            if (isArray(format)) {
              makeDateFromStringAndArray(config);
            } else {
              makeDateFromStringAndFormat(config);
            }
          } else {
            makeDateFromInput(config);
          }
          res = new Moment(config);
          if (res._nextDay) {
            res.add(1, "d");
            res._nextDay = undefined2;
          }
          return res;
        }
        moment2 = function(input, format, locale, strict) {
          var c;
          if (typeof locale === "boolean") {
            strict = locale;
            locale = undefined2;
          }
          c = {};
          c._isAMomentObject = true;
          c._i = input;
          c._f = format;
          c._l = locale;
          c._strict = strict;
          c._isUTC = false;
          c._pf = defaultParsingFlags();
          return makeMoment(c);
        };
        moment2.suppressDeprecationWarnings = false;
        moment2.createFromInputFallback = deprecate("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.", function(config) {
          config._d = new Date(config._i + (config._useUTC ? " UTC" : ""));
        });
        function pickBy(fn, moments) {
          var res, i2;
          if (moments.length === 1 && isArray(moments[0])) {
            moments = moments[0];
          }
          if (!moments.length) {
            return moment2();
          }
          res = moments[0];
          for (i2 = 1; i2 < moments.length; ++i2) {
            if (moments[i2][fn](res)) {
              res = moments[i2];
            }
          }
          return res;
        }
        moment2.min = function() {
          var args = [].slice.call(arguments, 0);
          return pickBy("isBefore", args);
        };
        moment2.max = function() {
          var args = [].slice.call(arguments, 0);
          return pickBy("isAfter", args);
        };
        moment2.utc = function(input, format, locale, strict) {
          var c;
          if (typeof locale === "boolean") {
            strict = locale;
            locale = undefined2;
          }
          c = {};
          c._isAMomentObject = true;
          c._useUTC = true;
          c._isUTC = true;
          c._l = locale;
          c._i = input;
          c._f = format;
          c._strict = strict;
          c._pf = defaultParsingFlags();
          return makeMoment(c).utc();
        };
        moment2.unix = function(input) {
          return moment2(input * 1e3);
        };
        moment2.duration = function(input, key) {
          var duration = input, match = null, sign, ret, parseIso, diffRes;
          if (moment2.isDuration(input)) {
            duration = {
              ms: input._milliseconds,
              d: input._days,
              M: input._months
            };
          } else if (typeof input === "number") {
            duration = {};
            if (key) {
              duration[key] = input;
            } else {
              duration.milliseconds = input;
            }
          } else if (!!(match = aspNetTimeSpanJsonRegex.exec(input))) {
            sign = match[1] === "-" ? -1 : 1;
            duration = {
              y: 0,
              d: toInt(match[DATE]) * sign,
              h: toInt(match[HOUR]) * sign,
              m: toInt(match[MINUTE]) * sign,
              s: toInt(match[SECOND]) * sign,
              ms: toInt(match[MILLISECOND]) * sign
            };
          } else if (!!(match = isoDurationRegex.exec(input))) {
            sign = match[1] === "-" ? -1 : 1;
            parseIso = function(inp) {
              var res = inp && parseFloat(inp.replace(",", "."));
              return (isNaN(res) ? 0 : res) * sign;
            };
            duration = {
              y: parseIso(match[2]),
              M: parseIso(match[3]),
              d: parseIso(match[4]),
              h: parseIso(match[5]),
              m: parseIso(match[6]),
              s: parseIso(match[7]),
              w: parseIso(match[8])
            };
          } else if (typeof duration === "object" && ("from" in duration || "to" in duration)) {
            diffRes = momentsDifference(moment2(duration.from), moment2(duration.to));
            duration = {};
            duration.ms = diffRes.milliseconds;
            duration.M = diffRes.months;
          }
          ret = new Duration(duration);
          if (moment2.isDuration(input) && hasOwnProp(input, "_locale")) {
            ret._locale = input._locale;
          }
          return ret;
        };
        moment2.version = VERSION;
        moment2.defaultFormat = isoFormat;
        moment2.ISO_8601 = function() {
        };
        moment2.momentProperties = momentProperties;
        moment2.updateOffset = function() {
        };
        moment2.relativeTimeThreshold = function(threshold, limit) {
          if (relativeTimeThresholds[threshold] === undefined2) {
            return false;
          }
          if (limit === undefined2) {
            return relativeTimeThresholds[threshold];
          }
          relativeTimeThresholds[threshold] = limit;
          return true;
        };
        moment2.lang = deprecate("moment.lang is deprecated. Use moment.locale instead.", function(key, value) {
          return moment2.locale(key, value);
        });
        moment2.locale = function(key, values) {
          var data;
          if (key) {
            if (typeof values !== "undefined") {
              data = moment2.defineLocale(key, values);
            } else {
              data = moment2.localeData(key);
            }
            if (data) {
              moment2.duration._locale = moment2._locale = data;
            }
          }
          return moment2._locale._abbr;
        };
        moment2.defineLocale = function(name, values) {
          if (values !== null) {
            values.abbr = name;
            if (!locales[name]) {
              locales[name] = new Locale();
            }
            locales[name].set(values);
            moment2.locale(name);
            return locales[name];
          } else {
            delete locales[name];
            return null;
          }
        };
        moment2.langData = deprecate("moment.langData is deprecated. Use moment.localeData instead.", function(key) {
          return moment2.localeData(key);
        });
        moment2.localeData = function(key) {
          var locale;
          if (key && key._locale && key._locale._abbr) {
            key = key._locale._abbr;
          }
          if (!key) {
            return moment2._locale;
          }
          if (!isArray(key)) {
            locale = loadLocale(key);
            if (locale) {
              return locale;
            }
            key = [key];
          }
          return chooseLocale(key);
        };
        moment2.isMoment = function(obj) {
          return obj instanceof Moment || obj != null && hasOwnProp(obj, "_isAMomentObject");
        };
        moment2.isDuration = function(obj) {
          return obj instanceof Duration;
        };
        for (i = lists.length - 1; i >= 0; --i) {
          makeList(lists[i]);
        }
        moment2.normalizeUnits = function(units) {
          return normalizeUnits(units);
        };
        moment2.invalid = function(flags) {
          var m = moment2.utc(NaN);
          if (flags != null) {
            extend(m._pf, flags);
          } else {
            m._pf.userInvalidated = true;
          }
          return m;
        };
        moment2.parseZone = function() {
          return moment2.apply(null, arguments).parseZone();
        };
        moment2.parseTwoDigitYear = function(input) {
          return toInt(input) + (toInt(input) > 68 ? 1900 : 2e3);
        };
        extend(moment2.fn = Moment.prototype, {
          clone: function() {
            return moment2(this);
          },
          valueOf: function() {
            return +this._d + (this._offset || 0) * 6e4;
          },
          unix: function() {
            return Math.floor(+this / 1e3);
          },
          toString: function() {
            return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
          },
          toDate: function() {
            return this._offset ? new Date(+this) : this._d;
          },
          toISOString: function() {
            var m = moment2(this).utc();
            if (0 < m.year() && m.year() <= 9999) {
              if (typeof Date.prototype.toISOString === "function") {
                return this.toDate().toISOString();
              } else {
                return formatMoment(m, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]");
              }
            } else {
              return formatMoment(m, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]");
            }
          },
          toArray: function() {
            var m = this;
            return [
              m.year(),
              m.month(),
              m.date(),
              m.hours(),
              m.minutes(),
              m.seconds(),
              m.milliseconds()
            ];
          },
          isValid: function() {
            return isValid(this);
          },
          isDSTShifted: function() {
            if (this._a) {
              return this.isValid() && compareArrays(this._a, (this._isUTC ? moment2.utc(this._a) : moment2(this._a)).toArray()) > 0;
            }
            return false;
          },
          parsingFlags: function() {
            return extend({}, this._pf);
          },
          invalidAt: function() {
            return this._pf.overflow;
          },
          utc: function(keepLocalTime) {
            return this.zone(0, keepLocalTime);
          },
          local: function(keepLocalTime) {
            if (this._isUTC) {
              this.zone(0, keepLocalTime);
              this._isUTC = false;
              if (keepLocalTime) {
                this.add(this._dateTzOffset(), "m");
              }
            }
            return this;
          },
          format: function(inputString) {
            var output = formatMoment(this, inputString || moment2.defaultFormat);
            return this.localeData().postformat(output);
          },
          add: createAdder(1, "add"),
          subtract: createAdder(-1, "subtract"),
          diff: function(input, units, asFloat) {
            var that = makeAs(input, this), zoneDiff = (this.zone() - that.zone()) * 6e4, diff, output, daysAdjust;
            units = normalizeUnits(units);
            if (units === "year" || units === "month") {
              diff = (this.daysInMonth() + that.daysInMonth()) * 432e5;
              output = (this.year() - that.year()) * 12 + (this.month() - that.month());
              daysAdjust = this - moment2(this).startOf("month") - (that - moment2(that).startOf("month"));
              daysAdjust -= (this.zone() - moment2(this).startOf("month").zone() - (that.zone() - moment2(that).startOf("month").zone())) * 6e4;
              output += daysAdjust / diff;
              if (units === "year") {
                output = output / 12;
              }
            } else {
              diff = this - that;
              output = units === "second" ? diff / 1e3 : units === "minute" ? diff / 6e4 : units === "hour" ? diff / 36e5 : units === "day" ? (diff - zoneDiff) / 864e5 : units === "week" ? (diff - zoneDiff) / 6048e5 : diff;
            }
            return asFloat ? output : absRound(output);
          },
          from: function(time, withoutSuffix) {
            return moment2.duration({ to: this, from: time }).locale(this.locale()).humanize(!withoutSuffix);
          },
          fromNow: function(withoutSuffix) {
            return this.from(moment2(), withoutSuffix);
          },
          calendar: function(time) {
            var now = time || moment2(), sod = makeAs(now, this).startOf("day"), diff = this.diff(sod, "days", true), format = diff < -6 ? "sameElse" : diff < -1 ? "lastWeek" : diff < 0 ? "lastDay" : diff < 1 ? "sameDay" : diff < 2 ? "nextDay" : diff < 7 ? "nextWeek" : "sameElse";
            return this.format(this.localeData().calendar(format, this, moment2(now)));
          },
          isLeapYear: function() {
            return isLeapYear(this.year());
          },
          isDST: function() {
            return this.zone() < this.clone().month(0).zone() || this.zone() < this.clone().month(5).zone();
          },
          day: function(input) {
            var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
            if (input != null) {
              input = parseWeekday(input, this.localeData());
              return this.add(input - day, "d");
            } else {
              return day;
            }
          },
          month: makeAccessor("Month", true),
          startOf: function(units) {
            units = normalizeUnits(units);
            switch (units) {
              case "year":
                this.month(0);
              case "quarter":
              case "month":
                this.date(1);
              case "week":
              case "isoWeek":
              case "day":
                this.hours(0);
              case "hour":
                this.minutes(0);
              case "minute":
                this.seconds(0);
              case "second":
                this.milliseconds(0);
            }
            if (units === "week") {
              this.weekday(0);
            } else if (units === "isoWeek") {
              this.isoWeekday(1);
            }
            if (units === "quarter") {
              this.month(Math.floor(this.month() / 3) * 3);
            }
            return this;
          },
          endOf: function(units) {
            units = normalizeUnits(units);
            if (units === undefined2 || units === "millisecond") {
              return this;
            }
            return this.startOf(units).add(1, units === "isoWeek" ? "week" : units).subtract(1, "ms");
          },
          isAfter: function(input, units) {
            var inputMs;
            units = normalizeUnits(typeof units !== "undefined" ? units : "millisecond");
            if (units === "millisecond") {
              input = moment2.isMoment(input) ? input : moment2(input);
              return +this > +input;
            } else {
              inputMs = moment2.isMoment(input) ? +input : +moment2(input);
              return inputMs < +this.clone().startOf(units);
            }
          },
          isBefore: function(input, units) {
            var inputMs;
            units = normalizeUnits(typeof units !== "undefined" ? units : "millisecond");
            if (units === "millisecond") {
              input = moment2.isMoment(input) ? input : moment2(input);
              return +this < +input;
            } else {
              inputMs = moment2.isMoment(input) ? +input : +moment2(input);
              return +this.clone().endOf(units) < inputMs;
            }
          },
          isSame: function(input, units) {
            var inputMs;
            units = normalizeUnits(units || "millisecond");
            if (units === "millisecond") {
              input = moment2.isMoment(input) ? input : moment2(input);
              return +this === +input;
            } else {
              inputMs = +moment2(input);
              return +this.clone().startOf(units) <= inputMs && inputMs <= +this.clone().endOf(units);
            }
          },
          min: deprecate("moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548", function(other) {
            other = moment2.apply(null, arguments);
            return other < this ? this : other;
          }),
          max: deprecate("moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548", function(other) {
            other = moment2.apply(null, arguments);
            return other > this ? this : other;
          }),
          zone: function(input, keepLocalTime) {
            var offset = this._offset || 0, localAdjust;
            if (input != null) {
              if (typeof input === "string") {
                input = timezoneMinutesFromString(input);
              }
              if (Math.abs(input) < 16) {
                input = input * 60;
              }
              if (!this._isUTC && keepLocalTime) {
                localAdjust = this._dateTzOffset();
              }
              this._offset = input;
              this._isUTC = true;
              if (localAdjust != null) {
                this.subtract(localAdjust, "m");
              }
              if (offset !== input) {
                if (!keepLocalTime || this._changeInProgress) {
                  addOrSubtractDurationFromMoment(this, moment2.duration(offset - input, "m"), 1, false);
                } else if (!this._changeInProgress) {
                  this._changeInProgress = true;
                  moment2.updateOffset(this, true);
                  this._changeInProgress = null;
                }
              }
            } else {
              return this._isUTC ? offset : this._dateTzOffset();
            }
            return this;
          },
          zoneAbbr: function() {
            return this._isUTC ? "UTC" : "";
          },
          zoneName: function() {
            return this._isUTC ? "Coordinated Universal Time" : "";
          },
          parseZone: function() {
            if (this._tzm) {
              this.zone(this._tzm);
            } else if (typeof this._i === "string") {
              this.zone(this._i);
            }
            return this;
          },
          hasAlignedHourOffset: function(input) {
            if (!input) {
              input = 0;
            } else {
              input = moment2(input).zone();
            }
            return (this.zone() - input) % 60 === 0;
          },
          daysInMonth: function() {
            return daysInMonth(this.year(), this.month());
          },
          dayOfYear: function(input) {
            var dayOfYear = round((moment2(this).startOf("day") - moment2(this).startOf("year")) / 864e5) + 1;
            return input == null ? dayOfYear : this.add(input - dayOfYear, "d");
          },
          quarter: function(input) {
            return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
          },
          weekYear: function(input) {
            var year = weekOfYear(this, this.localeData()._week.dow, this.localeData()._week.doy).year;
            return input == null ? year : this.add(input - year, "y");
          },
          isoWeekYear: function(input) {
            var year = weekOfYear(this, 1, 4).year;
            return input == null ? year : this.add(input - year, "y");
          },
          week: function(input) {
            var week = this.localeData().week(this);
            return input == null ? week : this.add((input - week) * 7, "d");
          },
          isoWeek: function(input) {
            var week = weekOfYear(this, 1, 4).week;
            return input == null ? week : this.add((input - week) * 7, "d");
          },
          weekday: function(input) {
            var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
            return input == null ? weekday : this.add(input - weekday, "d");
          },
          isoWeekday: function(input) {
            return input == null ? this.day() || 7 : this.day(this.day() % 7 ? input : input - 7);
          },
          isoWeeksInYear: function() {
            return weeksInYear(this.year(), 1, 4);
          },
          weeksInYear: function() {
            var weekInfo = this.localeData()._week;
            return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
          },
          get: function(units) {
            units = normalizeUnits(units);
            return this[units]();
          },
          set: function(units, value) {
            units = normalizeUnits(units);
            if (typeof this[units] === "function") {
              this[units](value);
            }
            return this;
          },
          locale: function(key) {
            var newLocaleData;
            if (key === undefined2) {
              return this._locale._abbr;
            } else {
              newLocaleData = moment2.localeData(key);
              if (newLocaleData != null) {
                this._locale = newLocaleData;
              }
              return this;
            }
          },
          lang: deprecate("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function(key) {
            if (key === undefined2) {
              return this.localeData();
            } else {
              return this.locale(key);
            }
          }),
          localeData: function() {
            return this._locale;
          },
          _dateTzOffset: function() {
            return Math.round(this._d.getTimezoneOffset() / 15) * 15;
          }
        });
        function rawMonthSetter(mom, value) {
          var dayOfMonth;
          if (typeof value === "string") {
            value = mom.localeData().monthsParse(value);
            if (typeof value !== "number") {
              return mom;
            }
          }
          dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
          mom._d["set" + (mom._isUTC ? "UTC" : "") + "Month"](value, dayOfMonth);
          return mom;
        }
        function rawGetter(mom, unit) {
          return mom._d["get" + (mom._isUTC ? "UTC" : "") + unit]();
        }
        function rawSetter(mom, unit, value) {
          if (unit === "Month") {
            return rawMonthSetter(mom, value);
          } else {
            return mom._d["set" + (mom._isUTC ? "UTC" : "") + unit](value);
          }
        }
        function makeAccessor(unit, keepTime) {
          return function(value) {
            if (value != null) {
              rawSetter(this, unit, value);
              moment2.updateOffset(this, keepTime);
              return this;
            } else {
              return rawGetter(this, unit);
            }
          };
        }
        moment2.fn.millisecond = moment2.fn.milliseconds = makeAccessor("Milliseconds", false);
        moment2.fn.second = moment2.fn.seconds = makeAccessor("Seconds", false);
        moment2.fn.minute = moment2.fn.minutes = makeAccessor("Minutes", false);
        moment2.fn.hour = moment2.fn.hours = makeAccessor("Hours", true);
        moment2.fn.date = makeAccessor("Date", true);
        moment2.fn.dates = deprecate("dates accessor is deprecated. Use date instead.", makeAccessor("Date", true));
        moment2.fn.year = makeAccessor("FullYear", true);
        moment2.fn.years = deprecate("years accessor is deprecated. Use year instead.", makeAccessor("FullYear", true));
        moment2.fn.days = moment2.fn.day;
        moment2.fn.months = moment2.fn.month;
        moment2.fn.weeks = moment2.fn.week;
        moment2.fn.isoWeeks = moment2.fn.isoWeek;
        moment2.fn.quarters = moment2.fn.quarter;
        moment2.fn.toJSON = moment2.fn.toISOString;
        function daysToYears(days) {
          return days * 400 / 146097;
        }
        function yearsToDays(years) {
          return years * 146097 / 400;
        }
        extend(moment2.duration.fn = Duration.prototype, {
          _bubble: function() {
            var milliseconds = this._milliseconds, days = this._days, months = this._months, data = this._data, seconds, minutes, hours, years = 0;
            data.milliseconds = milliseconds % 1e3;
            seconds = absRound(milliseconds / 1e3);
            data.seconds = seconds % 60;
            minutes = absRound(seconds / 60);
            data.minutes = minutes % 60;
            hours = absRound(minutes / 60);
            data.hours = hours % 24;
            days += absRound(hours / 24);
            years = absRound(daysToYears(days));
            days -= absRound(yearsToDays(years));
            months += absRound(days / 30);
            days %= 30;
            years += absRound(months / 12);
            months %= 12;
            data.days = days;
            data.months = months;
            data.years = years;
          },
          abs: function() {
            this._milliseconds = Math.abs(this._milliseconds);
            this._days = Math.abs(this._days);
            this._months = Math.abs(this._months);
            this._data.milliseconds = Math.abs(this._data.milliseconds);
            this._data.seconds = Math.abs(this._data.seconds);
            this._data.minutes = Math.abs(this._data.minutes);
            this._data.hours = Math.abs(this._data.hours);
            this._data.months = Math.abs(this._data.months);
            this._data.years = Math.abs(this._data.years);
            return this;
          },
          weeks: function() {
            return absRound(this.days() / 7);
          },
          valueOf: function() {
            return this._milliseconds + this._days * 864e5 + this._months % 12 * 2592e6 + toInt(this._months / 12) * 31536e6;
          },
          humanize: function(withSuffix) {
            var output = relativeTime(this, !withSuffix, this.localeData());
            if (withSuffix) {
              output = this.localeData().pastFuture(+this, output);
            }
            return this.localeData().postformat(output);
          },
          add: function(input, val) {
            var dur = moment2.duration(input, val);
            this._milliseconds += dur._milliseconds;
            this._days += dur._days;
            this._months += dur._months;
            this._bubble();
            return this;
          },
          subtract: function(input, val) {
            var dur = moment2.duration(input, val);
            this._milliseconds -= dur._milliseconds;
            this._days -= dur._days;
            this._months -= dur._months;
            this._bubble();
            return this;
          },
          get: function(units) {
            units = normalizeUnits(units);
            return this[units.toLowerCase() + "s"]();
          },
          as: function(units) {
            var days, months;
            units = normalizeUnits(units);
            if (units === "month" || units === "year") {
              days = this._days + this._milliseconds / 864e5;
              months = this._months + daysToYears(days) * 12;
              return units === "month" ? months : months / 12;
            } else {
              days = this._days + Math.round(yearsToDays(this._months / 12));
              switch (units) {
                case "week":
                  return days / 7 + this._milliseconds / 6048e5;
                case "day":
                  return days + this._milliseconds / 864e5;
                case "hour":
                  return days * 24 + this._milliseconds / 36e5;
                case "minute":
                  return days * 24 * 60 + this._milliseconds / 6e4;
                case "second":
                  return days * 24 * 60 * 60 + this._milliseconds / 1e3;
                case "millisecond":
                  return Math.floor(days * 24 * 60 * 60 * 1e3) + this._milliseconds;
                default:
                  throw new Error("Unknown unit " + units);
              }
            }
          },
          lang: moment2.fn.lang,
          locale: moment2.fn.locale,
          toIsoString: deprecate("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", function() {
            return this.toISOString();
          }),
          toISOString: function() {
            var years = Math.abs(this.years()), months = Math.abs(this.months()), days = Math.abs(this.days()), hours = Math.abs(this.hours()), minutes = Math.abs(this.minutes()), seconds = Math.abs(this.seconds() + this.milliseconds() / 1e3);
            if (!this.asSeconds()) {
              return "P0D";
            }
            return (this.asSeconds() < 0 ? "-" : "") + "P" + (years ? years + "Y" : "") + (months ? months + "M" : "") + (days ? days + "D" : "") + (hours || minutes || seconds ? "T" : "") + (hours ? hours + "H" : "") + (minutes ? minutes + "M" : "") + (seconds ? seconds + "S" : "");
          },
          localeData: function() {
            return this._locale;
          }
        });
        moment2.duration.fn.toString = moment2.duration.fn.toISOString;
        function makeDurationGetter(name) {
          moment2.duration.fn[name] = function() {
            return this._data[name];
          };
        }
        for (i in unitMillisecondFactors) {
          if (hasOwnProp(unitMillisecondFactors, i)) {
            makeDurationGetter(i.toLowerCase());
          }
        }
        moment2.duration.fn.asMilliseconds = function() {
          return this.as("ms");
        };
        moment2.duration.fn.asSeconds = function() {
          return this.as("s");
        };
        moment2.duration.fn.asMinutes = function() {
          return this.as("m");
        };
        moment2.duration.fn.asHours = function() {
          return this.as("h");
        };
        moment2.duration.fn.asDays = function() {
          return this.as("d");
        };
        moment2.duration.fn.asWeeks = function() {
          return this.as("weeks");
        };
        moment2.duration.fn.asMonths = function() {
          return this.as("M");
        };
        moment2.duration.fn.asYears = function() {
          return this.as("y");
        };
        moment2.locale("en", {
          ordinalParse: /\d{1,2}(th|st|nd|rd)/,
          ordinal: function(number) {
            var b = number % 10, output = toInt(number % 100 / 10) === 1 ? "th" : b === 1 ? "st" : b === 2 ? "nd" : b === 3 ? "rd" : "th";
            return number + output;
          }
        });
        function makeGlobal(shouldDeprecate) {
          if (typeof ender !== "undefined") {
            return;
          }
          oldGlobalMoment = globalScope.moment;
          if (shouldDeprecate) {
            globalScope.moment = deprecate("Accessing Moment through the global scope is deprecated, and will be removed in an upcoming release.", moment2);
          } else {
            globalScope.moment = moment2;
          }
        }
        if (hasModule) {
          module.exports = moment2;
        } else if (typeof define === "function" && define.amd) {
          define("moment", function(require2, exports2, module2) {
            if (module2.config && module2.config() && module2.config().noGlobal === true) {
              globalScope.moment = oldGlobalMoment;
            }
            return moment2;
          });
          makeGlobal(true);
        } else {
          makeGlobal();
        }
      }).call(exports);
    }
  });

  // node_modules/bootstrap-datetimepicker-npm/src/js/bootstrap-datetimepicker.js
  var require_bootstrap_datetimepicker = __commonJS({
    "node_modules/bootstrap-datetimepicker-npm/src/js/bootstrap-datetimepicker.js"(exports, module) {
      module.exports = function($5) {
        "use strict";
        var moment2 = require_moment2();
        var dateTimePicker = function(element, options) {
          var picker = {}, date, viewDate, unset = true, input, component = false, widget = false, use24Hours, minViewModeNumber = 0, actualFormat, parseFormats, currentViewMode, datePickerModes = [
            {
              clsName: "days",
              navFnc: "M",
              navStep: 1
            },
            {
              clsName: "months",
              navFnc: "y",
              navStep: 1
            },
            {
              clsName: "years",
              navFnc: "y",
              navStep: 10
            },
            {
              clsName: "decades",
              navFnc: "y",
              navStep: 100
            }
          ], viewModes = ["days", "months", "years", "decades"], verticalModes = ["top", "bottom", "auto"], horizontalModes = ["left", "right", "auto"], toolbarPlacements = ["default", "top", "bottom"], keyMap = {
            "up": 38,
            38: "up",
            "down": 40,
            40: "down",
            "left": 37,
            37: "left",
            "right": 39,
            39: "right",
            "tab": 9,
            9: "tab",
            "escape": 27,
            27: "escape",
            "enter": 13,
            13: "enter",
            "pageUp": 33,
            33: "pageUp",
            "pageDown": 34,
            34: "pageDown",
            "shift": 16,
            16: "shift",
            "control": 17,
            17: "control",
            "space": 32,
            32: "space",
            "t": 84,
            84: "t",
            "delete": 46,
            46: "delete"
          }, keyState = {}, getMoment = function(d) {
            var tzEnabled = false, returnMoment, currentZoneOffset, incomingZoneOffset, timeZoneIndicator, dateWithTimeZoneInfo;
            if (moment2.tz !== void 0 && options.timeZone !== void 0 && options.timeZone !== null && options.timeZone !== "") {
              tzEnabled = true;
            }
            if (d === void 0 || d === null) {
              if (tzEnabled) {
                returnMoment = moment2().tz(options.timeZone).startOf("d");
              } else {
                returnMoment = moment2().startOf("d");
              }
            } else {
              if (tzEnabled) {
                currentZoneOffset = moment2().tz(options.timeZone).utcOffset();
                incomingZoneOffset = moment2(d, parseFormats, options.useStrict).utcOffset();
                if (incomingZoneOffset !== currentZoneOffset) {
                  timeZoneIndicator = moment2().tz(options.timeZone).format("Z");
                  dateWithTimeZoneInfo = moment2(d, parseFormats, options.useStrict).format("YYYY-MM-DD[T]HH:mm:ss") + timeZoneIndicator;
                  returnMoment = moment2(dateWithTimeZoneInfo, parseFormats, options.useStrict).tz(options.timeZone);
                } else {
                  returnMoment = moment2(d, parseFormats, options.useStrict).tz(options.timeZone);
                }
              } else {
                returnMoment = moment2(d, parseFormats, options.useStrict);
              }
            }
            return returnMoment;
          }, isEnabled = function(granularity) {
            if (typeof granularity !== "string" || granularity.length > 1) {
              throw new TypeError("isEnabled expects a single character string parameter");
            }
            switch (granularity) {
              case "y":
                return actualFormat.indexOf("Y") !== -1;
              case "M":
                return actualFormat.indexOf("M") !== -1;
              case "d":
                return actualFormat.toLowerCase().indexOf("d") !== -1;
              case "h":
              case "H":
                return actualFormat.toLowerCase().indexOf("h") !== -1;
              case "m":
                return actualFormat.indexOf("m") !== -1;
              case "s":
                return actualFormat.indexOf("s") !== -1;
              default:
                return false;
            }
          }, hasTime = function() {
            return isEnabled("h") || isEnabled("m") || isEnabled("s");
          }, hasDate = function() {
            return isEnabled("y") || isEnabled("M") || isEnabled("d");
          }, getDatePickerTemplate = function() {
            var headTemplate = $5("<thead>").append($5("<tr>").append($5("<th>").addClass("prev").attr("data-action", "previous").append($5("<span>").addClass(options.icons.previous))).append($5("<th>").addClass("picker-switch").attr("data-action", "pickerSwitch").attr("colspan", options.calendarWeeks ? "6" : "5")).append($5("<th>").addClass("next").attr("data-action", "next").append($5("<span>").addClass(options.icons.next)))), contTemplate = $5("<tbody>").append($5("<tr>").append($5("<td>").attr("colspan", options.calendarWeeks ? "8" : "7")));
            return [
              $5("<div>").addClass("datepicker-days").append($5("<table>").addClass("table-condensed").append(headTemplate).append($5("<tbody>"))),
              $5("<div>").addClass("datepicker-months").append($5("<table>").addClass("table-condensed").append(headTemplate.clone()).append(contTemplate.clone())),
              $5("<div>").addClass("datepicker-years").append($5("<table>").addClass("table-condensed").append(headTemplate.clone()).append(contTemplate.clone())),
              $5("<div>").addClass("datepicker-decades").append($5("<table>").addClass("table-condensed").append(headTemplate.clone()).append(contTemplate.clone()))
            ];
          }, getTimePickerMainTemplate = function() {
            var topRow = $5("<tr>"), middleRow = $5("<tr>"), bottomRow = $5("<tr>");
            if (isEnabled("h")) {
              topRow.append($5("<td>").append($5("<a>").attr({ href: "#", tabindex: "-1", "title": options.tooltips.incrementHour }).addClass("btn").attr("data-action", "incrementHours").append($5("<span>").addClass(options.icons.up))));
              middleRow.append($5("<td>").append($5("<span>").addClass("timepicker-hour").attr({ "data-time-component": "hours", "title": options.tooltips.pickHour }).attr("data-action", "showHours")));
              bottomRow.append($5("<td>").append($5("<a>").attr({ href: "#", tabindex: "-1", "title": options.tooltips.decrementHour }).addClass("btn").attr("data-action", "decrementHours").append($5("<span>").addClass(options.icons.down))));
            }
            if (isEnabled("m")) {
              if (isEnabled("h")) {
                topRow.append($5("<td>").addClass("separator"));
                middleRow.append($5("<td>").addClass("separator").html(":"));
                bottomRow.append($5("<td>").addClass("separator"));
              }
              topRow.append($5("<td>").append($5("<a>").attr({ href: "#", tabindex: "-1", "title": options.tooltips.incrementMinute }).addClass("btn").attr("data-action", "incrementMinutes").append($5("<span>").addClass(options.icons.up))));
              middleRow.append($5("<td>").append($5("<span>").addClass("timepicker-minute").attr({ "data-time-component": "minutes", "title": options.tooltips.pickMinute }).attr("data-action", "showMinutes")));
              bottomRow.append($5("<td>").append($5("<a>").attr({ href: "#", tabindex: "-1", "title": options.tooltips.decrementMinute }).addClass("btn").attr("data-action", "decrementMinutes").append($5("<span>").addClass(options.icons.down))));
            }
            if (isEnabled("s")) {
              if (isEnabled("m")) {
                topRow.append($5("<td>").addClass("separator"));
                middleRow.append($5("<td>").addClass("separator").html(":"));
                bottomRow.append($5("<td>").addClass("separator"));
              }
              topRow.append($5("<td>").append($5("<a>").attr({ href: "#", tabindex: "-1", "title": options.tooltips.incrementSecond }).addClass("btn").attr("data-action", "incrementSeconds").append($5("<span>").addClass(options.icons.up))));
              middleRow.append($5("<td>").append($5("<span>").addClass("timepicker-second").attr({ "data-time-component": "seconds", "title": options.tooltips.pickSecond }).attr("data-action", "showSeconds")));
              bottomRow.append($5("<td>").append($5("<a>").attr({ href: "#", tabindex: "-1", "title": options.tooltips.decrementSecond }).addClass("btn").attr("data-action", "decrementSeconds").append($5("<span>").addClass(options.icons.down))));
            }
            if (!use24Hours) {
              topRow.append($5("<td>").addClass("separator"));
              middleRow.append($5("<td>").append($5("<button>").addClass("btn btn-primary").attr({ "data-action": "togglePeriod", tabindex: "-1", "title": options.tooltips.togglePeriod })));
              bottomRow.append($5("<td>").addClass("separator"));
            }
            return $5("<div>").addClass("timepicker-picker").append($5("<table>").addClass("table-condensed").append([topRow, middleRow, bottomRow]));
          }, getTimePickerTemplate = function() {
            var hoursView = $5("<div>").addClass("timepicker-hours").append($5("<table>").addClass("table-condensed")), minutesView = $5("<div>").addClass("timepicker-minutes").append($5("<table>").addClass("table-condensed")), secondsView = $5("<div>").addClass("timepicker-seconds").append($5("<table>").addClass("table-condensed")), ret = [getTimePickerMainTemplate()];
            if (isEnabled("h")) {
              ret.push(hoursView);
            }
            if (isEnabled("m")) {
              ret.push(minutesView);
            }
            if (isEnabled("s")) {
              ret.push(secondsView);
            }
            return ret;
          }, getToolbar = function() {
            var row = [];
            if (options.showTodayButton) {
              row.push($5("<td>").append($5("<a>").attr({ "data-action": "today", "title": options.tooltips.today }).append($5("<span>").addClass(options.icons.today))));
            }
            if (!options.sideBySide && hasDate() && hasTime()) {
              row.push($5("<td>").append($5("<a>").attr({ "data-action": "togglePicker", "title": options.tooltips.selectTime }).append($5("<span>").addClass(options.icons.time))));
            }
            if (options.showClear) {
              row.push($5("<td>").append($5("<a>").attr({ "data-action": "clear", "title": options.tooltips.clear }).append($5("<span>").addClass(options.icons.clear))));
            }
            if (options.showClose) {
              row.push($5("<td>").append($5("<a>").attr({ "data-action": "close", "title": options.tooltips.close }).append($5("<span>").addClass(options.icons.close))));
            }
            return $5("<table>").addClass("table-condensed").append($5("<tbody>").append($5("<tr>").append(row)));
          }, getTemplate = function() {
            var template = $5("<div>").addClass("bootstrap-datetimepicker-widget dropdown-menu"), dateView = $5("<div>").addClass("datepicker").append(getDatePickerTemplate()), timeView = $5("<div>").addClass("timepicker").append(getTimePickerTemplate()), content = $5("<ul>").addClass("list-unstyled"), toolbar = $5("<li>").addClass("picker-switch" + (options.collapse ? " accordion-toggle" : "")).append(getToolbar());
            if (options.inline) {
              template.removeClass("dropdown-menu");
            }
            if (use24Hours) {
              template.addClass("usetwentyfour");
            }
            if (isEnabled("s") && !use24Hours) {
              template.addClass("wider");
            }
            if (options.sideBySide && hasDate() && hasTime()) {
              template.addClass("timepicker-sbs");
              if (options.toolbarPlacement === "top") {
                template.append(toolbar);
              }
              template.append($5("<div>").addClass("row").append(dateView.addClass("col-md-6")).append(timeView.addClass("col-md-6")));
              if (options.toolbarPlacement === "bottom") {
                template.append(toolbar);
              }
              return template;
            }
            if (options.toolbarPlacement === "top") {
              content.append(toolbar);
            }
            if (hasDate()) {
              content.append($5("<li>").addClass(options.collapse && hasTime() ? "collapse in" : "").append(dateView));
            }
            if (options.toolbarPlacement === "default") {
              content.append(toolbar);
            }
            if (hasTime()) {
              content.append($5("<li>").addClass(options.collapse && hasDate() ? "collapse" : "").append(timeView));
            }
            if (options.toolbarPlacement === "bottom") {
              content.append(toolbar);
            }
            return template.append(content);
          }, dataToOptions = function() {
            var eData, dataOptions = {};
            if (element.is("input") || options.inline) {
              eData = element.data();
            } else {
              eData = element.find("input").data();
            }
            if (eData.dateOptions && eData.dateOptions instanceof Object) {
              dataOptions = $5.extend(true, dataOptions, eData.dateOptions);
            }
            $5.each(options, function(key) {
              var attributeName = "date" + key.charAt(0).toUpperCase() + key.slice(1);
              if (eData[attributeName] !== void 0) {
                dataOptions[key] = eData[attributeName];
              }
            });
            return dataOptions;
          }, place = function() {
            var position = (component || element).position(), offset = (component || element).offset(), vertical = options.widgetPositioning.vertical, horizontal = options.widgetPositioning.horizontal, parent;
            if (options.widgetParent) {
              parent = options.widgetParent.append(widget);
            } else if (element.is("input")) {
              parent = element.after(widget).parent();
            } else if (options.inline) {
              parent = element.append(widget);
              return;
            } else {
              parent = element;
              element.children().first().after(widget);
            }
            if (vertical === "auto") {
              if (offset.top + widget.height() * 1.5 >= $5(window).height() + $5(window).scrollTop() && widget.height() + element.outerHeight() < offset.top) {
                vertical = "top";
              } else {
                vertical = "bottom";
              }
            }
            if (horizontal === "auto") {
              if (parent.width() < offset.left + widget.outerWidth() / 2 && offset.left + widget.outerWidth() > $5(window).width()) {
                horizontal = "right";
              } else {
                horizontal = "left";
              }
            }
            if (vertical === "top") {
              widget.addClass("top").removeClass("bottom");
            } else {
              widget.addClass("bottom").removeClass("top");
            }
            if (horizontal === "right") {
              widget.addClass("pull-right");
            } else {
              widget.removeClass("pull-right");
            }
            if (parent.css("position") !== "relative") {
              parent = parent.parents().filter(function() {
                return $5(this).css("position") === "relative";
              }).first();
            }
            if (parent.length === 0) {
              throw new Error("datetimepicker component should be placed within a relative positioned container");
            }
            widget.css({
              top: vertical === "top" ? "auto" : position.top + element.outerHeight(),
              bottom: vertical === "top" ? position.top + element.outerHeight() : "auto",
              left: horizontal === "left" ? parent === element ? 0 : position.left : "auto",
              right: horizontal === "left" ? "auto" : parent.outerWidth() - element.outerWidth() - (parent === element ? 0 : position.left)
            });
          }, notifyEvent = function(e) {
            if (e.type === "dp.change" && (e.date && e.date.isSame(e.oldDate) || !e.date && !e.oldDate)) {
              return;
            }
            element.trigger(e);
          }, viewUpdate = function(e) {
            if (e === "y") {
              e = "YYYY";
            }
            notifyEvent({
              type: "dp.update",
              change: e,
              viewDate: viewDate.clone()
            });
          }, showMode = function(dir) {
            if (!widget) {
              return;
            }
            if (dir) {
              currentViewMode = Math.max(minViewModeNumber, Math.min(3, currentViewMode + dir));
            }
            widget.find(".datepicker > div").hide().filter(".datepicker-" + datePickerModes[currentViewMode].clsName).show();
          }, fillDow = function() {
            var row = $5("<tr>"), currentDate = viewDate.clone().startOf("w").startOf("d");
            if (options.calendarWeeks === true) {
              row.append($5("<th>").addClass("cw").text("#"));
            }
            while (currentDate.isBefore(viewDate.clone().endOf("w"))) {
              row.append($5("<th>").addClass("dow").text(currentDate.format("dd")));
              currentDate.add(1, "d");
            }
            widget.find(".datepicker-days thead").append(row);
          }, isInDisabledDates = function(testDate) {
            return options.disabledDates[testDate.format("YYYY-MM-DD")] === true;
          }, isInEnabledDates = function(testDate) {
            return options.enabledDates[testDate.format("YYYY-MM-DD")] === true;
          }, isInDisabledHours = function(testDate) {
            return options.disabledHours[testDate.format("H")] === true;
          }, isInEnabledHours = function(testDate) {
            return options.enabledHours[testDate.format("H")] === true;
          }, isValid = function(targetMoment, granularity) {
            if (!targetMoment.isValid()) {
              return false;
            }
            if (options.disabledDates && granularity === "d" && isInDisabledDates(targetMoment)) {
              return false;
            }
            if (options.enabledDates && granularity === "d" && !isInEnabledDates(targetMoment)) {
              return false;
            }
            if (options.minDate && targetMoment.isBefore(options.minDate, granularity)) {
              return false;
            }
            if (options.maxDate && targetMoment.isAfter(options.maxDate, granularity)) {
              return false;
            }
            if (options.daysOfWeekDisabled && granularity === "d" && options.daysOfWeekDisabled.indexOf(targetMoment.day()) !== -1) {
              return false;
            }
            if (options.disabledHours && (granularity === "h" || granularity === "m" || granularity === "s") && isInDisabledHours(targetMoment)) {
              return false;
            }
            if (options.enabledHours && (granularity === "h" || granularity === "m" || granularity === "s") && !isInEnabledHours(targetMoment)) {
              return false;
            }
            if (options.disabledTimeIntervals && (granularity === "h" || granularity === "m" || granularity === "s")) {
              var found = false;
              $5.each(options.disabledTimeIntervals, function() {
                if (targetMoment.isBetween(this[0], this[1])) {
                  found = true;
                  return false;
                }
              });
              if (found) {
                return false;
              }
            }
            return true;
          }, fillMonths = function() {
            var spans = [], monthsShort = viewDate.clone().startOf("y").startOf("d");
            while (monthsShort.isSame(viewDate, "y")) {
              spans.push($5("<span>").attr("data-action", "selectMonth").addClass("month").text(monthsShort.format("MMM")));
              monthsShort.add(1, "M");
            }
            widget.find(".datepicker-months td").empty().append(spans);
          }, updateMonths = function() {
            var monthsView = widget.find(".datepicker-months"), monthsViewHeader = monthsView.find("th"), months = monthsView.find("tbody").find("span");
            monthsViewHeader.eq(0).find("span").attr("title", options.tooltips.prevYear);
            monthsViewHeader.eq(1).attr("title", options.tooltips.selectYear);
            monthsViewHeader.eq(2).find("span").attr("title", options.tooltips.nextYear);
            monthsView.find(".disabled").removeClass("disabled");
            if (!isValid(viewDate.clone().subtract(1, "y"), "y")) {
              monthsViewHeader.eq(0).addClass("disabled");
            }
            monthsViewHeader.eq(1).text(viewDate.year());
            if (!isValid(viewDate.clone().add(1, "y"), "y")) {
              monthsViewHeader.eq(2).addClass("disabled");
            }
            months.removeClass("active");
            if (date.isSame(viewDate, "y") && !unset) {
              months.eq(date.month()).addClass("active");
            }
            months.each(function(index) {
              if (!isValid(viewDate.clone().month(index), "M")) {
                $5(this).addClass("disabled");
              }
            });
          }, updateYears = function() {
            var yearsView = widget.find(".datepicker-years"), yearsViewHeader = yearsView.find("th"), startYear = viewDate.clone().subtract(5, "y"), endYear = viewDate.clone().add(6, "y"), html = "";
            yearsViewHeader.eq(0).find("span").attr("title", options.tooltips.prevDecade);
            yearsViewHeader.eq(1).attr("title", options.tooltips.selectDecade);
            yearsViewHeader.eq(2).find("span").attr("title", options.tooltips.nextDecade);
            yearsView.find(".disabled").removeClass("disabled");
            if (options.minDate && options.minDate.isAfter(startYear, "y")) {
              yearsViewHeader.eq(0).addClass("disabled");
            }
            yearsViewHeader.eq(1).text(startYear.year() + "-" + endYear.year());
            if (options.maxDate && options.maxDate.isBefore(endYear, "y")) {
              yearsViewHeader.eq(2).addClass("disabled");
            }
            while (!startYear.isAfter(endYear, "y")) {
              html += '<span data-action="selectYear" class="year' + (startYear.isSame(date, "y") && !unset ? " active" : "") + (!isValid(startYear, "y") ? " disabled" : "") + '">' + startYear.year() + "</span>";
              startYear.add(1, "y");
            }
            yearsView.find("td").html(html);
          }, updateDecades = function() {
            var decadesView = widget.find(".datepicker-decades"), decadesViewHeader = decadesView.find("th"), startDecade = moment2({ y: viewDate.year() - viewDate.year() % 100 - 1 }), endDecade = startDecade.clone().add(100, "y"), startedAt = startDecade.clone(), html = "";
            decadesViewHeader.eq(0).find("span").attr("title", options.tooltips.prevCentury);
            decadesViewHeader.eq(2).find("span").attr("title", options.tooltips.nextCentury);
            decadesView.find(".disabled").removeClass("disabled");
            if (startDecade.isSame(moment2({ y: 1900 })) || options.minDate && options.minDate.isAfter(startDecade, "y")) {
              decadesViewHeader.eq(0).addClass("disabled");
            }
            decadesViewHeader.eq(1).text(startDecade.year() + "-" + endDecade.year());
            if (startDecade.isSame(moment2({ y: 2e3 })) || options.maxDate && options.maxDate.isBefore(endDecade, "y")) {
              decadesViewHeader.eq(2).addClass("disabled");
            }
            while (!startDecade.isAfter(endDecade, "y")) {
              html += '<span data-action="selectDecade" class="decade' + (startDecade.isSame(date, "y") ? " active" : "") + (!isValid(startDecade, "y") ? " disabled" : "") + '" data-selection="' + (startDecade.year() + 6) + '">' + (startDecade.year() + 1) + " - " + (startDecade.year() + 12) + "</span>";
              startDecade.add(12, "y");
            }
            html += "<span></span><span></span><span></span>";
            decadesView.find("td").html(html);
            decadesViewHeader.eq(1).text(startedAt.year() + 1 + "-" + startDecade.year());
          }, fillDate = function() {
            var daysView = widget.find(".datepicker-days"), daysViewHeader = daysView.find("th"), currentDate, html = [], row, clsName, i;
            if (!hasDate()) {
              return;
            }
            daysViewHeader.eq(0).find("span").attr("title", options.tooltips.prevMonth);
            daysViewHeader.eq(1).attr("title", options.tooltips.selectMonth);
            daysViewHeader.eq(2).find("span").attr("title", options.tooltips.nextMonth);
            daysView.find(".disabled").removeClass("disabled");
            daysViewHeader.eq(1).text(viewDate.format(options.dayViewHeaderFormat));
            if (!isValid(viewDate.clone().subtract(1, "M"), "M")) {
              daysViewHeader.eq(0).addClass("disabled");
            }
            if (!isValid(viewDate.clone().add(1, "M"), "M")) {
              daysViewHeader.eq(2).addClass("disabled");
            }
            currentDate = viewDate.clone().startOf("M").startOf("w").startOf("d");
            for (i = 0; i < 42; i++) {
              if (currentDate.weekday() === 0) {
                row = $5("<tr>");
                if (options.calendarWeeks) {
                  row.append('<td class="cw">' + currentDate.week() + "</td>");
                }
                html.push(row);
              }
              clsName = "";
              if (currentDate.isBefore(viewDate, "M")) {
                clsName += " old";
              }
              if (currentDate.isAfter(viewDate, "M")) {
                clsName += " new";
              }
              if (currentDate.isSame(date, "d") && !unset) {
                clsName += " active";
              }
              if (!isValid(currentDate, "d")) {
                clsName += " disabled";
              }
              if (currentDate.isSame(getMoment(), "d")) {
                clsName += " today";
              }
              if (currentDate.day() === 0 || currentDate.day() === 6) {
                clsName += " weekend";
              }
              row.append('<td data-action="selectDay" data-day="' + currentDate.format("L") + '" class="day' + clsName + '">' + currentDate.date() + "</td>");
              currentDate.add(1, "d");
            }
            daysView.find("tbody").empty().append(html);
            updateMonths();
            updateYears();
            updateDecades();
          }, fillHours = function() {
            var table = widget.find(".timepicker-hours table"), currentHour = viewDate.clone().startOf("d"), html = [], row = $5("<tr>");
            if (viewDate.hour() > 11 && !use24Hours) {
              currentHour.hour(12);
            }
            while (currentHour.isSame(viewDate, "d") && (use24Hours || viewDate.hour() < 12 && currentHour.hour() < 12 || viewDate.hour() > 11)) {
              if (currentHour.hour() % 4 === 0) {
                row = $5("<tr>");
                html.push(row);
              }
              row.append('<td data-action="selectHour" class="hour' + (!isValid(currentHour, "h") ? " disabled" : "") + '">' + currentHour.format(use24Hours ? "HH" : "hh") + "</td>");
              currentHour.add(1, "h");
            }
            table.empty().append(html);
          }, fillMinutes = function() {
            var table = widget.find(".timepicker-minutes table"), currentMinute = viewDate.clone().startOf("h"), html = [], row = $5("<tr>"), step = options.stepping === 1 ? 5 : options.stepping;
            while (viewDate.isSame(currentMinute, "h")) {
              if (currentMinute.minute() % (step * 4) === 0) {
                row = $5("<tr>");
                html.push(row);
              }
              row.append('<td data-action="selectMinute" class="minute' + (!isValid(currentMinute, "m") ? " disabled" : "") + '">' + currentMinute.format("mm") + "</td>");
              currentMinute.add(step, "m");
            }
            table.empty().append(html);
          }, fillSeconds = function() {
            var table = widget.find(".timepicker-seconds table"), currentSecond = viewDate.clone().startOf("m"), html = [], row = $5("<tr>");
            while (viewDate.isSame(currentSecond, "m")) {
              if (currentSecond.second() % 20 === 0) {
                row = $5("<tr>");
                html.push(row);
              }
              row.append('<td data-action="selectSecond" class="second' + (!isValid(currentSecond, "s") ? " disabled" : "") + '">' + currentSecond.format("ss") + "</td>");
              currentSecond.add(5, "s");
            }
            table.empty().append(html);
          }, fillTime = function() {
            var toggle2, newDate, timeComponents = widget.find(".timepicker span[data-time-component]");
            if (!use24Hours) {
              toggle2 = widget.find(".timepicker [data-action=togglePeriod]");
              newDate = date.clone().add(date.hours() >= 12 ? -12 : 12, "h");
              toggle2.text(date.format("A"));
              if (isValid(newDate, "h")) {
                toggle2.removeClass("disabled");
              } else {
                toggle2.addClass("disabled");
              }
            }
            timeComponents.filter("[data-time-component=hours]").text(date.format(use24Hours ? "HH" : "hh"));
            timeComponents.filter("[data-time-component=minutes]").text(date.format("mm"));
            timeComponents.filter("[data-time-component=seconds]").text(date.format("ss"));
            fillHours();
            fillMinutes();
            fillSeconds();
          }, update = function() {
            if (!widget) {
              return;
            }
            fillDate();
            fillTime();
          }, setValue = function(targetMoment) {
            var oldDate = unset ? null : date;
            if (!targetMoment) {
              unset = true;
              input.val("");
              element.data("date", "");
              notifyEvent({
                type: "dp.change",
                date: false,
                oldDate
              });
              update();
              return;
            }
            targetMoment = targetMoment.clone().locale(options.locale);
            if (options.stepping !== 1) {
              targetMoment.minutes(Math.round(targetMoment.minutes() / options.stepping) * options.stepping % 60).seconds(0);
            }
            if (isValid(targetMoment)) {
              date = targetMoment;
              viewDate = date.clone();
              input.val(date.format(actualFormat));
              element.data("date", date.format(actualFormat));
              unset = false;
              update();
              notifyEvent({
                type: "dp.change",
                date: date.clone(),
                oldDate
              });
            } else {
              if (!options.keepInvalid) {
                input.val(unset ? "" : date.format(actualFormat));
              }
              notifyEvent({
                type: "dp.error",
                date: targetMoment
              });
            }
          }, hide = function() {
            var transitioning = false;
            if (!widget) {
              return picker;
            }
            widget.find(".collapse").each(function() {
              var collapseData = $5(this).data("collapse");
              if (collapseData && collapseData.transitioning) {
                transitioning = true;
                return false;
              }
              return true;
            });
            if (transitioning) {
              return picker;
            }
            if (component && component.hasClass("btn")) {
              component.toggleClass("active");
            }
            widget.hide();
            $5(window).off("resize", place);
            widget.off("click", "[data-action]");
            widget.off("mousedown", false);
            widget.remove();
            widget = false;
            notifyEvent({
              type: "dp.hide",
              date: date.clone()
            });
            input.blur();
            return picker;
          }, clear = function() {
            setValue(null);
          }, actions = {
            next: function() {
              var navFnc = datePickerModes[currentViewMode].navFnc;
              viewDate.add(datePickerModes[currentViewMode].navStep, navFnc);
              fillDate();
              viewUpdate(navFnc);
            },
            previous: function() {
              var navFnc = datePickerModes[currentViewMode].navFnc;
              viewDate.subtract(datePickerModes[currentViewMode].navStep, navFnc);
              fillDate();
              viewUpdate(navFnc);
            },
            pickerSwitch: function() {
              showMode(1);
            },
            selectMonth: function(e) {
              var month = $5(e.target).closest("tbody").find("span").index($5(e.target));
              viewDate.month(month);
              if (currentViewMode === minViewModeNumber) {
                setValue(date.clone().year(viewDate.year()).month(viewDate.month()));
                if (!options.inline) {
                  hide();
                }
              } else {
                showMode(-1);
                fillDate();
              }
              viewUpdate("M");
            },
            selectYear: function(e) {
              var year = parseInt($5(e.target).text(), 10) || 0;
              viewDate.year(year);
              if (currentViewMode === minViewModeNumber) {
                setValue(date.clone().year(viewDate.year()));
                if (!options.inline) {
                  hide();
                }
              } else {
                showMode(-1);
                fillDate();
              }
              viewUpdate("YYYY");
            },
            selectDecade: function(e) {
              var year = parseInt($5(e.target).data("selection"), 10) || 0;
              viewDate.year(year);
              if (currentViewMode === minViewModeNumber) {
                setValue(date.clone().year(viewDate.year()));
                if (!options.inline) {
                  hide();
                }
              } else {
                showMode(-1);
                fillDate();
              }
              viewUpdate("YYYY");
            },
            selectDay: function(e) {
              var day = viewDate.clone();
              if ($5(e.target).is(".old")) {
                day.subtract(1, "M");
              }
              if ($5(e.target).is(".new")) {
                day.add(1, "M");
              }
              setValue(day.date(parseInt($5(e.target).text(), 10)));
              if (!hasTime() && !options.keepOpen && !options.inline) {
                hide();
              }
            },
            incrementHours: function() {
              var newDate = date.clone().add(1, "h");
              if (isValid(newDate, "h")) {
                setValue(newDate);
              }
            },
            incrementMinutes: function() {
              var newDate = date.clone().add(options.stepping, "m");
              if (isValid(newDate, "m")) {
                setValue(newDate);
              }
            },
            incrementSeconds: function() {
              var newDate = date.clone().add(1, "s");
              if (isValid(newDate, "s")) {
                setValue(newDate);
              }
            },
            decrementHours: function() {
              var newDate = date.clone().subtract(1, "h");
              if (isValid(newDate, "h")) {
                setValue(newDate);
              }
            },
            decrementMinutes: function() {
              var newDate = date.clone().subtract(options.stepping, "m");
              if (isValid(newDate, "m")) {
                setValue(newDate);
              }
            },
            decrementSeconds: function() {
              var newDate = date.clone().subtract(1, "s");
              if (isValid(newDate, "s")) {
                setValue(newDate);
              }
            },
            togglePeriod: function() {
              setValue(date.clone().add(date.hours() >= 12 ? -12 : 12, "h"));
            },
            togglePicker: function(e) {
              var $this = $5(e.target), $parent = $this.closest("ul"), expanded = $parent.find(".in"), closed = $parent.find(".collapse:not(.in)"), collapseData;
              if (expanded && expanded.length) {
                collapseData = expanded.data("collapse");
                if (collapseData && collapseData.transitioning) {
                  return;
                }
                if (expanded.collapse) {
                  expanded.collapse("hide");
                  closed.collapse("show");
                } else {
                  expanded.removeClass("in");
                  closed.addClass("in");
                }
                if ($this.is("span")) {
                  $this.toggleClass(options.icons.time + " " + options.icons.date);
                } else {
                  $this.find("span").toggleClass(options.icons.time + " " + options.icons.date);
                }
              }
            },
            showPicker: function() {
              widget.find(".timepicker > div:not(.timepicker-picker)").hide();
              widget.find(".timepicker .timepicker-picker").show();
            },
            showHours: function() {
              widget.find(".timepicker .timepicker-picker").hide();
              widget.find(".timepicker .timepicker-hours").show();
            },
            showMinutes: function() {
              widget.find(".timepicker .timepicker-picker").hide();
              widget.find(".timepicker .timepicker-minutes").show();
            },
            showSeconds: function() {
              widget.find(".timepicker .timepicker-picker").hide();
              widget.find(".timepicker .timepicker-seconds").show();
            },
            selectHour: function(e) {
              var hour = parseInt($5(e.target).text(), 10);
              if (!use24Hours) {
                if (date.hours() >= 12) {
                  if (hour !== 12) {
                    hour += 12;
                  }
                } else {
                  if (hour === 12) {
                    hour = 0;
                  }
                }
              }
              setValue(date.clone().hours(hour));
              actions.showPicker.call(picker);
            },
            selectMinute: function(e) {
              setValue(date.clone().minutes(parseInt($5(e.target).text(), 10)));
              actions.showPicker.call(picker);
            },
            selectSecond: function(e) {
              setValue(date.clone().seconds(parseInt($5(e.target).text(), 10)));
              actions.showPicker.call(picker);
            },
            clear,
            today: function() {
              var todaysDate = getMoment();
              if (isValid(todaysDate, "d")) {
                setValue(todaysDate);
              }
            },
            close: hide
          }, doAction = function(e) {
            if ($5(e.currentTarget).is(".disabled")) {
              return false;
            }
            actions[$5(e.currentTarget).data("action")].apply(picker, arguments);
            return false;
          }, show = function() {
            var currentMoment, useCurrentGranularity = {
              "year": function(m) {
                return m.month(0).date(1).hours(0).seconds(0).minutes(0);
              },
              "month": function(m) {
                return m.date(1).hours(0).seconds(0).minutes(0);
              },
              "day": function(m) {
                return m.hours(0).seconds(0).minutes(0);
              },
              "hour": function(m) {
                return m.seconds(0).minutes(0);
              },
              "minute": function(m) {
                return m.seconds(0);
              }
            };
            if (input.prop("disabled") || !options.ignoreReadonly && input.prop("readonly") || widget) {
              return picker;
            }
            if (input.val() !== void 0 && input.val().trim().length !== 0) {
              setValue(parseInputDate(input.val().trim()));
            } else if (options.useCurrent && unset && (input.is("input") && input.val().trim().length === 0 || options.inline)) {
              currentMoment = getMoment();
              if (typeof options.useCurrent === "string") {
                currentMoment = useCurrentGranularity[options.useCurrent](currentMoment);
              }
              setValue(currentMoment);
            }
            widget = getTemplate();
            fillDow();
            fillMonths();
            widget.find(".timepicker-hours").hide();
            widget.find(".timepicker-minutes").hide();
            widget.find(".timepicker-seconds").hide();
            update();
            showMode();
            $5(window).on("resize", place);
            widget.on("click", "[data-action]", doAction);
            widget.on("mousedown", false);
            if (component && component.hasClass("btn")) {
              component.toggleClass("active");
            }
            widget.show();
            place();
            if (options.focusOnShow && !input.is(":focus")) {
              input.focus();
            }
            notifyEvent({
              type: "dp.show"
            });
            return picker;
          }, toggle = function() {
            return widget ? hide() : show();
          }, parseInputDate = function(inputDate) {
            if (options.parseInputDate === void 0) {
              if (moment2.isMoment(inputDate) || inputDate instanceof Date) {
                inputDate = moment2(inputDate);
              } else {
                inputDate = getMoment(inputDate);
              }
            } else {
              inputDate = options.parseInputDate(inputDate);
            }
            inputDate.locale(options.locale);
            return inputDate;
          }, keydown = function(e) {
            var handler = null, index, index2, pressedKeys = [], pressedModifiers = {}, currentKey = e.which, keyBindKeys, allModifiersPressed, pressed = "p";
            keyState[currentKey] = pressed;
            for (index in keyState) {
              if (keyState.hasOwnProperty(index) && keyState[index] === pressed) {
                pressedKeys.push(index);
                if (parseInt(index, 10) !== currentKey) {
                  pressedModifiers[index] = true;
                }
              }
            }
            for (index in options.keyBinds) {
              if (options.keyBinds.hasOwnProperty(index) && typeof options.keyBinds[index] === "function") {
                keyBindKeys = index.split(" ");
                if (keyBindKeys.length === pressedKeys.length && keyMap[currentKey] === keyBindKeys[keyBindKeys.length - 1]) {
                  allModifiersPressed = true;
                  for (index2 = keyBindKeys.length - 2; index2 >= 0; index2--) {
                    if (!(keyMap[keyBindKeys[index2]] in pressedModifiers)) {
                      allModifiersPressed = false;
                      break;
                    }
                  }
                  if (allModifiersPressed) {
                    handler = options.keyBinds[index];
                    break;
                  }
                }
              }
            }
            if (handler) {
              handler.call(picker, widget);
              e.stopPropagation();
              e.preventDefault();
            }
          }, keyup = function(e) {
            keyState[e.which] = "r";
            e.stopPropagation();
            e.preventDefault();
          }, change = function(e) {
            var val = $5(e.target).val().trim(), parsedDate = val ? parseInputDate(val) : null;
            setValue(parsedDate);
            e.stopImmediatePropagation();
            return false;
          }, attachDatePickerElementEvents = function() {
            input.on({
              "change": change,
              "blur": options.debug ? "" : hide,
              "keydown": keydown,
              "keyup": keyup,
              "focus": options.allowInputToggle ? show : ""
            });
            if (element.is("input")) {
              input.on({
                "focus": show
              });
            } else if (component) {
              component.on("click", toggle);
              component.on("mousedown", false);
            }
          }, detachDatePickerElementEvents = function() {
            input.off({
              "change": change,
              "blur": blur,
              "keydown": keydown,
              "keyup": keyup,
              "focus": options.allowInputToggle ? hide : ""
            });
            if (element.is("input")) {
              input.off({
                "focus": show
              });
            } else if (component) {
              component.off("click", toggle);
              component.off("mousedown", false);
            }
          }, indexGivenDates = function(givenDatesArray) {
            var givenDatesIndexed = {};
            $5.each(givenDatesArray, function() {
              var dDate = parseInputDate(this);
              if (dDate.isValid()) {
                givenDatesIndexed[dDate.format("YYYY-MM-DD")] = true;
              }
            });
            return Object.keys(givenDatesIndexed).length ? givenDatesIndexed : false;
          }, indexGivenHours = function(givenHoursArray) {
            var givenHoursIndexed = {};
            $5.each(givenHoursArray, function() {
              givenHoursIndexed[this] = true;
            });
            return Object.keys(givenHoursIndexed).length ? givenHoursIndexed : false;
          }, initFormatting = function() {
            var format = options.format || "L LT";
            actualFormat = format.replace(/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, function(formatInput) {
              var newinput = date.localeData().longDateFormat(formatInput) || formatInput;
              return newinput.replace(/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, function(formatInput2) {
                return date.localeData().longDateFormat(formatInput2) || formatInput2;
              });
            });
            parseFormats = options.extraFormats ? options.extraFormats.slice() : [];
            if (parseFormats.indexOf(format) < 0 && parseFormats.indexOf(actualFormat) < 0) {
              parseFormats.push(actualFormat);
            }
            use24Hours = actualFormat.toLowerCase().indexOf("a") < 1 && actualFormat.replace(/\[.*?\]/g, "").indexOf("h") < 1;
            if (isEnabled("y")) {
              minViewModeNumber = 2;
            }
            if (isEnabled("M")) {
              minViewModeNumber = 1;
            }
            if (isEnabled("d")) {
              minViewModeNumber = 0;
            }
            currentViewMode = Math.max(minViewModeNumber, currentViewMode);
            if (!unset) {
              setValue(date);
            }
          };
          picker.destroy = function() {
            hide();
            detachDatePickerElementEvents();
            element.removeData("DateTimePicker");
            element.removeData("date");
          };
          picker.toggle = toggle;
          picker.show = show;
          picker.hide = hide;
          picker.disable = function() {
            hide();
            if (component && component.hasClass("btn")) {
              component.addClass("disabled");
            }
            input.prop("disabled", true);
            return picker;
          };
          picker.enable = function() {
            if (component && component.hasClass("btn")) {
              component.removeClass("disabled");
            }
            input.prop("disabled", false);
            return picker;
          };
          picker.ignoreReadonly = function(ignoreReadonly) {
            if (arguments.length === 0) {
              return options.ignoreReadonly;
            }
            if (typeof ignoreReadonly !== "boolean") {
              throw new TypeError("ignoreReadonly () expects a boolean parameter");
            }
            options.ignoreReadonly = ignoreReadonly;
            return picker;
          };
          picker.options = function(newOptions) {
            if (arguments.length === 0) {
              return $5.extend(true, {}, options);
            }
            if (!(newOptions instanceof Object)) {
              throw new TypeError("options() options parameter should be an object");
            }
            $5.extend(true, options, newOptions);
            $5.each(options, function(key, value) {
              if (picker[key] !== void 0) {
                picker[key](value);
              } else {
                throw new TypeError("option " + key + " is not recognized!");
              }
            });
            return picker;
          };
          picker.date = function(newDate) {
            if (arguments.length === 0) {
              if (unset) {
                return null;
              }
              return date.clone();
            }
            if (newDate !== null && typeof newDate !== "string" && !moment2.isMoment(newDate) && !(newDate instanceof Date)) {
              throw new TypeError("date() parameter must be one of [null, string, moment or Date]");
            }
            setValue(newDate === null ? null : parseInputDate(newDate));
            return picker;
          };
          picker.format = function(newFormat) {
            if (arguments.length === 0) {
              return options.format;
            }
            if (typeof newFormat !== "string" && (typeof newFormat !== "boolean" || newFormat !== false)) {
              throw new TypeError("format() expects a sting or boolean:false parameter " + newFormat);
            }
            options.format = newFormat;
            if (actualFormat) {
              initFormatting();
            }
            return picker;
          };
          picker.timeZone = function(newZone) {
            if (arguments.length === 0) {
              return options.timeZone;
            }
            options.timeZone = newZone;
            return picker;
          };
          picker.dayViewHeaderFormat = function(newFormat) {
            if (arguments.length === 0) {
              return options.dayViewHeaderFormat;
            }
            if (typeof newFormat !== "string") {
              throw new TypeError("dayViewHeaderFormat() expects a string parameter");
            }
            options.dayViewHeaderFormat = newFormat;
            return picker;
          };
          picker.extraFormats = function(formats) {
            if (arguments.length === 0) {
              return options.extraFormats;
            }
            if (formats !== false && !(formats instanceof Array)) {
              throw new TypeError("extraFormats() expects an array or false parameter");
            }
            options.extraFormats = formats;
            if (parseFormats) {
              initFormatting();
            }
            return picker;
          };
          picker.disabledDates = function(dates) {
            if (arguments.length === 0) {
              return options.disabledDates ? $5.extend({}, options.disabledDates) : options.disabledDates;
            }
            if (!dates) {
              options.disabledDates = false;
              update();
              return picker;
            }
            if (!(dates instanceof Array)) {
              throw new TypeError("disabledDates() expects an array parameter");
            }
            options.disabledDates = indexGivenDates(dates);
            options.enabledDates = false;
            update();
            return picker;
          };
          picker.enabledDates = function(dates) {
            if (arguments.length === 0) {
              return options.enabledDates ? $5.extend({}, options.enabledDates) : options.enabledDates;
            }
            if (!dates) {
              options.enabledDates = false;
              update();
              return picker;
            }
            if (!(dates instanceof Array)) {
              throw new TypeError("enabledDates() expects an array parameter");
            }
            options.enabledDates = indexGivenDates(dates);
            options.disabledDates = false;
            update();
            return picker;
          };
          picker.daysOfWeekDisabled = function(daysOfWeekDisabled) {
            if (arguments.length === 0) {
              return options.daysOfWeekDisabled.splice(0);
            }
            if (typeof daysOfWeekDisabled === "boolean" && !daysOfWeekDisabled) {
              options.daysOfWeekDisabled = false;
              update();
              return picker;
            }
            if (!(daysOfWeekDisabled instanceof Array)) {
              throw new TypeError("daysOfWeekDisabled() expects an array parameter");
            }
            options.daysOfWeekDisabled = daysOfWeekDisabled.reduce(function(previousValue, currentValue) {
              currentValue = parseInt(currentValue, 10);
              if (currentValue > 6 || currentValue < 0 || isNaN(currentValue)) {
                return previousValue;
              }
              if (previousValue.indexOf(currentValue) === -1) {
                previousValue.push(currentValue);
              }
              return previousValue;
            }, []).sort();
            if (options.useCurrent && !options.keepInvalid) {
              var tries = 0;
              while (!isValid(date, "d")) {
                date.add(1, "d");
                if (tries === 7) {
                  throw "Tried 7 times to find a valid date";
                }
                tries++;
              }
              setValue(date);
            }
            update();
            return picker;
          };
          picker.maxDate = function(maxDate) {
            if (arguments.length === 0) {
              return options.maxDate ? options.maxDate.clone() : options.maxDate;
            }
            if (typeof maxDate === "boolean" && maxDate === false) {
              options.maxDate = false;
              update();
              return picker;
            }
            if (typeof maxDate === "string") {
              if (maxDate === "now" || maxDate === "moment") {
                maxDate = getMoment();
              }
            }
            var parsedDate = parseInputDate(maxDate);
            if (!parsedDate.isValid()) {
              throw new TypeError("maxDate() Could not parse date parameter: " + maxDate);
            }
            if (options.minDate && parsedDate.isBefore(options.minDate)) {
              throw new TypeError("maxDate() date parameter is before options.minDate: " + parsedDate.format(actualFormat));
            }
            options.maxDate = parsedDate;
            if (options.useCurrent && !options.keepInvalid && date.isAfter(maxDate)) {
              setValue(options.maxDate);
            }
            if (viewDate.isAfter(parsedDate)) {
              viewDate = parsedDate.clone().subtract(options.stepping, "m");
            }
            update();
            return picker;
          };
          picker.minDate = function(minDate) {
            if (arguments.length === 0) {
              return options.minDate ? options.minDate.clone() : options.minDate;
            }
            if (typeof minDate === "boolean" && minDate === false) {
              options.minDate = false;
              update();
              return picker;
            }
            if (typeof minDate === "string") {
              if (minDate === "now" || minDate === "moment") {
                minDate = getMoment();
              }
            }
            var parsedDate = parseInputDate(minDate);
            if (!parsedDate.isValid()) {
              throw new TypeError("minDate() Could not parse date parameter: " + minDate);
            }
            if (options.maxDate && parsedDate.isAfter(options.maxDate)) {
              throw new TypeError("minDate() date parameter is after options.maxDate: " + parsedDate.format(actualFormat));
            }
            options.minDate = parsedDate;
            if (options.useCurrent && !options.keepInvalid && date.isBefore(minDate)) {
              setValue(options.minDate);
            }
            if (viewDate.isBefore(parsedDate)) {
              viewDate = parsedDate.clone().add(options.stepping, "m");
            }
            update();
            return picker;
          };
          picker.defaultDate = function(defaultDate) {
            if (arguments.length === 0) {
              return options.defaultDate ? options.defaultDate.clone() : options.defaultDate;
            }
            if (!defaultDate) {
              options.defaultDate = false;
              return picker;
            }
            if (typeof defaultDate === "string") {
              if (defaultDate === "now" || defaultDate === "moment") {
                defaultDate = getMoment();
              }
            }
            var parsedDate = parseInputDate(defaultDate);
            if (!parsedDate.isValid()) {
              throw new TypeError("defaultDate() Could not parse date parameter: " + defaultDate);
            }
            if (!isValid(parsedDate)) {
              throw new TypeError("defaultDate() date passed is invalid according to component setup validations");
            }
            options.defaultDate = parsedDate;
            if (options.defaultDate && options.inline || input.val().trim() === "") {
              setValue(options.defaultDate);
            }
            return picker;
          };
          picker.locale = function(locale) {
            if (arguments.length === 0) {
              return options.locale;
            }
            if (!moment2.localeData(locale)) {
              throw new TypeError("locale() locale " + locale + " is not loaded from moment locales!");
            }
            options.locale = locale;
            date.locale(options.locale);
            viewDate.locale(options.locale);
            if (actualFormat) {
              initFormatting();
            }
            if (widget) {
              hide();
              show();
            }
            return picker;
          };
          picker.stepping = function(stepping) {
            if (arguments.length === 0) {
              return options.stepping;
            }
            stepping = parseInt(stepping, 10);
            if (isNaN(stepping) || stepping < 1) {
              stepping = 1;
            }
            options.stepping = stepping;
            return picker;
          };
          picker.useCurrent = function(useCurrent) {
            var useCurrentOptions = ["year", "month", "day", "hour", "minute"];
            if (arguments.length === 0) {
              return options.useCurrent;
            }
            if (typeof useCurrent !== "boolean" && typeof useCurrent !== "string") {
              throw new TypeError("useCurrent() expects a boolean or string parameter");
            }
            if (typeof useCurrent === "string" && useCurrentOptions.indexOf(useCurrent.toLowerCase()) === -1) {
              throw new TypeError("useCurrent() expects a string parameter of " + useCurrentOptions.join(", "));
            }
            options.useCurrent = useCurrent;
            return picker;
          };
          picker.collapse = function(collapse) {
            if (arguments.length === 0) {
              return options.collapse;
            }
            if (typeof collapse !== "boolean") {
              throw new TypeError("collapse() expects a boolean parameter");
            }
            if (options.collapse === collapse) {
              return picker;
            }
            options.collapse = collapse;
            if (widget) {
              hide();
              show();
            }
            return picker;
          };
          picker.icons = function(icons) {
            if (arguments.length === 0) {
              return $5.extend({}, options.icons);
            }
            if (!(icons instanceof Object)) {
              throw new TypeError("icons() expects parameter to be an Object");
            }
            $5.extend(options.icons, icons);
            if (widget) {
              hide();
              show();
            }
            return picker;
          };
          picker.tooltips = function(tooltips) {
            if (arguments.length === 0) {
              return $5.extend({}, options.tooltips);
            }
            if (!(tooltips instanceof Object)) {
              throw new TypeError("tooltips() expects parameter to be an Object");
            }
            $5.extend(options.tooltips, tooltips);
            if (widget) {
              hide();
              show();
            }
            return picker;
          };
          picker.useStrict = function(useStrict) {
            if (arguments.length === 0) {
              return options.useStrict;
            }
            if (typeof useStrict !== "boolean") {
              throw new TypeError("useStrict() expects a boolean parameter");
            }
            options.useStrict = useStrict;
            return picker;
          };
          picker.sideBySide = function(sideBySide) {
            if (arguments.length === 0) {
              return options.sideBySide;
            }
            if (typeof sideBySide !== "boolean") {
              throw new TypeError("sideBySide() expects a boolean parameter");
            }
            options.sideBySide = sideBySide;
            if (widget) {
              hide();
              show();
            }
            return picker;
          };
          picker.viewMode = function(viewMode) {
            if (arguments.length === 0) {
              return options.viewMode;
            }
            if (typeof viewMode !== "string") {
              throw new TypeError("viewMode() expects a string parameter");
            }
            if (viewModes.indexOf(viewMode) === -1) {
              throw new TypeError("viewMode() parameter must be one of (" + viewModes.join(", ") + ") value");
            }
            options.viewMode = viewMode;
            currentViewMode = Math.max(viewModes.indexOf(viewMode), minViewModeNumber);
            showMode();
            return picker;
          };
          picker.toolbarPlacement = function(toolbarPlacement) {
            if (arguments.length === 0) {
              return options.toolbarPlacement;
            }
            if (typeof toolbarPlacement !== "string") {
              throw new TypeError("toolbarPlacement() expects a string parameter");
            }
            if (toolbarPlacements.indexOf(toolbarPlacement) === -1) {
              throw new TypeError("toolbarPlacement() parameter must be one of (" + toolbarPlacements.join(", ") + ") value");
            }
            options.toolbarPlacement = toolbarPlacement;
            if (widget) {
              hide();
              show();
            }
            return picker;
          };
          picker.widgetPositioning = function(widgetPositioning) {
            if (arguments.length === 0) {
              return $5.extend({}, options.widgetPositioning);
            }
            if ({}.toString.call(widgetPositioning) !== "[object Object]") {
              throw new TypeError("widgetPositioning() expects an object variable");
            }
            if (widgetPositioning.horizontal) {
              if (typeof widgetPositioning.horizontal !== "string") {
                throw new TypeError("widgetPositioning() horizontal variable must be a string");
              }
              widgetPositioning.horizontal = widgetPositioning.horizontal.toLowerCase();
              if (horizontalModes.indexOf(widgetPositioning.horizontal) === -1) {
                throw new TypeError("widgetPositioning() expects horizontal parameter to be one of (" + horizontalModes.join(", ") + ")");
              }
              options.widgetPositioning.horizontal = widgetPositioning.horizontal;
            }
            if (widgetPositioning.vertical) {
              if (typeof widgetPositioning.vertical !== "string") {
                throw new TypeError("widgetPositioning() vertical variable must be a string");
              }
              widgetPositioning.vertical = widgetPositioning.vertical.toLowerCase();
              if (verticalModes.indexOf(widgetPositioning.vertical) === -1) {
                throw new TypeError("widgetPositioning() expects vertical parameter to be one of (" + verticalModes.join(", ") + ")");
              }
              options.widgetPositioning.vertical = widgetPositioning.vertical;
            }
            update();
            return picker;
          };
          picker.calendarWeeks = function(calendarWeeks) {
            if (arguments.length === 0) {
              return options.calendarWeeks;
            }
            if (typeof calendarWeeks !== "boolean") {
              throw new TypeError("calendarWeeks() expects parameter to be a boolean value");
            }
            options.calendarWeeks = calendarWeeks;
            update();
            return picker;
          };
          picker.showTodayButton = function(showTodayButton) {
            if (arguments.length === 0) {
              return options.showTodayButton;
            }
            if (typeof showTodayButton !== "boolean") {
              throw new TypeError("showTodayButton() expects a boolean parameter");
            }
            options.showTodayButton = showTodayButton;
            if (widget) {
              hide();
              show();
            }
            return picker;
          };
          picker.showClear = function(showClear) {
            if (arguments.length === 0) {
              return options.showClear;
            }
            if (typeof showClear !== "boolean") {
              throw new TypeError("showClear() expects a boolean parameter");
            }
            options.showClear = showClear;
            if (widget) {
              hide();
              show();
            }
            return picker;
          };
          picker.widgetParent = function(widgetParent) {
            if (arguments.length === 0) {
              return options.widgetParent;
            }
            if (typeof widgetParent === "string") {
              widgetParent = $5(widgetParent);
            }
            if (widgetParent !== null && (typeof widgetParent !== "string" && !(widgetParent instanceof $5))) {
              throw new TypeError("widgetParent() expects a string or a jQuery object parameter");
            }
            options.widgetParent = widgetParent;
            if (widget) {
              hide();
              show();
            }
            return picker;
          };
          picker.keepOpen = function(keepOpen) {
            if (arguments.length === 0) {
              return options.keepOpen;
            }
            if (typeof keepOpen !== "boolean") {
              throw new TypeError("keepOpen() expects a boolean parameter");
            }
            options.keepOpen = keepOpen;
            return picker;
          };
          picker.focusOnShow = function(focusOnShow) {
            if (arguments.length === 0) {
              return options.focusOnShow;
            }
            if (typeof focusOnShow !== "boolean") {
              throw new TypeError("focusOnShow() expects a boolean parameter");
            }
            options.focusOnShow = focusOnShow;
            return picker;
          };
          picker.inline = function(inline) {
            if (arguments.length === 0) {
              return options.inline;
            }
            if (typeof inline !== "boolean") {
              throw new TypeError("inline() expects a boolean parameter");
            }
            options.inline = inline;
            return picker;
          };
          picker.clear = function() {
            clear();
            return picker;
          };
          picker.keyBinds = function(keyBinds) {
            options.keyBinds = keyBinds;
            return picker;
          };
          picker.getMoment = function(d) {
            return getMoment(d);
          };
          picker.debug = function(debug) {
            if (typeof debug !== "boolean") {
              throw new TypeError("debug() expects a boolean parameter");
            }
            options.debug = debug;
            return picker;
          };
          picker.allowInputToggle = function(allowInputToggle) {
            if (arguments.length === 0) {
              return options.allowInputToggle;
            }
            if (typeof allowInputToggle !== "boolean") {
              throw new TypeError("allowInputToggle() expects a boolean parameter");
            }
            options.allowInputToggle = allowInputToggle;
            return picker;
          };
          picker.showClose = function(showClose) {
            if (arguments.length === 0) {
              return options.showClose;
            }
            if (typeof showClose !== "boolean") {
              throw new TypeError("showClose() expects a boolean parameter");
            }
            options.showClose = showClose;
            return picker;
          };
          picker.keepInvalid = function(keepInvalid) {
            if (arguments.length === 0) {
              return options.keepInvalid;
            }
            if (typeof keepInvalid !== "boolean") {
              throw new TypeError("keepInvalid() expects a boolean parameter");
            }
            options.keepInvalid = keepInvalid;
            return picker;
          };
          picker.datepickerInput = function(datepickerInput) {
            if (arguments.length === 0) {
              return options.datepickerInput;
            }
            if (typeof datepickerInput !== "string") {
              throw new TypeError("datepickerInput() expects a string parameter");
            }
            options.datepickerInput = datepickerInput;
            return picker;
          };
          picker.parseInputDate = function(parseInputDate2) {
            if (arguments.length === 0) {
              return options.parseInputDate;
            }
            if (typeof parseInputDate2 !== "function") {
              throw new TypeError("parseInputDate() sholud be as function");
            }
            options.parseInputDate = parseInputDate2;
            return picker;
          };
          picker.disabledTimeIntervals = function(disabledTimeIntervals) {
            if (arguments.length === 0) {
              return options.disabledTimeIntervals ? $5.extend({}, options.disabledTimeIntervals) : options.disabledTimeIntervals;
            }
            if (!disabledTimeIntervals) {
              options.disabledTimeIntervals = false;
              update();
              return picker;
            }
            if (!(disabledTimeIntervals instanceof Array)) {
              throw new TypeError("disabledTimeIntervals() expects an array parameter");
            }
            options.disabledTimeIntervals = disabledTimeIntervals;
            update();
            return picker;
          };
          picker.disabledHours = function(hours) {
            if (arguments.length === 0) {
              return options.disabledHours ? $5.extend({}, options.disabledHours) : options.disabledHours;
            }
            if (!hours) {
              options.disabledHours = false;
              update();
              return picker;
            }
            if (!(hours instanceof Array)) {
              throw new TypeError("disabledHours() expects an array parameter");
            }
            options.disabledHours = indexGivenHours(hours);
            options.enabledHours = false;
            if (options.useCurrent && !options.keepInvalid) {
              var tries = 0;
              while (!isValid(date, "h")) {
                date.add(1, "h");
                if (tries === 24) {
                  throw "Tried 24 times to find a valid date";
                }
                tries++;
              }
              setValue(date);
            }
            update();
            return picker;
          };
          picker.enabledHours = function(hours) {
            if (arguments.length === 0) {
              return options.enabledHours ? $5.extend({}, options.enabledHours) : options.enabledHours;
            }
            if (!hours) {
              options.enabledHours = false;
              update();
              return picker;
            }
            if (!(hours instanceof Array)) {
              throw new TypeError("enabledHours() expects an array parameter");
            }
            options.enabledHours = indexGivenHours(hours);
            options.disabledHours = false;
            if (options.useCurrent && !options.keepInvalid) {
              var tries = 0;
              while (!isValid(date, "h")) {
                date.add(1, "h");
                if (tries === 24) {
                  throw "Tried 24 times to find a valid date";
                }
                tries++;
              }
              setValue(date);
            }
            update();
            return picker;
          };
          picker.viewDate = function(newDate) {
            if (arguments.length === 0) {
              return viewDate.clone();
            }
            if (!newDate) {
              viewDate = date.clone();
              return picker;
            }
            if (typeof newDate !== "string" && !moment2.isMoment(newDate) && !(newDate instanceof Date)) {
              throw new TypeError("viewDate() parameter must be one of [string, moment or Date]");
            }
            viewDate = parseInputDate(newDate);
            viewUpdate();
            return picker;
          };
          if (element.is("input")) {
            input = element;
          } else {
            input = element.find(options.datepickerInput);
            if (input.size() === 0) {
              input = element.find("input");
            } else if (!input.is("input")) {
              throw new Error('CSS class "' + options.datepickerInput + '" cannot be applied to non input element');
            }
          }
          if (element.hasClass("input-group")) {
            if (element.find(".datepickerbutton").size() === 0) {
              component = element.find(".input-group-addon");
            } else {
              component = element.find(".datepickerbutton");
            }
          }
          if (!options.inline && !input.is("input")) {
            throw new Error("Could not initialize DateTimePicker without an input element");
          }
          date = getMoment();
          viewDate = date.clone();
          $5.extend(true, options, dataToOptions());
          picker.options(options);
          initFormatting();
          attachDatePickerElementEvents();
          if (input.prop("disabled")) {
            picker.disable();
          }
          if (input.is("input") && input.val().trim().length !== 0) {
            setValue(parseInputDate(input.val().trim()));
          } else if (options.defaultDate && input.attr("placeholder") === void 0) {
            setValue(options.defaultDate);
          }
          if (options.inline) {
            show();
          }
          return picker;
        };
        $5.fn.datetimepicker = function(options) {
          return this.each(function() {
            var $this = $5(this);
            if (!$this.data("DateTimePicker")) {
              options = $5.extend(true, {}, $5.fn.datetimepicker.defaults, options);
              $this.data("DateTimePicker", dateTimePicker($this, options));
            }
          });
        };
        $5.fn.datetimepicker.defaults = {
          timeZone: "Etc/UTC",
          format: false,
          dayViewHeaderFormat: "MMMM YYYY",
          extraFormats: false,
          stepping: 1,
          minDate: false,
          maxDate: false,
          useCurrent: true,
          collapse: true,
          locale: moment2.locale(),
          defaultDate: false,
          disabledDates: false,
          enabledDates: false,
          icons: {
            time: "glyphicon glyphicon-time",
            date: "glyphicon glyphicon-calendar",
            up: "glyphicon glyphicon-chevron-up",
            down: "glyphicon glyphicon-chevron-down",
            previous: "glyphicon glyphicon-chevron-left",
            next: "glyphicon glyphicon-chevron-right",
            today: "glyphicon glyphicon-screenshot",
            clear: "glyphicon glyphicon-trash",
            close: "glyphicon glyphicon-remove"
          },
          tooltips: {
            today: "Go to today",
            clear: "Clear selection",
            close: "Close the picker",
            selectMonth: "Select Month",
            prevMonth: "Previous Month",
            nextMonth: "Next Month",
            selectYear: "Select Year",
            prevYear: "Previous Year",
            nextYear: "Next Year",
            selectDecade: "Select Decade",
            prevDecade: "Previous Decade",
            nextDecade: "Next Decade",
            prevCentury: "Previous Century",
            nextCentury: "Next Century",
            pickHour: "Pick Hour",
            incrementHour: "Increment Hour",
            decrementHour: "Decrement Hour",
            pickMinute: "Pick Minute",
            incrementMinute: "Increment Minute",
            decrementMinute: "Decrement Minute",
            pickSecond: "Pick Second",
            incrementSecond: "Increment Second",
            decrementSecond: "Decrement Second",
            togglePeriod: "Toggle Period",
            selectTime: "Select Time"
          },
          useStrict: false,
          sideBySide: false,
          daysOfWeekDisabled: false,
          calendarWeeks: false,
          viewMode: "days",
          toolbarPlacement: "default",
          showTodayButton: false,
          showClear: false,
          showClose: false,
          widgetPositioning: {
            horizontal: "auto",
            vertical: "auto"
          },
          widgetParent: null,
          ignoreReadonly: false,
          keepOpen: false,
          focusOnShow: true,
          inline: false,
          keepInvalid: false,
          datepickerInput: ".datepickerinput",
          keyBinds: {
            up: function(widget) {
              if (!widget) {
                return;
              }
              var d = this.date() || this.getMoment();
              if (widget.find(".datepicker").is(":visible")) {
                this.date(d.clone().subtract(7, "d"));
              } else {
                this.date(d.clone().add(this.stepping(), "m"));
              }
            },
            down: function(widget) {
              if (!widget) {
                this.show();
                return;
              }
              var d = this.date() || this.getMoment();
              if (widget.find(".datepicker").is(":visible")) {
                this.date(d.clone().add(7, "d"));
              } else {
                this.date(d.clone().subtract(this.stepping(), "m"));
              }
            },
            "control up": function(widget) {
              if (!widget) {
                return;
              }
              var d = this.date() || this.getMoment();
              if (widget.find(".datepicker").is(":visible")) {
                this.date(d.clone().subtract(1, "y"));
              } else {
                this.date(d.clone().add(1, "h"));
              }
            },
            "control down": function(widget) {
              if (!widget) {
                return;
              }
              var d = this.date() || this.getMoment();
              if (widget.find(".datepicker").is(":visible")) {
                this.date(d.clone().add(1, "y"));
              } else {
                this.date(d.clone().subtract(1, "h"));
              }
            },
            left: function(widget) {
              if (!widget) {
                return;
              }
              var d = this.date() || this.getMoment();
              if (widget.find(".datepicker").is(":visible")) {
                this.date(d.clone().subtract(1, "d"));
              }
            },
            right: function(widget) {
              if (!widget) {
                return;
              }
              var d = this.date() || this.getMoment();
              if (widget.find(".datepicker").is(":visible")) {
                this.date(d.clone().add(1, "d"));
              }
            },
            pageUp: function(widget) {
              if (!widget) {
                return;
              }
              var d = this.date() || this.getMoment();
              if (widget.find(".datepicker").is(":visible")) {
                this.date(d.clone().subtract(1, "M"));
              }
            },
            pageDown: function(widget) {
              if (!widget) {
                return;
              }
              var d = this.date() || this.getMoment();
              if (widget.find(".datepicker").is(":visible")) {
                this.date(d.clone().add(1, "M"));
              }
            },
            enter: function() {
              this.hide();
            },
            escape: function() {
              this.hide();
            },
            "control space": function(widget) {
              if (widget.find(".timepicker").is(":visible")) {
                widget.find('.btn[data-action="togglePeriod"]').click();
              }
            },
            t: function() {
              this.date(this.getMoment());
            },
            "delete": function() {
              this.clear();
            }
          },
          debug: false,
          allowInputToggle: false,
          disabledTimeIntervals: false,
          disabledHours: false,
          enabledHours: false,
          viewDate: false
        };
      };
    }
  });

  // lib/assets/javascript/application.js
  var import_ujs = __toESM(require_rails_ujs());

  // lib/assets/javascript/components/associative.js
  var import_jquery = __toESM(require_jquery());
  var import_selectize = __toESM(require_selectize());
  (0, import_jquery.default)(function() {
    (0, import_jquery.default)(".field-unit--belongs-to select").selectize({});
    (0, import_jquery.default)(".field-unit--has-many select").selectize({});
    (0, import_jquery.default)(".field-unit--polymorphic select").selectize({});
  });

  // lib/assets/javascript/components/date_time_picker.js
  var import_jquery2 = __toESM(require_jquery());
  var import_moment = __toESM(require_moment());
  var import_bootstrap_datetimepicker = __toESM(require_bootstrap_datetimepicker());
  window.moment = import_moment.default;
  (0, import_bootstrap_datetimepicker.default)(import_jquery2.default);
  window.$ = import_jquery2.default;
  (0, import_jquery2.default)(function() {
    (0, import_jquery2.default)('[data-type="time"]').datetimepicker({
      debug: false,
      format: "HH:mm:ss"
    });
    (0, import_jquery2.default)('[data-type="datetime"]').datetimepicker({
      debug: false,
      format: "YYYY-MM-DD HH:mm:ss"
    });
    (0, import_jquery2.default)('[data-type="date"]').datetimepicker({
      debug: false,
      format: "YYYY-MM-DD"
    });
  });

  // lib/assets/javascript/components/table.js
  var import_jquery3 = __toESM(require_jquery());
  (0, import_jquery3.default)(function() {
    var keycodes = { space: 32, enter: 13 };
    var visitDataUrl = function(event) {
      if (event.type == "click" || event.keyCode == keycodes.space || event.keyCode == keycodes.enter) {
        if (event.target.href) {
          return;
        }
        var dataUrl = (0, import_jquery3.default)(event.target).closest("tr").data("url");
        var selection = window.getSelection().toString();
        if (selection.length === 0 && dataUrl) {
          window.location = window.location.protocol + "//" + window.location.host + dataUrl;
        }
      }
    };
    (0, import_jquery3.default)("table").on("click", ".js-table-row", visitDataUrl);
    (0, import_jquery3.default)("table").on("keydown", ".js-table-row", visitDataUrl);
  });

  // lib/assets/javascript/application.js
  import_ujs.default.start();
})();
/*!
 * jQuery JavaScript Library v3.6.0
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2021-03-02T17:08Z
 */
/*! version : 4.17.37
 =========================================================
 bootstrap-datetimejs
 https://github.com/Eonasdan/bootstrap-datetimepicker
 Copyright (c) 2015 Jonathan Peterson
 =========================================================
 */
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! moment.js
//! momentjs.com
//! version : 2.29.1
//! version : 2.8.4
//# sourceMappingURL=application.js.map
