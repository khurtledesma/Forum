const express = require('express');
const { ensureAuthenticated } = require('../config/auth');
const router = express.Router();
const Post = require('../models/post');

router.get('/', ensureAuthenticated, (req, res) => {
    Post.find({category: 'cats'})
    .lean()
    .populate('submittedBy')
    .then((result) => {
      result.forEach(i => i.submittedBy = i.submittedBy.name)
      res.render('catsmain', {
        posts: result,
        user: req.user,
      })
      
    })
    .catch((err) => {
      console.log(err)
    })
})

router.get('/:subcategory', ensureAuthenticated, (req, res) => {
  Post.find({category: 'cats', subCategory: req.params.subcategory})
  .lean()
  .populate('submittedBy')
  .then((result) => {
    result.forEach(i => i.submittedBy = i.submittedBy.name)
    res.render('catssub', {
      posts: result,
      user: req.user,
    })
    
  })
  .catch((err) => {
    console.log(err)
  })
})



module.exports = router;