let AWTCommons = require('awt-commons')
  , AWTError = AWTCommons.AWTError
  , collectionName = 'companies'
  , _ = require('lodash')


module.exports.insert = async (company, options) => {
  let db = options.db
    , logger = options.logger
  try {
    return db.collection(collectionName).insert(company)
  } catch (error) {
    logger.error(error)
  }
}

module.exports.update = async (selectionCriteria, company, options) => {
  let db = options.db
    , logger = options.logger
  try {
    return db.collection(collectionName).update(selectionCriteria, company)
  } catch (error) {
    logger.error(error)
  }
}

module.exports.findOne = async (selectionCriteria, options) => {
  let db = options.db
    , logger = options.logger
  try {
    return db.collection(collectionName).findOne(selectionCriteria)
  } catch (error) {
    logger.error(error)
  }
}

module.exports.findMany = (selectionCriteria, options) => new Promise((resolve, reject) => {
  let db = options.db
  let pageSize = parseInt(options.pageSize) || 10
  let page = parseInt(options.page) || 1
  if (page > 0 && page !== 0) {
    try {
      let pipeLine = [{ '$match': selectionCriteria }, { '$sort': { '_displayId': 1.0 } }, { '$facet': { 'pageDetails': [{ '$count': 'total' }, { '$addFields': { 'page': page } }], 'data': [{ '$skip': ((pageSize * page) - pageSize) }, { '$limit': pageSize }] } }]
      db.collection(collectionName).aggregate(pipeLine, (err, list) => { if (err) { reject(err) } if (list) { resolve(list[0]) } })
    } catch (error) { reject(error) }
  } else { reject('Page cannot be a less than zero.') }
})