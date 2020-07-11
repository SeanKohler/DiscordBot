module.exports = {
    name: 'website',
    description: 'This command prints out my github page',
    execute(message, args){
        message.channel.send("http://www.github.com/SeanKohler");
    }
}