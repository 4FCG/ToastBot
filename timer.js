const status = require('./status.js');
const main = require('./main.js');

module.exports = function () {
	let date = new Date();
	let time = date.getTime();
	main.bot.guilds.array().forEach(function(guild){
		let query = 'SELECT * FROM `' + guild.id + '_status`;';
		main.connect.query(query, function (error, results, fields) {
			for (let C = 0; C < results.length; C++) {
				if (results[C].Expire_Time < time) {

					main.bot.fetchUser(results[C].User_ID)
					.then(targ => {
						status.remove(results[C].Status_ID, results[C].Type.toLowerCase(), targ, guild, "Time Expired");
						console.log(`A ${results[C].Type.toLowerCase()} was removed.`);
					});


				}
			}
		});
	});
}
