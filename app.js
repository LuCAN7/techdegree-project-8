const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const routes = require('./routes/index');
const books = require('./routes/books');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/books', books); //

// catch 404 and forward to error handler
app.use( (req, res, next) => {
  res.status(404);
  // res.render('books/page_not_found');
  next(createError(404));
  // console.log('1.PASSING DATA THROUGH...this app.use()');
});

// error handler
app.use( (err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // console.log('2.PASSING DATA THROUGH...2nd app.use()', err);

  // render the error page
  res.status(err.status || 500);
  // if(res.status === 404){
    // console.log('Error 404');
    res.render('books/page_not_found');
  // } 
  // else if ( res.status === 500){
  //   console.log('Error 500');
  //   res.render('books/error');
  // }
});

module.exports = app;
