const main = require('../main.js');

module.exports = {
    Description: 'List all bans made with the bot on this server.',
    Usage: 'bans',
	Alias: ['bans', 'Bans', 'banlist', 'listbans'],
    func: (Client, message, args) => {
		let date = new Date();
		let time = date.getTime();
		let query = 'SELECT * FROM ' + message.guild.id + ' WHERE `Type`="Ban";';
		main.connect.query(query, function (error, results, fields) {
      if (results.length <= 0) {return message.channel.send('There currently are no bans.');}
			results.forEach(function(row){
				Promise.all([client.bot.fetchUser(row.User_ID), client.bot.fetchUser(row.Given_By_ID)])
				.then(users => {
					let left = ((row.Expire_Time - time) / 1000) / 60;
					message.channel.send(`${users[0]} was banned by ${users[1]} for ${left} more minutes. The reason was "${row.Comment}".`);
				});
			});
		});
	}
}
