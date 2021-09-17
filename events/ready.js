module.exports = {
    once: true,
    type: 'ready',
    callback(client) {
        console.log(`Connected as ${client.user.tag} !`);
    }
}