const express = require('express')
const router = express.Router()
const APIroutes = require('./APIroute')
const users = require('./user')

router.use('/users', users)
router.use('/api', APIroutes)

// router.use('/users', users)

module.exports = router