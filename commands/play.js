const { Message, ReactionUserManager } = require("discord.js")
const yt = require('youtube-search-without-api-key');
const ytdl = require('ytdl-core');
const {
    AudioPlayerStatus,
    StreamType,
    createAudioPlayer,
    createAudioResource,
    joinVoiceChannel,
    entersState,
    getVoiceConnection
} = require('@discordjs/voice');

module.exports = {
    name: 'play',
    /**
     * @param {Message} message
     * @param {[String]} args
     */
    async execute(message, args) {
        const voiceChannel = message.member.voice.channel;

        if(args.length === 0) return this.resume(message, voiceChannel);
        else return this.start(message, args, voiceChannel);
    },
    async resume(message, voiceChannel) {        
        if(!voiceChannel) return message.reply('Désolé, mais vous n\'êtes dans aucun salon salon vocal');

        const connection = getVoiceConnection(voiceChannel.guild.id);

        if(!connection) return message.reply('Le bot n\'est actuellement pas connecté à un salon vocal')

        const player = connection.state.subscription?.player;

        if(!player) return message.reply('Désolé, mais aucune musique n\'est jouée actuellement');

        player.unpause();
    },
    async start(message, args, voiceChannel) {
        if(!voiceChannel) return message.reply('Désolé, mais veuillez rejoindre un salon avant d\'exécuter cette commande.');

        const query = args.join(' ');
        const [ { url } ] = await yt.search(query);

        // from discord.js/guide

        const guild = voiceChannel.guild;
        const connection = joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: guild.id,
            adapterCreator: guild.voiceAdapterCreator,
        });

        const stream = ytdl(url, { filter: 'audioonly', highWaterMark: 1<<25 });
        const resource = createAudioResource(stream, { inputType: StreamType.Arbitrary });
        const player = createAudioPlayer();

        player.play(resource);

        try {
            await entersState(player, AudioPlayerStatus.Playing, 5_000);
            // The player has entered the Playing state within 5 seconds
            message.reply('▶️ - Début de la lecture');
            console.log('test');
        } catch (error) {
            // The player has not entered the Playing state and either:
            // 1) The 'error' event has been emitted and should be handled
            // 2) 5 seconds have passed
            console.error(error);
            message.reply('Désolé, mais il y a eu une erreur.');
        }
        connection.subscribe(player);
    }
}