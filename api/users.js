const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()

const User = require('../models/user_model')
const Post = require('../models/post_model')

router.get('/users', (req, res) => {
    User.query()
        .then(users => {
            res.json(users)
        })
})

router.get('/users/:id', (req, res) => {
    let id = parseInt(req.params.id)
    User.query()
        .where('id', id)
        .eager('posts')
        .then(user => {
            res.json(user)
    })
})
    
router.post('/users/:id/posts', verifyToken, (req, res) => {
    let id = parseInt(req.params.id)
    jwt.verify(req.token, 'secretkey', (err, authData) => {
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
                res.json(post),
                authData
            })
        }
    })
})

router.post('/users', (req, res) => {
    User.query().insert({
        username: req.body.username,
        name: req.body.name,
        password: req.body.password
    })
    .then(user => {
        res.json(user)
    })
})


router.put('/users/:id', (req, res) => {
    let id = parseInt(req.params.id)
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
})
    

router.delete('/users/:id/posts/:id', (req, res) => {
    let postId = parseInt(req.params.id)
    Post.query()
        .where('id', postId)
        .del()
        .returning("user_id")
        .then(userId => res.json(userId))
})

router.delete('/users/:id', (req, res) => {
    let id = parseInt(req.params.id)
    User.query()
        .where('id', id)
        .del()
        .returning("username")
        .then(username => res.json(username))
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