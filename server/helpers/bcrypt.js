const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);


function hashPassword(inputPass) {
    return bcrypt.hashSync(inputPass, salt)
}

function compare(inputPass, password) {
    return bcrypt.compareSync(inputPass, password)
}

module.exports = {
    hashPassword,
    compare
}