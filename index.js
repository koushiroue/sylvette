//Main js file.
//from anidiots.guide
console.log('Initializing...');

const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs");

//config
const { prefix } = require('./config.json');
//const { token } = require('./config.json');
const config = require("./config.json");
const message = require('./events/message');

//token
require('dotenv').config();
// We also need to make sure we're attaching the config to the CLIENT so it's accessible everywhere!
client.config = config;

//cli prepping
client.once('ready', () => {
	console.log('Bot is now Active.');
});

// This loop reads the /events/ folder and attaches each event file to the appropriate event.
fs.readdir("./events/", (err, files) => {
	if (err) return console.error(err);
	console.log('Loading Event handler(s)...');
	files.forEach(file => {
		
		// If the file is not a JS file, ignore it (thanks, Apple)
		if (!file.endsWith(".js")) return;
		// Load the event file itself
		const event = require(`./events/${file}`);
		// Get just the event name from the file name
		let eventName = file.split(".")[0];

		console.log(`./events/${eventName}.js loaded.`);

		// super-secret recipe to call events with all their proper arguments *after* the `client` var.
		// without going into too many details, this means each event will be called with the client argument,
		// followed by its "normal" arguments, like message, member, etc etc.
		// This line is awesome by the way. Just sayin'.
		client.on(eventName, event.bind(null, client));
		delete require.cache[require.resolve(`./events/${file}`)];
	});
	console.log(`All Event Handler(s) loaded.`);
});

//initializing commands collection
//and the reading the commands
client.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
	if (err) return console.error(err);
	console.log(`Loading Commands file(s)...`);
	files.forEach(file => {

		if (!file.endsWith(".js")) return;
		// Load the command file itself
		let props = require(`./commands/${file}`);
		// Get just the command name from the file name
		let commandName = file.split(".")[0];

		console.log(`.commands/${commandName}.js loaded.`);

		// Here we simply store the whole thing in the command Enmap. We're not running it right now.
		client.commands.set(commandName, props);
	});
	console.log(`All Commands file(s) loaded.`);
});

//microcommands
client.on('message', message => {
	//handling arguments in commands
	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();
});

// Set the bot's presence (activity and status)
client.on("ready", () => {
    client.user.setPresence({
        activity: { 
            name: 'Cels cringing.',
            type: 'WATCHING'
        },
        status: 'idle'
    })
	console.log(`Bot presence configured.`)
})

//auth
client.login(process.env.TOKEN);
console.log('Token verified.');
