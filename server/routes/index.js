const express = require('express')
const router = express.Router()
const APIroutes = require('./APIroute')
const users = require('././user')

router.use('/api', APIroutes)

module.exports = router
