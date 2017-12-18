module.exports = {
    Description: 'Changes the your message to a lenny face.',
    Usage: 'lenny',
	Alias: ['lenny', 'Lenny', 'lennyface'],
    func: (client, msg, args) => {
        msg.channel.send("( ͡° ͜ʖ ͡°)");
    }
}
