const { Message } = require("discord.js");
const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
    name: 'pause',
    /**
     * @param {Message} message
     * @param {[String]} args
     */
    async execute(message, args) {
        const voiceChannel = message.member.voice.channel;
        
        if(!voiceChannel) return message.reply('Désolé, mais vous n\'êtes dans aucun salon salon vocal');

        const connection = getVoiceConnection(voiceChannel.guild.id);

        if(!connection) return message.reply('Le bot n\'est actuellement pas connecté à un salon vocal')

        const player = connection.state.subscription?.player;

        if(!player) return message.reply('Désolé, mais aucune musique n\'est jouée actuellement');

        player.pause();
    }
}