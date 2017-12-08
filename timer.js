const client = require('./main.js');
const status = require('./status.js');

module.exports = function () {
	let date = new Date();
	let time = date.getTime();
	client.bot.guilds.array().forEach(function(guild){
		let query = 'SELECT * FROM `' + guild.id + '_status`;';
		client.connect.query(query, function (error, results, fields) {
			for (C = 0; C < results.length; C++) {
				if (results[C].Expire_Time < time) {
					status.remove()
				}
			}
		});
	});
}