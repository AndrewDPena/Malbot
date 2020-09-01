const fs = require('fs');
const Discord = require('discord.js');
const { token } = require('./token.json')
const { prefix, amelia, flau, purpdogs } = require('./config.json');

var args = process.argv.slice(2);

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles){
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('Ready!');
	if (!args.length){
		client.user.setPresence({
			activity: {
				name: 'for Amelia to say something',
				type: 'WATCHING'
			},
			status: 'online'
		});
	} else {
		client.user.setPresence({
			activity: {
				name: args.slice(1).join(' '),
				type: args[0]
			},
			status: 'online'
		});
	}
});

client.login(token);

client.on('message', message => {
	if (message.author == flau){
		console.log('success');
	}
	if (message.author == amelia && message.guild.id == purpdogs){
		var doggo = message.guild.emojis.cache.find(emoji => emoji.name === 'doggo');
		var mallo = message.guild.emojis.cache.find(emoji => emoji.name === 'mallo');
		message.react(doggo)
			.then(() => message.react(mallo));
		// console.log('meowdy');
	}

	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(' ');
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) return;

	try{
		client.commands.get(command).execute(message, args);
	} catch(error) {
		console.error(error);
		message.reply('Sorry, I was chewing on the cord and it broke something.');
	}
	/*
	switch(command){
		case 'hello':
		var user = message.guild.member(message.author)
		return message.channel.send('Hello, ' + user.displayName);

		case 'amelia':
		return message.channel.send({
			files: [{
				attachment: './files/tileddoggo.gif',
				name: 'tileddoggo.gif'
			}]
		});

		case 'timer':
		var current = new Date();
		return message.channel.send('Registered in '
		+ Math.abs(current - message.createdAt) + ' milliseconds');
	} */

	console.log(message.content);
});
