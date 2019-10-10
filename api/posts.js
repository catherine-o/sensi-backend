// const express = require('express')
// const router = express.Router()

// const User = require('./users')
// const Post = require('../models/post_model')

// router.post('/users/:id/posts', (req, res) => {
//     let id = parseInt(req.params.id)
//     Post.query().insert({
//         content: req.body.content,
//         polarity: req.body.polarity,
//         polarity_confidence: req.body.polarity_confidence,
//         user_id: id
//     })
//     .then(user => {
//         res.json(user)
//     })
// })