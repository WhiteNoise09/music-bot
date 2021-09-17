const fs = require('fs');

const { prefix, token } = ('TOKEN' in process.env) ?
     { prefix: process.env.PREFIX, token: process.env.TOKEN } :
     require('./config.json');

const { Client, Intents } = require('discord.js');
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES
    ]
});

client.commands = new Map();
client.prefix = prefix ?? process.env.PREFIX;

fs.readdirSync('./commands').forEach(file => {
    const command = require(`./commands/${file}`);
    
    client.commands.set(command.name, command);
});

fs.readdirSync('./events').forEach(file => {
    const { type, callback, once } = require(`./events/${file}`);
    
    (once) ?
        client.once(type, callback) :
        client.on(type, callback);
});

client.login(token);