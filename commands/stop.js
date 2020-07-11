module.exports = {
    name: 'stop',
    description: 'This command stops any current action the bot is in',
    execute(message,args,logs,currentindex,inloop){
        logs=[];
        currentindex="";
        inloop=false;
        message.channel.bulkDelete(1);
        if(message.member.voice.channel){
            inChannel=true;
        }else{
            inChannel=false;
        }
        if(inChannel==true) {
            message.member.voice.channel.join()
             message.guild.voice.connection.disconnect();           
        }
        return stopdata={logs: logs, ci: currentindex, inl: inloop}
    }
}