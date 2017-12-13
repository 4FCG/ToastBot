const main = require('../main.js');

module.exports = {
    Description: 'List all bans made with the bot on this server.',
    Usage: 'bans',
    func: (Client, message, args) => {
		let query = 'SELECT * FROM ' + message.guild.id + ' WHERE `Type`="Ban";';
		connection.query(query, function (error, results, fields) {
			results.forEach(function(row){
				Promise.all([client.bot.fetchUser(row.User_ID), client.bot.fetchUser(row.Given_By_ID)])
				.then(users => {
					message.channel.send(`${users[0]} was banned by ${users[1]} for `);
				});
			});
		});
	}
}