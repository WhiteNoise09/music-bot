const { Message } = require("discord.js")

module.exports = {
    type: 'messageCreate',
    /**
     * @param {Message} message
    */
    callback(message) {
        const client = message.client;
        const prefix = client.prefix;
        
        if(message.author.bot || !message.content.startsWith(prefix)) return;

        const [commandName, ...args] = message.content.slice(1).trim().split(' ');

        const command = client.commands.get(commandName);

        if(!command) return message.reply('Désolé, mais cette commande n\'existe pas.');

        try {
            command.execute(message, args);
        } catch(e) {
            console.error(e);
            message.reply('Désolé, mais il y a eu une erreur en exécutant la commande.');
        }
    }
}