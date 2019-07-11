const User = require('../models/user')
const {
    generateToken
} = require('../helpers/jwt')
const {
    compare
} = require('../helpers/bcrypt')

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
                res.status(500).json({
                    message: 'Internal Server Error'
                })
            })

    }

    static signin(req, res) {
        User.findOne({
                where: {
                    username: req.body.username
                }
            })
            .then(user => {
                if (user) {
                    if (compare(req.body.password, user.password)) {
                        let payload = {
                            id: user.id,
                            username: user.username,
                            email: user.email
                        }
                        let genToken = generateToken(payload)
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
                res.status(500).json(err)
            })
    }

}


module.exports = UserController