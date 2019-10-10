const express = require('express')
const router = express.Router()

const User = require('../models/user_model')

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