const config = require(__dirname + '/index.js');
const { MongoClient } = require('mongodb');

const { environmentOptions } = config;
const { database } = environmentOptions;
const { path, name } = database;

const client = new MongoClient(path, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports.init = () => {
  return new Promise((resolve, reject) => {
    client.connect().then((db) => {
      resolve(db.db(name));
    }).catch(error => reject(error));
  });
}