const express = require('express');
const Post = require('../models/post');
const Comment = require('../models/comment');
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth.js");
const mongoose = require("mongoose");

router.get('/new-post', ensureAuthenticated, (req, res) => {
    res.render('newPost', {
        user: req.user,
    })
})

router.post('/new-post', ensureAuthenticated, (req, res) => {
    const { title, body, category, subcategory } = req.body;
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
    .lean()
    .populate({
    path: 'comments',
    model: 'Comment',
        populate: ({
            path: 'submittedBy',
            model: 'User' 
        })
    })
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


router.post('/:id/comments', ensureAuthenticated, (req, res) => {
    const { commentBody } = req.body;
    const newID = mongoose.Types.ObjectId();
    const comment = new Comment ({
        _id: newID,
        body: commentBody,
        submittedBy: req.user,
    })

    comment.save()

    Post.findByIdAndUpdate(
        
        req.params.id,
        {$addToSet: {"comments": { _id: newID, body: commentBody, submittedBy: req.user}}},
        {safe: true, upsert: true, new : true},
        function(err, model) {
            console.log(err);
        }
    )
    .lean()
    .populate({
    path: 'comments',
    model: 'Comment'
    })
    
    .then((result) => {
        res.render('commentPage', {
            posts: result,
            user: req.user,
        })
    })
    .catch((err) => {
        console.log(err)
    })
})

module.exports = router;