module.exports = {
    Description: 'Sends a pong back.',
    Usage: 'ping',
    func: (client, msg, args) => {
        msg.channel.send('pong');
    }
}
