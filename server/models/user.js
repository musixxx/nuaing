var mongoose = require('mongoose');
const bcrypt = require('../helpers/bcrypt')
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: String,
    email: String
});

userSchema.pre('save', function (next) {
    this.password = bcrypt.hashPassword(this.password)
    next()
})

const User = mongoose.model('User', userSchema);

module.exports = User