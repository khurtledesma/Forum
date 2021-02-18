var express = require('express');
var router = express.Router();
const {ensureAuthenticated} = require("../config/auth.js")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('Welcome', { title: 'Express' });
});

router.get('/register', (req,res)=>{
  res.render('register');
})

router.get('/dashboard', ensureAuthenticated, (req,res)=>{
  res.render('dashboard', {
    user: req.user
  });
})

module.exports = router;
