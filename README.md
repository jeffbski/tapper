# Tapper

Tapper (aka tapr) is a tap runner which allows stdout and stderr mixed in with the tap output. Also tapper adds color to the output. Core based on Isaac Z Schlueter original tap runner.


## Goals

 - More concise formatting of tap output (easier to find what you care about)
 - Improve ability to write to stdout and stderr from tests or code
 - stdout/stderr is muted for successful tests, but displayed for files with failing tests
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
    "tapper" : "~0.1.0"
    }
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

 - v0.1.0 - 2011-11-28 - tapr - change bin/tapper to bin/tapr for convenient typing. tapr is also short for tap runner
 - v0.0.6 - 2011-11-22 - Tapper is based on the original tap code with minor changes. The runner will evolve with features as time permits but appears to be fully functional.
 
## Screenshots

### Successful example where all tests are passing

Stderr and stdout is muted except for files which have a failing test

![success-tapr](http://github.com/jeffbski/tapper/raw/master/doc/success-tapr.png)

### Failure example with some failures and stdout

![failed-tapr](http://github.com/jeffbski/tapper/raw/master/doc/failed-tapr.png)

### Original tap runner success

![success-tap](http://github.com/jeffbski/tapper/raw/master/doc/success-tap.png)

### Original tap runner failure

![failed-tap](http://github.com/jeffbski/tapper/raw/master/doc/failed-tap.png)

## License

 - [MIT license](http://github.com/jeffbski/tapper/raw/master/LICENSE)

## Contributors

 - Modifications by author: Jeff Barczewski (@jeffbski)
 - Original code Isaac Z. Schlueter <i@izs.me> http://blog.izs.me

## Contributing

 - Source code repository: http://github.com/jeffbski/tapper
 - Ideas and pull requests are encouraged  - http://github.com/jeffbski/tapper/issues
 - You may contact me at @jeffbski or through github at http://github.com/jeffbski
