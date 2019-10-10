const express = require('express')
const jwt = require('jsonwebtoken')
const port = process.env.PORT || 8080

const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

app.post('/api/login', verifyToken, (req, res) => {
    const user = {
        id: 1,
        username: 'bradscool',
        name: 'brad'
    }
    jwt.sign({user}, 'secretkey', (err, token) => {
        res.json({
            token
        })
    })
})

app.use('/api', require('./api/users').router)


//FORMAT OF TOKEN
//Authorization: Bearer <access_token>

//Verify Token //middleware function
function verifyToken(req, res, next) {
    //Get auth header value
    const bearerHeader = req.headers['authorization']
    //Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
        //Split at the space
        const bearer = bearerHeader.split(' ')
        //Get token from array
        const bearerToken = bearer[1]
        //Set the token
        req.token = bearerToken
        //Call Next middleware
        next()
    } else {
        //Forbidden
        res.sendStatus(403)
    }
}

app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
})