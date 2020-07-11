//---------------------------------------------
//-------- Code Written by Sean Kohler --------
//------ Current Working Version: 1.4.0 -------
//---------------------------------------------
const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const yts = require( 'yt-search' );
const fs = require('fs');
const tkn = require('./token');
const token = tkn.token;
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const commandFiles =fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
const PREFIX ='!';
var cache={
    name: [],
    url: [],
    seconds: []
}
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


for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command);
}


bot.on('ready', () =>{
    console.log("DrMusic is running!");
    })

bot.login(token);

grabCache();

bot.on('message',message=>{
    let args = message.content.substring(PREFIX.length).split(" ");

    switch(args[0]){
        case 'ping':
            bot.commands.get('ping').execute(message,args);
            break;
        
        case 'website':
            bot.commands.get('website').execute(message,args);
            break;

        case 'info':
            bot.commands.get('info').execute(message,args);
            break;
        
        case 'clearchat':
            bot.commands.get('clearchat').execute(message,args);
            break;

        case 'embed':
            bot.commands.get('embed').execute(message,args);
            break;
        
        case 'play':
            bot.commands.get('play').execute(message,args,play);
        break;

        case 'rps':
           bot.commands.get('rps').execute(message,args);
        break;

        case 'history':
            bot.commands.get('history').execute(message,args);
            break;
        

        case 'queue':
            logs=bot.commands.get('queue').execute(message,args,logs,inqueue,currentindex,play);
            break;

        case 'loop':
            inloop =bot.commands.get('loop').execute(message,args,inloop,inChannel,currentindex,play);
            break;

        case 'skip':
            var skipdata =bot.commands.get('skip').execute(message,args,logs,currentindex,play);
            logs=skipdata.logs;
            currentindex=skipdata.ci
            play(message,currentindex);
            break;

        case 'clearhistory':
            bot.commands.get('clearhistory').execute(message,args);
        break;
        
        case 'stop':
            var stopdata =bot.commands.get('stop').execute(message,args,logs,currentindex,inloop);
            logs=stopdata.logs;
            currentindex=stopdata.ci;
            inloop=stopdata.inl;
            break;
        
        case 'everyname':
            bot.commands.get('everyname').execute(message,args,cache);
            break;
        case 'hts':
            //removed command. you can add it if you want idc
            break;

        case 'cl':
            bot.commands.get('cl').execute(message,args, play);
            break;

        case 'cs':
            bot.commands.get('cs').execute(message,args,play);
            break;
        
        case 'coinflip':
            bot.commands.get('coinflip').execute(message,args);
            break;

}
})

function play(message,str){
    if(str==undefined||str=="--endquery--"){
        console.log("str undefined in play");
    }else{
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
            //message.channel.send(r.videos[0].url);
            //console.log(r);
                
            if(r.videos[0]==undefined){
                //setTimeout(play,1000*2,message,str);
                play(message,str);
                //message.channel.send("!play "+str)
                //message.channel.send("!play "+str);
               // message.reply("Undefined :/")
                //message.channel.send("Please try again");
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
                //console.log("NAME[0] "+cache.name[0]);
                //console.log("URL[0] "+cache.url[0]);
                //console.log("NAME[1] "+cache.name[1]);
                //console.log("URL[1] "+cache.url[1]);
                //console.log("NAME[2] "+cache.name[2]);
                //console.log("URL[2] "+cache.url[2]);
                play(message,str);
            }
        
    }
})
    }
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
    //var string = "{'key':'value'}";
    //var obj = JSON.parse(string);
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
        if(str=="--endquery--"){
            message.channel.send("!stop");
        }else{
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
            //message.channel.bulkDelete(1);
            inqueue=false;
        let dispatcher = connection.play(ytdl(url,{filter: "audioonly"})).on("finish",()=>{
            logs.shift();
            play(message,logs[0]);
        });
    }else{
        message.channel.bulkDelete(1);
        let dispatcher = connection.play(ytdl(url,{filter: "audioonly"}))
        //ytdl(url).pipe(fs.createWriteStream('audio.mp3')); //Use this line to download an mp3 file of the chosen track
    }
    })
}
}
