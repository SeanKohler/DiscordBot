//---------------------------------------------
//-------- Code Written by Sean Kohler --------
//------ Current Working Version: 1.4.3 -------
//---------------------------------------------
const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const yts = require('yt-search');
const fs = require('fs');
const tkn = require('./token');
const token = tkn.token;
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
const PREFIX = '!';
var cache = {
    name: [],
    url: [],
    seconds: []
}
var inChannel = false;
var url = "";
var wait = ': Please hold! (processing command)';
var flavortext = [
    'Im preparing for musical surgery' + wait,
    'Clear to cut into some spicy songs' + wait,
    'You are listening to Doctor Music' + wait
];
var logs = [];
var seconds = 1;
var firstplay = true;
var currentindex;
var inqueue = false;
var inloop = false;
var alreadyAPIcalled = false;
var cacheIndex;

for (const file of commandFiles) {//for (files that end in .js)
    const command = require(`./commands/${file}`);//Require any file that is in the commands folder
    bot.commands.set(command.name, command);
}

bot.on('ready', () => {
    console.log("DrMusic is running!");
})

bot.login(token);


grabCache();//Populate the running cache on startup

bot.on('message', message => {
    let args = message.content.substring(PREFIX.length).split(" ");//Remove the PREFIX from the command name

    guild = message.guild;
    if (guild.roles.cache.some(r => r.name === "Doctors Assistant")) {
        //DO NOTHING ROLE EXISTS
    } else {
        bot.commands.get('defineRole').execute(message);//Go and create the role
    }
    switch (args[0]) {
        case 'ping':
            bot.commands.get('ping').execute(message, args);
            break;

        case 'website':
            bot.commands.get('website').execute(message, args);
            break;

        case 'info':
            bot.commands.get('help').execute(message, args);
            break;

        case 'clearchat':
            bot.commands.get('clearchat').execute(message, args);
            break;

        case 'embed':
            bot.commands.get('embed').execute(message, args);
            break;

        case 'play':
            bot.commands.get('checkrole').execute(message, args);//Will grant a role over time for using Dr Music
            bot.commands.get('play').execute(message, args, play);
            break;

        case 'rps':
            bot.commands.get('rps').execute(message, args);
            break;

        case 'history':
            bot.commands.get('history').execute(message, args);
            break;

        case 'queue':
            logs = bot.commands.get('queue').execute(message, args, logs, inqueue, currentindex, play);
            break;

        case 'loop':
            inloop = bot.commands.get('loop').execute(message, args, inloop, inChannel, currentindex, play);
            break;

        case 'skip':
            var skipdata = bot.commands.get('skip').execute(message, args, logs, currentindex, play);
            logs = skipdata.logs;
            currentindex = skipdata.ci
            play(message, currentindex);
            break;

        case 'clearhistory':
            bot.commands.get('clearhistory').execute(message, args);
            break;

        case 'stop':
            var stopdata = bot.commands.get('stop').execute(message, args, logs, currentindex, inloop);
            logs = stopdata.logs;
            currentindex = stopdata.ci;
            inloop = stopdata.inl;
            firstplay = true;
            break;

        case 'everyname':
            bot.commands.get('everyname').execute(message, cache);
            break;
        case 'hts':
            //removed command. you can add it if you want idc
            break;

        case 'cl':
            bot.commands.get('cl').execute(message, args, play);
            break;

        case 'cs':
            bot.commands.get('cs').execute(message, args, play);
            break;

        case 'coinflip':
            bot.commands.get('coinflip').execute(message, args);
            break;

        case 'createRole':
            bot.commands.get('createRole').execute(message, args[1]);//Go and create the role
            break;
        
        case 'v':
            bot.commands.get('v').execute(message,args);
            break;
    }
})

