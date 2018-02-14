#!/usr/bin/env node
const childProcess = require('child_process')
const program = require('commander')

program
  .version('0.1.0')

  .option('testcafe', 'testcafe')

  .option('-b, --browser [type]', 'Define browser', 'chrome')
  .option('-e, --environment [type]', 'Define environment', 'development')
  .option('-f, --file [type]', 'Define file', '')

  .parse(process.argv);

const { testcafe } = program

if (testcafe) {
  const { browser, environment, file } = program
  const command = `NODE_ENV=${environment} testcafe ${browser} ${environment === 'development' ? '-d' : ''} testcafe/${file}`
  childProcess.execSync(command, { stdio: [0, 1, 2] })
}