const Queue = require("./Queue");

class Player {
    constructor(connection, guildId) {
        this.connection = connection;
        this.queue = new Queue(guildId);
    }
}