
var test = require('tap').test;

test('simple test', function (t) {
  //uncomment next line to see the logging, logs show up when file has errors
  //t.fail('failing so we can see the logs'); 
  console.log('this should be logged to stdout');
  console.error('this should go to stderr');
  t.ok(true);
  t.equal(true, true);
  t.end();
});


test('another simple test', function (t) {
  t.plan(2);
  console.log('more logging to stdout');
  console.error('another log to stderr');
  t.ok(true);
  t.equal('foo', 'foo');
  t.end();
});

test('showing some deeper stderr logging by inspect on tap.test', function (t) {
  console.error(t);
  t.ok(true);
  t.equal('foo', 'foo');
  t.end();
});

test('showing some deeper stdout logging by inspect on tap.test', function (t) {
  console.log(t);
  t.ok(true);
  t.equal('foo', 'foo');
  t.end();
});

