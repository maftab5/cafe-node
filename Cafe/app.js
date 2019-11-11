// require('dotenv').load();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const jwt = require('express-jwt');
const errorHandler = require('./app_api/helpers/error-handler');
const nodemailer = require("nodemailer");

//passport require before database model
const passport = require('passport');
require("./app_server/models/db");

//strategy require after database model
require('./app_api/config/passport');

//var indexRouter = require('./app_server/routes/index');
var usersRouter = require('./app_server/routes/users');
var apiRouter = require('./app_api/routes/siteusersRoutes');

var app = express();

//for authentication
var auth = jwt({
  secret : 'thisIsSecret',
  userProperty: 'payload'
});

//for authentication and login
// app.use(jwt(secrete));
// app.use(errorHandler);
// view engine setup
app.set('views', path.join(__dirname,'app_server', 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'app_public','build')));

//initialize passport and add it as middleware
app.use(passport.initialize());

  //for cors
  app.use(function (req, res, next) {
    /*var err = new Error('Not Found');
     err.status = 404;
     next(err);*/
    req.header('Access-Control-Allow-Origin', '*');
    req.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept,Authorization');

    // Website you wish to allow to connect
    res.header('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept,Authorization');

    // response.setHeader("Access-Control-Allow-Origin", "*");
    // response.setHeader("Access-Control-Allow-Credentials", "true");
    // response.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    // response.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

//  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   res.setHeader('Access-Control-Allow-Credentials',true);
    // Pass to next layer of middleware
    next();
  });



//app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api',apiRouter);

// error handler to catch the unauthorised access or invalid token
app.use((err,req,res,next)=>{
  if(err.name === 'UnauthorizedError'){
    res.status(401).json({
      "message" : err.name + ":" + err.message
    });
  }
})


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {


  //for error catch of unathorized user
  if(err.name === 'UnauthorizedError'){
    res.status(401);
    res.json({
      "message": err.name + ":" + err.message
    });
  }

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
