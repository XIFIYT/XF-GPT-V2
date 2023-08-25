const { ActivityType, Events } = require('discord.js');
const Discord = require('discord.js')
module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log('Ready!');

        client.user.setPresence({
            activities: [{ name: "vos question", type: ActivityType.Watching, url: "https://twitch.tv/xf_engine" }], status : 'idle' });
          
        }
    }
