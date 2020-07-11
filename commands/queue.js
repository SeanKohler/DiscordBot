module.exports = {
    name: 'queue',
    description: 'This command takes a number of arguments and puts them into a queue to be played',
    execute(message,args,logs,inqueue,currentindex,play){
        inqueue=true;
            logs=[];
            if(!args[1]){
                message.channel.send("Add elements you want to be queued");
            }else{
                if(message.member.voice.channel){
            
                message.member.voice.channel.join();
                console.log(args.length);
                for(var i=1; i<args.length; i++){
                    var str =args[i];
                    str = str.replace(/-/g," ");
                    logs.push(str);
                    console.log(str)
                }
                currentindex=logs[0];
                console.log("--------------Start of the Queue--------------");
                console.log("Playing: "+ currentindex);
                play(message,currentindex);
                return logs;
            }
            }
    }
}