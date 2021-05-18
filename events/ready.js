module.exports = (client) => {
    console.log(`Ready to serve in ${client.channels.cache.size} channel(s) on ${client.guilds.cache.size} server(s), for a total of ${client.users.cache.size} user(s).`);
  }