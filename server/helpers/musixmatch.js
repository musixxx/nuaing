const axios = require('axios')
module.exports = axios.create({
    baseURL: "https://api.musixmatch.com/ws/1.1"
})