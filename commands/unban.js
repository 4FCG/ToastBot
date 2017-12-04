const connection = require('../main.js');
const status = require('../status.js');

module.exports = {
    Description: 'Unban a user.',
    Usage: 'unban, ban_id, [reason]',
    func: (Client, message, args) => {
			if (Number.isInteger(args[0])) {
				let query = 'SELECT COUNT(Status_ID) AS data FROM ?? WHERE `Type`="Ban" AND `User_ID`=?;';
				let inserts = [message.guild.id + '_status', args[0]];
				connection.query(mysql.format(query, inserts), function (error, results, fields) {
					target.guild.fetchBans()
					.then(bans => {
						if(results[0].data === 0 && target.bannable && !bans.get(target.id)){
							let date = new Date();
							let time = date.getTime() + ((args[1]*60)*1000);
							if (!args[2]) {args[2]=' ';}
							status.apply(target, message.author.id, 'ban', time, args[2]);
						}
						else {
							message.channel.send('Failed to ban the user, missing permissions or the user is already banned.');
						}
					});
				});
			}
			else {
				message.channel.send("Please supply the proper arguments: unban, ban_id, [reason]");
			}
        });
    }
}
