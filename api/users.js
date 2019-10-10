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

module.exports = {
    router: router
}