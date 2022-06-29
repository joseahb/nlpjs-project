(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],2:[function(require,module,exports){
/*
 * Copyright (c) AXA Group Operations Spain S.A.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

/**
 * Class for an Among of a Stemmer
 */
class Among {
  constructor(s, sub, result, method, instance) {
    this.s_size = s.length;
    this.s = s;
    this.substring_i = sub;
    this.result = result;
    this.method = method;
    this.instance = instance;
  }
}

module.exports = Among;

},{}],3:[function(require,module,exports){
/*
 * Copyright (c) AXA Group Operations Spain S.A.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
const { defaultContainer } = require('./container');

/**
 * Plugin to convert an array to a hashmap where every item existing in the
 * array is mapped to a 1.
 */
class ArrToObj {
  /**
   * Constructor of the class
   * @param {object} container Parent container, if not defined then the
   *    default container is used.
   */
  constructor(container = defaultContainer) {
    this.container = container.container || container;
    this.name = 'arrToObj';
  }

  /**
   * Static method to convert an array to a hashmap object.
   * @param {object[]} arr Input array.
   * @returns {object} Output object.
   */
  static arrToObj(arr) {
    const result = {};
    for (let i = 0; i < arr.length; i += 1) {
      result[arr[i]] = 1;
    }
    return result;
  }

  run(input) {
    if (Array.isArray(input)) {
      return ArrToObj.arrToObj(input);
    }
    input.tokens = ArrToObj.arrToObj(input.tokens);
    return input;
  }
}

module.exports = ArrToObj;

},{"./container":7}],4:[function(require,module,exports){
/*
 * Copyright (c) AXA Group Operations Spain S.A.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
const { defaultContainer } = require('./container');
const Tokenizer = require('./tokenizer');

/* eslint-disable */
class BaseStemmer {
  constructor(container = defaultContainer, dictionary) {
    this.container = container.container || container;
    this.cache = {};
    this.setCurrent("");
    this.dictionary = dictionary || { before: {}, after: {}};
  }

  setCurrent(value) {
    this.current = value;
    this.cursor = 0;
    this.limit = this.current.length;
    this.limit_backward = 0;
    this.bra = this.cursor;
    this.ket = this.limit;
  }

  getCurrent() {
    return this.current;
  }

  bc(s, ch) {
    if ((s[ch >>> 3] & (0x1 << (ch & 0x7))) == 0) {
      return true;
    }
    return false;
  }

  in_grouping(s, min, max) {
    if (this.cursor >= this.limit) return false;
    let ch = this.current.charCodeAt(this.cursor);
    if (ch > max || ch < min) return false;
    ch -= min;
    if (this.bc(s, ch)) return false;
    this.cursor++;
    return true;
  }

  in_grouping_b(s, min, max) {
    if (this.cursor <= this.limit_backward) return false;
    let ch = this.current.charCodeAt(this.cursor - 1);
    if (ch > max || ch < min) return false;
    ch -= min;
    if (this.bc(s, ch)) return false;
    this.cursor--;
    return true;
  }

  out_grouping(s, min, max) {
    if (this.cursor >= this.limit) return false;
    let ch = this.current.charCodeAt(this.cursor);
    if (ch > max || ch < min) {
      this.cursor++;
      return true;
    }
    ch -= min;
    if (this.bc(s, ch)) {
      this.cursor++;
      return true;
    }
    return false;
  }

  out_grouping_b(s, min, max) {
    if (this.cursor <= this.limit_backward) return false;
    let ch = this.current.charCodeAt(this.cursor - 1);
    if (ch > max || ch < min) {
      this.cursor--;
      return true;
    }
    ch -= min;
    if (this.bc(s, ch)) {
      this.cursor--;
      return true;
    }
    return false;
  }

  eq_s(s_size, s) {
    if (typeof s_size === 'string') {
      s = s_size;
      s_size = s.length;
    }
    if ((this.limit - this.cursor < s_size) || (this.current.slice(this.cursor, this.cursor + s_size) != s)) {
      return false;
    }
    this.cursor += s_size;
    return true;
  }

  eq_s_b(s_size, s) {
    if (typeof s_size === 'string') {
      s = s_size;
      s_size = s.length;
    }
    if ((this.cursor - this.limit_backward < s_size) || (this.current.slice(this.cursor - s_size, this.cursor) != s)) {
      return false;
    }
    this.cursor -= s_size;
    return true;
  }

  find_among(v, v_size) {
    let i = 0;
    let j = v_size || v.length;

    const c = this.cursor;
    const l = this.limit;

    let common_i = 0;
    let common_j = 0;

    let first_key_inspected = false;

    while (true) {
      const k = i + ((j - i) >>> 1);
      let diff = 0;
      let common = common_i < common_j ? common_i : common_j; // smaller
      var w = v[k];
      var i2;
      for (i2 = common; i2 < w.s_size; i2++) {
        if (c + common == l) {
          diff = -1;
          break;
        }
        diff = this.current.charCodeAt(c + common) - w.s.charCodeAt(i2);
        if (diff != 0) break;
        common++;
      }
      if (diff < 0) {
        j = k;
        common_j = common;
      } else {
        i = k;
        common_i = common;
      }
      if (j - i <= 1) {
        if (i > 0) break; // v->s has been inspected
        if (j == i) break; // only one item in v

        // - but now we need to go round once more to get
        // v->s inspected. This looks messy, but is actually
        // the optimal approach.

        if (first_key_inspected) break;
        first_key_inspected = true;
      }
    }
    while (true) {
      var w = v[i];
      if (common_i >= w.s_size) {
        this.cursor = c + w.s_size;
        if (w.method == null) {
          return w.result;
        }
        const res = w.method(w.instance);
        this.cursor = c + w.s_size;
        if (res) {
          return w.result;
        }
      }
      i = w.substring_i;
      if (i < 0) return 0;
    }
    return -1; // not reachable
  }

  // find_among_b is for backwards processing. Same comments apply
  find_among_b(v, v_size) {
    let i = 0;
    let j = v_size || v.length;

    const c = this.cursor;
    const lb = this.limit_backward;

    let common_i = 0;
    let common_j = 0;

    let first_key_inspected = false;

    while (true) {
      const k = i + ((j - i) >> 1);
      let diff = 0;
      let common = common_i < common_j ? common_i : common_j;
      var w = v[k];
      var i2;
      for (i2 = w.s_size - 1 - common; i2 >= 0; i2--) {
        if (c - common == lb) {
          diff = -1;
          break;
        }
        diff = this.current.charCodeAt(c - 1 - common) - w.s.charCodeAt(i2);
        if (diff != 0) break;
        common++;
      }
      if (diff < 0) {
        j = k;
        common_j = common;
      } else {
        i = k;
        common_i = common;
      }
      if (j - i <= 1) {
        if (i > 0) break;
        if (j == i) break;
        if (first_key_inspected) break;
        first_key_inspected = true;
      }
    }
    while (true) {
      var w = v[i];
      if (common_i >= w.s_size) {
        this.cursor = c - w.s_size;
        if (w.method == null) return w.result;
        const res = w.method(this);
        this.cursor = c - w.s_size;
        if (res) return w.result;
      }
      i = w.substring_i;
      if (i < 0) return 0;
    }
    return -1; // not reachable
  }

  /* to replace chars between c_bra and c_ket in this.current by the
   * chars in s.
   */
  replace_s(c_bra, c_ket, s) {
    const adjustment = s.length - (c_ket - c_bra);
    this.current = this.current.slice(0, c_bra) + s + this.current.slice(c_ket);
    this.limit += adjustment;
    if (this.cursor >= c_ket) this.cursor += adjustment;
    else if (this.cursor > c_bra) this.cursor = c_bra;
    return adjustment;
  }

  slice_check() {
    if (
      this.bra < 0 ||
      this.bra > this.ket ||
      this.ket > this.limit ||
      this.limit > this.current.length
    ) {
      return false;
    }
    return true;
  }

  slice_from(s) {
    if (this.slice_check()) {
      this.replace_s(this.bra, this.ket, s);
      return true;
    }
    return false;
  }

  slice_del() {
    return this.slice_from("");
  }

  insert(c_bra, c_ket, s) {
    const adjustment = this.replace_s(c_bra, c_ket, s);
    if (c_bra <= this.bra) this.bra += adjustment;
    if (c_bra <= this.ket) this.ket += adjustment;
  }

  /* Copy the slice into the supplied StringBuffer */
  slice_to(s) {
    let result = "";
    if (this.slice_check()) {
      result = this.current.slice(this.bra, this.ket);
    }
    return result;
  }

  stemWord(word) {
    let result = this.cache[`.${word}`];
    if (result == null) {
      if (this.dictionary.before.hasOwnProperty(word)) {
        result = this.dictionary.before[word];
      } else {
        this.setCurrent(word);
        this.innerStem();
        result = this.getCurrent();
        if (this.dictionary.after.hasOwnProperty(result)) {
          result = this.dictionary.after[result];
        }
      }
      this.cache[`.${word}`] = result;
    }
    return result;
  }

  stemWords(words) {
    const results = [];
    for (let i = 0; i < words.length; i++) {
      const stemmed = this.stemWord(words[i]);
      if (stemmed) {
        results.push(stemmed.trim());
      }
    }
    return results;
  }

  stem(tokens) {
    if (tokens === undefined || tokens === null) {
      return tokens;
    }
    if (!Array.isArray(tokens)) {
      return this.stemWords([tokens])[0];
    }
    return this.stemWords(tokens);
  }

  getTokenizer() {
    if (!this.tokenizer) {
      this.tokenizer =
        this.container.get(`tokenizer-${this.name.slice(-2)}`) ||
        new Tokenizer();
    }
    return this.tokenizer;
  }

  getStopwords() {
    if (!this.stopwords) {
      this.stopwords = this.container.get(`tokenizer-${this.name.slice(-2)}`);
    }
    return this.stopwords;
  }

  tokenizeAndStem(text, keepStops = true) {
    const tokenizer = this.getTokenizer();
    let tokens = tokenizer.tokenize(text, true);
    if (!keepStops) {
      const stopwords = this.getStopwords();
      if (stopwords) {
        tokens = stopwords.removeStopwords(tokens);
      }
    }
    return this.stemWords(tokens);
  }
}

module.exports = BaseStemmer;

},{"./container":7,"./tokenizer":21}],5:[function(require,module,exports){
/*
 * Copyright (c) AXA Group Operations Spain S.A.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
const { defaultContainer } = require('./container');

class Clonable {
  /**
   * Constructor of the class
   * @param {object} settings
   */
  constructor(settings = {}, container = defaultContainer) {
    this.container = settings.container || container;
    this.applySettings(this, settings);
  }

  get logger() {
    return this.container.get('logger');
  }

  /**
   * Apply default settings to an object.
   * @param {object} obj Target object.
   * @param {object} settings Input settings.
   */
  applySettings(srcobj, settings = {}) {
    const obj = srcobj || {};
    Object.keys(settings).forEach((key) => {
      if (obj[key] === undefined) {
        obj[key] = settings[key];
      }
    });
    return obj;
  }

  toJSON() {
    const settings = this.jsonExport || {};
    const result = {};
    const keys = Object.keys(this);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      if (
        key !== 'jsonExport' &&
        key !== 'jsonImport' &&
        key !== 'container' &&
        !key.startsWith('pipeline')
      ) {
        const fn = settings[key] === undefined ? true : settings[key];
        if (typeof fn === 'function') {
          const value = fn.bind(this)(result, this, key, this[key]);
          if (value) {
            result[key] = value;
          }
        } else if (typeof fn === 'boolean') {
          if (fn) {
            result[key] = this[key];
            if (key === 'settings') {
              delete result[key].container;
            }
          }
        } else if (typeof fn === 'string') {
          result[fn] = this[key];
        }
      }
    }
    return result;
  }

  fromJSON(json) {
    const settings = this.jsonImport || {};
    const keys = Object.keys(json);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      const fn = settings[key] === undefined ? true : settings[key];
      if (typeof fn === 'function') {
        const value = fn.bind(this)(this, json, key, json[key]);
        if (value) {
          this[key] = value;
        }
      } else if (typeof fn === 'boolean') {
        if (fn) {
          this[key] = json[key];
        }
      } else if (typeof fn === 'string') {
        this[fn] = json[key];
      }
    }
  }

  objToValues(obj, srcKeys) {
    const keys = srcKeys || Object.keys(obj);
    const result = [];
    for (let i = 0; i < keys.length; i += 1) {
      result.push(obj[keys[i]]);
    }
    return result;
  }

  valuesToObj(values, keys) {
    const result = {};
    for (let i = 0; i < values.length; i += 1) {
      result[keys[i]] = values[i];
    }
    return result;
  }

  getPipeline(tag) {
    return this.container.getPipeline(tag);
  }

  async runPipeline(input, pipeline) {
    return this.container.runPipeline(pipeline || this.pipeline, input, this);
  }

  use(item) {
    this.container.use(item);
  }
}

module.exports = Clonable;

},{"./container":7}],6:[function(require,module,exports){
(function (process){(function (){
/*
 * Copyright (c) AXA Group Operations Spain S.A.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

const ArrToObj = require('./arr-to-obj');
const { Container } = require('./container');
const Normalizer = require('./normalizer');
const ObjToArr = require('./obj-to-arr');
const { loadEnvFromJson } = require('./helper');
const Stemmer = require('./stemmer');
const Stopwords = require('./stopwords');
const Tokenizer = require('./tokenizer');
const Timer = require('./timer');
const logger = require('./logger');
const MemoryStorage = require('./memory-storage');
const fs = require('./mock-fs');

function loadPipelinesStr(instance, pipelines) {
  instance.loadPipelinesFromString(pipelines);
}

function traverse(obj, preffix) {
  if (typeof obj === 'string') {
    if (obj.startsWith('$')) {
      return (
        process.env[`${preffix}${obj.slice(1)}`] || process.env[obj.slice(1)]
      );
    }
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map((x) => traverse(x, preffix));
  }
  if (typeof obj === 'object') {
    const keys = Object.keys(obj);
    const result = {};
    for (let i = 0; i < keys.length; i += 1) {
      result[keys[i]] = traverse(obj[keys[i]], preffix);
    }
    return result;
  }
  return obj;
}

function containerBootstrap(
  inputSettings,
  mustLoadEnv,
  container,
  preffix,
  pipelines,
  parent
) {
  const srcSettings = inputSettings || {};
  const instance = container || new Container(preffix);
  instance.parent = parent;
  if (!preffix) {
    instance.register('fs', fs);
    instance.use(ArrToObj);
    instance.use(Normalizer);
    instance.use(ObjToArr);
    instance.use(Stemmer);
    instance.use(Stopwords);
    instance.use(Tokenizer);
    instance.use(Timer);
    instance.use(logger);
    instance.use(MemoryStorage);
  }
  const settings = srcSettings;
  if (srcSettings.env) {
    loadEnvFromJson(preffix, srcSettings.env);
  }
  let configuration;
  configuration = settings;
  configuration = traverse(configuration, preffix ? `${preffix}_` : '');
  if (configuration.settings) {
    const keys = Object.keys(configuration.settings);
    for (let i = 0; i < keys.length; i += 1) {
      instance.registerConfiguration(
        keys[i],
        configuration.settings[keys[i]],
        true
      );
    }
  }
  if (configuration.use) {
    for (let i = 0; i < configuration.use.length; i += 1) {
      const item = configuration.use[i];
      if (Array.isArray(item)) {
        instance.register(item[0], item[1]);
      } else {
        instance.use(item);
      }
    }
  }
  if (configuration.terraform) {
    for (let i = 0; i < configuration.terraform.length; i += 1) {
      const current = configuration.terraform[i];
      const terra = instance.get(current.className);
      instance.register(current.name, terra, true);
    }
  }
  if (configuration.childs) {
    instance.childs = configuration.childs;
  }
  if (pipelines) {
    for (let i = 0; i < pipelines.length; i += 1) {
      const pipeline = pipelines[i];
      instance.registerPipeline(
        pipeline.tag,
        pipeline.pipeline,
        pipeline.overwrite
      );
    }
  }
  if (configuration.pipelines) {
    loadPipelinesStr(instance, configuration.pipelines);
  }
  return instance;
}

module.exports = containerBootstrap;

}).call(this)}).call(this,require('_process'))
},{"./arr-to-obj":3,"./container":7,"./helper":11,"./logger":13,"./memory-storage":14,"./mock-fs":15,"./normalizer":16,"./obj-to-arr":17,"./stemmer":18,"./stopwords":19,"./timer":20,"./tokenizer":21,"_process":1}],7:[function(require,module,exports){
/*
 * Copyright (c) AXA Group Operations Spain S.A.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

const { compareWildcars } = require('./helper');
const DefaultCompiler = require('./default-compiler');
const logger = require('./logger');

/**
 * Container class
 */
class Container {
  /**
   * Constructor of the class.
   */
  constructor(hasPreffix = false) {
    this.classes = {};
    this.factory = {};
    this.pipelines = {};
    this.configurations = {};
    this.compilers = {};
    this.cache = {
      bestKeys: {},
      pipelines: {},
    };
    this.registerCompiler(DefaultCompiler);
    if (!hasPreffix) {
      this.use(logger);
    }
  }

  registerCompiler(Compiler, name) {
    const instance = new Compiler(this);
    this.compilers[name || instance.name] = instance;
  }

  addClass(clazz, name) {
    this.classes[name || clazz.name] = clazz;
  }

  toJSON(instance) {
    const result = instance.toJSON ? instance.toJSON() : { ...instance };
    result.className = instance.constructor.name;
    return result;
  }

  fromJSON(obj, settings) {
    const Clazz = this.classes[obj.className];
    let instance;
    if (Clazz) {
      instance = new Clazz(settings);
      if (instance.fromJSON) {
        instance.fromJSON(obj);
      } else {
        Object.assign(instance, obj);
      }
    } else {
      instance = { ...obj };
    }
    delete instance.className;
    return instance;
  }

  register(name, Clazz, isSingleton = true) {
    this.cache.bestKeys = {};
    const isClass = typeof Clazz === 'function';
    const item = { name, isSingleton };
    if (isSingleton) {
      item.instance = isClass ? new Clazz() : Clazz;
    } else {
      item.instance = isClass ? Clazz : Clazz.constructor;
    }
    this.factory[name] = item;
  }

  getBestKey(name) {
    if (this.cache.bestKeys[name] !== undefined) {
      return this.cache.bestKeys[name];
    }
    const keys = Object.keys(this.factory);
    for (let i = 0; i < keys.length; i += 1) {
      if (compareWildcars(name, keys[i])) {
        this.cache.bestKeys[name] = keys[i];
        return keys[i];
      }
    }
    this.cache.bestKeys[name] = null;
    return undefined;
  }

  get(name, settings) {
    let item = this.factory[name];
    if (!item) {
      if (this.parent) {
        return this.parent.get(name, settings);
      }
      const key = this.getBestKey(name);
      if (key) {
        item = this.factory[key];
      }
      if (!item) {
        return undefined;
      }
    }
    if (item.isSingleton) {
      if (item.instance && item.instance.applySettings) {
        item.instance.applySettings(item.instance.settings, settings);
      }
      return item.instance;
    }
    const Clazz = item.instance;
    return new Clazz(settings, this);
  }

  buildLiteral(subtype, step, value, context) {
    return {
      type: 'literal',
      subtype,
      src: step,
      value,
      context,
      container: this,
    };
  }

  resolvePathWithType(step, context, input, srcObject) {
    const tokens = step.split('.');
    let token = tokens[0].trim();
    if (!token) {
      token = step.startsWith('.') ? 'this' : 'context';
    }
    const isnum = /^\d+$/.test(token);
    if (isnum) {
      return this.buildLiteral('number', step, parseFloat(token), context);
    }
    if (token.startsWith('"')) {
      return this.buildLiteral(
        'string',
        step,
        token.replace(/^"(.+(?="$))"$/, '$1'),
        context
      );
    }
    if (token.startsWith("'")) {
      return this.buildLiteral(
        'string',
        step,
        token.replace(/^'(.+(?='$))'$/, '$1'),
        context
      );
    }
    if (token === 'true') {
      return this.buildLiteral('boolean', step, true, context);
    }
    if (token === 'false') {
      return this.buildLiteral('boolean', step, false, context);
    }
    let currentObject = context;
    if (token === 'input' || token === 'output') {
      currentObject = input;
    } else if (token && token !== 'context' && token !== 'this') {
      currentObject = this.get(token) || currentObject[token];
    } else if (token === 'this') {
      currentObject = srcObject;
    }
    for (let i = 1; i < tokens.length; i += 1) {
      const currentToken = tokens[i];
      if (!currentObject || !currentObject[currentToken]) {
        if (i < tokens.length - 1) {
          throw Error(`Path not found in pipeline "${step}"`);
        }
      }
      const prevCurrentObject = currentObject;
      currentObject = currentObject[currentToken];
      if (typeof currentObject === 'function') {
        currentObject = currentObject.bind(prevCurrentObject);
      }
    }
    if (typeof currentObject === 'function') {
      return {
        type: 'function',
        src: step,
        value: currentObject,
        context,
        container: this,
      };
    }
    return {
      type: 'reference',
      src: step,
      value: currentObject,
      context,
      container: this,
    };
  }

  resolvePath(step, context, input, srcObject) {
    const result = this.resolvePathWithType(step, context, input, srcObject);
    return result ? result.value : result;
  }

  setValue(path, valuePath, context, input, srcObject) {
    const value = this.resolvePath(valuePath, context, input, srcObject);
    const tokens = path.split('.');
    const newPath = tokens.slice(0, -1).join('.');
    const currentObject = this.resolvePath(newPath, context, input, srcObject);
    currentObject[tokens[tokens.length - 1]] = value;
  }

  incValue(path, valuePath, context, input, srcObject) {
    const value = this.resolvePath(valuePath, context, input, srcObject);
    const tokens = path.split('.');
    if (path.startsWith('.')) {
      tokens.push('this');
    }
    const newPath = tokens.slice(0, -1).join('.');
    const currentObject = this.resolvePath(newPath, context, input, srcObject);
    currentObject[tokens[tokens.length - 1]] += value;
  }

  decValue(path, valuePath, context, input, srcObject) {
    const value = this.resolvePath(valuePath, context, input, srcObject);
    const tokens = path.split('.');
    const newPath = tokens.slice(0, -1).join('.');
    const currentObject = this.resolvePath(newPath, context, input, srcObject);
    currentObject[tokens[tokens.length - 1]] -= value;
  }

  eqValue(pathA, pathB, srcContext, input, srcObject) {
    const context = srcContext;
    const valueA = this.resolvePath(pathA, context, input, srcObject);
    const valueB = this.resolvePath(pathB, context, input, srcObject);
    context.floating = valueA === valueB;
  }

  neqValue(pathA, pathB, srcContext, input, srcObject) {
    const context = srcContext;
    const valueA = this.resolvePath(pathA, context, input, srcObject);
    const valueB = this.resolvePath(pathB, context, input, srcObject);
    context.floating = valueA !== valueB;
  }

  gtValue(pathA, pathB, srcContext, input, srcObject) {
    const context = srcContext;
    const valueA = this.resolvePath(pathA, context, input, srcObject);
    const valueB = this.resolvePath(pathB, context, input, srcObject);
    context.floating = valueA > valueB;
  }

  geValue(pathA, pathB, srcContext, input, srcObject) {
    const context = srcContext;
    const valueA = this.resolvePath(pathA, context, input, srcObject);
    const valueB = this.resolvePath(pathB, context, input, srcObject);
    context.floating = valueA >= valueB;
  }

  ltValue(pathA, pathB, srcContext, input, srcObject) {
    const context = srcContext;
    const valueA = this.resolvePath(pathA, context, input, srcObject);
    const valueB = this.resolvePath(pathB, context, input, srcObject);
    context.floating = valueA < valueB;
  }

  leValue(pathA, pathB, srcContext, input, srcObject) {
    const context = srcContext;
    const valueA = this.resolvePath(pathA, context, input, srcObject);
    const valueB = this.resolvePath(pathB, context, input, srcObject);
    context.floating = valueA <= valueB;
  }

  deleteValue(path, context, input, srcObject) {
    const tokens = path.split('.');
    const newPath = tokens.slice(0, -1).join('.');
    const currentObject = this.resolvePath(newPath, context, input, srcObject);
    delete currentObject[tokens[tokens.length - 1]];
  }

  getValue(srcPath, context, input, srcObject) {
    const path = srcPath || 'floating';
    const tokens = path.split('.');
    const newPath = tokens.slice(0, -1).join('.');
    const currentObject = this.resolvePath(newPath, context, input, srcObject);
    return currentObject[tokens[tokens.length - 1]];
  }

  async runPipeline(srcPipeline, input, srcObject, depth = 0) {
    if (depth > 10) {
      throw new Error(
        'Pipeline depth is too high: perhaps you are using recursive pipelines?'
      );
    }
    const pipeline =
      typeof srcPipeline === 'string'
        ? this.getPipeline(srcPipeline)
        : srcPipeline;
    if (!pipeline) {
      throw new Error(`Pipeline not found ${srcPipeline}`);
    }
    if (!pipeline.compiler) {
      const tag = JSON.stringify(pipeline);
      this.registerPipeline(tag, pipeline, false);
      const built = this.getPipeline(tag);
      return built.compiler.execute(built.compiled, input, srcObject, depth);
    }
    return pipeline.compiler.execute(
      pipeline.compiled,
      input,
      srcObject,
      depth
    );
  }

  use(item, name, isSingleton, onlyIfNotExists = false) {
    let instance;
    if (typeof item === 'function') {
      if (item.name.endsWith('Compiler')) {
        this.registerCompiler(item);
        return item.name;
      }
      const Clazz = item;
      instance = new Clazz({ container: this });
    } else {
      instance = item;
    }
    if (instance.register) {
      instance.register(this);
    }
    const tag = instance.settings ? instance.settings.tag : undefined;
    const itemName =
      name || instance.name || tag || item.name || instance.constructor.name;
    if (!onlyIfNotExists || !this.get(itemName)) {
      this.register(itemName, instance, isSingleton);
    }
    return itemName;
  }

  getCompiler(name) {
    const compiler = this.compilers[name];
    if (compiler) {
      return compiler;
    }
    if (this.parent) {
      return this.parent.getCompiler(name);
    }
    return this.compilers.default;
  }

  buildPipeline(srcPipeline, prevPipeline = []) {
    const pipeline = [];
    if (srcPipeline && srcPipeline.length > 0) {
      for (let i = 0; i < srcPipeline.length; i += 1) {
        const line = srcPipeline[i];
        if (line.trim() === '$super') {
          for (let j = 0; j < prevPipeline.length; j += 1) {
            const s = prevPipeline[j].trim();
            if (!s.startsWith('->')) {
              pipeline.push(prevPipeline[j]);
            }
          }
        } else {
          pipeline.push(line);
        }
      }
    }
    const compilerName =
      !pipeline.length || !pipeline[0].startsWith('// compiler=')
        ? 'default'
        : pipeline[0].slice(12);
    const compiler = this.getCompiler(compilerName);
    const compiled = compiler.compile(pipeline);
    return {
      pipeline,
      compiler,
      compiled,
    };
  }

  registerPipeline(tag, pipeline, overwrite = true) {
    if (overwrite || !this.pipelines[tag]) {
      this.cache.pipelines = {};
      const prev = this.getPipeline(tag);
      this.pipelines[tag] = this.buildPipeline(
        pipeline,
        prev ? prev.pipeline : []
      );
    }
  }

  registerPipelineForChilds(childName, tag, pipeline, overwrite = true) {
    if (!this.childPipelines) {
      this.childPipelines = {};
    }
    if (!this.childPipelines[childName]) {
      this.childPipelines[childName] = [];
    }
    this.childPipelines[childName].push({ tag, pipeline, overwrite });
  }

  getPipeline(tag) {
    if (this.pipelines[tag]) {
      return this.pipelines[tag];
    }
    if (this.cache.pipelines[tag] !== undefined) {
      return this.cache.pipelines[tag] || undefined;
    }
    const keys = Object.keys(this.pipelines);
    for (let i = 0; i < keys.length; i += 1) {
      if (compareWildcars(tag, keys[i])) {
        this.cache.pipelines[tag] = this.pipelines[keys[i]];
        return this.pipelines[keys[i]];
      }
    }
    this.cache.pipelines[tag] = null;
    return undefined;
  }

  registerConfiguration(tag, configuration, overwrite = true) {
    if (overwrite || !this.configurations[tag]) {
      this.configurations[tag] = configuration;
    }
  }

  getConfiguration(tag) {
    if (this.configurations[tag]) {
      return this.configurations[tag];
    }
    const keys = Object.keys(this.configurations);
    for (let i = 0; i < keys.length; i += 1) {
      if (compareWildcars(tag, keys[i])) {
        return this.configurations[keys[i]];
      }
    }
    return undefined;
  }

  loadPipelinesFromString(str = '') {
    const lines = str.split(/\n|\r|\r\n/);
    let currentName = '';
    let currentPipeline = [];
    let currentTitle = '';
    for (let i = 0; i < lines.length; i += 1) {
      const line = lines[i];
      if (line !== '') {
        if (line.startsWith('# ')) {
          if (currentName) {
            if (
              currentTitle &&
              !['default', 'pipelines'].includes(currentTitle.toLowerCase())
            ) {
              this.registerPipelineForChilds(
                currentTitle,
                currentName,
                currentPipeline
              );
            } else {
              this.registerPipeline(currentName, currentPipeline);
            }
          }
          currentTitle = line.slice(1).trim();
          currentName = '';
          currentPipeline = [];
        } else if (line.startsWith('## ')) {
          if (currentName) {
            if (
              currentTitle &&
              !['default', 'pipelines'].includes(currentTitle.toLowerCase())
            ) {
              this.registerPipelineForChilds(
                currentTitle,
                currentName,
                currentPipeline
              );
            } else {
              this.registerPipeline(currentName, currentPipeline);
            }
          }
          currentName = line.slice(2).trim();
          currentPipeline = [];
        } else if (currentName) {
          currentPipeline.push(line);
        }
      }
    }
    if (currentName) {
      if (
        currentTitle &&
        !['default', 'pipelines'].includes(currentTitle.toLowerCase())
      ) {
        this.registerPipelineForChilds(
          currentTitle,
          currentName,
          currentPipeline
        );
      } else {
        this.registerPipeline(currentName, currentPipeline);
      }
    }
  }

  async start(pipelineName = 'main') {
    const keys = Object.keys(this.factory);
    for (let i = 0; i < keys.length; i += 1) {
      const current = this.factory[keys[i]];
      if (current.isSingleton && current.instance && current.instance.start) {
        await current.instance.start();
      }
    }
    if (this.getPipeline(pipelineName)) {
      await this.runPipeline(pipelineName, {}, this);
    }
  }
}

const defaultContainer = new Container();

module.exports = {
  Container,
  defaultContainer,
};

},{"./default-compiler":9,"./helper":11,"./logger":13}],8:[function(require,module,exports){
/*
 * Copyright (c) AXA Group Operations Spain S.A.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

const { defaultContainer } = require('./container');
const Clonable = require('./clonable');

class Context extends Clonable {
  constructor(settings = {}, container = undefined) {
    super(
      {
        settings: {},
        container: settings.container || container || defaultContainer,
      },
      container
    );
    this.applySettings(this.settings, settings);
    if (!this.settings.tag) {
      this.settings.tag = 'context';
    }
    this.applySettings(
      this.settings,
      this.container.getConfiguration(this.settings.tag)
    );
  }

  getStorage() {
    const storage = this.container.get(this.settings.storageName || 'storage');
    if (!storage) {
      throw new Error('Storage not found');
    }
    return storage;
  }

  getContext(key) {
    const storage = this.getStorage();
    return storage.read(`${this.settings.tag}-${key}`);
  }

  setContext(key, value) {
    const storage = this.getStorage();
    const change = {
      [key]: value,
    };
    return storage.write(change);
  }

  async getContextValue(key, valueName) {
    const context = await this.getContext(key);
    return context ? context[valueName] : undefined;
  }

  async setContextValue(key, valueName, value) {
    let context = await this.getContext(key);
    if (!context) {
      context = {};
    }
    context[valueName] = value;
    return this.setContext(key, context);
  }
}

module.exports = Context;

},{"./clonable":5,"./container":7}],9:[function(require,module,exports){
/*
 * Copyright (c) AXA Group Operations Spain S.A.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

class DefaultCompiler {
  constructor(container) {
    this.container = container.container || container;
    this.name = 'default';
  }

  getTokenFromWord(word) {
    if (word.startsWith('//')) {
      return {
        type: 'comment',
        value: word,
      };
    }
    if (
      [
        'set',
        'delete',
        'get',
        'inc',
        'dec',
        'eq',
        'neq',
        'gt',
        'ge',
        'lt',
        'le',
        'label',
        'goto',
        'jne',
        'je',
      ].includes(word)
    ) {
      return {
        type: word,
        arguments: [],
      };
    }
    if (word.startsWith('$')) {
      return {
        type: 'call',
        value: word.slice(1),
      };
    }
    return {
      type: 'reference',
      value: word,
    };
  }

  compile(pipeline) {
    const result = [];
    for (let i = 0; i < pipeline.length; i += 1) {
      const line = pipeline[i].trim();
      const words = line.split(' ');
      const tokens = [];
      let currentString = '';
      let currentQuote;
      for (let j = 0; j < words.length; j += 1) {
        const word = words[j];
        let processed = false;
        if (!currentQuote) {
          if (word.startsWith('"')) {
            currentString = word;
            processed = true;
            currentQuote = '"';
            if (word.endsWith('"')) {
              currentQuote = undefined;
              tokens.push(this.getTokenFromWord(currentString));
            }
          } else if (word.startsWith("'")) {
            currentString = word;
            processed = true;
            currentQuote = "'";
            if (word.endsWith("'")) {
              currentQuote = undefined;
              tokens.push(this.getTokenFromWord(currentString));
            }
          }
        } else {
          currentString = `${currentString} ${word}`;
          processed = true;
          if (word.endsWith(currentQuote)) {
            currentQuote = undefined;
            tokens.push(this.getTokenFromWord(currentString));
          }
        }
        if (!processed) {
          tokens.push(this.getTokenFromWord(word));
        }
      }
      result.push(tokens);
    }
    return result;
  }

  executeCall(firstToken, context, input, srcObject, depth) {
    const pipeline = this.container.getPipeline(firstToken.value);
    if (!pipeline) {
      throw new Error(`Pipeline $${firstToken.value} not found.`);
    }
    return this.container.runPipeline(pipeline, input, srcObject, depth + 1);
  }

  executeReference(step, firstToken, context, input, srcObject) {
    const currentObject = this.container.resolvePath(
      firstToken.value,
      context,
      input,
      srcObject
    );
    const args = [];
    for (let i = 1; i < step.length; i += 1) {
      args.push(
        this.container.resolvePathWithType(
          step[i].value,
          context,
          input,
          srcObject
        )
      );
    }
    if (!currentObject) {
      throw new Error(`Method not found for step ${JSON.stringify(step)}`);
    }
    const method = currentObject.run || currentObject;
    if (typeof method === 'function') {
      return typeof currentObject === 'function'
        ? method(input, ...args)
        : method.bind(currentObject)(input, ...args);
    }
    return method;
  }

  doGoto(label, srcContext) {
    const context = srcContext;
    const index = context.labels[label];
    context.cursor = index;
  }

  async executeAction(step, context, input, srcObject, depth) {
    let firstToken = step[0];
    if (firstToken && firstToken.value && firstToken.value.startsWith('->')) {
      if (depth > 0) {
        return input;
      }
      firstToken = { ...firstToken };
      firstToken.value = firstToken.value.slice(2);
    }
    switch (firstToken.type) {
      case 'set':
        this.container.setValue(
          step[1].value,
          step[2] ? step[2].value : undefined,
          context,
          input,
          srcObject
        );
        break;
      case 'delete':
        this.container.deleteValue(step[1].value, context, input, srcObject);
        break;
      case 'get':
        return this.container.getValue(
          step[1] ? step[1].value : undefined,
          context,
          input,
          srcObject
        );
      case 'inc':
        this.container.incValue(
          step[1] ? step[1].value : undefined,
          step[2] ? step[2].value : '1',
          context,
          input,
          srcObject
        );
        break;
      case 'dec':
        this.container.decValue(
          step[1] ? step[1].value : undefined,
          step[2] ? step[2].value : '1',
          context,
          input,
          srcObject
        );
        break;
      case 'eq':
        this.container.eqValue(
          step[1] ? step[1].value : undefined,
          step[2] ? step[2].value : undefined,
          context,
          input,
          srcObject
        );
        break;
      case 'neq':
        this.container.neqValue(
          step[1] ? step[1].value : undefined,
          step[2] ? step[2].value : undefined,
          context,
          input,
          srcObject
        );
        break;
      case 'gt':
        this.container.gtValue(
          step[1] ? step[1].value : undefined,
          step[2] ? step[2].value : undefined,
          context,
          input,
          srcObject
        );
        break;
      case 'ge':
        this.container.geValue(
          step[1] ? step[1].value : undefined,
          step[2] ? step[2].value : undefined,
          context,
          input,
          srcObject
        );
        break;
      case 'lt':
        this.container.ltValue(
          step[1] ? step[1].value : undefined,
          step[2] ? step[2].value : undefined,
          context,
          input,
          srcObject
        );
        break;
      case 'le':
        this.container.leValue(
          step[1] ? step[1].value : undefined,
          step[2] ? step[2].value : undefined,
          context,
          input,
          srcObject
        );
        break;
      case 'goto':
        this.doGoto(step[1].value, context);
        break;
      case 'jne':
        if (!context.floating) {
          this.doGoto(step[1].value, context);
        }
        break;
      case 'je':
        if (context.floating) {
          this.doGoto(step[1].value, context);
        }
        break;
      case 'call':
        return this.executeCall(firstToken, context, input, srcObject, depth);
      case 'reference':
        return this.executeReference(
          step,
          firstToken,
          context,
          input,
          srcObject
        );
      default:
        break;
    }
    return input;
  }

  findLabels(compiled, srcLabels) {
    const labels = srcLabels;
    for (let i = 0; i < compiled.length; i += 1) {
      const current = compiled[i];
      if (current[0].type === 'label') {
        labels[current[1].value] = i;
      }
    }
  }

  async execute(compiled, srcInput, srcObject, depth) {
    let input = srcInput;
    const context = { cursor: 0, labels: {} };
    this.findLabels(compiled, context.labels);
    while (context.cursor < compiled.length) {
      input = await this.executeAction(
        compiled[context.cursor],
        context,
        input,
        srcObject,
        depth
      );
      context.cursor += 1;
    }
    return input;
  }
}

module.exports = DefaultCompiler;

},{}],10:[function(require,module,exports){
/*
 * Copyright (c) AXA Group Operations Spain S.A.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

const containerBootstrap = require('./container-bootstrap');

class Dock {
  constructor() {
    this.containers = {};
  }

  getContainer(name) {
    return this.containers[name || 'default'];
  }

  async createContainer(
    name,
    settings,
    srcMustLoadEnv,
    preffix,
    parent,
    pipelines
  ) {
    const mustLoadEnv = srcMustLoadEnv === undefined ? true : srcMustLoadEnv;
    if (typeof name !== 'string') {
      settings = name;
      name = '';
    }
    if (!settings) {
      if (name === 'default' || name === '') {
        settings = 'conf.json';
      }
    }
    if (!this.containers[name]) {
      const container = containerBootstrap(
        settings,
        mustLoadEnv,
        undefined,
        preffix,
        pipelines
      );
      container.name = name;
      this.containers[name] = container;
      container.dock = this;
      container.parent = parent;
      await container.start();
      if (container.childs) {
        await this.buildChilds(container);
      }
    }
    return this.containers[name];
  }

  async buildChilds(container) {
    if (container && container.childs) {
      const keys = Object.keys(container.childs);
      const childs = {};
      for (let i = 0; i < keys.length; i += 1) {
        const settings = container.childs[keys[i]];
        settings.isChild = true;
        if (!settings.pathPipeline) {
          settings.pathPipeline = `${keys[i]}_pipeline.md`;
        }
        childs[keys[i]] = await this.createContainer(
          keys[i],
          settings,
          false,
          keys[i],
          container,
          container.childPipelines
            ? container.childPipelines[keys[i]]
            : undefined
        );
      }
      container.childs = childs;
    }
  }

  async terraform(settings, mustLoadEnv = true) {
    const defaultContainer = await this.createContainer(
      'default',
      settings,
      mustLoadEnv,
      ''
    );
    return defaultContainer;
  }

  start(settings, mustLoadEnv = true) {
    return this.terraform(settings, mustLoadEnv);
  }
}

const dock = new Dock();

module.exports = dock;

},{"./container-bootstrap":6}],11:[function(require,module,exports){
(function (process){(function (){
/*
 * Copyright (c) AXA Group Operations Spain S.A.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

const rsAstralRange = '\\ud800-\\udfff';
const rsComboMarksRange = '\\u0300-\\u036f';
const reComboHalfMarksRange = '\\ufe20-\\ufe2f';
const rsComboSymbolsRange = '\\u20d0-\\u20ff';
const rsComboMarksExtendedRange = '\\u1ab0-\\u1aff';
const rsComboMarksSupplementRange = '\\u1dc0-\\u1dff';
const rsComboRange =
  rsComboMarksRange +
  reComboHalfMarksRange +
  rsComboSymbolsRange +
  rsComboMarksExtendedRange +
  rsComboMarksSupplementRange;
const rsVarRange = '\\ufe0e\\ufe0f';
const rsAstral = `[${rsAstralRange}]`;
const rsCombo = `[${rsComboRange}]`;
const rsFitz = '\\ud83c[\\udffb-\\udfff]';
const rsModifier = `(?:${rsCombo}|${rsFitz})`;
const rsNonAstral = `[^${rsAstralRange}]`;
const rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}';
const rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]';
const rsZWJ = '\\u200d';
const reOptMod = `${rsModifier}?`;
const rsOptVar = `[${rsVarRange}]?`;
const rsOptJoin = `(?:${rsZWJ}(?:${[rsNonAstral, rsRegional, rsSurrPair].join(
  '|'
)})${rsOptVar + reOptMod})*`;
const rsSeq = rsOptVar + reOptMod + rsOptJoin;
const rsNonAstralCombo = `${rsNonAstral}${rsCombo}?`;
const rsSymbol = `(?:${[
  rsNonAstralCombo,
  rsCombo,
  rsRegional,
  rsSurrPair,
  rsAstral,
].join('|')})`;

/* eslint-disable no-misleading-character-class */
const reHasUnicode = RegExp(
  `[${rsZWJ + rsAstralRange + rsComboRange + rsVarRange}]`
);
const reUnicode = RegExp(`${rsFitz}(?=${rsFitz})|${rsSymbol + rsSeq}`, 'g');
/* eslint-enable no-misleading-character-class */

const hasUnicode = (str) => reHasUnicode.test(str);
const unicodeToArray = (str) => str.match(reUnicode) || [];
const asciiToArray = (str) => str.split('');
const stringToArray = (str) =>
  hasUnicode(str) ? unicodeToArray(str) : asciiToArray(str);

function compareWildcars(text, rule) {
  const escapeRegex = (str) => str.replace(/([.*+^=!:${}()|[\]/\\])/g, '\\$1');
  const regexRule = `^${rule.split('*').map(escapeRegex).join('.*')}$`.replace(
    /\?/g,
    '.'
  );
  return new RegExp(regexRule).test(text);
}

function loadEnvFromJson(preffix, json = {}) {
  const keys = Object.keys(json);
  preffix = preffix ? `${preffix}_` : '';
  for (let i = 0; i < keys.length; i += 1) {
    const key = `${preffix}${keys[i]}`;
    process.env[key] = json[keys[i]];
  }
}

module.exports = {
  hasUnicode,
  unicodeToArray,
  asciiToArray,
  stringToArray,
  compareWildcars,
  loadEnvFromJson,
};

}).call(this)}).call(this,require('_process'))
},{"_process":1}],12:[function(require,module,exports){
/*
 * Copyright (c) AXA Group Operations Spain S.A.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

const Among = require('./among');
const ArrToObj = require('./arr-to-obj');
const BaseStemmer = require('./base-stemmer');
const containerBootstrap = require('./container-bootstrap');
const Clonable = require('./clonable');
const { Container, defaultContainer } = require('./container');
const Normalizer = require('./normalizer');
const ObjToArr = require('./obj-to-arr');
const Stemmer = require('./stemmer');
const Stopwords = require('./stopwords');
const Tokenizer = require('./tokenizer');
const Timer = require('./timer');
const logger = require('./logger');
const {
  hasUnicode,
  unicodeToArray,
  asciiToArray,
  stringToArray,
  compareWildcars,
  loadEnv,
} = require('./helper');
const MemoryStorage = require('./memory-storage');
const uuid = require('./uuid');
const dock = require('./dock');
const Context = require('./context');

async function dockStart(settings, mustLoadEnv) {
  await dock.start(settings, mustLoadEnv);
  return dock;
}

module.exports = {
  Among,
  ArrToObj,
  BaseStemmer,
  containerBootstrap,
  Clonable,
  Container,
  defaultContainer,
  hasUnicode,
  unicodeToArray,
  asciiToArray,
  stringToArray,
  compareWildcars,
  loadEnv,
  Normalizer,
  ObjToArr,
  Stemmer,
  Stopwords,
  Tokenizer,
  Timer,
  logger,
  MemoryStorage,
  uuid,
  dock,
  Context,
  dockStart,
};

},{"./among":2,"./arr-to-obj":3,"./base-stemmer":4,"./clonable":5,"./container":7,"./container-bootstrap":6,"./context":8,"./dock":10,"./helper":11,"./logger":13,"./memory-storage":14,"./normalizer":16,"./obj-to-arr":17,"./stemmer":18,"./stopwords":19,"./timer":20,"./tokenizer":21,"./uuid":22}],13:[function(require,module,exports){
/*
 * Copyright (c) AXA Group Operations Spain S.A.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

class Logger {
  constructor() {
    this.name = 'logger';
  }

  debug(...args) {
    // eslint-disable-next-line no-console
    console.debug(...args);
  }

  info(...args) {
    // eslint-disable-next-line no-console
    console.info(...args);
  }

  warn(...args) {
    // eslint-disable-next-line no-console
    console.warn(...args);
  }

  error(...args) {
    // eslint-disable-next-line no-console
    console.error(...args);
  }

  log(...args) {
    // eslint-disable-next-line no-console
    console.log(...args);
  }

  trace(...args) {
    // eslint-disable-next-line no-console
    console.trace(...args);
  }

  fatal(...args) {
    // eslint-disable-next-line no-console
    console.error(...args);
  }
}

const logger = new Logger();

module.exports = logger;

},{}],14:[function(require,module,exports){
/*
 * Copyright (c) AXA Group Operations Spain S.A.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

const { defaultContainer } = require('./container');
const Clonable = require('./clonable');

class MemoryStorage extends Clonable {
  constructor(settings = {}, container = undefined) {
    super(
      {
        settings: {},
        container: settings.container || container || defaultContainer,
      },
      container
    );
    this.applySettings(this.settings, settings);
    this.applySettings(this.settings, { etag: 1, memory: {} });
    if (!this.settings.tag) {
      this.settings.tag = 'storage';
    }
    this.applySettings(
      this.settings,
      this.container.getConfiguration(this.settings.tag)
    );
  }

  read(keys) {
    return new Promise((resolve) => {
      const data = {};
      if (!Array.isArray(keys)) {
        keys = [keys];
      }
      keys.forEach((key) => {
        const item = this.settings.memory[key];
        if (item) {
          data[key] = JSON.parse(item);
        }
      });
      resolve(data);
    });
  }

  saveItem(key, item) {
    const clone = { ...item };
    clone.eTag = this.settings.etag.toString();
    this.settings.etag += 1;
    this.settings.memory[key] = JSON.stringify(clone);
    return clone;
  }

  write(changes) {
    return new Promise((resolve, reject) => {
      Object.keys(changes).forEach((key) => {
        const newItem = changes[key];
        const oldStr = this.settings.memory[key];
        if (!oldStr || newItem.eTag === '*') {
          return resolve(this.saveItem(key, newItem));
        }
        const oldItem = JSON.parse(oldStr);
        if (newItem.eTag !== oldItem.eTag) {
          return reject(
            new Error(`Error writing "${key}" due to eTag conflict.`)
          );
        }
        return resolve(this.saveItem(key, newItem));
      });
    });
  }

  delete(keys) {
    return new Promise((resolve) => {
      keys.forEach((key) => delete this.settings.memory[key]);
      resolve();
    });
  }
}

module.exports = MemoryStorage;

},{"./clonable":5,"./container":7}],15:[function(require,module,exports){
/*
 * Copyright (c) AXA Group Operations Spain S.A.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

function readFile() {
  return new Promise((resolve) => {
    resolve(undefined);
  });
}

function writeFile() {
  return new Promise((resolve, reject) => {
    reject(new Error('File cannot be written in web'));
  });
}

function existsSync() {
  return false;
}

function lstatSync() {
  return undefined;
}

function readFileSync() {
  return undefined;
}

module.exports = {
  readFile,
  writeFile,
  existsSync,
  lstatSync,
  readFileSync,
  name: 'fs',
};

},{}],16:[function(require,module,exports){
/*
 * Copyright (c) AXA Group Operations Spain S.A.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

const { defaultContainer } = require('./container');

class Normalizer {
  constructor(container = defaultContainer) {
    this.container = container.container || container;
    this.name = 'normalize';
  }

  normalize(text) {
    return text
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  }

  run(srcInput) {
    const input = srcInput;
    const locale = input.locale || 'en';
    const normalizer = this.container.get(`normalizer-${locale}`) || this;
    input.text = normalizer.normalize(input.text, input);
    return input;
  }
}

module.exports = Normalizer;

},{"./container":7}],17:[function(require,module,exports){
/*
 * Copyright (c) AXA Group Operations Spain S.A.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
const { defaultContainer } = require('./container');

class ObjToArr {
  constructor(container = defaultContainer) {
    this.container = container.container || container;
    this.name = 'objToArr';
  }

  static objToArr(obj) {
    return Object.keys(obj);
  }

  run(input) {
    if (!input.tokens) {
      return ObjToArr.objToArr(input);
    }
    input.tokens = ObjToArr.objToArr(input.tokens);
    return input;
  }
}

module.exports = ObjToArr;

},{"./container":7}],18:[function(require,module,exports){
/*
 * Copyright (c) AXA Group Operations Spain S.A.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
const { defaultContainer } = require('./container');

class Stemmer {
  constructor(container = defaultContainer) {
    this.container = container.container || container;
    this.name = 'stem';
  }

  stem(tokens) {
    return tokens;
  }

  getStemmer(srcInput) {
    const input = srcInput;
    const locale =
      input.locale || input.settings ? input.settings.locale || 'en' : 'en';
    let stemmer = this.container.get(`stemmer-${locale}`);
    if (!stemmer) {
      const stemmerBert = this.container.get(`stemmer-bert`);
      if (stemmerBert && stemmerBert.activeFor(locale)) {
        stemmer = stemmerBert;
      } else {
        stemmer = this;
      }
    }
    return stemmer;
  }

  async addForTraining(srcInput) {
    const stemmer = this.getStemmer(srcInput);
    if (stemmer.addUtterance) {
      await stemmer.addUtterance(srcInput.utterance, srcInput.intent);
    }
    return srcInput;
  }

  async train(srcInput) {
    const stemmer = this.getStemmer(srcInput);
    if (stemmer.innerTrain) {
      await stemmer.innerTrain();
    }
    return srcInput;
  }

  async run(srcInput) {
    const input = srcInput;
    const stemmer = this.getStemmer(input);
    input.tokens = await stemmer.stem(input.tokens, input);
    return input;
  }
}

module.exports = Stemmer;

},{"./container":7}],19:[function(require,module,exports){
/*
 * Copyright (c) AXA Group Operations Spain S.A.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
const { defaultContainer } = require('./container');

class Stopwords {
  constructor(container = defaultContainer) {
    this.container = container.container || container;
    this.name = 'removeStopwords';
    this.dictionary = {};
  }

  build(list) {
    for (let i = 0; i < list.length; i += 1) {
      this.dictionary[list[i]] = true;
    }
  }

  isNotStopword(token) {
    return !this.dictionary[token];
  }

  isStopword(token) {
    return !!this.dictionary[token];
  }

  removeStopwords(tokens) {
    return tokens.filter((x) => this.isNotStopword(x));
  }

  run(srcInput) {
    if (srcInput.settings && srcInput.settings.keepStopwords === false) {
      const input = srcInput;
      const locale = input.locale || 'en';
      const remover = this.container.get(`stopwords-${locale}`) || this;
      input.tokens = remover
        .removeStopwords(input.tokens, input)
        .filter((x) => x);
      return input;
    }
    return srcInput;
  }
}

module.exports = Stopwords;

},{"./container":7}],20:[function(require,module,exports){
/*
 * Copyright (c) AXA Group Operations Spain S.A.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

const { defaultContainer } = require('./container');

/**
 * Class for a simple timer
 */
class Timer {
  /**
   * Constructor of the class
   * @param {object} container Parent container
   */
  constructor(container = defaultContainer) {
    this.container = container.container || container;
    this.name = 'timer';
  }

  /**
   * Starts the timer
   * @param {object} input
   */
  start(input) {
    if (input) {
      input.hrstart = new Date();
    }
    return input;
  }

  /**
   * Stops the timer
   * @param {object} srcInput
   */
  stop(srcInput) {
    const input = srcInput;
    if (input && input.hrstart) {
      const hrend = new Date();
      input.elapsed = hrend.getTime() - input.hrstart.getTime();
      delete input.hrstart;
    }
    return input;
  }

  run(srcInput) {
    this.start(srcInput);
  }
}

module.exports = Timer;

},{"./container":7}],21:[function(require,module,exports){
/*
 * Copyright (c) AXA Group Operations Spain S.A.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

const { defaultContainer } = require('./container');
const Normalizer = require('./normalizer');

class Tokenizer {
  constructor(container = defaultContainer, shouldNormalize = false) {
    this.container = container.container || container;

    this.name = 'tokenize';
    this.shouldNormalize = shouldNormalize;
  }

  getNormalizer() {
    if (!this.normalizer) {
      this.normalizer =
        this.container.get(`normalizer-${this.name.slice(-2)}`) ||
        new Normalizer();
    }
    return this.normalizer;
  }

  normalize(text, force) {
    if ((force === undefined && this.shouldNormalize) || force === true) {
      const normalizer = this.getNormalizer();
      return normalizer.normalize(text);
    }
    return text;
  }

  innerTokenize(text) {
    return text.split(/[\s,.!?;:([\]'"¡¿)/]+/).filter((x) => x);
  }

  tokenize(text, normalize) {
    let result;
    if (this.cache) {
      const now = new Date();
      const diff = Math.abs(now.getTime() - this.cache.created) / 3600000;
      if (diff > 1) {
        this.cache = undefined;
      }
    }
    if (!this.cache) {
      this.cache = {
        created: new Date().getTime(),
        normalized: {},
        nonNormalized: {},
      };
    } else {
      if (normalize) {
        if (Object.prototype.hasOwnProperty.call(this.cache.normalized, text)) {
          result = this.cache.normalized[text];
        }
      } else if (
        Object.prototype.hasOwnProperty.call(this.cache.nonNormalized, text)
      ) {
        result = this.cache.nonNormalized[text];
      }
      if (result) {
        return result;
      }
    }
    result = this.innerTokenize(this.normalize(text, normalize), normalize);
    if (normalize) {
      this.cache.normalized[text] = result;
    } else {
      this.cache.nonNormalized[text] = result;
    }
    return result;
  }

  async run(srcInput) {
    const input = srcInput;
    const locale = input.locale || 'en';
    let tokenizer = this.container.get(`tokenizer-${locale}`);
    if (!tokenizer) {
      const tokenizerBert = this.container.get(`tokenizer-bert`);
      if (tokenizerBert && tokenizerBert.activeFor(locale)) {
        tokenizer = tokenizerBert;
      } else {
        tokenizer = this;
      }
    }
    const tokens = await tokenizer.tokenize(input.text, input);
    input.tokens = tokens.filter((x) => x);
    return input;
  }
}

module.exports = Tokenizer;

},{"./container":7,"./normalizer":16}],22:[function(require,module,exports){
/*
 * Copyright (c) AXA Group Operations Spain S.A.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

function uuid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
}

module.exports = uuid;

},{}],23:[function(require,module,exports){
/*
 * Copyright (c) AXA Group Operations Spain S.A.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

const LangEn = require('./lang-en');
const TokenizerEn = require('./tokenizer-en');
const StemmerEn = require('./stemmer-en');
const StopwordsEn = require('./stopwords-en');
const NormalizerEn = require('./normalizer-en');
const SentimentEn = require('./sentiment/sentiment_en');
const registerTrigrams = require('./trigrams');

module.exports = {
  LangEn,
  StemmerEn,
  StopwordsEn,
  TokenizerEn,
  NormalizerEn,
  SentimentEn,
  registerTrigrams,
};

},{"./lang-en":24,"./normalizer-en":25,"./sentiment/sentiment_en":26,"./stemmer-en":27,"./stopwords-en":28,"./tokenizer-en":29,"./trigrams":30}],24:[function(require,module,exports){
/*
 * Copyright (c) AXA Group Operations Spain S.A.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

const TokenizerEn = require('./tokenizer-en');
const StemmerEn = require('./stemmer-en');
const StopwordsEn = require('./stopwords-en');
const NormalizerEn = require('./normalizer-en');
const SentimentEn = require('./sentiment/sentiment_en');
const registerTrigrams = require('./trigrams');

class LangEn {
  register(container) {
    container.use(TokenizerEn);
    container.use(StemmerEn);
    container.use(StopwordsEn);
    container.use(NormalizerEn);
    container.register('sentiment-en', SentimentEn);
    registerTrigrams(container);
  }
}

module.exports = LangEn;

},{"./normalizer-en":25,"./sentiment/sentiment_en":26,"./stemmer-en":27,"./stopwords-en":28,"./tokenizer-en":29,"./trigrams":30}],25:[function(require,module,exports){
/*
 * Copyright (c) AXA Group Operations Spain S.A.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

const { Normalizer } = require('@nlpjs/core');

class NormalizerEn extends Normalizer {
  constructor(container) {
    super(container);
    this.name = 'normalizer-en';
  }

  normalize(text) {
    return text
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  }

  run(srcInput) {
    const input = srcInput;
    input.text = this.normalize(input.text, input);
    return input;
  }
}

module.exports = NormalizerEn;

},{"@nlpjs/core":12}],26:[function(require,module,exports){
/*
 * Copyright (c) AXA Group Operations Spain S.A.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

module.exports = {
  senticon: undefined,
  afinn: undefined,
  pattern: undefined,
  negations: { words: [] },
};

},{}],27:[function(require,module,exports){
/*
 * Copyright (c) AXA Group Operations Spain S.A.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

const { Among, BaseStemmer } = require('@nlpjs/core');
const TokenizerEn = require('./tokenizer-en');

/**
 * This class was automatically generated by a Snowball to JSX compiler
 * It implements the stemming algorithm defined by a snowball script.
 */
/* eslint-disable */
class StemmerEn extends BaseStemmer {
  constructor(container) {
    super(container);
    this.name = 'stemmer-en';
    this.B_Y_found = false;
    this.I_p2 = 0;
    this.I_p1 = 0;
  }

  getTokenizer() {
    if (!this.tokenizer) {
      this.tokenizer =
        this.container.get(`tokenizer-${this.name.slice(-2)}`) ||
        new TokenizerEn();
      if (this.tokenizer.constructor.name === 'Tokenizer') {
        this.tokenizer = new TokenizerEn();
      }
    }
    return this.tokenizer;
  }

  r_prelude() {
    let v_1;
    let v_2;
    let v_3;
    let v_4;
    let v_5;
    // (, line 25
    // unset Y_found, line 26
    this.B_Y_found = false;
    // do, line 27
    v_1 = this.cursor;
    let lab0 = true;
    while (lab0 == true) {
      lab0 = false;
      // (, line 27
      // [, line 27
      this.bra = this.cursor;
      // literal, line 27
      if (!this.eq_s("'")) {
        break;
      }
      // ], line 27
      this.ket = this.cursor;
      // delete, line 27
      if (!this.slice_del()) {
        return false;
      }
    }
    this.cursor = v_1;
    // do, line 28
    v_2 = this.cursor;
    let lab1 = true;
    while (lab1 == true) {
      lab1 = false;
      // (, line 28
      // [, line 28
      this.bra = this.cursor;
      // literal, line 28
      if (!this.eq_s('y')) {
        break;
      }
      // ], line 28
      this.ket = this.cursor;
      // <-, line 28
      if (!this.slice_from('Y')) {
        return false;
      }
      // set Y_found, line 28
      this.B_Y_found = true;
    }
    this.cursor = v_2;
    // do, line 29
    v_3 = this.cursor;
    let lab2 = true;
    while (lab2 == true) {
      lab2 = false;
      // repeat, line 29
      replab3: while (true) {
        v_4 = this.cursor;
        let lab4 = true;
        lab4: while (lab4 == true) {
          lab4 = false;
          // (, line 29
          // goto, line 29
          golab5: while (true) {
            v_5 = this.cursor;
            let lab6 = true;
            while (lab6 == true) {
              lab6 = false;
              // (, line 29
              if (!this.in_grouping(StemmerEn.g_v, 97, 121)) {
                break;
              }
              // [, line 29
              this.bra = this.cursor;
              // literal, line 29
              if (!this.eq_s('y')) {
                break;
              }
              // ], line 29
              this.ket = this.cursor;
              this.cursor = v_5;
              break golab5;
            }
            this.cursor = v_5;
            if (this.cursor >= this.limit) {
              break lab4;
            }
            this.cursor++;
          }
          // <-, line 29
          if (!this.slice_from('Y')) {
            return false;
          }
          // set Y_found, line 29
          this.B_Y_found = true;
          continue replab3;
        }
        this.cursor = v_4;
        break;
      }
    }
    this.cursor = v_3;
    return true;
  }

  r_mark_regions() {
    let v_1;
    let v_2;
    // (, line 32
    this.I_p1 = this.limit;
    this.I_p2 = this.limit;
    // do, line 35
    v_1 = this.cursor;
    let lab0 = true;
    lab0: while (lab0 == true) {
      lab0 = false;
      // (, line 35
      // or, line 41
      let lab1 = true;
      lab1: while (lab1 == true) {
        lab1 = false;
        v_2 = this.cursor;
        let lab2 = true;
        while (lab2 == true) {
          lab2 = false;
          // among, line 36
          if (this.find_among(StemmerEn.a_0, 3) == 0) {
            break;
          }
          break lab1;
        }
        this.cursor = v_2;
        // (, line 41
        // gopast, line 41
        golab3: while (true) {
          let lab4 = true;
          while (lab4 == true) {
            lab4 = false;
            if (!this.in_grouping(StemmerEn.g_v, 97, 121)) {
              break;
            }
            break golab3;
          }
          if (this.cursor >= this.limit) {
            break lab0;
          }
          this.cursor++;
        }
        // gopast, line 41
        golab5: while (true) {
          let lab6 = true;
          while (lab6 == true) {
            lab6 = false;
            if (!this.out_grouping(StemmerEn.g_v, 97, 121)) {
              break;
            }
            break golab5;
          }
          if (this.cursor >= this.limit) {
            break lab0;
          }
          this.cursor++;
        }
      }
      // setmark p1, line 42
      this.I_p1 = this.cursor;
      // gopast, line 43
      golab7: while (true) {
        let lab8 = true;
        while (lab8 == true) {
          lab8 = false;
          if (!this.in_grouping(StemmerEn.g_v, 97, 121)) {
            break;
          }
          break golab7;
        }
        if (this.cursor >= this.limit) {
          break lab0;
        }
        this.cursor++;
      }
      // gopast, line 43
      golab9: while (true) {
        let lab10 = true;
        while (lab10 == true) {
          lab10 = false;
          if (!this.out_grouping(StemmerEn.g_v, 97, 121)) {
            break;
          }
          break golab9;
        }
        if (this.cursor >= this.limit) {
          break lab0;
        }
        this.cursor++;
      }
      // setmark p2, line 43
      this.I_p2 = this.cursor;
    }
    this.cursor = v_1;
    return true;
  }

  r_shortv() {
    let v_1;
    // (, line 49
    // or, line 51
    let lab0 = true;
    lab0: while (lab0 == true) {
      lab0 = false;
      v_1 = this.limit - this.cursor;
      let lab1 = true;
      while (lab1 == true) {
        lab1 = false;
        // (, line 50
        if (!this.out_grouping_b(StemmerEn.g_v_WXY, 89, 121)) {
          break;
        }
        if (!this.in_grouping_b(StemmerEn.g_v, 97, 121)) {
          break;
        }
        if (!this.out_grouping_b(StemmerEn.g_v, 97, 121)) {
          break;
        }
        break lab0;
      }
      this.cursor = this.limit - v_1;
      // (, line 52
      if (!this.out_grouping_b(StemmerEn.g_v, 97, 121)) {
        return false;
      }
      if (!this.in_grouping_b(StemmerEn.g_v, 97, 121)) {
        return false;
      }
      // atlimit, line 52
      if (this.cursor > this.limit_backward) {
        return false;
      }
    }
    return true;
  }

  r_R1() {
    if (!(this.I_p1 <= this.cursor)) {
      return false;
    }
    return true;
  }

  r_R2() {
    if (!(this.I_p2 <= this.cursor)) {
      return false;
    }
    return true;
  }

  r_Step_1a() {
    let among_var;
    let v_1;
    let v_2;
    // (, line 58
    // try, line 59
    v_1 = this.limit - this.cursor;
    let lab0 = true;
    lab0: while (lab0 == true) {
      lab0 = false;
      // (, line 59
      // [, line 60
      this.ket = this.cursor;
      // substring, line 60
      among_var = this.find_among_b(StemmerEn.a_1, 3);
      if (among_var == 0) {
        this.cursor = this.limit - v_1;
        break;
      }
      // ], line 60
      this.bra = this.cursor;
      switch (among_var) {
        case 0:
          this.cursor = this.limit - v_1;
          break lab0;
        case 1:
          // (, line 62
          // delete, line 62
          if (!this.slice_del()) {
            return false;
          }
          break;
      }
    }
    // [, line 65
    this.ket = this.cursor;
    // substring, line 65
    among_var = this.find_among_b(StemmerEn.a_2, 6);
    if (among_var == 0) {
      return false;
    }
    // ], line 65
    this.bra = this.cursor;
    switch (among_var) {
      case 0:
        return false;
      case 1:
        // (, line 66
        // <-, line 66
        if (!this.slice_from('ss')) {
          return false;
        }
        break;
      case 2:
        // (, line 68
        // or, line 68
        var lab1 = true;
        lab1: while (lab1 == true) {
          lab1 = false;
          v_2 = this.limit - this.cursor;
          let lab2 = true;
          while (lab2 == true) {
            lab2 = false;
            // (, line 68
            // hop, line 68
            {
              const c = this.cursor - 2;
              if (this.limit_backward > c || c > this.limit) {
                break;
              }
              this.cursor = c;
            }
            // <-, line 68
            if (!this.slice_from('i')) {
              return false;
            }
            break lab1;
          }
          this.cursor = this.limit - v_2;
          // <-, line 68
          if (!this.slice_from('ie')) {
            return false;
          }
        }
        break;
      case 3:
        // (, line 69
        // next, line 69
        if (this.cursor <= this.limit_backward) {
          return false;
        }
        this.cursor--;
        // gopast, line 69
        golab3: while (true) {
          let lab4 = true;
          while (lab4 == true) {
            lab4 = false;
            if (!this.in_grouping_b(StemmerEn.g_v, 97, 121)) {
              break;
            }
            break golab3;
          }
          if (this.cursor <= this.limit_backward) {
            return false;
          }
          this.cursor--;
        }
        // delete, line 69
        if (!this.slice_del()) {
          return false;
        }
        break;
    }
    return true;
  }

  r_Step_1b() {
    let among_var;
    let v_1;
    let v_3;
    let v_4;
    // (, line 74
    // [, line 75
    this.ket = this.cursor;
    // substring, line 75
    among_var = this.find_among_b(StemmerEn.a_4, 6);
    if (among_var == 0) {
      return false;
    }
    // ], line 75
    this.bra = this.cursor;
    switch (among_var) {
      case 0:
        return false;
      case 1:
        // (, line 77
        // call R1, line 77
        if (!this.r_R1()) {
          return false;
        }
        // <-, line 77
        if (!this.slice_from('ee')) {
          return false;
        }
        break;
      case 2:
        // (, line 79
        // test, line 80
        v_1 = this.limit - this.cursor;
        // gopast, line 80
        golab0: while (true) {
          let lab1 = true;
          while (lab1 == true) {
            lab1 = false;
            if (!this.in_grouping_b(StemmerEn.g_v, 97, 121)) {
              break;
            }
            break golab0;
          }
          if (this.cursor <= this.limit_backward) {
            return false;
          }
          this.cursor--;
        }
        this.cursor = this.limit - v_1;
        // delete, line 80
        if (!this.slice_del()) {
          return false;
        }
        // test, line 81
        v_3 = this.limit - this.cursor;
        // substring, line 81
        among_var = this.find_among_b(StemmerEn.a_3, 13);
        if (among_var == 0) {
          return false;
        }
        this.cursor = this.limit - v_3;
        switch (among_var) {
          case 0:
            return false;
          case 1:
            // (, line 83
            // <+, line 83
            {
              var c = this.cursor;
              this.insert(this.cursor, this.cursor, 'e');
              this.cursor = c;
            }
            break;
          case 2:
            // (, line 86
            // [, line 86
            this.ket = this.cursor;
            // next, line 86
            if (this.cursor <= this.limit_backward) {
              return false;
            }
            this.cursor--;
            // ], line 86
            this.bra = this.cursor;
            // delete, line 86
            if (!this.slice_del()) {
              return false;
            }
            break;
          case 3:
            // (, line 87
            // atmark, line 87
            if (this.cursor != this.I_p1) {
              return false;
            }
            // test, line 87
            v_4 = this.limit - this.cursor;
            // call shortv, line 87
            if (!this.r_shortv()) {
              return false;
            }
            this.cursor = this.limit - v_4;
            // <+, line 87
            {
              var c = this.cursor;
              this.insert(this.cursor, this.cursor, 'e');
              this.cursor = c;
            }
            break;
        }
        break;
    }
    return true;
  }

  r_Step_1c() {
    let v_1;
    let v_2;
    // (, line 93
    // [, line 94
    this.ket = this.cursor;
    // or, line 94
    let lab0 = true;
    lab0: while (lab0 == true) {
      lab0 = false;
      v_1 = this.limit - this.cursor;
      let lab1 = true;
      while (lab1 == true) {
        lab1 = false;
        // literal, line 94
        if (!this.eq_s_b('y')) {
          break;
        }
        break lab0;
      }
      this.cursor = this.limit - v_1;
      // literal, line 94
      if (!this.eq_s_b('Y')) {
        return false;
      }
    }
    // ], line 94
    this.bra = this.cursor;
    if (!this.out_grouping_b(StemmerEn.g_v, 97, 121)) {
      return false;
    }
    // not, line 95
    {
      v_2 = this.limit - this.cursor;
      let lab2 = true;
      while (lab2 == true) {
        lab2 = false;
        // atlimit, line 95
        if (this.cursor > this.limit_backward) {
          break;
        }
        return false;
      }
      this.cursor = this.limit - v_2;
    }
    // <-, line 96
    if (!this.slice_from('i')) {
      return false;
    }
    return true;
  }

  r_Step_2() {
    let among_var;
    // (, line 99
    // [, line 100
    this.ket = this.cursor;
    // substring, line 100
    among_var = this.find_among_b(StemmerEn.a_5, 24);
    if (among_var == 0) {
      return false;
    }
    // ], line 100
    this.bra = this.cursor;
    // call R1, line 100
    if (!this.r_R1()) {
      return false;
    }
    switch (among_var) {
      case 0:
        return false;
      case 1:
        // (, line 101
        // <-, line 101
        if (!this.slice_from('tion')) {
          return false;
        }
        break;
      case 2:
        // (, line 102
        // <-, line 102
        if (!this.slice_from('ence')) {
          return false;
        }
        break;
      case 3:
        // (, line 103
        // <-, line 103
        if (!this.slice_from('ance')) {
          return false;
        }
        break;
      case 4:
        // (, line 104
        // <-, line 104
        if (!this.slice_from('able')) {
          return false;
        }
        break;
      case 5:
        // (, line 105
        // <-, line 105
        if (!this.slice_from('ent')) {
          return false;
        }
        break;
      case 6:
        // (, line 107
        // <-, line 107
        if (!this.slice_from('ize')) {
          return false;
        }
        break;
      case 7:
        // (, line 109
        // <-, line 109
        if (!this.slice_from('ate')) {
          return false;
        }
        break;
      case 8:
        // (, line 111
        // <-, line 111
        if (!this.slice_from('al')) {
          return false;
        }
        break;
      case 9:
        // (, line 112
        // <-, line 112
        if (!this.slice_from('ful')) {
          return false;
        }
        break;
      case 10:
        // (, line 114
        // <-, line 114
        if (!this.slice_from('ous')) {
          return false;
        }
        break;
      case 11:
        // (, line 116
        // <-, line 116
        if (!this.slice_from('ive')) {
          return false;
        }
        break;
      case 12:
        // (, line 118
        // <-, line 118
        if (!this.slice_from('ble')) {
          return false;
        }
        break;
      case 13:
        // (, line 119
        // literal, line 119
        if (!this.eq_s_b('l')) {
          return false;
        }
        // <-, line 119
        if (!this.slice_from('og')) {
          return false;
        }
        break;
      case 14:
        // (, line 120
        // <-, line 120
        if (!this.slice_from('ful')) {
          return false;
        }
        break;
      case 15:
        // (, line 121
        // <-, line 121
        if (!this.slice_from('less')) {
          return false;
        }
        break;
      case 16:
        // (, line 122
        if (!this.in_grouping_b(StemmerEn.g_valid_LI, 99, 116)) {
          return false;
        }
        // delete, line 122
        if (!this.slice_del()) {
          return false;
        }
        break;
    }
    return true;
  }

  r_Step_3() {
    let among_var;
    // (, line 126
    // [, line 127
    this.ket = this.cursor;
    // substring, line 127
    among_var = this.find_among_b(StemmerEn.a_6, 9);
    if (among_var == 0) {
      return false;
    }
    // ], line 127
    this.bra = this.cursor;
    // call R1, line 127
    if (!this.r_R1()) {
      return false;
    }
    switch (among_var) {
      case 0:
        return false;
      case 1:
        // (, line 128
        // <-, line 128
        if (!this.slice_from('tion')) {
          return false;
        }
        break;
      case 2:
        // (, line 129
        // <-, line 129
        if (!this.slice_from('ate')) {
          return false;
        }
        break;
      case 3:
        // (, line 130
        // <-, line 130
        if (!this.slice_from('al')) {
          return false;
        }
        break;
      case 4:
        // (, line 132
        // <-, line 132
        if (!this.slice_from('ic')) {
          return false;
        }
        break;
      case 5:
        // (, line 134
        // delete, line 134
        if (!this.slice_del()) {
          return false;
        }
        break;
      case 6:
        // (, line 136
        // call R2, line 136
        if (!this.r_R2()) {
          return false;
        }
        // delete, line 136
        if (!this.slice_del()) {
          return false;
        }
        break;
    }
    return true;
  }

  r_Step_4() {
    let among_var;
    let v_1;
    // (, line 140
    // [, line 141
    this.ket = this.cursor;
    // substring, line 141
    among_var = this.find_among_b(StemmerEn.a_7, 18);
    if (among_var == 0) {
      return false;
    }
    // ], line 141
    this.bra = this.cursor;
    // call R2, line 141
    if (!this.r_R2()) {
      return false;
    }
    switch (among_var) {
      case 0:
        return false;
      case 1:
        // (, line 144
        // delete, line 144
        if (!this.slice_del()) {
          return false;
        }
        break;
      case 2:
        // (, line 145
        // or, line 145
        var lab0 = true;
        lab0: while (lab0 == true) {
          lab0 = false;
          v_1 = this.limit - this.cursor;
          let lab1 = true;
          while (lab1 == true) {
            lab1 = false;
            // literal, line 145
            if (!this.eq_s_b('s')) {
              break;
            }
            break lab0;
          }
          this.cursor = this.limit - v_1;
          // literal, line 145
          if (!this.eq_s_b('t')) {
            return false;
          }
        }
        // delete, line 145
        if (!this.slice_del()) {
          return false;
        }
        break;
    }
    return true;
  }

  r_Step_5() {
    let among_var;
    let v_1;
    let v_2;
    // (, line 149
    // [, line 150
    this.ket = this.cursor;
    // substring, line 150
    among_var = this.find_among_b(StemmerEn.a_8, 2);
    if (among_var == 0) {
      return false;
    }
    // ], line 150
    this.bra = this.cursor;
    switch (among_var) {
      case 0:
        return false;
      case 1:
        // (, line 151
        // or, line 151
        var lab0 = true;
        lab0: while (lab0 == true) {
          lab0 = false;
          v_1 = this.limit - this.cursor;
          let lab1 = true;
          while (lab1 == true) {
            lab1 = false;
            // call R2, line 151
            if (!this.r_R2()) {
              break;
            }
            break lab0;
          }
          this.cursor = this.limit - v_1;
          // (, line 151
          // call R1, line 151
          if (!this.r_R1()) {
            return false;
          }
          // not, line 151
          {
            v_2 = this.limit - this.cursor;
            let lab2 = true;
            while (lab2 == true) {
              lab2 = false;
              // call shortv, line 151
              if (!this.r_shortv()) {
                break;
              }
              return false;
            }
            this.cursor = this.limit - v_2;
          }
        }
        // delete, line 151
        if (!this.slice_del()) {
          return false;
        }
        break;
      case 2:
        // (, line 152
        // call R2, line 152
        if (!this.r_R2()) {
          return false;
        }
        // literal, line 152
        if (!this.eq_s_b('l')) {
          return false;
        }
        // delete, line 152
        if (!this.slice_del()) {
          return false;
        }
        break;
    }
    return true;
  }

  r_exception2() {
    // (, line 156
    // [, line 158
    this.ket = this.cursor;
    // substring, line 158
    if (this.find_among_b(StemmerEn.a_9, 8) == 0) {
      return false;
    }
    // ], line 158
    this.bra = this.cursor;
    // atlimit, line 158
    if (this.cursor > this.limit_backward) {
      return false;
    }
    return true;
  }

  r_exception1() {
    let among_var;
    // (, line 168
    // [, line 170
    this.bra = this.cursor;
    // substring, line 170
    among_var = this.find_among(StemmerEn.a_10, 18);
    if (among_var == 0) {
      return false;
    }
    // ], line 170
    this.ket = this.cursor;
    // atlimit, line 170
    if (this.cursor < this.limit) {
      return false;
    }
    switch (among_var) {
      case 0:
        return false;
      case 1:
        // (, line 174
        // <-, line 174
        if (!this.slice_from('ski')) {
          return false;
        }
        break;
      case 2:
        // (, line 175
        // <-, line 175
        if (!this.slice_from('sky')) {
          return false;
        }
        break;
      case 3:
        // (, line 176
        // <-, line 176
        if (!this.slice_from('die')) {
          return false;
        }
        break;
      case 4:
        // (, line 177
        // <-, line 177
        if (!this.slice_from('lie')) {
          return false;
        }
        break;
      case 5:
        // (, line 178
        // <-, line 178
        if (!this.slice_from('tie')) {
          return false;
        }
        break;
      case 6:
        // (, line 182
        // <-, line 182
        if (!this.slice_from('idl')) {
          return false;
        }
        break;
      case 7:
        // (, line 183
        // <-, line 183
        if (!this.slice_from('gentl')) {
          return false;
        }
        break;
      case 8:
        // (, line 184
        // <-, line 184
        if (!this.slice_from('ugli')) {
          return false;
        }
        break;
      case 9:
        // (, line 185
        // <-, line 185
        if (!this.slice_from('earli')) {
          return false;
        }
        break;
      case 10:
        // (, line 186
        // <-, line 186
        if (!this.slice_from('onli')) {
          return false;
        }
        break;
      case 11:
        // (, line 187
        // <-, line 187
        if (!this.slice_from('singl')) {
          return false;
        }
        break;
    }
    return true;
  }

  r_postlude() {
    let v_1;
    let v_2;
    // (, line 203
    // Boolean test Y_found, line 203
    if (!this.B_Y_found) {
      return false;
    }
    // repeat, line 203
    replab0: while (true) {
      v_1 = this.cursor;
      let lab1 = true;
      lab1: while (lab1 == true) {
        lab1 = false;
        // (, line 203
        // goto, line 203
        golab2: while (true) {
          v_2 = this.cursor;
          let lab3 = true;
          while (lab3 == true) {
            lab3 = false;
            // (, line 203
            // [, line 203
            this.bra = this.cursor;
            // literal, line 203
            if (!this.eq_s('Y')) {
              break;
            }
            // ], line 203
            this.ket = this.cursor;
            this.cursor = v_2;
            break golab2;
          }
          this.cursor = v_2;
          if (this.cursor >= this.limit) {
            break lab1;
          }
          this.cursor++;
        }
        // <-, line 203
        if (!this.slice_from('y')) {
          return false;
        }
        continue replab0;
      }
      this.cursor = v_1;
      break;
    }
    return true;
  }

  innerStem() {
    let v_1;
    let v_2;
    let v_3;
    let v_4;
    let v_5;
    let v_6;
    let v_7;
    let v_8;
    let v_9;
    let v_10;
    let v_11;
    let v_12;
    let v_13;
    // (, line 205
    // or, line 207
    let lab0 = true;
    lab0: while (lab0 == true) {
      lab0 = false;
      v_1 = this.cursor;
      let lab1 = true;
      while (lab1 == true) {
        lab1 = false;
        // call exception1, line 207
        if (!this.r_exception1()) {
          break;
        }
        break lab0;
      }
      this.cursor = v_1;
      let lab2 = true;
      lab2: while (lab2 == true) {
        lab2 = false;
        // not, line 208
        {
          v_2 = this.cursor;
          let lab3 = true;
          while (lab3 == true) {
            lab3 = false;
            // hop, line 208
            {
              const c = this.cursor + 3;
              if (c < 0 || c > this.limit) {
                break;
              }
              this.cursor = c;
            }
            break lab2;
          }
          this.cursor = v_2;
        }
        break lab0;
      }
      this.cursor = v_1;
      // (, line 208
      // do, line 209
      v_3 = this.cursor;
      let lab4 = true;
      while (lab4 == true) {
        lab4 = false;
        // call prelude, line 209
        if (!this.r_prelude()) {
          break;
        }
      }
      this.cursor = v_3;
      // do, line 210
      v_4 = this.cursor;
      let lab5 = true;
      while (lab5 == true) {
        lab5 = false;
        // call mark_regions, line 210
        if (!this.r_mark_regions()) {
          break;
        }
      }
      this.cursor = v_4;
      // backwards, line 211
      this.limit_backward = this.cursor;
      this.cursor = this.limit;
      // (, line 211
      // do, line 213
      v_5 = this.limit - this.cursor;
      let lab6 = true;
      while (lab6 == true) {
        lab6 = false;
        // call Step_1a, line 213
        if (!this.r_Step_1a()) {
          break;
        }
      }
      this.cursor = this.limit - v_5;
      // or, line 215
      let lab7 = true;
      lab7: while (lab7 == true) {
        lab7 = false;
        v_6 = this.limit - this.cursor;
        let lab8 = true;
        while (lab8 == true) {
          lab8 = false;
          // call exception2, line 215
          if (!this.r_exception2()) {
            break;
          }
          break lab7;
        }
        this.cursor = this.limit - v_6;
        // (, line 215
        // do, line 217
        v_7 = this.limit - this.cursor;
        let lab9 = true;
        while (lab9 == true) {
          lab9 = false;
          // call Step_1b, line 217
          if (!this.r_Step_1b()) {
            break;
          }
        }
        this.cursor = this.limit - v_7;
        // do, line 218
        v_8 = this.limit - this.cursor;
        let lab10 = true;
        while (lab10 == true) {
          lab10 = false;
          // call Step_1c, line 218
          if (!this.r_Step_1c()) {
            break;
          }
        }
        this.cursor = this.limit - v_8;
        // do, line 220
        v_9 = this.limit - this.cursor;
        let lab11 = true;
        while (lab11 == true) {
          lab11 = false;
          // call Step_2, line 220
          if (!this.r_Step_2()) {
            break;
          }
        }
        this.cursor = this.limit - v_9;
        // do, line 221
        v_10 = this.limit - this.cursor;
        let lab12 = true;
        while (lab12 == true) {
          lab12 = false;
          // call Step_3, line 221
          if (!this.r_Step_3()) {
            break;
          }
        }
        this.cursor = this.limit - v_10;
        // do, line 222
        v_11 = this.limit - this.cursor;
        let lab13 = true;
        while (lab13 == true) {
          lab13 = false;
          // call Step_4, line 222
          if (!this.r_Step_4()) {
            break;
          }
        }
        this.cursor = this.limit - v_11;
        // do, line 224
        v_12 = this.limit - this.cursor;
        let lab14 = true;
        while (lab14 == true) {
          lab14 = false;
          // call Step_5, line 224
          if (!this.r_Step_5()) {
            break;
          }
        }
        this.cursor = this.limit - v_12;
      }
      this.cursor = this.limit_backward; // do, line 227
      v_13 = this.cursor;
      let lab15 = true;
      while (lab15 == true) {
        lab15 = false;
        // call postlude, line 227
        if (!this.r_postlude()) {
          break;
        }
      }
      this.cursor = v_13;
    }
    return true;
  }
}

StemmerEn.methodObject = new StemmerEn();

StemmerEn.a_0 = [
  new Among('arsen', -1, -1),
  new Among('commun', -1, -1),
  new Among('gener', -1, -1)
];

StemmerEn.a_1 = [
  new Among("'", -1, 1),
  new Among("'s'", 0, 1),
  new Among("'s", -1, 1)
];

StemmerEn.a_2 = [
  new Among('ied', -1, 2),
  new Among('s', -1, 3),
  new Among('ies', 1, 2),
  new Among('sses', 1, 1),
  new Among('ss', 1, -1),
  new Among('us', 1, -1)
];

StemmerEn.a_3 = [
  new Among('', -1, 3),
  new Among('bb', 0, 2),
  new Among('dd', 0, 2),
  new Among('ff', 0, 2),
  new Among('gg', 0, 2),
  new Among('bl', 0, 1),
  new Among('mm', 0, 2),
  new Among('nn', 0, 2),
  new Among('pp', 0, 2),
  new Among('rr', 0, 2),
  new Among('at', 0, 1),
  new Among('tt', 0, 2),
  new Among('iz', 0, 1)
];

StemmerEn.a_4 = [
  new Among('ed', -1, 2),
  new Among('eed', 0, 1),
  new Among('ing', -1, 2),
  new Among('edly', -1, 2),
  new Among('eedly', 3, 1),
  new Among('ingly', -1, 2)
];

StemmerEn.a_5 = [
  new Among('anci', -1, 3),
  new Among('enci', -1, 2),
  new Among('ogi', -1, 13),
  new Among('li', -1, 16),
  new Among('bli', 3, 12),
  new Among('abli', 4, 4),
  new Among('alli', 3, 8),
  new Among('fulli', 3, 14),
  new Among('lessli', 3, 15),
  new Among('ousli', 3, 10),
  new Among('entli', 3, 5),
  new Among('aliti', -1, 8),
  new Among('biliti', -1, 12),
  new Among('iviti', -1, 11),
  new Among('tional', -1, 1),
  new Among('ational', 14, 7),
  new Among('alism', -1, 8),
  new Among('ation', -1, 7),
  new Among('ization', 17, 6),
  new Among('izer', -1, 6),
  new Among('ator', -1, 7),
  new Among('iveness', -1, 11),
  new Among('fulness', -1, 9),
  new Among('ousness', -1, 10)
];

StemmerEn.a_6 = [
  new Among('icate', -1, 4),
  new Among('ative', -1, 6),
  new Among('alize', -1, 3),
  new Among('iciti', -1, 4),
  new Among('ical', -1, 4),
  new Among('tional', -1, 1),
  new Among('ational', 5, 2),
  new Among('ful', -1, 5),
  new Among('ness', -1, 5)
];

StemmerEn.a_7 = [
  new Among('ic', -1, 1),
  new Among('ance', -1, 1),
  new Among('ence', -1, 1),
  new Among('able', -1, 1),
  new Among('ible', -1, 1),
  new Among('ate', -1, 1),
  new Among('ive', -1, 1),
  new Among('ize', -1, 1),
  new Among('iti', -1, 1),
  new Among('al', -1, 1),
  new Among('ism', -1, 1),
  new Among('ion', -1, 2),
  new Among('er', -1, 1),
  new Among('ous', -1, 1),
  new Among('ant', -1, 1),
  new Among('ent', -1, 1),
  new Among('ment', 15, 1),
  new Among('ement', 16, 1)
];

StemmerEn.a_8 = [new Among('e', -1, 1), new Among('l', -1, 2)];

StemmerEn.a_9 = [
  new Among('succeed', -1, -1),
  new Among('proceed', -1, -1),
  new Among('exceed', -1, -1),
  new Among('canning', -1, -1),
  new Among('inning', -1, -1),
  new Among('earring', -1, -1),
  new Among('herring', -1, -1),
  new Among('outing', -1, -1)
];

StemmerEn.a_10 = [
  new Among('andes', -1, -1),
  new Among('atlas', -1, -1),
  new Among('bias', -1, -1),
  new Among('cosmos', -1, -1),
  new Among('dying', -1, 3),
  new Among('early', -1, 9),
  new Among('gently', -1, 7),
  new Among('howe', -1, -1),
  new Among('idly', -1, 6),
  new Among('lying', -1, 4),
  new Among('news', -1, -1),
  new Among('only', -1, 10),
  new Among('singly', -1, 11),
  new Among('skies', -1, 2),
  new Among('skis', -1, 1),
  new Among('sky', -1, -1),
  new Among('tying', -1, 5),
  new Among('ugly', -1, 8)
];

StemmerEn.g_v = [17, 65, 16, 1];

StemmerEn.g_v_WXY = [1, 17, 65, 208, 1];

StemmerEn.g_valid_LI = [55, 141, 2];

module.exports = StemmerEn;

},{"./tokenizer-en":29,"@nlpjs/core":12}],28:[function(require,module,exports){
/*
 * Copyright (c) AXA Group Operations Spain S.A.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

const { Stopwords } = require('@nlpjs/core');

class StopwordsEn extends Stopwords {
  constructor(container, words) {
    super(container);
    this.name = 'stopwords-en';
    this.dictionary = {};
    const list = words || [
      'about',
      'above',
      'after',
      'again',
      'all',
      'also',
      'am',
      'an',
      'and',
      'another',
      'any',
      'are',
      'as',
      'at',
      'be',
      'because',
      'been',
      'before',
      'being',
      'below',
      'between',
      'both',
      'but',
      'by',
      'came',
      'can',
      'cannot',
      'come',
      'could',
      'did',
      'do',
      'does',
      'doing',
      'during',
      'each',
      'few',
      'for',
      'from',
      'further',
      'get',
      'got',
      'has',
      'had',
      'he',
      'have',
      'her',
      'here',
      'him',
      'himself',
      'his',
      'how',
      'if',
      'in',
      'into',
      'is',
      'it',
      'its',
      'itself',
      'like',
      'make',
      'many',
      'me',
      'might',
      'more',
      'most',
      'much',
      'must',
      'my',
      'myself',
      'never',
      'now',
      'of',
      'on',
      'only',
      'or',
      'other',
      'our',
      'ours',
      'ourselves',
      'out',
      'over',
      'own',
      'said',
      'same',
      'see',
      'should',
      'since',
      'so',
      'some',
      'still',
      'such',
      'take',
      'than',
      'that',
      'the',
      'their',
      'theirs',
      'them',
      'themselves',
      'then',
      'there',
      'these',
      'they',
      'this',
      'those',
      'through',
      'to',
      'too',
      'under',
      'until',
      'up',
      'very',
      'was',
      'way',
      'we',
      'well',
      'were',
      'what',
      'where',
      'when',
      'which',
      'while',
      'who',
      'whom',
      'with',
      'would',
      'why',
      'you',
      'your',
      'yours',
      'yourself',
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
      'g',
      'h',
      'i',
      'j',
      'k',
      'l',
      'm',
      'n',
      'o',
      'p',
      'q',
      'r',
      's',
      't',
      'u',
      'v',
      'w',
      'x',
      'y',
      'z',
      '$',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '0',
      '_',
    ];
    this.build(list);
  }
}

module.exports = StopwordsEn;

},{"@nlpjs/core":12}],29:[function(require,module,exports){
/*
 * Copyright (c) AXA Group Operations Spain S.A.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

const { Tokenizer } = require('@nlpjs/core');

class TokenizerEn extends Tokenizer {
  constructor(container, shouldNormalize) {
    super(container, shouldNormalize);
    this.name = 'tokenizer-en';
  }

  replace(text) {
    let result = text.replace(/n't([ ,:;.!?]|$)/gi, ' not ');
    result = result.replace(/can't([ ,:;.!?]|$)/gi, 'can not ');
    result = result.replace(/'ll([ ,:;.!?]|$)/gi, ' will ');
    result = result.replace(/'s([ ,:;.!?]|$)/gi, ' is ');
    result = result.replace(/'re([ ,:;.!?]|$)/gi, ' are ');
    result = result.replace(/'ve([ ,:;.!?]|$)/gi, ' have ');
    result = result.replace(/'m([ ,:;.!?]|$)/gi, ' am ');
    result = result.replace(/'d([ ,:;.!?]|$)/gi, ' had ');
    return result;
  }

  replaceContractions(arr) {
    const contractionsBase = {
      cannot: ['can', 'not'],
      gonna: ['going', 'to'],
      wanna: ['want', 'to'],
    };

    const result = [];
    arr.forEach((item) => {
      const lowitem = item.toLowerCase();
      if (Object.prototype.hasOwnProperty.call(contractionsBase, lowitem)) {
        result.push(...contractionsBase[lowitem]);
      } else {
        result.push(item);
      }
    });
    return result;
  }

  innerTokenize(text) {
    const replaced = this.replace(text);
    const arr = replaced.split(/[\s,.!?;:([\]'"¡¿)/]+/).filter((x) => x);
    return this.replaceContractions(arr, text);
  }
}

module.exports = TokenizerEn;

},{"@nlpjs/core":12}],30:[function(require,module,exports){
/*
 * Copyright (c) AXA Group Operations Spain S.A.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

function registerTrigrams(container) {
  const language = container.get('Language');
  if (language) {
    language.addModel(
      'Latin',
      'eng',
      ' ththe anhe nd andion ofof tio toto on  inal atiighghtrig rior entas ed is ll in  bee rne oneveralls tevet t frs a ha rety ery ord t prht  co eve he ang ts hisingbe yon shce reefreryon thermennatshapronaly ahases for hihalf tn an ont  pes o fod inceer onsrese sectityly l bry e eerse ian e o dectidomedoeedhtsteronare  no wh a  und f asny l ae pere en na winitnted aanyted dins stath perithe tst e cy tom soc arch t od ontis eequve ociman fuoteothess al acwitial mauni serea so onlitintr ty oencthiualt a eqtatquaive stalie wl oaref hconte led isundciae fle  lay iumaby  byhumf aic  huavege r a woo ams com meeass dtec lin een rattitplewheateo ts rt frot chciedisagearyo oancelino  fa susonincat ndahouwort inderomoms otg temetleitignis witlducd wwhiacthicaw law heichminimiorto sse e bntrtraeduountane dnstl pd nld ntas iblen p pun s atilyrththofulssidero ecatucauntien edo ph aeraindpensecn wommr s'
    );
  }
}

module.exports = registerTrigrams;

},{}],31:[function(require,module,exports){
/*
 * Copyright (c) AXA Group Operations Spain S.A.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

const {
  TokenizerEn,
  StemmerEn,
  StopwordsEn,
  NormalizerEn,
} = require('@nlpjs/lang-en-min');

const LangEn = require('./lang-en');
const SentimentEn = require('./sentiment/sentiment_en');

module.exports = {
  LangEn,
  StemmerEn,
  StopwordsEn,
  TokenizerEn,
  NormalizerEn,
  SentimentEn,
};

},{"./lang-en":32,"./sentiment/sentiment_en":35,"@nlpjs/lang-en-min":23}],32:[function(require,module,exports){
/*
 * Copyright (c) AXA Group Operations Spain S.A.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

const {
  TokenizerEn,
  StemmerEn,
  StopwordsEn,
  NormalizerEn,
  registerTrigrams,
} = require('@nlpjs/lang-en-min');
const SentimentEn = require('./sentiment/sentiment_en');

class LangEn {
  register(container) {
    container.use(TokenizerEn);
    container.use(StemmerEn);
    container.use(StopwordsEn);
    container.use(NormalizerEn);
    container.register('sentiment-en', SentimentEn);
    registerTrigrams(container);
  }
}

module.exports = LangEn;

},{"./sentiment/sentiment_en":35,"@nlpjs/lang-en-min":23}],33:[function(require,module,exports){
module.exports={
  "words": ["not", "no", "never", "neither"]
}

},{}],34:[function(require,module,exports){
module.exports={"admir":0.25,"amor":-0.625,"approv":0.25,"assur":0.5,"benevol":0.375,"calm":0.313,"captiv":0.5,"charm":0.5,"cheer":0.375,"comfort":0.375,"confid":0.375,"congratul":0.375,"content":0.5,"correct":-0.25,"decent":0.375,"depend":0.375,"eas":-0.375,"easi":0.292,"elat":0.313,"enjoy":0.333,"exhilar":0.625,"favor":0.375,"favour":0.875,"fond":0.375,"friend":0.25,"gay":0.25,"glad":0.375,"gladden":0.625,"golden":0.583,"good":0.25,"gracious":0.5,"happi":0.813,"honor":0.625,"hope":0.5,"joy":0.625,"jubil":0.375,"just":0.313,"love":0.5,"nice":0.25,"posit":-0.25,"prefer":0.25,"reassur":0.375,"recreat":0.313,"regard":0.625,"rejoic":0.438,"respect":0.25,"right":0.344,"ripe":0.25,"rosi":0.719,"safe":0.25,"smooth":0.25,"sound":0.313,"still":0.281,"superior":0.344,"tranquil":0.375,"triumph":0.438,"warm":0.25,"warmhearted":0.5,"well":0.625,"afraid":-0.437,"aggress":-0.25,"alarm":-0.375,"anger":-0.25,"annoy":-0.25,"apprehens":0.25,"awkward":-0.3,"bitter":-0.25,"black":0.25,"bother":-0.25,"brood":0.375,"chafe":-0.375,"contempt":-0.25,"dark":-0.292,"depress":-0.25,"desol":-0.25,"desper":-0.437,"disapprov":-0.625,"discourag":-0.25,"disgrac":-0.375,"disgust":-0.5,"dismay":-0.375,"distress":-0.5,"disturb":-0.25,"down":-0.292,"drab":-0.625,"embarrass":-0.625,"fear":-0.25,"foul":-0.281,"frighten":-0.25,"gall":-0.625,"gloomi":-0.25,"griev":-0.5,"grievous":-0.344,"grim":-0.25,"hideous":-0.375,"hopeless":-0.417,"horrif":-0.75,"hostil":-0.25,"insecur":-0.25,"irrit":-0.25,"jealous":-0.25,"loathsom":-0.25,"loom":-0.281,"low":-0.312,"malevol":-0.375,"misanthrop":-0.875,"mortifi":-0.375,"mourn":-0.687,"nauseat":-0.25,"nauseous":-0.25,"offend":-0.25,"offens":-0.5,"outrag":-0.375,"panic":-0.25,"pestifer":-0.25,"queasi":-0.375,"rag":-0.25,"regret":-0.5,"repel":-0.25,"shame":-0.375,"sorrow":-0.5,"sorri":-0.5,"temper":-0.25,"torment":-0.437,"troubl":-0.687,"ugli":-1,"uneasi":-0.35,"unfriend":-0.281,"unhappi":-0.75,"unsound":0.25,"vex":-0.437,"vexat":-0.469,"wick":-0.25,"woeful":-1,"worri":-0.75,"wretch":-0.4,"adept":0.25,"ador":0.25,"affect":0.25,"affection":0.625,"affirm":0.25,"amat":0.625,"amatori":0.25,"amic":0.625,"appreci":0.25,"approb":0.5,"approbatori":1,"ardor":0.25,"ardour":0.25,"avid":0.375,"beam":0.5,"beguil":0.375,"belong":0.5,"benef":0.875,"benefic":0.938,"benefici":0.375,"bewitch":0.25,"blith":0.625,"brotherlik":0.375,"brother":0.375,"care":0.4,"charit":0.25,"commend":0.325,"complac":0.875,"consol":0.25,"convinc":0.25,"courteous":0.875,"delight":0.25,"devot":0.25,"dreami":0.25,"eager":0.25,"elan":0.292,"embolden":-0.25,"emot":0.25,"enamor":0.375,"enamored":0.25,"enamour":0.375,"enchant":-0.375,"encourag":0.375,"enthral":-0.375,"enthusiasm":0.5,"enthusiast":0.25,"entranc":0.375,"esteem":0.875,"estim":0.25,"euphoria":0.75,"euphori":0.75,"euphor":1,"excel":0.25,"excit":0.25,"expert":0.375,"exuber":0.813,"exult":0.625,"fantabul":0.75,"fascin":0.5,"fortun":0.875,"friendli":0.688,"fulfil":0.375,"gayli":0.625,"gladsom":0.375,"gleeful":0.375,"gleefulli":0.5,"grate":-0.375,"gratifi":0.25,"gratitud":0.75,"gusto":1,"happili":0.5,"hearten":0.625,"hilari":0.625,"hilar":0.375,"insouci":-0.25,"intimaci":0.25,"jocular":0.375,"jocund":0.5,"jolli":-0.375,"jolliti":0.625,"jovial":0.438,"joyous":0.625,"keen":-0.375,"kind":0.542,"laudabl":0.375,"lighthearted":0.375,"likabl":0.563,"likeabl":0.563,"like":0.344,"lovesom":0.875,"merrili":0.625,"merri":0.583,"mirth":0.375,"openheart":0.25,"optim":1,"optimist":0.625,"peaceabl":0.792,"penchant":0.375,"philia":0.625,"placid":0.25,"plausiv":1,"pleas":0.375,"plus":0.688,"practic":0.25,"praiseworthili":0.25,"predilect":0.375,"profici":0.25,"proud":0.688,"quiet":0.313,"quieten":0.375,"quietud":0.25,"relish":-0.375,"salutari":1,"sanction":0.5,"sanguin":-0.25,"satiabl":0.625,"satisfactorili":0.5,"satisfactori":0.75,"satisfi":0.375,"scream":0.292,"seren":0.313,"skil":0.5,"skill":0.438,"solac":-0.375,"sooth":0.313,"splendid":0.25,"stimul":0.25,"superordin":0.25,"teas":0.25,"thank":0.375,"titil":0.625,"togeth":1,"tranc":0.375,"tranquillis":0.375,"triumphal":0.375,"triumphant":0.563,"unafraid":0.375,"undecompos":1,"unruffl":0.5,"unspoil":0.563,"unspoilt":1,"uplift":0.5,"upright":0.25,"uproari":0.375,"warmheart":0.625,"worship":0.5,"zealous":0.75,"zest":0.625,"abas":-0.25,"abash":-0.25,"abhor":-0.25,"abhorr":-0.25,"abomin":-0.375,"aggrav":-0.625,"aggriev":-0.312,"alert":0.25,"amok":-0.25,"amuck":-0.25,"angrili":-0.75,"angri":-0.375,"antipathi":-0.312,"antsi":-0.25,"anxieti":-0.375,"anxious":-0.5,"appal":-0.375,"asham":-0.25,"atroci":-0.25,"avers":-0.25,"bedaz":-0.25,"begrudg":-0.312,"belliger":-0.375,"bereav":-0.375,"bereft":-0.375,"bode":-0.25,"bothersom":-1,"brokenhearted":-0.625,"chagrin":-0.25,"cheerless":-0.75,"chevvi":-0.375,"chevi":-0.375,"chill":-0.625,"chivvi":-0.375,"chivi":-0.375,"choler":-0.5,"commiser":-0.625,"compass":-0.625,"compassion":-0.25,"compunct":-0.375,"confus":0.5,"connipt":-0.625,"constern":-0.375,"contemn":-1,"contrit":-0.25,"covet":0.375,"creep":-0.312,"cring":0.5,"cruelli":-0.312,"cruelti":-0.458,"cynic":0.25,"damag":-0.625,"daze":-0.312,"defeat":-0.625,"defici":-0.437,"deject":-0.875,"dejected":-0.25,"demean":-0.75,"demoralis":0.25,"demor":0.25,"deplor":-0.312,"despair":-0.5,"despis":-0.75,"despit":-0.5,"despond":-0.5,"detest":-0.75,"devil":-0.25,"diffid":-1,"dingi":-0.625,"dire":-0.75,"disappoint":-0.25,"discomfit":-0.5,"discomfitur":-0.25,"discomposur":-0.25,"disconcert":-0.25,"disconsol":-0.25,"discredit":-0.5,"disdain":-0.375,"dishonor":-0.25,"disinclin":-0.5,"dislik":-1,"dismal":-1,"disord":-0.458,"dispirit":-0.25,"dispirited":-0.25,"displeas":-0.25,"displeasur":-0.25,"disquiet":-0.25,"disquietud":-0.375,"distast":-0.25,"dole":-0.875,"dolor":-0.5,"dolour":-0.5,"downcast":-0.312,"downheart":-0.5,"downhearted":-0.25,"dread":-0.667,"drear":-1,"dreari":-0.25,"dysphoria":-0.75,"dysphor":-0.75,"edgi":-0.375,"enrag":-1,"evil":-0.25,"exacerb":-0.375,"exasper":-0.25,"execr":-0.458,"faulti":-0.25,"fearsom":-0.75,"fidgeti":-0.25,"filthi":-0.292,"foil":-0.5,"forebod":-0.25,"forlorn":-0.375,"fret":-0.375,"fright":-0.25,"frustrat":-0.25,"furious":-0.75,"furi":-0.417,"gloom":-1,"gloomili":-0.375,"glum":-0.312,"gravel":-0.458,"grief":-0.437,"grudg":-0.25,"guilt":-1,"guilti":-1,"hackl":-0.375,"harass":-0.375,"harri":-0.25,"hassl":-0.562,"hate":-0.75,"hatr":-0.375,"heartach":-0.625,"heartbreak":-0.5,"heartburn":-0.5,"heartrend":-0.5,"heartsick":-0.375,"heavyheart":-0.5,"heavyhearted":-0.25,"horrend":-0.75,"horribl":-1,"horrid":-0.312,"horrifi":-0.25,"horror":-0.5,"huffi":-0.25,"huffish":-0.375,"humbl":0.375,"humili":-0.75,"hysteria":-0.375,"hyster":-0.25,"ignomini":-0.375,"impati":-0.333,"improp":-1,"inadequ":-0.75,"inauspici":-0.375,"incens":-0.5,"indign":-0.25,"infuri":-0.25,"inglori":-0.625,"ingratitud":-1,"inim":-0.375,"inquietud":-0.375,"intimid":-0.5,"irasc":-0.625,"itchi":-0.375,"jealousi":-0.25,"joyless":-0.25,"lachrymos":-0.5,"lament":-0.5,"livid":-0.75,"loath":-0.5,"madden":-0.75,"malef":-0.875,"malefic":-0.5,"malic":-0.625,"malici":-0.875,"malign":-0.25,"melanchol":-0.25,"melancholi":-0.375,"mif":-0.75,"misanthropi":-0.437,"miser":-0.5,"miseri":-0.437,"misogyn":-1,"misogyni":-0.625,"misolog":-0.25,"mison":-0.25,"molest":-0.25,"murder":-0.5,"nark":-0.312,"nervi":-0.5,"nettl":-0.75,"nettlesom":-0.875,"noisom":-0.625,"odious":-0.5,"odium":-0.437,"oppress":-0.312,"opprobri":-0.75,"overjeal":-0.5,"pain":-0.437,"panick":-0.25,"panicki":-0.25,"pathet":-0.437,"peev":-0.625,"penit":-0.25,"penitenti":-0.25,"perturb":-0.25,"peski":-1,"pessim":-0.375,"pessimist":-0.375,"pester":-0.25,"piqu":-0.625,"piss":-0.437,"pitiless":-0.375,"piti":-0.25,"plagu":-0.312,"plaguey":-0.5,"plaguy":-1,"plaintiv":-0.375,"pout":-0.562,"premonit":-0.25,"presenti":-0.25,"provok":-0.25,"rancor":-0.75,"rancour":-0.375,"remors":-0.5,"repent":-0.25,"repugn":-0.25,"repuls":-0.25,"resent":-0.562,"revolt":-0.5,"revuls":-0.625,"rile":-0.75,"riski":-0.5,"roil":-0.25,"rue":-0.375,"rueful":-0.625,"ruth":-0.625,"ruthless":-0.25,"sad":-0.708,"sadden":-0.562,"scare":-0.25,"scarey":-0.625,"scarili":-0.25,"scari":-0.625,"scorn":-0.25,"shiveri":-0.562,"shudderi":-0.625,"shyness":-0.25,"sicken":-0.25,"sickish":-0.25,"skanki":-0.5,"sore":-0.312,"spite":-0.937,"spoil":-0.437,"spoilt":-0.25,"steam":-0.375,"stung":-0.75,"stupid":-0.25,"suffer":-0.25,"sulk":-0.625,"sulki":-0.625,"tantrum":-0.625,"tear":0.375,"terrifi":-0.5,"thwart":-0.25,"timid":-0.333,"timor":-0.25,"trepid":-0.25,"tumult":-0.292,"turmoil":-0.458,"umbrag":-0.375,"uncheer":-0.25,"uncollect":-0.25,"uneasili":-0.5,"unenvi":-0.625,"unfriendli":-0.5,"ungrat":-0.375,"unhop":-0.5,"unkind":-0.375,"unquiet":-0.375,"unsur":-0.437,"veng":-0.25,"venom":-0.25,"vexati":-1,"vile":-0.25,"vindict":-0.25,"warpath":-0.375,"weepi":-0.5,"weep":-0.875,"woe":-1,"woebegon":-0.687,"woefulli":-0.25,"worrisom":-0.5,"wrath":-0.5,"wrong":-0.292,"wroth":-0.5,"yucki":-0.5,"adroit":0.25,"affabl":0.25,"affluenc":1,"agreeabl":0.5,"allevi":-0.25,"amen":0.375,"amiabl":0.25,"applaud":0.25,"assoil":0.875,"auspici":0.25,"bankabl":0.813,"banner":0.875,"beamish":1,"beauteous":0.5,"beauti":0.333,"becom":0.813,"benign":0.313,"best":0.313,"bliss":0.25,"blithesom":0.875,"bonni":1,"boss":0.875,"bounc":0.25,"brag":0.875,"brillianc":0.875,"bulli":-0.25,"celebr":0.25,"cheeri":1,"cherub":0.25,"chipper":1,"come":0.875,"commonsens":0.875,"congratulatori":0.875,"congruous":0.75,"consum":0.25,"cork":1,"correctitud":1,"cosi":0.25,"couthi":0.875,"crack":-0.25,"credit":0.375,"dandi":1,"decor":0.25,"deliver":0.5,"desir":0.313,"diplomat":0.375,"dulcet":0.813,"eleemosynari":1,"especi":0.875,"eudaemonia":1,"eudaimonia":1,"exculp":0.375,"exoner":-0.375,"fab":1,"fame":0.5,"famous":1,"fetch":1,"finer":0.875,"fortuit":0.25,"further":0.25,"gaieti":0.875,"gift":0.313,"glorious":0.792,"gorgeous":0.25,"gratulatori":0.875,"groundbreak":0.875,"hale":0.5,"heroism":1,"highbrow":0.875,"idealis":0.25,"ideal":0.25,"ingeni":0.875,"innov":0.25,"jest":0.438,"jocos":0.25,"joke":0.438,"judici":0.375,"justifi":0.375,"laugh":0.25,"laureat":0.875,"levelhead":0.875,"lightheart":0.875,"logic":0.25,"luckili":0.875,"manner":0.875,"marvel":0.25,"master":0.375,"melliflu":0.875,"mellison":0.875,"merit":0.438,"meritori":0.25,"model":0.375,"nifti":1,"notabl":1,"note":0.875,"noteworthi":0.875,"obey":0.875,"okay":0.375,"opportun":0.375,"optimum":0.375,"pastim":0.875,"peac":0.875,"person":-0.25,"philogyni":0.875,"pluperfect":0.875,"pollyannaish":0.875,"prais":0.75,"praiseworthi":0.375,"precis":0.25,"preferenti":0.875,"present":0.25,"primo":0.25,"profus":0.375,"prolificaci":0.875,"proper":0.313,"proprieti":1,"prosper":0.688,"quotabl":0.375,"reanim":0.625,"renown":0.375,"reput":0.375,"rescu":1,"resplend":0.25,"reverenti":0.375,"revivifi":1,"riant":1,"saint":0.333,"saintlik":0.875,"sensibl":0.406,"sight":0.25,"sincer":0.438,"smash":1,"smile":0.375,"spif":0.875,"splendifer":1,"success":0.25,"suitabl":0.25,"sunni":1,"superb":0.938,"sweet":0.25,"swell":1,"take":1,"talent":0.875,"thrive":0.75,"top":0.25,"trust":0.375,"twink":1,"unfeign":0.375,"upbeat":0.438,"upstand":1,"valianc":1,"valor":1,"valour":1,"vener":0.25,"virtuoso":0.25,"wellb":1,"win":0.375,"wonder":0.25,"wondrous":0.25,"worth":0.313,"worthi":1,"worthwhil":0.875,"adynamia":-0.875,"afflict":-1,"anguish":-0.75,"animadvers":-0.875,"assum":-0.75,"asymmetri":-0.875,"atrophi":-0.625,"backward":0.313,"bale":-0.25,"bastard":-0.25,"berat":-0.75,"betray":-0.25,"bitchi":-0.25,"blamabl":-1,"blameabl":-1,"blame":-0.562,"blameworthi":-0.25,"blemish":-0.875,"blockhead":-0.25,"bloodguilti":-0.875,"bogus":-1,"bonehead":-0.25,"cabbag":-0.875,"caddish":-0.875,"caligin":-1,"callow":-0.625,"calumniatori":-1,"calumni":-0.25,"carnag":-1,"castig":-0.437,"catti":-0.25,"censur":-0.25,"charcoal":-0.281,"charnel":-0.875,"chinchi":-1,"churlish":-0.875,"clammi":-0.875,"cloddish":-1,"condemn":-0.35,"condemnatori":-1,"condol":-0.25,"contemptu":-0.25,"contrabandist":-1,"convict":-0.25,"crappi":-1,"crass":-0.25,"cuckold":-0.875,"culpabl":-0.25,"curmudgeon":-0.25,"dank":-0.875,"darken":-0.5,"darkish":-0.875,"decay":-0.333,"deceiv":-0.625,"defamatori":-1,"defect":-0.25,"delud":-0.875,"demot":0.25,"denigr":-0.333,"denigratori":-1,"desecr":-1,"despic":-0.75,"despoil":-0.25,"dickhead":-1,"difficult":-0.312,"disadvantag":0.375,"disagre":-0.25,"discontinu":-0.875,"disesteem":0.375,"disfluenc":-1,"disharmoni":-0.875,"dishearten":0.25,"dishonour":-0.25,"disregard":-0.812,"dissimul":-0.375,"dissymmetri":-0.875,"doltish":-0.25,"duncic":-1,"duncish":-1,"egregi":-0.875,"eyesor":-0.875,"fathead":-0.25,"fetid":-0.5,"filch":-0.875,"flagrant":-0.875,"flaw":-0.5,"foetid":-1,"foolish":-0.875,"forsak":-1,"frigid":-0.417,"frostili":-0.875,"frown":-0.5,"gammi":-0.875,"gaumless":-1,"ghoulish":-0.875,"gloat":-0.875,"godforsaken":-1,"gormless":-1,"harm":-0.25,"hell":-0.937,"hellhol":-1,"humbug":-0.333,"hypochondriac":-1,"illegitim":-1,"immoder":-0.75,"impass":0.25,"impugn":-0.875,"inadmiss":-0.25,"inan":0.25,"inaptitud":-1,"incapac":-1,"incompet":-0.35,"incomprehens":-0.437,"incoordin":-1,"indecor":-0.5,"inefficaci":-0.375,"ineffici":-0.25,"inelast":-0.625,"inexperienc":-1,"inexperi":-1,"inflex":-0.25,"inharmoni":-0.312,"involuntari":-1,"irrecover":-0.875,"liar":-1,"libel":-0.25,"loggerhead":-1,"loveless":-1,"malodor":-0.5,"malodour":-0.75,"manki":-1,"mar":-0.625,"massacr":-1,"menac":-0.25,"minaci":-1,"minatori":-1,"misappli":-0.875,"misbegot":-1,"misbegotten":-1,"misbehavior":-1,"misbehaviour":-1,"miscarri":-0.812,"mischiev":-0.875,"misde":-1,"misogynist":-0.25,"misus":-0.5,"motherfuck":-1,"nag":-1,"nasti":-0.792,"netherworld":-0.875,"nitwit":-0.375,"noncomprehens":0.375,"nondigest":-1,"nonliv":-0.875,"off":-1,"overpow":-0.875,"overwhelm":-0.375,"parsimoni":-0.312,"perplex":-0.25,"phobic":-1,"phoney":-0.375,"phoni":-0.375,"pilfer":-0.25,"pointless":-0.875,"presumptu":-1,"prevar":-0.25,"protest":-0.292,"psychopath":-0.375,"psychopatholog":-0.25,"purloin":-0.875,"putrefi":-0.375,"putresc":-0.375,"quack":-0.875,"rampag":-0.25,"rape":-0.875,"raucous":-0.875,"ravag":-0.312,"reprehens":-0.25,"roofi":-1,"rophi":-1,"rot":-0.25,"rotten":-0.25,"rubbishi":-0.875,"sack":-0.875,"scowl":-0.75,"scurril":-0.25,"selfish":-1,"senseless":-0.281,"shirti":-1,"shitti":-1,"shortcom":-1,"showdown":-0.875,"shrewish":-1,"slander":-0.25,"slay":-1,"slayer":-1,"smelli":-1,"smuggl":-0.25,"smuggler":-1,"snarf":-0.875,"snorti":-1,"spoilabl":-0.25,"spurn":-0.25,"static":-0.875,"stink":-0.75,"stinki":-0.5,"strife":-0.812,"suicid":-0.875,"sur":-1,"tactless":-0.25,"talentless":-0.75,"tempest":-0.875,"tenebrif":-1,"tenebri":-1,"tenebr":-1,"thickhead":-1,"unanim":0.375,"unappreci":-0.25,"unbend":0.375,"unchivalr":-0.375,"uncleanli":-1,"unconnected":-0.875,"unconstruct":-1,"uncoop":-0.812,"uncouth":-0.625,"uncreat":-0.75,"undeserv":-0.5,"undignifi":-0.875,"unenlighten":-0.25,"unfavor":-0.5,"unfavour":-0.5,"ungal":-0.875,"unknow":-0.375,"unknowledg":-1,"unmall":-1,"unmerit":-1,"unmitig":0.375,"unnavig":-0.875,"unoblig":-0.5,"unpass":-1,"unpercept":-0.312,"unpleasing":-1,"unrecover":-0.875,"unseemli":-1,"unsight":-1,"untravers":-0.875,"untrustworthi":-0.25,"untrusti":-0.25,"unwilling":-1,"unwis":0.375,"unworthi":-0.625,"vilif":-0.812,"wast":-0.437,"whoreson":-1,"wither":-0.25,"witless":-1,"accur":0.75,"admitt":0.75,"adopt":0.25,"advantag":0.5,"agog":0.75,"alter":0.25,"amend":0.25,"amus":0.25,"ancillari":0.75,"apposit":0.625,"appropri":-0.25,"assenti":0.75,"blest":0.75,"boffo":0.75,"bullish":0.75,"charismat":0.75,"cherish":0.375,"cognis":0.625,"cogniz":0.292,"cognosc":0.75,"compet":0.25,"compliant":0.75,"confirm":0.25,"confirmatori":0.75,"conform":0.25,"congruenc":0.75,"congruiti":0.75,"consider":0.25,"copacet":0.75,"copaset":0.75,"copeset":0.75,"copesett":0.75,"corrig":0.75,"corrobor":0.25,"corroboratori":0.75,"counten":0.75,"court":0.292,"courtship":0.75,"creditworthi":0.25,"cun":0.75,"curat":0.25,"debonair":0.75,"decid":0.375,"decorum":0.75,"deft":0.25,"dexter":0.25,"dextrous":0.75,"divert":0.25,"earnest":0.542,"ebulli":-0.25,"ecstat":0.75,"elast":0.625,"elig":0.25,"encomiast":0.75,"endear":0.25,"engag":0.75,"enliven":0.375,"enraptur":-0.375,"erot":0.25,"eulogist":0.375,"exalt":0.375,"experienc":0.75,"experi":0.333,"export":0.75,"felicit":0.375,"fertiliz":0.75,"festal":0.75,"festiv":0.5,"fever":-0.375,"fitting":0.75,"flatter":0.375,"flourish":0.542,"gain":0.281,"guard":-0.281,"halcyon":0.75,"handi":0.313,"harmon":0.375,"harmoni":0.25,"harmonis":0.75,"heal":0.375,"hedon":0.313,"hedonist":0.75,"honorif":0.75,"honour":0.625,"humor":0.25,"humour":0.25,"illustri":0.25,"impecc":0.375,"inspir":0.25,"iren":0.75,"jaunti":0.25,"knowabl":0.75,"laudatori":0.75,"livabl":0.75,"liveabl":0.75,"magnific":0.25,"majest":0.75,"malleabl":0.5,"manipul":0.25,"mesmer":0.5,"ok":0.75,"opportunist":0.75,"palmi":0.75,"panegyr":0.75,"pat":0.25,"peppi":0.25,"perfect":0.333,"perki":0.75,"photogen":0.75,"pious":0.625,"placat":0.375,"plastic":0.542,"pleasant":0.5,"pleasur":0.275,"polit":0.25,"practis":0.75,"prepossess":0.75,"prestigi":0.375,"prize":0.25,"profit":0.25,"promis":0.25,"promot":0.375,"prudent":0.5,"pulchritudin":0.75,"rapt":0.75,"raptur":0.75,"ratiocin":0.75,"rattl":-0.25,"ravish":0.25,"reconstruct":0.75,"reliabl":0.375,"rhapsod":0.75,"righteous":0.688,"roar":0.25,"rubicund":0.75,"sanat":0.75,"satiat":0.75,"scalabl":0.75,"seemli":0.75,"seem":0.25,"sensuous":0.25,"sinless":-0.25,"sociabl":0.25,"spellbind":0.75,"staid":0.75,"staunch":-0.5,"suav":0.75,"substanti":0.375,"symphoni":0.75,"tenabl":0.375,"timeserv":0.25,"toler":0.375,"treasur":0.313,"trusti":0.375,"underst":0.75,"unexception":0.75,"valid":0.375,"validatori":0.75,"valu":0.75,"verificatori":0.75,"verifi":0.25,"vers":0.75,"veteran":0.75,"voluntarili":0.75,"waggish":0.25,"welcom":0.5,"wholesom":0.75,"willing":0.75,"winsom":0.375,"woo":0.313,"workmanlik":0.75,"aboul":-0.75,"abul":-0.75,"achromasia":-0.75,"achromat":-0.375,"acidul":-0.25,"agonis":-0.5,"agon":0.25,"ala":-0.75,"algid":-0.375,"algophob":-0.75,"amateurish":-0.5,"asshol":-0.75,"atrabili":-0.75,"base":-0.304,"betis":-0.75,"blind":0.25,"brainish":-0.75,"brash":-0.25,"brokenheart":-0.75,"brusk":-0.75,"brusqu":-0.75,"bypass":-0.75,"cataclysm":-0.312,"ceciti":-0.75,"chargeabl":-0.75,"chastis":-0.25,"cheeki":-0.5,"chide":-0.375,"closefist":-0.75,"conscienceless":-0.75,"contum":-0.75,"crab":-0.75,"crabbi":-0.5,"craze":-0.75,"cruel":-0.5,"cussed":-0.75,"damnatori":-0.75,"damn":-0.25,"danger":-0.25,"darkl":-0.75,"deaf":-0.5,"derang":-0.25,"derid":-0.75,"deris":-0.437,"destruct":-0.25,"disapprob":-0.75,"disequilibrium":-0.75,"disingenu":-0.25,"disproport":-0.25,"dumbfound":0.25,"dustup":-0.75,"dyspept":-0.75,"empurpl":-0.75,"ersatz":-0.625,"exception":-0.75,"fallout":-0.75,"feebleminded":-0.75,"feign":-0.562,"feral":-0.75,"ferin":-0.75,"feroc":-0.75,"fetor":-0.75,"fierc":-0.75,"flightless":-0.75,"flummox":-0.75,"foetor":-0.75,"forceless":-0.75,"fragil":-0.25,"fraudul":-0.25,"gibelik":-0.75,"godless":-0.312,"gross":-0.75,"grotti":-0.75,"grouchi":-0.75,"grumpi":-0.25,"hardfist":-0.75,"hazard":-0.375,"heartbroken":-0.75,"hellish":0.25,"hex":-0.25,"hothead":-0.312,"hypochondria":-0.75,"hypochondriasi":-0.75,"hypopigment":-0.75,"ignor":-0.5,"imperfect":-0.25,"impetu":-0.25,"impieti":-0.75,"impious":-0.562,"impish":-0.25,"implac":-0.75,"implik":-0.75,"imprecis":-0.375,"improvid":-0.437,"imprud":-0.25,"inaccur":-0.75,"inadvis":0.25,"inauthent":-0.75,"incogniz":-0.5,"incompress":-0.75,"inconsol":-0.75,"indict":-0.25,"indigest":-0.25,"ineffect":-0.583,"ineffectu":-0.292,"inequit":-0.75,"inexpi":-0.75,"inextirp":-0.75,"inextric":-0.75,"infertil":-0.375,"inflict":-0.75,"inhospit":-0.25,"inopportun":-0.375,"insolv":-0.25,"insult":-0.5,"irk":-0.75,"irrevers":-0.25,"jeer":-0.625,"jinx":-0.312,"killer":-0.75,"kvetch":-0.312,"liverish":-0.75,"liveri":-0.75,"lynch":-0.375,"madcap":-0.375,"mephit":-0.75,"miserli":-0.75,"mislead":-0.625,"mobbish":-0.75,"moblik":-0.75,"mulish":-0.25,"mysophob":-0.75,"naiv":-0.75,"naivet":-0.75,"naiveti":-0.75,"nescienc":-0.75,"niff":-0.75,"niffi":-0.75,"nonintellectu":-0.75,"nonplus":-0.25,"objection":-0.75,"obnoxi":-0.75,"obtund":-0.75,"orneri":-0.5,"ostentati":-0.25,"pallid":-0.25,"pallor":-0.75,"peevish":-0.5,"penalis":-0.25,"penal":-0.25,"pernici":-0.437,"pettish":-0.625,"petul":-0.375,"pine":-0.75,"plain":-0.25,"pompos":-0.75,"pompous":-0.75,"pong":-0.75,"prankish":-0.75,"pretend":-0.25,"primit":-0.75,"puckish":-0.25,"punish":-0.25,"pusillanim":-0.625,"quetch":-0.75,"raunch":-0.75,"rebuk":-0.625,"reek":-0.75,"regrett":-0.25,"resourceless":-0.75,"revil":-0.75,"roughhous":-0.75,"rowdi":-0.25,"rude":-0.75,"satanophobia":-0.75,"schizophren":-0.25,"sham":-0.437,"sightless":-0.25,"sirrah":-0.75,"sneer":-0.562,"snide":-0.75,"spavin":-0.75,"splashi":-0.75,"springless":-0.75,"starv":-0.75,"stench":-0.75,"struggl":-0.75,"styleless":-0.75,"taunt":-0.375,"tearaway":-0.25,"techi":0.375,"testi":-0.75,"tetchi":-0.75,"throe":-0.687,"tightfist":-0.75,"tinpot":-0.75,"tortur":-0.375,"tragic":-0.437,"trashi":-0.75,"traumatis":-0.75,"traumat":-0.5,"trifl":-0.75,"troublesom":-0.25,"unadvis":-0.75,"unalert":-0.75,"unauthent":-0.75,"unawar":-0.5,"uncharit":-0.75,"unchast":-0.75,"uncivil":-0.75,"unclimb":-0.75,"unconsecr":-0.75,"unconsol":-0.75,"uncordi":-0.75,"uncorrect":-0.75,"undepend":-0.5,"undiplomat":-0.75,"undiscern":-0.75,"unedifi":-0.75,"unfertil":-0.75,"unfertilis":-0.75,"unforc":-0.75,"unforese":-0.75,"unforgiv":-0.5,"unfortun":-0.25,"unglamor":-0.75,"unglamour":-0.75,"ungodli":-0.75,"ungrac":-0.25,"ungraci":-0.375,"ungratifi":-0.5,"unhallow":-0.25,"unluckili":-0.75,"unmeritori":-0.75,"unpatriot":-0.75,"unpeac":-0.375,"unpermiss":-0.75,"unpopular":-0.25,"unpropiti":-0.375,"unrestraint":-0.75,"unrip":-0.75,"unripen":-0.75,"unsanctifi":-0.75,"unsightli":-0.75,"unsubstanti":-0.75,"untal":-0.75,"untoward":-0.75,"unvigil":-0.75,"unwatch":-0.75,"upbraid":-0.5,"vermin":-0.75,"vulgar":-0.562,"wan":-0.583,"whimper":-0.25,"whine":-0.75,"wimpish":-0.75,"wimpi":-0.75,"wist":-0.5,"worriment":-0.75,"worthless":-0.75,"wreck":-0.375,"xenophob":-0.75,"yen":-0.75,"abl":0.688,"abund":0.375,"accept":0.313,"accessari":0.625,"access":0.438,"accessori":0.688,"acclaim":0.5,"accommod":0.25,"accord":0.25,"accredit":0.25,"ace":0.625,"adequ":0.625,"adjuv":0.688,"administr":-0.25,"admiss":0.25,"adorn":0.625,"advis":0.25,"aesthet":0.25,"affirmatori":0.625,"aliment":0.375,"alimentari":0.625,"allegi":0.625,"allur":0.625,"angel":0.25,"anim":0.25,"anthelminth":0.625,"anthelmint":0.625,"antifertil":0.625,"antimicrobi":0.625,"antimicrob":0.625,"appeas":0.5,"apprais":-0.25,"approach":0.583,"aptitud":0.625,"ascrib":0.625,"assidu":0.625,"assist":0.25,"astut":0.625,"attir":0.375,"attract":0.25,"autoerot":0.625,"awar":0.375,"awesom":0.625,"awe":0.375,"bankrupt":0.625,"banter":-0.375,"baroni":0.625,"beatif":0.375,"beatifi":0.625,"benefit":0.688,"blanket":0.625,"blate":0.625,"bless":0.313,"bonzer":0.625,"bounci":0.625,"bow":0.625,"brace":0.625,"brilliant":0.521,"cagey":0.563,"cagi":0.563,"cantabil":0.625,"canti":0.625,"capabl":0.375,"carpetbag":0.375,"cathol":0.625,"celib":0.625,"certificatori":0.625,"champion":-0.375,"chari":0.375,"chast":-0.25,"chewabl":0.625,"chic":0.25,"chirpi":0.5,"chivalr":0.25,"choic":0.5,"christian":0.5,"christlik":0.625,"christ":-0.25,"circumspect":0.625,"cleanli":0.625,"clever":0.25,"closelip":0.625,"closemouth":0.625,"comest":0.625,"comfi":0.625,"companion":0.25,"compat":0.313,"complais":0.625,"comrad":0.625,"concept":0.375,"concili":0.625,"concupisc":0.625,"condit":0.25,"congeni":0.688,"consecr":0.625,"consensu":0.625,"consent":0.625,"consist":0.281,"conson":0.25,"construct":0.375,"consumm":0.375,"contracept":0.625,"control":0.25,"convivi":0.25,"cordial":0.667,"countywid":0.625,"craftsmanship":0.625,"crafti":0.625,"creativ":0.625,"cure":-0.25,"cute":0.25,"cuttabl":0.625,"danceabl":0.625,"dash":0.25,"dear":0.333,"dedic":0.25,"deduct":0.625,"defer":0.25,"deferenti":0.625,"delici":0.563,"democrat":0.25,"describ":0.625,"deserv":0.5,"design":0.25,"detail":0.25,"dilig":0.563,"discrimin":0.25,"dishi":0.625,"dispos":0.375,"docil":0.25,"dose":0.625,"drinkabl":0.375,"eatabl":0.625,"edibl":0.25,"edifi":0.5,"educ":0.25,"efficaci":0.25,"elabor":0.438,"enabl":0.5,"encyclopaed":0.625,"encycloped":0.625,"entertain":0.375,"entic":0.292,"enwrap":0.625,"epicurean":0.375,"epoch":0.625,"equit":0.625,"errorless":0.625,"esthet":0.25,"ethic":0.25,"eudaemon":0.625,"eudemon":0.25,"euphoni":0.5,"euphon":0.375,"evalu":0.625,"exact":0.25,"execut":0.25,"expans":0.25,"expedi":0.25,"explain":0.625,"explic":0.625,"explod":0.625,"express":0.25,"faceti":0.375,"faith":0.375,"fancifi":0.625,"farcic":0.625,"feasibl":0.25,"fecund":0.563,"feel":0.625,"felic":0.625,"fertil":0.25,"finespun":0.563,"fit":0.375,"fitter":0.625,"forese":0.625,"format":0.625,"foster":0.438,"foxi":0.625,"friski":0.625,"fruit":0.25,"gallant":0.25,"gentlemanlik":0.625,"gentleman":0.625,"getat":0.625,"goodish":0.625,"govern":0.625,"grace":0.313,"grand":0.375,"greatest":0.625,"groovi":0.625,"guil":0.625,"habit":0.25,"halal":0.563,"hallow":0.5,"handsom":0.688,"harmoniz":0.625,"health":0.375,"healthier":0.625,"healthi":0.675,"heartfelt":0.625,"helminth":0.625,"help":0.25,"histori":0.625,"homelik":0.625,"homey":0.625,"homi":0.625,"hospit":0.25,"hygien":0.25,"identifi":0.25,"idyl":0.688,"imagin":0.25,"implement":-0.25,"impos":-0.25,"improv":0.25,"incis":0.25,"indulg":0.667,"inform":0.25,"ingrati":0.563,"inhabit":0.625,"inspirit":0.25,"intellig":0.25,"intent":0.25,"interesting":0.625,"interpret":-0.25,"intim":0.625,"invent":0.625,"iter":0.625,"jape":0.625,"kill":-0.25,"kittenish":0.625,"knavish":0.625,"know":0.25,"knowledg":0.25,"kosher":0.563,"ladylik":0.25,"lamblik":0.625,"laurel":0.625,"leal":0.625,"learn":0.542,"letter":0.625,"licenc":0.25,"licens":0.25,"licit":0.25,"lieg":0.313,"lifelik":0.563,"lightsom":0.688,"liven":0.625,"lofti":0.313,"lovabl":0.625,"loveabl":0.625,"loyal":0.25,"lucki":0.708,"lucrat":0.5,"lustrous":0.542,"lusti":0.375,"luxuri":0.25,"lyric":0.5,"maintain":0.375,"manag":0.25,"matey":0.625,"maxim":0.25,"maximum":0.625,"mean":-0.312,"meaning":0.25,"meek":0.542,"meet":0.625,"melodi":0.25,"merriment":0.625,"meticul":0.688,"metier":0.563,"mirrorlik":0.625,"mitig":-0.5,"moralist":0.625,"moral":0.25,"neighbor":0.25,"neighbour":0.25,"nonneg":0.625,"nourish":0.25,"nutrient":0.625,"nutriti":0.375,"nutrit":0.375,"oblig":0.25,"observ":0.25,"olympian":0.688,"oper":0.25,"opul":0.25,"origin":0.313,"overabund":0.625,"overcauti":0.625,"overcredul":-0.25,"overjoy":0.375,"overrid":0.625,"overrip":0.625,"pacif":0.25,"painter":0.625,"palli":0.625,"paramount":0.625,"parasiticid":0.625,"passabl":0.375,"passion":0.375,"peachi":0.688,"percipi":0.625,"perfum":0.625,"permut":-0.25,"perspicaci":0.25,"pertin":0.375,"picturesqu":0.563,"pieti":0.625,"playabl":0.625,"pleasing":0.625,"pledg":0.625,"plenari":0.625,"plenteous":0.625,"plenti":-0.5,"plethor":0.625,"polish":0.25,"popular":-0.25,"potabl":0.375,"precaut":-0.25,"precious":0.25,"precook":0.625,"predomin":0.375,"premium":0.625,"prepar":0.542,"preponder":0.625,"prescient":0.625,"preserv":0.25,"prettifi":0.625,"priggish":0.625,"prim":0.563,"prime":0.3,"prizewin":0.625,"product":0.25,"prolif":0.563,"pronounc":0.375,"prophylact":0.542,"propiti":0.25,"prudish":-0.25,"punctur":0.25,"purpos":0.25,"pursuant":0.625,"ralli":0.625,"randi":0.625,"ration":0.375,"readi":0.525,"reason":0.25,"recherch":0.625,"reclaim":0.625,"recollect":0.5,"reconcil":0.5,"recup":0.625,"recycl":0.625,"redeem":0.5,"refer":0.625,"refresh":0.375,"rehabilit":0.375,"reinforc":0.563,"reiter":0.625,"releas":0.625,"remedi":0.25,"repeat":0.25,"resolut":0.438,"restor":0.563,"reusabl":0.625,"rever":-0.25,"reverend":0.625,"rich":0.385,"rous":0.563,"ruddi":0.375,"ruttish":0.625,"sacr":0.575,"sagaci":0.625,"salubri":0.688,"sanctifi":0.438,"sane":0.625,"saniti":0.625,"scintil":0.5,"season":0.25,"secret":-0.312,"sedat":0.25,"sedul":0.625,"select":0.25,"semiconduct":0.625,"serendipit":0.625,"seriocom":0.625,"servic":0.25,"shape":0.25,"shine":0.25,"sidesplit":0.625,"simplifi":0.25,"sing":0.625,"sinkabl":0.625,"slavelik":0.625,"sli":0.625,"snazzi":0.625,"solemn":0.375,"solvenc":0.625,"sophist":-0.375,"spaciotempor":0.625,"spark":0.563,"speakabl":0.625,"specifi":0.375,"splendor":0.563,"splendour":0.563,"stabl":0.25,"stalwart":0.375,"standardis":0.625,"standard":0.425,"state":0.5,"statewid":0.625,"steadfast":0.25,"sterl":0.625,"stir":0.25,"straightarrow":0.625,"straightlac":0.625,"strengthen":0.25,"stud":0.625,"sublim":0.25,"suffici":0.375,"sumptuous":0.625,"super":0.375,"superabund":0.25,"superl":0.625,"support":-0.25,"suprem":0.531,"surpass":0.25,"suscept":0.25,"sworn":0.563,"sybarit":0.625,"synerget":0.625,"systemat":0.625,"tact":0.375,"tamabl":0.625,"tameabl":0.625,"tast":0.25,"teachabl":0.625,"tempt":0.625,"test":0.563,"therapeut":0.313,"thorough":0.313,"thrifti":0.563,"tightlip":0.625,"time":0.375,"tiptop":0.625,"topnotch":0.625,"tractabl":0.375,"transpos":0.625,"tremend":0.25,"tricksi":0.625,"tri":0.25,"true":0.25,"trueheart":0.625,"truth":0.438,"unalarm":0.625,"unalloy":0.625,"unbeaten":0.625,"unburi":0.625,"unconqu":0.625,"uncoupl":0.25,"undef":0.625,"unharm":0.625,"uninfect":0.625,"unscath":0.625,"unswerv":0.563,"unvanquish":0.625,"upgrad":0.525,"upscal":0.625,"utter":0.313,"valuabl":0.375,"verdant":0.625,"verv":0.625,"viabl":0.563,"victorian":0.625,"victori":0.625,"viewabl":0.625,"vim":0.625,"virtuous":0.375,"vital":0.25,"vivifi":0.688,"voguish":0.563,"voluptuari":0.625,"voluptu":0.25,"votiv":0.625,"vowellik":0.625,"whip":-0.271,"wili":0.625,"wise":0.5,"workabl":0.625,"workmanship":0.625,"zippi":0.625,"abetalipoproteinemia":-0.625,"abus":-0.25,"acerb":-0.417,"ach":-0.25,"achi":-0.625,"acn":-0.625,"acrimoni":-0.25,"adam":-0.375,"addl":-0.562,"ail":-0.5,"alien":-0.375,"ambuscad":-0.5,"ambush":-0.375,"amnesiac":-0.375,"amyotonia":-0.625,"anaemia":-0.562,"anemia":-0.562,"apathi":-0.687,"apocalypt":-0.437,"assassin":-0.375,"atonia":-0.625,"aton":0.25,"atoni":-0.625,"attaint":-0.562,"badinag":-0.625,"ballup":-0.625,"bane":-0.25,"barbar":-0.25,"battl":-0.625,"bedlam":-0.625,"beneath":-0.625,"bilious":-0.625,"bittersweet":-0.562,"blackguard":-0.25,"blain":-0.625,"boo":-0.5,"boorish":-0.25,"bounderish":-0.625,"brattish":-0.625,"bratti":-0.625,"brawler":-0.625,"brazen":-0.25,"breakabl":0.25,"broke":-0.625,"brook":-0.625,"buffalo":-0.625,"burdensom":-0.625,"buri":-0.625,"bust":-0.625,"cacographi":-0.625,"caitiff":-0.5,"canard":-0.625,"catcal":-0.25,"chicaneri":-0.625,"chintzi":-0.625,"clash":-0.5,"clavus":-0.625,"coars":-0.25,"cockup":-0.625,"combat":-0.25,"complex":-0.625,"conceited":-0.625,"condescend":-0.625,"cozen":-0.625,"crackbrain":-0.625,"crazi":-0.25,"creepi":-0.562,"crepuscular":-0.625,"criminalis":-0.625,"cruditi":-0.562,"daimon":-0.625,"dare":-0.417,"dastardli":-0.625,"decept":-0.25,"decri":-0.625,"desert":0.25,"desperado":-0.625,"detriment":-0.5,"difficulti":-0.719,"dim":-0.25,"ding":0.25,"discord":-0.375,"discourt":-0.625,"disinterest":-0.625,"disjointed":-0.625,"disobey":-0.625,"disoblig":-0.625,"disproportion":-0.687,"disqualifi":-0.25,"disrespect":-0.25,"dissembl":-0.375,"dissenti":-0.312,"disun":-0.625,"divis":-0.625,"dogsbodi":-0.625,"doom":-0.625,"dork":-0.625,"dowdi":-0.375,"downspin":-0.625,"downstair":-0.625,"drudg":-0.25,"dupe":-0.25,"duski":-0.25,"dysmenorrhea":-0.625,"elegi":-0.625,"element":-0.625,"endang":-0.375,"enjoin":-0.625,"erythroderma":-0.625,"excori":-0.5,"excruci":-0.375,"factious":-0.625,"faint":-0.25,"faithless":-0.625,"fake":-0.292,"fallen":-0.531,"falsifi":-0.25,"famin":-0.562,"fickl":-0.625,"fitch":-0.625,"flash":-0.625,"flinch":-0.375,"fob":-0.625,"forbid":-0.375,"foulmart":-0.625,"foumart":-0.625,"frangibl":-0.625,"fray":-0.5,"frivol":-0.25,"frowsti":-0.625,"frump":-0.625,"funk":-0.625,"fusillad":-0.625,"garish":-0.437,"gauch":-0.375,"ghast":-0.687,"gimcrack":-0.625,"gouti":-0.625,"graceless":-0.5,"grizzl":-0.25,"gruff":-0.625,"haphazard":0.313,"hardship":-0.583,"harsh":-0.406,"hueless":-0.625,"huff":-0.25,"humdrum":-0.562,"hurt":-0.625,"hypognath":-0.625,"hypothyroid":-0.625,"ill":-0.375,"illegalis":-0.625,"illeg":-0.25,"illog":-0.312,"illogic":-0.625,"imaginari":-0.625,"imbal":-0.562,"immor":-0.25,"immunodefici":-0.5,"immut":-0.625,"imperson":-0.562,"imprec":-0.25,"inadequaci":-0.583,"inanim":-0.542,"inanit":-0.687,"inargu":-0.625,"incrimin":-0.5,"inculp":0.375,"inelig":-0.25,"inexor":-0.562,"inexpress":-0.625,"inexpugn":-0.625,"inferno":-0.625,"inhum":-0.25,"insenti":-0.625,"insubstanti":-0.375,"inter":-0.25,"intoler":-0.375,"intransig":-0.375,"invect":-0.625,"irrat":-0.25,"irreduc":-0.625,"jejun":-0.437,"jumbl":-0.625,"kaput":-0.625,"labor":-0.625,"labour":-0.625,"languish":-0.583,"licenti":-0.625,"listless":-0.312,"looney":-0.625,"looni":-0.25,"lordosi":-0.625,"lose":-0.625,"loss":-0.625,"lousi":-0.25,"loutish":-0.625,"lowbr":-0.625,"maladroit":-0.625,"mangey":-0.625,"mangi":-0.375,"maraud":0.25,"mephiti":-0.562,"meritless":-0.625,"meshuga":-0.625,"meshugga":-0.625,"meshugg":-0.625,"meshuggeneh":-0.375,"meshuggen":-0.375,"miff":-0.625,"misgovern":-0.375,"misrul":-0.625,"mongrel":-0.625,"mongrelis":-0.625,"moros":-0.5,"murk":-0.625,"neandert":-0.625,"neanderth":-0.625,"nemesi":-0.625,"nerv":-0.292,"nonchal":-0.25,"nonconform":-0.25,"nutcas":-0.625,"oafish":-0.625,"object":0.25,"objurg":-0.375,"obscur":-0.5,"odynophagia":-0.625,"omin":-0.687,"oner":-0.625,"ordeal":-0.562,"osteophyt":-0.625,"outlaw":-0.25,"palsi":-0.625,"pandemonium":-0.625,"paranoid":-0.375,"paraplegia":-0.625,"parapleg":-0.625,"paroxysm":-0.625,"patronis":0.25,"patron":0.25,"penuri":-0.25,"perdit":-0.625,"perish":-0.25,"pimpl":-0.25,"pimpli":-0.625,"pittanc":-0.625,"poor":-0.5,"precursori":-0.625,"predica":-0.625,"premonitori":-0.625,"pretenti":-0.562,"prognath":-0.625,"psychoneurot":-0.375,"puffi":-0.562,"pustul":-0.625,"puzzl":-0.25,"quail":0.25,"quarrelsom":-0.25,"rage":-0.458,"razz":-0.625,"reneg":0.25,"reprehend":-0.625,"reprimand":-0.5,"reproach":-0.5,"reproof":-0.625,"reprov":-0.5,"revok":0.375,"roughish":-0.625,"rubbish":-0.625,"safehold":-0.625,"scandalis":-0.312,"scandal":-0.312,"scarc":-0.625,"scarciti":-0.625,"schmo":-0.625,"schmuck":-0.625,"scoff":-0.5,"scof":-0.625,"scold":-0.375,"scoundrelli":-0.625,"scrambl":-0.25,"scrawl":-0.25,"scruffi":-0.625,"shiftless":-0.25,"shmo":-0.625,"shmuck":-0.625,"shoddi":-0.25,"skint":-0.625,"sleaz":-0.625,"smart":-0.625,"snappish":-0.5,"somber":-0.562,"sombr":-0.562,"sordid":-0.281,"speechless":-0.25,"spiritless":-0.625,"spurious":-0.625,"squandermania":-0.625,"sterilis":-0.625,"steril":-0.25,"stochast":-0.625,"stomach":-0.25,"storm":-0.4,"strictur":-0.625,"subnorm":-0.562,"subpoena":-0.375,"succor":-0.375,"succour":-0.375,"sullen":-0.437,"surli":-0.625,"swart":-0.625,"swarthi":-0.25,"swearword":-0.625,"swoon":-0.375,"tart":-0.25,"tasteless":-0.625,"tat":-0.625,"tawdri":-0.375,"threaten":-0.25,"thumb":-0.625,"tired":-0.625,"toil":-0.625,"treacher":-0.562,"trick":-0.625,"tsk":-0.625,"tsori":-0.625,"tut":-0.625,"tyrannicid":-0.625,"unaccept":-0.25,"unaccommod":-0.562,"unalien":-0.625,"unappetis":-0.625,"unappet":-0.625,"unargu":-0.25,"unattack":-0.625,"unattract":-0.25,"unauthoris":-0.687,"unauthor":-0.687,"unbear":-0.625,"unbeat":-0.625,"unbless":-0.625,"unceremoni":-0.5,"uncheck":-0.625,"unconcern":-0.562,"unconsci":-0.375,"uncultur":-0.625,"underworld":-0.687,"unendur":-0.625,"unenliven":-0.625,"unentitl":-0.625,"unexpress":0.25,"unfail":-0.625,"unflatt":-0.625,"ungener":-0.625,"unguard":-0.625,"unhappili":-0.625,"unhealthi":-0.25,"unholi":-0.25,"unknowing":-0.625,"unmodifi":-0.625,"unpersuad":-0.625,"unpleas":-0.25,"unprofit":-0.25,"unqualifi":-0.25,"unrecept":-0.625,"unreform":0.375,"unregular":-0.625,"unreli":-0.5,"unremun":-0.625,"unright":-0.625,"unsaf":-0.625,"unsanctif":-0.625,"unsatisfactori":-0.25,"unsatisfi":-0.25,"unscholar":-0.625,"unscrupul":-0.5,"unstatesmanlik":-0.625,"unsuas":-0.625,"unsuccess":-0.625,"untempt":-0.625,"unthink":-0.625,"untrac":-0.625,"unverifi":-0.625,"unwit":-0.375,"vinegarish":-0.562,"vinegari":-0.562,"vituper":0.25,"volatil":-0.562,"wail":-0.25,"wangl":-0.625,"war":-0.625,"weari":0.25,"weirdo":-0.562,"wile":-0.625,"wrangl":-0.375,"yokelish":-0.625,"abli":0.5,"abound":0.5,"aboveboard":0.5,"abreast":-0.25,"absorb":0.25,"acceler":0.5,"acclam":0.5,"accliv":0.5,"accolad":0.5,"accomplish":0.333,"achiev":-0.25,"acquiesc":0.5,"action":0.5,"adapt":0.25,"addict":-0.25,"address":0.375,"adequaci":0.5,"adjust":0.25,"adrenocorticotroph":0.5,"adrenocorticotrop":0.5,"advanc":0.333,"advert":0.25,"affluent":0.5,"agap":0.5,"agglomer":0.5,"agglom":0.5,"agil":0.25,"aglitt":0.5,"airworthi":0.5,"alright":0.5,"amalgam":0.25,"amendatori":0.5,"amentac":0.5,"amentifer":0.5,"anchorit":0.375,"answer":-0.25,"antimonopoli":0.5,"antitrust":0.5,"apart":0.5,"aplanat":0.5,"apocryph":0.5,"apodeict":0.5,"apodict":0.5,"appetis":0.5,"appet":-0.25,"applaus":0.5,"applic":0.25,"applicatori":0.5,"appos":0.5,"apropo":0.25,"apt":0.25,"arabl":0.5,"arbitrari":0.5,"aright":0.5,"artistri":0.5,"ascend":0.25,"ascens":0.5,"ascertain":0.375,"asept":0.5,"aspir":0.25,"assent":0.25,"assert":-0.375,"assess":0.5,"associ":0.25,"assuag":0.5,"attach":0.406,"attun":0.5,"autofluoresc":0.5,"autogam":0.5,"auxiliari":0.5,"avert":0.5,"avoid":0.25,"avouch":0.5,"avow":0.375,"aweari":0.5,"axen":0.5,"azur":0.25,"babelik":0.5,"beadlik":0.5,"beadi":0.5,"befit":0.375,"being":0.5,"belov":0.5,"betroth":0.25,"better":0.417,"bet":-0.25,"biddabl":0.5,"bigheart":0.5,"bimanu":0.5,"bindabl":0.5,"bookish":0.5,"boom":0.5,"border":0.5,"born":0.5,"bosomi":0.5,"bounden":0.5,"bounteous":0.25,"bounti":0.25,"bravura":0.5,"breathtak":0.5,"bridgeabl":0.5,"buffoonish":0.5,"built":0.5,"bullocki":0.5,"bunc":0.5,"buoyant":0.5,"busti":0.5,"buttonlik":0.5,"buttoni":0.5,"cadenc":0.5,"cadent":0.5,"callipygian":0.5,"callipyg":0.5,"canni":0.5,"canor":0.5,"casebook":0.5,"catch":0.5,"cathart":0.5,"causal":0.5,"cautious":0.5,"centralis":0.375,"central":0.375,"certif":0.281,"cerulean":0.25,"chain":0.5,"champlev":0.5,"characterist":0.5,"cheerili":0.5,"chief":0.5,"childlik":0.5,"chisel":0.5,"chubbi":0.5,"circumstanti":0.375,"citywid":0.5,"civil":0.25,"clabber":0.5,"clap":0.5,"cleanabl":0.5,"clink":0.375,"cloisonn":0.5,"cloistral":0.5,"cloudless":0.5,"clownish":0.5,"clownlik":0.5,"coalesc":0.375,"coax":0.5,"cocksur":0.25,"cogit":0.5,"color":-0.25,"colour":0.313,"combust":-0.25,"comeli":0.5,"commit":0.25,"complement":0.375,"complet":0.313,"compliment":0.5,"comprehend":0.375,"comprehens":0.313,"conciliatori":0.5,"condign":0.5,"conduct":0.5,"confeder":0.5,"confed":0.5,"confin":0.292,"conscion":0.5,"conscious":0.5,"consentan":0.5,"consenti":0.5,"consid":0.5,"constrain":0.5,"contract":0.25,"conventu":0.5,"convers":0.25,"copious":0.375,"copybook":0.5,"copyedit":0.5,"copyread":0.5,"coquettish":0.5,"corrupt":0.25,"corusc":0.5,"cosher":0.5,"countrywid":0.5,"crackerjack":0.5,"credibl":0.25,"cultiv":0.275,"cultivat":0.5,"curabl":0.375,"curvac":0.5,"dapper":0.5,"darl":0.375,"daytim":0.5,"debonnair":0.5,"declar":0.438,"defin":0.5,"definit":0.25,"deliber":0.5,"delux":0.5,"denazifi":0.5,"derestrict":0.5,"desegreg":0.25,"destabilis":-0.375,"detach":0.5,"determin":0.25,"diagnos":0.5,"dianoet":0.5,"didactic":0.5,"digest":0.5,"dignifi":0.375,"direct":0.375,"dirig":0.5,"disabus":0.5,"disavow":0.5,"discern":0.406,"disciplin":0.438,"discover":0.5,"discret":0.375,"disinfl":0.5,"disjoin":0.25,"distinguish":0.375,"distrust":-0.25,"doabl":0.5,"donat":0.5,"dress":0.313,"drill":0.5,"droll":0.5,"ducal":0.5,"ductil":0.5,"eclect":0.25,"ecumen":0.25,"edit":0.25,"effect":0.313,"effectu":0.438,"elasticis":0.5,"elastic":0.5,"elder":0.5,"elit":0.25,"eloqu":0.5,"emancip":-0.25,"embonpoint":0.25,"emend":0.25,"empathet":0.375,"empath":0.25,"enchain":0.5,"encompass":0.5,"endergon":0.5,"engross":0.438,"enhanc":0.375,"enough":0.5,"enur":0.5,"epideict":0.5,"epigrammat":0.5,"ergod":0.5,"erudit":0.5,"eugen":0.25,"evid":-0.25,"evidenti":0.5,"evit":0.5,"exchang":0.375,"exhaust":0.25,"exhort":0.5,"exhortatori":0.5,"exoter":0.5,"expediti":0.25,"explicit":0.5,"extant":0.5,"exterior":0.5,"extol":0.5,"extraordinair":0.5,"extravers":0.5,"extrovers":0.5,"face":0.5,"facilitatori":0.5,"factual":0.25,"fain":0.5,"familiaris":0.25,"familiar":0.25,"famish":-0.375,"fatherlik":0.5,"father":0.5,"featur":0.313,"fervenc":0.5,"fervid":-0.25,"fettl":0.5,"filmabl":0.5,"fission":0.5,"flirtati":0.5,"foldabl":0.5,"foldaway":0.5,"fold":0.5,"freebe":0.5,"freebi":0.5,"freeheart":0.5,"freewil":0.5,"fulgid":0.5,"fuse":0.5,"galvanis":0.5,"galvan":0.25,"gape":0.5,"gem":0.5,"gentlefolk":0.5,"germfre":0.5,"germin":0.5,"getabl":0.5,"gettabl":0.5,"ginger":0.5,"give":0.5,"glamoris":0.375,"glamour":0.25,"glint":0.5,"glister":0.5,"glitter":0.25,"glitteri":0.5,"glossi":0.25,"glow":0.5,"go":0.5,"godsend":0.5,"grandeur":0.5,"greater":0.5,"greatheart":0.5,"grip":0.5,"grovel":0.5,"gushi":0.5,"hammi":0.5,"handclap":0.5,"hear":0.5,"heartwarm":0.5,"hearti":0.5,"heed":0.375,"hermit":0.5,"histrion":0.5,"homeopathi":0.5,"homoeopathi":0.5,"honest":0.313,"honey":0.375,"hortat":0.5,"hortatori":0.5,"huge":0.25,"hurri":0.25,"hypnotis":0.25,"hypnot":0.25,"idolis":0.5,"idol":0.5,"ignesc":0.5,"immens":0.5,"immunocompet":0.375,"impel":0.375,"importun":0.5,"impress":0.25,"impression":0.5,"incorrupt":-0.375,"indefatig":0.25,"inebri":-0.25,"inflat":0.5,"influenti":0.5,"inlaid":0.5,"inpati":0.5,"insight":0.25,"integr":-0.25,"intellectu":0.25,"intend":0.5,"interact":0.375,"interest":0.375,"introvers":0.5,"introvert":0.25,"inur":0.25,"invalu":0.375,"invigor":0.313,"inviol":-0.281,"invitatori":0.5,"invit":0.25,"inwrought":0.5,"irremedi":0.5,"jewel":0.5,"jimdandi":0.5,"jimhickey":0.5,"judic":0.5,"key":0.25,"kindheart":0.5,"knockout":0.5,"kudo":0.5,"laborsav":0.5,"laboursav":0.5,"laden":0.5,"landscap":0.5,"laud":0.5,"laudat":0.5,"lauder":0.5,"law":0.375,"legal":0.25,"leg":0.5,"legibl":0.5,"limb":0.5,"loan":0.5,"loungewear":0.5,"loveli":0.5,"lucid":0.25,"lucullan":0.5,"lust":0.5,"macro":0.5,"maestro":0.5,"magniloqu":0.5,"maneuver":0.5,"manoeuvr":0.5,"marksmanship":0.5,"marriag":0.5,"match":-0.25,"matur":0.375,"medic":0.25,"medicin":0.375,"mesmeris":0.5,"minc":0.5,"mind":0.25,"ministr":-0.375,"mint":0.5,"miscibl":0.5,"mismat":0.5,"mistak":-0.25,"mistrust":-0.25,"mixabl":0.5,"modernis":0.5,"modern":0.25,"monast":0.5,"motil":0.5,"motiv":0.25,"moveabl":0.5,"muggin":0.5,"must":0.5,"myopia":0.5,"narcism":0.5,"narciss":0.5,"nationwid":0.5,"natti":0.5,"nearsighted":0.5,"neighborli":0.5,"neighbourli":0.5,"neutralis":-0.344,"neutral":-0.25,"newsworthi":0.5,"nightlong":0.5,"nimbl":0.25,"nonbelliger":0.5,"nonpartisan":0.375,"nonpartizan":0.375,"nose":0.5,"notic":0.25,"novel":0.5,"nubil":0.5,"numer":0.5,"obedi":0.375,"obtain":0.5,"oecumen":0.375,"omiss":0.25,"openhand":0.5,"oppos":0.5,"orient":0.25,"orthotrop":0.5,"otherworldli":0.5,"outdoorsi":0.5,"overambiti":0.5,"overconfid":0.25,"overdress":0.5,"overf":0.5,"overindulg":0.5,"overlook":0.25,"overnight":0.5,"overprais":0.5,"overr":0.5,"overt":0.5,"owlish":0.5,"palat":-0.25,"panel":0.5,"panopt":0.375,"paperboard":0.5,"participatori":0.5,"particularis":0.5,"particular":0.5,"patriot":0.25,"pawki":0.5,"pay":0.5,"pension":0.5,"pent":0.5,"permiss":0.438,"persev":-0.375,"persuas":0.25,"philanthrop":0.5,"pinkish":0.5,"piquant":0.5,"pithi":0.5,"placatori":0.5,"plaudit":0.5,"plausibl":0.25,"play":0.417,"pleasantri":0.5,"pleaser":0.5,"pliant":0.5,"plump":0.25,"plush":0.5,"pomad":0.5,"pornograph":0.25,"power":0.25,"praisworthi":0.5,"prayer":0.5,"preachi":0.5,"presumpt":0.5,"priceless":0.375,"prima":0.5,"princ":0.5,"princip":0.5,"principl":0.5,"prissi":0.5,"probat":0.375,"probatori":0.5,"procur":0.5,"propel":0.5,"protrus":0.5,"protrusil":0.5,"prove":0.5,"proven":0.5,"provid":0.5,"prowess":0.5,"proxim":0.5,"prudenti":0.5,"prurient":0.5,"publish":0.5,"pucka":0.5,"pukka":0.5,"qualiti":0.5,"quantifi":0.5,"raci":0.5,"raisabl":0.5,"raiseabl":0.5,"rapid":0.25,"ratifi":0.25,"reachabl":0.5,"recharg":0.5,"recogniz":0.25,"recover":-0.375,"rectifi":0.271,"rectitud":0.5,"reflect":0.375,"reform":0.25,"reformatori":0.25,"refreshen":0.5,"refurbish":0.5,"regent":0.5,"regul":0.25,"reinvigor":0.25,"remun":0.5,"renew":0.25,"rentabl":0.5,"repar":0.5,"repetiti":0.5,"replet":0.375,"represent":0.5,"rest":0.375,"restrict":0.25,"retain":0.5,"retract":0.5,"retrouss":0.5,"revitalis":0.5,"revit":0.25,"reviv":0.25,"reward":0.417,"rim":0.5,"ripen":0.5,"rivalri":0.5,"rivet":0.5,"rotat":0.5,"sacrosanct":0.5,"sage":0.375,"salabl":0.5,"saleabl":0.5,"saphead":0.5,"sapient":0.5,"sapienti":0.5,"save":0.5,"scholar":0.5,"schoolwid":0.5,"seamanlik":0.5,"seaman":0.5,"seamanship":0.5,"seeabl":0.5,"semipreci":0.5,"septicem":0.5,"sequin":0.5,"seraph":0.5,"sex":0.5,"shameless":-0.25,"sheath":0.25,"shew":0.5,"shockabl":0.5,"shrinkabl":0.5,"signal":0.5,"singabl":0.5,"slapstick":0.5,"slash":0.292,"slumberi":0.5,"soign":0.5,"soigne":0.5,"sold":0.5,"solvabl":0.25,"somat":0.5,"somnol":0.25,"song":0.5,"sonsi":0.5,"soul":0.375,"spangl":0.5,"spang":-0.25,"spank":0.25,"speak":0.5,"specialis":0.375,"special":0.25,"specif":0.25,"spellbound":0.5,"spendabl":0.5,"spiffi":0.5,"spirit":0.25,"sportsmanlik":0.5,"spright":0.5,"springi":0.5,"spruce":0.25,"spri":0.5,"sr":0.5,"stabilis":0.25,"stabil":0.25,"stapl":0.5,"star":0.375,"statesmanlik":0.5,"statesman":0.5,"steerabl":0.5,"stout":0.25,"stretchabl":0.5,"stretchi":0.5,"studious":0.375,"suasion":0.5,"subedit":0.5,"subject":0.25,"submerg":0.5,"submers":0.5,"submiss":0.5,"subsidis":0.25,"subsid":0.25,"subsist":0.5,"sunnili":0.5,"suprasegment":0.5,"sweetish":0.5,"swordsmanship":0.5,"symmetric":0.5,"sync":0.5,"tapestri":0.5,"telltal":0.5,"tendenci":0.5,"tendenti":0.25,"textbook":0.5,"think":0.25,"tickl":0.5,"tightfit":0.5,"tillabl":0.5,"timeli":0.5,"tingl":0.5,"tomfool":0.5,"tonic":0.5,"tonus":0.5,"topknot":0.5,"tourist":0.375,"touristi":0.5,"transfix":0.5,"transit":0.5,"transmitt":0.5,"transplant":0.5,"transport":0.5,"trendi":0.5,"tune":0.25,"twee":0.5,"twinkl":0.5,"ultramarin":0.5,"umbrella":0.5,"unambigu":0.25,"unblush":0.5,"unco":0.5,"uncompress":0.5,"unconstrain":0.5,"undamag":0.5,"unequivoc":0.375,"unfasten":0.5,"unhesit":0.5,"unimpass":0.5,"unimprison":0.5,"unknot":0.5,"unlax":0.5,"unpollut":0.5,"unprejud":0.5,"unsleep":0.5,"unstilt":0.5,"unstrain":0.5,"unusu":0.5,"unweari":0.375,"urban":0.375,"usabl":0.417,"useabl":0.417,"use":0.25,"util":0.25,"utilis":0.25,"utilitarian":0.438,"utiliz":0.5,"utopia":0.5,"uxori":0.25,"varied":0.5,"vast":0.5,"veraci":0.5,"vigor":0.5,"visibl":0.5,"visor":0.5,"vitrifi":0.5,"vivaci":0.375,"volubl":-0.375,"volunt":0.375,"wainscot":0.5,"wait":0.5,"wakeless":0.5,"wealthi":0.375,"weedless":0.5,"welfar":0.5,"whir":0.375,"wieldi":0.5,"wit":0.25,"wormlik":0.5,"youth":0.25,"abnorm":-0.5,"abras":-0.25,"abreact":-0.5,"accurs":-0.5,"accurst":-0.5,"adipos":-0.375,"admonish":-0.25,"advers":-0.437,"afebril":-0.5,"aftertast":-0.5,"aghast":-0.5,"agit":-0.5,"agnail":-0.5,"agranulocyt":-0.5,"aimless":-0.5,"airhead":-0.5,"alarum":-0.5,"albuminuria":-0.5,"algomet":-0.5,"alkalemia":-0.5,"alopec":-0.5,"ambul":0.375,"anaesthesia":-0.5,"analphabet":-0.25,"anarchi":-0.5,"anathematis":-0.5,"anathemat":-0.5,"anchylosi":-0.5,"anergi":-0.5,"anesthesia":-0.5,"angin":-0.5,"anginos":-0.5,"ankylosi":-0.5,"annihil":-0.25,"antemortem":-0.5,"antineoplast":0.25,"anxiolyt":-0.5,"aphak":-0.5,"aphonia":-0.5,"apocalyps":-0.5,"appel":-0.5,"armlet":-0.5,"arsehol":-0.5,"arthralgia":-0.5,"assail":-0.25,"assault":-0.25,"asthenospher":-0.5,"astraphobia":-0.5,"attack":-0.25,"attrit":-0.5,"autocrat":-0.5,"awol":-0.5,"aztreonam":-0.5,"backhand":0.25,"backswimm":-0.5,"bafflement":-0.5,"bariton":-0.5,"batrachomyomachia":-0.5,"beastli":-0.5,"beef":-0.5,"befuddl":-0.5,"begrim":-0.5,"behind":-0.5,"bellyach":-0.25,"bemus":-0.5,"beriberi":-0.5,"berserk":-0.5,"besieg":-0.25,"bewilder":-0.5,"biff":-0.375,"biserr":-0.5,"blare":-0.5,"blench":-0.5,"blitz":-0.437,"blitzkrieg":-0.5,"blush":-0.5,"bluster":-0.25,"bobbl":-0.5,"bodg":-0.5,"bollix":-0.5,"bollock":-0.5,"bolshi":-0.5,"boor":-0.5,"botch":-0.5,"boxershort":-0.5,"brackish":-0.5,"bronchit":-0.5,"bronchospasm":-0.5,"bruis":-0.5,"brunet":-0.375,"bullhead":-0.5,"bungl":-0.437,"burgundi":-0.5,"cacophon":-0.5,"cacophoni":-0.5,"cadaverin":-0.5,"caffer":-0.5,"caffr":-0.5,"calorif":-0.5,"cantanker":-0.375,"cari":-0.5,"catastroph":-0.375,"cavali":-0.5,"censori":-0.5,"chanc":-0.5,"characterless":-0.5,"cheapjack":-0.25,"chevali":-0.5,"chilli":-0.417,"christless":-0.5,"clumsi":-0.25,"coarsen":-0.5,"cod":-0.5,"coldcock":-0.5,"coldheart":-0.5,"cold":-0.25,"collid":-0.5,"comedown":-0.5,"commin":-0.375,"complain":-0.25,"complaint":-0.275,"complic":-0.25,"complicated":-0.5,"constabulari":-0.5,"contractur":-0.5,"copout":-0.5,"coronach":-0.5,"counterfeit":0.25,"countermov":-0.5,"crabbed":-0.5,"craven":-0.375,"cretin":-0.25,"crimin":-0.25,"criminatori":-0.5,"crinkl":-0.5,"crink":-0.5,"crippl":-0.25,"croak":-0.5,"crone":-0.5,"crookback":-0.5,"crossbon":-0.5,"crotcheti":-0.25,"cumulonimbus":-0.5,"cur":-0.5,"curs":-0.375,"daredevil":-0.375,"dastard":-0.5,"daunt":-0.25,"dauntless":-0.25,"debilit":-0.25,"default":-0.5,"defenceless":-0.312,"defenseless":-0.5,"deleteri":-0.5,"demon":-0.375,"depigment":-0.5,"deprec":-0.25,"dermatosi":-0.5,"despot":-0.25,"diatrib":-0.5,"dicey":-0.5,"dilapid":-0.5,"dip":-0.5,"dirg":-0.5,"disarray":-0.5,"discourtesi":-0.5,"disentangl":-0.275,"disfavor":0.313,"disfavour":0.313,"disgruntl":-0.25,"dislogist":-0.5,"disreput":-0.25,"dissatisfi":-0.25,"disson":-0.375,"distressing":-0.5,"dizzi":-0.5,"drawer":-0.5,"dyslogist":-0.5,"dysuria":-0.5,"eboni":-0.5,"edentul":-0.5,"elegist":-0.5,"embolus":-0.5,"endanger":-0.5,"enerv":-0.25,"enmesh":-0.5,"ensnarl":-0.5,"entangl":-0.5,"erythema":-0.5,"essenti":0.25,"evas":-0.437,"extremist":-0.5,"eyeless":-0.5,"facer":-0.5,"fals":-0.337,"fantasist":-0.5,"fantod":-0.5,"fardel":-0.5,"featherbrain":-0.5,"fell":-0.5,"feroci":0.25,"fiasco":-0.5,"fiendish":-0.25,"filagre":-0.5,"filigre":-0.5,"fillagre":-0.5,"finabl":-0.5,"fineabl":-0.5,"finic":-0.5,"finicki":-0.5,"firebomb":0.25,"flagiti":-0.5,"flimsi":-0.5,"flout":-0.5,"flouter":-0.5,"flub":-0.375,"fluster":-0.25,"folli":-0.5,"foolhardi":-0.5,"foothil":-0.5,"footsor":-0.5,"foredoom":-0.5,"fossilis":-0.5,"fossil":-0.5,"fractious":-0.333,"frenet":-0.25,"frore":-0.5,"fudg":-0.5,"fugaci":-0.25,"fug":-0.25,"fulmin":-0.25,"fuschia":-0.5,"futureless":-0.5,"gainless":-0.5,"gangdom":-0.5,"gangland":-0.5,"gangren":-0.25,"gauderi":-0.5,"gawk":-0.25,"gawker":-0.5,"gawp":-0.5,"gemfibrozil":-0.5,"giddi":-0.5,"glibli":-0.5,"glossalgia":-0.5,"glossodynia":-0.5,"glower":-0.375,"goblin":-0.5,"goggl":-0.25,"graffiti":-0.5,"graffito":-0.5,"granitelik":-0.5,"greenhorn":-0.5,"gridlock":-0.5,"griever":-0.5,"grimi":-0.375,"gripe":-0.25,"grisli":-0.5,"groan":-0.5,"gruesom":-0.25,"grungi":-0.5,"guanaco":-0.5,"guerilla":-0.5,"guerrilla":-0.5,"gynophobia":-0.5,"haemosiderosi":-0.5,"halfheart":-0.5,"hangnail":-0.5,"hapli":-0.5,"hardihood":-0.5,"harrow":-0.5,"heinous":-0.25,"hemosiderosi":-0.5,"hepatomegali":-0.5,"heterogen":-0.5,"heterolog":-0.5,"hisser":-0.5,"homeli":-0.5,"honkey":-0.5,"honki":-0.5,"hoodlum":-0.5,"hoodoo":-0.5,"hooligan":-0.25,"hoydenish":-0.5,"hullabaloo":-0.5,"humorless":-0.25,"humourless":-0.25,"humpback":-0.25,"hump":-0.5,"hunchback":-0.437,"hyperadrenocortic":-0.5,"hypermetropia":-0.5,"hypermetropi":-0.5,"hyperopia":-0.5,"hypoglycaemia":-0.5,"hypoglycemia":-0.5,"hypotens":-0.375,"iconoclasm":-0.5,"illiteraci":-0.5,"imbecil":0.25,"immol":-0.375,"immort":-0.312,"immunis":-0.5,"immun":-0.5,"impenetr":-0.25,"imperil":-0.5,"impolit":-0.5,"improprieti":-0.5,"impuiss":-0.375,"impun":-0.5,"inabl":-0.5,"inaesthet":-0.5,"inalien":-0.5,"inapplic":-0.25,"inapposit":-0.5,"inapt":-0.375,"inartist":-0.5,"inattent":-0.437,"incap":-0.312,"incertain":-0.5,"incognosc":-0.5,"incommodi":-0.5,"incompat":-0.5,"incomplet":-0.5,"inconsist":-0.25,"inconveni":-0.375,"incorrig":-0.5,"incredul":-0.5,"incriminatori":-0.5,"inculpatori":-0.5,"incurs":-0.5,"indecorum":-0.5,"indefens":-0.5,"indestruct":-0.5,"indig":-0.25,"indiscreet":-0.5,"indiscrimin":-0.5,"ineleg":-0.5,"inexcus":-0.25,"inexpedi":-0.5,"inexpert":-0.5,"inexplic":-0.5,"inexplicit":-0.5,"inframaxillari":-0.5,"infrequ":0.25,"inhuman":-0.25,"injuri":-0.275,"inquest":-0.5,"inquisit":-0.25,"insanitari":-0.5,"insincer":-0.375,"instabl":-0.5,"insuscept":-0.5,"intrepid":-0.25,"invad":-0.375,"invulner":-0.312,"irrelev":-0.5,"irresolut":-0.5,"jackanap":-0.5,"jeerer":-0.5,"jeopardis":-0.5,"jeopardi":-0.5,"jeremiad":-0.5,"jerki":-0.5,"jotter":-0.5,"kafir":-0.5,"keratalgia":-0.5,"keratectasia":-0.5,"keratonosi":-0.5,"kerfuffl":-0.5,"kleptomaniac":-0.5,"knotti":-0.5,"kyphot":-0.5,"lair":-0.5,"languid":-0.5,"languor":-0.5,"laryngopharynx":-0.5,"lassitud":-0.5,"leeri":-0.5,"legless":-0.5,"lepidot":-0.5,"lepros":-0.5,"livedo":-0.5,"locoism":-0.5,"loggi":-0.5,"logi":-0.5,"longsighted":-0.5,"loosen":-0.5,"lordot":-0.5,"lower":-0.375,"luckless":-0.5,"lugubri":-0.25,"lurid":-0.5,"lycopen":-0.5,"macabr":-0.5,"machilid":-0.5,"madhous":-0.5,"magnifi":-0.5,"maledict":-0.375,"maling":-0.25,"mandibular":-0.5,"mandibulofaci":-0.5,"mang":-0.5,"manslay":-0.5,"mastalgia":-0.5,"maxillomandibular":-0.5,"megacolon":-0.5,"megalohepatia":-0.5,"megalomaniac":-0.375,"megaloman":-0.5,"melanoderma":-0.5,"mele":-0.5,"messi":-0.375,"metralgia":-0.5,"mettl":-0.5,"mirthless":-0.5,"miscreat":-0.5,"misquot":-0.5,"misrepres":-0.5,"misspel":-0.5,"mistransl":-0.5,"moan":-0.5,"moonless":-0.5,"mourner":-0.5,"mug":-0.25,"mujahadeen":-0.5,"mujahadein":-0.5,"mujahadin":-0.5,"mujahedeen":-0.5,"mujahedin":-0.5,"mujahideen":-0.5,"mujahidin":-0.5,"murdere":-0.5,"mussi":-0.25,"mutil":-0.25,"mutism":-0.5,"mysophilia":-0.5,"mysophobia":-0.5,"name":0.375,"narcosi":-0.5,"nastili":-0.5,"necessari":-0.5,"necessit":-0.5,"needless":-0.25,"nephralgia":-0.5,"neurotrop":-0.5,"nightshirt":-0.5,"nocicept":-0.5,"nonchristian":-0.5,"nondescript":-0.5,"nonenterpris":-0.5,"noninflammatori":-0.5,"nonnatur":-0.5,"nonrhythm":-0.5,"nonslipperi":-0.5,"nontechn":-0.5,"nontradit":-0.5,"nosi":-0.25,"notepap":-0.5,"nubbl":-0.5,"nubbi":-0.25,"numb":-0.417,"nuthous":-0.5,"nyctalopia":-0.5,"nyctophobia":-0.5,"nympho":-0.5,"nymphomaniac":-0.375,"obstreper":-0.437,"offish":-0.5,"oospher":-0.5,"ophthalmia":-0.5,"ophthalm":-0.5,"ossifi":-0.5,"osteoporosi":-0.5,"osteosclerosi":-0.5,"outcri":-0.5,"overanxieti":-0.5,"overanxi":-0.5,"overbit":-0.5,"overbold":-0.5,"overmuch":0.25,"overreach":-0.5,"oversuspici":-0.5,"overtoler":-0.5,"pale":-0.375,"pant":-0.5,"paralog":-0.5,"paramnesia":-0.5,"paraphilia":-0.5,"parlous":-0.5,"patchi":-0.5,"pejor":-0.5,"peril":-0.375,"philistin":-0.5,"phrenet":-0.5,"picki":-0.5,"pighead":-0.5,"playlet":-0.5,"podalgia":-0.5,"poignanc":-0.375,"polic":0.25,"poltergeist":-0.5,"poss":-0.5,"posthum":-0.5,"powerless":-0.5,"prodrom":-0.375,"profan":-0.312,"profitless":-0.5,"prophet":-0.5,"proteinuria":-0.5,"provision":-0.5,"pri":-0.25,"pudg":-0.5,"pulseless":-0.5,"punctureless":-0.5,"punit":-0.5,"punitori":-0.5,"purposeless":-0.5,"puzzlement":-0.5,"pyromania":-0.5,"pyrosi":-0.5,"quash":-0.5,"quaver":-0.5,"querul":-0.375,"quietus":-0.5,"quixot":-0.25,"radioprotect":-0.5,"rancid":-0.25,"rare":-0.5,"rash":-0.312,"rasp":-0.25,"refractur":-0.5,"requiem":-0.5,"requiescat":-0.5,"requisit":0.375,"retch":-0.375,"rigid":-0.5,"rigor":-0.292,"rigour":-0.292,"riskless":0.25,"rockbound":-0.5,"rocklik":-0.5,"rooki":-0.5,"rope":-0.5,"roughneck":-0.5,"ruffian":-0.25,"ruin":-0.333,"ruinous":-0.5,"rumbl":-0.292,"sabotag":-0.375,"sacrilegi":-0.5,"samsara":-0.5,"sassi":-0.5,"satan":-0.5,"saturnin":-0.5,"savag":-0.25,"scapegrac":-0.5,"scath":-0.375,"scorner":-0.5,"scratch":-0.5,"screwi":-0.5,"sear":-0.5,"secondo":-0.5,"semidark":-0.5,"settl":-0.5,"sever":-0.344,"shambol":-0.5,"shatter":-0.375,"shelter":-0.5,"shibah":-0.5,"shit":-0.292,"shiva":-0.5,"shivah":-0.5,"shock":-0.339,"shopsoil":-0.5,"shout":-0.5,"sic":-0.5,"sigmoidoscopi":-0.5,"simmpl":-0.5,"simpleton":-0.5,"sin":-0.275,"skreigh":-0.5,"slick":0.25,"slub":-0.5,"slyboot":-0.5,"smother":-0.5,"sneerer":-0.5,"sneezi":-0.5,"snitch":-0.5,"snoopi":-0.25,"sociopath":-0.375,"somatosens":-0.5,"sour":-0.25,"spars":-0.5,"sparsiti":-0.5,"speakeasi":-0.5,"specious":-0.5,"spermicid":-0.5,"spondyl":-0.5,"sporad":-0.5,"sprain":-0.5,"spurner":-0.5,"squab":-0.5,"squabbi":-0.5,"squawk":-0.437,"stagger":0.25,"standoffish":-0.5,"stereotyp":-0.5,"stickpin":-0.5,"sting":-0.35,"stingi":-0.25,"stodgi":-0.5,"stogi":-0.5,"strafer":-0.5,"strait":-0.312,"stratus":-0.5,"stress":-0.437,"stroppi":-0.5,"sub":-0.5,"subjug":-0.25,"succuss":-0.5,"suffoc":-0.5,"supercili":-0.375,"superfat":-0.5,"superstit":-0.5,"swayback":-0.5,"swipe":-0.5,"synov":-0.5,"tatter":-0.25,"tatti":-0.5,"tearga":-0.5,"technophobia":-0.5,"temerari":-0.5,"tenesmus":-0.5,"terror":-0.25,"thanatophobia":-0.5,"thankless":-0.5,"thermalgesia":-0.5,"threnodi":-0.5,"thug":-0.5,"thugge":-0.5,"thundercloud":-0.5,"token":-0.5,"tokenish":-0.5,"tomboyish":-0.5,"torch":-0.5,"torpedo":-0.5,"torpid":-0.312,"torturesom":-0.5,"toxic":0.25,"traduc":-0.25,"tremul":-0.5,"triskaidekaphob":-0.5,"truant":-0.5,"trucul":-0.5,"tussl":-0.375,"twilight":-0.5,"twilit":-0.5,"uglifi":-0.5,"ultra":-0.5,"unaccredit":-0.5,"unaesthet":-0.5,"unag":-0.5,"unapologet":-0.5,"unappar":-0.5,"unappeas":-0.5,"unapprehens":-0.5,"unartist":-0.5,"unavail":-0.25,"unbecom":-0.5,"unbigot":-0.5,"unbrac":-0.5,"unbrand":-0.5,"unbridg":-0.5,"unchristian":-0.25,"uncom":-0.5,"uncompens":-0.5,"uncomprehend":-0.5,"unconstitut":-0.5,"undeferenti":-0.5,"underbr":-0.5,"underdevelop":-0.312,"underdraw":-0.5,"underf":-0.5,"underlip":-0.5,"underman":-0.5,"undernourish":-0.5,"underproduct":-0.5,"undersid":-0.5,"understaf":-0.5,"undersurfac":-0.5,"undiscrimin":-0.5,"undistinguish":-0.25,"undisturb":-0.5,"undramat":-0.5,"unduti":-0.5,"uneag":-0.5,"uneffect":-0.5,"unemploy":-0.375,"unendow":-0.5,"unenterpris":-0.5,"unenthusiast":-0.5,"unexcit":-0.5,"unexplain":-0.312,"unfear":-0.5,"unfeminin":-0.5,"unfirm":-0.5,"unflinch":-0.5,"unforbear":-0.5,"unhazard":-0.5,"unhear":-0.5,"unheat":-0.5,"unhelp":-0.25,"unhumor":-0.5,"uniform":-0.25,"unillumin":0.25,"unimpos":-0.5,"unintellig":-0.5,"unintend":-0.5,"unintimid":-0.5,"uninvent":-0.5,"unjustifi":-0.25,"unlett":-0.5,"unlicenc":-0.5,"unlicens":-0.5,"unloc":-0.5,"unlov":-0.5,"unmalici":-0.5,"unmechan":-0.5,"unmelod":-0.5,"unmethod":-0.5,"unmind":-0.5,"unobtain":-0.5,"unobtrus":-0.5,"unoffici":-0.375,"unoppos":-0.5,"unorigin":-0.25,"unpalat":-0.312,"unparliamentari":-0.5,"unpersuas":-0.25,"unpicturesqu":-0.5,"unplay":-0.5,"unpolish":-0.5,"unprincipl":-0.5,"unprocur":-0.5,"unproduct":-0.312,"unprotected":-0.5,"unprov":-0.25,"unproven":-0.5,"unreason":-0.25,"unredeem":-0.25,"unrefin":-0.5,"unregener":-0.25,"unrepair":-0.5,"unrespect":-0.5,"unruli":-0.292,"unsalari":-0.5,"unsanct":-0.5,"unsanitari":-0.25,"unsat":-0.5,"unsati":-0.5,"unsav":-0.5,"unschool":-0.5,"unseem":-0.5,"unselect":-0.25,"unsexi":-0.5,"unshap":-0.25,"unskil":-0.5,"unsnarl":-0.5,"unstabl":-0.5,"unsterilis":-0.5,"unsteril":-0.5,"unstimul":-0.5,"unstylish":-0.5,"unsurmount":-0.5,"unsymmetr":-0.5,"untact":-0.5,"untam":-0.5,"untaught":-0.5,"untechn":-0.5,"untend":-0.5,"unthank":-0.5,"untidi":-0.375,"untradit":-0.5,"untrust":-0.5,"untutor":-0.5,"unwarm":-0.5,"unwel":-0.5,"unwil":-0.375,"unwoman":-0.5,"upset":-0.5,"uratemia":-0.5,"uricaciduria":-0.5,"urodynia":-0.5,"vaniti":-0.5,"vault":-0.5,"verruca":-0.5,"vertigin":-0.5,"vicious":-0.25,"violat":-0.5,"vitup":-0.5,"vixenish":-0.5,"vocifer":-0.5,"wanton":-0.5,"waspish":-0.5,"wavelik":-0.5,"waylay":-0.5,"weather":-0.5,"weatherworn":-0.5,"weed":-0.5,"weirdi":-0.5,"wheez":-0.5,"whelm":-0.5,"whiney":-0.5,"whini":-0.5,"whippersnapp":-0.5,"whitey":-0.5,"wil":0.313,"will":0.25,"witchlik":-0.5,"woozi":-0.5,"wretched":-0.5,"xanthosi":-0.5,"yob":-0.5,"yobbo":-0.5,"yobo":-0.5,"aah":0.375,"abandon":-0.3,"abat":-0.25,"abbess":0.375,"abbot":0.375,"abdic":0.375,"abil":0.375,"abloom":0.375,"about":0.375,"abov":0.25,"absolv":0.375,"abuzz":0.375,"accent":0.375,"acclivit":0.375,"accumul":0.375,"accuraci":0.313,"accustom":0.313,"acetifi":0.313,"acidifi":0.313,"acknowledg":0.375,"acoust":-0.25,"acquaint":0.25,"acquir":-0.25,"acquit":0.375,"acrobat":0.25,"actinomorph":0.375,"activ":0.25,"activist":0.375,"actual":0.25,"actuat":0.25,"addabl":0.375,"addibl":0.375,"addit":0.375,"adher":0.375,"adienc":0.375,"adjunct":0.375,"adoxographi":0.375,"adscript":0.375,"adulatori":0.375,"adult":0.438,"advertis":0.25,"advisor":0.375,"aerob":0.25,"aerophil":0.25,"affianc":0.375,"affin":0.375,"afford":0.375,"aflutt":0.375,"agglutin":0.375,"aggrandis":0.375,"aggrandiz":0.375,"agre":0.375,"aid":0.375,"airborn":0.375,"alacrit":0.375,"align":0.375,"alik":0.375,"alimoni":0.375,"aliquot":0.375,"aliv":0.411,"all":0.375,"allegro":0.375,"alli":0.25,"allov":0.375,"allow":0.458,"aloof":0.375,"altruist":0.25,"amaz":0.25,"ambidexter":0.375,"ambidextr":0.25,"ambient":0.375,"ambiti":0.25,"ambival":-0.25,"ambrosi":0.438,"ambrosian":0.438,"amelior":0.25,"amethyst":0.375,"amphipod":0.375,"amphiprostylar":0.375,"amphiprostyl":0.375,"amphiprot":0.375,"amphistylar":0.313,"amphoter":0.375,"ampl":0.375,"ampli":0.438,"anaerobiot":0.375,"analept":0.375,"analog":0.313,"analyt":0.313,"anastigmat":0.375,"angwantibo":0.375,"animis":0.375,"announc":0.375,"anoint":0.375,"anomalist":0.375,"antacid":0.375,"anther":0.375,"antiaircraft":-0.375,"antiblack":0.375,"antic":0.375,"anticip":0.375,"antithet":0.375,"antitox":0.375,"anymor":0.375,"apic":0.375,"apocarp":0.375,"apophat":0.375,"apothegmat":0.313,"apparel":0.375,"appar":0.313,"appeal":0.25,"appetising":0.375,"appetizing":0.375,"appli":0.375,"apprehend":0.375,"arbitr":0.25,"arcanum":0.375,"archimandrit":0.375,"architectur":0.375,"ardent":0.417,"arguabl":-0.25,"aristocrat":0.375,"arithmet":0.25,"armor":0.333,"armour":0.313,"arous":0.417,"array":0.375,"arrest":0.375,"arriv":0.313,"artefact":0.375,"artifact":0.375,"artist":0.417,"art":0.375,"ascent":0.333,"asset":0.375,"assimil":0.25,"associatori":0.375,"asterisk":0.375,"astern":0.375,"astir":0.375,"asund":0.375,"asymptomat":0.375,"ataract":0.375,"atarax":0.375,"atavist":0.375,"athlet":0.292,"atrip":0.375,"attain":0.25,"attent":-0.25,"attest":0.313,"attractor":0.292,"attribut":0.375,"audibl":0.25,"august":0.375,"auspic":0.375,"autogen":0.375,"autoload":0.375,"autom":0.25,"autonom":0.375,"award":-0.25,"aweigh":0.313,"awestricken":0.375,"awestruck":0.375,"baccifer":0.375,"back":0.333,"backslid":0.375,"backstag":0.375,"bactericid":0.375,"balanc":0.375,"ballet":0.375,"balli":0.375,"bandag":-0.375,"bang":-0.25,"bankrol":0.375,"bargain":0.25,"bar":0.375,"barricad":0.375,"bash":-0.25,"beami":0.313,"beardown":0.375,"beatitud":0.375,"beautif":0.375,"beautifi":0.417,"bedder":0.375,"beefi":0.375,"befog":-0.25,"behalf":0.313,"be":0.313,"belief":0.375,"believ":0.25,"berri":0.375,"betim":0.375,"beverag":0.375,"bhakti":0.375,"biannual":0.375,"bibul":0.375,"bigger":0.375,"biggish":0.375,"bigmouth":0.375,"bimestri":0.313,"bimonth":0.375,"biochemist":0.375,"biolog":0.25,"bioluminesc":0.375,"bipartisan":0.375,"bipartizan":0.375,"biweek":0.375,"biyear":0.375,"blabbi":0.375,"blackbal":0.375,"blameless":0.375,"blandish":0.375,"blessed":0.375,"blockad":0.25,"bloodi":0.25,"bloom":0.375,"blueish":0.375,"bluff":-0.437,"bluish":0.375,"boatmanship":0.375,"bodi":0.375,"bodybuild":0.375,"bombast":0.375,"bombil":0.25,"bombin":0.25,"bonanza":0.313,"bondabl":0.438,"boon":0.375,"boost":0.275,"boozi":0.375,"boyish":0.375,"boylik":0.375,"braini":0.375,"braw":0.375,"brawni":0.25,"breadlin":0.375,"breadwinn":0.375,"breakaway":0.375,"breastfe":0.375,"breath":-0.25,"breed":0.25,"breezi":0.313,"brief":0.375,"bright":-0.25,"brim":0.25,"brimful":0.375,"brisk":0.25,"broad":0.375,"brocad":0.375,"broodi":0.25,"brownish":0.375,"brumous":0.375,"bubbl":-0.312,"buff":0.375,"buffooneri":0.375,"buird":0.375,"bulki":0.375,"bumpkin":-0.25,"burgeon":0.375,"burlesqu":0.313,"bur":0.375,"burnabl":0.375,"bushel":0.375,"businesslik":0.313,"butyrac":0.375,"buxom":0.25,"buzz":0.375,"cabalist":0.375,"cackel":0.375,"cadg":0.375,"cairn":0.375,"calcul":0.25,"calend":0.375,"caller":0.313,"calligraphi":0.375,"callous":0.375,"campestr":0.375,"canari":0.375,"candent":0.375,"cannib":0.375,"canonis":0.25,"canon":0.25,"capaci":0.375,"cardin":0.313,"carmin":0.375,"carnat":0.375,"caroch":0.375,"carol":0.375,"carpet":0.375,"cashabl":0.375,"cash":0.375,"cataphat":0.375,"catechesi":0.375,"categoremat":0.375,"caucus":0.375,"cautionari":0.313,"caw":0.375,"centrex":0.375,"centrist":0.375,"centrosymmetr":0.375,"ceram":0.375,"cerebr":0.375,"ceremoni":0.25,"ceris":0.375,"cert":0.375,"certain":0.375,"challeng":-0.25,"chang":-0.25,"charisma":0.375,"chariti":0.275,"chartreus":0.375,"cheeselik":0.375,"cherri":0.375,"chichi":0.25,"childbear":0.375,"childcar":0.375,"child":0.375,"chiliast":0.375,"chin":-0.375,"china":0.313,"chinawar":0.375,"chirographi":0.375,"chockablock":0.375,"chock":0.25,"chronic":0.333,"chummi":0.25,"church":0.25,"cinnabar":0.375,"circumfer":0.375,"cissi":0.375,"citizen":0.375,"claimant":0.375,"clandestin":0.375,"clarifi":0.375,"clariti":0.438,"classic":0.375,"classi":0.375,"clastic":0.438,"clean":0.25,"cleans":0.25,"clear":0.438,"clearcut":0.375,"clement":0.438,"climbabl":0.438,"clinquant":0.375,"clown":0.313,"cloy":0.25,"cloze":0.375,"clubabl":0.375,"clubbabl":0.375,"clubbish":0.375,"cluck":0.375,"cluster":0.438,"coagul":0.375,"cockamami":0.375,"coerciv":0.375,"coexist":0.375,"coextens":0.375,"cognit":0.375,"cognoscent":0.375,"coher":0.406,"coincid":0.25,"collaps":0.375,"collater":0.375,"collect":-0.25,"coloss":0.375,"column":0.375,"combin":0.375,"combur":0.375,"comedi":0.375,"comic":0.25,"commemor":0.25,"commensur":0.25,"commiss":0.313,"commonw":0.375,"communic":0.313,"commut":0.375,"compar":-0.25,"compartment":0.375,"compartmentalis":0.375,"compendi":0.375,"compens":0.292,"compli":0.375,"compos":0.375,"compress":0.25,"compulsori":0.375,"concertis":0.375,"concert":0.25,"concis":0.375,"concord":0.375,"confer":0.375,"conferr":0.375,"confidenti":0.469,"configur":0.375,"confluent":0.375,"conformist":0.375,"congest":0.25,"congruent":0.438,"conjectur":0.375,"conjoin":0.375,"conjoint":0.375,"connected":0.313,"connect":0.375,"conniv":0.375,"connoisseur":0.375,"conquer":-0.25,"conscienti":0.375,"conscript":0.25,"consequenti":0.25,"conservatoir":0.375,"consolid":0.25,"conspicu":0.313,"constanc":0.292,"constant":0.292,"constitu":0.375,"constitut":0.375,"constrict":0.25,"consult":0.25,"contagi":0.438,"contempl":0.25,"contermin":0.333,"contigu":0.333,"contin":0.313,"contradistinguish":0.375,"controversi":-0.25,"controversialist":0.375,"conveni":0.438,"convent":0.25,"convert":0.25,"coolhead":0.375,"cooper":0.313,"coordin":0.25,"copul":0.375,"copyright":0.375,"cordat":0.375,"cordiform":0.375,"corefer":0.375,"cornucopia":0.438,"corpor":0.375,"correspond":0.375,"cosmet":0.25,"cotermin":0.375,"cotton":0.375,"countervail":0.313,"coupl":0.375,"courtesi":0.375,"couth":0.375,"cozi":0.25,"craft":0.25,"crank":0.375,"crash":0.375,"creak":0.375,"credenti":0.375,"credential":0.375,"crepit":0.25,"crest":0.375,"crisp":0.271,"criteri":0.375,"criterion":0.25,"crocket":0.375,"crosshair":0.375,"cruis":0.375,"cuddlesom":0.375,"cudd":0.375,"cultur":0.25,"cumul":0.375,"cuneat":0.375,"curios":0.375,"curvi":0.375,"cushion":0.25,"cushioni":0.375,"custodi":0.375,"customari":0.375,"daedal":0.375,"dainti":0.438,"dandifi":0.375,"dandyish":0.375,"daughter":0.375,"daylight":0.313,"dazzl":0.313,"deari":0.375,"decenc":0.438,"decentralis":0.375,"decentr":0.375,"declamatori":0.375,"declassifi":0.375,"decompress":0.313,"decriminalis":0.375,"decrimin":0.375,"deduc":0.375,"deed":0.375,"defog":0.375,"defrost":0.375,"degener":0.375,"dehumanis":0.375,"dehuman":0.375,"deign":0.375,"delect":0.375,"delib":0.375,"delibl":0.375,"delin":0.375,"delous":0.375,"deltoid":0.375,"demagog":0.375,"demagogu":0.375,"demist":0.375,"demonstr":0.25,"demur":-0.312,"demythologis":0.375,"demytholog":0.375,"deniabl":0.375,"denomin":0.375,"depict":0.375,"deplet":0.375,"depreci":-0.375,"depriv":0.375,"deriv":0.25,"descend":-0.25,"destalinis":0.25,"destalin":0.25,"detect":-0.25,"determinist":0.375,"detick":0.375,"develop":-0.375,"deviant":-0.25,"deviat":-0.25,"devitalis":-0.25,"devit":-0.25,"devout":0.438,"diabat":0.375,"diachron":0.375,"diagonaliz":0.375,"dialysi":0.375,"dicynodont":0.375,"didact":0.25,"differenti":0.25,"dimens":0.375,"diminish":0.375,"disclos":0.375,"discov":0.375,"discreet":0.333,"discriminatori":0.375,"discurs":0.438,"disembodi":0.375,"disench":0.375,"disengag":0.292,"disinfect":-0.25,"disjunct":0.25,"dismiss":-0.375,"disput":-0.375,"dissoci":0.375,"dissolubl":0.375,"dissolv":0.25,"distant":0.275,"distens":0.375,"distich":0.375,"distinct":0.425,"distort":0.375,"distraint":0.375,"diverg":0.375,"divin":0.25,"divorc":0.25,"dodder":-0.25,"dodderi":0.375,"doglik":0.375,"domest":0.25,"done":0.375,"doula":0.375,"downmarket":0.375,"downright":0.375,"downsiz":0.375,"dramat":0.25,"drench":0.375,"dripless":0.375,"drive":0.438,"drolleri":0.313,"dromaeosaur":0.375,"drunk":-0.25,"drunken":0.375,"duad":0.375,"ducki":0.375,"due":0.25,"duplic":0.25,"duplicat":0.375,"durabl":-0.375,"dustlik":0.375,"duteous":0.375,"duti":0.375,"dyad":0.375,"dynam":0.25,"earn":0.25,"earthlik":0.313,"eater":0.313,"eccrin":0.375,"echo":0.375,"eclat":0.375,"edutain":0.375,"effac":0.375,"effemin":0.375,"effici":0.375,"effloresc":0.375,"effulg":0.375,"eightpenni":0.375,"either":0.375,"electrifi":0.375,"eleg":-0.375,"elev":0.333,"elitist":0.375,"elong":0.313,"elucid":0.25,"emascul":0.375,"embellish":0.344,"embodi":0.375,"emboss":0.375,"emerg":0.313,"emin":0.438,"emmetrop":0.375,"empathi":0.375,"emphas":0.25,"emphat":0.292,"employ":0.25,"empow":0.25,"empyr":0.375,"empyrean":0.375,"encloth":0.375,"encomium":0.375,"endermat":0.375,"enderm":0.375,"endogam":0.313,"endogami":0.375,"endors":0.375,"endow":0.375,"endu":0.375,"energet":0.313,"energi":0.271,"enfeoff":0.25,"enforc":-0.25,"engorg":0.375,"enlighten":0.313,"ennobl":0.438,"enorm":0.25,"enrich":0.313,"enski":0.375,"entitl":0.375,"envious":0.375,"epic":0.375,"epicur":0.375,"epizoot":0.375,"equal":0.25,"equat":0.375,"equidist":0.375,"equip":0.25,"equiprob":0.375,"equipt":0.375,"eras":0.375,"erectil":0.313,"eremit":0.375,"establish":0.275,"estrous":0.375,"ethnic":0.375,"etiquett":0.375,"eucaryot":0.375,"eukaryot":0.375,"eulogis":0.375,"eulogium":0.375,"eulog":0.375,"eupneic":0.375,"eupnoeic":0.375,"euthen":0.375,"even":0.375,"evidentiari":0.313,"evoc":0.375,"exactitud":0.375,"exaugur":0.375,"exceed":0.375,"except":0.375,"excursionist":0.375,"excurs":0.375,"exemplari":0.458,"exemplifi":0.375,"exist":0.333,"expansil":0.375,"expend":0.438,"experienti":0.375,"expertis":0.375,"expiabl":0.375,"explanatori":0.375,"exploit":0.375,"exposit":0.375,"expositori":0.375,"exquisit":0.25,"extend":0.25,"extens":0.25,"extensil":0.375,"extravert":0.375,"extrovert":0.375,"fabul":0.333,"facil":0.375,"facilit":-0.25,"fail":-0.261,"fair":0.344,"fancier":0.375,"farandol":0.375,"faraway":0.375,"farther":0.313,"fashion":0.375,"fathom":0.438,"fatten":0.25,"faultless":0.375,"favorit":0.438,"favourit":0.438,"feat":0.375,"feder":0.375,"fee":0.25,"fetter":0.375,"fictil":0.333,"fiduci":0.333,"fill":0.25,"fine":-0.375,"finess":0.375,"fissil":0.375,"flammabl":0.375,"flawless":0.25,"fleet":0.375,"flexibl":0.313,"floodlight":0.375,"floodlit":0.375,"flow":0.375,"fluent":0.438,"fluid":0.35,"flush":0.375,"focus":0.375,"focuss":0.375,"foodi":0.375,"fool":0.292,"footfal":0.375,"footloos":0.375,"foppish":0.375,"forbear":0.313,"forc":-0.281,"fored":0.375,"foremost":0.292,"forens":0.313,"forethought":0.375,"formal":0.25,"formalis":0.25,"formid":-0.25,"forthcom":0.292,"forthright":0.375,"fortifi":0.313,"fortnight":0.375,"fosterag":0.438,"fourhand":0.375,"fourpenni":0.375,"foursquar":0.375,"frank":0.313,"franklin":0.375,"free":-0.25,"freeborn":0.375,"freehand":0.25,"freeload":0.375,"freeli":0.375,"freemail":0.375,"freshen":0.458,"freshman":0.375,"friendless":0.375,"frier":0.375,"frothi":0.375,"fuck":0.375,"fugit":0.375,"fulgur":0.375,"full":0.375,"function":0.25,"fundament":0.417,"fungibl":0.375,"funrun":0.375,"furnish":0.313,"gag":0.375,"gallantri":0.458,"galor":0.375,"garb":0.375,"gardant":0.375,"garment":0.375,"gastronom":0.375,"geld":0.375,"genealogist":0.375,"generat":0.313,"generos":0.375,"generous":0.375,"genial":0.25,"genius":0.35,"germicid":0.375,"get":0.375,"gigot":0.375,"gild":0.25,"gilt":0.375,"gimbal":0.25,"girlish":0.375,"glamor":0.25,"glamouris":0.25,"glanc":0.375,"glass":-0.25,"glib":0.375,"glimmeri":0.375,"glisten":0.25,"glorif":0.292,"glorifi":0.281,"glori":0.333,"gluey":0.375,"glutin":0.375,"glut":0.375,"gnostic":0.375,"gobbl":0.375,"gobsmack":0.375,"godlik":0.313,"god":0.313,"gold":0.375,"gong":0.375,"gooey":0.375,"goofi":0.375,"gourmet":0.375,"gracil":0.375,"grandmast":0.375,"grassroot":0.375,"great":0.375,"greenish":0.375,"gregari":-0.375,"grin":0.375,"groom":0.375,"grown":0.375,"grownup":0.375,"gruntl":0.375,"guardant":0.375,"guid":0.438,"guiltless":0.375,"gumption":0.313,"habili":-0.25,"habitu":0.25,"hand":0.375,"handicraft":0.313,"handmad":0.375,"handrest":0.375,"handsewn":0.375,"handstamp":0.25,"handstitch":0.375,"hardcor":0.375,"harlequinad":0.375,"harpoon":0.375,"hastat":0.375,"head":0.281,"headi":0.333,"heat":0.313,"heaven":0.375,"hebdomad":0.375,"hebdomadari":0.375,"hefti":0.333,"heighten":0.375,"hep":0.375,"hermet":0.375,"heroic":0.25,"het":0.375,"heterosi":0.375,"heyday":0.375,"hick":-0.25,"hike":0.375,"hip":0.375,"hobbyist":0.375,"holidaymak":0.375,"holometabol":0.375,"holi":0.25,"homemad":0.375,"homer":0.375,"homeward":0.25,"hominin":0.375,"homocerc":0.375,"homogen":0.25,"homophob":0.375,"honorarium":0.375,"hoodwink":0.313,"horn":0.375,"horni":0.292,"horsemanship":0.375,"hosanna":0.375,"hotshot":0.375,"hour":0.375,"housebroken":0.375,"housecraft":0.375,"hulk":0.375,"hulki":0.375,"human":-0.25,"humding":0.375,"humil":0.313,"humong":0.375,"husband":0.313,"hydric":0.375,"hydrolyz":0.375,"hygrophyt":0.375,"hymn":0.25,"hyperact":0.375,"hyperpigment":0.375,"hyperthyroid":0.375,"hyperton":0.313,"hypothet":0.375,"idealist":0.25,"ignit":0.375,"ilk":0.375,"illustr":0.438,"imit":0.333,"imman":0.438,"imparti":0.375,"imperturb":0.375,"import":0.25,"imprimatur":0.375,"in":0.333,"inbuilt":0.375,"incandesc":0.438,"incarn":0.313,"inclus":0.375,"incommun":0.375,"incorpor":0.25,"incred":0.375,"increment":0.375,"independ":0.375,"indicatori":0.375,"individu":0.25,"individualist":0.313,"indors":0.375,"indrawn":0.375,"indu":0.375,"industrialis":0.375,"industrialist":0.375,"industri":0.25,"infatu":0.375,"inflamm":0.375,"inflationari":0.375,"inflect":0.25,"influenc":0.333,"informatori":0.375,"infrason":0.375,"ingest":0.313,"ingratiatori":0.438,"inhibitori":0.375,"inject":0.375,"inmarriag":0.375,"inning":0.375,"inquir":0.375,"insinu":0.375,"instantan":-0.25,"instinct":-0.375,"institutionalis":0.375,"institution":0.375,"instruct":0.25,"instrument":0.25,"insur":0.25,"intact":0.344,"intellect":0.375,"intension":0.375,"interchang":0.375,"interchurch":0.375,"interdenomin":0.375,"interfaith":0.375,"intermedi":0.375,"intermolecular":0.375,"interoper":0.375,"interperson":0.375,"intersexu":0.313,"intox":0.25,"intragroup":0.375,"intrigu":0.438,"intrins":0.25,"introductori":0.292,"investig":0.375,"investigatori":0.375,"ionic":0.375,"irrepress":0.375,"irreproach":0.375,"isol":0.271,"isotrop":0.375,"jade":0.375,"jail":0.375,"jangl":0.375,"japeri":0.375,"jaunt":0.25,"jazzi":0.375,"jingl":0.375,"jing":0.375,"jitter":0.375,"join":0.375,"joint":0.292,"joyrid":0.375,"jubile":0.375,"juici":0.344,"junket":0.375,"kabbalist":0.25,"kempt":0.375,"ki":0.375,"killjoy":0.375,"kinaesthesi":0.375,"kinesthesi":0.375,"kinesthet":0.375,"kinglik":0.375,"king":0.375,"knack":0.375,"knight":0.313,"knockdown":0.375,"knock":0.375,"knowing":0.438,"known":0.375,"lacon":0.375,"lactat":0.375,"lamplit":0.375,"larg":0.411,"larger":0.375,"largish":0.375,"lascivi":0.375,"late":0.375,"latest":0.375,"lavend":0.375,"lavish":0.375,"lead":0.344,"lefti":0.313,"legalis":0.25,"legitim":0.375,"legitimatis":0.375,"legitimat":0.375,"legitimis":0.375,"leglik":0.375,"leisur":0.375,"lend":0.333,"lengthen":0.375,"lengthi":0.375,"lenient":0.292,"lenifi":0.375,"lenten":0.375,"ley":0.375,"liber":0.25,"liberalist":0.25,"libertarian":0.25,"libidin":0.375,"lighten":0.396,"lilac":0.375,"lilt":0.375,"limber":0.333,"limit":0.438,"limnolog":0.25,"link":0.375,"lionheart":0.375,"liquid":-0.281,"lissom":0.375,"literaci":0.375,"liter":0.333,"lith":0.375,"lithesom":0.375,"liturg":0.375,"liturgiolog":0.375,"live":0.479,"liveborn":0.375,"livelong":0.375,"long":0.264,"longish":0.375,"look":0.375,"lope":0.375,"loverlik":0.375,"lover":0.375,"lubrici":0.313,"lucul":0.375,"ludicr":0.313,"luscious":0.438,"lush":0.375,"lustili":0.375,"lux":0.375,"made":0.333,"magenta":-0.25,"maggoti":0.375,"magnanim":0.25,"magnetis":0.375,"magnet":0.375,"maidenlik":0.375,"maiden":0.25,"main":0.375,"major":0.25,"makeov":0.375,"mandatori":0.375,"man":0.25,"manicur":0.375,"manifest":-0.25,"manqu":0.375,"manumit":0.375,"mark":0.417,"market":0.375,"marri":0.25,"masochist":0.25,"massiv":0.281,"masterstrok":0.375,"mate":0.25,"matern":0.313,"mathemat":0.375,"matron":0.375,"mauv":0.375,"maven":0.375,"mavin":0.375,"maximis":0.25,"measur":0.25,"mechan":0.375,"mediat":0.25,"medit":0.25,"meed":0.375,"megahit":0.375,"megalomania":0.375,"megascop":0.375,"melior":0.25,"mellow":-0.375,"melod":0.25,"melodramat":0.438,"memor":0.375,"memorialis":0.375,"memori":0.375,"mendic":0.375,"mensch":0.375,"mensh":0.375,"mentat":0.375,"meow":0.375,"merceris":0.375,"mercer":0.375,"merchant":0.375,"merci":0.438,"merg":0.375,"meridian":0.313,"meritocraci":0.313,"mesomorph":0.375,"metal":0.375,"metalwork":0.375,"method":0.375,"metric":0.25,"miaou":0.25,"miaow":0.25,"miaul":0.375,"microphon":0.375,"middl":-0.25,"midweek":0.375,"mighti":0.25,"milch":0.375,"mild":0.292,"mill":0.375,"millenarian":0.375,"mimet":0.313,"mimic":0.375,"miracul":0.375,"mismarri":0.375,"mixolog":0.375,"mobil":0.25,"mock":-0.25,"moder":0.25,"moderation":0.375,"modest":0.313,"modesti":0.313,"modifi":0.375,"modish":0.25,"modular":0.375,"moldabl":0.375,"mollif":0.375,"momentan":0.375,"momentari":0.375,"moment":-0.25,"monarch":0.25,"money":0.438,"moneygrubb":0.375,"moneymak":0.438,"moni":0.375,"monitric":0.375,"monosem":0.375,"month":0.375,"moo":0.375,"mooch":-0.25,"moonlit":0.375,"mooni":0.313,"moralis":0.375,"mortic":0.375,"mortis":0.375,"motherlik":0.375,"mother":0.375,"motortruck":0.375,"mountain":0.375,"mount":0.438,"mouselik":0.375,"movabl":0.25,"mown":0.375,"much":0.375,"mucilagin":0.375,"mudra":0.375,"multiform":0.375,"multipot":0.375,"musclebuild":0.375,"music":0.469,"musicolog":0.375,"muse":0.375,"muski":0.375,"mutabl":0.25,"mutin":0.313,"myrmecophil":0.375,"mystifi":-0.25,"narrat":0.25,"naughti":0.375,"nay":0.375,"neat":0.25,"nectar":0.375,"need":0.25,"neoclass":0.375,"neoliber":0.375,"nestl":0.25,"net":0.25,"nett":0.375,"neuter":0.375,"newborn":0.313,"newfangl":0.375,"nightlif":0.313,"night":-0.25,"ninepenni":0.375,"nobl":0.375,"noctiluc":0.375,"noiseless":-0.25,"nonesuch":0.375,"nonjudgment":0.375,"nonliter":0.25,"nonpartisanship":0.375,"nonprogress":0.375,"nonpurul":0.375,"nonresist":0.313,"nonsectarian":0.375,"nonsegment":0.375,"nonstick":0.375,"nonsubject":0.375,"nonsuch":0.375,"nonsynthet":0.375,"nontox":0.313,"nonviol":0.313,"normal":0.438,"normalci":0.313,"nude":0.375,"nuditi":0.375,"numeraci":0.375,"nunneri":0.375,"nutrifi":0.375,"oarsmanship":0.375,"oblanceol":0.375,"obvious":-0.25,"occas":0.375,"occidentalis":0.375,"occident":0.375,"occurr":0.375,"ocher":0.375,"ochr":0.375,"offertori":0.375,"offici":0.25,"okeh":0.375,"okey":0.375,"older":0.417,"oliv":0.375,"omnibus":0.375,"onomatopoeia":0.375,"onomatopo":0.25,"ooh":0.375,"openmouth":0.375,"orang":0.375,"orangish":0.375,"orator":0.375,"ordain":0.375,"order":0.333,"orderli":0.313,"ordin":0.25,"organ":0.292,"organiz":-0.25,"orotund":0.313,"orthodox":0.375,"outcast":0.375,"outfit":0.313,"outlin":0.375,"outrun":0.375,"outspoken":0.375,"outstand":0.313,"overachiev":0.25,"overact":0.375,"overag":0.375,"overarm":0.375,"overaw":0.375,"overbid":0.313,"overcar":0.375,"overcast":0.375,"overcloth":0.375,"overestim":0.375,"overexcit":0.375,"overexploit":0.375,"overfond":0.375,"overhand":0.25,"overladen":0.375,"overlarg":0.375,"overload":0.375,"overmodest":0.375,"overnic":0.375,"overproud":0.375,"overrefin":0.375,"oversensit":-0.375,"overseri":0.375,"oversubscrib":0.375,"overus":0.375,"overutilis":0.375,"overutil":0.375,"oxid":0.375,"oxidiz":0.375,"packag":0.375,"pact":0.375,"pad":0.25,"paid":0.375,"painstak":0.375,"palati":0.313,"palimoni":0.375,"palliat":-0.25,"panegyrist":0.375,"panopli":0.375,"paperback":0.375,"paradis":0.375,"paragon":0.375,"pardon":0.375,"parev":0.375,"partak":0.333,"partial":-0.25,"particip":0.25,"parv":0.375,"passiv":-0.437,"pastureland":0.375,"patent":-0.25,"patern":0.375,"paternalist":0.375,"patient":0.375,"patrician":0.438,"peak":0.375,"peal":0.375,"peel":-0.375,"pellucid":0.25,"pend":0.375,"penetr":0.25,"penmanship":0.375,"pentecost":0.375,"perambul":0.375,"perceiv":0.313,"percept":0.333,"perige":0.375,"period":0.375,"peripatetic":0.375,"perk":0.375,"permit":0.333,"pernicketi":0.375,"perspicac":0.313,"perspicu":0.25,"persuad":0.25,"pert":-0.25,"pervert":-0.292,"pervious":0.25,"pet":0.375,"phagocyt":0.375,"pharisa":0.375,"phenomenon":0.313,"philanthropist":0.375,"philatel":0.375,"philhellen":0.375,"phlegmi":0.375,"phosphoresc":0.375,"phylogenet":0.375,"physic":-0.25,"physiolog":0.375,"pillar":0.375,"ping":0.375,"pinion":0.375,"placabl":0.375,"placeabl":0.375,"plainspoken":0.375,"playboy":0.375,"pleasanc":0.313,"pliabl":0.469,"plight":-0.25,"plumbabl":0.375,"plummet":0.375,"plummi":0.375,"pocketknif":0.375,"pois":0.313,"politess":0.375,"ponder":0.25,"popey":0.313,"popularis":0.25,"portico":0.375,"portion":0.375,"portray":0.375,"posh":0.375,"positiv":0.375,"positivist":0.375,"possibl":0.25,"postlud":0.375,"postpaid":0.375,"potenc":0.375,"potent":0.281,"potenti":0.375,"pragmat":0.313,"prairi":0.375,"prank":0.375,"preced":0.375,"precedenti":0.375,"preconcert":0.375,"predigest":0.375,"predispos":0.25,"preemin":0.375,"prefab":0.375,"pregnant":0.375,"prejud":0.375,"premedit":0.375,"prepackag":0.375,"prepack":0.375,"prepaid":0.375,"prerequisit":-0.25,"press":0.375,"prestig":0.375,"presum":0.375,"pretti":0.25,"prevail":0.275,"priestlik":0.375,"primal":0.375,"prink":0.313,"printabl":0.375,"prioress":0.375,"prisonlik":0.375,"pristin":0.375,"privat":0.313,"privileg":0.375,"probabl":0.25,"probiti":0.375,"procession":0.375,"proclaim":0.375,"procreat":0.25,"profound":0.417,"progress":0.25,"projectil":0.375,"prolong":0.375,"prone":0.375,"prong":0.313,"proportion":0.25,"prosodion":0.375,"prostyl":0.375,"protract":0.375,"provabl":0.375,"providenti":0.417,"prude":0.375,"psalm":0.375,"pseudoprostyl":0.375,"psychic":0.313,"psychotherapeut":0.313,"public":0.25,"publicis":0.375,"pulchritud":0.375,"punctual":0.25,"punster":0.375,"pure":0.321,"puritan":0.25,"purul":-0.25,"pushov":0.375,"pussi":0.375,"putat":0.375,"puzzler":0.375,"pyrolyt":0.375,"qabalist":0.375,"qi":0.375,"qualifi":0.313,"queenlik":0.375,"queen":0.375,"quick":0.25,"quiesc":0.375,"racist":0.25,"radiant":0.375,"raffish":0.313,"raiment":0.375,"rakish":0.313,"rangeland":0.375,"rangi":0.375,"rank":0.375,"rataplan":0.375,"ratif":0.375,"rationalist":0.375,"raven":-0.25,"reaffirm":0.375,"realis":0.375,"realiz":0.375,"reassert":0.375,"receiv":0.438,"reciproc":0.25,"reciprocatori":0.375,"recognis":0.375,"recogn":0.375,"recommend":0.25,"reconven":0.375,"recurv":0.375,"reddish":0.375,"redefin":0.313,"redempt":0.375,"redoubt":0.313,"redress":0.375,"reduc":0.375,"reduct":0.25,"reecho":0.375,"referendum":0.375,"refin":0.3,"refit":0.375,"reformist":0.25,"refulg":0.375,"regal":0.25,"regener":0.375,"regnant":0.375,"regress":0.25,"regularis":0.375,"regular":0.25,"regulatori":0.375,"reharmonis":0.25,"reharmon":0.25,"reign":0.375,"relat":0.313,"related":0.375,"relax":0.25,"relev":0.375,"reliant":0.375,"reloc":0.375,"reli":0.375,"remark":0.25,"remind":0.375,"reminisc":0.25,"remov":0.313,"renasc":0.375,"rendezv":0.375,"renov":0.25,"repair":0.325,"reparte":0.375,"repetit":0.313,"replac":0.375,"repos":0.375,"repres":0.25,"repress":0.375,"reproduct":0.375,"request":0.375,"requir":-0.333,"research":0.313,"reserv":0.438,"resettl":0.375,"resili":0.313,"resin":0.375,"resolv":0.375,"reson":0.375,"resound":0.375,"resourc":0.375,"respond":0.375,"respons":0.25,"resurg":0.375,"resuscit":0.375,"retent":0.292,"retic":0.292,"retractil":0.375,"retro":0.375,"revamp":0.313,"reveal":0.438,"reverber":0.25,"reverb":0.375,"revers":0.25,"reversionist":0.375,"revert":0.375,"revoc":0.375,"rhythmic":0.375,"rife":0.375,"risibl":0.375,"rise":0.313,"risqu":0.375,"ritz":0.375,"ritzi":0.375,"rivalr":0.375,"robe":0.375,"roomi":0.375,"roughhewn":0.375,"rubberlik":0.375,"rubberstamp":0.375,"rubi":0.375,"rule":0.25,"rumin":0.25,"runaway":0.375,"runni":0.375,"rush":0.375,"rustic":0.292,"saccharin":0.375,"safeguard":0.313,"safeti":0.375,"sanctif":0.375,"sanctimoni":0.375,"sanitari":0.375,"sanit":0.375,"sapphir":0.375,"sate":0.375,"satini":0.375,"savori":0.292,"savouri":0.292,"saw":0.375,"scaffold":0.375,"scalelik":0.375,"scarlet":0.375,"scarper":0.375,"scat":-0.25,"scenic":0.25,"scent":0.281,"scheme":0.438,"schnorr":0.375,"schoolboyish":0.375,"schoolgirlish":0.375,"scienc":0.313,"scrappi":-0.25,"screechi":0.375,"scrub":-0.25,"scrupl":0.375,"scrupul":0.438,"sculptur":0.313,"sculpturesqu":0.375,"seaborn":0.375,"seagirt":0.375,"seamless":0.292,"seami":0.313,"search":0.292,"seaworthi":0.375,"second":0.313,"seduc":0.313,"seduct":0.375,"sellabl":0.375,"semant":0.375,"semestr":0.375,"semestri":0.375,"semiannu":0.375,"semiautomat":0.25,"semimonth":0.375,"seminud":0.375,"semipriv":0.375,"semipubl":0.375,"semivowel":0.375,"semiweek":0.375,"senil":0.375,"sensat":0.375,"sensual":-0.25,"sent":0.375,"separ":0.25,"separatist":0.375,"serendip":0.375,"serious":-0.25,"servil":0.375,"settlor":0.375,"sexual":0.25,"sexi":0.375,"shackl":0.375,"shakabl":0.375,"shakeabl":0.375,"share":0.375,"sharpen":0.25,"shatterproof":0.375,"sheeni":-0.25,"sheeplik":0.375,"shimmeri":0.375,"shini":0.25,"shipshap":0.375,"shnorr":0.375,"shortlist":0.375,"showjump":0.375,"showmanship":0.375,"showplac":0.375,"showi":-0.375,"shrewd":0.25,"sibil":0.25,"sidesplitt":0.375,"sightse":0.375,"sightseer":0.375,"signific":0.292,"signif":0.25,"silken":0.375,"silklik":0.375,"silki":0.375,"silvern":0.438,"similar":0.375,"sissifi":0.375,"sissi":0.375,"sissyish":0.375,"sisterlik":0.375,"sister":0.375,"sizabl":0.313,"sizeabl":0.313,"size":0.25,"skin":0.375,"skirl":0.375,"skittish":0.25,"skulduggeri":0.375,"skullduggeri":0.375,"skydiv":0.375,"slangi":0.375,"sleek":0.417,"slide":0.375,"slip":0.375,"slither":0.375,"slumber":-0.25,"slumbrous":0.438,"smoki":0.375,"snappi":0.3,"snore":-0.25,"snowbound":0.375,"snuff":0.375,"snug":0.25,"snuggl":0.25,"soar":0.438,"social":0.25,"socialis":0.375,"solder":0.375,"solemnis":0.375,"solid":0.281,"solv":0.375,"son":0.375,"sonant":0.375,"sonic":0.375,"soror":0.375,"sottish":-0.312,"soundabl":0.375,"soundless":0.375,"soundproof":-0.25,"southpaw":0.313,"spacious":0.25,"spatiotempor":0.313,"spay":0.375,"specialti":0.458,"speedi":0.438,"spike":0.375,"spinmeist":0.375,"spinnabl":0.25,"spiritualis":0.375,"spiritu":0.25,"spiv":0.375,"splinterless":0.375,"splinterproof":0.375,"spoilsport":0.375,"spooki":0.375,"sporti":0.458,"springlik":0.375,"sprint":0.375,"squar":0.375,"squeak":0.375,"squeaki":0.375,"squeal":0.375,"squeamish":0.375,"squeezabl":0.25,"squishi":0.375,"stagecraft":0.375,"stainless":0.375,"stalinis":0.375,"stalin":0.375,"stamin":0.375,"standbi":0.375,"standpat":0.375,"startl":0.375,"statuesqu":0.438,"steadi":0.25,"steami":0.292,"steepish":0.375,"stellat":0.375,"stereo":0.375,"stereophon":0.375,"stertor":0.375,"stock":0.375,"stoppabl":0.375,"stori":0.313,"stowaway":0.375,"strabotomi":0.375,"straightforward":0.313,"strap":0.375,"strateg":-0.25,"straw":0.375,"streamlin":0.438,"streetwis":0.375,"stretch":0.313,"structur":0.25,"strum":0.375,"stuf":0.313,"stupend":0.375,"sturdi":0.417,"stylish":0.25,"subgross":0.375,"subservi":-0.25,"subson":0.375,"substant":0.333,"substitut":0.375,"subtilis":0.375,"subtract":0.375,"succinct":0.375,"such":0.375,"suchlik":0.375,"suffic":0.375,"suggest":-0.375,"suit":0.313,"sulfacetamid":0.375,"sunless":0.375,"sunlit":0.375,"sunstruck":0.375,"superfin":0.417,"supern":0.375,"supersedur":0.375,"supersess":0.375,"superstar":0.375,"supervis":0.375,"suppl":0.375,"suppos":0.375,"supposit":0.375,"suppositi":0.375,"supposititi":0.375,"supran":0.375,"sure":0.375,"surgic":0.375,"surmis":0.375,"surmount":0.313,"suspect":0.375,"suspens":0.25,"sustain":0.25,"sustentacular":0.375,"sutur":0.375,"svelt":0.375,"swank":0.25,"swanki":0.375,"sweep":0.313,"sweetheart":0.375,"swift":0.375,"swing":0.25,"swingi":0.375,"swish":0.25,"sylphlik":0.375,"symmetr":0.375,"symmetri":0.292,"symphon":0.25,"symptomless":0.375,"synecdoch":0.375,"synonym":0.375,"synopt":0.375,"tail":0.375,"takeout":0.375,"talkat":0.292,"tallgrass":0.375,"tame":0.25,"tannish":0.375,"tantalis":-0.375,"tantal":-0.375,"tarantell":0.375,"tardi":0.375,"tassel":0.375,"teach":0.25,"tearless":0.375,"technic":0.417,"technician":0.313,"technolog":0.313,"technophil":0.375,"teem":0.375,"teeming":0.375,"teetot":0.375,"tekki":0.375,"telescop":-0.312,"tell":0.375,"temporis":0.375,"tempor":0.375,"temptabl":0.375,"tenderis":0.25,"tender":0.25,"tensionless":0.375,"termin":-0.375,"ters":0.375,"tessel":0.313,"testat":0.375,"testimoni":0.313,"tether":0.375,"themat":0.375,"thicken":-0.25,"thoroughgo":0.375,"thought":0.25,"throng":0.25,"through":0.313,"throwaway":0.375,"throwback":0.375,"thrum":0.25,"thump":0.375,"thunder":-0.375,"thyrotoxicosi":0.375,"tine":0.375,"tink":0.375,"tinkl":0.375,"tinsel":0.375,"tinselli":0.375,"tintinnabul":0.375,"tippi":0.375,"tireless":0.25,"titan":0.375,"toccata":0.375,"to":0.375,"tog":0.375,"tone":0.438,"toothsom":0.458,"topic":0.375,"topograph":0.375,"topspin":0.375,"torrenti":0.292,"torrid":0.292,"total":0.25,"toughen":0.438,"tourer":0.313,"tower":0.375,"trabeat":0.375,"traceabl":0.313,"trackabl":0.375,"tractil":0.375,"tradecraft":0.375,"traditionalist":-0.25,"tragicom":0.25,"train":0.25,"tranquilis":0.375,"transcend":0.313,"transfer":0.313,"transferr":0.313,"transform":0.375,"transgend":0.375,"transistoris":0.375,"transistor":0.25,"translat":0.438,"transmiss":0.333,"transmut":0.375,"transon":0.375,"transpar":0.313,"travel":0.25,"travers":0.375,"travesti":0.313,"treac":0.375,"treat":0.25,"treati":0.375,"treeless":0.375,"trenchant":0.417,"triangul":0.375,"triennial":0.375,"trim":0.375,"trip":0.438,"trisect":0.375,"tropism":0.375,"trueness":0.458,"truss":0.375,"trusting":0.375,"trustor":0.375,"trustworthi":0.438,"tuft":0.417,"turban":0.375,"tutelar":0.375,"tutelari":0.375,"twain":0.375,"typic":0.25,"ultramodern":0.375,"ultrason":0.375,"unarmor":0.313,"unarmour":0.313,"unblemish":0.375,"unbow":0.313,"unchurch":0.375,"unclouded":0.375,"uncommun":0.25,"unconfin":0.313,"unconstip":0.375,"uncontamin":0.25,"uncrowd":0.375,"undat":0.25,"underachiev":0.375,"underact":-0.375,"underarm":0.375,"undercharg":0.375,"undercov":0.375,"undereduc":0.375,"understand":0.25,"understock":0.375,"underway":0.375,"undet":0.375,"undevi":0.375,"undiscourag":0.375,"undisguis":0.375,"undismay":0.375,"undivid":0.375,"unequ":0.375,"unequal":0.375,"unfalt":0.375,"unfil":0.375,"unflag":0.375,"unflapp":0.375,"unflaw":0.375,"unflurri":0.375,"unflust":0.375,"unfre":0.313,"unhuman":0.375,"unhurri":0.313,"unhurt":0.375,"unif":0.292,"uninjur":0.375,"uniqu":0.375,"unit":0.25,"univers":-0.25,"univoc":0.375,"unlock":-0.25,"unmar":0.375,"unmistak":0.375,"unmortgag":0.375,"unmov":-0.25,"unmutil":0.375,"unobjection":0.333,"unobstruct":0.375,"unostentati":0.313,"unparallel":0.375,"unpartit":0.375,"unperturb":0.375,"unproblemat":0.375,"unprogress":0.375,"unpunish":0.375,"unpurifi":0.375,"unravel":0.292,"unregret":0.375,"unremors":0.375,"unscrambl":0.375,"unsectarian":0.375,"unseg":0.375,"unselfconsci":0.25,"unshadow":0.375,"unshaken":0.375,"unsoil":0.375,"unspot":0.375,"unsubdu":0.375,"unsulli":0.375,"untaint":0.375,"untalk":0.375,"untarnish":0.375,"unthreaten":0.375,"untir":0.375,"untoughen":0.375,"unwont":0.375,"unwood":0.375,"unworld":0.313,"unwound":0.375,"unzip":0.375,"up":0.344,"upcurv":0.375,"upfront":0.375,"upkeep":0.375,"upmarket":0.375,"upper":0.333,"upstair":0.375,"upward":0.313,"urgent":0.375,"usual":0.375,"usufruct":0.375,"usuri":0.313,"vacation":0.375,"vacationist":0.375,"vantag":0.438,"vehement":0.438,"vendabl":0.375,"vendibl":0.375,"verdanc":0.375,"verif":0.313,"verisimilar":0.375,"veriti":0.375,"vermilion":0.375,"vermillion":0.375,"vernal":0.313,"versatil":0.281,"veri":0.438,"viabil":0.313,"vibrant":0.333,"viewless":0.375,"vindic":0.375,"violabl":0.375,"virgin":0.292,"viril":0.25,"virtual":-0.25,"virtuos":0.375,"visa":0.375,"viscid":0.375,"viscoelast":0.375,"vitalis":0.25,"vivac":0.375,"vivid":0.313,"vivif":0.313,"vocal":0.313,"volit":0.25,"volum":0.375,"volumetr":0.375,"volumin":0.25,"voluntari":0.25,"vow":0.313,"waggeri":0.313,"wake":0.25,"walkaway":0.375,"wallop":-0.25,"warfarin":0.375,"wari":0.375,"warranti":0.375,"washabl":0.375,"wean":0.375,"wed":0.375,"week":0.375,"wellborn":0.375,"westernis":0.375,"western":0.375,"whacker":0.375,"whack":-0.25,"whirr":0.375,"whish":0.313,"whizz":0.375,"whole":0.375,"wholesal":0.375,"wholli":0.375,"whop":-0.25,"wide":0.304,"willowi":0.375,"wing":0.375,"wisdom":0.375,"withdrawn":0.313,"wittic":0.375,"witti":0.375,"wiz":0.375,"woman":-0.25,"wonderwork":0.375,"wont":0.25,"wordless":-0.25,"workflow":0.375,"work":0.275,"world":0.313,"wors":0.375,"worthili":0.375,"wow":0.375,"wrap":0.375,"xanthous":0.375,"yang":0.375,"year":0.375,"yeasti":0.375,"yellowish":0.375,"yield":0.375,"yoga":0.313,"yon":0.375,"yonder":0.375,"zaftig":0.375,"zani":0.438,"zesti":0.438,"zoftig":0.375,"zygomorph":0.375,"aalii":-0.375,"abasia":-0.375,"abid":-0.437,"abienc":-0.375,"abnormalci":-0.375,"abocclus":-0.375,"abstrus":-0.25,"acanthocyt":-0.375,"acanthosi":-0.375,"accid":-0.437,"accusatori":-0.25,"accus":-0.25,"acedia":-0.375,"acetonemia":-0.375,"acetonuria":-0.375,"acetos":-0.375,"acet":-0.375,"achondroplasia":-0.375,"achondroplasti":-0.375,"achromia":-0.375,"achrom":-0.375,"acid":-0.333,"acidemia":-0.375,"acousticophobia":-0.375,"acromegalia":-0.375,"acromegali":-0.375,"acromphalus":-0.375,"adamantin":-0.375,"addlehead":-0.375,"adenomyosi":-0.375,"adenosi":-0.375,"adesit":-0.375,"adulter":-0.375,"adulterin":-0.375,"adumbr":-0.375,"adventur":-0.25,"aerodontalgia":-0.375,"aeri":-0.375,"affray":-0.437,"afterlif":-0.375,"agammaglobulinemia":-0.375,"aggro":-0.375,"agoni":-0.437,"aguish":-0.375,"ailment":-0.375,"airsick":-0.375,"akinesia":-0.375,"akinesi":-0.375,"alexia":-0.375,"algophobia":-0.375,"almost":-0.375,"alterc":-0.375,"amblyopia":-0.375,"amerc":-0.375,"aminoaciduria":-0.375,"amnes":-0.375,"amyloidosi":-0.375,"anaesthet":-0.375,"analbuminemia":-0.375,"analgesia":-0.375,"anathemis":-0.437,"anathem":-0.437,"andesit":-0.375,"anesthet":-0.375,"animadvert":-0.312,"animalis":-0.375,"anomi":-0.312,"anosmat":-0.375,"anosmia":-0.375,"anosm":-0.312,"antagonist":-0.275,"anthracit":-0.25,"anthracosi":-0.375,"anthrax":-0.312,"anticipatori":-0.375,"antiproton":-0.375,"anuret":-0.375,"anur":-0.25,"aphot":-0.375,"apoplexi":-0.375,"apract":-0.375,"aprax":-0.375,"aquaphobia":-0.375,"arch":0.25,"arduous":-0.375,"areflexia":-0.375,"argent":-0.375,"argufi":-0.375,"armband":-0.375,"arrhythmia":-0.375,"ars":-0.312,"arsin":-0.375,"arteriectasia":-0.375,"arteriectasi":-0.375,"arthralg":-0.375,"articul":-0.375,"artific":-0.375,"asbestosi":-0.375,"ashi":-0.375,"asper":-0.437,"assumpt":-0.375,"asthenia":-0.375,"astheni":-0.375,"astylar":-0.375,"asynclit":-0.375,"asystol":-0.375,"ataxia":-0.375,"ataxi":-0.375,"atroc":-0.375,"atyp":-0.25,"audaci":-0.312,"audac":-0.312,"automysophobia":-0.375,"autopsi":-0.375,"azoimid":-0.375,"bacchanalia":-0.375,"bacteriolog":-0.25,"bacteriolysi":-0.375,"bad":0.25,"baffl":-0.25,"bait":-0.292,"baloney":-0.375,"bangl":-0.375,"banshe":-0.375,"banshi":-0.375,"banteng":-0.375,"bant":-0.375,"barf":-0.375,"barki":-0.375,"bass":-0.375,"bastardis":-0.312,"bastill":-0.375,"batter":-0.25,"bayonet":-0.375,"beacon":-0.375,"beast":-0.437,"bedamn":-0.375,"bedazzl":-0.375,"beggar":-0.25,"belabor":-0.333,"belabour":-0.333,"beli":-0.312,"belli":-0.375,"benumb":-0.375,"beshrew":-0.375,"bewild":-0.312,"bilgewat":-0.375,"bilgi":-0.375,"birdbrain":-0.375,"bitch":-0.312,"blackbuck":-0.375,"blackleg":-0.375,"blast":-0.312,"blatanc":-0.375,"bleak":-0.25,"blister":-0.375,"bloat":-0.375,"blockhous":-0.375,"bloodcurdl":-0.375,"bloodguilt":-0.375,"blooper":-0.375,"blot":-0.312,"blunder":-0.25,"bodyless":-0.375,"boloney":-0.375,"bomb":-0.375,"bombproof":-0.375,"boner":-0.375,"boothos":-0.375,"borrow":0.25,"bosh":-0.375,"bourgeoisi":-0.375,"bovin":-0.375,"bowdleris":-0.375,"bowdler":-0.375,"brachydactylia":-0.375,"brachydactyl":-0.375,"brachydactyli":-0.375,"braggadocio":-0.375,"brainless":-0.375,"brambl":-0.375,"brassard":-0.375,"brawl":-0.375,"breastpin":-0.375,"breathless":-0.375,"briefless":-0.375,"brittl":-0.292,"broach":-0.375,"brunett":-0.375,"brunt":-0.375,"brutalis":-0.292,"brutal":-0.25,"buffet":-0.25,"bulg":-0.437,"bulimia":-0.437,"bulk":-0.375,"bulldog":-0.375,"bumptious":-0.375,"bunion":-0.375,"burn":0.25,"butch":-0.375,"butcheri":-0.333,"butterscotch":-0.375,"cacodaemon":-0.25,"cacodemon":-0.25,"cakehol":-0.375,"calcitonin":-0.375,"calvari":-0.375,"camp":-0.375,"campi":-0.375,"canker":-0.25,"cannonad":-0.375,"carbonado":-0.375,"cardiomegali":-0.375,"cardiomyopathi":-0.375,"carib":-0.375,"carious":-0.375,"carrion":-0.375,"carsick":-0.375,"cartilaginif":-0.375,"cartroad":-0.375,"carvedilol":-0.375,"caseous":-0.375,"cassiterit":-0.375,"castrat":0.25,"casuist":-0.375,"catalepsi":-0.375,"cataphasia":-0.375,"causa":-0.375,"causalgia":-0.375,"cefoperazon":-0.375,"celecoxib":-0.375,"cementit":-0.375,"cens":-0.375,"censor":0.25,"cephalalgia":-0.375,"cephal":-0.375,"chaff":-0.375,"chaotic":-0.333,"chapeau":-0.375,"chap":-0.375,"chasten":-0.375,"cheap":-0.437,"cheapen":-0.375,"cheat":-0.344,"cheesepar":-0.375,"cheilosi":-0.375,"chondrodystrophi":-0.375,"choppi":-0.375,"chuff":-0.375,"churl":-0.417,"churn":-0.312,"cinder":-0.375,"clamor":-0.25,"clamp":-0.437,"clatter":-0.375,"clinker":-0.312,"clobber":-0.312,"clueless":-0.375,"clutter":-0.375,"coast":-0.375,"cockad":-0.375,"cocki":-0.375,"cocksuck":-0.437,"collabor":0.25,"collaborationist":-0.375,"colorless":-0.375,"colourless":-0.375,"concuss":-0.437,"confess":-0.292,"confront":-0.25,"confut":-0.25,"conglutin":-0.375,"constat":-0.375,"contrabass":-0.375,"contractu":-0.375,"contravent":-0.375,"contretemp":-0.375,"conundrum":-0.375,"convuls":-0.312,"cool":-0.344,"corni":-0.375,"coron":-0.375,"costalgia":-0.375,"costiasi":-0.375,"counterattack":-0.312,"counterattract":-0.375,"countermin":-0.375,"coveral":-0.375,"coverlet":-0.375,"craw":-0.375,"crazili":-0.375,"cremain":-0.375,"cremat":-0.375,"crick":-0.375,"crime":-0.312,"crisi":-0.312,"criticis":-0.375,"critic":-0.25,"cross":-0.437,"crosspatch":-0.375,"crowberri":-0.375,"crucifixion":-0.312,"crude":-0.458,"crumbl":-0.292,"crusti":-0.437,"cryaesthesia":-0.375,"cryesthesia":-0.375,"cri":-0.375,"cryoanaesthesia":-0.375,"cryoanesthesia":-0.375,"cryogen":-0.25,"cryosurgeri":-0.375,"currish":-0.375,"cuss":-0.25,"cut":-0.375,"cyberphobia":-0.375,"cyclon":-0.25,"cyclothymia":-0.375,"cyprian":-0.375,"cytolysi":-0.375,"cytolyt":-0.375,"dago":-0.375,"ddc":-0.375,"ddi":-0.375,"dead":-0.333,"dearth":-0.312,"deathblow":-0.375,"death":-0.25,"debas":-0.25,"debauch":0.25,"debaucheri":-0.375,"debri":-0.375,"decalcif":-0.375,"deceas":-0.375,"deceit":-0.375,"declin":-0.312,"decontamin":-0.375,"decoy":-0.437,"decrepit":-0.312,"decrescendo":-0.375,"defac":-0.25,"defam":-0.25,"defens":-0.375,"defianc":-0.417,"defi":-0.333,"degrad":-0.417,"degust":-0.25,"delinqu":-0.25,"deliquium":-0.375,"delug":-0.333,"delus":-0.292,"delusion":-0.375,"demand":-0.292,"dement":-0.25,"demijohn":-0.375,"demonis":-0.375,"denud":-0.375,"depolaris":-0.375,"depolar":-0.375,"dermatosclerosi":-0.375,"desertif":-0.375,"desicc":-0.375,"desquam":-0.375,"destabil":-0.375,"destitut":-0.312,"destroy":-0.25,"detritus":-0.312,"devast":-0.475,"devic":-0.375,"devilri":-0.312,"deviltri":-0.312,"devious":-0.375,"dextrocardia":-0.375,"diabet":-0.25,"didanosin":-0.375,"dideoxycytosin":-0.375,"dideoxyinosin":-0.375,"dimwit":-0.375,"diphtheria":-0.375,"dirti":-0.25,"disast":-0.333,"disbeliev":-0.375,"discharg":-0.375,"discolor":-0.437,"discolour":-0.437,"discommod":-0.375,"discont":-0.375,"discounten":-0.312,"disembarrass":-0.375,"disfigur":-0.25,"disharmon":-0.375,"dishonest":-0.312,"dishonesti":-0.312,"disinfest":-0.375,"disinform":-0.375,"disloy":-0.375,"disobedi":-0.375,"disorganis":-0.375,"disorgan":-0.375,"disori":-0.375,"disorient":-0.375,"dispatch":-0.3,"disprov":-0.375,"disrupt":0.25,"dissens":-0.312,"dissent":-0.25,"dissid":-0.375,"distomatosi":-0.375,"distrain":-0.333,"disunion":-0.375,"divag":-0.25,"diversionari":-0.375,"dogfight":-0.25,"doofus":-0.375,"doubt":0.25,"dowerless":-0.375,"downtown":-0.375,"dracunculiasi":-0.375,"dream":-0.375,"dreck":-0.375,"dropsi":-0.375,"drub":-0.375,"dumb":-0.25,"duranc":-0.375,"duress":-0.375,"dysaphia":-0.375,"dyschezia":-0.375,"dyscrasia":-0.375,"dyslect":-0.375,"dysomia":-0.375,"dysphagia":-0.375,"dysphonia":-0.375,"dyssynergia":-0.375,"dystopia":-0.375,"dystopian":-0.312,"eav":-0.375,"ectopia":-0.375,"edema":-0.375,"eeri":-0.25,"egotist":-0.375,"elegiac":-0.312,"elegis":-0.375,"elf":-0.375,"embalm":-0.375,"embitt":-0.375,"embroc":0.25,"embroil":0.25,"emphysema":-0.375,"enceph":-0.375,"encephalopathi":-0.375,"encroach":0.25,"endometriosi":-0.375,"enduring":-0.375,"enemi":-0.281,"enfeebl":-0.25,"enigmat":-0.375,"enshroud":-0.375,"ensnar":-0.437,"enterostenosi":-0.375,"entrain":-0.375,"entrap":-0.437,"enuresi":-0.375,"epicondyl":-0.375,"epidem":-0.375,"epididym":-0.375,"epiglott":-0.375,"epilepsi":-0.375,"equivoc":-0.25,"erad":-0.25,"ergot":-0.375,"erod":-0.375,"erranc":-0.437,"erwinia":-0.375,"erythroblastosi":-0.375,"eunuch":-0.375,"everlast":-0.375,"eviscer":-0.375,"exagger":-0.312,"excursus":-0.375,"exert":-0.375,"exfoli":-0.312,"expens":0.25,"explet":-0.312,"expurg":0.25,"extermin":-0.25,"extraleg":-0.375,"fabl":-0.375,"fairi":-0.312,"faker":-0.375,"fallaci":-0.375,"fallal":-0.375,"fallback":-0.375,"falsetto":-0.375,"falsi":-0.375,"fascioliasi":-0.375,"fasciolosi":-0.375,"fatal":-0.375,"fatti":-0.25,"fault":-0.25,"feebl":-0.437,"feint":-0.375,"fenoprofen":-0.375,"fester":-0.375,"fey":-0.375,"fib":-0.375,"fictiti":-0.312,"fiend":-0.333,"filariasi":-0.375,"filth":-0.406,"finagl":-0.25,"fingerless":-0.375,"fingerstal":-0.375,"fink":-0.312,"firebrand":-0.312,"fire":-0.375,"firetrap":-0.375,"fistfight":-0.25,"fisticuff":-0.312,"flab":-0.375,"flabbi":-0.25,"flaccid":-0.375,"flag":-0.375,"flamboy":-0.375,"flashi":-0.375,"flecainid":-0.375,"flippanc":-0.375,"florid":0.25,"florilegium":-0.375,"flounder":-0.312,"flyaway":-0.312,"flyspeck":0.25,"flytrap":-0.375,"foghorn":-0.312,"fogsign":-0.375,"foolproof":-0.375,"footslog":-0.375,"foray":-0.312,"foreshadow":-0.375,"forget":-0.375,"formaldehyd":-0.375,"forthcoming":-0.375,"fowler":-0.375,"fraca":-0.375,"fractur":-0.292,"frambesia":-0.375,"framboesia":-0.375,"freak":-0.375,"freakish":-0.375,"fuckup":-0.312,"fugu":-0.375,"furlough":-0.375,"furuncl":-0.375,"fussi":-0.25,"gainsay":-0.375,"gale":-0.375,"galoot":-0.375,"game":-0.312,"gamecock":-0.375,"garbl":-0.25,"garboil":-0.375,"gaud":-0.375,"gaudi":0.25,"gawki":-0.25,"gee":-0.375,"gewgaw":-0.375,"ghostli":-0.375,"giardiasi":-0.375,"gimp":-0.375,"ginzo":-0.375,"git":-0.375,"glare":-0.25,"glaucoma":-0.375,"gleet":-0.375,"glitz":-0.375,"glossoptosi":-0.375,"goalless":-0.375,"golliwog":-0.375,"golliwogg":-0.375,"goon":-0.375,"gout":-0.375,"grabber":-0.375,"grasp":-0.312,"gratuit":-0.417,"graylag":-0.375,"greasebal":-0.375,"gremlin":-0.375,"greylag":-0.375,"grist":-0.375,"grotesqu":-0.437,"grouch":-0.375,"grous":-0.312,"grubbi":-0.25,"grumbl":0.25,"grump":-0.375,"gunfight":-0.375,"gunplay":-0.375,"gutless":-0.25,"haematocytopenia":-0.375,"haematuria":-0.375,"haemoglobinemia":-0.375,"haemoglobinopathi":-0.375,"haemorrhoid":-0.375,"hag":-0.312,"haggl":-0.375,"hailstorm":-0.375,"hairi":-0.437,"halitosi":-0.375,"hallucin":-0.25,"haplosporidian":-0.375,"haptic":-0.375,"harshen":-0.375,"hat":-0.312,"hater":-0.375,"haunt":-0.333,"havoc":-0.375,"haze":-0.375,"headach":-0.437,"headband":-0.375,"heavi":-0.25,"heedless":-0.292,"hematocytopenia":-0.375,"hematuria":-0.375,"hemicrania":-0.375,"hemlin":-0.375,"hemoglobinemia":-0.375,"hemoglobinopathi":-0.375,"hemorrhoid":-0.375,"hepatoflavin":-0.375,"hereaft":-0.312,"heterotaxi":-0.375,"hexenbesen":-0.375,"histiocytosi":-0.375,"hobgoblin":-0.312,"homeless":-0.375,"homespun":-0.375,"homicid":-0.375,"homunculus":-0.312,"hoot":-0.292,"horseplay":-0.375,"hotspur":-0.375,"housebreak":-0.375,"hubbub":-0.375,"hurrican":-0.375,"hydremia":-0.375,"hydromorphon":-0.375,"hydrophobia":-0.292,"hydrop":-0.375,"hyperbetalipoproteinemia":-0.375,"hypercalcinuria":-0.375,"hypercalciuria":-0.375,"hypercholesteremia":-0.375,"hypercholesterolemia":-0.375,"hyperemesi":-0.375,"hyperplasia":-0.375,"hypertrophi":0.25,"hyphen":-0.375,"hypoact":-0.375,"hypoadren":-0.375,"hypoadrenocortic":-0.375,"hypocalcaemia":-0.375,"hypocalcemia":-0.375,"hypocrit":-0.25,"hypoglycaem":-0.375,"hypoglycem":-0.375,"hypolipoproteinemia":-0.375,"hyponymi":-0.375,"hypoparathyroid":-0.375,"hypoproteinemia":-0.375,"hypospadia":-0.375,"hypoton":-0.25,"hysterocatalepsi":-0.375,"ici":-0.437,"icki":-0.312,"iconoclast":-0.375,"idempot":-0.375,"ileus":-0.375,"immin":0.25,"immotil":0.25,"immov":-0.25,"immunosuppress":-0.25,"imp":-0.375,"impalp":-0.375,"imped":-0.25,"impend":0.25,"impercept":-0.375,"impermiss":-0.437,"impertin":-0.25,"implaus":-0.375,"impost":-0.375,"impostor":-0.375,"impostur":-0.375,"impot":-0.437,"impregn":-0.375,"improb":-0.375,"impud":-0.25,"impur":-0.312,"inadvert":-0.375,"inappropri":-0.375,"incapacit":-0.25,"inclement":-0.375,"incommensur":0.25,"incommod":-0.375,"inconceiv":-0.375,"incongru":-0.375,"inconsequ":-0.25,"inconspicu":0.25,"inconst":-0.25,"inconvert":-0.375,"incur":-0.25,"indec":-0.375,"indecis":-0.312,"indefin":-0.25,"indefinit":-0.25,"indelicaci":-0.375,"indel":-0.458,"indescrib":-0.375,"indiffer":-0.437,"indiscern":-0.375,"indiscret":-0.312,"indispos":-0.312,"indistinguish":-0.312,"indol":-0.375,"inept":-0.25,"ineptitud":-0.437,"inequ":-0.375,"inertia":-0.375,"inessenti":-0.375,"inexact":-0.375,"infam":-0.375,"infami":-0.312,"infelicit":-0.25,"infern":0.25,"inflam":-0.375,"inhomogen":-0.375,"injur":-0.417,"innumer":0.25,"inoper":-0.437,"inquisitor":-0.375,"inroad":-0.437,"insens":-0.406,"insensit":-0.375,"insidi":-0.25,"insignia":-0.375,"insipid":-0.25,"insol":-0.437,"insolubl":-0.458,"insubordin":-0.375,"insuffici":-0.25,"insuper":-0.312,"insupport":-0.375,"insurg":-0.25,"interfer":-0.437,"interrog":-0.375,"interrupt":-0.25,"intransit":-0.375,"invalid":-0.25,"irregular":-0.281,"irretriev":-0.375,"irrever":-0.312,"itch":-0.375,"jag":-0.375,"jammi":-0.375,"jaundic":-0.375,"jeopard":-0.375,"jerkili":-0.312,"jerk":-0.375,"jiggl":-0.375,"jimmi":-0.375,"jonah":-0.375,"josh":-0.375,"jowli":-0.375,"juiceless":-0.312,"jurisprudenti":-0.375,"juvenil":-0.312,"katharob":-0.375,"katzenjamm":-0.375,"kayo":-0.25,"kerat":-0.375,"keratoderma":-0.375,"keratodermia":-0.375,"kernicterus":-0.375,"ketoaciduria":-0.375,"ketonemia":-0.375,"ketonuria":-0.375,"ketosi":-0.375,"keyless":-0.375,"kinanesthesia":-0.375,"kitsch":-0.375,"klutz":-0.375,"knap":-0.312,"koan":-0.375,"kook":-0.375,"kyphosi":-0.375,"lacer":-0.25,"lackadais":-0.375,"lack":-0.25,"lacklust":-0.437,"lacklustr":-0.437,"lactoflavin":-0.375,"lag":-0.375,"lambast":-0.437,"lame":-0.25,"lancin":-0.375,"landfil":-0.375,"laryng":-0.375,"laryngostenosi":-0.375,"lasting":-0.375,"lawless":-0.25,"lawsuit":-0.375,"lean":-0.25,"least":-0.375,"lectur":-0.312,"lepidophobia":-0.375,"leprosi":-0.375,"lesion":-0.312,"lessen":-0.25,"lethal":-0.25,"leucocytosi":-0.375,"leucopenia":-0.375,"leukocytosi":-0.375,"leukopenia":-0.375,"lever":-0.375,"leviti":-0.437,"lick":-0.375,"lifeless":-0.25,"lighthead":-0.437,"lightheaded":-0.437,"limp":-0.375,"liniment":-0.375,"linkboy":-0.375,"linkman":-0.375,"lipidosi":-0.375,"liposarcoma":-0.375,"litigi":-0.375,"litter":-0.375,"loather":-0.375,"loin":-0.312,"loon":-0.333,"lorica":-0.375,"lour":-0.375,"lovastatin":-0.375,"lowbrow":-0.375,"lowlif":-0.375,"lowli":-0.281,"lowset":-0.375,"lug":-0.312,"lukewarm":-0.312,"lunat":-0.25,"lupus":-0.375,"lusterless":-0.25,"lustreless":-0.25,"lymphadenopathi":-0.375,"lymphocytosi":-0.375,"macroglossia":-0.375,"madman":-0.375,"maim":-0.25,"malabsorpt":-0.375,"malacia":-0.375,"maladjust":0.25,"malapropo":-0.375,"malcont":-0.25,"malform":-0.25,"malfunct":-0.25,"malinger":-0.375,"mallard":-0.375,"maltreat":-0.25,"manana":-0.375,"mangl":-0.437,"mania":-0.375,"maniac":-0.25,"maniclik":-0.375,"manpow":-0.375,"mansard":-0.375,"mantelet":-0.437,"mantlet":-0.375,"marasmus":-0.375,"martyr":-0.25,"martyrdom":-0.375,"masquerad":-0.292,"matricid":-0.312,"mauler":0.25,"maw":-0.375,"mawkish":-0.312,"meanspirit":-0.375,"meddl":-0.375,"megacardia":-0.375,"megadeath":-0.375,"megalocardia":-0.375,"megrim":-0.375,"melaena":-0.375,"melancholia":-0.375,"melena":-0.375,"men":-0.375,"mendac":-0.375,"meralgia":-0.375,"meretrici":-0.25,"methan":-0.25,"microcytosi":-0.375,"midazolam":-0.375,"migrain":-0.375,"mildew":-0.312,"mindless":-0.25,"mire":-0.375,"mirki":-0.437,"mischanc":-0.375,"mischief":-0.312,"misconcept":-0.375,"misdeal":-0.375,"misfir":-0.375,"misfortun":-0.375,"misfunct":-0.375,"mishandl":-0.312,"mishap":-0.375,"misinform":-0.375,"mispronunci":-0.375,"misshapen":-0.25,"mistrial":-0.375,"molder":-0.375,"moldi":-0.375,"monorchid":-0.375,"monorch":-0.375,"monstros":-0.312,"monstrous":-0.375,"morbid":-0.25,"morgu":-0.375,"moribund":-0.312,"mortal":-0.25,"mortuari":-0.25,"mothi":-0.375,"moue":-0.375,"moufflon":-0.375,"mouflon":-0.375,"moulder":-0.375,"muddi":-0.375,"muddl":-0.437,"muff":-0.312,"mugge":-0.375,"mulch":-0.25,"mulct":-0.375,"murki":-0.437,"murmur":-0.25,"musophobia":-0.375,"muss":-0.25,"musti":-0.312,"mute":-0.25,"mutini":-0.375,"mutt":-0.375,"mutter":-0.312,"myocardiopathi":-0.375,"nanc":-0.375,"nanophthalmo":-0.375,"narcolept":-0.25,"naupathia":-0.375,"navi":-0.312,"nebul":-0.25,"necess":-0.312,"necklet":-0.375,"necromant":-0.25,"necropsi":-0.375,"neglect":-0.25,"neglig":-0.25,"neoplasm":-0.375,"nephroangiosclerosi":-0.375,"nephrosclerosi":-0.375,"nerveless":-0.375,"neuralgia":-0.375,"neuralgi":-0.375,"neurasthen":-0.25,"neuriti":-0.375,"neurosi":-0.375,"neurot":-0.375,"neurotic":-0.375,"niggard":-0.25,"nightmarish":-0.375,"nighttim":-0.375,"nigrifi":-0.375,"nincompoop":-0.375,"ninni":-0.375,"niqab":-0.375,"nobbl":-0.375,"nocent":-0.375,"nog":-0.375,"noisili":-0.375,"nonaddict":-0.375,"nonappear":-0.375,"nonarbitrari":-0.375,"nonattend":-0.25,"nonconsci":-0.437,"nondisjunct":-0.375,"nonharmon":-0.375,"nonhereditari":-0.375,"nonherit":-0.375,"noninherit":-0.375,"nonleg":-0.375,"nonleth":-0.375,"nonmus":-0.375,"nonobserv":-0.375,"nonresidenti":-0.375,"nonresili":-0.375,"nonreson":-0.375,"nonsens":-0.375,"nonspeak":-0.375,"nonsubmerg":-0.375,"nonsubmers":-0.375,"nonuniform":0.25,"notori":-0.375,"nowher":-0.375,"nuanc":-0.375,"nullifi":-0.292,"number":-0.375,"nutat":-0.375,"nymphomania":-0.375,"obduraci":-0.375,"obliqu":-0.312,"obliter":0.25,"oblivi":-0.375,"obloquy":-0.375,"obsidian":-0.375,"obtus":-0.25,"ochronosi":-0.375,"odor":-0.375,"odouris":-0.375,"oedema":-0.375,"ogr":-0.312,"oink":-0.375,"onus":-0.375,"onychosi":-0.375,"openbil":-0.375,"oppressor":-0.375,"orbital":-0.375,"orchidalgia":-0.375,"orphan":-0.375,"osmium":-0.375,"ostent":-0.458,"osteodystrophi":-0.375,"osteolysi":-0.375,"osteomalacia":-0.375,"osteopetrosi":-0.375,"otosclerosi":-0.375,"outbreak":-0.375,"outclass":-0.25,"outfight":-0.375,"outvi":-0.375,"pachycheilia":-0.375,"pajama":-0.312,"palooka":-0.375,"palter":-0.375,"paltri":-0.375,"pancytopenia":-0.375,"pang":-0.375,"pantsuit":-0.375,"paraesthesia":-0.375,"paralyt":-0.25,"paranoiac":-0.375,"paraparesi":-0.375,"parasit":-0.375,"paresi":-0.375,"paresthesia":-0.375,"pasteuris":-0.25,"pasteur":-0.25,"patka":-0.375,"patronless":-0.375,"peacekeep":-0.375,"peccadillo":-0.375,"pelt":-0.292,"penalti":-0.281,"pepper":-0.312,"pepperi":-0.375,"percuss":-0.375,"perlech":-0.375,"persecut":-0.25,"petrifi":-0.375,"petticoat":-0.375,"petti":-0.375,"phalloplasti":-0.375,"phenylketonuria":-0.375,"phobophobia":-0.375,"phonophobia":-0.375,"phosgen":-0.375,"phreniti":-0.375,"picaninni":-0.375,"piccaninni":-0.375,"pickaninni":-0.375,"picklepuss":-0.375,"pieta":-0.375,"pigeon":-0.375,"pillag":-0.25,"pirana":-0.375,"pisser":-0.437,"pitchston":-0.375,"pitiabl":-0.375,"pixil":-0.437,"plaint":-0.375,"platitudin":-0.375,"pleonasm":-0.375,"pleuralgia":-0.375,"pleurodynia":-0.375,"plod":-0.375,"plonk":-0.25,"pneumoconiosi":-0.375,"pneumonia":-0.375,"pneumonoconiosi":-0.375,"pneumothorax":-0.375,"pockmark":-0.375,"poetis":-0.375,"poetiz":-0.375,"poison":-0.375,"polecat":-0.312,"polemicis":-0.375,"polemic":-0.375,"polemis":-0.375,"polem":-0.25,"poliosi":-0.375,"pollut":-0.375,"polycythemia":-0.375,"polymyos":-0.375,"polyuria":-0.375,"pommel":-0.375,"poniard":-0.375,"poof":-0.375,"poov":-0.375,"poperi":-0.375,"porphyria":-0.375,"portent":-0.292,"postul":-0.312,"postur":-0.375,"pother":-0.375,"precari":-0.312,"pretenc":-0.3,"pretens":-0.333,"pretrial":-0.375,"preveni":-0.375,"prey":-0.312,"priapism":-0.375,"prick":-0.25,"prig":-0.375,"primitiv":-0.312,"problem":-0.292,"proctalgia":-0.375,"prodroma":-0.375,"profess":-0.312,"promiscu":-0.312,"proof":0.25,"prosaic":-0.292,"protect":0.25,"protrud":-0.292,"prurigo":-0.375,"pseud":-0.375,"pseudo":-0.375,"psoriasi":-0.375,"psycho":-0.375,"psychoneurosi":-0.375,"psychosi":-0.375,"psychosomat":-0.375,"psychot":-0.375,"pugnac":-0.375,"puke":-0.375,"pullout":-0.375,"pummel":-0.375,"pungenc":-0.375,"puni":-0.375,"pushi":-0.375,"putrid":-0.25,"pyjama":-0.312,"pyre":-0.375,"pyrect":-0.375,"pyrophobia":-0.375,"quandari":-0.312,"quarantin":0.25,"quarrel":-0.25,"queer":-0.25,"quinsi":-0.375,"quisl":-0.375,"rachit":-0.375,"rachiti":-0.312,"ragged":-0.437,"raid":0.25,"rainstorm":-0.375,"rale":-0.375,"rambuncti":-0.375,"ransom":-0.375,"ranter":-0.375,"rappe":-0.375,"rapscallion":-0.312,"rascal":-0.312,"raspi":-0.375,"rat":-0.25,"rateabl":-0.375,"rattrap":-0.458,"raw":-0.406,"rebut":-0.312,"recondit":-0.375,"recreant":-0.375,"redbug":-0.375,"reef":-0.292,"reflex":-0.25,"refractori":-0.333,"refut":-0.25,"regorg":-0.375,"relaps":-0.375,"relentless":-0.375,"renegad":-0.25,"repin":-0.375,"reprob":-0.312,"rescuer":-0.312,"respit":-0.375,"restless":-0.25,"retrogress":-0.437,"retronym":-0.375,"revel":-0.375,"revelri":-0.375,"rheumat":-0.375,"rhinophyma":-0.375,"rhizotomi":-0.375,"rhodomontad":-0.375,"rhymer":-0.375,"rhymest":-0.375,"ribald":-0.375,"riboflavin":-0.375,"ricket":-0.375,"rid":-0.375,"rigidifi":-0.312,"rimless":-0.375,"riot":-0.375,"robberi":-0.312,"robusti":-0.375,"rocki":-0.281,"rodomontad":-0.375,"rofecoxib":-0.375,"roguish":-0.312,"roister":-0.375,"rosacea":-0.375,"rotter":-0.375,"rough":-0.286,"roughag":-0.375,"roughen":-0.375,"rub":-0.312,"rubbl":-0.375,"rubor":-0.375,"ruinat":-0.406,"rumbusti":-0.375,"ruse":-0.375,"sackcloth":-0.312,"sacrific":-0.375,"salient":-0.375,"salvag":-0.375,"saprob":-0.25,"saprophag":-0.375,"saprophyt":-0.312,"saprozo":-0.375,"sarcoptid":-0.375,"saturnalia":-0.375,"savageri":-0.375,"savor":-0.375,"scabbi":-0.375,"scabrous":-0.312,"scamp":-0.25,"scantili":-0.375,"scanti":-0.25,"scar":-0.437,"scentless":-0.437,"schlock":-0.375,"scleroderma":-0.375,"scoliosi":-0.375,"scorch":-0.312,"scoreless":-0.375,"scour":-0.375,"scourg":-0.292,"scrape":-0.344,"scratchi":-0.25,"scrawler":-0.375,"screak":-0.312,"screech":-0.312,"scrimi":-0.375,"scroful":-0.417,"scroog":-0.375,"scrunch":-0.375,"sculleri":-0.375,"scunner":-0.375,"scupper":-0.375,"scurfi":-0.312,"seasick":-0.375,"seedi":-0.25,"sellout":-0.375,"semblanc":-0.292,"sepulch":-0.375,"sepulchr":-0.375,"sepultur":-0.312,"serolog":-0.25,"setterwort":-0.375,"sexless":-0.25,"shabbili":-0.312,"shabbi":-0.25,"shag":-0.375,"shaki":-0.375,"shammer":-0.375,"shapeless":-0.25,"shark":-0.375,"shellproof":-0.375,"shenanigan":-0.437,"shimmer":-0.375,"shingl":-0.375,"shipwreck":-0.281,"shiver":-0.25,"shlock":-0.375,"shootout":-0.375,"shopworn":-0.375,"shortag":-0.312,"shriek":-0.375,"shuck":-0.312,"shudder":-0.25,"sick":-0.333,"siderocyt":-0.375,"sideropenia":-0.375,"sideswip":-0.375,"silicosi":-0.375,"silverish":-0.375,"simal":-0.375,"sinist":-0.375,"sizzl":-0.375,"sketchi":-0.375,"skinflint":-0.375,"skinless":-0.375,"skreak":-0.312,"slack":-0.333,"slam":-0.375,"slang":-0.375,"slaughter":-0.25,"slimi":-0.437,"slipper":-0.312,"slovenli":-0.437,"slow":-0.458,"slugfest":-0.375,"sluggard":-0.375,"slummi":-0.375,"slurp":-0.375,"smallpox":-0.375,"smear":-0.375,"smirch":-0.312,"smite":-0.333,"smutti":-0.375,"snafu":-0.25,"snarl":-0.458,"sneak":-0.281,"sneez":-0.25,"sneezer":-0.375,"snit":-0.375,"snob":-0.375,"snooker":-0.437,"snort":-0.375,"soil":-0.25,"soilur":-0.375,"sometim":-0.375,"somewher":-0.375,"sooti":-0.25,"sophism":-0.375,"sophistri":-0.375,"sourpuss":-0.375,"spadework":-0.375,"spare":0.25,"spasm":-0.312,"spasmod":-0.375,"spastic":-0.375,"spelter":-0.375,"spherocyt":-0.375,"spinal":-0.375,"splenet":-0.312,"splenomegali":-0.375,"splutter":-0.437,"spoliat":-0.312,"spook":-0.375,"sputter":-0.375,"squabbler":-0.375,"squalid":-0.375,"squall":-0.25,"squalor":-0.375,"squander":-0.375,"squiggl":-0.312,"stab":-0.312,"staghead":-0.375,"stagnant":-0.312,"stain":-0.3,"stale":-0.312,"stammer":-0.375,"stationari":-0.312,"steatopygia":-0.375,"steatorrhea":-0.375,"steel":-0.312,"stenosi":-0.375,"stern":-0.25,"stifl":-0.375,"stinker":-0.375,"stoicism":-0.375,"stolid":-0.25,"stonewal":-0.25,"strabismus":-0.375,"strafe":-0.25,"straightjacket":-0.375,"straiten":-0.375,"strangl":-0.375,"strapless":-0.375,"stratagem":-0.312,"strenuous":0.25,"strikebound":-0.375,"strikebreak":-0.25,"stubborn":-0.25,"stuck":-0.437,"stumbl":-0.312,"stumblebum":-0.312,"stunt":-0.25,"stupefi":-0.333,"stutter":-0.375,"subacid":-0.375,"subdued":-0.375,"subtleti":-0.312,"sunder":-0.375,"superbia":-0.375,"superfici":-0.375,"supernatur":-0.25,"superstiti":-0.375,"surpris":-0.25,"surprising":-0.375,"survivor":-0.375,"sutte":-0.375,"swale":-0.375,"swashbuckl":-0.25,"swat":-0.375,"swellhead":-0.375,"symptomat":-0.375,"tabard":-0.375,"tabe":-0.375,"tacki":-0.437,"tamper":-0.375,"taphephobia":-0.375,"taradiddl":-0.375,"tarant":-0.375,"tarradiddl":-0.375,"taskmast":-0.375,"tatterdemalion":-0.25,"taut":-0.312,"taxpay":-0.375,"temer":-0.375,"tempestu":-0.312,"tenia":-0.375,"tens":-0.312,"tenur":0.25,"tepid":-0.312,"tera":-0.375,"teratogenesi":-0.375,"tergivers":-0.312,"thanatopsi":-0.375,"thanksgiv":-0.375,"thermoset":-0.375,"thorni":-0.375,"thoughtless":-0.312,"threadbar":-0.437,"threat":-0.437,"thrombocytopenia":-0.375,"thrombopenia":-0.375,"thurifi":-0.375,"thwack":-0.375,"thyrocalcitonin":-0.375,"thyroid":-0.312,"timeless":-0.375,"toadstool":-0.375,"toment":-0.375,"tommyrot":-0.375,"toneless":-0.375,"topmast":-0.375,"torpor":-0.312,"tosh":-0.375,"tote":-0.375,"totter":-0.312,"touch":0.25,"tough":-0.333,"toughi":-0.375,"toxoplasmosi":-0.375,"tragedi":-0.312,"transmigr":-0.375,"trap":-0.25,"trauma":-0.312,"treason":-0.292,"trembl":-0.25,"trifurc":-0.375,"trinket":-0.375,"tripinnatifid":-0.375,"trite":-0.25,"trounc":-0.417,"truckl":-0.312,"trudg":-0.25,"tsine":-0.375,"tuff":-0.375,"tumor":-0.375,"tumour":-0.375,"tumultu":-0.375,"turbul":-0.25,"tusheri":-0.375,"tutu":-0.375,"twaddl":-0.375,"twerp":-0.375,"twirp":-0.375,"twit":-0.375,"ulalgia":-0.375,"unabridg":-0.375,"unaccustom":-0.312,"unadapt":-0.375,"unadjust":-0.312,"unadopt":-0.375,"unaid":-0.375,"unalik":-0.375,"unansw":-0.375,"unanticip":-0.375,"unarbitrari":-0.375,"unascertain":-0.375,"unascrib":-0.375,"unask":-0.375,"unassist":-0.312,"unattribut":-0.375,"unband":-0.375,"unbrush":-0.375,"uncar":-0.312,"unchang":0.25,"unclean":-0.375,"unclip":-0.375,"uncomplimentari":-0.312,"uncomprehens":-0.375,"uncondit":-0.312,"unconfirm":-0.375,"uncongeni":-0.25,"unconquer":-0.437,"unconscienti":-0.375,"unconscion":-0.375,"unconsumm":-0.375,"unconvent":-0.375,"unconvert":-0.375,"uncultiv":-0.375,"uncur":-0.375,"unded":-0.375,"undefin":-0.25,"undeni":-0.375,"undepict":-0.375,"underbelli":-0.292,"undercloth":-0.25,"underexposur":-0.375,"underneath":-0.375,"underp":-0.375,"underpopul":-0.375,"underquot":-0.437,"underr":-0.375,"undersel":-0.375,"undershot":-0.375,"undershrub":-0.375,"underskirt":-0.375,"underwear":-0.375,"undetect":-0.25,"undigest":-0.437,"undiscover":-0.375,"undream":-0.375,"undreamt":-0.375,"undu":-0.281,"unenforc":-0.375,"uneth":-0.25,"uneven":-0.25,"unexact":-0.375,"unexchang":-0.25,"unexpected":-0.375,"unexplor":-0.375,"unfaith":-0.312,"unfamiliar":-0.375,"unf":-0.437,"unfit":-0.292,"unfix":-0.375,"unfledg":-0.292,"unforeseen":-0.375,"unforfeit":-0.375,"unfund":-0.375,"ungroom":-0.375,"unheal":-0.375,"unimagin":-0.375,"unimprov":-0.375,"unindustrialis":-0.375,"unindustri":-0.375,"uninfluenti":-0.375,"uninform":-0.375,"uninspir":-0.437,"uninstruct":-0.375,"uninvit":-0.375,"unkempt":-0.375,"unknown":-0.4,"unlearn":-0.458,"unlight":-0.375,"unlit":-0.375,"unmanag":-0.375,"unmark":-0.312,"unmus":-0.417,"unnotch":-0.375,"unnot":-0.25,"unobserv":-0.25,"unpardon":-0.375,"unpatronis":-0.375,"unpatron":-0.375,"unpattern":-0.375,"unperceiv":-0.375,"unpictur":-0.375,"unpillar":-0.375,"unpointed":-0.375,"unpract":-0.375,"unpractis":-0.375,"unquestion":-0.292,"unquot":-0.375,"unratifi":-0.375,"unreact":-0.312,"unreadi":-0.375,"unreal":-0.437,"unrealist":-0.375,"unreciproc":-0.375,"unrecognis":-0.375,"unrecogniz":-0.375,"unrecogn":-0.375,"unreconcil":-0.375,"unrefresh":-0.375,"unrel":-0.375,"unrelated":-0.375,"unrenew":-0.25,"unrent":-0.375,"unrepres":-0.375,"unrequest":-0.375,"unrequit":-0.375,"unreserv":-0.375,"unresolv":-0.437,"unrespons":-0.292,"unrest":-0.375,"unretriev":-0.375,"unreverber":-0.375,"unreviv":-0.375,"unrhythm":-0.375,"unroof":-0.375,"unroug":-0.375,"unsaid":-0.375,"unsavori":-0.312,"unsavouri":-0.312,"unseamanlik":-0.375,"unseason":-0.417,"unservic":-0.375,"unservil":-0.375,"unsharpen":-0.375,"unsheath":-0.375,"unshutt":-0.375,"unsoci":-0.375,"unsoldi":-0.375,"unsolicit":-0.375,"unsolv":-0.25,"unstat":-0.375,"unstopp":0.25,"unstudi":-0.375,"unsubmiss":-0.375,"unsung":-0.375,"unsupervis":-0.375,"unsupport":-0.25,"unsuspect":-0.375,"unsympathet":-0.35,"unsympathis":-0.375,"unsympath":-0.375,"untel":-0.375,"untest":-0.375,"untooth":-0.375,"untransmut":-0.375,"untri":-0.375,"untru":-0.406,"untruth":-0.25,"untuck":-0.375,"unutt":-0.375,"unverbalis":-0.375,"unverb":-0.375,"unvers":-0.375,"unwarrant":-0.375,"unwarr":-0.292,"unwelcom":-0.437,"unwish":-0.375,"unworkmanlik":-0.375,"unyielding":-0.375,"upchuck":-0.375,"upheav":-0.25,"uproar":-0.375,"upsett":-0.375,"urarthr":-0.375,"urethr":-0.375,"urg":-0.312,"urtic":-0.312,"vaccin":-0.25,"vaccine":-0.375,"vaccinum":-0.375,"vacuiti":-0.417,"valdecoxib":-0.375,"valis":-0.375,"variola":-0.375,"varnish":-0.25,"vehem":-0.375,"vermicul":-0.375,"versifi":-0.375,"vesic":-0.375,"vestibular":-0.375,"victim":-0.312,"villain":-0.25,"villaini":-0.437,"violenc":-0.333,"virul":-0.292,"vitiat":-0.437,"vitriol":-0.25,"volvulus":-0.375,"vomer":-0.375,"vomit":-0.25,"vomitus":-0.375,"vulgarian":-0.375,"waistcoat":-0.375,"walkout":-0.437,"walli":-0.375,"wangler":-0.375,"wanker":-0.375,"want":0.25,"ward":-0.375,"warrag":-0.312,"warrig":-0.312,"warrior":-0.375,"wavi":-0.312,"weaken":-0.25,"weak":-0.275,"weasel":-0.312,"weisenheim":-0.375,"whaleboat":-0.375,"whang":-0.333,"whinston":-0.375,"whisker":-0.375,"whoope":-0.375,"wiesenboden":-0.375,"wild":-0.406,"wildcat":-0.292,"wildflow":-0.375,"winc":-0.375,"windburn":-0.375,"windburnt":-0.375,"wingless":-0.375,"wiseacr":-0.375,"wisenheim":-0.375,"witchcraft":-0.375,"witcheri":-0.375,"withstand":-0.375,"wolf":-0.292,"wooden":-0.375,"woofer":-0.375,"wop":-0.375,"workforc":-0.375,"worn":-0.437,"worsen":-0.312,"wound":-0.25,"wrack":-0.375,"wrick":-0.375,"wristlet":-0.375,"xanthomatosi":-0.375,"xeroderma":-0.375,"xerodermia":-0.375,"xeroma":-0.375,"xerophthalmia":-0.375,"xerophthalmus":-0.375,"xerostomia":-0.375,"yap":-0.375,"yashmac":-0.375,"yashmak":-0.375,"yawp":-0.375,"yaw":-0.375,"yell":-0.375,"zalcitabin":-0.375,"zap":-0.281,"zoster":-0.375,"abati":0.25,"abatti":0.25,"abaxi":0.25,"abdomin":0.25,"abet":0.25,"abient":0.25,"ablaz":0.25,"abolish":0.25,"abortifaci":0.25,"abracadabra":0.25,"abscess":0.25,"absentmind":0.25,"absolvitori":0.25,"absorbefaci":0.25,"absorpt":0.25,"abstent":0.25,"abstract":0.25,"abi":0.25,"aby":0.25,"academ":0.25,"acanthion":0.25,"acarp":0.25,"accentu":0.25,"accession":0.25,"account":-0.25,"accout":0.25,"accoutr":0.25,"accretionari":0.25,"achromatin":0.25,"acquaintanceship":0.25,"acquisit":0.25,"acrocarp":0.25,"acromion":0.25,"acronym":0.25,"actinoid":0.25,"actualis":0.25,"acuat":0.25,"acumen":0.25,"acumin":0.25,"acut":0.25,"ad":0.25,"adag":0.25,"adaptor":0.25,"adhes":0.25,"adient":0.25,"adjuratori":0.25,"adolesc":0.25,"adpress":0.25,"adrenalin":0.25,"adsorb":0.25,"adul":0.25,"advertiz":0.25,"advic":0.25,"advisori":0.25,"advocaci":0.25,"aerobiot":0.25,"aesthetician":0.25,"aether":0.25,"affidavit":0.25,"affili":0.25,"affric":0.25,"afoot":0.25,"aftercar":0.25,"afterglow":0.25,"aggrad":0.25,"aggreg":0.25,"agleam":0.25,"aglow":0.25,"agronomist":0.25,"ahead":0.25,"air":0.25,"airmanship":0.25,"ajar":0.25,"alacr":0.25,"alari":0.25,"alat":0.25,"alcalesc":0.25,"alcohol":-0.25,"alendron":0.25,"algorithm":0.25,"alibi":0.25,"aliform":0.25,"aliphat":0.25,"alkalesc":0.25,"alkalot":0.25,"alleg":0.25,"alloc":0.25,"alpenstock":0.25,"altern":0.25,"altitudin":0.25,"ambl":0.25,"ameer":0.25,"amelioratori":0.25,"amethopterin":0.25,"amir":0.25,"amnio":0.25,"amniocentesi":0.25,"amoralist":0.25,"amorist":0.25,"amphictyoni":0.25,"amygdala":0.25,"anabol":0.25,"anaclisi":0.25,"anagog":0.25,"anagram":0.25,"analges":-0.25,"analget":0.25,"analyz":0.25,"anasarc":0.25,"anatom":-0.25,"anatomist":0.25,"anatrop":0.25,"andant":0.25,"anecdot":-0.25,"anel":0.25,"angioscop":0.25,"annual":0.25,"anodyn":-0.25,"anom":0.25,"antapex":0.25,"anted":0.25,"antelop":0.25,"antenat":0.25,"antepartum":0.25,"anthropomorph":0.25,"anthroposophi":0.25,"antiauthoritarian":0.25,"anticanc":0.25,"anticlimact":0.25,"antidiabet":0.25,"antifung":0.25,"antiheret":0.25,"antiphon":0.25,"antiphonari":0.25,"antipsychot":0.25,"antiquarian":0.25,"antiquari":0.25,"antitank":0.25,"antitumor":0.25,"antitumour":0.25,"antler":0.25,"antrors":0.25,"apac":0.25,"aphorist":0.25,"apochromat":0.25,"apocop":0.25,"apologia":0.25,"apostl":0.25,"apotheosi":0.25,"appealing":0.25,"appear":0.25,"append":0.25,"appercept":0.25,"appliqu":0.25,"appoint":0.25,"apport":0.25,"apportion":0.25,"apprentic":0.25,"apprent":0.25,"appress":0.25,"appro":0.25,"approxim":-0.25,"arachnid":0.25,"arbitra":0.25,"arcadian":0.25,"arcan":0.25,"arc":0.25,"archaeorni":0.25,"archer":0.25,"architecton":0.25,"archivist":0.25,"arciform":0.25,"arcuat":0.25,"argentifer":0.25,"arios":0.25,"ariti":0.25,"armchair":0.25,"armguard":0.25,"armrest":0.25,"arrant":0.25,"arrog":0.25,"articl":0.25,"artisan":0.25,"ashram":0.25,"asinin":0.25,"aslant":0.25,"aslop":0.25,"assibil":0.25,"assign":0.25,"assimilatori":0.25,"asson":0.25,"asterion":0.25,"astoni":0.25,"astonish":0.25,"astound":0.25,"ataraxia":0.25,"atorvastatin":0.25,"atox":0.25,"attaind":0.25,"attend":0.25,"auburn":0.25,"audiotap":0.25,"audiovisu":0.25,"augment":0.25,"auricular":0.25,"auteur":0.25,"authent":0.25,"authoris":-0.25,"authorit":0.25,"author":-0.25,"autodidact":0.25,"autoeci":0.25,"autophyt":0.25,"autotel":0.25,"autotroph":0.25,"avail":0.25,"avocado":0.25,"awak":0.25,"awash":0.25,"axial":0.25,"axiolog":0.25,"azithromycin":0.25,"babassu":0.25,"babyish":0.25,"babysitt":0.25,"babysit":0.25,"background":0.25,"backroom":0.25,"balefir":0.25,"balk":-0.25,"balker":0.25,"balletomania":0.25,"ballott":0.25,"balmi":0.25,"bamboozl":0.25,"bankbook":0.25,"bann":0.25,"bantam":0.25,"barb":0.25,"bare":-0.25,"barefac":0.25,"barehead":0.25,"bareleg":0.25,"barndoor":0.25,"barter":0.25,"basic":0.25,"basketmak":0.25,"basketri":0.25,"basketweav":0.25,"basophil":0.25,"bastion":0.25,"bathtub":0.25,"batw":0.25,"baulk":0.25,"baulker":0.25,"beachbal":0.25,"bead":0.25,"bear":0.25,"beaut":0.25,"beautician":0.25,"becalm":0.25,"becoming":0.25,"bedhop":0.25,"beforehand":0.25,"befriend":0.25,"behindhand":0.25,"beig":0.25,"belat":0.25,"belittl":0.25,"bell":0.25,"bellylaugh":0.25,"benchmark":0.25,"benefact":0.25,"berk":0.25,"beseech":0.25,"bespectacl":0.25,"bespoken":0.25,"bestialis":0.25,"bestial":0.25,"bias":0.25,"bibl":0.25,"bibliot":0.25,"bicephal":0.25,"bichrom":0.25,"bicorn":0.25,"bicornu":0.25,"biennial":0.25,"bifid":0.25,"bifurc":0.25,"bigemin":0.25,"bigener":0.25,"bilabi":0.25,"bilinear":0.25,"bilingu":0.25,"billet":0.25,"biloc":0.25,"binderi":0.25,"bind":0.25,"binomin":0.25,"bioassay":0.25,"biodegrad":0.25,"bioethic":0.25,"bipar":0.25,"biradi":0.25,"biram":0.25,"birdsong":0.25,"birr":0.25,"bishopri":0.25,"bitti":0.25,"bitumast":0.25,"blabbermouth":0.25,"blackjack":0.25,"blacklist":0.25,"blanquillo":0.25,"blasphem":0.25,"blaze":-0.25,"bleat":0.25,"bleb":-0.25,"blindfold":0.25,"blink":0.25,"bloc":0.25,"blockbust":0.25,"blurb":0.25,"boast":0.25,"boat":0.25,"bodaci":0.25,"boil":0.25,"bolshevis":0.25,"bolshev":0.25,"bonfir":0.25,"bonhomi":0.25,"bonnethead":0.25,"bookabl":0.25,"book":0.25,"bookend":0.25,"boondoggl":-0.25,"bouffant":0.25,"bouff":0.25,"bound":0.25,"bounded":0.25,"boundless":-0.25,"bowman":0.25,"brainchild":0.25,"brainwash":0.25,"braless":0.25,"brasslik":0.25,"bravo":0.25,"brawn":0.25,"breve":0.25,"breviari":0.25,"brighten":0.25,"bring":0.25,"brio":0.25,"brioch":0.25,"broomstick":0.25,"brushup":0.25,"brut":0.25,"bubblejet":0.25,"buckram":0.25,"buddi":0.25,"bulgi":0.25,"bumblebe":0.25,"bun":0.25,"bunchi":0.25,"bungaloid":0.25,"burdenless":0.25,"burglarproof":0.25,"burin":0.25,"burnish":0.25,"bush":-0.25,"busi":0.25,"busywork":0.25,"butler":0.25,"button":0.25,"buttress":0.25,"buttweld":0.25,"buy":0.25,"bygon":0.25,"bypast":0.25,"byword":0.25,"cabinetri":0.25,"cach":0.25,"cadast":0.25,"cadastr":0.25,"cadenza":0.25,"caespitos":0.25,"cafeteria":0.25,"calc":0.25,"calib":0.25,"calibr":0.25,"calligraph":0.25,"calligraphist":0.25,"calumet":0.25,"camaraderi":0.25,"campfir":0.25,"camphor":0.25,"canal":0.25,"cancel":0.25,"candesc":0.25,"candid":0.25,"candi":0.25,"canonist":0.25,"cantata":0.25,"capacitor":0.25,"caparison":0.25,"capit":0.25,"cap":0.25,"carbin":0.25,"carboy":0.25,"caricatur":0.25,"carioca":0.25,"carnassi":0.25,"carniv":0.25,"cartel":0.25,"carv":0.25,"carven":0.25,"casework":0.25,"cassino":0.25,"catachrest":0.25,"catamit":0.25,"cataphoresi":0.25,"cataton":0.25,"catchpenni":0.25,"categorem":0.25,"cater":0.25,"caterwaul":0.25,"cattleya":0.25,"causat":0.25,"celebratori":0.25,"cellblock":0.25,"cenotaph":0.25,"centrifug":0.25,"centrism":0.25,"cephalopod":0.25,"certainti":0.25,"certifi":0.25,"certitud":0.25,"cespitos":0.25,"chaffinch":0.25,"chambermaid":0.25,"champaign":0.25,"champerti":0.25,"chat":0.25,"chateau":0.25,"chauvinist":0.25,"checker":0.25,"cheerer":0.25,"chequer":0.25,"chestnut":0.25,"chesti":0.25,"chiffoni":0.25,"chiropodist":0.25,"chitchat":0.25,"chivalri":0.25,"choke":0.25,"choral":0.25,"chosen":0.25,"chroma":0.25,"chromatin":0.25,"chronograph":0.25,"chronolog":0.25,"chronomet":0.25,"chump":0.25,"churchgoer":0.25,"churchgo":0.25,"churchman":0.25,"ciceron":0.25,"circumflex":0.25,"circumpolar":0.25,"circumscrib":0.25,"citifi":0.25,"cityfi":0.25,"civilian":0.25,"civilis":0.25,"civilli":0.25,"clampdown":0.25,"clang":-0.25,"clangor":0.25,"clannish":0.25,"clarion":0.25,"claver":0.25,"claxon":0.25,"clearstori":0.25,"cleavabl":0.25,"cleft":0.25,"clerestori":0.25,"cleric":0.25,"clerisi":0.25,"clevi":0.25,"climat":0.25,"climatologist":0.25,"climb":0.25,"clip":0.25,"cliqu":0.25,"cliquish":0.25,"clog":0.25,"clothesless":0.25,"clubbi":0.25,"coatdress":0.25,"coaxal":0.25,"coaxial":0.25,"cocain":0.25,"cockcrow":0.25,"cockl":0.25,"coerc":0.25,"cogent":0.25,"cohes":0.25,"cohun":0.25,"coiff":0.25,"coiffur":0.25,"coincident":0.25,"collim":0.25,"collus":0.25,"columnar":0.25,"columniform":0.25,"columnlik":0.25,"comb":0.25,"combinatori":0.25,"comeback":0.25,"comedian":0.25,"command":-0.25,"commens":0.25,"commercialis":0.25,"commerci":0.25,"committe":0.25,"commodi":0.25,"commonplac":-0.25,"communion":0.25,"comp":0.25,"compani":0.25,"compart":0.25,"compel":0.25,"competitori":0.25,"compound":0.25,"comptrol":0.25,"compuls":-0.25,"comradeli":0.25,"comraderi":0.25,"comradeship":0.25,"conceiv":0.25,"concentr":0.25,"conceptu":0.25,"conclav":0.25,"conclud":0.25,"conclus":-0.25,"concret":0.25,"concur":0.25,"concurr":0.25,"conduc":0.25,"condylion":0.25,"confect":0.25,"conglomer":0.25,"conjunct":0.25,"conjunctur":0.25,"connatur":0.25,"connot":0.25,"consensus":0.25,"conserv":0.25,"conservativist":0.25,"consolatori":0.25,"constru":0.25,"consultatori":0.25,"contain":0.25,"contest":-0.25,"contractil":0.25,"contrast":0.25,"contriv":0.25,"conven":0.25,"conventionalis":0.25,"convention":0.25,"converg":0.25,"conversationalist":0.25,"conversationist":0.25,"coo":0.25,"cooccur":0.25,"copartnership":0.25,"copperi":0.25,"coquetri":0.25,"coreid":0.25,"corn":0.25,"coronion":0.25,"corporat":0.25,"correl":0.25,"cortic":0.25,"cosmetologist":0.25,"cosmopolitan":0.25,"coteri":0.25,"cottonwick":0.25,"cottoni":0.25,"couchant":0.25,"counteract":0.25,"counterbalanc":0.25,"counterexampl":0.25,"counterfactu":0.25,"countermeasur":0.25,"counterpoint":0.25,"counterpois":0.25,"countersign":0.25,"countersubvers":0.25,"countless":0.25,"countrifi":0.25,"countryfi":0.25,"cousin":0.25,"coval":0.25,"covari":0.25,"cowbel":0.25,"cowcatch":0.25,"crackl":0.25,"crampfish":0.25,"craniolog":0.25,"cranni":0.25,"creaseless":0.25,"cred":0.25,"credo":0.25,"credul":0.25,"creed":0.25,"crenat":0.25,"cresson":0.25,"crinion":0.25,"critiqu":0.25,"croni":0.25,"croquet":0.25,"crossti":0.25,"crown":0.25,"cruciat":0.25,"cruciform":0.25,"crusad":0.25,"crux":0.25,"cryptanalyst":0.25,"cryptograph":0.25,"cryptologist":0.25,"cryptomonad":0.25,"cryptophyt":0.25,"crystallin":0.25,"crystallis":0.25,"cuddl":0.25,"cuff":0.25,"cumbersom":0.25,"cupbear":0.25,"cupid":0.25,"curio":0.25,"curli":0.25,"current":0.25,"cursor":0.25,"cursori":0.25,"curtail":0.25,"curtain":0.25,"curv":0.25,"curvey":0.25,"curvilin":0.25,"curvilinear":0.25,"cushi":0.25,"custodian":0.25,"customarili":0.25,"cyan":0.25,"cyanogenet":0.25,"cyanogen":0.25,"cyclic":0.25,"cyclopaedia":0.25,"cyclopedia":0.25,"cyclopia":0.25,"cynosur":0.25,"cyproheptadin":0.25,"cytopathogen":0.25,"cytoplast":0.25,"dabbl":0.25,"dadaism":0.25,"dado":0.25,"dale":0.25,"databl":0.25,"dateabl":0.25,"dawn":0.25,"daybreak":0.25,"daylong":0.25,"dayspr":0.25,"deadbeat":0.25,"deadpan":0.25,"debark":0.25,"debug":0.25,"debugg":0.25,"decad":0.25,"decant":0.25,"decertifi":0.25,"decim":0.25,"decipher":0.25,"decis":0.25,"deco":0.25,"decolonis":0.25,"decolon":0.25,"decommiss":0.25,"decompos":0.25,"decoupl":0.25,"decre":0.25,"defend":0.25,"deflect":0.25,"delimit":0.25,"deliquesc":0.25,"deliveryman":0.25,"deloc":0.25,"demo":0.25,"demobilis":0.25,"demobil":0.25,"demulc":0.25,"denotatum":0.25,"densitometri":0.25,"depil":0.25,"deprav":0.25,"derecognis":0.25,"derecogn":0.25,"descriptiv":0.25,"desegr":0.25,"deserving":0.25,"detaine":0.25,"detox":0.25,"deuc":0.25,"deuteranopia":0.25,"development":0.25,"devour":-0.25,"dextral":0.25,"dextrors":0.25,"diacrit":0.25,"diagrammat":0.25,"dialectician":0.25,"dialectolog":0.25,"dialyz":0.25,"diapir":0.25,"dichotomis":0.25,"dichotom":0.25,"dielectrolysi":0.25,"diestrous":0.25,"diestrual":0.25,"dietician":0.25,"dietitian":0.25,"differentia":0.25,"diffus":0.25,"diffusor":0.25,"diflunis":0.25,"diminuendo":0.25,"diminut":0.25,"dioestrous":0.25,"dioestrual":0.25,"diphthong":0.25,"diploma":0.25,"dirk":0.25,"discard":0.25,"disciplinarian":0.25,"discontented":0.25,"discontent":0.25,"discount":0.25,"discretionari":0.25,"disembark":0.25,"disembroil":0.25,"disinherit":0.25,"disintegr":0.25,"disinterested":0.25,"disinvolv":0.25,"disjoint":0.25,"dispar":0.25,"dispers":0.25,"dissect":0.25,"dissemin":0.25,"dissert":0.25,"dissolut":-0.25,"distaff":0.25,"distribut":0.25,"disyllab":0.25,"divot":0.25,"doc":0.25,"doctrinair":0.25,"doctrin":0.25,"document":0.25,"doddl":0.25,"domin":-0.25,"donnish":0.25,"doorsil":0.25,"doorstep":0.25,"dope":0.25,"dorsiflexion":0.25,"dotard":0.25,"doubl":0.25,"doveki":0.25,"dower":0.25,"downer":0.25,"downlik":0.25,"downsid":0.25,"doxazosin":0.25,"doxolog":0.25,"draft":0.25,"drainag":0.25,"drainboard":0.25,"drain":0.25,"dreamland":0.25,"dreamworld":0.25,"driven":0.25,"driveshaft":0.25,"drowsi":0.25,"drug":0.25,"dubit":0.25,"duli":0.25,"dumbstricken":0.25,"dumbstruck":0.25,"dumfound":0.25,"dumper":0.25,"duodecim":0.25,"dutiabl":0.25,"dwarfish":0.25,"dynamis":0.25,"eardrum":0.25,"earmark":0.25,"earthshak":0.25,"easel":0.25,"ecclesiast":0.25,"echoic":0.25,"eclectic":0.25,"eclecticist":0.25,"ecolog":0.25,"econom":0.25,"ecosystem":0.25,"ecumenic":0.25,"editor":0.25,"educationalist":0.25,"educationist":0.25,"eellik":0.25,"effer":0.25,"effervesc":0.25,"effet":0.25,"effortless":-0.25,"effus":0.25,"eldorado":0.25,"elect":0.25,"electrophoresi":0.25,"electroposit":0.25,"electroretinogram":0.25,"elimin":0.25,"elis":0.25,"ellipt":0.25,"elysian":0.25,"eman":0.25,"emargin":0.25,"emeer":0.25,"emir":0.25,"emolli":0.25,"empathis":0.25,"emphasis":0.25,"empir":0.25,"empower":0.25,"emul":0.25,"encas":0.25,"encircl":-0.25,"encor":0.25,"encycl":0.25,"encyclopaedia":0.25,"encyclopaedist":0.25,"encyclopedia":0.25,"encyclopedist":0.25,"endaemon":0.25,"end":0.25,"endem":0.25,"endoerg":0.25,"endogenet":0.25,"endpoint":0.25,"endur":-0.25,"energis":0.25,"energ":0.25,"enfranchis":0.25,"engrav":0.25,"enolog":0.25,"enquiri":0.25,"ensorcel":0.25,"ensur":0.25,"enterpris":-0.25,"enthron":0.25,"entir":0.25,"entireti":0.25,"entourag":0.25,"entreati":0.25,"entrench":0.25,"envelop":0.25,"eosinophil":0.25,"epicen":0.25,"epigram":0.25,"epikeratophakia":0.25,"epimorph":0.25,"epinephrin":0.25,"epistem":0.25,"epistemolog":0.25,"eq":0.25,"equanim":0.25,"equipot":0.25,"equival":0.25,"eradic":0.25,"ergotrop":0.25,"erotic":0.25,"er":0.25,"escapologist":0.25,"eschaton":0.25,"esoter":0.25,"esprit":0.25,"estazolam":0.25,"esthetician":0.25,"estoppel":0.25,"etch":0.25,"ethnocentr":0.25,"ethnolog":0.25,"ethosuximid":0.25,"eurhythm":0.25,"eurhythmi":0.25,"eurythm":0.25,"eurythmi":0.25,"evanesc":0.25,"evapor":0.25,"event":0.25,"everyday":0.25,"evidenc":0.25,"examen":0.25,"exanim":0.25,"exclaim":0.25,"exclamatori":0.25,"exclus":-0.25,"excogit":0.25,"excus":0.25,"exig":0.25,"existenti":0.25,"exoerg":0.25,"exon":0.25,"expand":0.25,"expati":0.25,"expect":0.25,"expiat":-0.25,"expressionless":0.25,"expressway":0.25,"extenu":0.25,"exterioris":0.25,"extern":0.25,"extinguish":-0.25,"extra":0.25,"extract":0.25,"extracurricular":0.25,"extramarit":0.25,"extraordinarili":0.25,"extravag":0.25,"extric":0.25,"extropi":0.25,"eyebal":0.25,"eye":0.25,"eyedrop":0.25,"eyelid":0.25,"eyelik":0.25,"eyepatch":0.25,"eyeshot":0.25,"facepl":0.25,"facial":0.25,"fad":0.25,"faddish":0.25,"faddi":0.25,"fag":0.25,"fairground":0.25,"falcat":0.25,"falchion":0.25,"falciform":0.25,"falconri":0.25,"falter":0.25,"fanat":0.25,"fantasia":0.25,"fantasm":0.25,"farfetch":0.25,"farrow":0.25,"farse":0.25,"fastidi":0.25,"fatherli":0.25,"fatigu":-0.25,"fat":0.25,"fatuous":0.25,"faultfind":-0.25,"feather":0.25,"featheri":-0.25,"febril":0.25,"fedellin":0.25,"fellat":0.25,"fencer":0.25,"fenestella":0.25,"ferment":0.25,"ferroconcret":0.25,"fertilis":0.25,"fervent":-0.25,"fervor":0.25,"fervour":0.25,"festschrift":0.25,"fete":0.25,"feudal":0.25,"feudatori":0.25,"fibrillos":0.25,"fibrocalcif":0.25,"fiction":0.25,"fight":0.25,"figur":0.25,"filial":0.25,"final":0.25,"financ":0.25,"fineri":0.25,"finit":-0.25,"finitud":0.25,"firebas":0.25,"fireplac":0.25,"firewat":0.25,"firm":0.25,"firsthand":0.25,"flabbergast":0.25,"flagston":0.25,"flail":0.25,"flameproof":0.25,"flan":0.25,"fledgel":0.25,"flee":0.25,"fleeci":0.25,"flesh":0.25,"flexuous":0.25,"flirtat":0.25,"flirt":0.25,"floati":0.25,"floccul":0.25,"flood":0.25,"flossi":0.25,"flouri":0.25,"flower":0.25,"fluffi":-0.25,"fluoresc":0.25,"fli":0.25,"fogbound":0.25,"fogey":0.25,"fogi":0.25,"foliol":0.25,"folktal":0.25,"footbridg":0.25,"footrac":0.25,"footstal":0.25,"forcibl":0.25,"forearm":0.25,"forego":0.25,"foregon":0.25,"foreknowledg":0.25,"foreordain":0.25,"forestal":0.25,"forfic":0.25,"forgett":0.25,"forgiv":0.25,"formula":0.25,"formul":0.25,"fort":0.25,"forum":0.25,"foryml":0.25,"foulard":0.25,"fragranc":0.25,"fragrant":0.25,"fraternis":0.25,"fratern":0.25,"freelanc":0.25,"freestyl":0.25,"freeway":0.25,"fring":0.25,"fringi":0.25,"frolic":0.25,"frugal":0.25,"fulgent":0.25,"fulli":0.25,"fume":0.25,"fund":0.25,"funfair":0.25,"fungicid":0.25,"funni":0.25,"furbish":0.25,"furl":0.25,"fuscous":0.25,"fusibl":0.25,"fusiform":0.25,"fuzz":0.25,"gaga":0.25,"gambol":0.25,"gangl":0.25,"gang":0.25,"garbolog":0.25,"garmentless":0.25,"garnishe":0.25,"gash":0.25,"gatepost":0.25,"gather":0.25,"gauntlet":0.25,"gemmul":0.25,"genetic":0.25,"genteel":0.25,"gentl":0.25,"genuin":0.25,"geograph":0.25,"geolog":0.25,"geometr":0.25,"geopolit":0.25,"geordi":0.25,"gerrymand":0.25,"gesso":0.25,"gesticul":0.25,"gibber":0.25,"gibberish":0.25,"gingerroot":0.25,"girder":0.25,"glabella":0.25,"glabresc":0.25,"glabrous":0.25,"glari":0.25,"gleam":0.25,"glimmer":0.25,"globalis":0.25,"global":0.25,"globos":0.25,"globular":0.25,"gloriol":0.25,"glottochronolog":0.25,"gnarl":0.25,"gnar":0.25,"gnathostom":0.25,"gnosi":0.25,"goddam":0.25,"goddamn":0.25,"godli":0.25,"goldmin":0.25,"golf":0.25,"gradabl":0.25,"gradat":0.25,"gradatori":0.25,"graduat":0.25,"grammat":0.25,"gramophon":0.25,"granitewar":0.25,"graspabl":0.25,"gratif":0.25,"graven":0.25,"grave":-0.25,"green":0.25,"groov":0.25,"ground":0.25,"grow":0.25,"growl":-0.25,"guarantor":0.25,"guardian":0.25,"guardrail":0.25,"guidebook":0.25,"guild":0.25,"guileless":0.25,"gula":0.25,"gummi":0.25,"gunstock":0.25,"gusher":0.25,"gymkhana":0.25,"gymnast":0.25,"gynandromorph":0.25,"haecceiti":0.25,"hallucinogen":0.25,"handbel":0.25,"handbreadth":0.25,"handcraft":0.25,"handcuff":0.25,"handed":0.25,"handheld":0.25,"handicapp":0.25,"handiwork":0.25,"handsbreadth":0.25,"handwork":0.25,"handwoven":0.25,"harlotri":0.25,"har":0.25,"haughti":-0.25,"haul":0.25,"hauteur":0.25,"hawfinch":0.25,"hazan":0.25,"hazi":0.25,"headfirst":0.25,"headlik":0.25,"headlines":0.25,"headlong":0.25,"headquart":0.25,"headstock":0.25,"headwait":0.25,"hearsay":0.25,"heartland":0.25,"heavenward":0.25,"helmet":0.25,"helpdesk":0.25,"hemiparasit":0.25,"hemostat":0.25,"henpeck":0.25,"here":0.25,"hereditarian":0.25,"hereditari":0.25,"heretofor":0.25,"herit":0.25,"heroin":-0.25,"herrerasaur":0.25,"herrerasaurus":0.25,"hesit":-0.25,"heterodactyl":0.25,"heterometabol":0.25,"heterosex":0.25,"heterospor":0.25,"heterotroph":0.25,"heurist":0.25,"hifalutin":0.25,"higher":0.25,"highfalutin":0.25,"highfalut":0.25,"highflier":0.25,"highflyer":0.25,"high":0.25,"hilt":0.25,"hinder":0.25,"hippi":0.25,"hipster":0.25,"hitchhik":0.25,"hitherto":0.25,"hobnail":0.25,"hoggish":0.25,"holist":0.25,"holograph":0.25,"homag":0.25,"home":0.25,"homebound":0.25,"homebrew":0.25,"homemak":0.25,"homeotherm":0.25,"homeown":0.25,"homili":0.25,"homin":0.25,"homocentr":0.25,"homocycl":0.25,"homoeci":0.25,"homoerotic":0.25,"homoiotherm":0.25,"homosexu":0.25,"homotherm":0.25,"honesti":0.25,"honorari":0.25,"hooklik":0.25,"hook":0.25,"hoover":0.25,"horolog":0.25,"hospitalis":0.25,"hostler":0.25,"houri":0.25,"hourlong":0.25,"houseboat":0.25,"housefath":0.25,"household":0.25,"houseman":0.25,"housewif":0.25,"huddl":0.25,"humanis":0.25,"humanitarian":0.25,"humanlik":0.25,"humblebe":0.25,"humid":0.25,"humidifi":0.25,"hungri":0.25,"hyalin":0.25,"hyaloid":0.25,"hydrogen":0.25,"hydrophil":0.25,"hydrophyt":0.25,"hygienis":0.25,"hyoscyamin":0.25,"hypercapnia":0.25,"hypercarbia":0.25,"hypercrit":0.25,"hyperglycaemia":0.25,"hyperglycemia":0.25,"hypnagog":0.25,"hypnogog":0.25,"hypopnea":0.25,"hypothalam":0.25,"iceboat":0.25,"icebreak":0.25,"iconoscop":0.25,"icterogen":0.25,"imag":0.25,"immacul":0.25,"immemori":0.25,"immunofluoresc":0.25,"immunogen":0.25,"impenit":0.25,"imperm":0.25,"implant":0.25,"implic":0.25,"implor":0.25,"imposs":0.25,"impract":0.25,"improvis":0.25,"inamorata":0.25,"inamorato":0.25,"incas":0.25,"incest":0.25,"incit":-0.25,"incognito":0.25,"incomput":0.25,"inconclus":0.25,"inconsider":-0.25,"increas":0.25,"inculc":0.25,"incurv":0.25,"indaba":0.25,"indentur":0.25,"individualis":0.25,"indivis":0.25,"induc":0.25,"indur":0.25,"inerr":-0.25,"inestim":0.25,"infal":0.25,"infect":0.25,"inferenti":0.25,"infirmari":0.25,"infrar":0.25,"ingrain":0.25,"ingroup":0.25,"inherit":0.25,"inhibit":0.25,"inhibitor":0.25,"inion":0.25,"initi":0.25,"initiatori":0.25,"innoc":-0.25,"inoffens":0.25,"inordin":-0.25,"inquiri":0.25,"inquisitori":0.25,"insist":0.25,"instig":-0.25,"instil":0.25,"institut":0.25,"insular":0.25,"intelligentsia":0.25,"intemper":0.25,"intensifi":0.25,"intercalari":0.25,"intercept":-0.25,"interdepend":0.25,"interdisciplinari":0.25,"interested":0.25,"intermarriag":0.25,"intermin":0.25,"intern":0.25,"interrel":0.25,"interrogatori":0.25,"intersect":0.25,"introspect":0.25,"intrust":0.25,"intuit":0.25,"intuition":0.25,"inunct":0.25,"inund":0.25,"inventori":0.25,"inward":0.25,"iodis":0.25,"iodiz":0.25,"iodochlorhydroxyquin":0.25,"ionophoresi":0.25,"ionospher":0.25,"iron":0.25,"ironlik":0.25,"ironman":0.25,"ism":0.25,"isocycl":0.25,"isoniazid":0.25,"isoscel":0.25,"isosmot":0.25,"ital":0.25,"jabber":0.25,"jack":0.25,"jam":0.25,"jampan":0.25,"jawbon":0.25,"jibe":0.25,"jigger":0.25,"jive":0.25,"jollif":0.25,"journeyman":0.25,"justif":0.25,"justificatori":0.25,"juxtapos":0.25,"kaleidoscop":0.25,"karaok":0.25,"keratoplasti":0.25,"killabl":0.25,"kindli":0.25,"kindr":0.25,"klaxon":0.25,"knitwork":0.25,"knob":0.25,"knucklebon":0.25,"koinonia":0.25,"kotow":0.25,"kowtow":0.25,"label":0.25,"lacelik":0.25,"laci":0.25,"ladder":0.25,"laid":0.25,"laiti":0.25,"lalli":0.25,"lambent":0.25,"lampoon":0.25,"lancelik":0.25,"lanceol":0.25,"lanki":0.25,"later":0.25,"laugher":0.25,"lawcourt":0.25,"lazulin":0.25,"lbf":0.25,"lecher":0.25,"lectern":0.25,"leechlik":0.25,"leftism":0.25,"legato":0.25,"legerdemain":0.25,"leger":0.25,"leggi":0.25,"legisl":0.25,"lender":0.25,"leniti":0.25,"leresi":0.25,"lesbian":0.25,"liegeman":0.25,"lieu":0.25,"lifelong":0.25,"lifes":0.25,"lifework":0.25,"likelihood":0.25,"likeli":0.25,"limpid":0.25,"lindi":0.25,"lingual":0.25,"linguist":0.25,"linstock":0.25,"lionis":0.25,"lioniz":0.25,"lip":0.25,"liquefi":0.25,"liquesc":0.25,"liquifi":0.25,"list":0.25,"litot":0.25,"livestock":0.25,"llano":0.25,"local":0.25,"localis":0.25,"locat":0.25,"locomot":0.25,"longanim":0.25,"longitud":0.25,"longsight":0.25,"longstand":0.25,"longtim":0.25,"lossless":0.25,"lucent":0.25,"lucubr":0.25,"luge":0.25,"lulu":0.25,"lumin":0.25,"luminesc":0.25,"luminos":0.25,"lycanthropi":0.25,"lyophilis":0.25,"lyophil":0.25,"machmet":0.25,"macrobiot":0.25,"macron":0.25,"macroscop":-0.25,"madra":0.25,"maglev":0.25,"mahlstick":0.25,"maidenli":0.25,"mail":0.25,"majuscular":0.25,"majuscul":0.25,"makeshift":0.25,"maladapt":0.25,"malvasia":0.25,"mammalogist":0.25,"manacl":0.25,"manic":0.25,"manlik":0.25,"manli":0.25,"manus":0.25,"marbleis":0.25,"marbleiz":0.25,"marcel":0.25,"margin":-0.25,"maroon":-0.25,"marqu":0.25,"martinet":0.25,"masculin":0.25,"mass":0.25,"massag":0.25,"mastership":0.25,"mastoidal":0.25,"masturb":0.25,"matchboard":0.25,"mateless":0.25,"materi":0.25,"matine":0.25,"matrilin":0.25,"matrilinear":0.25,"mattock":0.25,"maulstick":0.25,"maverick":0.25,"meadowgrass":0.25,"meander":0.25,"meati":0.25,"meclofenam":0.25,"median":0.25,"meetinghous":0.25,"meliorist":0.25,"melodis":0.25,"meltabl":0.25,"melt":0.25,"memorabilia":0.25,"mend":-0.25,"mepacrin":0.25,"mercenari":0.25,"merchandis":0.25,"meringu":0.25,"merrymak":0.25,"mesophyron":0.25,"mesophyt":0.25,"metabol":0.25,"metacarpus":0.25,"metaknowledg":0.25,"metaphor":0.25,"metaphys":0.25,"metast":0.25,"methanogen":0.25,"methenamin":0.25,"methotrex":0.25,"metonym":0.25,"metonymi":0.25,"metopion":0.25,"metronom":0.25,"mew":0.25,"mexiletin":0.25,"mezuza":0.25,"mezuzah":0.25,"miasmal":0.25,"microphotomet":0.25,"middlemost":0.25,"midget":0.25,"midmost":0.25,"midsumm":0.25,"might":0.25,"mightili":0.25,"militaris":0.25,"militar":0.25,"milldam":0.25,"millennium":0.25,"mine":0.25,"miniatur":0.25,"minimum":-0.25,"miniscul":0.25,"miotic":0.25,"misalli":0.25,"misbehav":0.25,"misdemean":0.25,"misfeas":0.25,"mission":0.25,"missionari":0.25,"misti":0.25,"misunderstood":0.25,"mithramycin":0.25,"mnemon":0.25,"mob":0.25,"mod":-0.25,"moderat":0.25,"moderato":0.25,"modernist":0.25,"moisturis":0.25,"moistur":0.25,"molal":0.25,"mold":0.25,"monestr":0.25,"monitor":0.25,"monocl":0.25,"monoestr":0.25,"monogen":0.25,"monosyllab":0.25,"monoth":0.25,"monthlong":0.25,"moot":0.25,"morganat":0.25,"morganit":0.25,"morpholog":0.25,"mot":0.25,"motet":0.25,"motherli":0.25,"motori":0.25,"motorway":0.25,"mouser":0.25,"movi":0.25,"muggi":0.25,"multidimension":0.25,"multiethn":0.25,"multipli":0.25,"multipurpos":0.25,"multiraci":0.25,"multitudin":0.25,"mum":0.25,"mundan":0.25,"munific":0.25,"muscular":0.25,"muser":0.25,"musicianship":0.25,"mutafaci":0.25,"mutagen":0.25,"mutant":0.25,"mutual":-0.25,"mutualist":0.25,"mydriat":0.25,"myofibril":0.25,"myofibrilla":0.25,"myotic":0.25,"myriad":0.25,"myringa":0.25,"mystic":0.25,"mystiqu":0.25,"mythologist":0.25,"nailbrush":0.25,"naked":0.25,"naltrexon":0.25,"nankeen":0.25,"nap":-0.25,"naprapathi":0.25,"narcotis":0.25,"narcot":0.25,"narrow":0.25,"nascenc":0.25,"nasion":0.25,"nativ":0.25,"natter":0.25,"naturist":0.25,"navig":0.25,"nearbi":-0.25,"near":0.25,"nebuchadnezzar":0.25,"nee":0.25,"needlelik":0.25,"negat":-0.25,"negoti":0.25,"negroid":0.25,"neigh":0.25,"neo":0.25,"neoclassic":0.25,"neostigmin":0.25,"netlik":0.25,"neurobiolog":0.25,"neuroeth":0.25,"neurolept":0.25,"newfound":0.25,"newslett":0.25,"newssheet":0.25,"nib":0.25,"nicker":0.25,"nicknam":0.25,"nilpot":0.25,"ninon":0.25,"nip":0.25,"nitid":0.25,"nitrofurantoin":0.25,"noetic":0.25,"nombril":0.25,"nomia":0.25,"nomin":0.25,"nonappoint":0.25,"noncommiss":0.25,"noncompli":-0.25,"nonelect":0.25,"nonglutin":0.25,"nonimmun":0.25,"nonkosh":0.25,"nonmotil":0.25,"nonparasit":0.25,"nonpoison":0.25,"nonresin":0.25,"nonresini":0.25,"nonsegreg":0.25,"nonsymbiot":0.25,"nonviscid":0.25,"nonwork":0.25,"nosh":0.25,"nostalgia":0.25,"notifi":0.25,"novat":0.25,"nuke":-0.25,"numberless":0.25,"numbfish":0.25,"nurtur":0.25,"nutritionist":0.25,"nymphet":0.25,"obelion":0.25,"obiism":0.25,"oblat":0.25,"obstruct":0.25,"obtrus":0.25,"obviat":0.25,"occlus":0.25,"octosyllab":0.25,"oenolog":0.25,"officiales":0.25,"olden":0.25,"oldi":0.25,"olfact":0.25,"ommastreph":0.25,"omnipres":0.25,"omnirang":0.25,"omnisci":0.25,"ongo":0.25,"onomasticon":0.25,"onomatopoet":0.25,"onym":0.25,"onyxi":0.25,"opalesc":0.25,"opalin":0.25,"open":0.25,"openhanded":0.25,"ophryon":0.25,"opisthognath":0.25,"oppugn":0.25,"orat":0.25,"oratorio":0.25,"ordinari":0.25,"orgasm":0.25,"orinas":0.25,"ornament":0.25,"ornamentalist":0.25,"ornat":0.25,"orthostat":0.25,"oscil":0.25,"oscillatori":0.25,"osteolog":0.25,"osteologist":0.25,"osteopathi":0.25,"ostler":0.25,"outermost":0.25,"outgo":0.25,"out":-0.25,"outmost":0.25,"outrig":0.25,"outshout":0.25,"outsid":0.25,"outsiz":0.25,"outwork":0.25,"over":0.25,"overcrit":0.25,"overcross":0.25,"overdel":0.25,"overexposur":0.25,"overflow":0.25,"overgener":0.25,"overh":0.25,"oversex":0.25,"overs":0.25,"overstuf":0.25,"oversuppli":0.25,"overvalu":0.25,"overzeal":0.25,"oxyphenbutazon":0.25,"packabl":0.25,"paediatrician":0.25,"pagoda":0.25,"pal":0.25,"palaeoanthropolog":0.25,"palatopharyngoplasti":0.25,"paleoanthropolog":0.25,"palpabl":0.25,"palpebra":0.25,"pamper":-0.25,"panoram":0.25,"pantryman":0.25,"paradiddl":0.25,"paramagnet":0.25,"paramed":0.25,"parang":0.25,"parcel":0.25,"parent":0.25,"parimutuel":0.25,"paripinn":0.25,"parlanc":0.25,"parodi":0.25,"paronomasia":0.25,"paroxetim":0.25,"parrotlik":0.25,"parson":0.25,"pasquinad":0.25,"passado":0.25,"passbook":0.25,"pastor":0.25,"patholog":0.25,"patrilin":0.25,"patrilinear":0.25,"patrimoni":0.25,"patrol":0.25,"patronag":0.25,"patsi":0.25,"paunchi":0.25,"pave":0.25,"pawnbrok":0.25,"pawnshop":0.25,"paymast":0.25,"payola":0.25,"pearlesc":0.25,"peasanthood":0.25,"pedagog":0.25,"pedagogi":0.25,"pedant":0.25,"pedest":0.25,"pediatrician":0.25,"pediatrist":0.25,"pedicur":0.25,"peek":0.25,"pentasyllab":0.25,"pep":0.25,"perceptu":0.25,"perdur":0.25,"perfervid":0.25,"perfor":0.25,"periapsi":0.25,"perihelion":0.25,"periwig":0.25,"perpetr":-0.25,"personalis":0.25,"peruk":0.25,"pesantran":0.25,"pesantren":0.25,"petit":-0.25,"petitionari":0.25,"phaeton":0.25,"phalarop":0.25,"phantasm":0.25,"phantasma":0.25,"phantom":-0.25,"pharmaceut":0.25,"pharmacokinet":0.25,"pharmacolog":0.25,"phasianid":0.25,"phenomenolog":0.25,"philosoph":0.25,"philosophi":0.25,"phonat":0.25,"phonem":0.25,"phonic":0.25,"phonolog":0.25,"photochemistri":0.25,"photomet":0.25,"photometri":0.25,"photospher":0.25,"phraseolog":0.25,"physician":0.25,"pictograph":0.25,"pictur":0.25,"piecem":-0.25,"pierc":0.25,"piggish":0.25,"piggi":0.25,"pilgrimag":0.25,"pile":0.25,"pillow":0.25,"pinchbeck":-0.25,"piroxicam":0.25,"pitprop":0.25,"pizzicato":0.25,"place":0.25,"placent":0.25,"placer":0.25,"plagiaris":0.25,"plagiarist":0.25,"plagiar":0.25,"planaria":0.25,"planarian":0.25,"plane":0.25,"plangent":0.25,"plankton":0.25,"plan":0.25,"plash":0.25,"plat":0.25,"playth":0.25,"plead":0.25,"plebeian":0.25,"plinth":0.25,"ploce":0.25,"plushi":0.25,"pocketcomb":0.25,"podiatrist":0.25,"podlik":0.25,"poeciliid":0.25,"pogonion":0.25,"point":0.25,"pointed":0.25,"poltroon":-0.25,"polyestr":0.25,"polygen":0.25,"polyoestr":0.25,"polysyllab":0.25,"polysyndeton":0.25,"polyval":0.25,"popgun":0.25,"popov":0.25,"pop":0.25,"popul":0.25,"populist":0.25,"porker":0.25,"position":0.25,"postmodern":0.25,"postop":0.25,"potbelli":0.25,"pour":0.25,"powder":0.25,"preachment":0.25,"precat":0.25,"precatori":0.25,"precios":0.25,"precipit":0.25,"preclus":0.25,"precoci":0.25,"precognit":0.25,"predestin":0.25,"predict":-0.25,"prednisolon":0.25,"preemptiv":0.25,"prehensil":0.25,"prejudg":0.25,"preliminari":0.25,"premis":0.25,"premiss":0.25,"prenat":0.25,"prentic":0.25,"preoper":0.25,"prepot":0.25,"prescript":0.25,"prescriptiv":0.25,"pressur":0.25,"prevent":0.25,"prewar":0.25,"pride":0.25,"priesthood":0.25,"priest":0.25,"primaev":0.25,"primev":0.25,"primidon":0.25,"primordi":0.25,"primp":0.25,"privi":0.25,"probe":0.25,"probiot":0.25,"profession":0.25,"progressiv":0.25,"prolix":-0.25,"promulg":0.25,"pronat":0.25,"prongi":0.25,"properti":0.25,"proport":0.25,"propriocept":0.25,"prop":0.25,"prospect":0.25,"prostheon":0.25,"prosthion":0.25,"prosthodontist":0.25,"prostitut":0.25,"protagon":0.25,"protanopia":0.25,"protean":0.25,"protector":0.25,"protectorship":0.25,"proteg":0.25,"prothalamion":0.25,"prothalamium":0.25,"proto":0.25,"protogeometr":0.25,"protolog":0.25,"prototyp":0.25,"proverb":0.25,"provoc":0.25,"proxem":0.25,"pseudohermaphrodit":0.25,"psychoact":0.25,"psychotrop":0.25,"psyop":0.25,"pteridologist":0.25,"puff":0.25,"puf":0.25,"pufferi":0.25,"puissant":0.25,"pulley":0.25,"pulveris":0.25,"pulver":0.25,"pun":0.25,"pungent":0.25,"purchas":0.25,"purr":0.25,"purview":0.25,"pussycat":0.25,"putout":0.25,"pyrotechn":-0.25,"pyrotechni":0.25,"quadrat":0.25,"quaint":0.25,"qualit":0.25,"quark":0.25,"quarter":0.25,"quicken":0.25,"quiff":0.25,"quinacrin":0.25,"quinidin":0.25,"quintessenti":0.25,"quip":0.25,"quiz":0.25,"quotidian":0.25,"racecours":0.25,"racetrack":0.25,"racialist":0.25,"radianc":0.25,"radiat":0.25,"radioact":0.25,"radiochemistri":0.25,"radioluc":0.25,"raffl":0.25,"rafter":0.25,"ragtim":0.25,"raimentless":0.25,"rain":0.25,"rainless":0.25,"rang":0.25,"rant":0.25,"rapport":0.25,"rapproch":0.25,"rase":0.25,"rattlebrain":0.25,"rattlep":0.25,"rave":0.25,"raze":0.25,"reactionari":0.25,"readabl":0.25,"readmiss":0.25,"real":0.25,"realpolitik":0.25,"rebind":0.25,"reborn":0.25,"recept":0.25,"recession":0.25,"recip":0.25,"reclam":0.25,"reclus":0.25,"recompens":0.25,"rector":0.25,"rectorship":0.25,"recurr":0.25,"redol":0.25,"redux":0.25,"reedlik":0.25,"reedi":0.25,"refashion":0.25,"refect":0.25,"refinish":0.25,"reflectoris":0.25,"refractil":0.25,"refract":0.25,"reific":0.25,"reincarn":0.25,"reinstat":0.25,"relent":0.25,"religionist":0.25,"reliquari":0.25,"remak":0.25,"remuner":0.25,"rentier":0.25,"reopen":0.25,"repechag":0.25,"report":0.25,"repossess":0.25,"repp":0.25,"rescind":0.25,"resurrect":0.25,"retard":0.25,"rethink":0.25,"retinu":0.25,"retouch":0.25,"retread":0.25,"retrench":0.25,"retriev":0.25,"retroact":0.25,"revis":0.25,"revolution":0.25,"rewir":0.25,"rhinoplasti":0.25,"rhyme":0.25,"ribavirin":0.25,"rifampin":0.25,"righthand":0.25,"rightish":0.25,"rightism":0.25,"rime":0.25,"risen":0.25,"rite":0.25,"ritual":0.25,"ritualist":0.25,"rogat":0.25,"roleplay":0.25,"romanticis":0.25,"romantic":0.25,"romp":0.25,"rose":0.25,"roseat":0.25,"roug":0.25,"rounded":0.25,"roundsman":0.25,"routin":0.25,"rudiment":0.25,"ruli":0.25,"runti":0.25,"rural":0.25,"russet":0.25,"rust":0.25,"rustless":0.25,"sacred":0.25,"sacristan":0.25,"sainthood":0.25,"saintli":0.25,"salaci":0.25,"salesmanship":0.25,"salti":0.25,"salv":0.25,"sanctitud":0.25,"sanctiti":0.25,"sandboy":0.25,"sapid":0.25,"saponac":0.25,"sapphic":0.25,"sarcostyl":0.25,"satur":0.25,"scallop":0.25,"scant":0.25,"scatti":0.25,"scepter":0.25,"sceptr":0.25,"schmoos":0.25,"schmooz":0.25,"schmoozer":0.25,"schoolwork":0.25,"scientif":0.25,"scientist":0.25,"scolion":0.25,"scoreboard":0.25,"scorekeep":0.25,"scotch":-0.25,"screaki":0.25,"script":0.25,"scriptur":0.25,"scrumptious":0.25,"sculpt":0.25,"scurri":0.25,"sec":0.25,"secular":0.25,"segreg":0.25,"selfless":0.25,"selfsam":0.25,"sell":0.25,"semicircular":0.25,"semicomatos":0.25,"semiconsci":0.25,"semiempir":0.25,"semiform":0.25,"semin":0.25,"semioffici":0.25,"semiparasit":0.25,"semiskil":0.25,"semisoft":0.25,"semitranspar":0.25,"sendup":0.25,"sensibilis":0.25,"sensibil":0.25,"sensifi":0.25,"sensitis":0.25,"sensit":-0.25,"sensori":0.25,"sententi":0.25,"sentient":0.25,"sentimentalis":0.25,"sentiment":0.25,"sequenti":0.25,"seriocomedi":0.25,"serpentin":0.25,"serrat":0.25,"sertralin":0.25,"servo":0.25,"servomechan":0.25,"servosystem":0.25,"sew":0.25,"sewn":0.25,"sexist":0.25,"sexploit":0.25,"sexton":0.25,"sexualis":0.25,"shadow":0.25,"shahadah":0.25,"sheen":0.25,"shielder":0.25,"shirtdress":0.25,"shirtwaist":0.25,"shitlist":0.25,"shmoos":0.25,"shmooz":0.25,"shovelhead":0.25,"shun":0.25,"shutter":0.25,"sidekick":0.25,"signatori":0.25,"signboard":0.25,"silvicultur":0.25,"simultan":0.25,"sinistr":0.25,"sinistrors":0.25,"sinuous":0.25,"sinusoid":0.25,"sirdar":0.25,"sitcom":0.25,"situat":0.25,"skedaddl":0.25,"skeg":0.25,"skew":0.25,"skyward":0.25,"slant":-0.25,"slapdash":0.25,"slapper":0.25,"slavehold":0.25,"slavish":0.25,"sleepless":0.25,"sleepov":0.25,"sleev":0.25,"sleight":0.25,"slim":0.25,"slippi":0.25,"slipshod":0.25,"slitheri":0.25,"slope":-0.25,"small":0.25,"smallish":0.25,"smitten":0.25,"smoothen":0.25,"snakelik":0.25,"snaki":0.25,"snaplin":0.25,"sober":0.25,"socialit":0.25,"sociobiolog":0.25,"sociolinguist":0.25,"sociolog":0.25,"sod":0.25,"soften":0.25,"softish":0.25,"solubl":0.25,"solvent":0.25,"somatogenet":0.25,"somatogen":0.25,"some":0.25,"somebodi":0.25,"someon":0.25,"somewhat":0.25,"somnifer":0.25,"somnif":0.25,"songbird":0.25,"songlik":0.25,"sonnet":0.25,"sonor":0.25,"sorbat":0.25,"sorb":0.25,"sorbefaci":0.25,"sorrel":0.25,"soundman":0.25,"southern":0.25,"sovereign":0.25,"spacecraft":0.25,"spaceship":0.25,"spacial":0.25,"spatial":0.25,"spatter":0.25,"spatul":0.25,"spearpoint":0.25,"specialist":0.25,"speckless":0.25,"spectacl":-0.25,"spectacular":0.25,"spectrophotomet":0.25,"speedili":0.25,"speedup":0.25,"spheric":0.25,"spic":0.25,"spick":0.25,"spiff":0.25,"spinnbar":0.25,"spirited":0.25,"spiritis":0.25,"splatter":0.25,"splint":0.25,"spondais":0.25,"spongelik":0.25,"spongi":0.25,"sponsorship":0.25,"spoof":0.25,"spotless":0.25,"spotweld":0.25,"spread":0.25,"sprechgesang":0.25,"sprechstimm":0.25,"sprightli":0.25,"squama":0.25,"squarish":0.25,"squeaker":0.25,"squilla":0.25,"stableboy":0.25,"staff":0.25,"stainabl":0.25,"stair":0.25,"stall":0.25,"stammel":0.25,"stanchion":0.25,"stape":0.25,"staret":0.25,"stargaz":0.25,"starship":0.25,"stash":0.25,"statant":0.25,"statist":0.25,"stativ":0.25,"statuari":0.25,"statur":0.25,"stead":0.25,"stellar":0.25,"stenos":0.25,"stenot":0.25,"stent":0.25,"stentorian":0.25,"stephanion":0.25,"stepp":0.25,"stepwis":0.25,"sternpost":0.25,"stigmat":-0.25,"stigmatist":0.25,"stillbirth":0.25,"stilli":0.25,"stilt":0.25,"stimulus":0.25,"stint":0.25,"stipulatori":0.25,"stirrup":0.25,"stitch":0.25,"stocker":0.25,"stocktak":0.25,"stomatopod":0.25,"stone":-0.25,"stopgap":0.25,"stouthearted":0.25,"straightaway":-0.25,"strand":0.25,"strapado":0.25,"strappado":0.25,"stripe":0.25,"stripl":0.25,"stripi":0.25,"stroll":0.25,"studi":0.25,"stunted":0.25,"stylemark":0.25,"stylis":0.25,"styliz":0.25,"styptic":0.25,"suasibl":0.25,"subcontin":0.25,"subcultur":0.25,"subduabl":0.25,"subscrib":0.25,"subsidiari":0.25,"subterranean":0.25,"subterran":0.25,"subvent":0.25,"succeed":0.25,"suffrag":0.25,"sugarcoat":0.25,"sugar":0.25,"sulfa":0.25,"sulfisoxazol":0.25,"sulfonamid":0.25,"sulpha":0.25,"sultri":0.25,"summat":0.25,"sumpsimus":0.25,"sumptuari":0.25,"sunup":0.25,"superbl":0.25,"supercrit":0.25,"supergi":0.25,"superhuman":0.25,"superincumb":0.25,"supervisori":0.25,"supplement":0.25,"supplementari":0.25,"supplier":0.25,"suppress":0.25,"supra":0.25,"supraocular":0.25,"supraorbit":0.25,"supremac":0.25,"supremaci":0.25,"supremo":0.25,"surrebutt":0.25,"surrejoind":0.25,"surreptiti":0.25,"surround":0.25,"sustent":0.25,"swagger":-0.25,"swami":0.25,"swap":0.25,"swash":0.25,"swatch":0.25,"sweeten":0.25,"sweetmeat":0.25,"swelter":-0.25,"sweltri":0.25,"swept":0.25,"sweptw":0.25,"swishi":0.25,"switchblad":0.25,"swoosh":-0.25,"swop":0.25,"swordplay":0.25,"swosh":0.25,"symbiot":0.25,"sympathet":0.25,"symphonis":0.25,"symphys":0.25,"synchron":0.25,"synchronis":0.25,"synchroni":0.25,"synclin":0.25,"synergist":0.25,"syntact":0.25,"synthet":0.25,"tabasco":0.25,"tacheomet":0.25,"tachymet":0.25,"taciturn":-0.25,"tactic":-0.25,"tag":0.25,"tailstock":0.25,"talk":0.25,"tallish":0.25,"tan":0.25,"tangerin":0.25,"tangibl":0.25,"tantra":0.25,"taper":0.25,"tasti":0.25,"tattl":0.25,"taup":0.25,"tawni":-0.25,"tax":0.25,"taxabl":-0.25,"taxonom":0.25,"teahous":0.25,"teal":0.25,"teamwork":0.25,"tearoom":0.25,"teari":0.25,"teashop":0.25,"technologist":0.25,"tedious":0.25,"teen":0.25,"teenag":0.25,"teensi":0.25,"teentsi":0.25,"teeni":0.25,"teeth":0.25,"telco":0.25,"teleport":0.25,"telethermomet":0.25,"temperament":0.25,"templat":0.25,"templet":0.25,"temporali":0.25,"tenaci":0.25,"tend":0.25,"tenni":0.25,"tenon":0.25,"terazosin":0.25,"terefah":0.25,"terrass":0.25,"terrif":0.25,"territori":0.25,"testifi":0.25,"tetartanopia":0.25,"theatric":-0.25,"theosoph":0.25,"theosophi":0.25,"therewith":0.25,"thermoacidophil":0.25,"thermoplast":0.25,"thick":0.25,"thinkabl":0.25,"thrill":0.25,"throb":0.25,"throttlehold":0.25,"throughway":0.25,"thruway":0.25,"thunderstruck":0.25,"ticktock":0.25,"tictac":0.25,"tidi":-0.25,"tide":0.25,"tie":0.25,"tini":0.25,"tiresom":0.25,"titer":0.25,"titiv":0.25,"titrat":0.25,"titr":0.25,"tittiv":0.25,"toboggan":0.25,"tocktact":0.25,"tocopherol":0.25,"tocsin":0.25,"tolazamid":0.25,"tonal":0.25,"tonsur":0.25,"toothi":0.25,"tootl":0.25,"topographi":0.25,"totem":0.25,"totipot":0.25,"touchston":0.25,"toupe":0.25,"tour":0.25,"tourism":0.25,"touristri":0.25,"towboat":0.25,"toy":0.25,"trademark":0.25,"tradeoff":0.25,"tragicomedi":0.25,"transect":0.25,"transitivis":0.25,"transitiv":0.25,"transluc":0.25,"transmit":0.25,"transmundan":0.25,"transplacent":0.25,"transvest":0.25,"transvestit":0.25,"tray":0.25,"tref":0.25,"treillag":0.25,"trelli":0.25,"trenchanc":0.25,"trendset":0.25,"trespass":0.25,"trestl":0.25,"triag":0.25,"trichion":0.25,"trichlormethiazid":0.25,"trichodesmium":0.25,"trident":0.25,"trifid":0.25,"trig":0.25,"trilobit":0.25,"tripod":0.25,"tritanopia":0.25,"trochlear":0.25,"trochleari":0.25,"trogon":0.25,"troth":0.25,"trouser":0.25,"truck":0.25,"truism":0.25,"truncat":0.25,"truste":0.25,"truster":0.25,"tuck":0.25,"tugboat":0.25,"tundra":0.25,"turnverein":0.25,"tusker":0.25,"tweak":0.25,"twiggi":0.25,"twiglik":0.25,"twinkler":0.25,"twin":-0.25,"twist":0.25,"twisti":0.25,"twofold":0.25,"ubiquit":0.25,"ultim":0.25,"ultraconserv":0.25,"ultrasound":0.25,"ultraviolet":0.25,"umbra":0.25,"unab":0.25,"unabus":0.25,"unadorn":0.25,"unadulter":0.25,"unaffected":0.25,"unalt":0.25,"unannounc":0.25,"unasham":0.25,"unbeliev":0.25,"unbloodi":0.25,"unbound":0.25,"unbreak":0.25,"unburden":0.25,"unchain":0.25,"uncial":0.25,"unclog":0.25,"uncommon":0.25,"uncompassion":0.25,"uncomplain":0.25,"uncontrol":0.25,"uncount":0.25,"uncousin":0.25,"uncreas":0.25,"uncurv":0.25,"undaunt":0.25,"undec":0.25,"undecor":0.25,"undefil":0.25,"understructur":0.25,"underweight":0.25,"undisput":-0.25,"undress":0.25,"unexceed":0.25,"unexcel":0.25,"unexplod":0.25,"unfathom":0.25,"unheed":0.25,"unherald":0.25,"unhitch":0.25,"unicuspid":0.25,"unkept":0.25,"unkey":0.25,"unleaven":0.25,"unloos":0.25,"unloosen":0.25,"unman":-0.25,"unmanlik":0.25,"unmemor":0.25,"unmention":0.25,"unmodul":0.25,"unnam":0.25,"unnumber":0.25,"unnumb":0.25,"unnumer":0.25,"unplumb":0.25,"unpredict":0.25,"unpretenti":0.25,"unprophet":0.25,"unquest":-0.25,"unrais":0.25,"unreconstruct":0.25,"unreleas":0.25,"unremark":0.25,"unrepent":0.25,"unres":0.25,"unresist":0.25,"unrhetor":0.25,"unsegreg":0.25,"unsex":0.25,"unshield":0.25,"unsmooth":-0.25,"unspel":0.25,"unsteadili":0.25,"unstint":0.25,"unsurpass":0.25,"unwav":0.25,"unweath":0.25,"upbring":0.25,"updraft":0.25,"upfield":0.25,"uphil":0.25,"uppercas":0.25,"upstag":0.25,"upstrok":0.25,"uptown":0.25,"utensil":0.25,"utmost":0.25,"utopian":0.25,"utricl":0.25,"utriculus":0.25,"uttermost":0.25,"uvulopalatopharyngoplasti":0.25,"vacil":-0.25,"vacuum":0.25,"vagil":0.25,"vals":0.25,"vaporif":0.25,"vaporish":0.25,"vaporiz":0.25,"vapourif":0.25,"vapouris":0.25,"vapourish":0.25,"variform":0.25,"vasovasostomi":0.25,"vassal":0.25,"vaticin":0.25,"veld":0.25,"veldt":0.25,"velvet":0.25,"venial":0.25,"verbatim":0.25,"verbos":0.25,"verili":0.25,"vesper":0.25,"vie":0.25,"visag":0.25,"viscous":0.25,"viselik":0.25,"visionari":0.25,"vitalist":0.25,"vitreous":0.25,"vivarium":0.25,"vocalis":0.25,"vocat":0.25,"voidabl":0.25,"voil":0.25,"volant":0.25,"volatilis":0.25,"volatiliz":0.25,"voluminos":0.25,"vower":0.25,"vox":0.25,"voyeur":0.25,"vroom":0.25,"vulcanis":0.25,"vulcan":0.25,"vulturin":0.25,"vultur":0.25,"wage":0.25,"wain":0.25,"wane":0.25,"warden":0.25,"warrant":0.25,"warrantor":0.25,"watch":0.25,"watercraft":0.25,"watercress":0.25,"wax":-0.25,"wayward":0.25,"weald":0.25,"weapon":0.25,"weatherglass":0.25,"weatherstrip":0.25,"webbi":0.25,"weblik":0.25,"weeklong":0.25,"weensi":0.25,"weeni":0.25,"weigh":0.25,"weller":0.25,"whicker":0.25,"whimsic":0.25,"whinni":0.25,"whiskerless":0.25,"wholeheart":0.25,"whopper":0.25,"whoredom":0.25,"wifelik":0.25,"wife":0.25,"wilt":0.25,"wincey":0.25,"windfal":0.25,"wind":0.25,"windless":0.25,"windup":0.25,"winglik":0.25,"wisecrack":0.25,"wish":0.25,"wisplik":0.25,"wizardri":0.25,"wold":0.25,"womanish":0.25,"womanlik":0.25,"womanli":0.25,"woodcraft":0.25,"woolgath":-0.25,"woosh":0.25,"word":0.25,"wordplay":0.25,"wordi":-0.25,"workaday":0.25,"workspac":0.25,"worldwid":0.25,"woven":0.25,"wrink":0.25,"wrought":0.25,"wri":0.25,"xerographi":0.25,"yacht":-0.25,"yagi":0.25,"yearlong":0.25,"yeti":0.25,"yummi":0.25,"zero":0.25,"zooid":0.25,"zoomorph":0.25,"zygodactyl":0.25,"abaya":-0.25,"aberr":-0.25,"abey":-0.25,"abject":-0.25,"abrog":-0.25,"abseil":-0.25,"absent":-0.25,"absolutist":-0.25,"absurd":-0.25,"abysm":-0.25,"acanthot":-0.25,"acapnia":-0.25,"acarophobia":-0.25,"acathexia":-0.25,"acaud":-0.25,"acetaminophen":-0.25,"achlorhydria":-0.25,"achlorhydr":-0.25,"achondrit":-0.25,"achondroplast":-0.25,"acousma":-0.25,"acroanaesthesia":-0.25,"acroanesthesia":-0.25,"acrophobia":-0.25,"acrophob":-0.25,"acrylamid":-0.25,"act":-0.25,"actinomycet":-0.25,"actinomycot":-0.25,"activewear":-0.25,"adagio":-0.25,"addlebrain":-0.25,"addlep":-0.25,"adjudg":-0.25,"adscititi":-0.25,"advowson":-0.25,"adynam":-0.25,"aesthesi":-0.25,"afeard":-0.25,"afear":-0.25,"affected":-0.25,"affenpinsch":-0.25,"affer":-0.25,"affront":-0.25,"agenesia":-0.25,"agenesi":-0.25,"agitprop":-0.25,"agonad":-0.25,"agonist":-0.25,"agoraphobia":-0.25,"agoraphob":-0.25,"agranulocytosi":-0.25,"agranulosi":-0.25,"agraph":-0.25,"agrest":-0.25,"agromania":-0.25,"aigret":-0.25,"aigrett":-0.25,"ailurophobia":-0.25,"airstrip":-0.25,"alalia":-0.25,"alb":-0.25,"albin":-0.25,"algolagn":-0.25,"algometri":-0.25,"allegoris":-0.25,"allegor":-0.25,"allig":-0.25,"alloy":-0.25,"alm":-0.25,"alopecia":-0.25,"alphabetis":-0.25,"alphabet":-0.25,"amastia":-0.25,"amaurosi":-0.25,"amaurot":-0.25,"ambagi":-0.25,"amenorrh":-0.25,"amenorrho":-0.25,"aminobenzin":-0.25,"amiodaron":-0.25,"ammonit":-0.25,"ammunit":-0.25,"amnesia":-0.25,"amnest":-0.25,"amygdalin":-0.25,"anaphrodisia":-0.25,"anaplasia":-0.25,"anaplasmosi":-0.25,"anaplast":-0.25,"anarthria":-0.25,"androphobia":-0.25,"anecho":-0.25,"angina":-0.25,"angiohemophilia":-0.25,"angiopathi":-0.25,"angioplasti":-0.25,"anglophob":-0.25,"anhidrosi":-0.25,"anhydrosi":-0.25,"anil":-0.25,"anilin":-0.25,"anion":-0.25,"ankylot":-0.25,"annex":-0.25,"annul":-0.25,"anomal":-0.25,"anonym":-0.25,"anopia":-0.25,"anorexia":-0.25,"anovul":-0.25,"anoxemia":-0.25,"anoxia":-0.25,"anox":-0.25,"antenn":-0.25,"antennari":-0.25,"antiarrhythm":-0.25,"antidiarrh":-0.25,"antiestablishmentarian":-0.25,"antiestablishment":-0.25,"antifeminist":-0.25,"antimacassar":-0.25,"antipersonnel":-0.25,"antipop":-0.25,"antiprotozo":-0.25,"antipyret":-0.25,"antisatellit":-0.25,"antisemit":-0.25,"antiserum":-0.25,"antisoci":-0.25,"antisubmarin":-0.25,"anuresi":-0.25,"anuria":-0.25,"aoudad":-0.25,"aplasia":-0.25,"apogamet":-0.25,"apogam":-0.25,"apologis":-0.25,"apolog":-0.25,"apoptosi":-0.25,"apost":-0.25,"apostatis":-0.25,"apostat":-0.25,"apotropa":-0.25,"appetit":-0.25,"applejack":-0.25,"aquaphob":-0.25,"arachnophobia":-0.25,"araroba":-0.25,"arginin":-0.25,"argonaut":-0.25,"argu":-0.25,"arianist":-0.25,"arid":-0.25,"armillari":-0.25,"aromatis":-0.25,"aromat":-0.25,"arson":-0.25,"arthriti":-0.25,"arthroscopi":-0.25,"artiodactyl":-0.25,"arui":-0.25,"asafetida":-0.25,"asafoetida":-0.25,"ascit":-0.25,"asexu":-0.25,"asleep":-0.25,"assuas":-0.25,"astasia":-0.25,"asthen":-0.25,"asthma":-0.25,"asthmat":-0.25,"asyndet":-0.25,"asynerg":-0.25,"ataraxi":-0.25,"atelectasi":-0.25,"atopognosia":-0.25,"atopognosi":-0.25,"attemp":-0.25,"attempt":-0.25,"audad":-0.25,"autism":-0.25,"autotomi":-0.25,"avaritia":-0.25,"aveng":-0.25,"avitaminosi":-0.25,"awhil":-0.25,"azot":-0.25,"babel":-0.25,"babiroussa":-0.25,"babirusa":-0.25,"babirussa":-0.25,"babushka":-0.25,"babi":-0.25,"backbench":-0.25,"backbit":-0.25,"backfield":-0.25,"backplat":-0.25,"backslap":-0.25,"backtalk":-0.25,"baddi":-0.25,"badger":-0.25,"badmouth":-0.25,"bagel":-0.25,"baggi":-0.25,"bailiff":-0.25,"bailiffship":-0.25,"bake":-0.25,"balki":-0.25,"ballist":-0.25,"ballyrag":-0.25,"bam":-0.25,"banal":-0.25,"banknot":-0.25,"barbarian":-0.25,"barbet":-0.25,"bareback":-0.25,"barefoot":-0.25,"baronetis":-0.25,"baronet":-0.25,"barrat":-0.25,"barrelhous":-0.25,"barren":-0.25,"barricado":-0.25,"basalt":-0.25,"baseborn":-0.25,"baseless":-0.25,"bate":-0.25,"batfowl":-0.25,"bathrob":-0.25,"bat":-0.25,"battlefield":-0.25,"battlefront":-0.25,"battleground":-0.25,"battlesight":-0.25,"battu":-0.25,"batti":-0.25,"bawl":-0.25,"beachwear":-0.25,"beani":-0.25,"bearabl":-0.25,"beat":-0.25,"becloud":-0.25,"bedaub":-0.25,"bedeck":-0.25,"bedight":-0.25,"bedim":-0.25,"bedizen":-0.25,"bedlamit":-0.25,"befool":-0.25,"behaviorist":-0.25,"behaviourist":-0.25,"beigel":-0.25,"beldam":-0.25,"beleagu":-0.25,"bellicos":-0.25,"bemock":-0.25,"bend":-0.25,"benight":-0.25,"benjamin":-0.25,"benzoin":-0.25,"beryllium":-0.25,"bide":-0.25,"bighead":-0.25,"bigot":-0.25,"bijou":-0.25,"billingsg":-0.25,"bioterror":-0.25,"biotit":-0.25,"bipinnatifid":-0.25,"birdfeed":-0.25,"birthmark":-0.25,"bite":-0.25,"blackamoor":-0.25,"blackdamp":-0.25,"blacken":-0.25,"blackfac":-0.25,"blackish":-0.25,"blackwat":-0.25,"blanc":-0.25,"blanch":-0.25,"blear":-0.25,"blight":-0.25,"bling":-0.25,"blizzard":-0.25,"blob":-0.25,"blood":-0.25,"bloodbath":-0.25,"bloodlust":-0.25,"blous":-0.25,"blub":-0.25,"bluetongu":-0.25,"blunt":-0.25,"blurt":-0.25,"blusteri":-0.25,"boarhound":-0.25,"bobtail":-0.25,"bogeyman":-0.25,"boilersuit":-0.25,"boister":-0.25,"bold":-0.25,"bollworm":-0.25,"boneshak":-0.25,"bonker":-0.25,"boogeyman":-0.25,"bootboy":-0.25,"boot":-0.25,"bootleg":-0.25,"bootlegg":-0.25,"bootless":-0.25,"boring":-0.25,"borrelia":-0.25,"botcher":-0.25,"botul":-0.25,"boucl":-0.25,"boutonnier":-0.25,"brachial":-0.25,"bradycardia":-0.25,"brainsick":-0.25,"brakeman":-0.25,"brand":-0.25,"brant":-0.25,"bravado":-0.25,"brave":-0.25,"breakax":-0.25,"break":-0.25,"brent":-0.25,"briarroot":-0.25,"briber":-0.25,"brickbat":-0.25,"bridgehead":-0.25,"bridl":-0.25,"brinkmanship":-0.25,"bronz":-0.25,"browbeat":-0.25,"brown":-0.25,"bruxism":-0.25,"bubon":-0.25,"budgereegah":-0.25,"budgerigar":-0.25,"budgerygah":-0.25,"budgi":-0.25,"bugaboo":-0.25,"bulbar":-0.25,"bulimarexia":-0.25,"bulim":-0.25,"bullyrag":-0.25,"bulwark":-0.25,"bum":-0.25,"bumbler":-0.25,"bummer":-0.25,"bump":-0.25,"bunco":-0.25,"buncomb":-0.25,"bunghol":-0.25,"bungler":-0.25,"bunko":-0.25,"bunkum":-0.25,"burbl":-0.25,"burglar":-0.25,"burka":-0.25,"burqa":-0.25,"busbi":-0.25,"bustier":-0.25,"butcher":-0.25,"butyr":-0.25,"byrni":-0.25,"bystand":-0.25,"cabala":-0.25,"cabbala":-0.25,"cabbalah":-0.25,"cachect":-0.25,"cad":-0.25,"cadav":-0.25,"cadaver":-0.25,"cadger":-0.25,"caffein":-0.25,"caftan":-0.25,"caimitillo":-0.25,"calamit":-0.25,"calam":-0.25,"caldera":-0.25,"callos":-0.25,"calpac":-0.25,"calpack":-0.25,"camelpox":-0.25,"camis":-0.25,"camisol":-0.25,"campylotrop":-0.25,"cancer":-0.25,"canthus":-0.25,"carbuncular":-0.25,"carcas":-0.25,"carcass":-0.25,"carcinoid":-0.25,"cardcastl":-0.25,"cardhous":-0.25,"careen":-0.25,"careworn":-0.25,"carjack":-0.25,"cark":-0.25,"carper":-0.25,"carp":-0.25,"cartilagin":-0.25,"cassock":-0.25,"catabiosi":-0.25,"catnap":-0.25,"cattish":-0.25,"causeless":-0.25,"caustic":-0.25,"cefotaxim":-0.25,"ceftriaxon":-0.25,"cellul":-0.25,"cephalexin":-0.25,"cerus":-0.25,"chafewe":-0.25,"chaffwe":-0.25,"chancr":-0.25,"chancrous":-0.25,"chaparr":-0.25,"charlatan":-0.25,"chartless":-0.25,"chasubl":-0.25,"chawbacon":-0.25,"cheekili":-0.25,"cheep":-0.25,"cheesi":-0.25,"chequ":-0.25,"chessman":-0.25,"chicken":-0.25,"chickenfight":-0.25,"chickenheart":-0.25,"chickenpox":-0.25,"chickenshit":-0.25,"chigetai":-0.25,"chignon":-0.25,"chipboard":-0.25,"chiralgia":-0.25,"chokedamp":-0.25,"chomp":-0.25,"chous":-0.25,"chromaesthesia":-0.25,"chromat":-0.25,"chromatograph":-0.25,"chromesthesia":-0.25,"chromium":-0.25,"chrysarobin":-0.25,"chuck":-0.25,"chuf":-0.25,"chug":-0.25,"churidar":-0.25,"cinerarium":-0.25,"cinerari":-0.25,"cingulum":-0.25,"circul":-0.25,"circumlocuti":-0.25,"circumlocutori":-0.25,"circumvent":-0.25,"cirrhosi":-0.25,"clamour":-0.25,"claret":-0.25,"claustrophobia":-0.25,"claw":-0.25,"clinodactyli":-0.25,"cloth":-0.25,"clout":-0.25,"club":-0.25,"coaxer":-0.25,"cobalt":-0.25,"coccidioidomycosi":-0.25,"coccidiomycosi":-0.25,"cocker":-0.25,"cocoon":-0.25,"coddler":-0.25,"codifi":-0.25,"coenzym":-0.25,"colic":-0.25,"collywobbl":-0.25,"colonis":-0.25,"colonist":-0.25,"colon":-0.25,"comminatori":-0.25,"competitor":-0.25,"compromis":-0.25,"comput":-0.25,"conceit":-0.25,"conceptus":-0.25,"condescens":-0.25,"conessi":-0.25,"conflagr":-0.25,"conflict":-0.25,"conservationist":-0.25,"constip":-0.25,"consumpt":-0.25,"contend":-0.25,"contenti":-0.25,"continu":-0.25,"contraband":-0.25,"contradict":-0.25,"contrarian":-0.25,"contrari":-0.25,"controvert":-0.25,"contumaci":-0.25,"contumeli":-0.25,"convolut":-0.25,"cooli":-0.25,"coon":-0.25,"cooti":-0.25,"cop":-0.25,"coppic":-0.25,"coprolith":-0.25,"cops":-0.25,"cordless":-0.25,"corner":-0.25,"corps":-0.25,"corpul":-0.25,"corrod":-0.25,"corundom":-0.25,"corundum":-0.25,"cosset":-0.25,"cost":-0.25,"costless":-0.25,"cough":-0.25,"counterchalleng":-0.25,"counterglow":-0.25,"counterintellig":-0.25,"counteroffens":-0.25,"counterproduct":-0.25,"cowardic":-0.25,"cowardli":-0.25,"coward":-0.25,"cowpi":-0.25,"cowpox":-0.25,"cozenag":-0.25,"crackdown":-0.25,"cracker":-0.25,"crackpot":-0.25,"crag":-0.25,"craggi":-0.25,"cranki":-0.25,"crapshoot":-0.25,"crapul":-0.25,"crassitud":-0.25,"crawlspac":-0.25,"criminolog":-0.25,"crimson":-0.25,"crossli":-0.25,"crownless":-0.25,"crownwork":-0.25,"crucial":-0.25,"crummi":-0.25,"cryobiolog":-0.25,"cryogeni":-0.25,"cryopathi":-0.25,"cryophobia":-0.25,"cryptogram":-0.25,"cuckoopint":-0.25,"cudgel":-0.25,"cue":-0.25,"cuiss":-0.25,"curiosa":-0.25,"curst":-0.25,"curtainless":-0.25,"curt":-0.25,"cutthroat":-0.25,"cybercrim":-0.25,"cynophobia":-0.25,"cystoparalysi":-0.25,"cystoplegia":-0.25,"cytopenia":-0.25,"daemon":-0.25,"daft":-0.25,"damnabl":-0.25,"damp":-0.25,"damson":-0.25,"darkey":-0.25,"darki":-0.25,"dauber":-0.25,"deaden":-0.25,"deadey":-0.25,"deadli":-0.25,"deadlock":-0.25,"deafen":-0.25,"deathless":-0.25,"deathlik":-0.25,"debauche":-0.25,"debrid":-0.25,"decalesc":-0.25,"decomposit":-0.25,"deconsecr":-0.25,"dedifferenti":-0.25,"deerstalk":-0.25,"defalc":-0.25,"defeatist":-0.25,"defervesc":-0.25,"defiant":-0.25,"defil":-0.25,"deform":-0.25,"defraud":-0.25,"deiti":-0.25,"delv":-0.25,"demerit":-0.25,"demimond":-0.25,"demoniac":-0.25,"demyelin":-0.25,"denatur":-0.25,"dendrit":-0.25,"denounc":-0.25,"denunci":-0.25,"denunciatori":-0.25,"deodor":-0.25,"deodour":-0.25,"deploy":-0.25,"derat":-0.25,"derbi":-0.25,"dermatomycosi":-0.25,"dermatomyos":-0.25,"dermatophytosi":-0.25,"desideratum":-0.25,"desist":-0.25,"desk":-0.25,"despoli":-0.25,"deter":-0.25,"deterior":-0.25,"detumesc":-0.25,"devilwood":-0.25,"dhoti":-0.25,"diabol":-0.25,"diabolist":-0.25,"diacetylmorphin":-0.25,"diagnost":-0.25,"diarrhea":-0.25,"diarrhoea":-0.25,"dibber":-0.25,"dibbl":-0.25,"dictyopteran":-0.25,"diffract":-0.25,"dig":-0.25,"digress":-0.25,"diltiazem":-0.25,"diluent":-0.25,"dilut":-0.25,"din":-0.25,"dingo":-0.25,"dioxin":-0.25,"dipsomania":-0.25,"disaccord":-0.25,"disaffect":-0.25,"disarrang":-0.25,"disastr":-0.25,"disbar":-0.25,"discept":-0.25,"discombobul":-0.25,"discomfort":-0.25,"discompos":-0.25,"dishevel":-0.25,"dissatisfactori":-0.25,"dissev":-0.25,"distraught":-0.25,"divers":-0.25,"diverticul":-0.25,"divestitur":-0.25,"dizzili":-0.25,"dogban":-0.25,"domineering":-0.25,"dongl":-0.25,"donkey":-0.25,"donkeywork":-0.25,"doodad":-0.25,"doohickey":-0.25,"doojigg":-0.25,"dopey":-0.25,"dopi":-0.25,"dosshous":-0.25,"doublet":-0.25,"doughi":-0.25,"downdraft":-0.25,"downgrad":-0.25,"downhil":-0.25,"downi":-0.25,"downward":-0.25,"doze":-0.25,"drake":-0.25,"dray":-0.25,"drey":-0.25,"drib":-0.25,"driblet":-0.25,"drivel":-0.25,"dronabinol":-0.25,"drool":-0.25,"droopi":-0.25,"drop":-0.25,"dross":-0.25,"drudgeri":-0.25,"drumhead":-0.25,"drumstick":-0.25,"drunkard":-0.25,"dud":-0.25,"duffer":-0.25,"dulli":-0.25,"dumbass":-0.25,"dumdum":-0.25,"dumpi":-0.25,"dumpsit":-0.25,"dunc":-0.25,"dunderhead":-0.25,"dung":-0.25,"dungeon":-0.25,"dwarfism":-0.25,"dynamit":-0.25,"dysenteri":-0.25,"dyslex":-0.25,"dysosmia":-0.25,"dyspepsia":-0.25,"dysphem":-0.25,"dysplasia":-0.25,"dyspnea":-0.25,"dyspneal":-0.25,"dyspneic":-0.25,"dyspnoea":-0.25,"dyspnoeal":-0.25,"dyspnoeic":-0.25,"dysthymia":-0.25,"dystrophi":-0.25,"dziggetai":-0.25,"ear":-0.25,"earless":-0.25,"earliest":-0.25,"earli":-0.25,"earsplit":-0.25,"earthenwar":-0.25,"eavesdrop":-0.25,"ebonis":-0.25,"ebonit":-0.25,"ebon":-0.25,"eburn":-0.25,"ectrodactyli":-0.25,"effluent":-0.25,"effort":-0.25,"egalit":-0.25,"egal":-0.25,"egomania":-0.25,"eldest":-0.25,"eldritch":-0.25,"electrocut":-0.25,"electrocution":-0.25,"electrosleep":-0.25,"elid":-0.25,"elmwood":-0.25,"elus":-0.25,"embezzl":-0.25,"embitter":-0.25,"embol":-0.25,"embrangl":-0.25,"emeri":-0.25,"encainid":-0.25,"encopresi":-0.25,"encount":-0.25,"encumb":-0.25,"endocarp":-0.25,"endomorphi":-0.25,"ensconc":-0.25,"enterotoxemia":-0.25,"enterprising":-0.25,"entomb":-0.25,"entomophobia":-0.25,"environmentalist":-0.25,"envisag":-0.25,"eosinophilia":-0.25,"epaulier":-0.25,"ephemer":-0.25,"epicanthus":-0.25,"epicardia":-0.25,"epidemiolog":-0.25,"epilept":-0.25,"ern":-0.25,"escapad":-0.25,"escap":-0.25,"eschatolog":-0.25,"essay":-0.25,"esthesi":-0.25,"ethanediol":-0.25,"etud":-0.25,"euthanasia":-0.25,"eutroph":-0.25,"evacue":-0.25,"evilli":-0.25,"exanthem":-0.25,"exanthema":-0.25,"excerpt":-0.25,"excess":-0.25,"excresc":-0.25,"excret":-0.25,"excretori":-0.25,"exodus":-0.25,"exorc":-0.25,"expiatori":-0.25,"expostul":-0.25,"extemporan":-0.25,"extemporari":-0.25,"extempor":-0.25,"extirp":-0.25,"extralinguist":-0.25,"extrem":-0.25,"eyeglass":-0.25,"eyelash":-0.25,"faceless":-0.25,"fade":-0.25,"fado":-0.25,"faecalith":-0.25,"faineanc":-0.25,"faineant":-0.25,"fakeri":-0.25,"falcon":-0.25,"falsehood":-0.25,"falsiti":-0.25,"fantasi":-0.25,"farthingal":-0.25,"fatig":-0.25,"fatso":-0.25,"fattish":-0.25,"fay":-0.25,"faze":-0.25,"fearless":-0.25,"featherless":-0.25,"febrifug":-0.25,"fecalith":-0.25,"feckless":-0.25,"fecul":-0.25,"feist":-0.25,"fernless":-0.25,"feud":-0.25,"few":-0.25,"fibrinolysi":-0.25,"fice":-0.25,"fierili":-0.25,"finch":-0.25,"fingerpoint":-0.25,"firearm":-0.25,"fireproof":-0.25,"firestorm":-0.25,"firethorn":-0.25,"firework":-0.25,"firstborn":-0.25,"fishey":-0.25,"flashflood":-0.25,"flavorless":-0.25,"flavourless":-0.25,"fleabag":-0.25,"fleeting":-0.25,"flimflam":-0.25,"flip":-0.25,"flippant":-0.25,"flogger":-0.25,"floor":-0.25,"flop":-0.25,"flophous":-0.25,"flora":-0.25,"fluctuat":-0.25,"flunk":-0.25,"fog":-0.25,"foli":-0.25,"folklor":-0.25,"fomit":-0.25,"foodless":-0.25,"fooleri":-0.25,"footpad":-0.25,"footrest":-0.25,"footstool":-0.25,"footwal":-0.25,"foresighted":-0.25,"foresight":-0.25,"foretast":-0.25,"forewarn":-0.25,"forg":-0.25,"forgeri":-0.25,"fork":-0.25,"forthwith":-0.25,"found":-0.25,"fox":-0.25,"foxtrot":-0.25,"frazzl":-0.25,"freeboot":-0.25,"frenzi":-0.25,"frequent":-0.25,"frigorif":-0.25,"fripperi":-0.25,"frisson":-0.25,"fritter":-0.25,"frontbench":-0.25,"frontlet":-0.25,"frostbit":-0.25,"frowsi":-0.25,"frowzl":-0.25,"frowzi":-0.25,"fruitless":-0.25,"fuckhead":-0.25,"fugac":-0.25,"fulsom":-0.25,"fumbler":-0.25,"fumbl":-0.25,"funer":-0.25,"funerari":-0.25,"funki":-0.25,"funnili":-0.25,"furunculosi":-0.25,"fussili":-0.25,"fusspot":-0.25,"fustig":-0.25,"galactosemia":-0.25,"galbanum":-0.25,"gallium":-0.25,"gambrel":-0.25,"ganef":-0.25,"gangster":-0.25,"ganof":-0.25,"gaolbird":-0.25,"gaoler":-0.25,"gargoyl":-0.25,"garibaldi":-0.25,"garnish":-0.25,"garott":-0.25,"garrot":-0.25,"garrott":-0.25,"gas":-0.25,"gaskin":-0.25,"gasmask":-0.25,"gasp":-0.25,"gastriti":-0.25,"gateau":-0.25,"gazillion":-0.25,"gazump":-0.25,"gean":-0.25,"geezer":-0.25,"gegenschein":-0.25,"gerfalcon":-0.25,"german":-0.25,"ghastli":-0.25,"gibbous":-0.25,"giddili":-0.25,"gilbert":-0.25,"gimmick":-0.25,"gin":-0.25,"gip":-0.25,"glander":-0.25,"glareol":-0.25,"glassless":-0.25,"glee":-0.25,"gliricidia":-0.25,"glitch":-0.25,"glucinium":-0.25,"glyptic":-0.25,"gnathion":-0.25,"goad":-0.25,"goate":-0.25,"goldbrick":-0.25,"gonif":-0.25,"goniff":-0.25,"gonion":-0.25,"gonorrhea":-0.25,"gonorrhoea":-0.25,"goo":-0.25,"goosebump":-0.25,"gooseflesh":-0.25,"gooselik":-0.25,"goosey":-0.25,"goosi":-0.25,"gorget":-0.25,"graini":-0.25,"granit":-0.25,"granular":-0.25,"granulocytopenia":-0.25,"granuloma":-0.25,"grappl":-0.25,"grati":-0.25,"gray":-0.25,"grayish":-0.25,"greaser":-0.25,"greatcoat":-0.25,"greav":-0.25,"greenback":-0.25,"greet":-0.25,"grey":-0.25,"greyish":-0.25,"grime":-0.25,"grimoir":-0.25,"gritrock":-0.25,"gritston":-0.25,"grope":-0.25,"grouchili":-0.25,"groundless":-0.25,"groundl":-0.25,"groundsheet":-0.25,"grumbler":-0.25,"grumpili":-0.25,"grung":-0.25,"gubbin":-0.25,"guck":-0.25,"guesser":-0.25,"guff":-0.25,"guimp":-0.25,"gum":-0.25,"gunk":-0.25,"gunrunn":-0.25,"gust":-0.25,"gustat":-0.25,"gustatori":-0.25,"gutsi":-0.25,"gynogenesi":-0.25,"gyp":-0.25,"gyrfalcon":-0.25,"habergeon":-0.25,"hacker":-0.25,"hackney":-0.25,"haemoptysi":-0.25,"haick":-0.25,"haik":-0.25,"haiku":-0.25,"hallstand":-0.25,"hamartia":-0.25,"harangu":-0.25,"hardboard":-0.25,"hardpan":-0.25,"hardscrabbl":-0.25,"harridan":-0.25,"hashmark":-0.25,"hatemong":-0.25,"hauberk":-0.25,"hawkish":-0.25,"haymak":-0.25,"hayse":-0.25,"headless":-0.25,"headscarf":-0.25,"hearer":-0.25,"heartrot":-0.25,"heatless":-0.25,"heatstrok":-0.25,"hebephrenia":-0.25,"hebephren":-0.25,"hecatomb":-0.25,"heckl":-0.25,"hectic":-0.25,"hector":-0.25,"hegira":-0.25,"heist":-0.25,"hejira":-0.25,"hellcat":-0.25,"hellhound":-0.25,"hellion":-0.25,"hemiplegia":-0.25,"hemoptysi":-0.25,"hereupon":-0.25,"heritor":-0.25,"herpangia":-0.25,"herp":-0.25,"hesitat":-0.25,"heterocerc":-0.25,"hidebound":-0.25,"highbind":-0.25,"highjack":-0.25,"highlif":-0.25,"highwayman":-0.25,"hijink":-0.25,"hillock":-0.25,"hilli":-0.25,"hirer":-0.25,"hiss":-0.25,"hitless":-0.25,"hoars":-0.25,"hoax":-0.25,"hobo":-0.25,"hogwash":-0.25,"homesick":-0.25,"honkytonk":-0.25,"hooey":-0.25,"hooki":-0.25,"hoosegow":-0.25,"hoosgow":-0.25,"hop":-0.25,"horari":-0.25,"hornswoggl":-0.25,"horripil":-0.25,"horticultur":-0.25,"hottish":-0.25,"housecoat":-0.25,"hubri":-0.25,"huck":-0.25,"huckaback":-0.25,"humankind":-0.25,"humat":-0.25,"hummock":-0.25,"hunt":-0.25,"hurl":-0.25,"hydrocel":-0.25,"hydrocephalus":-0.25,"hydrocephali":-0.25,"hydrochlorofluorocarbon":-0.25,"hydrolis":-0.25,"hydrol":-0.25,"hydroxychloroquin":-0.25,"hydroxyzin":-0.25,"hymenopter":-0.25,"hymi":-0.25,"hyperacusia":-0.25,"hyperacusi":-0.25,"hyperaliment":-0.25,"hyperextend":-0.25,"hyperic":-0.25,"hypermetrop":-0.25,"hyperon":-0.25,"hyperop":-0.25,"hyperventil":-0.25,"hypervitaminosi":-0.25,"hypnophobia":-0.25,"hypobetalipoproteinemia":-0.25,"hypocapnia":-0.25,"hypogammaglobulinemia":-0.25,"hypogonad":-0.25,"hypokalemia":-0.25,"hypothrombinemia":-0.25,"hypovitaminosi":-0.25,"icebox":-0.25,"ictal":-0.25,"ictic":-0.25,"ideat":-0.25,"ignobl":-0.25,"ignoramus":-0.25,"illicit":-0.25,"imbroglio":-0.25,"immigr":-0.25,"immobil":-0.25,"immodesti":-0.25,"impact":-0.25,"impeach":-0.25,"impecuni":-0.25,"imper":-0.25,"imperi":-0.25,"implicit":-0.25,"impound":-0.25,"impractic":-0.25,"impromptu":-0.25,"impuls":-0.25,"inaccess":-0.25,"inalter":-0.25,"incaut":-0.25,"incauti":-0.25,"incendiar":-0.25,"inch":-0.25,"incoher":-0.25,"inconsequenti":-0.25,"incontest":-0.25,"incurr":-0.25,"indefeas":-0.25,"indetermin":-0.25,"indeterminaci":-0.25,"indexless":-0.25,"indissolubl":-0.25,"indomit":-0.25,"indwel":-0.25,"ineluct":-0.25,"ineradic":-0.25,"inerti":-0.25,"inescap":-0.25,"inexhaust":-0.25,"inextens":-0.25,"inextinguish":-0.25,"infeas":-0.25,"infiltr":-0.25,"infract":-0.25,"infrang":-0.25,"ingrow":-0.25,"ingrown":-0.25,"inhal":-0.25,"inheritor":-0.25,"injudici":-0.25,"inki":-0.25,"inocul":-0.25,"inoculum":-0.25,"inodor":-0.25,"inorgan":-0.25,"inositol":-0.25,"insalubri":-0.25,"insalubr":-0.25,"insan":-0.25,"insecticid":-0.25,"insignific":-0.25,"insomnia":-0.25,"instant":-0.25,"insul":-0.25,"insurrection":-0.25,"intens":-0.25,"intercollegi":-0.25,"intermitt":-0.25,"interscholast":-0.25,"interschool":-0.25,"intertrigo":-0.25,"intravas":-0.25,"intrench":-0.25,"intumesc":-0.25,"inutil":-0.25,"invidia":-0.25,"invidi":-0.25,"invinc":-0.25,"invis":-0.25,"involuntarili":-0.25,"irat":-0.25,"ire":-0.25,"irreclaim":-0.25,"irreligionist":-0.25,"irreligi":-0.25,"irrevoc":-0.25,"irrevok":-0.25,"isoclin":-0.25,"isometropia":-0.25,"isopteran":-0.25,"itraconazol":-0.25,"jagged":-0.25,"jailbird":-0.25,"jailer":-0.25,"jailor":-0.25,"jalopi":-0.25,"jar":-0.25,"javelina":-0.25,"jaywalk":-0.25,"jellaba":-0.25,"jellyrol":-0.25,"jerkin":-0.25,"jet":-0.25,"jigaboo":-0.25,"jihadi":-0.25,"jillion":-0.25,"jilt":-0.25,"jink":-0.25,"jiqui":-0.25,"jobless":-0.25,"jodhpur":-0.25,"jointworm":-0.25,"jostl":-0.25,"jot":-0.25,"juggernaut":-0.25,"jugular":-0.25,"jument":-0.25,"kabala":-0.25,"kabbala":-0.25,"kabbalah":-0.25,"kaftan":-0.25,"kalanta":-0.25,"kalpac":-0.25,"kaon":-0.25,"keepsak":-0.25,"keratoconus":-0.25,"keratomalacia":-0.25,"keratoscop":-0.25,"khimar":-0.25,"kiang":-0.25,"kidnap":-0.25,"kike":-0.25,"kimono":-0.25,"kinemat":-0.25,"kinesi":-0.25,"kip":-0.25,"kirtl":-0.25,"kitte":-0.25,"kleptomania":-0.25,"knacker":-0.25,"kneecap":-0.25,"knicker":-0.25,"knoll":-0.25,"knucklehead":-0.25,"kooki":-0.25,"kurche":-0.25,"kurchi":-0.25,"kurta":-0.25,"labori":-0.25,"labrocyt":-0.25,"lacewood":-0.25,"lacquer":-0.25,"laetril":-0.25,"lagophthalmo":-0.25,"lambdac":-0.25,"lampblack":-0.25,"landlubb":-0.25,"lapid":-0.25,"larcen":-0.25,"larvicid":-0.25,"last":-0.25,"laterit":-0.25,"lath":-0.25,"lavalava":-0.25,"lawbreak":-0.25,"lawman":-0.25,"layoff":-0.25,"lazar":-0.25,"lazi":-0.25,"lederhosen":-0.25,"leer":-0.25,"legionella":-0.25,"lemonlik":-0.25,"lemoni":-0.25,"lenit":-0.25,"leprechaun":-0.25,"leptospira":-0.25,"lethargi":-0.25,"leucaemia":-0.25,"leucoma":-0.25,"leukaemia":-0.25,"leukemia":-0.25,"leukoenceph":-0.25,"leukoma":-0.25,"leverag":-0.25,"levir":-0.25,"libertin":-0.25,"lifer":-0.25,"light":-0.25,"lightless":-0.25,"lipochondrodystrophi":-0.25,"listen":-0.25,"listeriosi":-0.25,"lithoglypt":-0.25,"litmus":-0.25,"littl":-0.25,"llama":-0.25,"loco":-0.25,"loos":-0.25,"looter":-0.25,"loot":-0.25,"lopsid":-0.25,"lout":-0.25,"lovelorn":-0.25,"lovesick":-0.25,"lowboy":-0.25,"lowercas":-0.25,"lubber":-0.25,"lucif":-0.25,"lummox":-0.25,"lumpen":-0.25,"lumpenproletariat":-0.25,"lumpish":-0.25,"lunaci":-0.25,"lunkhead":-0.25,"lute":-0.25,"lycanthrop":-0.25,"lie":-0.25,"lymphadenoma":-0.25,"lymphogranuloma":-0.25,"lymphoma":-0.25,"lysi":-0.25,"macul":-0.25,"macushla":-0.25,"madwoman":-0.25,"maggot":-0.25,"magistraci":-0.25,"magistr":-0.25,"magistratur":-0.25,"maidism":-0.25,"malais":-0.25,"malaprop":-0.25,"malaria":-0.25,"malefactor":-0.25,"malfeas":-0.25,"malnourish":-0.25,"malnutrit":-0.25,"malposit":-0.25,"malvers":-0.25,"mammon":-0.25,"mandat":-0.25,"manganes":-0.25,"manhandl":-0.25,"manhunt":-0.25,"mankind":-0.25,"manslaught":-0.25,"mantilla":-0.25,"manual":-0.25,"manumitt":-0.25,"marginalis":-0.25,"maria":-0.25,"mariticid":-0.25,"marl":-0.25,"marlberri":-0.25,"mashi":-0.25,"mastocyt":-0.25,"matchstick":-0.25,"materiel":-0.25,"matman":-0.25,"matt":-0.25,"mayhem":-0.25,"mayid":-0.25,"mazzard":-0.25,"mealybug":-0.25,"meaningless":-0.25,"meatless":-0.25,"mecopteran":-0.25,"mecopter":-0.25,"meddler":-0.25,"meiotic":-0.25,"melancholiac":-0.25,"melanis":-0.25,"melan":-0.25,"melanosi":-0.25,"mendaci":-0.25,"menial":-0.25,"mening":-0.25,"merl":-0.25,"mesocolon":-0.25,"messiah":-0.25,"messiahship":-0.25,"metalepsi":-0.25,"metastasi":-0.25,"methanol":-0.25,"methylphenid":-0.25,"methyltestosteron":-0.25,"mewl":-0.25,"miasmic":-0.25,"microcopi":-0.25,"micronutri":-0.25,"milit":-0.25,"milkless":-0.25,"millettia":-0.25,"minelay":-0.25,"miner":-0.25,"ming":-0.25,"mingi":-0.25,"minibik":-0.25,"minifi":-0.25,"minim":-0.25,"minyan":-0.25,"miro":-0.25,"misadventur":-0.25,"misalign":-0.25,"misapprehens":-0.25,"misappropri":-0.25,"misbrand":-0.25,"miscal":-0.25,"miscellani":-0.25,"miscount":-0.25,"misdeliv":-0.25,"misgiv":-0.25,"misinterpret":-0.25,"mislabel":-0.25,"mismanag":-0.25,"misnam":-0.25,"misplac":-0.25,"misrel":-0.25,"miss":-0.25,"misspend":-0.25,"mistreat":-0.25,"misunderstand":-0.25,"mo":-0.25,"moaner":-0.25,"mobster":-0.25,"mocker":-0.25,"moderatorship":-0.25,"moil":-0.25,"moist":-0.25,"molass":-0.25,"mollycoddl":-0.25,"monarchi":-0.25,"monaur":-0.25,"moneran":-0.25,"mongolian":-0.25,"mongol":-0.25,"monoplegia":-0.25,"moocher":-0.25,"moodili":-0.25,"moonshel":-0.25,"moonshin":-0.25,"moonstruck":-0.25,"mop":-0.25,"morceau":-0.25,"mordac":-0.25,"moron":-0.25,"mothproof":-0.25,"motorbik":-0.25,"move":-0.25,"mow":-0.25,"muck":-0.25,"mucus":-0.25,"mud":-0.25,"muddlehead":-0.25,"mugger":-0.25,"multifari":-0.25,"mump":-0.25,"mumpsimus":-0.25,"munch":-0.25,"muncher":-0.25,"mural":-0.25,"murderess":-0.25,"murkili":-0.25,"murrain":-0.25,"mussit":-0.25,"muttonhead":-0.25,"myasthenia":-0.25,"myelatelia":-0.25,"myonecrosi":-0.25,"myopath":-0.25,"myxomatosi":-0.25,"nanism":-0.25,"narcolepsi":-0.25,"narcotraff":-0.25,"nazifi":-0.25,"nebbech":-0.25,"nebbish":-0.25,"nebulos":-0.25,"neckerchief":-0.25,"neckless":-0.25,"neckpiec":-0.25,"neckti":-0.25,"neckwear":-0.25,"necrolysi":-0.25,"necrom":-0.25,"necromania":-0.25,"necrophilia":-0.25,"necrophil":-0.25,"necros":-0.25,"necrosi":-0.25,"necrot":-0.25,"nefari":-0.25,"negativ":-0.25,"neglige":-0.25,"neophobia":-0.25,"nerita":-0.25,"nervili":-0.25,"neuralg":-0.25,"neurasthenia":-0.25,"neurofibromatosi":-0.25,"neurotox":-0.25,"nevertheless":-0.25,"nevus":-0.25,"newspeak":-0.25,"newsreel":-0.25,"nigga":-0.25,"niggardli":-0.25,"nigger":-0.25,"niggler":-0.25,"nightcloth":-0.25,"nightdress":-0.25,"nightgown":-0.25,"nighti":-0.25,"nightwear":-0.25,"nigra":-0.25,"nihil":-0.25,"nihilist":-0.25,"nitrobenzen":-0.25,"nock":-0.25,"noctuid":-0.25,"nocturia":-0.25,"nocturn":-0.25,"nonarbitr":-0.25,"nonassert":-0.25,"nonastring":-0.25,"noncaus":-0.25,"nonclass":-0.25,"noncompetit":-0.25,"nonconformist":-0.25,"noncontroversi":-0.25,"nondeduct":-0.25,"nonequival":-0.25,"nonetheless":-0.25,"nonexplos":-0.25,"nonextensil":-0.25,"nonfict":-0.25,"nonfissil":-0.25,"nonindustri":-0.25,"noninterchang":-0.25,"nonion":-0.25,"nonionis":-0.25,"nonlex":-0.25,"nonmandatori":-0.25,"nonmeaning":-0.25,"nonmechan":-0.25,"nonmechanist":-0.25,"nonmet":-0.25,"nonmetal":-0.25,"nonmov":-0.25,"nonobligatori":-0.25,"nonoccurr":-0.25,"nonparticul":-0.25,"nonpluss":-0.25,"nonpolar":-0.25,"nonpolit":-0.25,"nonproduct":-0.25,"nonprotractil":-0.25,"nonreciproc":-0.25,"nonrenew":-0.25,"nonspecif":-0.25,"nonunion":-0.25,"nonunionis":-0.25,"nonverb":-0.25,"nonvolatil":-0.25,"nonvolatilis":-0.25,"nonvolatiliz":-0.25,"nonwash":-0.25,"noreast":-0.25,"northeast":-0.25,"nosey":-0.25,"nosolog":-0.25,"notorieti":-0.25,"notwithstand":-0.25,"novelett":-0.25,"novella":-0.25,"nudg":-0.25,"null":-0.25,"numskul":-0.25,"nut":-0.25,"nycturia":-0.25,"nystagmus":-0.25,"oaf":-0.25,"obdur":-0.25,"obes":-0.25,"oblivion":-0.25,"obscurantist":-0.25,"obstin":-0.25,"obstip":-0.25,"obtur":-0.25,"occlud":-0.25,"octopod":-0.25,"ode":-0.25,"odorless":-0.25,"odourless":-0.25,"oft":-0.25,"often":-0.25,"ofttim":-0.25,"oleophob":-0.25,"ommatidium":-0.25,"oncogen":-0.25,"operos":-0.25,"opinion":-0.25,"opisthotono":-0.25,"opprobrium":-0.25,"orchiti":-0.25,"organis":-0.25,"orthopnea":-0.25,"oscheocel":-0.25,"oscheocoel":-0.25,"osmosi":-0.25,"osteiti":-0.25,"other":-0.25,"otic":-0.25,"otiti":-0.25,"ousel":-0.25,"outdat":-0.25,"outfac":-0.25,"outgener":-0.25,"outright":-0.25,"outroar":-0.25,"outstar":-0.25,"ouzel":-0.25,"overbearing":-0.25,"overfamiliar":-0.25,"overlay":-0.25,"overli":-0.25,"oversho":-0.25,"overshoot":-0.25,"overshot":-0.25,"overskirt":-0.25,"overturn":-0.25,"overvali":-0.25,"overwrought":-0.25,"oxymoron":-0.25,"ozaena":-0.25,"ozena":-0.25,"pacha":-0.25,"padder":-0.25,"painkil":-0.25,"palaeopatholog":-0.25,"palatalis":-0.25,"paleopatholog":-0.25,"panamica":-0.25,"panamiga":-0.25,"pancreat":-0.25,"panti":-0.25,"paralyz":-0.25,"paranoia":-0.25,"paraquat":-0.25,"paratyphoid":-0.25,"parch":-0.25,"parentless":-0.25,"paret":-0.25,"parki":-0.25,"parosamia":-0.25,"part":-0.25,"pasha":-0.25,"passementeri":-0.25,"pasteurellosi":-0.25,"past":-0.25,"patricid":-0.25,"patzer":-0.25,"pauper":-0.25,"pauperis":-0.25,"paw":-0.25,"pear":-0.25,"peccabl":-0.25,"peccant":-0.25,"peckish":-0.25,"pecul":-0.25,"pediculosi":-0.25,"peephol":-0.25,"peignoir":-0.25,"pellagra":-0.25,"penniless":-0.25,"peplo":-0.25,"peplus":-0.25,"perfection":-0.25,"perfidi":-0.25,"perforc":-0.25,"peridotit":-0.25,"periodont":-0.25,"periphrast":-0.25,"peroneus":-0.25,"persecutor":-0.25,"pertussi":-0.25,"pesticid":-0.25,"pestil":-0.25,"pettili":-0.25,"phaneromania":-0.25,"phantasmagor":-0.25,"phellem":-0.25,"phenylamin":-0.25,"philander":-0.25,"phimosi":-0.25,"phobia":-0.25,"photophobia":-0.25,"photoretin":-0.25,"physiotherapist":-0.25,"pickelhaub":-0.25,"pickl":-0.25,"pigstick":-0.25,"pilar":-0.25,"pinafor":-0.25,"pinkroot":-0.25,"pinni":-0.25,"piperacillin":-0.25,"piranha":-0.25,"pitfal":-0.25,"placeman":-0.25,"placeseek":-0.25,"placoid":-0.25,"planimet":-0.25,"plantal":-0.25,"platelik":-0.25,"platitudinarian":-0.25,"pleonast":-0.25,"pleurocarp":-0.25,"ploughman":-0.25,"plower":-0.25,"plowman":-0.25,"plumbism":-0.25,"plunder":-0.25,"plutocrat":-0.25,"policeman":-0.25,"poltrooneri":-0.25,"pom":-0.25,"pommi":-0.25,"poppycock":-0.25,"postich":-0.25,"postict":-0.25,"postilion":-0.25,"postillion":-0.25,"potboil":-0.25,"pothold":-0.25,"potomania":-0.25,"pounc":-0.25,"pox":-0.25,"prang":-0.25,"pratincol":-0.25,"precancer":-0.25,"precautionari":-0.25,"preclin":-0.25,"predic":-0.25,"preeclampsia":-0.25,"presbyop":-0.25,"presbyopia":-0.25,"presymptomat":-0.25,"prevu":-0.25,"prod":-0.25,"prodigi":-0.25,"proflig":-0.25,"prognost":-0.25,"proselytis":-0.25,"proselyt":-0.25,"prostat":-0.25,"protuber":-0.25,"provinci":-0.25,"pruderi":-0.25,"pruritus":-0.25,"pseudoephedrin":-0.25,"pseudohallucin":-0.25,"pseudophloem":-0.25,"psilophyt":-0.25,"psittacosi":-0.25,"psychogenet":-0.25,"psychosurgeri":-0.25,"psychotherapist":-0.25,"pteridosperm":-0.25,"ptosi":-0.25,"pube":-0.25,"puce":-0.25,"puddinghead":-0.25,"pugil":-0.25,"pule":-0.25,"punctum":-0.25,"punic":-0.25,"punk":-0.25,"purism":-0.25,"putrefact":-0.25,"putrescin":-0.25,"putsch":-0.25,"putz":-0.25,"pycnodysostosi":-0.25,"pyracanth":-0.25,"pyramid":-0.25,"pyridin":-0.25,"pyrolign":-0.25,"pyroscop":-0.25,"pyuria":-0.25,"qabala":-0.25,"qabalah":-0.25,"quaker":-0.25,"quartzit":-0.25,"quillwort":-0.25,"quinin":-0.25,"quinquefoli":-0.25,"rabato":-0.25,"rabbi":-0.25,"rabbit":-0.25,"rabid":-0.25,"racket":-0.25,"rack":-0.25,"ragamuffin":-0.25,"ramipril":-0.25,"randomis":-0.25,"random":-0.25,"rankl":-0.25,"rappel":-0.25,"raptor":-0.25,"rassl":-0.25,"reappear":-0.25,"reapprais":-0.25,"rearrang":-0.25,"rebarb":-0.25,"rebato":-0.25,"reced":-0.25,"rechauff":-0.25,"recidiv":-0.25,"reconvict":-0.25,"recrimin":-0.25,"recriminatori":-0.25,"recus":-0.25,"redbelli":-0.25,"redetermin":-0.25,"redistribut":-0.25,"redneck":-0.25,"reductiv":-0.25,"reelect":-0.25,"refriger":-0.25,"regain":-0.25,"regrow":-0.25,"reheat":-0.25,"reincarnation":-0.25,"reintegr":-0.25,"reject":-0.25,"relati":-0.25,"reluct":-0.25,"remilitaris":-0.25,"remilitar":-0.25,"remonstr":-0.25,"remorseless":-0.25,"rend":-0.25,"reorder":-0.25,"repriev":-0.25,"reshoot":-0.25,"resublim":-0.25,"retali":-0.25,"retaliatori":-0.25,"reveng":-0.25,"rheolog":-0.25,"rhymeless":-0.25,"ribier":-0.25,"ribless":-0.25,"rickettsia":-0.25,"rickettsialpox":-0.25,"rickettsiosi":-0.25,"rigatoni":-0.25,"rimeless":-0.25,"rinderpest":-0.25,"rioter":-0.25,"rival":-0.25,"roadblock":-0.25,"roadkil":-0.25,"robber":-0.25,"rockwe":-0.25,"rogu":-0.25,"rogueri":-0.25,"rook":-0.25,"root":-0.25,"rotenon":-0.25,"rotgut":-0.25,"roughcast":-0.25,"rout":-0.25,"roux":-0.25,"rowdyism":-0.25,"rube":-0.25,"rubella":-0.25,"rugged":-0.25,"ruiner":-0.25,"rumpl":-0.25,"runup":-0.25,"rushi":-0.25,"rustl":-0.25,"saccad":-0.25,"saddl":-0.25,"sag":-0.25,"salal":-0.25,"salienc":-0.25,"salol":-0.25,"sandbank":-0.25,"sapraemia":-0.25,"sapremia":-0.25,"sapsago":-0.25,"sarap":-0.25,"sarcoma":-0.25,"sarong":-0.25,"sass":-0.25,"satinleaf":-0.25,"saturn":-0.25,"satyriasi":-0.25,"saucili":-0.25,"saut":-0.25,"saute":-0.25,"savior":-0.25,"saviour":-0.25,"savorless":-0.25,"savourless":-0.25,"saxatil":-0.25,"saxicolin":-0.25,"saxicol":-0.25,"scabicid":-0.25,"scabi":-0.25,"scalar":-0.25,"scam":-0.25,"scandalmong":-0.25,"scapulari":-0.25,"scatolog":-0.25,"schedul":-0.25,"schizoid":-0.25,"schlep":-0.25,"schlepper":-0.25,"schlockmeist":-0.25,"schmegegg":-0.25,"schnook":-0.25,"sciara":-0.25,"sciarid":-0.25,"scienter":-0.25,"sclaff":-0.25,"scleredema":-0.25,"scleros":-0.25,"scoffer":-0.25,"scofflaw":-0.25,"scoundrel":-0.25,"scourger":-0.25,"scragg":-0.25,"scribbl":-0.25,"scrimmag":-0.25,"scrimp":-0.25,"scroll":-0.25,"scrounger":-0.25,"scrubbi":-0.25,"scuffer":-0.25,"scurvi":-0.25,"scut":-0.25,"seagul":-0.25,"secobarbit":-0.25,"section":-0.25,"seedless":-0.25,"seek":-0.25,"selenium":-0.25,"sempitern":-0.25,"septicaemia":-0.25,"septicemia":-0.25,"serap":-0.25,"serviett":-0.25,"setback":-0.25,"shadowbox":-0.25,"shadowi":-0.25,"shaggyman":-0.25,"shako":-0.25,"shallon":-0.25,"shantung":-0.25,"shard":-0.25,"sharia":-0.25,"shariah":-0.25,"shegetz":-0.25,"shelterbelt":-0.25,"sherd":-0.25,"shigellosi":-0.25,"shill":-0.25,"shillysh":-0.25,"shimmi":-0.25,"shinpad":-0.25,"shipboard":-0.25,"shirker":-0.25,"shirt":-0.25,"shithead":-0.25,"shitless":-0.25,"shitwork":-0.25,"shlep":-0.25,"shlepper":-0.25,"shlockmeist":-0.25,"shmegegg":-0.25,"shnook":-0.25,"shoeless":-0.25,"shoot":-0.25,"shopahol":-0.25,"shortish":-0.25,"short":-0.25,"shred":-0.25,"shrill":-0.25,"shrimpi":-0.25,"shrub":-0.25,"shunter":-0.25,"shyster":-0.25,"sickbag":-0.25,"sickb":-0.25,"sidelin":-0.25,"sidetrack":-0.25,"sieg":-0.25,"silent":-0.25,"sima":-0.25,"simpl":-0.25,"simplist":-0.25,"siriasi":-0.25,"sit":-0.25,"skibob":-0.25,"skimpi":-0.25,"skinhead":-0.25,"skirmish":-0.25,"skulk":-0.25,"skunkwe":-0.25,"slacker":-0.25,"slagheap":-0.25,"slake":-0.25,"slap":-0.25,"slatey":-0.25,"slati":-0.25,"slaveless":-0.25,"sleepwear":-0.25,"sleuth":-0.25,"slight":-0.25,"slime":-0.25,"slipperi":-0.25,"slob":-0.25,"slog":-0.25,"slopshop":-0.25,"sloth":-0.25,"sloucher":-0.25,"sloven":-0.25,"slower":-0.25,"slowest":-0.25,"slum":-0.25,"slut":-0.25,"sluttish":-0.25,"smack":-0.25,"smarm":-0.25,"smarmi":-0.25,"smell":-0.25,"smirker":-0.25,"smolder":-0.25,"smoulder":-0.25,"smudgi":-0.25,"snare":-0.25,"snickersne":-0.25,"sniffli":-0.25,"sniffi":-0.25,"snippet":-0.25,"snip":-0.25,"snivel":-0.25,"snobberi":-0.25,"snobbish":-0.25,"snobbism":-0.25,"snooti":-0.25,"snooz":-0.25,"snot":-0.25,"snowsho":-0.25,"snuffl":-0.25,"snuffli":-0.25,"sob":-0.25,"sock":-0.25,"softheart":-0.25,"sole":-0.25,"solidif":-0.25,"solidifi":-0.25,"somatosensori":-0.25,"soonest":-0.25,"soot":-0.25,"sop":-0.25,"sorceri":-0.25,"sot":-0.25,"sou":-0.25,"soulless":-0.25,"sourbal":-0.25,"sourish":-0.25,"soutan":-0.25,"spacesuit":-0.25,"spec":-0.25,"spermophil":-0.25,"spewer":-0.25,"sphacel":-0.25,"sphacelus":-0.25,"spicat":-0.25,"spiritualist":-0.25,"spoilat":-0.25,"spontan":-0.25,"sportswear":-0.25,"sprite":-0.25,"sprue":-0.25,"spue":-0.25,"spunk":-0.25,"spunki":-0.25,"spur":-0.25,"spyhol":-0.25,"squalli":-0.25,"squat":-0.25,"squatti":-0.25,"squigg":-0.25,"squint":-0.25,"stag":-0.25,"stagi":-0.25,"stakeout":-0.25,"stake":-0.25,"stamped":-0.25,"standdown":-0.25,"stannit":-0.25,"staph":-0.25,"staphylococci":-0.25,"staphylococcus":-0.25,"stardust":-0.25,"starer":-0.25,"starless":-0.25,"starvat":-0.25,"stealer":-0.25,"stercolith":-0.25,"sternut":-0.25,"sthene":-0.25,"stickup":-0.25,"stiff":-0.25,"stigmatis":-0.25,"stinkhorn":-0.25,"stob":-0.25,"stole":-0.25,"stonefish":-0.25,"stonewash":-0.25,"stormili":-0.25,"stormi":-0.25,"straggl":-0.25,"strang":-0.25,"stringent":-0.25,"striver":-0.25,"stromateid":-0.25,"struggler":-0.25,"stub":-0.25,"stubbi":-0.25,"stultif":-0.25,"stumper":-0.25,"stumpi":-0.25,"subclin":-0.25,"subfusc":-0.25,"suborn":-0.25,"subt":-0.25,"subvers":-0.25,"subvocalis":-0.25,"subvoc":-0.25,"subwoof":-0.25,"suer":-0.25,"suet":-0.25,"sueti":-0.25,"summon":-0.25,"sunbonnet":-0.25,"sunhat":-0.25,"sunk":-0.25,"sunstrok":-0.25,"suntan":-0.25,"supernaturalist":-0.25,"suprainfect":-0.25,"surreal":-0.25,"surrealist":-0.25,"suspici":-0.25,"swear":-0.25,"swim":-0.25,"swimsuit":-0.25,"swimwear":-0.25,"swindl":-0.25,"swollen":-0.25,"sycoph":-0.25,"symphysi":-0.25,"symposium":-0.25,"synaesthet":-0.25,"synesthet":-0.25,"syphilit":-0.25,"syringa":-0.25,"tablespoon":-0.25,"tactil":-0.25,"tailgat":-0.25,"tailless":-0.25,"tambac":-0.25,"tamer":-0.25,"tangl":-0.25,"tangi":-0.25,"tantalum":-0.25,"tappet":-0.25,"tap":-0.25,"tarantula":-0.25,"tarnish":-0.25,"tarpan":-0.25,"tattoo":-0.25,"telex":-0.25,"temporari":-0.25,"tenement":-0.25,"teratogen":-0.25,"teratolog":-0.25,"termag":-0.25,"terrain":-0.25,"terroris":-0.25,"tetchili":-0.25,"thalidomid":-0.25,"thanatolog":-0.25,"thereinaft":-0.25,"thermocauteri":-0.25,"thermoreceptor":-0.25,"thermotherapi":-0.25,"theropod":-0.25,"thicket":-0.25,"thief":-0.25,"thiev":-0.25,"thievish":-0.25,"thin":-0.25,"thingamabob":-0.25,"thingamajig":-0.25,"thingmabob":-0.25,"thingmajig":-0.25,"thingumabob":-0.25,"thingumajig":-0.25,"thingummi":-0.25,"thinner":-0.25,"thorn":-0.25,"thriftless":-0.25,"throati":-0.25,"thuggeri":-0.25,"thunderbird":-0.25,"thundershow":-0.25,"ticklish":-0.25,"tiebreak":-0.25,"tightfisted":-0.25,"tike":-0.25,"till":-0.25,"timeworn":-0.25,"tinnitus":-0.25,"titanium":-0.25,"titulari":-0.25,"toeless":-0.25,"toga":-0.25,"toilsom":-0.25,"tombac":-0.25,"tombak":-0.25,"tomfooleri":-0.25,"toot":-0.25,"topcoat":-0.25,"tope":-0.25,"topo":-0.25,"torero":-0.25,"torn":-0.25,"torqu":-0.25,"tortuous":-0.25,"totteri":-0.25,"tousl":-0.25,"tow":-0.25,"trailhead":-0.25,"traitor":-0.25,"tranquilli":-0.25,"transitori":-0.25,"transmogrif":-0.25,"traumatophobia":-0.25,"treasonist":-0.25,"treed":-0.25,"trembler":-0.25,"tribul":-0.25,"tributyrin":-0.25,"trichloroethan":-0.25,"trichloroethylen":-0.25,"trichomoniasi":-0.25,"trifoli":-0.25,"trifoliol":-0.25,"triskaidekaphobia":-0.25,"triumvir":-0.25,"trivia":-0.25,"trivial":-0.25,"trollop":-0.25,"trope":-0.25,"troublemak":-0.25,"troubler":-0.25,"truanci":-0.25,"tsunami":-0.25,"tsuri":-0.25,"tubercul":-0.25,"tudung":-0.25,"tuffet":-0.25,"tularaemia":-0.25,"tularemia":-0.25,"tumesc":-0.25,"tumid":-0.25,"turnkey":-0.25,"tweedi":-0.25,"twing":-0.25,"tyke":-0.25,"typescript":-0.25,"typhoid":-0.25,"tyrant":-0.25,"tyrosinemia":-0.25,"uakari":-0.25,"ulcer":-0.25,"ultramicroscop":-0.25,"ultramontan":-0.25,"umpir":-0.25,"unacknowledg":-0.25,"unacquaint":-0.25,"unaddress":-0.25,"unadventur":-0.25,"unaffect":-0.25,"unaffection":-0.25,"unalter":-0.25,"unann":-0.25,"unapproach":-0.25,"unassail":-0.25,"unassur":-0.25,"unavoid":-0.25,"unaw":-0.25,"unbal":-0.25,"unbar":-0.25,"unbefit":-0.25,"unbelov":-0.25,"unblink":-0.25,"unbolt":-0.25,"unbook":-0.25,"unborn":-0.25,"unburnish":-0.25,"unbutton":-0.25,"uncarpet":-0.25,"uncaus":-0.25,"uncensor":-0.25,"unchalleng":-0.25,"unchart":-0.25,"unchristlik":-0.25,"uncommercialis":-0.25,"uncommerci":-0.25,"unconformist":-0.25,"unconsid":-0.25,"unconstrict":-0.25,"uncontroversi":-0.25,"uncoordin":-0.25,"uncrop":-0.25,"unctuous":-0.25,"uncurtain":-0.25,"undecipher":-0.25,"undeciph":-0.25,"undefend":-0.25,"undelin":-0.25,"undemand":-0.25,"underbid":-0.25,"underbodic":-0.25,"underlin":-0.25,"underpart":-0.25,"underpric":-0.25,"underscor":-0.25,"undiagnos":-0.25,"undifferenti":-0.25,"undrawn":-0.25,"undi":-0.25,"unedit":-0.25,"unenclos":-0.25,"unencourag":-0.25,"unequip":-0.25,"uner":-0.25,"unexclus":-0.25,"unexpans":-0.25,"unfad":-0.25,"unfashion":-0.25,"unfeas":-0.25,"unfeath":-0.25,"unforethought":-0.25,"unform":-0.25,"unfound":-0.25,"unfunni":-0.25,"ungainli":-0.25,"ungentl":-0.25,"ungentlemanlik":-0.25,"ungentleman":-0.25,"unglaz":-0.25,"unharden":-0.25,"unharmoni":-0.25,"unhatch":-0.25,"unhealth":-0.25,"unhing":-0.25,"unhygien":-0.25,"unilater":-0.25,"unimport":-0.25,"unimpress":-0.25,"uninebri":-0.25,"uninquir":-0.25,"uninquisit":-0.25,"uninsur":-0.25,"uninterest":-0.25,"unintox":-0.25,"unjust":-0.25,"unlatch":-0.25,"unlaw":-0.25,"unlikelihood":-0.25,"unlikeli":-0.25,"unlog":-0.25,"unlucki":-0.25,"unmap":-0.25,"unmelt":-0.25,"unmerci":-0.25,"unmin":-0.25,"unmoder":-0.25,"unmotiv":-0.25,"unnerv":-0.25,"unorganis":-0.25,"unorgan":-0.25,"unpackag":-0.25,"unpaint":-0.25,"unpar":-0.25,"unperform":-0.25,"unperm":-0.25,"unperplex":-0.25,"unpiti":-0.25,"unpledg":-0.25,"unport":-0.25,"unprepossess":-0.25,"unpresent":-0.25,"unprevent":-0.25,"unprofession":-0.25,"unpromis":-0.25,"unpublish":-0.25,"unread":-0.25,"unreassur":-0.25,"unregist":-0.25,"unregul":-0.25,"unrehears":-0.25,"unrepress":-0.25,"unretent":-0.25,"unrevis":-0.25,"unrhym":-0.25,"unrim":-0.25,"unromant":-0.25,"unschedul":-0.25,"unscientif":-0.25,"unscript":-0.25,"unseen":-0.25,"unseeyn":-0.25,"unsettl":-0.25,"unshapen":-0.25,"unsmil":-0.25,"unsold":-0.25,"unsolubl":-0.25,"unsown":-0.25,"unspecif":-0.25,"unspectacular":-0.25,"unsport":-0.25,"unsportsmanlik":-0.25,"unstapl":-0.25,"unstr":-0.25,"unsweet":-0.25,"unswept":-0.25,"unsystemat":-0.25,"unten":-0.25,"unthemat":-0.25,"untitl":-0.25,"untoast":-0.25,"untranslat":-0.25,"untrim":-0.25,"untyp":-0.25,"ununderstood":-0.25,"unventil":-0.25,"unvindict":-0.25,"unvitrifi":-0.25,"unvoic":-0.25,"unwean":-0.25,"unwieldi":-0.25,"unwork":-0.25,"unwoven":-0.25,"uppish":-0.25,"uprais":-0.25,"uproot":-0.25,"urchin":-0.25,"useless":-0.25,"vaginismus":-0.25,"vagu":-0.25,"vain":-0.25,"vandalis":-0.25,"vandal":-0.25,"vanish":-0.25,"vanquish":-0.25,"vapid":-0.25,"variabl":-0.25,"varicella":-0.25,"varicosi":-0.25,"varmint":-0.25,"veget":-0.25,"ventricos":-0.25,"ventric":-0.25,"ventriloqu":-0.25,"ventriloquy":-0.25,"versicl":-0.25,"vest":-0.25,"vestiari":-0.25,"vestigi":-0.25,"vestment":-0.25,"vetchworm":-0.25,"viatic":-0.25,"viaticus":-0.25,"vilifi":-0.25,"vilipend":-0.25,"villai":-0.25,"viola":-0.25,"viricid":-0.25,"virucid":-0.25,"vitiligin":-0.25,"void":-0.25,"vulcanit":-0.25,"vulner":-0.25,"waddl":-0.25,"wader":-0.25,"waffl":-0.25,"wager":-0.25,"wander":-0.25,"warn":-0.25,"warship":-0.25,"warthog":-0.25,"wasteland":-0.25,"wastewat":-0.25,"wasteyard":-0.25,"waterworn":-0.25,"waver":-0.25,"waxi":-0.25,"waxlik":-0.25,"wearabl":-0.25,"weatherman":-0.25,"wee":-0.25,"weeper":-0.25,"werewolf":-0.25,"wetback":-0.25,"wetland":-0.25,"wham":-0.25,"whap":-0.25,"whatchamacallit":-0.25,"whatchamacallum":-0.25,"whatsi":-0.25,"wheedler":-0.25,"wheelless":-0.25,"wheezi":-0.25,"whiffer":-0.25,"whiner":-0.25,"whisper":-0.25,"whiten":-0.25,"whodunit":-0.25,"whoosh":-0.25,"widow":-0.25,"widowman":-0.25,"wildfir":-0.25,"willi":-0.25,"wimpl":-0.25,"windbreak":-0.25,"windstorm":-0.25,"winless":-0.25,"wino":-0.25,"wireless":-0.25,"wiri":-0.25,"witch":-0.25,"wobbl":-0.25,"wolfman":-0.25,"womanis":-0.25,"woodsi":-0.25,"workhous":-0.25,"worrier":-0.25,"worrywart":-0.25,"wraithlik":-0.25,"wren":-0.25,"wrench":-0.25,"wrest":-0.25,"wrestl":-0.25,"wrestler":-0.25,"writ":-0.25,"xenolith":-0.25,"xenophobia":-0.25,"xeric":-0.25,"yahoo":-0.25,"yammer":-0.25,"yatobyo":-0.25,"yea":-0.25,"yes":-0.25,"yid":-0.25,"yin":-0.25,"yip":-0.25,"yodel":-0.25,"yokel":-0.25,"zapper":-0.25,"zephyr":-0.25,"zidovudin":-0.25,"zillion":-0.25,"zit":-0.25,"ziti":-0.25,"zoo":-0.25,"zoonosi":-0.25,"zoophobia":-0.25}
},{}],35:[function(require,module,exports){
/*
 * Copyright (c) AXA Group Operations Spain S.A.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

const senticon = require('./senticon_en.json');
const negations = require('./negations_en.json');

module.exports = {
  senticon,
  negations,
  stemmed: true,
};

},{"./negations_en.json":33,"./senticon_en.json":34}],36:[function(require,module,exports){
const { StopwordsEn } = require('@nlpjs/lang-en');

const stopwords = new StopwordsEn();
stopwords.dictionary = {};
stopwords.build(['is', 'your']);
console.log(stopwords.removeStopwords(['who', 'is', 'your', 'develop']));

},{"@nlpjs/lang-en":31}]},{},[36]);
