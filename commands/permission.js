const mysql = require('mysql');
const config = require('../config.json');
const fs = require('fs');

module.exports = {
    Description: 'Main command for changing and checking permissions.',
    Usage: 'permission',
    func: (client, msg, args, connection) => {
        if (args[0] === "commands") {
          let list = `List of commands:\n`;
          fs.readdirSync('./commands/').forEach(function(command){
            list = `${list}'${command.slice(0,command.length - 3)}'\n`;
          });
          msg.channel.send(list);
        }
        else if (args[0] === "roles") {
          let list = `List of roles:\n`;
          msg.guild.roles.array().forEach(function(command){
            list = `${list}'${command.name}'\n`;
          });
          msg.channel.send(list);
        }
        else if (args[0] === "change") {
          if (args[1] && args[2] && args[3]) {
            if (args[3] === "true") {args[3]=1;} else {args[3]=0;}
            let query = 'UPDATE `bot_test`.`' + msg.guild.id + '` SET `' + args[1] + '.js` = ' + args[3] + ' WHERE `roles` = "' + args[2] + '";';
            connection.query(query,function(err){
              if(err){
                console.log(err);
                msg.channel.send(`Something went wrong, perhaps a typo?\nMake shure to use //permission,change,command,role,true/false`);
              }
            });
          }
          else {
            msg.channel.send(`Something went wrong, perhaps a typo?\nMake shure to use //permission,change,command,role,true/false`);
          }
        }
        else if (args[0] === "check") {
          if (args[1] && args[2]) {
            client.perms.func(`${args[1]}.js`, msg, connection, args[2]).then(result => {
              if (result === "error") {
                msg.reply("Something went wrong while checking permissions.");
              }
              else if (result) {
                msg.channel.send(`The role ${args[2]} has permission to use the command ${args[1]}.`);
              }
              else {
                msg.channel.send(`The role ${args[2]} may not use the command ${args[1]}.`);
              }
            });
          }
          else {
              msg.channel.send(`Bad parameter.\nMake shure to use //permission,check,command,role`);
          }
        }
        else if (args[0] === 'giveall') {
          if (args[1]) {
            let erro = 0;
            fs.readdirSync('./commands/').forEach(function(command){
              let query ='UPDATE `bot_test`.`' + msg.guild.id + '` SET `' + command + '` = 1 WHERE `roles` = "' + args[1] + '";';
              connection.query(query, function(err, result){
                if(err){return console.log(err);}
              });
            });
          }
          else {
            msg.channel.send('Please specify the role to give all rights.');
          }
        }
        else if (args[0] === 'revokeall') {
          if (args[1]) {
            fs.readdirSync('./commands/').forEach(function(command){
              let query = 'UPDATE `bot_test`.`' + msg.guild.id + '` SET `' + command + '` = 0 WHERE `roles` = "' + args[1] + '";';
              connection.query(query, function(err, result){
                if(err){return console.log(err);}
              });
            });
          }
          else {
            msg.channel.send('Please specify the role to revoke all rights.');
          }
        }
        else {
          msg.channel.send("Bad parameter, please use commands/roles/change/check/giveall/revokeall");
        }
      msg.delete();
    }
}
//UPDATE `bot_test`.`219766528264896512`
//SET `8ball.js` = 1
//WHERE `roles` = "BOT";
