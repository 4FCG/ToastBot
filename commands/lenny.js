module.exports = {
    Description: 'Changes the your message to a lenny face.',
    Usage: 'lenny',
    func: (client, msg, args) => {
        msg.channel.send("( ͡° ͜ʖ ͡°)");
    }
}
