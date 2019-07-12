const User = require('../models/user')
const Helper = require('../helpers/helper')

class UserController {
    static signup(req, res) {
        let option = {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        }
        User.create(option)
            .then((data) => {
                res.status(201).json(data)
            })
            .catch(err => {
                console.log('err: ', err);
                res.status(500).json({
                    message: 'Internal Server Error'
                })
            })
    }

    static signin(req, res) {
        User.findOne({
            email: req.body.email
        })
            .then(user => {
                if (user) {
                    if (Helper.comparePassword(req.body.password, user.password)) {
                        let payload = {
                            id: user.id,
                            username: user.username,
                            email: user.email
                        }
                        let genToken = Helper.generateJWT(payload)
                        res.status(200).json({
                            token: genToken
                        })
                    } else {
                        res.status(404).json({
                            message: 'invalid username/password'
                        })
                    }
                } else {
                    res.status(404).json({
                        message: 'invalid username/password'
                    })
                }
            })
            .catch(err => {
                console.log('err: ', err);
                res.status(500).json(err)
            })
    }
}


module.exports = UserController