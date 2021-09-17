class Queue {
    constructor(guildId) {
        this.id = guildId;
        this.songs = [ ];
    }
    add(songUrl) {
        this.songs.push(songUrl);
    }
    remove(index) {
        this.songs.splice(index, 1);
    }
}

module.exports = Queue;