const express = require('express')
const Router = express.Router()
const users = require('./user')

Router.use('/users', users)

module.exports = Router