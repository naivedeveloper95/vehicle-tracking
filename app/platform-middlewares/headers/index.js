'use strict'


module.exports = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
  res.header('Access-Control-Expose-Headers', 'organizationId, cardConfigVersion')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, x-access-token, x-email-id, x-device-id, x-device-token, x-device-type, role, role-region, admin, user-id, type, userid,password')
  if (req.method === 'OPTIONS') { return res.sendStatus(200) }
  next()
}
