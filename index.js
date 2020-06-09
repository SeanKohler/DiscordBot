const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const yts = require( 'yt-search' );
const mysql = require('mysql');
const credentials = require('./mysql');
const cases = require('./cases');
const tkn = require('./token');
const con = mysql.createConnection(credentials);
const bot = new Discord.Client();
const token = tkn.token;
const PREFIX ='!';
const version = "1.1.0";
var servers ={};
var inChannel = false;
var url="";
var videos ="";
var theQuery;
var text;
var history=[];
var logs=[];
var loop=false;

initdatabase();

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
                        //console.log(str);
                        yts( str, function ( err, r ) {
                            if(err){
                                message.channel.send("I Failed");
                                console.log("I Failed");
                                throw err;
                            }else{
                            //message.channel.send(r.videos[0].url);
                            //console.log(r);
                                
                            if(r.videos[0]==undefined){
                                message.reply("Undefined :/")
                                message.channel.send("Please try again");
                                console.log("undefined");
                                
                            }else{
                            url=r.videos[0].url
                            
                            //videos = r.videos
                            //url= videos[0].url; 
                            //console.log(videos[0].url); 
                            
                            //console.log(str);
                            //console.log(url);
                            addtoHistory(str,url);
                            
                            
                            
                            message.channel.send("!play "+url);
                            message.channel.send("!clearchat 2");
                            let dispatcher = connection.play(ytdl(url,{filter: "audioonly"}));
                           
                            
                            }
                            }
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
           cases.rps(args,message);
        break;
        //case 'skip:

        case 'history':
                var records=10;
                grabHistory(records); 
                function grabHistory(records){
                    theQuery = "SELECT * FROM songs";
                    //console.log(theQuery);
                    con.query(theQuery,function (err,result){
                        if(err)throw err;
                        //console.log(result[0].usertyped);
                        //removePlaceholder();//Replaces __PUTCOMMA..__ that safe stores in database
                        for(var i=0; i<=records; i++){
                            if(result[i]==undefined){
                                console.log("Searching For Out of bounds");
                            }else{
                            var txt=result[i].usertyped
                            txt = txt.trim();
                            console.log("TXT: "+txt);
                            var link =result[i].url;
                            var done="Record: "+"<"+txt+">"+" Link: "+"<"+link+">";
                            var exists=false;
                            for(var j=0; j<history.length;j++){
                                if(done==history[j]){
                                    exists=true;
                                    console.log("Dont add. It already exists");
                                }
                            }
                            if(exists==false){
                             history.push(done);   
                            }
                            console.log(history[i]);
                            
                            }
                            
                        }
                        console.log("Result: "+result);
                        console.log(history.length);
                        for(var i=0; i<history.length; i++){
                            console.log("HERE 2");
                            message.channel.send(history[i]);
                        }
                
                    });
                    //for(var i=0; i<history.length; i++){
                    //    message.channel.send(history[i]+" HERE!");
                    //}
                }
                //for(var i=0; i<history.length; i++){
                //    console.log("HERE 1");
                //    message.channel.send(history[i]+" HERE");
                //}

                        
            break;

        case 'clearhistory':
            message.channel.bulkDelete(1);
            var initQuery2 = "DELETE FROM songs;";
            con.query(initQuery2,function (err,result){
            if(err)throw err;
            });


        break;
        
        case 'stop':
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

        case 'howtospoon':
            cases.hts(message);
            break;

        case 'cl':
            cases.cl(message);
            break;

        case 'cs':
            cases.cs(message);
            break;
        
        case 'coinflip':
            cases.coinflip();
            break;

}
})

bot.login(token);





function addtoHistory(str,url){
    str ='"'+str+'"';
    url ='"'+url+'"';
    theQuery = 'INSERT INTO songs(usertyped,url)VALUES('+str+','+url+');';
    safestore();//Remove mid string quotes to keep integrity of insert query (adds __PUTCOMMA..__)
    con.query(theQuery,function (err,result){
    if(err)throw err;
    console.log("Database Insert Query worked!");
    });
}


function safestore(){
    theQuery = theQuery.replace(/'s/g,"__PUTCOMMAS__");
    theQuery = theQuery.replace(/'m/g,"__PUTCOMMAM__");
    theQuery = theQuery.replace(/'re/g,"__PUTCOMMARE__");
    theQuery = theQuery.replace(/'r/g,"__PUTCOMMAR__");
    theQuery = theQuery.replace(/'ll/g,"__PUTCOMMAll__");
    theQuery = theQuery.replace(/'ve/g,"__PUTCOMMAVE__");
    theQuery = theQuery.replace(/'/g," ");
}

function removePlaceholder(){
    text = text.replace(/__PUTCOMMAS__/g,"'s");
    text = text.replace(/__PUTCOMMAM__/g,"'m");
    text = text.replace(/__PUTCOMMARE__/g,"'re");
    text = text.replace(/__PUTCOMMAR__/g,"'r");
    text = text.replace(/__PUTCOMMAll__/g,"'ll");
    text = text.replace(/__PUTCOMMAVE__/g,"'ve");
}
function initdatabase(){
    var initQuery2 = "CREATE DATABASE IF NOT EXISTS discordmusicbot";
    con.query(initQuery2,function (err,result){
        if(err)throw err;
        });
    var initQuery3 = "USE discordmusicbot";
    con.query(initQuery3,function (err,result){
        if(err)throw err;
        });
    //var initQuery4 = "DROP TABLE IF EXISTS songs;";
    //con.query(initQuery4,function (err,result){
    //    if(err)throw err;
    //    });
    var initQuery5 = "CREATE TABLE if not exists songs(num INT UNIQUE AUTO_INCREMENT,usertyped VARCHAR(255), url VARCHAR(255));";
    con.query(initQuery5,function (err,result){
        if(err)throw err;
        });
}
