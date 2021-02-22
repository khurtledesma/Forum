const express = require('express');
const Post = require('../models/post');
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth.js");

router.get('/new-post', ensureAuthenticated, (req, res) => {
    res.render('newPost')
})

router.post('/new-post', ensureAuthenticated, (req, res) => {
    const { title, body } = req.body;

    const post = new Post({
        title: title,
        body: body,
        submittedBy: req.user
    });

    post.save()
        .then((result) => {
            res.redirect('/dashboard')
        })
        .catch((err) => {
            console.log(err)
        })
})


router.get('/:id', ensureAuthenticated, (req, res) => {
    Post.findById(req.params.id)
    .then((result) => {
        console.log(result)
        res.render('commentPage', {
            posts: result,
            user: req.user
        })
    })
      .catch((err) => {
        console.log(err)
      })
})
module.exports = router;