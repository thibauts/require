(function() {

  var cache = window.__module_cache = {};
  window.require = require;
  window.register = register;

  function require(path, callback) {

    if(typeof callback !== 'undefined') {
      if(cache.hasOwnProperty(path)) {
        callback(null, cache[path]);
        return
      }

      fetch(path, function(err, text) {
        var fn = evaluate(wrap(text), path);
        register(path, fn);
        callback(null, cache[path]);
      });

    } else {
      if(cache.hasOwnProperty(path)) {
        return cache[path];
      }

      var err = new Error();
      err.code = 'ECACHE';
      err.message = 'module "' + path + '" not in cache';
      throw err;
    }
  }

  function register(path, fn) {
    var module = { exports: {} };
    fn(module, module.exports, require);
    cache[path] = module.exports;
  }

  function evaluate(text, sourceURL) {
    if(typeof sourceURL !== 'undefined') {
      text += '\n//# sourceURL=' + sourceURL;
    }
    return eval(text);
  }

  function wrap(text, sourceURL) {
    return '(function(module, exports, require) {\n' + text + '\n})';
  }

  function fetch(url, callback) {
    var xhr = new XMLHttpRequest();

    xhr.addEventListener('load', onload, false);
    xhr.addEventListener('error', onerror, false);

    xhr.open('GET', url, true);
    xhr.send(null);

    function onload(e) {
      if(xhr.status !== 200) {
        var err = new Error();
        err.code = 'ELOAD'
        err.status = xhr.status;
        err.message = 'failed loading "' + url + '" (' + xhr.statusText + ')';
        callback(err);
        return;
      }
      callback(null, xhr.responseText);
    }

    function onerror(e) {
      var err = new Error();
      err.code = 'EXHR';
      err.message = 'error loading "' + url + '"';
      callback(err);
    }
  }

})();