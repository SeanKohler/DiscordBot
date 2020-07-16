module.exports = {
    name: 'checkrole',
    description: 'This command is run automatically when a song is requested. Will add the docs assistant role when the criteria is met',
    execute(message, args){
        const fs = require('fs');
        const readline = require('readline');
        const readInterface = readline.createInterface({
            input: fs.createReadStream(__dirname+'../../histlog.txt'),
            output: false,
            console: false
        });
            var occurs=0;
            var user=message.author.username;
            readInterface.on('line', function(line) {

                if(line.includes(user)){
                    occurs+=1;
                }
            });
            setTimeout(checkIt,1000,message,args);
            function checkIt(message,args){
                if(occurs>=15){
                    if(message.member.roles.cache.some(r => r.name ==="Doctors Assistant")){
                        //console.log(user+" Already has assistant role");
                    }else{
                    let role = message.guild.roles.cache.find(r => r.name ==="Doctors Assistant");
                    message.channel.send(user+ "! You've earned the Doctors Assistant Role!");
                    message.member.roles.add(role);
                    }
                }else{
                    //console.log(user+" Is not ready to be an assistant");
                }
            }
        }
    }