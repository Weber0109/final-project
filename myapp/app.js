var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//connect to database
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://weber:lyRr2pR6gPGJnr1w@cluster0.nzuuf.mongodb.net/travelDB?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {
  console.log('MongoDB 連線成功');
})
.catch((err) => {
  console.log('MongoDB 連線失敗', err);
});
// require router
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var travelInfo = require('./routes/travelInfo');
var attractions = require('./routes/attractions');
var selectedAttractions = require('./routes/selectedAttractions');
var essentialItems = require('./routes/essentialItems');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// use router
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/travelInfo', travelInfo);
app.use('/attractions', attractions);
app.use('/selectedAttractions',selectedAttractions);
app.use('/essentialItems', essentialItems);
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
