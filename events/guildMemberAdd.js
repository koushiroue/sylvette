module.exports = (client, member) => {
    const defaultChannel = member.guild.channels.cache.find(channel => channel.permissionsFor(guild.me).has("SEND_MESSAGES"));
    defaultChannel.send(`Welcome ${member.user}, please dont rape me.`).catch(console.error);
  }