var mysql = require('mysql2');
var tunnel = require('tunnel-ssh');
var fs = require('fs');

require("dotenv").config({path:'../.env'});

const ssh_config = {
  host: process.env.SSH_hostname,
  port: process.env.SSH_port,
  username: process.env.SSH_username,
  password: process.env.SSH_password,
  privateKey: fs.readFileSync('./.ssh/webkey.pem'),
  dstHost: process.env.MYSQL_hostname,
  dstPort: process.env.MYSQL_port,
};
  
tunnel(ssh_config, (error, server) => {
    if (error) {
      throw error;
    }
    const connection = mysql.createConnection({
      host: process.env.MYSQL_hostname,
      user: process.env.MYSQL_user,
      password: process.env.MYSQL_password,
      database: process.env.MYSQL_database,
      port: 3307
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
  
        connection.end((err) => {
          if (err) {
            console.error('Error closing MySQL connection:', err);
          }
          server.close();
        });
      });
    });
  });

  // } else if (server !== null) {
  //    mysql
  //       .createConnection({
  //         host: process.env.MYSQL_hostname,
  //         user: process.env.MYSQL_user,
  //         password: process.env.MYSQL_password,
  //         database: process.env.MYSQL_database,
  //       }).execute('SHOW TABLES from aviveDB;', (err, result, fields) => {
  //         if (err) throw err;
  //         console.log(result);
  //       });

module.exports = tunnel;                                                                                