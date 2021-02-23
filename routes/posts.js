const express = require('express');
const Post = require('../models/post');
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth.js");

router.get('/new-post', ensureAuthenticated, (req, res) => {
    res.render('newPost', {
        user: req.user,
    })
})

router.post('/new-post', ensureAuthenticated, (req, res) => {
    const { title, body, category, subcategory} = req.body;
    console.log(req.body)

    const post = new Post({
        title: title,
        body: body,
        category: category,
        subCategory: subcategory,
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