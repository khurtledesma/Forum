const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require("../config/auth.js");
const Post = require('../models/post');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('Welcome', { title: 'Express' });
});

router.get('/register', (req,res)=>{
  res.render('register');
})

router.get('/dashboard', ensureAuthenticated, (req,res)=>{
  Post.find()
  
  .then((result) => {
    res.render('dashboard', {
    posts: result,
    user: req.user
  })
  })
})

module.exports = router;
