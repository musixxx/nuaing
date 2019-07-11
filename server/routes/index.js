const express = require('express')
const router = express.Router()
const users = require('./user')
const APIroutes = require('./APIroute')

router.use('/users', users)
router.use('/api', APIroutes)

module.exports = router