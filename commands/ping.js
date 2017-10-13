module.exports = {
    Description: 'Sends a pong back.',
    Usage: 'ping',
    func: (client, msg, args) => {
        msg.channel.send('pong').then(message => {
          message.edit(`pong, this took ${message.createdTimestamp - msg.createdTimestamp}ms`);
        });
    }
}
