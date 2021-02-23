const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth.js");
const Post = require('../models/post');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('login');
});

router.get('/register', (req, res) => {
  res.render('register');
})

router.get('/main', ensureAuthenticated,  (req, res) => {
  res.render('main', {
    user: req.user
  });
})

router.get('/dashboard', ensureAuthenticated, (req, res) => {
  Post.find()
    .sort({date: -1})
    .limit(5)
    .lean()
    .populate({ path: 'submittedBy', select: 'name' })
    .then((result) => {
      console.log()
      res.render('main', {
        posts: result,
        user: req.user,
      })
      
    })
    .catch((err) => {
      console.log(err)
    })
})

module.exports = router;
