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
                where: {
                    email: req.body.email
                }
            })
            .then(user => {
                if (user) {
                    if (Helper.comparePassword(req.body.password, user.password)) {
                        let payload = {
                            id: user._id,
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

    static googleSignin(req, res) {
        
        let googleToken = req.body.token;

        const { OAuth2Client } = require("google-auth-library");
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

        async function verify() {
          const ticket = await client.verifyIdToken({
            idToken: googleToken,
            audience: process.env.GOOGLE_CLIENT_ID 
          });
          const payload = ticket.getPayload();
          console.log(payload, '=> payload')
          
          User.findOne({
              email : payload.email
          })
            .then((user) => {
                if(user){   
                    console.log('google got to signin')            
                    req.body = {
                        email : user.email,
                        password : user.email
                    }
    
                    User.findOne({
                      email: req.body.email
                    })
                      .then(user => {
                        if (!user) {
                          res.status(404).json({
                            msg: "not found"
                          });
                        } else {
                          
                          if (bcrypt.compareSync(req.body.password, user.password)) {
                            const payload = {
                              id: user.id,
                              username: user.username,
                              email : user.email
                            };
                            const token = jwt.sign(payload, process.env.JWT_SECRET);
                            console.log(token);
                            res.status(200).json({ access_token : token, username: payload.username });
                          } else {
                            res.status(404).json({
                              msg: "not found"
                            });
                          }
                        }
                      })
                      .catch(err => {
                        console.log('err: ', err);
                        res.status(500).json({
                          msg: "internal server error"
                        });
                      });
    
                    
                } else {
                    console.log('google go to signup')            
                    req.body = {
                        username : payload.name,
                        email : payload.email,
                        password : payload.email
                    }
                    const newuser = new User({
                      username: req.body.username,
                      password: req.body.password,
                      email : req.body.email
                    });
                    newuser
                      .save()
                      .then(user => {
                        console.log(user);
                        res.status(201).json(user);
                      })
                      .catch(err => {
                        console.log(err);
                        
                        if(err.errors.email){
                          res.status(400).json({msg : err.errors.email.reason})
                        } else {
                          res.status(500).json({
                            msg: "internal server error"
                          });
                        }
                      });
                }
            })
            .catch(err => {
                console.log(err)
            })
        }
        verify().catch(console.error);
      }
    
}


module.exports = UserController