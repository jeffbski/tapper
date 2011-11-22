# Tapper

Tapper is a tap runner which allows stdout and stderr mixed in with the tap output. Also tapper adds color to the output. Core based on Isaac Z Schlueter original tap runner.


## Goals

 - Improve ability to write to stdout and stderr from tests or code
 - Output is muted for successful tests, but displayed for failing tests
 - Add colorized output


## Installing

```bash
  npm install https://github.com/jeffbski/tapper/tarball/v0.0.1
  # OR
  npm install -g https://github.com/jeffbski/tapper/tarball/v0.0.1  # to install globally
```    

OR 
   
Pull from github - http://github.com/jeffbski/tapper

## Usage

```bash
  bin/tapper.js fileOrDir   # if installed locally
  #OR
  tapper fileOrDir  # if installed globally
```  

## Status

 - 2011-11-22 - Tapper is based on the original tap code with minor changes. The runner will evolve with features as time permits but appears to be fully functional.

## License

 - [MIT license](http://github.com/jeffbski/tapper/raw/master/LICENSE)

## Contributors

 - Author: Jeff Barczewski (@jeffbski)

## Contributing

 - Source code repository: http://github.com/jeffbski/tapper
 - Ideas and pull requests are encouraged  - http://github.com/jeffbski/tapper/issues
 - You may contact me at @jeffbski or through github at http://github.com/jeffbski
