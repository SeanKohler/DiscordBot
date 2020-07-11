module.exports = {
    name: 'everyname',
    description: 'This command is a shorthand version of history command. It only shows the names of previously played songs and not any other data',
    execute(message, args){
        message.channel.bulkDelete(1);
        var namestr="";
        for(var i=0; i<cache.name.length; i++){
            namestr+=cache.name[i]+", ";
        }
        message.channel.send(namestr);
    }
}