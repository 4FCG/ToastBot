const mysql = require('mysql');
const config = require('./config.json');
const fs = require('fs');

module.exports = {
  func: (Client, msg, args, connection) => {
    Client.bot.guilds.array().forEach(function(guild){
      let query = 'CREATE TABLE IF NOT EXISTS`' + guild.id + '` (`roles` VARCHAR(45) NOT NULL,';
      fs.readdirSync('./commands/').forEach(function(command){
        query = query + '`' + command + '` INT NOT NULL DEFAULT 0,';
      });
      query = query + 'PRIMARY KEY (`roles`))COMMENT = "' + guild.name + ' table";';
      connection.query(query, function (error, results, fields) {});
      guild.roles.array().forEach(function(role){
        let query = 'INSERT IGNORE INTO `' + guild.id + '` (roles) VALUES ("' + role.name + '");';
        connection.query(query, function (error, results, fields) {});
      });
    });
  }
}

//connection.end(function(err) {
//});
