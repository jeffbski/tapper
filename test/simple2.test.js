
var test = require('tap').test;

test('another simple test', function (t) {
  //uncomment next line to see the logging, logs show up when file has errors
  //t.equal('foo', 'bar', 'purposefully making this fail for example');
  t.equal(true, true);
  console.error('I will log to stderr here.');
  t.end();
});



