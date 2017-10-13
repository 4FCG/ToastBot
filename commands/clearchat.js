module.exports = {
    Description: 'Clears the chat up to 100 messages at a time.',
    Usage: 'delete,|number|',
    func: (client, msg, args) => {
      if (args[0] > 0 && args[0] <= 100) {
        msg.channel.fetchMessages({limit: Math.round(args[0])})
          .then(messages => {
            messages.deleteAll();
          });
      }
    }
}
