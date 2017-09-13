module.exports = {
    Description: 'Delete your own messages.',
    Usage: 'delete,|number| OR |all|',
    func: (client, msg, args) => {
      if (args[0] === "all") {
        msg.channel.fetchMessages({limit: 100})
          .then(messages => {
            let filteredMsg = messages.filter(m => m.author.id === client.bot.user.id);
            filteredMsg.deleteAll();
          });
      }
      else {
        msg.channel.fetchMessages({limit: 100})
          .then(messages => {
            let filteredMsg = messages.filter(m => m.author.id === client.bot.user.id);
            filteredMsg.array().slice(0, args[0] + 1).forEach(function(target) {
              target.delete();
            });
          });
      }
    }
}
