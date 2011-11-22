
var test = require('tap').test;

test('simple test', function (t) {
  t.plan(2);
  console.log('this should be logged to stdout');
  console.error('this should go to stderr');
  t.ok(true);
  t.equal(true, true);
  t.end();
});


test('another simple test', function (t) {
  console.log('more logging to stdout');
  console.error('another log to stderr');
  t.ok(true);
  t.equal('foo', 'foo');
  t.end();
});

