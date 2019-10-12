const express = require('express')
const jwt = require('jsonwebtoken')
const port = process.env.PORT || 8080

const bcrypt = require('bcrypt')
const saltRounds = 15

const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

const Users = require('./models/user_model')

app.post('/api/login', (req, res) => {
    let username = req.body.username
    // bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        let password = req.body.password
        if (username && password) {
            console.log(password)
            let user = Users.query()
            .where('username', username)
            .andWhere('password', password)
            .first()
            .then(assignToken)
            .catch(error => console.error(error.message))
        } else {
            res.json('Invalid username or password')
        }    
        
        function assignToken(user) {
            if (!user) throw new Error(res.json('Invalid'))
            
            return jwt.sign({user}, process.env.SECRET_KEY, (err, token) => {
                if (err) throw new Error('Error signing JWT')
                
                res.json({
                    token
                })
            })
        }
    })
// })

app.use('/api', require('./api/users').router)


app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
})