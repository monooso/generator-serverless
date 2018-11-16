'use strict'

const Generator = require('yeoman-generator')
const chalk = require('chalk')
const yosay = require('yosay')

class Serverless extends Generator {
  end () {
    this.log(yosay(`Run ${chalk.green('yo serverless --help')} to see the available Serverless generators`))
  }
}

module.exports = Serverless
