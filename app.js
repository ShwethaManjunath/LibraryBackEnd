var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var cors = require('cors');
var config = require('config');
var mongoose = require('mongoose');
var logger = require('./config/winston');


var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var librarianRouter = require('./routes/librarian');
var bookRouter = require('./routes/book');
var checkoutRouter = require('./routes/checkout');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//don't show the log when it is test
if(config.util.getEnv('NODE_ENV') !== 'test') {
  app.use(morgan('combined', { stream: logger.stream }));
}

mongoose.connect(config.DBHost,{ useNewUrlParser: true },function(){
  console.log("MONGO DataBase Connected with "+process.env.NODE_ENV+ " Environment");
  logger.info("MONGO DataBase Connected");
  
});


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/librarian', librarianRouter);
app.use('/book', bookRouter);
app.use('/checkoutRouter',checkoutRouter);


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

app.listen(3001, ()=>{
  console.log('Server Started on port No 3001');
  logger.info("Server Started");
})

module.exports = app;
