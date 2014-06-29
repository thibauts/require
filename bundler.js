var fs = require('fs');
var combine = require('combine-source-map');
var convert = require('convert-source-map');
var dirname = require('path').dirname;

var filenames = process.argv.slice(2);
var inline = false;

var map = combine.create();
var currentLine = 0;

filenames.forEach(function(filename) {
  var text = fs.readFileSync(filename, 'utf-8').trim();

  var prepend  = 'register(' + JSON.stringify(filename) + ', (function(module, exports, require) {\n';
  var append    = '\n}));\n';

  process.stdout.write(prepend);
  currentLine += prepend.match(/\n/g).length;

  var sourceMap = convert.fromSource(text) || convert.fromMapFileSource(text, dirname(filename));
  if(sourceMap) {
    var o = sourceMap.toObject();
    o.sourcesContent = o.sources.map(function(filename) {
      return fs.readFileSync(filename, 'utf-8');
    });

    comment = convert.fromObject(o).toComment();
    text = convert.removeMapFileComments(text);
    text = convert.removeComments(text);
    text = text.trim();
  } else {
    comment = '';
  }
  
  map.addFile(
    { sourceFile: filename, source: text + '\n' + comment },
    { line: currentLine }
  );

  process.stdout.write(text);
  currentLine += text.match(/\n/g).length;

  process.stdout.write(append);
  currentLine += append.match(/\n/g).length;
});

if(inline) {
  var comment = convert.fromBase64(map.base64()).toComment();
  process.stdout.write(comment);
} else {
  fs.writeFileSync('bundle.map', convert.fromBase64(map.base64()).toJSON());
  process.stdout.write('//# sourceMappingURL=' + 'bundle.map');
}

