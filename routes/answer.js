'use strict';
var express = require('express');
var router = express.Router();
const db = require('../db_connecter');

/* GET users listing. */
router.get('/', function(req, res, next) {
  const sql = "select * from questionnaire";
  db.connection.query(sql, function (err, result, fields) {
  if (err) throw err;
  res.render('answer',{values : result});
  });
});

module.exports = router;
