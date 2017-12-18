const main = require('../main.js');
const connection = main.connect;
const status = require('../status.js');

module.exports = {
    Description: 'Remove a warn from a user.',
    Usage: 'unwarn, warn_id',
	Alias; ['unwarn', 'Unwarn', 'UnWarn'],
    func: (Client, message, args) => {
			args[0] = Number(args[0].replace(" ", ""));
			if (Number.isInteger(args[0])) {
				let query = 'SELECT * FROM ?? WHERE `Status_ID`=? AND `Type`="Warn";';
				let inserts = [message.guild.id + '_status', args[0]];
				connection.query(mysql.format(query, inserts), function (error, results, fields) {
					if (results.length > 0) {
						status.remove(args[0], 'warn', 'NaN', message.guild, 'NaN');
						message.channel.send(`The warning with the id ${results[0].Status_ID} has been removed.`);
					}
					else {
						message.channel.send("Invalid warn_id.");
					}
				});
			}
			else {
				message.channel.send("Please supply the proper arguments: unwarn, warn_id");
			}
			message.delete(5000);
    }
}