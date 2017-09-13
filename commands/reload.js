module.exports = {
    Description: 'Command to reload other commands.',
    Usage: 'reload <command>',
    func: (client, msg, args) => {
        if (args.length >= 1) {
          client.load.func(client, args[0]);
        }
        else {
          client.load.func(client);
        }
        msg.delete();
    }
}
