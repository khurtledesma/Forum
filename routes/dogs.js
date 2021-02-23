const express = require('express');
const { ensureAuthenticated } = require('../config/auth');
const router = express.Router();
const Post = require('../models/post');

router.get('/', ensureAuthenticated, (req, res) => {
    Post.find({category: 'dogs'})
    .lean()
    .populate('submittedBy')
    .then((result) => {
      result.forEach(i => i.submittedBy = i.submittedBy.name)
      res.render('dogsmain', {
        posts: result,
        user: req.user,
      })
      
    })
    .catch((err) => {
      console.log(err)
    })
})

router.get('/:subcategory', ensureAuthenticated, (req, res) => {
  Post.find({category: 'dogs', subCategory: req.params.subcategory})
  .lean()
  .populate('submittedBy')
  .then((result) => {
    result.forEach(i => i.submittedBy = i.submittedBy.name)
    res.render('dogssub', {
      posts: result,
      user: req.user,
    })
    
  })
  .catch((err) => {
    console.log(err)
  })
})

module.exports = router;