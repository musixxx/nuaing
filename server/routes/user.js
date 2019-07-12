const express = require('express')
const Router = express.Router()
const UserController = require('../controllers/userController')

Router.post('/signup', UserController.signup)
Router.post('/signin', UserController.signin)
Router.post('/g-sigin', UserController.googleSignin)

module.exports = Router