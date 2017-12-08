const main = require('../main.js');
const connection = main.connect;
const status = require('../status.js');

module.exports = {
    Description: 'Unban a user.',
    Usage: 'unban, ban_id, [reason]',
    func: (Client, message, args) => {
			args[0] = Number(args[0].replace(" ", ""));
			if (Number.isInteger(args[0])) {
				let query = 'SELECT User_ID AS id FROM ?? WHERE `Status_ID`=? AND `Type`="Ban";';
				let inserts = [message.guild.id + '_status', args[0]];
				connection.query(mysql.format(query, inserts), function (error, results, fields) {
					if (results[0].id.length > 0) {
						client.bot.fetchUser(results[0].id)
						.then(target => {
							target.guild.fetchBans()
							.then(bans => {
								if(bans.get(target.id)){
									if (!args[1]) {args[1]=' ';}
									status.remove(target, 'ban', {note: args[1], id : message.guild.id});
								}
								else {
									message.channel.send('Failed to ban the user, missing permissions or the user is already banned.');
								}
							});
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
    }
}
