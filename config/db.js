const config = require(__dirname + '/index.js');
const mongodb = require('mongodb').MongoClient

module.exports.init = () => {
  return new Promise((resolve, reject) => {
    mongodb.connect(config.databaseUrl,
      { useNewUrlParser: true, useUnifiedTopology: true },
      (err, db) => {
        if (err) {
          reject(err);
        } else {
          const client = db.db(`${config.databaseName}`)
          resolve(client);
        }
      })
  });
}