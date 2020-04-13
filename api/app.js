const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const fs = require('fs');
let obj = { log: [] };

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(
  logger(function (tokens, req, res) {
    let display = [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens['response-time'](req, res),
      'ms'
    ].join('  ');

    fs.readFile(
      'test.json',
      'utf8',
      (readFileCallback = (err, data) => {
        if (err) {
          console.log(err);
        } else {
          obj = JSON.parse(data); //now it an object
          obj.log.push(display); //add some data
          json = JSON.stringify(obj); //convert it back to json
          fs.writeFile('test.json', json, 'utf8', () => console.log('Done')); // write it back
        }
      })
    );

    // fs.writeFileSync('test.json', JSON.stringify({data: log}));
    return display;
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/idex', indexRouter);
app.use('/', usersRouter);

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

module.exports = app;
