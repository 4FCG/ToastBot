const connection = require('../main.js');
const status = require('../status.js');

module.exports = {
    Description: 'Ban a user.',
    Usage: 'ban, @user, time(minutes), [reason]',
    func: (Client, message, args) => {
			if (typeof message.mentions.members.first() !== 'undefined' && Number.isInteger(args[1])) {
				let target = message.mentions.members.first();
				let query = 'SELECT COUNT(Status_ID) AS data FROM `' + target.guild.id + '_status` WHERE `Type`="Ban" AND `User_ID`="' + target.id + '";';
				connection.query(query, function (error, results, fields) {
					if(results[0].data === 0 && target.bannable){
						let date = new Date();
						let time = date.getTime() + ((args[1]*60)*1000);
						if (!args[2]) {args[2]='';}
						status.apply(target, message.author.id, 'Ban', time, args[2]);
					}
					else {
						message.channel.send('Failed to ban the user, missing permissions or the user is already banned.');
					}
				});
			}
			else {
				message.channel.send("Please supply the proper arguments: ban, @user, time(in minutes), [reason]");
			}
        });
    }
}
