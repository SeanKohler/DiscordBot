const versiontxt = "Version: 1.4.0"
module.exports = {
    name: 'info',
    description: 'This command gives version data',
    execute(message, args){
        if(args[1] == '!checkrole'){
            message.channel.send("This command is unavaliable to the users. It runs automatically and grants role to those who meet the criteria");
        }else if(args[1]=='!cl'){
            message.channel.send("This command was made for a meme and you can freely modify the url in the cl.js file");
        }else if(args[1]=='!clearchat'){
            message.channel.send("This command takes a second argument being a number. It will remove that number of lines from the chat \n"+"(EX. !clearchat 10)");
        }else if(args[1]=='!clearhistory'){
            message.channel.send("This command removes all text from the histlog.txt and saves it in a master log catalog.txt \n"+"This clears the history Dr. Music can see while still keeping the record for you!");
        }else if(args[1]=='!coinflip'){
            message.channel.send("This command randomly picks Heads or Tails. Choose which one before calling the command");
        }else if(args[1]=='!createRole'){
            message.channel.send("This command takes a second argument being the name of the role you want to create.\n"+"One feature I am very proud of is that the color of the role is randomly generated every time you wish to create one");
        }else if(args[1]=='!cs'){
            message.channel.send("This command was made for a meme and you can freely modify the url in the cs.js file");
        }else if(args[1]=='!defineRole'){
            message.channel.send("This command is unavaliable to the users. It runs automatically and creates server roles Dr. Music needs to run proberly");
        }else if(args[1]=='!embed'){
            message.channel.send("This command creates an embed giving information about the user who typed the command");
        }else if(args[1]=='!everyname'){
            message.channel.send("This prints out a short version of the history containing the names of all songs previously played")
        }else if(args[1]=='!history'){
            message.channel.send("This command prints an in depth history. If the file is too large it will not print. This cannot be fixed as it is a limitation created on Discord's end not mine");
        }else if(args[1]=='!info'){
            message.channel.send("This command! Use any other command instead of the !info you typed");
        }else if(args[1]=='!loop'){
            message.channel.send("This command takes a second argument being a song name. It will continue to loop that song until you use the !stop command");
        }else if(args[1]=='!ping'){
            message.channel.send("This command responds with pong! It was the first command I ever wrote. Look how far we've come!!!");
        }else if(args[1]=='!play'){
            message.channel.send("This command takes a song name as a second argument. You must be in a voice channel for Dr. Music to begin playing for you");
        }else if(args[1]=='!queue'){
            message.channel.send("This command can take a large amount of arguments. If a song name has a space in it, replace that space with a '-'. Only use spaces to seperate song names. (EX. !queue Smb2-main-theme Wii-channel-theme Yee)");
        }else if(args[1]=='!rps'){
            message.channel.send("This command takes a second argument being your choice. It can resemble any form of Rock, Paper, or Scissors");
        }else if(args[1]=='!skip'){
            message.channel.send("This command only works when there is an active !queue command running. If the last song in the queue is skipped Dr. Music will stop playing");
        }else if(args[1]=='!stop'){
            message.channel.send("This command has many uses. Anything that requires a function to stop should use this command");
        }else if(args[1]=='!v'){
            message.channel.send("This command shows the current running version of my project (Made by Sean Kohler)");
        }else if(args[1]=='!website'){
            message.channel.send("This command links to my GitHub page where the most up-to-date version of Dr. Music can be found");
        }else{
            message.channel.send("You must ask for help about a command EX. !help !v");
        }
    }
}