function play(message, str) {//The main play audio function
    if (str == undefined || str == "--endquery--") {
        console.log("str undefined in play");
    } else {
        str = str.trim();
        alreadyAPIcalled = false;
        for (var i = 0; i < cache.name.length; i++) {//Loop through the names of songs in the cache
            cache.name[i] = cache.name[i].trim();
            if (str == cache.name[i].toString()) {//If the input string = any cached name, It already exists!
                alreadyAPIcalled = true;
                cacheIndex = i;
            }
        }
        if (alreadyAPIcalled == true) {//If the data exists in the cache go to play it
            alreadyCalled(message, str)
        } else {

            yts(str, function (err, r) {//Search the string to youtube
                if (err) {
                    if (logs[0] == undefined) {//If the next index is undefined stop playing to avoid crash
                        message.channel.send("!stop");
                    }
                    play(message, str);//Try again there was an error
                    throw err;
                } else {
                    if (r.videos[0] == undefined) {//Data not recieved! Try again

                        play(message, str);//Go Back and try again

                        if (firstplay == true) {//Ideally this code shouldnt run but for some reason it does sometimes while testing
                            var num = Math.floor(Math.random() * flavortext.length);
                            message.channel.send(flavortext[num]);
                            console.log("--------------------------------");
                            console.log("undefined in function play ");
                            console.log("Attempting to play: " + str);
                            console.log("Playing in Server: " + message.guild.name);
                            console.log("--------------------------------\n");
                            firstplay = false;
                        }
                    } else {//If all the data was successfully recieved run the rest of the code

                        //Store the data in the cache so you wont have to call the youtube API for this song anymore
                        cache.seconds.push(r.videos[0].seconds);
                        cache.url.push(r.videos[0].url);
                        cache.name.push(str);
                        console.log("Added to cache");
                        play(message, str);//Now that the data is stored, start from the top to ensure it was properly saved
                        //If it was saved the code will route the path to play the song so this is ok but not the best practice
                    }
                }
            })
        }
    }
}

function addtoHistory(str, url, seconds, author) {//Add the recieved data to histlog.txt This file is used for role permissions and history

    cacheToText();//cache saved data so on program reboot the cache is still stored and not lost

    var txt = str + "\t -- " + "<" + url + ">" + " --\t " + seconds + " -- " + author + "\n";//Format
    fs.appendFile('histlog.txt', txt, function (err) {
        if (err) throw err;
        console.log('Playing: ' + str + " \n");
    });
}

function grabCache() {//Populate the cache from json file on program startup
    fs.readFile('cache.json', 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        if (cache == undefined) {
            console.log("cache undefined");
        } else {
            cache = JSON.parse(data);
        }

    })
}

function cacheToText() {//Write the current cache to the json file
    var jsonData = JSON.stringify(cache);
    fs.writeFile("cache.json", jsonData, function (err) {
        if (err) {
            console.log(err);
        }
    });
}

function alreadyCalled(message, str) {//Once data has been stored to the cache this is executed
    if (str == "--endquery--") {
        message.channel.send("!stop");
    } else {
        console.log("Already called!");
        message.member.voice.channel.join().then(function (connection) {//Join voice channel

            seconds = cache.seconds[cacheIndex];
            url = cache.url[cacheIndex];
            var author = message.member.user.username;
            addtoHistory(str, url, seconds, author);

            if (inloop == true) {//Loops the audio
                let dispatcher = connection.play(ytdl(url, { filter: "audioonly" })).on("finish", () => {
                    alreadyCalled(message, str);
                });
            } else if (logs.length > 1 || inqueue == true) {//Runs the queue
                inqueue = false;
                let dispatcher = connection.play(ytdl(url, { filter: "audioonly" })).on("finish", () => {
                    logs.shift();
                    play(message, logs[0]);
                });
            } else {//Any basic !play command is executed here
                message.channel.bulkDelete(1);
                let dispatcher = connection.play(ytdl(url, { filter: "audioonly" }))
                //ytdl(url).pipe(fs.createWriteStream('audio.mp3')); //Use this line to download an mp3 file of the chosen track
            }
        })
    }
}
