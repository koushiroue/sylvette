const Discord = require('discord.js');
const client = new Discord.Client();

require('dotenv').config();
const { prefix } = require('./config.json');

client.once('ready', () => {
	console.log('aight.');
});
client.on('message', message => {
	if (message.content.startsWith(`${prefix}ping`)) {
		message.channel.send('Pong.');
	} else if (message.content.startsWith(`${prefix}beep`)) {
		message.channel.send('Boop.');
	}
});
client.login(process.env.TOKEN);