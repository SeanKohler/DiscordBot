const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const yts = require( 'yt-search' );
const fs = require('fs');
const cases = require('./cases');
const tkn = require('./token');
const token = tkn.token;
const bot = new Discord.Client();
const PREFIX ='!';
const version = "1.2.0";
var servers ={};
var inChannel = false;
var url="";
var flavortext=['Im preparing for musical surgery: Please hold!', 'Clear to cut into some spicy songs: Please hold!', 'You are listening to Doctor Music: Please hold!'];
var logs=[];
var seconds=1;
var firstplay=true;
var currentindex;
var inqueue=false;
var inloop=false;

bot.on('ready', () =>{
console.log("DrMusic is running!");
})

bot.on('message',message=>{
    let args = message.content.substring(PREFIX.length).split(" ");

    switch(args[0]){
        case 'ping':
            cases.ping(message);
            break;
        
        case 'website':
            cases.website(message);
            break;

        case 'info':
            cases.info(args,message);
            break;
        
        case 'clearchat':
            message.channel.bulkDelete(1);
            cases.clearchat(args,message);
            break;

        case 'embed':
            cases.embed(message);
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
                        play(message,str);
                        message.channel.bulkDelete(1);
                    })
                }else{
                    inChannel=false;
                }
        }
        break;

        case 'rps':
           cases.rps(args,message);
        break;

        case 'history':
                fs.readFile('histlog.txt', 'utf8', function (err,data) {
                    if (err) {
                      return console.log(err);
                    }
                    console.log(data);
                    message.channel.send(data);
                  });                        
            break;
        

        case 'queue':
            inqueue=true;
            logs=[];
            if(!args[1]){
                message.channel.send("Add elements you want to be queued");
            }else{
                if(message.member.voice.channel){
            
                message.member.voice.channel.join();
                for(var i=1; i<args.length; i++){
                    var str =args[i];
                    str = str.replace(/-/g," ");
                    logs.push(str);
                }
                var increment=0;
                currentindex=logs[0];
                console.log("Playing: "+ currentindex);
                play(message,currentindex);
            }
            }
            break;

        case 'loop':
            inloop=true;
            if(!args[1]){
                message.channel.send("Add what title you wish to be looped");
            }else{
                currentindex=args[1];
                play(message,currentindex);
            }
            break;

        case 'skip':
            message.channel.bulkDelete(1);
            if(logs[1]==undefined){
                message.channel.send("Queue has ended!");
                console.log("Queue has ended!");
                message.channel.send("!stop");
            }else{
            console.log("Skipping: "+logs[0]);
            var skip= logs;
            skip.shift();
            logs=skip;
            currentindex=logs[0];
            play(message,currentindex);
            }
            break;

        case 'clearhistory':
            var catalog;
            fs.readFile('histlog.txt', 'utf8', function (err,data) {
                if (err) {
                  return console.log(err);
                }
                catalog=data;
            fs.appendFile('catalog.txt', catalog, function (err) {
                if (err) throw err;
                console.log('Saved!');
              });
              catalog="";
            fs.writeFile('histlog.txt', catalog, function (err) {
                if (err) throw err;
              });
              });
        break;
        
        case 'stop':
            logs=[];
            message.channel.bulkDelete(1);
            if(message.member.voice.channel){
                inChannel=true;
            }else{
                inChannel=false;
            }
            if(inChannel==true) {
                message.member.voice.channel.join().then(function(connection){
                let dispatcher = connection.play(ytdl(url,{filter: "audioonly"}));
                 message.guild.voice.connection.disconnect();   
                })             
            }
            
            break;

        case 'hts':
            cases.hts(message);
            break;

        case 'cl':
            cases.cl(message);
            break;

        case 'cs':
            cases.cs(message);
            break;
        
        case 'coinflip':
            cases.coinflip(message);
            break;

}
})

bot.login(token);
function play(message,str){
    message.member.voice.channel.join().then(function(connection){
    yts( str, function ( err, r ) {
        if(err){
            if(logs[0]==undefined){
                message.channel.send("!stop");
            }
            play(message,str);
            throw err;
        }else{
            
        if(r.videos[0]==undefined){
            play(message,str);
            if(firstplay==true){
                var num= Math.floor(Math.random()*3);
                message.channel.send(flavortext[num]);
             console.log("undefined in function play ");
             firstplay=false;   
            }
            
            
        }else{
        seconds=r.videos[0].seconds
        url=r.videos[0].url
        var author = message.member.user.username;
        addtoHistory(str,url,seconds,author);
        if(firstplay==false){
            message.channel.bulkDelete(1);
        }
        
        
        firstplay=true;
        message.channel.send("!play "+url);
        message.channel.send("!clearchat 2");
        if(logs.length>1||inqueue==true){
            inqueue=false;
        let dispatcher = connection.play(ytdl(url,{filter: "audioonly"})).on("finish",()=>{
            logs.shift();
            play(message,logs[0]);
        });
    }else if(inloop==true){
        let dispatcher = connection.play(ytdl(url,{filter: "audioonly"})).on("finish",()=>{
            play(message,currentindex);
        });
    }else{
        let dispatcher = connection.play(ytdl(url,{filter: "audioonly"}))
    }

        }
        }
        })
    })
}

function addtoHistory(str,url,seconds,author){
    var txt =str+"\t -- "+"<"+url+">"+" --\t "+seconds+" -- "+author+"\n";
    fs.appendFile('histlog.txt', txt, function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
}
