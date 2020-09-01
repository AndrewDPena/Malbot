const { prefix } = require('../config.json');

module.exports = {
    name: 'malp',
    description: 'Literally what you just did, it\'s all my available commands',
    execute(message, args) {
        const data = [];
        const { commands } = message.client;
        if (!args.length){
            data.push('Here\'s all the tricks I\'ve learned:');
            data.push(commands.map(command => command.name).join(', '));
            data.push(`\nYou can send \`${prefix}malp [command name]\` to get info on a specific command!`);

            return message.channel.send(data, { split: true });
        }

        const name = args[0].toLowerCase();
        const command = commands.get(name); // || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
	           return message.reply('I don\'t know that one.');
        }
        data.push(`**Name:** ${command.name}`);
        if (command.description) data.push(`**Description:** ${command.description}`);
        return message.channel.send(data, { split: true });
    }
}
