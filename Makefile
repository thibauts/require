
all: bundle.min.js

%.js: %.coffee
	coffee -cm $<

clean:
	rm -f bundle.min.js bundle.min.map bundle.js bundle.map baz.js baz.map

bundle.js: foo.js bar.js baz.js
	node bundler.js $^ > $@

bundle.min.js: bundle.js
	uglifyjs $< --in-source-map bundle.map --source-map bundle.min.map -cm > $@

.PHONY: all clean