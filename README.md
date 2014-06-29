### Experiments with module loading in the browser

Allows async require of remote modules over http through `require(url, callback)`. Modules can be preloaded / prebundled with `bundler.js`. Implements caching of already loaded modules. Cached / preloaded modules can be required synchronously through `var mymodule = require('mymodule')`. `bundler.js` has full support for source-maps, including combining them on multiple levels (ie. work with coffee files).

This is a work in progress and the API is still lacking (eg. no way to dynamically preload bundles yet). Not that it is particularly difficult to implement, but designing a clear and robust API is.

The goal is to have multi-level bundling to be able to break large applications into multiple (lighter) bundles that can be loaded on-demand. Focus is put on implementing a clean, simple and minimal API and interfacing in the best possible way with external tooling (ie. leave transforms and minification to the build pipeline, among other things).

A longer term goal, if I ever work on it, would be to make the (require) code run in node.

Dependencies
------------

``` bash
npm install --global uglify-js coffee-script
```

Usage
-----

``` bash
git clone https://github.com/thibauts/require.git
cd require
npm install
make
python -m SimpleHTTPServer
```

Then direct you browser to `http://localhost:8000/` and check the console.