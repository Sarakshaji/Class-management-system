var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session=require("express-session")
var flash=require('connect-flash')
var fileupload=require('express-fileupload')


var studentRouter = require('./routes/student');
var adminRouter = require('./routes/admin');

var app = express();
 //app.use(express.bodyparser());

var db=require('./connection/connection')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

 app.use(express.urlencoded({ extended : true }));
 app.use(express.json());
app.use(session({
  secret: 'key',
  saveUninitialized:true,
  cookie: { maxAge:60000 },
  resave: false 
}))
app.use(fileupload())
app.use(flash())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

db.connect((err)=>{
  if(err){
    console.log(err+"this is the error")
  }
  else{
    console.log("database connected")
  }
})

app.use('/', studentRouter);
app.use('/admin',adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
