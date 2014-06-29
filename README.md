### Experiments with module loading in the browser

Allows async require of remote modules over http through `require(url, callback)`. Modules can be preloaded / prebundled with `bundler.js`. Implements caching of already loaded modules. Cached / preloaded modules can be required synchronously through `var mymodule = require('mymodule')`. `bundler.js` has full support for source-maps, including combining them on multiple levels (ie. work with coffee files).

This is a work in progress and the API is still lacking (eg. no way to dynamically preload bundles yet).

Usage
-----

Clone the repo, run `make` in the project directory and then `python -m SimpleHTTPServer`. Direct your browser to localhost on port 8000 and check the console.
