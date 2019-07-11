const router = require('express').Router()
const APIroutes = require('./APIroute')

router.use('/api', APIroutes)

module.exports = router