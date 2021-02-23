const express = require('express');
const { ensureAuthenticated } = require('../config/auth');
const router = express.Router();
const Post = require('../models/post');

router.get('/', ensureAuthenticated, (req, res) => {
    Post.find({category: 'cats'})
    .populate({ path: 'submittedBy', select: 'name' })
    .then((result) => {
      console.log()
      res.render('cats', {
        posts: result,
        user: req.user,
      })
      
    })
    .catch((err) => {
      console.log(err)
    })
})

module.exports = router;