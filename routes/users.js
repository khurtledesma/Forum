const User = require("../models/users.js");
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

//login handle
router.get('/login',(req,res)=>{
    res.render('login');
})
router.get('/register',(req,res)=>{
    res.render('register')
    })
//Register handle
router.post('/register',(req,res)=>{
  const {name, email, password, password2} = req.body;
  let errors = [];
  console.log(' Name ' + name+ ' email :' + email+ ' pass:' + password);

  if(!name || !email || !password || !password2) {
    errors.push({msg : "Please fill in all fields."})
  };

  if(password !== password2) {
    errors.push({msg : "Passwords do not match."});
  };

  if(password.length < 6 ) {
    errors.push({msg : 'Password must be at least 6 characters.'})
  };

  if(errors.length > 0 ) {
    res.render('register', {
        errors : errors,
        name : name,
        email : email,
        password : password,
        password2 : password2})
    } else {
      User.findOne({email : email}).exec((err,user)=>{
        console.log(user);   
        if(user) {
            errors.push({msg: 'Email is already registered'});
            res.render('register', {
              errors : errors,
              name : name,
              email : email,
              password : password,
              password2 : password2})
           } else {  
            const newUser = new User({
                name : name,
                email : email,
                password : password
            });
            bcrypt.genSalt(10,(err,salt)=> 
            bcrypt.hash(newUser.password,salt,
                (err,hash)=> {
                    if(err) throw err;
                        //save pass to hash
                        newUser.password = hash;
                    //save user
                    newUser.save()
                    .then((value)=>{
                        console.log(value)
                        req.flash('success_msg','You have now registered!')
                        res.redirect('/login');
                    })
                    .catch(value=> console.log(value));
                }));
          };
        })}
      });



router.post('/login',(req,res,next)=>{
  passport.authenticate('local',{
    successRedirect : '/main',
    failureRedirect : '/login',
    failureFlash : true,
    })(req,res,next);
  })

//logout

router.get('/logout', function (req, res){
    req.logout();
    req.flash('success_msg','Now logged out');
    res.redirect('/login');
})
module.exports  = router;