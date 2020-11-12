var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var helmet = require('helmet');
var mysql = require('mysql');
var bodyParser = require('body-parser')
var app = express();

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

/* Set which database to connect */
var connection = mysql.createConnection({
  host: 'mumu-mysql.cdh264nx0iwk.ap-northeast-1.rds.amazonaws.com',
  user: 'root',
  password: 'Pass1234',
  database: 'Goto'
});
/* Start connecting to the database */
connection.connect(function(err) {
	if (err) throw err;
	console.log('Connected');
	const sql = "select * from questionnaire"
	connection.query(sql, function (err, result, fields) {
	if (err) throw err;
	console.log(result)
	});
});
app.post('/', (req, res) => {
	const sql = "INSERT INTO questionnaire SET ?"
	connection.query(sql,req.body,function(err, result, fields){
		if (err) throw err;
		console.log(result);
		res.render("presents.ejs");
	});
});
app.get('/answer', (req, res) => {
	const sql = "select * from questionnaire";
	connection.query(sql, function (err, result, fields) {
	if (err) throw err;
	res.render("answer",{values : result});
	});
});

/* rooting page */
var indexRouter = require('./routes/index');
app.use('/', indexRouter);
var quizRouter = require('./routes/quiz');
app.use('/quiz', quizRouter);
var presentsRouter = require('./routes/presents');
app.use('/presents', presentsRouter);
var profileRouter = require('./routes/profile');
app.use('/profile', profileRouter);
var formRouter = require('./routes/form');
app.use('/form', formRouter);
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
