module.exports = {
    name: 'play',
    description: 'This plays a single song',
    execute(message, args, play){
        if(message.member.voice.channel){
            inChannel=true;
        }else{
            inChannel=false;
            message.channel.bulkDelete(1);
        }

        if(!args[1]){
            message.channel.send("Please specify a song link you want me to play!");
            return;
        }
        if(inChannel=false){
            message.channel.send("You must be in a channel to request a song!");
            return;
        }
        if(!message.member.voice.connection){
            if(message.member.voice.channel){
                inChannel=true;
                message.member.voice.channel.join().then(function(connection){
                    var str='';
                    for(var i=1; i<args.length;i++){
                        str+=args[i]+" ";
                    }
                    //console.log(str);
                    play(message,str);
                })
            }else{
                inChannel=false;
            }
    }
    }
}