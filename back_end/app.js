const createError = require('http-errors');
const express = require('express');
const bodyParser = require('body-parser')

const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

require('dotenv').config();
const { Pool } = require('pg')
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME
});

pool.connect();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

  app.get('/', (req, res) => {
    console.log(res)
    pool.query(`
        SELECT * from clients;`)
      .then(result => {
        res.jason(result)
      })
      .catch(err => console.error('query error', err.stack));

  });
  // const getBooks = (request, response) => {
  //   pool.query('SELECT * FROM clients', (error, results) => {
  //     if (error) {
  //       throw error
  //     }
  //     response.status(200).json(results.rows)
  //   })
  // }
  // app.get(getBooks)
  app.listen(process.env.PORT || 3001, () => {
    console.log(`Server listening`)
  })

});


module.exports = app;
