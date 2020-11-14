'use strict';
const express = require('express');
const router = express.Router();
const db = require('../db_connecter');

/* GET users listing. */
router.get('/', function(req, res, next) {
  const sql = "select count(Prefectures) from questionnaire WHERE Prefectures = '庄内'";
  db.connection.query(sql, function (err, result, fields) {
    const count = result[0]['count(Prefectures)']; 
    if (err) throw err;
    res.render('syounai',{values: count});
  });
});

module.exports = router;