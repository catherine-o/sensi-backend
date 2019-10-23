const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const port = process.env.PORT || 8080

const bcrypt = require('bcrypt')

const app = express()
const bodyParser = require('body-parser')

const whitelist = ['http://localhost:8081', 
    'https://sensi-journ.firebaseapp.com', 
    'https://sensi-journ.web.app/']
const corsOptions = {
    credentials: true,
    origin: (origin, callback) => {
        return whitelist.includes(origin)
        ? callback(null, true)
        : callback(new Error('Not allowed by CORS'))
    }
} 

app.use(cors(corsOptions))

app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

const Users = require('./models/user_model')

app.post('/api/login', (req, res) => {
    let username = req.body.username
    let user = Users.query()
        .where('username', username)
        .first()
        .then(function (user) {
            if (!user) {
                res.json('Invalid username or password')
            } else {
                bcrypt.compare(req.body.password, user.password, function (err, result) {
                    if (result == true) {
                        assignToken(user)
                    } else {
                        res.json('Invalid username or password')
                    }
                    function assignToken(user) {
                        if (!user) throw new Error(res.json('Invalid'))
                        
                        return jwt.sign({user}, process.env.SECRET_KEY, (err, token) => {
                            if (err) throw new Error('Error signing JWT')
                            user.password = null
                            res.json({
                                user,
                                token
                            })
                        })
                    }
                })
            }
        })  
})


app.use('/api', require('./api/users').router)


app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
})