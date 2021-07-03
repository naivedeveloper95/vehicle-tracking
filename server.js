'use strict'

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const headers = require(process.cwd() + '/app/platform-middlewares')['headers'];
const config = require(__dirname + '/config');
const db = require(process.cwd() + '/config/db.js');
const appDir = config.appDir;

const { environmentOptions } = config;
const { server } = environmentOptions;
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ extended: true }))
app.set('port', process.env.PORT || server.port);
app.use(headers);

db.init().then(client => {
  app.use((req, res, next) => {
    let options = {
      db: client
    }
    req.headers.options = options
    next();
  })
  // removing below line which is causing auditlog middleware two time trigger because audit log is registered once in routes as well.
  // app.use(auditlogs)
  const server = app.listen(app.get('port'))
  console.info('Express server listening on port ' + server.address().port)

  app.get('/', (req, res) => {
    res.sendStatus(200)
  })

  app.use('/api/v1/', require(appDir + '/app/routes'))
  // This is special part only for react application using react-router
  // React router doesn't refresh the page with path param
  // Details can be checked at - https://tylermcginnis.com/react-router-cannot-get-url-refresh/
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'), err => {
      if (err) {
        res.sendStatus(500)
      }
    })
  })
}, err => {
  console.log(err)
})
module.exports = app //for testing
