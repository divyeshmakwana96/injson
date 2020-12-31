import {Command, flags} from '@oclif/command'

const path = require('path')
const jsonfile = require("jsonfile")
const _ = require("lodash")

const regex = RegExp('^!include\\(([\'"]?)[^\'")]+\\1\\)')
const prettyJsonOptions = { spaces: 4 }

// class
class Injson extends Command {
  static description = 'describe the command here'

  static flags = {
    minify: flags.boolean({
      char: 'm',
      default: false,
      description: 'minify json'
    })
  }

  static args = [
    {
      name: 'input',
      required: true,
      description: 'input file'
    },
    {
      name: 'output',
      required: true,
      description: 'output file'
    }
  ]

  async run() {
    const {args, flags} = this.parse(Injson)

    try {
      let dependencyLookup: string[] = []
      let parsed = this.resolveJson(args.input, dependencyLookup)
      
      let options = flags.minify ? null : prettyJsonOptions
      jsonfile.writeFileSync(args.output, parsed, options)

    } catch (error) {
      console.error(error)
    }    
  }

  resolveJson(file: string, lookup: string[]): any {

    if (_.includes(lookup, file)) {
      throw new Error("Circular dependancies detected.")
    }

    // we need a record to avoid circular dependancies
    lookup.push(file)

    let output = jsonfile.readFileSync(file, {
      reviver: (key: any, value: any) => {

        if (_.isString(value) && regex.test(value)) {

          let matches = value.match(/\(([^)]+)\)/) // get content between the parentheses
          let dependancy =  matches[1].replace(/['"]+/g, '') // strip out any qoutes
          
          let dependancyPath = path.join(path.dirname(file), dependancy)
          return this.resolveJson(dependancyPath, lookup)
          
          // return original value
        } else {
          return value
        }
      }
    })

    // clean up
    _.remove(lookup, (path: string) => { return path == file })

    return output
  }
}

export = Injson
