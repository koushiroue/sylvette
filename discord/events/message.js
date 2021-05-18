module.exports = (client, message) => {

    // Filtering Messages
    // Ignore all bots
    if (message.author.bot) return;
  
    // Ignore messages not starting with the prefix (in config.json)
    if (message.content.indexOf(client.config.prefix) !== 0) return;
  
    // Our standard argument/command name definition.
    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
  
    // Grab the command data from the client.commands Enmap
    const cmd = client.commands.get(command);
  
    // If that command doesn't exist, silently exit and do nothing
    if (!cmd) return;
  
    // Run the command
    cmd.run(client, message, args);


    // Inside your message event, this code will stop any command during cooldown.
    // Should be placed after your code that checks for bots & prefix, for best performance
    if (talkedRecently.has(message.author.id))
    return;
    // Adds the user to the set so that they can't talk for 2.5 seconds
    talkedRecently.add(message.author.id);
    setTimeout(() => {
    // Removes the user from the set after 2.5 seconds
    talkedRecently.delete(message.author.id);
    }, 2500);


  };