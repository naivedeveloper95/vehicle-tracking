'use strict'

const express = require('express');
const router = express.Router();
const vehicles = require("../controllers/vehicles");

router.post('/create_log', vehicles.create);
router.get('/fetch_logs', vehicles.fetch);

module.exports = router

