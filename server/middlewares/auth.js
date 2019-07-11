const jwT = require('../helpers/jwt')
const {
    Todo
} = require('../models')
const jwt = require('jsonwebtoken')

function authentication(req, res, next) {
    if (req.headers.hasOwnProperty('token')) {
        if (jwT.verifyToken(req.headers.token)) {
            next()
        } else {
            res.status(401).json({
                message: 'Invalid'
            })
        }
    } else {
        res.status(403).json({
            message: 'UnAuthorize process'
        })
    }
}

function authorization(req, res, next) {
    const decode = jwt.decode(req.headers.token)
    Todo.findByPk(req.params.id)
        .then(todo => {
            if (todo.UserId == decode.id) {
                next()
            } else {
                res.status(403).json({
                    message: 'Forbiden Acces'
                })
            }
        })
        .catch(err => {
            res.status(403).json({
                message: 'Forbiden Acces'
            })
        })

}

module.exports = {
    authentication,
    authorization
}