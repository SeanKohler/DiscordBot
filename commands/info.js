const versiontxt = "Version: 1.4.0"
module.exports = {
    name: 'info',
    description: 'This command gives version data',
    execute(message, args){
        if(args[1] === 'version'){
            message.channel.send("I'm currently in Version: "+version);
            message.channel.send(versiontxt);
        }else{
            message.channel.send("Do I look like a support bot to you?");
        }
    }
}