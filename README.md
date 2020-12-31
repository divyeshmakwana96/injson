injson
======

Command line utility to build json using nested json files.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/injson.svg)](https://npmjs.org/package/injson)
[![Downloads/week](https://img.shields.io/npm/dw/injson.svg)](https://npmjs.org/package/injson)
[![License](https://img.shields.io/npm/l/injson.svg)](https://github.com/divyeshmakwana/injson/blob/master/package.json)

* [Installation](#installation)
* [Format](#format)

# Installation
```sh-session
$ npm install -g injson
```

# Format
You can use `!include('./path-to-json/item1.json')`

### Example usage:

```json
{
  "pi": 3.141,
  "happy": true,
  "questions:": [
    "!include('./questions/item1.json')"
  ],
  "answer": {
    "everything": 42
  }
}
```

# Command
```sh-session
$ injson input.json output.json -m
```

-m parameter is optional and will export json as minified.
