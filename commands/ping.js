module.exports = {
    name: 'ping',
    description: 'This command pings the bot',
    execute(message, args){
        message.channel.send("pong!");
    }
}