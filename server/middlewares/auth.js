const Helper = require('../helpers/helper')
const x = require('')
const User = require('')

module.exports = {
    authentication : (req, res, next) => {
        try {
            console.log(req.headers.access_token, 'ini token di middleware')
            const decoded = Helper.verifyJWT(req.headers.access_token);

            req.loggedUser = decoded

            console.log(req.loggedUser)
            
            next()
        } catch (err) {
            res.status(500).json(err)
        }
    },
    authorization : (req, res, next) => {
        x.findOne({
            _id : req.body.id
        })
            .then(( data ) => {
                if(req.decode.id === data.UserId){
                    next()
                } else {
                    next(error)
                }
            })
            .catch(err => {
                res.status(401).json({message : 'not authorized'})
            })
    }
}