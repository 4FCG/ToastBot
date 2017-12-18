const main = require('../main.js');
const connection = main.connect;
const status = require('../status.js');

module.exports = {
    Description: 'Mute a user.',
    Usage: 'mute, @user, time(minutes), [reason]',
	Alias: ['mute', 'Mute'],
    func: (Client, message, args) => {
      args[1] = Number(args[1].replace(" ", ""));
			if (typeof message.mentions.members.first() !== 'undefined' && Number.isInteger(args[1])) {
				let target = message.mentions.members.first();
				let query = 'SELECT COUNT(Status_ID) AS data FROM `' + target.guild.id + '_status` WHERE `Type`="Mute" AND `User_ID`="' + target.id + '";';
				connection.query(query, function (error, results, fields) {
					if(results[0].data === 0 && !target.serverMute){
						let date = new Date();
						let time = date.getTime() + ((args[1]*60)*1000);
						if (!args[2]) {args[2]=' ';}
						status.apply(target, message.author.id, 'mute', time, args[2]);
					}
					else {
						message.channel.send('Failed to mute the user, the user is already muted.');
					}
				});
			}
			else {
				message.channel.send("Please supply the proper arguments: mute, @user, time(in minutes), [reason]");
			}
    }
}
