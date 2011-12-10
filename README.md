# Tapper

Tapper (aka tapr) is a node.js tap test runner which allows stdout and stderr mixed in with the tap output. Also tapper adds color to the output. Core based on Isaac Z Schlueter original tap runner.

For a nice description of node.js Tap tests, see Isaac's readme on the node-tap github page <https://github.com/isaacs/node-tap>

Isaac designed his Tap implementation to be modular for easy consumation and extension. Tapr customizes the runner component and uses the rest of node-tap as is.

Because Tap is modular, it is designed to be consumed in many ways (like automated build tools, customized runners) and other testing frameworks can provide producers to provide tap input.



## Goals

 - More concise formatting of tap output (easier to find what you care about)
 - Improve ability to write to stdout and stderr from tests or code
 - Add optional colorized output

## Installing

```bash
  npm install tapr  # install locally
  # OR
  npm install -g tapr  # install globally
```

OR

Add to your project package.json

```javascript
  "devDependencies": {
    "tapr" : "~0.1.2"
    }
```

Also you will want to either add "tap" as a devDependency to use in your tests

OR

In your tests use the tap that is available off of tapr

```javascript
  // in your test file
  var test = require('tapr').tap.test
```


Then npm install your package with dev dependencies from the project directory

```bash
  npm install
```

OR

Pull from github - http://github.com/jeffbski/tapper

## Usage

```bash
  node_modules/.bin/tapr.js fileOrDir   # if installed locally
  #OR
  tapr fileOrDir  # if installed globally
  #
  tapr                                     # display usage
  tapr --help                         # display usage
  tapr --version                    # display version
  tapr --no-color fileOrDir   # run without color output
```

## Status

 - v0.1.2 - 2011-12-10 - improve readme and description
 - v0.1.1 - 2011-12-08 - change stdout/stderr to always output, not just for failed tests
 - v0.1.0 - 2011-11-28 - tapr - change bin/tapper to bin/tapr for convenient typing. tapr is also short for tap runner
 - v0.0.6 - 2011-11-22 - Tapper is based on the original tap code with minor changes. The runner will evolve with features as time permits but appears to be fully functional.

## Screenshots

### Successful example where all tests are passing

Stderr and stdout is muted except for files which have a failing test

![success-tapr](http://github.com/jeffbski/tapper/raw/master/doc/success-tapr.png)

### Failure example with some failures and stdout

 - Green - successful tests and files
 - Red - failed tests and files
 - Blue - test names

![failed-tapr](http://github.com/jeffbski/tapper/raw/master/doc/failed-tapr.png)

### Original tap runner success

![success-tap](http://github.com/jeffbski/tapper/raw/master/doc/success-tap.png)

### Original tap runner failure

![failed-tap](http://github.com/jeffbski/tapper/raw/master/doc/failed-tap.png)

## Limitations

 - stdout logging that looks like tap output (ok, not ok, #) will not be displayed unless errors in file, however all stderr logging will be displayed regardless so it is recommended.
 - stdout/stderr appears before the test names and asserts due to how tap currently outputs data
 - Asserts are summarized at the bottom

## License

 - [MIT license](http://github.com/jeffbski/tapper/raw/master/LICENSE)

## Contributors

 - Modifications by author: Jeff Barczewski (@jeffbski)
 - Original code Isaac Z. Schlueter <i@izs.me> http://blog.izs.me

## Contributing

 - Source code repository: http://github.com/jeffbski/tapper
 - Ideas and pull requests are encouraged  - http://github.com/jeffbski/tapper/issues
 - You may contact me at @jeffbski or through github at http://github.com/jeffbski
