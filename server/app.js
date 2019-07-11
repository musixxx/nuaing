const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const routes = require('./routes/index')

app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))

app.use('/', routes)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))