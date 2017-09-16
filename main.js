const Client = {
  Discord: require("discord.js"),
  config: require("./config.json"),
  commands: {},
  load: require("./load.js"),
  table: require("./tables.js")
}
Client.bot = new Client.Discord.Client();

Client.load.func(Client);

Client.bot.on("ready", () => {
  Client.table.func(Client);
	console.log("Bot is connected!");
  console.log("Prefix set to " + Client.config.prefix);
  Client.bot.user.setGame("Node.js");
});

Client.bot.on("message", (message) => {
	if (!message.content.startsWith(Client.config.prefix)) {return;}
	let argument = message.content.slice(Client.config.prefix.length).split(",");
  if (argument[0] in Client.commands) {
    Client.commands[argument[0]].func(Client, message, argument.slice(1));
  }
});

process.on('uncaughtException', function (err) {
  console.log('Caught exception: ' + err);
});

process.on("unhandledRejection", err => {
  console.error("Uncaught Promise Error: \n" + err.stack);
});

Client.bot.login(Client.config.toastToken);
