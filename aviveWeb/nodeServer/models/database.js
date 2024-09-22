var mysql = require('mysql2');
var express = require('express');
var router = express.Router();

require("dotenv").config({path:'../.env'});

const connection = mysql.createConnection({
  host: process.env.MYSQL_hostname,
  user: process.env.MYSQL_user,
  password: process.env.MYSQL_password,
  database: process.env.MYSQL_database,
});

connection.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err);
    server.close();
    return;
  }

  connection.execute('SHOW TABLES from aviveDB;', (err, results, fields) => {
    if (err) {
      console.error('Query error:', err);
    } else {
      console.log('Tables:', results);
      console.log('Fields:', fields);
    }
  });
});

module.exports = router;                                                                                