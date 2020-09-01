module.exports = {
    name: 'amelia',
    description: 'Sends Amelia her favorite thing.',
    execute(message, args) {
        return message.channel.send({
			files: [{
				attachment: './files/tileddoggo.gif',
				name: 'tileddoggo.gif'
			}]
		});
    }
}
