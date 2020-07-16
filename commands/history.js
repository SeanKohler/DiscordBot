module.exports = {
    name: 'history',
    description: 'This command prints out the play history',
    execute(message, args){
      const fs = require('fs');
        fs.readFile('histlog.txt', 'utf8', function (err,data) {
            if (err) {
              return console.log(err);
            }
            console.log(data);
            try{
              message.channel.send(data)
            }catch (error) {
              message.channel.send("file too large: !clearhistory or !everyname for shorter history version");
              console.log(error);
            }
            
          });
    }
}
