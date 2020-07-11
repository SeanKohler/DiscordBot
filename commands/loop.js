module.exports = {
    name: 'loop',
    description: 'This command takes a single argument to loop 1 song',
    execute(message,args,inloop,inChannel,currentindex,play){
        inloop=true;
            if(!args[1]){
                message.channel.send("Add what title you wish to be looped");
            }else{
                if(!message.member.voice.connection){
                    if(message.member.voice.channel){
                        inChannel=true;
                        message.member.voice.channel.join()}
                        currentindex=args[1];
                        play(message,currentindex);
                        message.channel.bulkDelete(1);
                        return inloop
                    }else{
                        inChannel=false;
                    }
            }
    }
}