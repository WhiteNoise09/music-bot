const { Message } = require("discord.js")

module.exports = {
    name: 'ping',
    /**
     * @param {Message} message
     * @param {[String]} args
     */
    async execute(message, args) {
        message.reply('Pong !');
    }
}