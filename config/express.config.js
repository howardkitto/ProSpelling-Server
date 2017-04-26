const express = require('express');
const app = express();
const router = express.Router();
var bodyParser = require('body-parser');
var path = require('path');
// const passport = require('passport');
// const morgan = require('morgan');

//This cors module is really important, I wasted several hours on this! 
//This module enables a preflight OPTIONS request before serving a custom header
const cors = require('cors');

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())
// app.use(morgan('combined'))


app.use(express.static('./server/static/'));

// load passport strategies
// const localSignupStrategy = require('../passport/local-signup');
// const localLoginStrategy = require('../passport/local-login');
// passport.use('local-signup', localSignupStrategy);
// passport.use('local-login', localLoginStrategy);

// pass the authenticaion checker middleware
// const authCheckMiddleware = require('../passport/auth-check');
// app.use('/api', authCheckMiddleware);

const indexRoutes = require('../routes/index.routes')
// const authRoutes = require('../routes/auth.routes')
// const userRoutes = require('../routes/user.routes');

//CORS ** Don't forget to replace the URL of the app

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
  // res.header("Access-Control-Expose-Headers", "authorization");
  next();
});


router.use('/', indexRoutes)

// router.use('/api', indexRoutes, authRoutes)
// // router.use('/api', indexRoutes)

// router.use('/api/user', userRoutes)

// router.use('/auth', authRoutes)

// app.use('/', router)

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).

app.get('*', function (req, res){
  res.sendFile(path.join(__dirname, '../static', 'index.html'))
})

module.exports = {app}
