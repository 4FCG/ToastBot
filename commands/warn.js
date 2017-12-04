const connection = require('../main.js');
const status = require('../status.js');

module.exports = {
    Description: 'Warn a user.',
    Usage: 'warn, @user, time(minutes), [reason]',
    func: (Client, message, args) => {
			if (typeof message.mentions.members.first() !== 'undefined' && Number.isInteger(args[1])) {
				let target = message.mentions.members.first();
				let date = new Date();
				let time = date.getTime() + ((args[1]*60)*1000);
				if (!args[2]) {args[2]=' ';}
				status.apply(target, message.author.id, 'warn', time, args[2]);
			}
			else {
				message.channel.send("Please supply the proper arguments: warn, @user, time(in minutes), [reason]");
			}
        });
    }
}