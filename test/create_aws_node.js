/* eslint-env mocha */
'use strict'

const assert = require('yeoman-assert')
const helpers = require('yeoman-test')
const path = require('path')

describe('create_aws_node', () => {
  let helperPromise

  beforeEach(() => {
    helperPromise = helpers
      .run(path.resolve(__dirname, '../generators/create_aws_node'))
      .withPrompts({ serviceName: 'test-service', serviceDescription: 'A test service' })
  })

  it('copies the .babelrc file', () =>
    helperPromise.then(() => assert.file(['test-service/.babelrc']))
  )

  it('copies the .editorconfig file', () =>
    helperPromise.then(() => assert.file(['test-service/.editorconfig']))
  )

  it('copies the .nvmrc file', () =>
    helperPromise.then(() => assert.file(['test-service/.nvmrc']))
  )

  it('copies the handler.js file', () =>
    helperPromise.then(() => assert.file(['test-service/handler.js']))
  )

  it('copies the package.json template file', () =>
    helperPromise.then(() => assert.file(['test-service/package.json']))
  )

  it('copies the serverless.yml template file', () =>
    helperPromise.then(() => assert.file(['test-service/serverless.yml']))
  )

  it('copies the webpack.config.js file', () =>
    helperPromise.then(() => assert.file(['test-service/webpack.config.js']))
  )

  it('adds the service name to package.json', () =>
    helperPromise.then(() => assert.fileContent('test-service/package.json', '"name": "test-service"'))
  )

  it('adds the service description to package.json', () =>
    helperPromise.then(() => assert.fileContent('test-service/package.json', '"description": "A test service"'))
  )

  it('adds the service name to serverless.yml', () =>
    helperPromise.then(() => assert.fileContent('test-service/serverless.yml', 'service: test-service'))
  )
})
