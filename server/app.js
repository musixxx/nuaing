if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    require('dotenv').config();
}

const express = require('express')
const route = require('./routes')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const port = process.env.PORT
const morgan = require('morgan');

app.use(cors())
app.use(express.urlencoded({ extended:false }))
app.use(express.json())

mongoose.connect('mongodb://localhost/musixxx', {useNewUrlParser : true}, (err) => {
    if(err) console.log('mongoose connection failed');
    else console.log('mongoose connection success');
});

app.use('/', route)

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})