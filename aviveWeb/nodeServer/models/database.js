var mysql = require('mysql2');
var express = require('express');
var router = express.Router();

require("dotenv").config({path:'../.env'});

const connection = mysql.createConnection({
  host: "database-1.cvoum4o4i3k4.ap-southeast-2.rds.amazonaws.com",
  user: "admin",
  password: "avive446!",
  database: "aviveDB",
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
