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
      res.render('main', {
        posts: result,
        user: req.user,
      })
      
    })
    .catch((err) => {
      console.log(err)
    })
})

router.get('/:category/:subcategory', ensureAuthenticated, (req, res) => {
  Post.find({category: req.params.category, subCategory: req.params.subcategory})
  .lean()
  .populate('submittedBy')
  .then((result) => {
    const category =  req.params.category
    const subcategory = req.params.subcategory
    console.log(result)
    result.forEach(i => i.submittedBy = i.submittedBy.name)
    res.render('sub', {
      category: category,
      subcategory: subcategory,
      posts: result,
      user: req.user,
    })
    
  })
  .catch((err) => {
    console.log(err)
  })
})



module.exports = router;