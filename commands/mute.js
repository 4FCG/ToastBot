const connection = require('../main.js');
const status = require('../status.js');

module.exports = {
    Description: 'Mute a user.',
    Usage: 'mute, @user, time(minutes), [reason]',
    func: (Client, message, args) => {
			if (typeof message.mentions.members.first() !== 'undefined' && Number.isInteger(args[1])) {
				let target = message.mentions.members.first();
				if (!target.guild.roles.find('name', 'toastbot_mute')) {
					target.guild.createRole({name: 'toastbot_mute'});
				}
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
        });
    }
}