const mysql = require('mysql');
const config = require('./config.json');

const connection = mysql.createConnection({
  host  : "localhost",
  user  : "root",
  password  : config.sqlpass
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});

connection.query('CREATE TABLE `bot_test`.`server id` (  `roles` VARCHAR(45) NOT NULL,  `ping` INT ZEROFILL NOT NULL,PRIMARY KEY (`roles`));', function (error, results, fields) {
});

connection.end(function(err) {
});
