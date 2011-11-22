module.exports = Runner

var fs = require("fs")
  , child_process = require("child_process")
  , path = require("path")
  , chain = require("slide").chain
  , inherits = require("inherits")


var tap = require("tap");
var TapProducer = tap.Producer;
var TapConsumer = tap.Consumer;
var assert = tap.assert;

var clc = require('cli-color');
var util = require('util');

inherits(Runner, TapProducer)

function Runner (dir, diag, cb) {
  Runner.super.call(this, diag)

  if (dir) this.run(dir, cb)
}

Runner.prototype.run = function () {
  var self = this
    , args = Array.prototype.slice.call(arguments)
    , cb = args.pop() || function (er) {
        if (er) self.emit("error", er)
        self.end()
      }
  if (Array.isArray(args[0])) args = args[0]
  self.runFiles(args, "", cb)
}

Runner.prototype.runDir = function (dir, cb) {
  var self = this
  fs.readdir(dir, function (er, files) {
    if (er) {
      self.write(assert.fail("failed to readdir "+dir,
                           { error: er }))
      self.end()
      return
    }
    files = files.sort(function (a,b) {return a>b ? 1 : -1})
    files = files.filter(function (f) {return !f.match(/^\./)})
    files = files.map(path.resolve.bind(path, dir))

    self.runFiles(files, path.resolve(dir), cb)
  })
}

Runner.prototype.runFiles = function (files, dir, cb) {

  var self = this
  chain(files.map(function (f) { return function (cb) {
    var relDir = dir || path.dirname(f)
      , fileName = relDir === "." ? f : f.substr(relDir.length + 1)

    self.write(fileName)
    fs.lstat(f, function (er, st) {
      if (er) {
        self.write(assert.fail("failed to stat "+f,
                               {error: er}))
        return cb()
      }

      var cmd = f
        , args = []

      if (path.extname(f) === ".js") {
        cmd = "node"
        args = [fileName]
      } else if (path.extname(f) === ".coffee") {
        cmd = "coffee"
        args = [fileName]
      }
      if (st.isDirectory()) {
        return self.runDir(f, cb)
      }

      var env = {}
      for (var i in process.env) env[i] = process.env[i]
      env.TAP = 1

      var cp = child_process.spawn(cmd, args, { env: env, cwd: relDir })
        , out = ""
        , err = ""
        , tc = new TapConsumer
        , childTests = [f]

      tc.on("data", function (c) {
        self.emit("result", c)
        self.write(c)
      })

      cp.stdout.pipe(tc)
      cp.stdout.on("data", function (c) { out += c }); 
      cp.stdout.on("data", function (c) {
        var lines = c.toString().split('\n');
        var filtered = lines.filter(function (l) { return (! /^\s{4}|^\s{2}-{3}|^\s{2}\.{3}/.test(l)); });
        var colorLines = filtered.map(function (x) {
          return (/^ok/.test(x)) ? clc.green(x) :
                  (/^not ok/.test(x)) ? clc.red(x) : x;
        });
        err += colorLines.join('\n');
      }); //Copy our stdout non-tap msgs to stderr
      cp.stderr.on("data", function (c) { err += c })

      cp.on("exit", function (code) {
        //childTests.forEach(function (c) { self.write(c) })
        var res = { name: fileName
                  , ok: !code }
        if (err) {
          res.stderr = err;
          if (tc.results.ok && tc.results.tests === 0) {
            // perhaps a compilation error or something else failed...
            console.error(err)
          }
        }
        res.command = [cmd].concat(args).map(JSON.stringify).join(" ")
        self.emit("result", res)
        self.emit("file", f, res, tc.results)
        self.write(res)
        self.write("\n")
        cb()
      })
    })
  }}), cb)

  return self
}
