const router = require('express').Router()
const APIroutes = require('./APIroute')
const users = require('./user')

router.use('/api', APIroutes)
router.use('/users', users)

module.exports = router
