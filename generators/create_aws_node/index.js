'use strict'

const Generator = require('yeoman-generator')

class CreateAwsNode extends Generator {
  constructor (args, opts) {
    super(args, opts)

    this.option('name', {
      description: 'Service name',
      type: String
    })

    this.option('description', {
      description: 'Service description',
      type: String
    })

    this.props = {
      serviceName: this.options.name,
      serviceDescription: this.options.description
    }
  }

  async prompting () {
    let prompts = []

    if (!this.props.serviceName) {
      prompts.push({
        type: 'input',
        name: 'serviceName',
        message: 'Service name'
      })
    }

    if (!this.props.serviceDescription) {
      prompts.push({
        type: 'input',
        name: 'serviceDescription',
        message: 'Service description'
      })
    }

    const promise = prompts ? this.prompt(prompts) : Promise.resolve(this.props)

    return promise.then(answers => {
      this.props = Object.assign({}, this.props, answers)
    })
  }

  default () {
    this.props.serviceName = this.props.serviceName.toLowerCase()
  }

  _destinationPath (filename) {
    return this.destinationPath(`${this.props.serviceName}/${filename}`)
  }

  writing () {
    const data = {
      serviceName: this.props.serviceName,
      serviceDescription: this.props.serviceDescription
    }

    this.fs.copy(this.templatePath('_babelrc'), this._destinationPath('.babelrc'))
    this.fs.copy(this.templatePath('_editorconfig'), this._destinationPath('.editorconfig'))
    this.fs.copy(this.templatePath('_nvmrc'), this._destinationPath('.nvmrc'))
    this.fs.copy(this.templatePath('handler.js'), this._destinationPath('handler.js'))
    this.fs.copy(this.templatePath('webpack.config.js'), this._destinationPath('webpack.config.js'))

    this.fs.copyTpl(this.templatePath('package.json'), this._destinationPath('package.json'), data)
    this.fs.copyTpl(this.templatePath('serverless.yml'), this._destinationPath('serverless.yml'), data)
  }
}

module.exports = CreateAwsNode
