const express = require('express')
const port = process.env.PORT || 8080

const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded())
app.use(bodyParser.json())


app.use('/api', require('./api/users').router)
// app.use('/api', require('./api/posts').router)


app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
})