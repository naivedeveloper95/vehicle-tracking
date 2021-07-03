'use strict'

const isThere = require('is-there');
const currentEnv = 'development';
const envFilePath = __dirname + '/env/' + currentEnv + '.js';
let environmentOptions = null;

if (!isThere(envFilePath)) { console.log('Environment file missing!') }
else { environmentOptions = require(envFilePath) }
module.exports = {
  environmentOptions,
  appDir: process.cwd()
}