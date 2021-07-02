'use strict'

const isThere = require('is-there');
const currentEnv = process.env.NODE_ENV || 'development';
const envFilePath = __dirname + '/env/' + currentEnv + '.js';
let environmentOptions = null;

if (!isThere(envFilePath)) { console.log('Environment file missing!') }
else { environmentOptions = require(envFilePath) }
module.exports = {
  port: environmentOptions.server.port,
  serverHost: environmentOptions.server.host + ':' + environmentOptions.server.port,
  databaseUrl: environmentOptions.database.path + '/' + environmentOptions.database.name,
  databaseHost: environmentOptions.database.host,
  databasePort: environmentOptions.database.port,
  databaseName: environmentOptions.database.name,
  appDir: process.cwd()
}