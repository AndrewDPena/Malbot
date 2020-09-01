module.exports = {
    name: 'hello',
    description: 'I will say hello to you. Be grateful.',
    execute(message, args) {
        var user = message.guild.member(message.author)
		return message.channel.send('Hello, ' + user.displayName);
    }
}
