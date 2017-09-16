const mysql = require('mysql');
const config = require('./config.json');
const fs = require('fs');

const connection = mysql.createConnection({
  host  : "localhost",
  user  : "root",
  password  : config.sqlpass,
  database  : "bot_test"
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});

module.exports = {
  func: (Client, msg) => {
    Client.bot.guilds.array().forEach(function(guild){
      let query = 'CREATE TABLE IF NOT EXISTS`' + guild.name + '` (`roles` VARCHAR(45) NOT NULL,';
      fs.readdirSync('./commands/').forEach(function(command){
        query = query + '`' + command + '` INT ZEROFILL NOT NULL,';
      });
      query = query + 'PRIMARY KEY (`roles`))COMMENT = "' + guild.name + ' table";';
      connection.query(query, function (error, results, fields) {});
    });
  }
}

//connection.end(function(err) {
//});
