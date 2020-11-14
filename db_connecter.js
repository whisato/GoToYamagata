'use strict';
var mysql = require('mysql');

module.exports.connection = mysql.createConnection({
  host: 'mumu-mysql.cdh264nx0iwk.ap-northeast-1.rds.amazonaws.com',
  user: 'root',
  password: 'Pass1234',
  database: 'Goto'
});