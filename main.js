const mysql = require('mysql');
const config = require("./config.json");

const conn = mysql.createConnection({
  host  : "localhost",
  user  : "root",
  password  : config.sqlpass,
  database  : "bot_test"
});

const Client = {
  Discord: require("discord.js"),
  config: require("./config.json"),
  commands: {},
  load: require("./load.js"),
  table: require("./tables.js"),
  perms: require("./authority.js")
}

conn.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('mysql connected as id ' + conn.threadId);
});

Client.bot = new Client.Discord.Client();

module.exports = {
	connect : conn,
	bot : Client.bot
};

Client.load.func(Client);

Client.bot.on("ready", () => {
  Client.table.func(Client, 1, 1, conn);
	console.log("Bot is connected!");
  console.log("Prefix set to " + Client.config.prefix);
  Client.bot.user.setGame("Node.js");
});

Client.bot.on("message", (message) => {
	if (!message.content.startsWith(Client.config.prefix)) {return;}
	let argument = message.content.slice(Client.config.prefix.length).split(",");
  if (argument[0] in Client.commands) {
    Promise.all(Client.perms.func(`${argument[0]}.js`, message, conn)).then(results => {
      if (results.includes("error")) {return message.reply("Something went wrong while checking permissions.");}
      else if (results.includes(true)) {
		Client.commands.forEach(function(command) {
			if (command.Alias.includes(argument[0])) {
				command.func(Client, message, argument.slice(1), conn);
			}
		});
      }
      else {
        return message.reply("You do not have permission to use this command.");
      }
    });
  }
});

process.on('exit', function () {
  conn.destroy();
});

process.on('SIGINT', function () {
  conn.end(function(err) {
    if (err) {
      console.log(err);
    }
    console.log('Ctrl-C...');
    process.exit(2);
  });
});

process.on('uncaughtException', function(e) {
  conn.end(function(err) {
    if (err) {
      console.log(err);
    }
    console.log('Uncaught Exception...');
    console.log(e.stack);
    process.exit(99);
  });
});

process.on("unhandledRejection", err => {
  console.error("Uncaught Promise Error: \n" + err.stack);
});

Client.bot.login(Client.config.toastToken);
