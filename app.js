var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const db = require('./models');
const error = require('./midleware/error');
const cors = require('cors');
const whiteUrl = require('./config/whiteUrl');
const timeout = require('connect-timeout');


var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


//set cors
var corsOptions = {
  origin: function (origin, callback) {
    if (whiteUrl.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}


//set time out
app.use(timeout(process.env.TIMEOUT));
app.use((req, _, next) => {
  if (!req.timedout) next();
});
app.use(function (req, res, next) {
  setTimeout(next, 200);
});

app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1', indexRouter);
app.use(error);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

db.sequelize.sync({ force: false }).then(() => {
  console.log("Database running");
}).catch(err => {
  console.log(err.message);
})

module.exports = app;
