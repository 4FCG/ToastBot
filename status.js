const client = require('./main.js');
const mysql = require('mysql');
const connection = client.connect;
const query_INSERT = 'INSERT INTO ?? (User_ID, Given_By_ID, Type, Expire_Time, Comment) VALUES (?, ?, ?, ?, ?);';

module.exports =  {
  apply: function (target, source, type, time, note) {
    if (type === "ban") {
      target.ban({days : 7,reason : note}); //7 should be a setting (days of messages to remove of the banned player)
	  let inserts = [target.guild.id + '_status', target.id, source, 'Ban', time, note];
	  let query = mysql.format(query_INSERT, inserts);
      connection.query(query, function (error, results, fields) {});
    }
    else if (type === "warn") {
      let query = 'SELECT COUNT(Status_ID) AS data FROM `' + target.guild.id + '_status` WHERE `Type`="Warn" AND `User_ID`="' + target.id + '";';
      connection.query(query, function (error, results, fields) {
        if (results[0].data + 1 >= 5) { //5 should be a setting (warns before ban)
          let query_2 = 'DELETE FROM `' + target.guild.id + '_status` WHERE `Type`="Warn" AND `User_ID`="' + target.id + '";';
          connection.query(query_2, function (error, results, fields) {});
          let date = new Date();
          this.apply(target, source, 'ban', date.getTime() + 300000, note); //auto ban time should be a setting
        }
        else {
		      let inserts = [target.guild.id + '_status', target.id, source, 'Warn', time, note];
		      let query_2 = mysql.format(query_INSERT, inserts);
          connection.query(query_2, function (error, results, fields) {});
        }
      });
    }
    else if (type === "mute") {
      target.setMute(true, note);
      let mute = target.guild.roles.find('name', 'toastbot_mute');
      if (!target.roles.get(mute.id)) {
        target.addRole(mute);
      }
	  let inserts = [target.guild.id + '_status', target.id, source, 'Mute', time, note];
	  let query = mysql.format(query_INSERT, inserts);
      connection.query(query, function (error, results, fields) {});
    }
  },
  remove: function (target, type, extra) {
    if (type === "ban") {
	  let query_user = 'SELECT User_ID AS id FROM ?? WHERE `Status_ID`=?;';
	  let inserts = [target.id + '_status', extra.id];
	  connection.query(mysql.format(query_user, inserts), function (error, results, fields) {
		client.bot.fetchUser(results[0].id)
		.then(user => {
			target.unban(user, extra.note);
			let query = 'DELETE FROM `' + target.id + '_status` WHERE `Type`="Ban" AND `User_ID`="' + user.id + '";';
			connection.query(query, function (error, results, fields) {});
		});
	  });
    }
    else if (type === "mute") {
      target.setMute(false, extra.note);
      let mute = target.guild.roles.find('name', 'toastbot_mute');
      target.removeRole(mute);
      let query = 'DELETE FROM `' + target.guild.id + '_status` WHERE `Type`="Mute" AND `User_ID`="' + target.id + '";';
      connection.query(query, function (error, results, fields) {});
    }
  	else if (type === "warn") {
  		let query = 'DELETE FROM ?? WHERE `Status_ID`=? AND `Type`="Warn";';
  		let inserts = [target.guild.id + '_status', extra.id];
  		query = mysql.format(query, inserts);
  		connection.query(query, function (error, results, fields) {});
  	}
  }
}
