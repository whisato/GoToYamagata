var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var helmet = require('helmet');
var bodyParser = require('body-parser')
var app = express();
const db = require('./db_connecter');

app.use(helmet());

/* view engine setup */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/', (req, res) => {
	const sql = "INSERT INTO questionnaire SET ?"
	db.connection.query(sql,req.body,function(err, result, fields){
		if (err) throw err;
		console.log(result);
		res.render("presents.ejs");
	});
});

/* rooting page */
var indexRouter = require('./routes/index');
app.use('/', indexRouter);
var presentsRouter = require('./routes/presents');
app.use('/presents', presentsRouter);
var quizRouter = require('./routes/quiz');
app.use('/quiz', quizRouter);
var formRouter = require('./routes/form');
app.use('/form', formRouter);
var answerRouter = require('./routes/answer');
app.use('/answer', answerRouter);
var profileRouter = require('./routes/profile');
app.use('/profile', profileRouter);
var syounaiRouter = require('./routes/syounai');
app.use('/syounai', syounaiRouter);
var okitamaRouter = require('./routes/okitama');
app.use('/okitama', okitamaRouter);
var mogamiRouter = require('./routes/mogami');
app.use('/mogami', mogamiRouter);
var murayamaRouter = require('./routes/murayama');
app.use('/murayama', murayamaRouter);

/* catch 404 and forward to error handler */
app.use(function(req, res, next) {
  next(createError(404));
});

/* error handler */
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  
  /* render the error page */
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
