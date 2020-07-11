module.exports = {
    name: 'coinflip',
    description: 'This command flips a coin for you. Decide heads or tails then call the command',
    execute(message, args){
        var num= Math.floor(Math.random()*2);
        if(num==0){
            message.reply("Heads!");
        }else{
            message.reply("Tails!");
        }
    }
}