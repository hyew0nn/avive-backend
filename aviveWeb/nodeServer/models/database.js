var mysql = require('mysql');

require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.MYSQL_hostname,
  user: process.env.MYSQL_user,
  password: process.env.MYSQL_password,
  database: process.env.MYSQL_database,
  port : 3306,
});

module.exports = pool;                                                                            