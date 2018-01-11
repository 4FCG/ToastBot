const main = require('../main.js');
const connection = main.connect;
const status = require('../status.js');

module.exports = {
    Description: 'Unmute a user.',
    Usage: 'unmute, @user',
	  Alias: ['mute', 'Mute'],
    func: (Client, message, args) => {
			if (typeof message.mentions.members.first() !== 'undefined') {
				let target = message.mentions.members.first();
				let query = 'SELECT COUNT(Status_ID) AS data FROM `' + target.guild.id + '_status` WHERE `Type`="Mute" AND `User_ID`="' + target.id + '";';
				connection.query(query, function (error, results, fields) {
					if(results[0].data > 0){
						status.remove(1, 'mute', target, message.guild, "Unmuted");
					}
					else {
						message.channel.send('Failed to unmute the user, the user is not muted.');
					}
				});
			}
			else {
				message.channel.send("Please supply the proper arguments: unmute, @user");
			}
      message.delete(5000);
    }
}
