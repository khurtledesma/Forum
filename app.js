const express = require('express');
const app = express();
const session = require('express-session')
const flash = require('connect-flash')
const mongoose = require('mongoose');
const port = 3000;
const expressEjsLayout = require('express-ejs-layouts');
const passport = require('passport');
const path = require('path');
require("./config/passport")(passport);



//mongoose
const dbUri = 'mongodb+srv://Admin:Un9YPxPfMvRHKdS@cluster0.fzits.mongodb.net/Forums?retryWrites=true&w=majority'
mongoose.connect(dbUri,{useNewUrlParser: true, useUnifiedTopology : true})
.then(() => {
   app.listen(port),
   console.log("listening on port" + port)
})
.catch((err)=> console.log(err));

//static files
app.use(express.static(path.join(__dirname, "/static")));
//EJS
app.set('view engine','ejs');
app.use(expressEjsLayout);
//BodyParser
app.use(express.urlencoded({extended : false}));
app.use(session({
    secret : 'secret',
    resave : true,
    saveUninitialized : true
   }));
app.use(passport.initialize());
app.use(passport.session());

   //use flash
app.use(flash());
app.use((req,res,next)=> {
     res.locals.success_msg = req.flash('success_msg');
     res.locals.error_msg = req.flash('error_msg');
     res.locals.error  = req.flash('error');
   next();
   })
//Routes
app.use('/',require('./routes/index'));
app.use('/',require('./routes/users'));
app.use('/post',require('./routes/posts'));
app.use('/',require('./routes/animals'));
