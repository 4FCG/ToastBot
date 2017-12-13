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
					client.bot.fetchUser(results[C].User_ID)
					.then(targ => {
						status.remove(results[C].Status_ID, results[C].Type.toLowerCase(), targ, guild, "Time Expired");
					});
				}
			}
		});
	});
}