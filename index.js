//Main js file.

const Discord = require('discord.js');
const client = new Discord.Client();

//config
const { prefix } = require('./config.json');
const { token } = require('./config.json');

//token
require('dotenv').config();

//cli prepping
client.once('ready', () => {
	console.log('aight.');
});
//ping a.k.a hello world
client.on('message', message => {
	if (message.content.startsWith(`${prefix}ping`)) {
		message.channel.send('Pong.');
	} else if (message.content.startsWith(`${prefix}beep`)) {
		message.channel.send('Boop.');
	}
	if (message.content.startsWith(`${prefix}help`)){
		message.channel.send('you asked for help but nobody came.');
	}
});
//status
// Set the bot's presence (activity and status)
client.on("ready", () => {
    client.user.setPresence({
        activity: { 
            name: 'Cels cringing.',
            type: 'WATCHING'
        },
        status: 'idle'
    })
})
//auth
client.login(process.env.TOKEN);