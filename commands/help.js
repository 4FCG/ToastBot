module.exports = {
    Description: 'Use the help command to learn more about a given command.',
    Usage: 'help, command',
	Alias: ['help', 'Help', 'commands', 'Commands', '?'],
    func: (client, msg, args) => {
      if (args[0]) {
        console.log(args[0])
        console.log(client.commands[args[0]].Description)
        console.log(client.commands[args[0]].Usage)
      }
      else {
        console.log("How to use the help command:")
        console.log(client.commands.help.Description)
        console.log(client.commands.help.Usage)
        console.log("|| means the argument is required <> means the argument is optional.")
      }
    }
}
