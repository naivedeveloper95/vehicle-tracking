'use strict'

const express = require('express')
  , config = require(process.cwd() + '/config')
  , appDir = config.appDir
  , router = express.Router()
  , middlewares = require(process.cwd() + '/app/platform-middlewares')
  , User = require(process.cwd() + '/app/controllers/auth.js')
  , Roles = require(process.cwd() + '/app/controllers/roles.js')
  , RoleGroup = require(process.cwd() + '/app/controllers/roleGroup.js')
  , companies = require(`${process.cwd()}/app/controllers/companies.js`)
  , gmodules = require(`${process.cwd()}/app/controllers/gmodules.js`)
  , auditlog = require(`${process.cwd()}/app/controllers/auditlogs.js`)
  , contracts = require(`${process.cwd()}/app/controllers/contracts.js`)
  , DnO = require(`${process.cwd()}/app/controllers/DnO.js`)
  , DocumentDetails = require(`${process.cwd()}/app/controllers/documentDetails.js`)
  , Users = require(`${process.cwd()}/app/controllers/users.js`)
  , DocumentLibrary = require(`${process.cwd()}/app/controllers/documentLibrary.js`)
  , Processes = require(`${process.cwd()}/app/controllers/processes.js`)
  , relationship = require(`${process.cwd()}/app/controllers/relationship.js`)
  , industry = require(`${process.cwd()}/app/controllers/industry.js`)
  , timezone = require(`${process.cwd()}/app/controllers/timezones.js`)
  , country = require(`${process.cwd()}/app/controllers/country.js`)
  , action = require(`${process.cwd()}/app/controllers/action-items.js`)
  , issues = require(`${process.cwd()}/app/controllers/issue-mgmt.js`)
  , contractIntpn = require(`${process.cwd()}/app/controllers/contractInterpretation.js`)
  , meetings = require(`${process.cwd()}/app/controllers/meetings.js`)
  // dashboardController = require("../controllers/candidateDashboard"),
  , auditlogs = require(process.cwd() + '/app/platform-middlewares')['auditlog']
  , govBody = require(process.cwd() + '/app/controllers/governenceBody.js')
  , sla = require(process.cwd() + '/app/controllers/sla.js')
  , milestone = require(process.cwd() + '/app/controllers/milestone.js')
  , UserConfig = require(process.cwd() + '/app/controllers/configuration.js')
  , mail = require(process.cwd() + '/app/controllers/mailer.js')

// console.log('inside routes')

router.post('/register', User.register)
router.post('/authenticate', User.authenticate)
router.get('/forgotpassword', User.forgotPasswordPage)
router.post('/forgotpassword', User.forgotPassword)
router.get('/accountverification', User.accountVerification)
// Modules Controller
router.get('/gmodule', gmodules.findOne)
router.get('/gmodules', gmodules.findMany)
// AuditLogs
router.post('/auditlogs', auditlog.findMany)
router.post('/sendmail', User.sendMailToUser)

// route middleware to verify a token
router.use(middlewares.authentication)
router.use(auditlogs)


// Company Controller
router.post('/companies', companies.createCompany)
router.put('/companies', companies.updateCompany)
router.get('/companies/:id', companies.findOneCompany)
router.get('/companies', companies.findManyCompany)
router.delete('/companies/:id', companies.delete)
//Changes in user profile after authentication
router.get('/logout', User.logout)
router.post('/changepassword', User.changePassword)
//Roles
router.get('/roles', Roles.getAll)
router.get('/roles/name/:name', Roles.getOne)
router.post('/roles', Roles.create)
router.put('/roles/name/:name', Roles.update)
router.delete('/roles/name/:name', Roles.delete)
//Role groups
router.get('/rolegroups', RoleGroup.get)
router.post('/rolegroups', RoleGroup.create)
router.put('/rolegroups', RoleGroup.update)
router.delete('/rolegroups/:id', RoleGroup.delete)
//Document Library file operations
router.get('/documents/file/:id', DocumentLibrary.download)
router.post('/upload', DocumentLibrary.upload)
router.delete('/delete/:documentId', DocumentLibrary.deleteDocument)
router.get('/files', DocumentLibrary.getFiles)
router.get('/files/:id', DocumentLibrary.getFileById)
//Document Library
router.get('/documents/types', DocumentLibrary.getAllTypes)
router.get('/documents', DocumentLibrary.getAll)
router.get('/documents/:documentId', DocumentLibrary.getOne)
router.post('/documents', DocumentLibrary.create)
router.put('/documents/:documentId', DocumentLibrary.update)
router.delete('/documents/:documentId', DocumentLibrary.delete)
//Document Details
router.get('/documentdetails', DocumentDetails.getAll)
router.get('/documentdetails/:fileId', DocumentDetails.getOne)
router.post('/documentdetails', DocumentDetails.create)
router.put('/documentdetails', DocumentDetails.update)
router.delete('/documentdetails/:fileId', DocumentDetails.delete)

