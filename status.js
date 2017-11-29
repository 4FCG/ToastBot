const connection = require('./main.js');

module.exports =  {
  apply: function (target, source, type, time, note) {
    if (type === "ban") {
      target.ban({days : 7,reason : note}); //7 should be a setting (days of messages to remove of the banned player)
      let query = 'INSERT INTO `' + target.guild.id + '_status` (User_ID, Given_By_ID, Type, Expire_Time, Comment) VALUES ("' + target.id + source + 'Ban' + time + note + '");';
      connection.query(query, function (error, results, fields) {});
    }
    else if (type === "warn") {
      let query = 'SELECT COUNT(Status_ID) FROM `' + target.guild.id + '_status` WHERE `Type`="Warn" AND `User_ID`="' + target.id + '";';
      connection.query(query, function (error, results, fields) {
        if (results[0] + 1 >= 5) { //5 should be a setting (warns before ban)
          let query_2 = 'DELETE FROM `' + target.guild.id + '_status` WHERE `Type`="Warn" AND `User_ID`="' + target.id + '";';
          connection.query(query_2, function (error, results, fields) {});
          let date = new Date();
          this.apply(target, source, 'ban', date.getTime() + 300000, note); //auto ban time should be a setting
        }
        else {
          let query_2 = 'INSERT INTO `' + target.guild.id + '_status` (User_ID, Given_By_ID, Type, Expire_Time, Comment) VALUES ("' + target.id + source + 'Warn' + time + note + '");';
          connection.query(query_2, function (error, results, fields) {});
        }
      });
    }
    else if (type === "mute") {
      target.setMute(true, note);
      let mute = target.guild.roles.find('name','Mute');
      if (!target.roles.get(mute.id)) {
        target.addRole(mute);
      }
      let query = 'INSERT INTO `' + target.guild.id + '_status` (User_ID, Given_By_ID, Type, Expire_Time, Comment) VALUES ("' + target.id + source + 'Mute' + time + note + '");';
      connection.query(query, function (error, results, fields) {});
    }
  },
  remove: function (target, type, id, note) {
    if (type === "ban") {
      target.guild.unban(target.user, note);
      let query = 'DELETE FROM `' + target.guild.id + '_status` WHERE `Type`="Ban" AND `User_ID`="' + target.id + '";';
      connection.query(query, function (error, results, fields) {});
    }
    else if (type === "mute") {
      target.setMute(false, note);
      let mute = target.guild.roles.find('name','Mute');
      if (target.roles.get(mute.id)) {
        target.removeRole(mute);
      }
      let query = 'DELETE FROM `' + target.guild.id + '_status` WHERE `Type`="Mute" AND `User_ID`="' + target.id + '";';
      connection.query(query, function (error, results, fields) {});
    }
  }
}
