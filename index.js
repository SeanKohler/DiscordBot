const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const yts = require( 'yt-search' );
const fs = require('fs');
const cases = require('./cases');
const tkn = require('./token');
const token = tkn.token;
const bot = new Discord.Client();
const PREFIX ='!';
const version = "1.3.0";
var cache={
    name: [],
    url: [],
    seconds: []
}
var servers ={};
var inChannel = false;
var url="";
var wait=': Please hold! (processing command)';
var flavortext=[
    'Im preparing for musical surgery'+wait,
    'Clear to cut into some spicy songs'+wait, 
    'You are listening to Doctor Music'+wait
];
var logs=[];
var seconds=1;
var firstplay=true;
var currentindex;
var inqueue=false;
var inloop=false;
var alreadyAPIcalled =false;
var cacheIndex;

bot.on('ready', () =>{
    console.log("DrMusic is running!");
    })

bot.login(token);

grabCache();


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
            if(!message.member.voice.connection){
                if(message.member.voice.channel){
                    inChannel=true;
                    message.member.voice.channel.join().then(function(connection){
                        var str='';
                        for(var i=1; i<args.length;i++){
                            str+=args[i]+" ";
                        }
                        play(message,str);
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
                    //message.channel.send(args[i]);
                }
                currentindex=logs[0];
                //setTimeout(encapsulate,1000*time);
                //function encapsulate(){
                console.log("--------------Start of the Queue--------------");
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
                if(!message.member.voice.connection){
                    if(message.member.voice.channel){
                        inChannel=true;
                        message.member.voice.channel.join()}
                        currentindex=args[1];
                        play(message,currentindex);
                    }else{
                        inChannel=false;
                    }
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
            //var author = message.member.nickname;


        break;
        
        case 'stop':
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
            
            break;
        
        case 'everyname':
            message.channel.bulkDelete(1);
            var namestr="";
            for(var i=0; i<cache.name.length; i++){
                namestr+=cache.name[i]+", ";
            }
            message.channel.send(namestr);

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

function play(message,str){
    str=str.trim();
    alreadyAPIcalled=false;
    for(var i=0; i<cache.name.length; i++){
        //console.log("Does "+str+" = "+cache.name[i]);
        cache.name[i]=cache.name[i].trim();
        if(str==cache.name[i].toString()){
            //console.log("YES!");
            alreadyAPIcalled=true;
            cacheIndex=i;
        }
    }
    if(alreadyAPIcalled==true){
        alreadyCalled(message,str)
    }else{

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
                    var num= Math.floor(Math.random()*flavortext.length);
                    message.channel.send(flavortext[num]);
                    console.log("--------------------------------");
                    console.log("undefined in function play ");
                    console.log("Attempting to play: "+str);
                    console.log("Playing in Server: "+message.guild.name);
                    console.log("--------------------------------\n");
                    firstplay=false;   
                }
                
            }else{
                cache.seconds.push(r.videos[0].seconds);
                cache.url.push(r.videos[0].url);
                cache.name.push(str);
                console.log("Added to cache");
                play(message,str);
            }
        
    }
})
    }
}



function addtoHistory(str,url,seconds,author){
    cacheToText();
    var txt =str+"\t -- "+"<"+url+">"+" --\t "+seconds+" -- "+author+"\n";
    fs.appendFile('histlog.txt', txt, function (err) {
        if (err) throw err;
        console.log('Playing: '+str+" \n");
      });
}

function grabCache(){
    fs.readFile('cache.json', 'utf8', function (err,data) {
        if (err) {
          return console.log(err);
        }
        if(cache==undefined){
            console.log("cache undefined");
        }else{
          cache=JSON.parse(data);  
        }
        
    })
}

function cacheToText(){
    var jsonData = JSON.stringify(cache);
fs.writeFile("cache.json", jsonData, function(err) {
    if (err) {
        console.log(err);
    }
});
}

function alreadyCalled(message,str){
    message.channel.bulkDelete(1);
        console.log("Already called!");
        message.member.voice.channel.join().then(function(connection){
        
        seconds=cache.seconds[cacheIndex];
        url=cache.url[cacheIndex];
        var author = message.member.user.username;
        addtoHistory(str,url,seconds,author);
        
        if(inloop==true){
            let dispatcher = connection.play(ytdl(url,{filter: "audioonly"})).on("finish",()=>{
                alreadyCalled(message,str);
            });
        }else if(logs.length>1||inqueue==true){
            inqueue=false;
        let dispatcher = connection.play(ytdl(url,{filter: "audioonly"})).on("finish",()=>{
            logs.shift();
            play(message,logs[0]);
        });
    }else{
        let dispatcher = connection.play(ytdl(url,{filter: "audioonly"}))
        ytdl(url).pipe(fs.createWriteStream('audio.mp3'));
    }
    })
}
