const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const bcrypt = require('bcrypt')
const saltRounds = 15

const User = require('../models/user_model')
const Post = require('../models/post_model')

//Don't need show page for all?
router.get('/users', (req, res) => {
    User.query()
        .then(users => {
            res.json(users)
        })
})


router.get('/users/:id', (req, res) => {
    let id = parseInt(req.params.id)
    jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
        if(err) {
            res.sendStatus(403)
        } else {
            User.query()
                .where('id', id)
                .eager('posts')
                .then(user => {
                    res.json({
                        user,
                        authData
                    })
                })
        }
    })
})

    
router.post('/users/:id/posts', verifyToken, (req, res) => {
    let id = parseInt(req.params.id)
    jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
        if(err) {
            res.sendStatus(403)
        } else {
            Post.query().insert({
                content: req.body.content,
                polarity: req.body.polarity,
                polarity_confidence: req.body.polarity_confidence,
                user_id: id
            })
            .then(post => {
                res.json({
                    post,
                    authData
                })
            })
        }
    })
})


router.post('/users/signup', (req, res) => {
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        User.query().insert({
            username: req.body.username,
            name: req.body.name,
            password: hash
        })
        .then(user => {
            jwt.sign({user}, process.env.SECRET_KEY, (err, token) => {
                user.password = null
                res.json({
                    user,
                    token
                })
            })
        })
    })
})
    

router.put('/users/:id', (req, res) => {
    let id = parseInt(req.params.id)
    jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
        if(err) {
            res.sendStatus(403)
        } else {
            User.query().update({
                username: req.body.username,
                name: req.body.name,
                password: req.body.password
            })
            .then(id => {
                User.query()
                .where('id', id)
                .then(user => {
                    res.json(user)
                })
            })
        }
    })
})
    

router.delete('/users/:id/posts/:id', (req, res) => {
    let postId = parseInt(req.params.id)
    jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
        if(err) {
            res.sendStatus(403)
        } else {
            Post.query()
                .where('id', postId)
                .del()
                .returning("user_id")
                .then(userId => res.json(userId))
        }
    })
})


router.delete('/users/:id', (req, res) => {
    let id = parseInt(req.params.id)
    jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
        if(err) {
            res.sendStatus(403)
        } else {
            User.query()
                .where('id', id)
                .del()
                .returning("username")
                .then(username => res.json(username))
        }
    })
})

module.exports = {
    router: router
}


function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization']
    if(typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1]
        req.token = bearerToken
        next()
    } else {
        res.sendStatus(403)
    }
}