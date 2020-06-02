const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const yts = require( 'yt-search' );
const mysql = require('mysql');
const credentials = require('./mysql');
const con = mysql.createConnection(credentials);
const bot = new Discord.Client();
const token ='NzE2NDcwNDE5Nzk1ODY5Njk2.XtMPRQ.V1zMU0_bAzQXBbvw9nh4fQq8VOg';
const PREFIX ='!';
const version = "1.0.0";
var servers ={};
var inChannel = false;
var url="";
var videos ="";
var theQuery;



bot.on('ready', () =>{
console.log("DrMusic is running!");
})

bot.on('message',message=>{
    let args = message.content.substring(PREFIX.length).split(" ");

    switch(args[0]){
        case 'ping':
            message.channel.send("pong!");
            break;
        
        case 'website':
            message.channel.send("www.spotify.com");
            break;

        case 'info':
            if(args[1] === 'version'){
                message.channel.send("I'm currently in version: "+version);
            }else{
                message.channel.send("Do I look like a support bot to you?");
            }
            break;
        
        case 'clearchat':
            if(!args[1]) return message.reply("Error you are not as powerful as me lol");
            message.channel.bulkDelete(args[1]);
            break;

        case 'embed':
            const embed = new Discord.MessageEmbed()
            .setColor(0x25FA34)
            .setThumbnail(message.author.displayAvatarURL())
            .setTitle("User Information")
            .setDescription("Player Name: "+ message.author.username)
            .addFields(
                { name: "Current Server: ", value: message.guild.name },
                { name: "Roles: ", value: message.guild.roles.highest.name })
            //message.member.roles
            //.addField("Version: "+version)
            //.addField("Current Server: "+message.guild.name,);
            message.channel.send(embed);
            break;
        
        case 'play':

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
            if(!servers[message.guild.id]) servers[message.guild.id]={
                queue:[]
            }
            var server = servers[message.guild.id];
            server.queue.push(args[1]);

            if(!message.member.voice.connection){
                if(message.member.voice.channel){
                    inChannel=true;
                    message.member.voice.channel.join().then(function(connection){
                        var str='';
                        for(var i=1; i<args.length;i++){
                            str+=args[i]+" ";
                        }
                        console.log(str);
                        yts( str, function ( err, r ) {

                            //message.channel.send(r.videos[0].url);
                            console.log(r);
                                
                                
                            url=r.videos[0].url
                            
                            //videos = r.videos
                            //url= videos[0].url; 
                            //console.log(videos[0].url);  
                            
                            
                            message.channel.send("!play "+url);
                            message.channel.send("!clearchat 2");
                            let dispatcher = connection.play(ytdl(url,{filter: "audioonly"}));
                            })
                            
                          
                        //play(connection, message);
                        message.channel.bulkDelete(1);
                    })
                }else{
                    inChannel=false;
                }
        }
        break;

        case 'rps':
            if(!args[1]){
                message.channel.send("You need to choose Rock, Paper, or Scissors");
            }else{
                var num= Math.floor(Math.random()*3);
                //message.channel.send(num);
                if(num==0){
                    if(args[1]=='Paper'||args[1]=='P'||args[1]=='p'){
                        message.channel.send("I Chose Rock! You've won!");
                        break;
                    }else if(args[1]=='Rock'||args[1]=='R'||args[1]=='r') {
                        message.channel.send("I Chose Rock! We Tied :/");
                        break;
                    }else{
                        message.channel.send("I Chose Rock! HA! I am the superior being! :)");
                        break;
                    }
                }else if(num==1){
                    if(args[1]=='Scissors'||args[1]=='S'||args[1]=='s'||args[1]=='Scissor'){
                        message.channel.send("I Chose Paper! You've won!");
                        break;
                    }else if(args[1]=='Paper'||args[1]=='P'||args[1]=='p'){
                        message.channel.send("I Chose Paper! We Tied :/");
                        break;
                    }else{
                        message.channel.send("I Chose Paper! HA! I am the superior being! :)");
                        break;
                    }
            }else if(num==2){
                if(args[1]=='Rock'||args[1]=='R'||args[1]=='r'){
                    message.channel.send("I Chose Scissors! You've won!");
                    break;
                }else if(args[1]=='Scissors'||args[1]=='S'||args[1]=='s'||args[1]=='Scissor'){
                    message.channel.send("I Chose Scissors! We Tied :/");
                    break;
                }else{
                    message.channel.send("I Chose Scissors! HA! I am the superior being! :)");
                    break;
                }
            }
        }
        break;
        //case 'skip:
        
        case 'stop':
            message.channel.bulkDelete(1);
            if(message.member.voice.channel){
                inChannel=true;
            }else{
                inChannel=false;
            }
            if(inChannel==true) {
                 message.guild.voice.connection.disconnect();                
            }
            
            break;
        
        case 'coinflip':
            var num= Math.floor(Math.random()*2);
            if(num==0){
                message.reply("Heads!");
            }else{
                message.reply("Tails!");
            }
            break;

}
})

bot.login(token);