//Users
router.get('/users', Users.getAll)
router.post('/users', Users.create)
router.get('/users/:userId', Users.getOne)
router.put('/users/:userId', Users.update)
router.delete('/users/:userId', Users.delete)
router.get('/users/:orgId', Users.getOrgUsers)
//Process and Roles
router.get('/process', Processes.get)
// router.get('/process/:id', Processes.getOne)
router.post('/process', Processes.create)
router.delete('/process/:id', Processes.delete)
//Contract
router.get('/contract', contracts.getAll)
router.get('/contract/:contractId', contracts.getOne)
router.post('/contract', contracts.create)
router.put('/contract/:contractId', contracts.update)
router.delete('/contract/:contractId', contracts.delete)

//Create Relationship
router.post('/relationship', relationship.create)
router.get('/relationship', relationship.get)
router.put('/relationship', relationship.update)
router.delete('/relationship/:relationId', relationship.delete)

// Industry
router.get('/industry/:id', industry.findOne)
router.post('/industries', industry.findMany)
router.get('/status', industry.get)

// Country
router.get('/country/:id', country.findOne)
router.post('/countries', country.findMany)
router.get('/countries/:id', country.findCountriesByRegion)
router.get('/countries', country.findCountries)
router.get('/regions', country.findRegions)

//DNO
router.get('/dno/categories', DnO.getAllCategories)
router.get('/dno/phases', DnO.getAllPhases)
router.post('/dno', DnO.create)
router.get('/dno', DnO.get)
router.put('/dno', DnO.update)
router.delete('/dno/:id', DnO.delete)
router.get('/dno/:masterId/childs', DnO.getChildren)
router.get('/dno/childs', DnO.getAllChild)

//Action Items
router.post('/actions', action.create)
router.get('/actions', action.get)
router.put('/actions', action.update)
router.delete('/actions/:id', action.delete)
router.get('/actions/:masterId/childs', action.getChildren)
router.get('/actions/childs', action.getAllChild)

//Issue Management
router.post('/issue', issues.create)
router.get('/issue', issues.get)
router.put('/issue', issues.update)
router.delete('/issue/:id', issues.delete)

// TimeZone
router.get('/timezone/:id', timezone.findOne)
router.post('/timezones', timezone.findMany)

router.post('/contractIntpn', contractIntpn.create)
router.get('/contractIntpn', contractIntpn.get)
router.put('/contractIntpn', contractIntpn.update)
router.delete('/contractIntpn/:Id', contractIntpn.delete)

//Meetings
router.post('/meetings', meetings.create)
router.get('/meetings', meetings.get)
router.put('/meetings', meetings.update)
router.delete('/meetings/:Id', meetings.delete)
router.get('/meetings/:masterId/childs', meetings.getChildren)
router.get('/meetings/childs', meetings.getAllChild)

//Governence Body
router.post('/govbodies', govBody.create)
router.get('/govbodies', govBody.get)
router.put('/govbodies', govBody.update)
router.delete('/govbodies/:Id', govBody.delete)

//SLA
router.post('/sla', sla.create)
router.get('/sla', sla.get)
router.put('/sla', sla.update)
router.delete('/sla/:id', sla.delete)
router.get('/sla/:masterId/childs', sla.getChildren)
router.get('/sla/childs', sla.getAllChild)

//Milestones
router.post('/milestone', milestone.create)
router.get('/milestone', milestone.get)
router.put('/milestone', milestone.update)
router.delete('/milestone/:id', milestone.delete)
router.get('/milestone/:masterId/childs', milestone.getChildren)
router.get('/milestone/childs', milestone.getAllChild)
//Widget data
router.get('/metrics/dno', DnO.metric)
router.get('/metrics/actions', action.metric)
router.get('/metrics/issue', issues.metric)
router.get('/metrics/meetings', meetings.metric)
router.get('/metrics/contractIntpn', contractIntpn.metric)
router.get('/metrics/sla', sla.metric)
router.get('/metrics/milestone', milestone.metric)

//List Preference
router.get('/listpreference', industry.getListPreference)
router.post('/listpreference', industry.update)
router.get('/preference', industry.preference)
//Dashboard config, user specific
router.get('/config/dashboard', UserConfig.getDashConfig)
// Save option update the existing if present if not then create new for the same user
router.post('/config/dashboard', UserConfig.saveDashConfig)
//GET SLA config user based
router.get('/slaConfig', UserConfig.getSlaConfig)
//Save SLA config user based
router.post('/slaConfig', UserConfig.saveSlaConfig)

//Get all mails
router.get('/mails', mail.get)
module.exports = router

