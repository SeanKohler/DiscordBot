module.exports = {
    name: 'rps',
    description: 'This command allows the bot to play Rock, Paper, Scissors with the person who typed the command',
    execute(message, args){
        if(!args[1]){
            message.channel.send("You need to choose Rock, Paper, or Scissors");
        }else{
            var num= Math.floor(Math.random()*3);
            //message.channel.send(num);
            if(num==0){
                if(args[1]=='Paper'||args[1]=='P'||args[1]=='p'||args[1]=='paper'){
                    message.channel.send("I Chose Rock! You've won!");
                    //break;
                }else if(args[1]=='Rock'||args[1]=='R'||args[1]=='r'||args[1]=='rock') {
                    message.channel.send("I Chose Rock! We Tied :/");
                    //break;
                }else{
                    message.channel.send("I Chose Rock! HA! I am the superior being! :)");
                    //break;
                }
            }else if(num==1){
                if(args[1]=='Scissors'||args[1]=='S'||args[1]=='s'||args[1]=='Scissor'){
                    message.channel.send("I Chose Paper! You've won!");
                    //break;
                }else if(args[1]=='Paper'||args[1]=='P'||args[1]=='p'||args[1]=='paper'){
                    message.channel.send("I Chose Paper! We Tied :/");
                    //break;
                }else{
                    message.channel.send("I Chose Paper! HA! I am the superior being! :)");
                    //break;
                }
        }else if(num==2){
            if(args[1]=='Rock'||args[1]=='R'||args[1]=='r'||args[1]=='rock'){
                message.channel.send("I Chose Scissors! You've won!");
                //break;
            }else if(args[1]=='Scissors'||args[1]=='S'||args[1]=='s'||args[1]=='Scissor'){
                message.channel.send("I Chose Scissors! We Tied :/");
                //break;
            }else{
                message.channel.send("I Chose Scissors! HA! I am the superior being! :)");
                //break;
            }
        }
    }
    }
}