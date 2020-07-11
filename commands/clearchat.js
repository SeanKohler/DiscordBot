module.exports = {
    name: 'clearchat',
    description: 'This command removes a user specified amount of lines from the chat as a second argument',
    execute(message, args){
    if(!args[1]) return message.reply("Error you are not as powerful as me lol");
    message.channel.bulkDelete(args[1]);
    }
}