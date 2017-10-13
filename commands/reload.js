module.exports = {
    Description: 'Command to reload other commands. Dev only.',
    Usage: 'reload <command>',
    func: (client, msg, args) => {
        if (msg.author.id !== client.user.id) {return msg.reply("This command is dev only.");}
        if (args.length >= 1) {
          client.load.func(client, args[0]);
        }
        else {
          client.load.func(client);
        }
        msg.delete();
    }
}
