const mysql = require('mysql');
const config = require('./config.json');
const fs = require('fs');

module.exports = {
  func: (Client, msg, args, connection) => {
    Client.bot.guilds.array().forEach(function(guild){

      if (guild.roles.find('name', 'toastbot_mute') === null) {
        guild.createRole({name: 'toastbot_mute'})
        .then(rolee => console.log(`Created role ${rolee}`));
      }

      let query = 'CREATE TABLE IF NOT EXISTS`' + guild.id + '` (`roles` VARCHAR(45) NOT NULL,';
      fs.readdirSync('./commands/').forEach(function(command){
        query = query + '`' + command + '` INT NOT NULL DEFAULT 0,';
      });
      query = query + 'PRIMARY KEY (`roles`))COMMENT = "' + guild.name + ' table";';
      connection.query(query, function (error, results, fields) {});

      let query_2 = 'CREATE TABLE IF NOT EXISTS`' + guild.id + '_status' + '` (`Status_ID` INT NOT NULL AUTO_INCREMENT, `User_ID` VARCHAR(18) NOT NULL, `Given_By_ID` VARCHAR(18) NOT NULL, `Type` VARCHAR(4) NOT NULL, `Expire_Time` VARCHAR(20) NOT NULL, `Comment` VARCHAR(200) NULL, PRIMARY KEY (`Status_ID`));';
      connection.query(query_2, function (error, results, fields) {});

      guild.roles.array().forEach(function(role){
        let query = 'INSERT IGNORE INTO `' + guild.id + '` (roles) VALUES ("' + role.name + '");';
        connection.query(query, function (error, results, fields) {});
      });
    });
  }
}

//connection.end(function(err) {
//});
