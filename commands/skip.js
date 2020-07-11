module.exports = {
    name: 'skip',
    description: 'This command skips the song currently playing. Only works properly when there is an active queue',
    execute(message,args,logs,currentindex,play){
        message.channel.bulkDelete(1);
            if(logs[1]==undefined||logs.length==0){
                message.channel.send("Queue has ended!");
                console.log("Queue has ended!");
                message.channel.send("!stop");
                return "";
            }else{
            //message.channel.send("!stop");
            console.log("Skipping: "+logs[0]);
            var skip= logs;
            skip.shift();
            logs=skip;
            currentindex=logs[0];
            if(logs.length==1){
                logs[1]="--endquery--";
            }
            return data={logs: logs, ci: currentindex};
            }
    }
}