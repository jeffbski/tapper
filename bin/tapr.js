#!/usr/bin/env node

var sprintf = require('sprintf').sprintf;
var clc = require('cli-color');
var optimist = require('optimist');

var VERSION = '0.1.2';

var argv = optimist.usage('Usage: $0 path [path2 pathN] {OPTIONS}', {
  'help': {
    description: 'Show this usage screen',
    boolean: true,
    short: 'h'
  },
  'version': {
    description: 'Display version and exit',
    boolean: true,
    short: 'v'
  },
  'color': {
    description: 'Use color for output, --no-color to disable',
    boolean: true,
    default: true,
  }
}).argv;

if (argv.version) {
  console.log(VERSION);
  process.exit(0);
}

if (!argv._.length) {
  optimist.showHelp();
  process.exit(1);
}

var path = require("path");
var Runner = require("../lib/tapper");
var TapProducer = require("tap").Producer;
var r = new Runner(argv._, argv);
var colorize = argv.color;

r.on("file", function (file, results, details) {
  var s = (details.ok ? "" : "not ") + "ok "+results.name
  , n = details.pass + "/" + details.testsTotal
  , dots = new Array(Math.max(1, 40 - s.length - n.length)).join(".")
  var sdotsn = sprintf("%s %s %s", s, dots, n);
  if (details.ok) {
    if (colorize) sdotsn = clc.green(sdotsn);
    console.log(sdotsn);
    if (details.skip) {
      console.log("  skipped: %s", details.skipTotal)
    }
    if (results.nonTapOutAndErr && results.nonTapOutAndErr.trim()) console.error(results.nonTapOutAndErr);
  } else {
    if (colorize) sdotsn = clc.red(sdotsn);
    console.log(sdotsn);
    if (results.fullOutAndErr && results.fullOutAndErr.trim()) console.error(results.fullOutAndErr);
    console.error(formatFailedAsserts(details));
    //console.error(details)
    //      console.log("    Command: %s", results.command)
    //      console.log("    " + TapProducer.encode(details.list)
    //                  .split(/\n/).join("\n    "))
  }
})
r.on("end", function () {
  //console.log(r)
  var s = "total"
  , n = r.results.pass + "/" + r.results.testsTotal
  , dots = new Array(40 - s.length - n.length).join(".")
  , ok = r.results.ok ? "ok" : "not ok"
  var sdots = sprintf("%s %s %s\n\n%s", s, dots, n, ok);
    if (colorize) {
      if (r.results.ok) sdots = clc.green(sdots);
      else sdots = clc.red(sdots);
    }
  console.log(sdots);
  // process.stdout.flush()
})




r.on("end", function () {
  process.exit(r.results.tests - r.results.pass)
})


function formatFailedAsserts(details) {
  if (!details || !details.list) return '';
  var failed = details.list.filter(function (x) { return (!x.ok); });
  var msgs = failed.map(function (x) {
    var msg, stack;
    if (x.thrown) {
      msg = sprintf('Error thrown: %s "%s" \n\tcode: %s, errno: %s\n', x.type, x.message, x.code, x.errno);
      stack = '  ' + x.stack.join('\n  '); // indent stack lines by two spaces
    } else { //normal assertion failure
      msg = sprintf('Assert: "%s", \n\t found: %s \n\twanted: %s', x.name, x.found, x.wanted);
      stack = sprintf('\n\t%s:%s', x.file, x.line);
    }
    if (colorize) msg = clc.red(msg);
    return msg + stack;
  });
  msgs.push(''); //cause newline
  return msgs.join('\n');
}