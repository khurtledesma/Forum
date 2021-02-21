const express = require('express');
const Post = require('../models/post');
const router = express.Router();

router.get('/new-post', (req, res) => {
    const post = new Post ({
        title: 'second post',
        body: 'second test',
    })

    post.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })
});

router.get('/all-posts', (req,res) => {
    Post.find()
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
})

module.exports = router;