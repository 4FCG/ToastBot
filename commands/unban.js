const main = require('../main.js');
const connection = main.connect;
const status = require('../status.js');
const mysql = require('mysql');

module.exports = {
    Description: 'Remove a ban.',
    Usage: 'unban, ban_id, [reason]',
	Alias: ['unban', 'Unban', 'UnBan'],
    func: (Client, message, args) => {
      if(!args[0]){return message.channel.send("Please supply the proper arguments: unwarn, warn_id");}
			args[0] = Number(args[0].replace(" ", ""));
			if (Number.isInteger(args[0])) {
				let query = 'SELECT User_ID AS id FROM ?? WHERE `Status_ID`=? AND `Type`="Ban";';
				let inserts = [message.guild.id + '_status', args[0]];
				connection.query(mysql.format(query, inserts), function (error, results, fields) {
					if (results.length > 0) {
						client.bot.fetchUser(results[0].id)
						.then(target => {
							if (!args[1]) {args[1]=' ';}
							status.remove(args[0], 'ban', target, message.guild, args[1]);
							message.channel.send(`${target.username} has been unbanned.`);
						});
					}
					else {
						message.channel.send("Invalid ban_id.");
					}
				});
			}
			else {
				message.channel.send("Please supply the proper arguments: unban, ban_id, [reason]");
			}
			message.delete(5000);
    }
}
