#!/usr/bin/env node

var argv = process.argv.slice(2)
  , path = require("path")
  , Runner = require("../lib/tapper")
  , r = new Runner(argv, null)
  , TapProducer = require("tap").Producer

var sprintf = require('sprintf').sprintf;
var clc = require('cli-color');

if (process.env.TAP || process.env.TAP_DIAG) {
  r.pipe(process.stdout)
} else {
  r.on("file", function (file, results, details) {
    var s = (details.ok ? "" : "not ") + "ok "+results.name
      , n = details.pass + "/" + details.testsTotal
      , dots = new Array(Math.max(1, 40 - s.length - n.length)).join(".")
    var sdotsn = sprintf("%s %s %s", s, dots, n);
    if (details.ok) {
      console.log(clc.green(sdotsn));
      if (details.skip) {
        console.log("  skipped: %s", details.skipTotal)
      }
    } else {
      console.log(clc.red(sdotsn));
      if (results.stderr && results.stderr.trim()) console.error(results.stderr);
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
    if (r.results.ok) sdots = clc.green(sdots);
    else sdots = clc.red(sdots);
    console.log(sdots);
    // process.stdout.flush()
  })
}



r.on("end", function () {
  process.exit(r.results.tests - r.results.pass)
})


function formatFailedAsserts(details) {
  if (!details || !details.list) return '';
  var failed = details.list.filter(function (x) { return (!x.ok); });
  var msgs = failed.map(function (x) {
    return clc.red(sprintf('Assert: "%s", \n\t found: %s \n\twanted: %s', x.name, x.found, x.wanted)) +
      sprintf('\n\t%s:%s', x.file, x.line);
  });
  msgs.push(''); //cause newline
  return msgs.join('\n');
}