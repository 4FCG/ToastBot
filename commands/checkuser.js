const main = require('../main.js');
const connection = main.connect;
const status = require('../status.js');
const mysql = require('mysql');

module.exports = {
    Description: 'check a users warns/ban or mute',
    Usage: 'checkuser, @user',
    func: (Client, message) => {
      if (typeof message.mentions.members.first() !== 'undefined') {
          let date = new Date();
          let target = message.mentions.members.first();
          let query = 'SELECT * FROM `' + target.guild.id + '_status` WHERE `User_ID`="' + target.id + '";';

          connection.query(query, function (error, results, fields) {
            if (results.length > 0) {
              let string = '';
              let info = {sources : [], replacer : []};
              for (C = 0; C < results.length; C++) {
                let time = Math.round(((results[C].Expire_Time - date.getTime()) / 1000) / 60);
                string = string + `${target.user.username} has reveived a ${results[C].Type} from ${results[C].Given_By_ID} that will last ${time} more minutes. The reason was: "${results[C].Comment}"\n`
                let source = new Promise((resolve,reject) => {
                  Client.bot.fetchUser(results[C].Given_By_ID)
                  .then(user => {
                    resolve(user.username);
                  });
                });
                info.sources.push(source);
                info.replacer.push(results[C].Given_By_ID);
              }
              Promise.all(info.sources)
              .then(values => {
                for (I = 0; I < values.length; I++) {
                  string = string.replace(info.replacer[I], values[I]);
                }
                message.channel.send(string);
              });
            }
            else {
              message.channel.send(`${target.user.username} has no current warns bans or mutes.`)
            }
          });
      }
    }
}

//status.apply(target, message.author.id, 'warn', 1, "test");

//message.channel.send(`The user has been banned by ${source.username} for the reason: "${results[0].Comment}".\nThis ban will last for ${time} more minutes.`);
