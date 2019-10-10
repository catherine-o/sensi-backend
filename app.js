const express = require('express')
const port = process.env.PORT || 8001

const app = express()

app.use('/api', require('./api/users').router)

app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
})