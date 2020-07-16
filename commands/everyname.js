module.exports = {
    name: 'everyname',
    description: 'This command is a shorthand version of history command. It only shows the names of previously played songs and not any other data',
    execute(message, cache){
        message.channel.bulkDelete(1);
        var namestr="";
        for(var i=0; i<cache.name.length; i++){
            if(cache.name[i].includes("https://")){//If a url is detected add < & > on either side so it wont create an embed
                if(cache.name[i].includes("<")){
                    //Already added to ends do nothing
                }else{
                   cache.name[i]="<"+cache.name[i]+">"; 
                }
            }
            namestr+=cache.name[i]+", ";
        }
        message.channel.send(namestr);
    }
}
